import { Easing, interpolate } from 'remotion';

// Frenada larga, como las entradas de la referencia (llegan rápido y se asientan despacio).
export const frena = Easing.bezier(0.16, 1, 0.3, 1);
export const acelera = Easing.bezier(0.7, 0, 0.84, 0);
export const suave = Easing.bezier(0.45, 0, 0.55, 1);

/** 0 → 1 entre `desde` y `desde + dur`, con frenada. */
export const entra = (f: number, desde: number, dur: number, easing = frena) =>
  interpolate(f, [desde, desde + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

/** 1 → 0 entre `hasta - dur` y `hasta`, acelerando. */
export const sale = (f: number, hasta: number, dur: number, easing = acelera) =>
  1 - entra(f, hasta - dur, dur, easing);

/** Interpolación con claves y frenada, siempre limitada. */
export const claves = (f: number, ent: number[], sal: number[], easing = suave) =>
  interpolate(f, ent, sal, { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing });

/** Rebote breve al aparecer (escala 0.6 → 1.04 → 1). */
export const pop = (f: number, desde: number, dur = 14) =>
  claves(f, [desde, desde + dur * 0.6, desde + dur], [0.6, 1.04, 1], frena);

/** Texto que se escribe: cuántos caracteres se ven. */
export const escritos = (f: number, desde: number, texto: string, cps = 18, fps = 30) =>
  Math.max(0, Math.min(texto.length, Math.floor(((f - desde) * cps) / fps)));

/** Cursor que parpadea (determinista, por fotograma). */
export const cursorVisible = (f: number) => Math.floor(f / 15) % 2 === 0;

/** Golpe k de una rejilla de música (por defecto 120 BPM a 30 fps = 15 fotogramas). */
export const golpe = (k: number, bpm = 120, fps = 30, fase = 0) =>
  Math.round((fase + (k * 60) / bpm) * fps);

export const formato = (n: number, decimales = 0) =>
  n.toLocaleString('es-VE', { minimumFractionDigits: decimales, maximumFractionDigits: decimales });
