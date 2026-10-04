# Guion de locución — Barber Gest

Una frase por escena, medida para que quepa en el tiempo de cada pantalla (unas 2,7 palabras por
segundo, ritmo normal de anuncio). El video dura 34,3 s. Los textos también están en
`src/videos/barbergest.ts` (campo `locucion`): si cambias una frase, cámbiala en los dos sitios.

## Frases

| N.º | Entra en | Máx. | Texto | En pantalla |
|---|---|---|---|---|
| 01 | 0,4 s | 5,3 s | Tu barbería no para. Pero al cerrar… ¿cuánto entró y cuánto le toca a cada uno? | Titular y alertas de problemas |
| 02 | 6,3 s | 3,6 s | Ahora, cada corte se registra con un toque. | Barra «+1 corte» |
| 03 | 10,2 s | 1,7 s | Con BarberGest. | Logo |
| 04 | 12,3 s | 3,6 s | Cobra en dólares o bolívares, con la tasa del día guardada. | Registro diario por forma de pago |
| 05 | 16,3 s | 3,6 s | El pago de cada barbero se calcula solo. | Pagos y cierres (50 %) |
| 06 | 20,3 s | 3,6 s | Mira tus ingresos y cierra la caja cuadrada. | Gráfica de ingresos |
| 07 | 24,3 s | 3,6 s | Todas tus sucursales en la nube… incluso sin internet. | Sucursales, celular, sin internet |
| 08 | 28,4 s | 5,9 s | BarberGest. La gestión de tu barbería, en bolívares y dólares. Pide tu demo hoy. | Firma final |

Texto corrido (para pegar en una voz sintética y luego cortar en 8 clips):

> Tu barbería no para. Pero al cerrar… ¿cuánto entró y cuánto le toca a cada uno?
> Ahora, cada corte se registra con un toque.
> Con BarberGest.
> Cobra en dólares o bolívares, con la tasa del día guardada.
> El pago de cada barbero se calcula solo.
> Mira tus ingresos y cierra la caja cuadrada.
> Todas tus sucursales en la nube… incluso sin internet.
> BarberGest. La gestión de tu barbería, en bolívares y dólares. Pide tu demo hoy.

## Cómo grabarla

- **Un archivo por frase**, nombrados `01.mp3`, `02.mp3`… en el orden de la tabla. Así cada frase
  cae en su escena aunque la voz salga un poco más lenta o más rápida.
- **Recorta el silencio del principio** de cada clip: el clip empieza a sonar justo en «Entra en».
- **No pases de la duración máxima** de cada frase; si se pasa, la voz se monta con la siguiente.
  Si no cabe, sube un poco la velocidad o avísame y acorto el texto.
- **Tono:** cercano y seguro, como alguien que te recomienda algo que usa; ni locutor de radio ni
  vendedor gritón. Sonrisa en la voz. Remata cada frase hacia abajo, salvo las preguntas del inicio.
- **Velocidad:** media-ágil (≈ 160 palabras por minuto). Pausa breve donde hay «…».
- **Acento:** español neutro o venezolano; el mismo que en el otro video si los publicas juntos.
- **Nombres:** «Gest» se pronuncia como en *gestión*: **Bárber Jest**. Si usas una
  voz sintética (ElevenLabs, etc.) y lo dice en inglés, escribe el nombre así, tal como suena, solo
  en el texto que le das a la voz.
- **Formato:** MP3 o WAV, 44,1 o 48 kHz, sin música ni efectos (la música va aparte).

## Dónde poner los audios

```
promos/public/voz/barbergest/01.mp3 … 08.mp3
promos/public/musica-barbergest.mp3   (cuando tengas la música)
```

Luego, en `src/Root.tsx`, agrega a las props del video Barber Gest:

```ts
voz: 'voz/barbergest', musica: 'musica-barbergest.mp3'
```

Con voz, la música queda al 25 % de volumen (`volumenMusica` para cambiarlo). Después:
`npm run render:barbergest`.

## Para la música

- Ideal: **120 BPM**, instrumental, sin voces, 35 s o más (se corta al final del video). Con
  120 BPM cada escena empieza justo en un golpe.
- Estilo de la referencia: pop electrónico luminoso y limpio, tipo «tech/corporate upbeat».
- Que tenga un golpe o subida en el **segundo 10** (destello y logo) y un final que se pueda
  cortar o desvanecer en el **segundo 34**.
- Usa música con licencia para anuncios (o generada con una IA que lo permita). Si es de otro
  tempo, pásamela y ajusto los cortes a sus golpes.
