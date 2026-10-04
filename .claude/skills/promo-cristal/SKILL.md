---
name: promo-cristal
description: Crea videos publicitarios de producto (SaaS, apps web) en estilo «cristal» — cielo con nubes, tarjetas de cristal en 3D, esfera azul que guía la mirada, titulares que se escriben y firma con pedestal — con Remotion y en español. Úsala cuando pidan un video promocional, anuncio, demo animada o reel de una app o proyecto web, sobre todo si mencionan Barber Gest, Data Gest o «el estilo del video de referencia».
---

# Videos publicitarios estilo cristal

Convierte una app web en un anuncio de 30–45 s como el de la referencia («fathom audit», analizado en
`referencia/analisis.md`): primero el problema sobre un cielo real, un destello, el logo, y después
el producto en tarjetas de cristal sobre una bruma azulada, con la esfera recorriendo todo. Responde
en el idioma del usuario. La entrega es **proyecto editable + MP4 + cómo cambiar textos y colores**.

## Qué hay ya hecho

La plantilla vive en `promos/` (raíz de este repositorio). No la reescribas: agrega un guion.

| Archivo | Qué es |
|---|---|
| `promos/src/kit/tipos.ts` | El guion como datos: marca + lista de escenas tipadas |
| `promos/src/kit/tema.ts` | Colores medidos en la referencia (`TEMA_BASE`); cada marca cambia solo lo suyo |
| `promos/src/kit/escenas/*.tsx` | Los 8 tipos de escena (tabla abajo) |
| `promos/src/kit/Promo.tsx` | Une escenas con solape, cambia cielo → bruma con destello en el logo, carga Inter |
| `promos/src/videos/barbergest.ts`, `datagest.ts` | Guiones de ejemplo reales |
| `promos/src/Root.tsx` | Registra cada video como composición |
| `promos/scripts/generar_cielo.py` | Genera `public/cielo.jpg` (nubes con semilla, sin fotos de stock) |
| `.claude/skills/promo-cristal/scripts/` | `analizar_golpes.py` (tempo de una música), `movimiento.py` (tramos quietos) |

### Tipos de escena

| `tipo` | Para qué | Datos clave |
|---|---|---|
| `hero` | Apertura sobre cielo: titular de 2 líneas que cambia, app inclinada, esfera que inspecciona y alertas de problemas | `titulares[]`, `app`, `alertas[]` (máx. 3) |
| `barra` | La acción estrella en una píldora (buscar, registrar, cobrar): gira en 3D, se escribe, clic, caen resultados | `texto`, `boton`, `clic`, `resultados[]` (máx. 3) o `chips[]` |
| `logo` | Destello + pedestal + nombre escrito. Marca el paso a la bruma | solo `dur` |
| `panel` | Tablero: anillo que cuenta + barras + filas. Sin anillo, las barras ocupan todo el ancho | `anillo`, `barras[]`, `filas[]` (máx. 2–3), `chips[]` |
| `grafica` | Línea que se dibuja con la esfera en la punta + aviso lateral | `puntos[]`, `alerta` |
| `rejilla` | Casillas que se marcan mientras la esfera salta (seriales, formas de pago, páginas…) | `columnas`, `celdas[]` (8 va bien), `lateral`, `chips[]` |
| `tarjetas` | 3 tarjetas en abanico (sucursales, dispositivos, pasos de un flujo) | `tarjetas[]` |
| `cierre` | Firma: pedestal, nombre, lema, URL escrita y oferta | usa `marca` |

Cualquier escena de producto acepta `rotulo: { texto, acento }`: frase corta arriba, con el remate
en degradado («Cada corte, **un toque.**»).

## Flujo de trabajo

1. **Entender el producto, no inventarlo.** Lee el código del proyecto (README, guías, PRODUCT.md /
   DESIGN.md, la navegación, los nombres de pantallas y botones, los colores CSS). Anota: para quién
   es, el dolor que resuelve, 4–6 funciones reales con sus palabras exactas, y la paleta. No inventes
   clientes, testimonios, precios, ofertas, dominios ni cifras de negocio: si no hay URL u oferta,
   usa un llamado neutro («Pide tu demo hoy») y dilo en la entrega. Los datos de ejemplo en las
   tarjetas son ilustrativos: nombres comunes ficticios, nunca los nombres reales de clientes que
   aparezcan en el repositorio (CSV, respaldos, capturas).
2. **Escribir el guion** (en `promos/src/videos/<marca>.ts`) siguiendo el arco de la referencia:
   - `hero` — el dolor en dos golpes: afirmación («Tu tienda / vende sin parar.») → pregunta que duele
     («¿Dónde está / cada equipo?») + 3 alertas de 2–5 palabras.
   - `barra` — la acción más característica de la app, hecha en un toque.
   - `logo`.
   - 3–4 escenas de funciones (`rejilla`, `panel`, `grafica`, `tarjetas`), cada una con un rótulo de
     ≤ 6 palabras y una sola idea.
   - `cierre` — lema de ≤ 8 palabras + URL (si existe) + llamado.
   Textos cortos, en el registro que use la app con sus clientes (tú / usted / vos). Moneda y
   formatos del país (es-VE: `Bs 41.500`, `$ 118,50`).
