import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { acelera, claves, entra, frena } from './anim';

export type Transicion = 'zoom' | 'fundido' | 'subida' | 'ninguna';

export const SOLAPE = 10; // fotogramas en que una escena y la siguiente conviven

/**
 * Cámara de cada escena: entrada, acercamiento lento y continuo (8 %) durante toda la escena
 * —así no hay planos muertos— y salida hacia la cámara con desenfoque, como en la referencia
 * (la tarjeta «vuela» hacia el espectador mientras aparece la siguiente).
 */
export const Escena: React.FC<{
  dur: number;
  entrada?: Transicion;
  salida?: Transicion;
  empuje?: number; // acercamiento total durante la escena (0.08 = 8 %)
  origen?: string;
  children: React.ReactNode;
}> = ({ dur, entrada = 'zoom', salida = 'zoom', empuje = 0.08, origen = '50% 62%', children }) => {
  const f = useCurrentFrame();
  const e = entrada === 'ninguna' ? 1 : entra(f, 0, 16, frena);
  const s = salida === 'ninguna' ? 0 : claves(f, [dur - SOLAPE, dur], [0, 1], acelera);
  let escala = 1 + empuje * claves(f, [0, dur], [0, 1], (t) => t);
  let dy = 0;
  if (entrada === 'zoom') escala *= 0.86 + 0.14 * e;
  if (entrada === 'subida') dy += (1 - e) * 120;
  if (salida === 'zoom') escala *= 1 + 0.22 * s;
  if (salida === 'subida') dy -= s * 120;
  const desenfoque = (entrada !== 'ninguna' ? (1 - e) * 16 : 0) + (salida !== 'ninguna' ? s * 18 : 0);
  return (
    <AbsoluteFill
      style={{
        opacity: e * (1 - s),
        transform: `translateY(${dy}px) scale(${escala})`,
        transformOrigin: origen,
        filter: desenfoque > 0.3 ? `blur(${desenfoque}px)` : undefined,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
