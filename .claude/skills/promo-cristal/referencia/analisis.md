# Análisis del video de referencia («fathom audit»)

Medido fotograma a fotograma sobre el archivo que mandó el usuario
(`WhatsApp_Video_2026-10-04_at_9.55.06_AM.mp4`). Es un anuncio de un producto SaaS de otra marca: se
copia el **estilo**, nunca su nombre, logo, textos ni oferta.

## Datos técnicos

| Dato | Valor |
|---|---|
| Duración | 45,5 s (1365 fotogramas) |
| Formato | 1920×1080, 30 fps, H.264 + AAC estéreo 48 kHz |
| Audio | Solo música (sin locución). Medida sin escucharla: ~125,7 BPM, primer tiempo en 0,36 s; nivel medio −17 dB, pico −1,3 dB |
| Cortes | No hay cortes secos (el detector de escena a 0,25 no encuentra ninguno): todo pasa por transiciones con movimiento, desenfoque y fundido |
| Transiciones fuertes | 6,5 s · 10,0 s · 12,5 s · 15,5 s · 18 s · 21 s · 24 s · 27,5 s · 31,5 s · 35,5 s · 38 s, casi todas a ±2 fotogramas de un golpe de la música |
| Tramo quieto | Solo la firma final (39–45,5 s), a propósito |

## Desglose de escenas

| Tiempo | Fondo | Qué pasa |
|---|---|---|
| 0–2 s | Cielo | Titular a la izquierda «Your website / looks perfect.» que se escribe de izquierda a derecha con borde suave (las letras nuevas llegan claras y algo borrosas). A la derecha, tarjeta de cristal con la web, inclinada en 3D; aparece vacía y se llena en ~0,5 s. La esfera azul entra rodando por el piso. |
| 2–6,3 s | Cielo | Cambia el titular a «Look / closer.». La esfera sube sobre la tarjeta y se vuelve una lupa; salen etiquetas de problemas unidas por líneas («Broken links», «Slow pages», «Hidden barriers»). |
| 6,3–10 s | Cielo | La tarjeta vuela hacia la cámara desenfocándose. Una píldora azul marino brillante gira en 3D hasta quedar de frente: buscador con lupa, se escribe «yourwebsite.com» con cursor, botón cian «Ask AI», clic. |
| 10–11 s | Cielo | La píldora sube y se achica; debajo caen tarjetas de resultados apiladas. |
| 11–12,5 s | Destello → bruma | Destello blanco. Logo: esfera sobre un pedestal de discos con degradado violeta→azul; el nombre se escribe (2.ª parte con degradado). |
| 12,5–15,5 s | Bruma | El nombre se desliza fuera; la esfera recorre un collage de tarjetas (checklist + panel IA). |
| 15,5–18 s | Bruma | Píldora clara (cristal) con botón azul «Free site audit»; se escribe la URL; aparece la chip «Nothing to install». |
| 18–24 s | Bruma | Tablero: anillo que cuenta 13→64→70, insignia «Needs work», barras que crecen, filas de problemas (Critical/High) que entran de a una. Acercamiento continuo. |
| 24–27,5 s | Bruma | «Monitoring»: línea que se dibuja con la esfera en la punta; aviso a un costado «SSL expires in 14 days» con botones Email/Slack/Webhook. |
| 27,5–31 s | Bruma | Informe de marca blanca: muestras de color que cambian el tema (azul→verde), enlace copiado, PDF. |
| 31–36 s | Bruma | Rejilla «20 pages»: las casillas se marcan mientras la esfera salta de una a otra; tarjeta lateral con cronómetro «Under a minute»; chips «Free», «No sign-up». |
| 36–38,3 s | Bruma | Panel «Ask AI» pequeño. |
| 38,3–45,5 s | Bruma | Firma: pedestal + nombre, dirección que se escribe debajo y píldora «Launch offer · 50% off your first month». |

## Medidas de color (px de 1920×1080)

| Elemento | Color |
|---|---|
| Titular | `#020d2f` (azul casi negro) |
| Palabra acento | degradado `#6067f2` → `#4f81f1` → `#2fb7f0` → `#23cfee` |
| Esfera | centro `#03a4fd`, borde azul profundo, reflejo violeta, brillo blanco arriba a la izquierda |
| Borde de tarjeta | `#766ee0` (izq./abajo) → `#8ae0fa` (der./arriba) |
| Barras de progreso | `#2987fe` → `#2ac7fd`; aviso naranja `#e8891c` |
| Cielo | arriba `#97c2f6`, nubes `#fdfef6`, piso lechoso `#e6eaf9` |
| Bruma | `#e2eafc` – `#fcfbfe`, manchas azules `#acccfd` |

## Tipografía

Sans geométrica de peso fuerte (tipo SF Pro Display / Inter Bold), interletrado cerrado. Titular
del hero ≈ 104 px de cuerpo en 1080p, dos líneas, alineado a la izquierda en x≈95. En la interfaz
simulada, Inter/SF de 22–46 px. No se verificó la fuente exacta: en la plantilla se usa Inter
(archivos locales de `@fontsource/inter`).

## Gramática de movimiento

- **Escritura con borde suave** en titulares, URL y nombre de marca.
- **Entradas con frenada larga** (llegan rápido, se asientan despacio); salidas aceleradas hacia la
  cámara con desenfoque (escala ×1,2, blur ~18 px en ~10 fotogramas).
- **Acercamiento continuo** del 5–8 % durante cada escena: nunca hay un plano congelado.
- **La esfera como hilo conductor**: rueda, inspecciona, pulsa, salta entre casillas, sigue la punta de
  la gráfica y corona el logo.
- **Ondas en el piso**: elipses blancas concéntricas que se expanden bajo cada objeto.
- **Contenido por capas**: tarjeta vacía → contenido escalonado (4 fotogramas entre elementos) →
  número que cuenta → insignia → filas.
- **Un solo destello blanco** marca el paso del problema (cielo) a la solución (bruma).
