"""generar_cielo.py [salida.jpg] [--semilla 7] [--ancho 2400] [--alto 1350]
Genera un cielo con nubes (ruido fractal con semilla) para el fondo «cielo» de los promos.
Se genera una vez y queda en public/; así el render no calcula ruido en cada fotograma y el
resultado es siempre el mismo. Requiere numpy y Pillow."""
import argparse
import numpy as np
from PIL import Image, ImageFilter

ap = argparse.ArgumentParser()
ap.add_argument('salida', nargs='?', default='public/cielo.jpg')
ap.add_argument('--semilla', type=int, default=7)
ap.add_argument('--ancho', type=int, default=2400)
ap.add_argument('--alto', type=int, default=1350)
a = ap.parse_args()
rng = np.random.default_rng(a.semilla)
W, H = a.ancho, a.alto


def ruido(celdas_x, celdas_y):
    """Ruido de valor suavizado (interpolación coseno) del tamaño del lienzo."""
    g = rng.random((celdas_y + 2, celdas_x + 2))
    ys = np.linspace(0, celdas_y, H, endpoint=False)
    xs = np.linspace(0, celdas_x, W, endpoint=False)
    y0, x0 = ys.astype(int), xs.astype(int)
    fy, fx = ys - y0, xs - x0
    fy = (1 - np.cos(fy * np.pi)) / 2
    fx = (1 - np.cos(fx * np.pi)) / 2
    a_ = g[np.ix_(y0, x0)]; b = g[np.ix_(y0, x0 + 1)]
    c = g[np.ix_(y0 + 1, x0)]; d = g[np.ix_(y0 + 1, x0 + 1)]
    top = a_ + (b - a_) * fx[None, :]
    bot = c + (d - c) * fx[None, :]
    return top + (bot - top) * fy[:, None]


n = np.zeros((H, W))
amp, total = 1.0, 0.0
for oct_ in range(7):
    cx = int(5 * 2 ** oct_); cy = int(3 * 2 ** oct_)
    n += amp * ruido(cx, cy); total += amp; amp *= 0.52
n /= total
# densidad de nubes: más en los lados y abajo, cielo abierto arriba al centro
yy, xx = np.mgrid[0:H, 0:W]
lado = np.abs(xx / W - 0.5) * 2
alto = yy / H
dens = 0.30 + 0.16 * lado + 0.14 * alto
nube = np.clip((n - (1 - dens)) * 7.0, 0, 1)
nube = nube ** 0.7
# volumen: la luz viene de arriba; donde el ruido baja hacia abajo, la nube queda en sombra
luz = np.clip((n - np.roll(n, 14, axis=0)) * 9 + 0.5, 0, 1)
somb = nube * (1 - luz) * 0.9

cielo_arriba = np.array([118, 166, 236]) / 255
cielo_abajo = np.array([214, 230, 250]) / 255
t = np.clip(alto * 1.25, 0, 1)[..., None]
base = cielo_arriba * (1 - t) + cielo_abajo * t
blanco = np.array([0.99, 0.99, 1.0])
gris = np.array([0.80, 0.85, 0.95])
img = base * (1 - nube[..., None]) + blanco * nube[..., None]
img = img * (1 - 0.35 * somb[..., None]) + gris * 0.35 * somb[..., None]
# sol suave arriba al centro
sol = np.exp(-(((xx - W * 0.52) / (W * 0.18)) ** 2 + ((yy - H * 0.05) / (H * 0.25)) ** 2))
img = img + (1 - img) * 0.75 * sol[..., None]
# neblina del horizonte (donde empieza el piso reflectante)
neb = np.clip((alto - 0.55) / 0.2, 0, 1) ** 1.5
img = img * (1 - 0.6 * neb[..., None]) + np.array([0.93, 0.95, 0.99]) * 0.6 * neb[..., None]
out = Image.fromarray((np.clip(img, 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2.2))
out.save(a.salida, quality=90)
print('ok', a.salida, out.size)
