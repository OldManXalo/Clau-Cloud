"""analizar_golpes.py <audio> [--hasta 40] [--ajuste-hasta N] [--fps 30] [--json salida.json]
Mapa de golpes de una pista SIN escucharla: tempo por autocorrelación del flujo espectral,
fase (primer tiempo) por ajuste de rejilla, y por cada tiempo k: instante, fotograma, fuerza en
graves (30-160 Hz), fuerza en agudos (>160 Hz) y nivel. Marca con | los inicios de compás.
Con esto los tiempos del vídeo se escriben en golpes: fotograma(k) = round((fase + k*60/bpm)*fps).
Las IA de música no respetan al pie de la letra el BPM ni la duración pedidos: mide siempre la
pista entregada."""
import argparse, json, subprocess, numpy as np
ap = argparse.ArgumentParser(); ap.add_argument('audio'); ap.add_argument('--hasta', type=float, default=40)
ap.add_argument('--fps', type=int, default=30); ap.add_argument('--json'); ap.add_argument('--bpm-min', type=float, default=70)
ap.add_argument('--bpm-max', type=float, default=180)
ap.add_argument('--ajuste-hasta', type=float, default=None, help='segundos usados para ajustar el tempo (por defecto, toda la pista)')
a = ap.parse_args()
sr = 22050
x = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', a.audio, '-ac', '1', '-ar', str(sr), '-f', 's16le', '-'],
                                 capture_output=True, check=True).stdout, dtype=np.int16).astype(np.float32) / 32768
hop, win = sr // 200, 1024
fr = np.fft.rfftfreq(win, 1 / sr); lo, hi, fl, rms = [], [], [], []; prev = None
for i in range(len(x) // hop):
    s = x[i * hop:i * hop + win]
    if len(s) < win: break
    m = np.abs(np.fft.rfft(s * np.hanning(win)))
    d = np.zeros_like(m) if prev is None else np.maximum(m - prev, 0); prev = m
    lo.append(d[(fr >= 30) & (fr < 160)].sum()); hi.append(d[fr >= 160].sum()); fl.append(d.sum())
    rms.append(np.sqrt((s[:hop] ** 2).mean()))
lo, hi, fl, rms = (np.array(v) for v in (lo, hi, fl, rms)); lo /= lo.max(); hi /= hi.max(); fl /= fl.max()
fl_fit = fl[:int(a.ajuste_hasta * 200)] if a.ajuste_hasta else fl
f0 = fl_fit - fl_fit.mean(); ac = np.correlate(f0, f0, 'full')[len(f0) - 1:]
lags = np.arange(1, len(ac)); bl = 12000 / lags; ok = (bl >= a.bpm_min) & (bl <= a.bpm_max)
ac = ac[1:] / (len(f0) - lags)
peso = np.exp(-0.5 * (np.log2(bl / 120) / 0.9) ** 2)
aprox = 12000 / lags[ok][np.argmax((ac * peso)[ok])]
best = None
for bpm in np.arange(aprox - 2, aprox + 2, 0.01):
    per = 60 / bpm * 200; ph = (np.arange(len(fl_fit)) / per) % 1
    sc = (fl_fit * np.cos(2 * np.pi * ph)).sum() + 1j * (fl_fit * np.sin(2 * np.pi * ph)).sum()
    if best is None or abs(sc) > best[0]: best = (abs(sc), bpm, np.angle(sc))
bpm = round(best[1], 2); T = 60 / bpm; fase = round((-best[2] / (2 * np.pi)) % 1 * T, 3)
print(f"duración {len(x) / sr:.2f} s · tempo {bpm} BPM · tiempo {T:.4f} s = {T * a.fps:.3f} fotogramas a {a.fps} fps · primer tiempo {fase} s")
filas = []
k = 0
while fase + k * T < min(a.hasta, len(x) / sr - 0.3):
    t = fase + k * T; i = int(t * 200); l = float(lo[max(0, i - 8):i + 8].max()); h = float(hi[max(0, i - 8):i + 8].max())
    db = float(20 * np.log10(rms[i:i + int(T * 200)].mean() + 1e-9))
    filas.append({'k': k, 't': round(t, 3), 'fotograma': round(t * a.fps), 'graves': round(l, 3), 'agudos': round(h, 3), 'db': round(db, 1)})
    print(f"{'|' if k % 4 == 0 else ' '}{k:3d} {t:6.2f}s f{round(t * a.fps):4d}  graves {'#' * int(l * 30):30s} agudos {'#' * int(h * 20):20s} {db:5.0f} dB")
    k += 1
if a.json: json.dump({'bpm': bpm, 'fase': fase, 'fps': a.fps, 'golpes': filas}, open(a.json, 'w'), indent=1)
