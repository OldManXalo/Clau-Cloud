import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { claves } from './anim';

/**
 * Dos ambientes, como en la referencia:
 * - «cielo»: nubes reales con un piso reflectante y neblina (primera parte, el problema).
 * - «bruma»: blanco azulado con manchas de luz desenfocadas que se desplazan (el producto).
 * `mezcla` va de 0 (cielo) a 1 (bruma); el cambio suele ocurrir en la escena del logo.
 */
export const Fondo: React.FC<{ mezcla: number }> = ({ mezcla }) => {
  const f = useCurrentFrame();
  // deriva lenta y continua: el plano nunca queda congelado
  const dx = -f * 0.22;
  const zoom = 1.04 + f * 0.00004;
  return (
    <AbsoluteFill style={{ backgroundColor: '#eaf1fd', overflow: 'hidden' }}>
      {mezcla < 1 && (
        <AbsoluteFill style={{ opacity: 1 - mezcla }}>
          <Img
            src={staticFile('cielo.jpg')}
            style={{
              position: 'absolute',
              width: 2400,
              height: 1350,
              left: -240 + dx,
              top: -150,
              transform: `scale(${zoom})`,
              transformOrigin: '50% 40%',
            }}
          />
          {/* piso reflectante: la parte baja se vuelve un espejo lechoso */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 690,
              bottom: 0,
              background:
                'linear-gradient(180deg, rgba(236,242,253,0.0) 0%, rgba(236,242,253,0.78) 18%, rgba(242,246,254,0.92) 100%)',
            }}
          />
        </AbsoluteFill>
      )}
      {mezcla > 0 && (
        <AbsoluteFill style={{ opacity: mezcla }}>
          <Bruma f={f} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

const Bruma: React.FC<{ f: number }> = ({ f }) => {
  const t = f / 30;
  const manchas = [
    { x: 260 + Math.sin(t * 0.35) * 90, y: 260 + Math.cos(t * 0.28) * 60, r: 520, c: 'rgba(146,184,250,0.75)' },
    { x: 1700 + Math.cos(t * 0.3) * 110, y: 300 + Math.sin(t * 0.4) * 70, r: 560, c: 'rgba(160,196,252,0.7)' },
    { x: 980 + Math.sin(t * 0.22) * 140, y: 120, r: 480, c: 'rgba(255,255,255,0.95)' },
    { x: 1500 + Math.sin(t * 0.25) * 80, y: 900, r: 520, c: 'rgba(186,208,252,0.7)' },
    { x: 300 + Math.cos(t * 0.33) * 90, y: 920, r: 460, c: 'rgba(214,226,253,0.8)' },
  ];
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(180deg, #dfeafc 0%, #eef3fe 55%, #f6f8ff 100%)' }}>
      <AbsoluteFill style={{ filter: 'blur(90px)' }}>
        {manchas.map((m, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: m.x - m.r,
              top: m.y - m.r * 0.7,
              width: m.r * 2,
              height: m.r * 1.4,
              borderRadius: '50%',
              background: m.c,
            }}
          />
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Ondas concéntricas en el piso (en perspectiva) que se expanden despacio. */
export const Anillos: React.FC<{ x: number; y: number; escala?: number; opacidad?: number }> = ({
  x,
  y,
  escala = 1,
  opacidad = 1,
}) => {
  const f = useCurrentFrame();
  const n = 5;
  return (
    <svg
      width={1920}
      height={1080}
      style={{ position: 'absolute', left: 0, top: 0, opacity: opacidad, pointerEvents: 'none' }}
    >
      {Array.from({ length: n }, (_, i) => {
        const fase = ((f / 150 + i / n) % 1 + 1) % 1; // 0..1 cada 5 s
        const rx = (220 + fase * 900) * escala;
        const op = claves(fase, [0, 0.15, 1], [0, 0.85, 0]);
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx={rx}
            ry={rx * 0.16}
            fill="none"
            stroke="white"
            strokeWidth={3}
            opacity={op}
          />
        );
      })}
    </svg>
  );
};
