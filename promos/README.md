# Promos estilo cristal

Videos publicitarios de **Barber Gest** y **Data Gest** hechos con [Remotion](https://www.remotion.dev).
La guía completa (cómo escribir un guion nuevo, tipos de escena, revisión) está en la skill
`.claude/skills/promo-cristal/SKILL.md`.

```bash
npm install
npm run studio              # vista previa
npm run render              # → out/barbergest.mp4 y out/datagest.mp4
```

## Cambiar textos, colores y duración

- **Textos y escenas:** `src/videos/barbergest.ts` y `src/videos/datagest.ts`. Cada escena es un
  objeto con sus textos; cambiar el orden del arreglo cambia el orden del video.
- **Dirección web y oferta del cierre:** en `marca.url` y `marca.oferta` del mismo archivo (hoy no
  hay URL porque los proyectos no tienen dominio publicado).
- **Colores:** `temaBarberGest` / `temaDataGest` al principio de cada archivo.
- **Duración:** `dur` de cada escena, en fotogramas (30 = 1 s). Cada escena se solapa 10 con la
  siguiente.
- **Música:** copia el archivo a `public/` y agrega `musica: 'musica.mp3'` a las props del video en
  `src/Root.tsx`.
