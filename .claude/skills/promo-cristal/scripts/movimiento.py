"""movimiento.py <video> [--ventana 0.5] [--umbral 0.15]
Mide cuánto cambia la imagen en cada ventana (diferencia media entre fotogramas consecutivos, sin
contar los cortes) y marca las ventanas casi quietas. Una pausa de lectura es buena; un plano muerto
de 2 s no. Arreglo típico: deriva lenta de cámara, luz de fondo en movimiento y la esfera guía
haciendo algo con sentido."""
import argparse, subprocess, numpy as np
ap = argparse.ArgumentParser(); ap.add_argument('video'); ap.add_argument('--ventana', type=float, default=0.5)
ap.add_argument('--umbral', type=float, default=0.15); a = ap.parse_args()
num, den = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=r_frame_rate', '-of', 'default=nw=1:nk=1', a.video],
                          capture_output=True, text=True).stdout.split()[0].split('/')
fps = float(num) / float(den)
W, H = 192, 108
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', a.video, '-vf', f'scale={W}:{H}', '-f', 'rawvideo', '-pix_fmt', 'gray', '-'], capture_output=True).stdout
v = np.frombuffer(raw, dtype=np.uint8).reshape(-1, H, W).astype(np.float32)
d = np.concatenate([[0], np.abs(np.diff(v, axis=0)).mean(axis=(1, 2))])
n = max(1, int(round(a.ventana * fps))); quietos = []
for i in range(0, len(d), n):
    s = d[i:i + n]; s = s[s < 15]
    m = s.mean() if len(s) else 0
    if m < a.umbral: quietos.append(i / fps)
print(f"{len(d)} fotogramas · {len(quietos)} ventanas de {a.ventana} s casi quietas" + (": " + ", ".join(f"{t:.1f}s" for t in quietos) if quietos else ""))