3. **Tema de la marca**: parte de `TEMA_BASE` y cambia `acento`, `barra`, `esfera`, `borde`, `disco`
   y `tinta` con los colores reales de la app. Mantén el fondo azul cielo/bruma (es el estilo) y que
   el degradado de acento contraste con la tinta.
4. **Tiempos**: cada escena avanza `dur − 10` fotogramas (10 de solape). Con música de 120 BPM a
   30 fps, 15 fotogramas = 1 golpe; elige `dur = 15·k + 10` para que cada escena empiece en golpe.
   Valores probados: `hero` 190, `barra` 130 (clic ≈ 55–60), `logo` 70, funciones 130, `cierre` 190
   → ~34 s. Si hay música real, mídela (`analizar_golpes.py musica.mp3 --fps 30`) y ajusta `dur` a
   sus golpes; las IA de música no respetan el BPM pedido.
5. **Registrar** el video en `Root.tsx` (una entrada en `promos`) y un script `render:<marca>` en
   `package.json`.
6. **Revisar antes del MP4 final** (ver abajo). Corrige y vuelve a revisar.
7. **Locución (si la piden):** una frase por escena en `guion.locucion` (`desde` en segundos =
   inicio de la escena + 0,3), a ~2,7 palabras por segundo, que complemente lo que se ve sin leerlo
   palabra por palabra; el logo lleva solo el nombre y el cierre repite marca + lema + llamado.
   Documenta tabla, duración máxima por frase e indicaciones de voz como en
   `promos/locucion/LOCUCION_BARBERGEST.md` (un archivo por video). Los clips van en `public/<carpeta>/01.mp3…` y se activan con
   la prop `voz`; con voz, la música baja a `volumenMusica` 0,25.
8. **Renderizar y verificar** el MP4 con ffprobe (1920×1080, 30 fps, duración esperada) y
   `movimiento.py` (solo deben quedar quietos el logo y la firma).

## Comandos

```bash
cd promos
npm install                         # una vez
python3 scripts/generar_cielo.py    # solo si falta public/cielo.jpg (requiere numpy y Pillow)
npx tsc -p .                        # comprobar tipos
npm run studio                      # vista previa interactiva en el navegador
npm run render:barbergest           # → out/barbergest.mp4
```

En la nube de Claude Code ya hay Chromium; antes de renderizar exporta
`REMOTION_CHROME=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`
(ajusta la versión con `ls /opt/pw-browsers`). En una PC normal no hace falta: Remotion baja el suyo.

Revisión rápida (≈ 45 s por video):

```bash
npx remotion render src/index.ts <Id> /tmp/prev.mp4 --scale=0.5 --concurrency=4
ffmpeg -ss 0 -t 12 -i /tmp/prev.mp4 -vf "fps=2,scale=400:-1,tile=6x4" -frames:v 1 hoja.png   # repetir con -ss 12, 24…
npx remotion still src/index.ts <Id> f.png --frame=N    # un fotograma a resolución completa
```

## Qué revisar en las hojas

- Nada cortado: rótulos arriba (el acercamiento empuja hacia afuera), alertas y chips a la derecha,
  cifras al final de las barras. Textos largos → acórtalos antes de achicar letra.
- Cada escena tiene algo moviéndose (esfera, conteo, barras, escritura) y los rótulos se borran
  antes de que entre el siguiente.
- El clic de la `barra` ocurre cuando el texto ya terminó de escribirse
  (`16 + largo·30/16` fotogramas).
- Legibilidad: ≥ 22 px en 1080p para lo que haya que leer; los números importantes ≥ 34 px.
- El cielo solo en hero y barra; el destello coincide con el logo.

## Cosas que no hacer

- No copiar de la referencia el nombre «fathom», su icono de ondas, sus textos ni su oferta: solo el
  lenguaje visual.
- No usar fotos ni música de stock descargadas sin licencia. El cielo se genera; la música la pone
  el usuario: copia el archivo a `promos/public/` y agrega `musica: 'musica.mp3'` a las props del video en `Root.tsx`.
- No usar `Math.random`, `Date.now` ni animaciones CSS: todo depende de `useCurrentFrame()`.
- No afirmar que el audio está bien sin poder escucharlo: entrega sin música o pide al usuario que lo
  juzgue.

## Formato vertical (Reels / TikTok)

La plantilla está pensada en 1920×1080. Para 1080×1920 no recortes: duplica la composición con
`width={1080} height={1920}` y recoloca (titular arriba, tarjeta debajo, alertas apiladas); las
posiciones están en px dentro de cada escena.
