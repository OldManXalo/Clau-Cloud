import React from 'react';
import { useCurrentFrame } from 'remotion';
import { claves, entra, frena } from '../anim';
import { Cristal, Linea } from '../Cristal';
import { Escena } from '../Escena';
import { Esfera } from '../Esfera';
import { Anillos } from '../Fondo';
import { Icono } from '../Iconos';
import { FUENTE, Tema, degradado } from '../tema';
import { EscenaHero } from '../tipos';
import { Titular } from '../Titular';

const PISO = 860;
// dónde caen las alertas alrededor de la tarjeta (px del lienzo)
const HUECOS = [
  { x: 1480, y: 240 },
  { x: 1560, y: 600 },
  { x: 1330, y: 840 },
];

/** Apertura sobre el cielo: titular a la izquierda, la app en cristal inclinada a la derecha,
 *  la esfera entra rodando y luego «inspecciona» la app mientras aparecen los problemas. */
export const Hero: React.FC<{ e: EscenaHero; tema: Tema }> = ({ e, tema }) => {
  const f = useCurrentFrame();
  const llegada = entra(f, 4, 34, frena);
  const t0 = e.alertas.length ? e.alertas[0].desde - 14 : e.dur;
  const lupa = entra(f, t0, 18);
  const ex = claves(lupa, [0, 1], [-120 + llegada * 1020, 1150], (t) => t);
  const ey = claves(lupa, [0, 1], [PISO - 62, 600], (t) => t);
  const etam = 124 + lupa * 50;
  const tarjeta = entra(f, 0, 26);
  return (
    <Escena dur={e.dur} entrada="ninguna" origen="60% 55%">
      <Anillos x={1250} y={PISO + 20} />
      <Cristal
        tema={tema}
        x={1380 + (1 - tarjeta) * 240}
        y={500}
        ancho={900}
        alto={620}
        rotY={-17 - (1 - tarjeta) * 14}
        rotX={4}
        opacidad={tarjeta}
      >
        <AppFalsa e={e} tema={tema} />
      </Cristal>
      {/* conectores de las alertas */}
      <svg width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0 }}>
        {e.alertas.map((a, i) => {
          const h = HUECOS[i % HUECOS.length];
          const p = entra(f, a.desde - 4, 10);
          return p > 0 ? (
            <line
              key={i}
              x1={ex}
              y1={ey}
              x2={ex + (h.x - ex) * p}
              y2={ey + (h.y - ey) * p}
              stroke={tema.borde[0]}
              strokeWidth={2.5}
              strokeDasharray="6 8"
              opacity={0.8}
            />
          ) : null;
        })}
      </svg>
      {lupa > 0 && (
        <div
          style={{
            position: 'absolute',
            left: ex - etam * 0.85,
            top: ey - etam * 0.85,
            width: etam * 1.7,
            height: etam * 1.7,
            borderRadius: '50%',
            border: `3px solid rgba(255,255,255,${0.8 * lupa})`,
            boxShadow: `0 0 40px rgba(80,160,255,${0.4 * lupa})`,
            background: `rgba(255,255,255,${0.12 * lupa})`,
          }}
        />
      )}
      <Esfera x={ex} y={ey} tam={etam} tema={tema} piso={lupa < 0.5 ? PISO : undefined} />
      {e.alertas.map((a, i) => (
        <Alerta key={i} {...a} tema={tema} pos={HUECOS[i % HUECOS.length]} />
      ))}
      {e.titulares.map((t, i) => (
        <Titular key={i} lineas={t.lineas} tema={tema} desde={t.desde} hasta={t.hasta} x={110} y={380} tam={108} />
      ))}
    </Escena>
  );
};

const AppFalsa: React.FC<{ e: EscenaHero; tema: Tema }> = ({ e, tema }) => {
  const f = useCurrentFrame();
  const ap = (k: number) => {
    const p = entra(f, 10 + k * 4, 14);
    return { opacity: p, transform: `translateY(${(1 - p) * 18}px)` };
  };
  return (
    <div style={{ fontFamily: FUENTE, color: tema.tinta, height: '100%', display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...ap(0) }}>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: degradado(tema.acento, 135) }} />
        <div style={{ flex: 1 }} />
        <Linea ancho={70} alto={12} />
        <Linea ancho={90} alto={12} />
        <Linea ancho={110} alto={12} />
      </div>
      <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', ...ap(1) }}>{e.app.titulo}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {e.app.filas.map((r, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 20px',
              borderRadius: 16,
              background: 'rgba(255,255,255,0.75)',
              border: '1.5px solid #e3e8f5',
              fontSize: 26,
              ...ap(2 + i),
            }}
          >
            <span style={{ color: tema.tintaSuave, fontWeight: 500 }}>{r.etiqueta}</span>
            <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{r.valor}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 'auto' }}>
        {e.app.mosaicos.map((m, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              borderRadius: 18,
              background: 'rgba(255,255,255,0.7)',
              border: '1.5px solid #e3e8f5',
              padding: 18,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              ...ap(3 + e.app.filas.length + i),
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                display: 'grid',
                placeItems: 'center',
                background: `${tema.barra[0]}1c`,
                color: tema.barra[0],
              }}
            >
              <Icono nombre={m.icono} tam={30} />
            </div>
            <div style={{ fontSize: 22, fontWeight: 600 }}>{m.etiqueta}</div>
            <Linea ancho={120} alto={10} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Alerta: React.FC<{ texto: string; icono: string; desde: number; tema: Tema; pos: { x: number; y: number } }> = ({
  texto,
  icono,
  desde,
  tema,
  pos,
}) => {
  const f = useCurrentFrame();
  const p = entra(f, desde, 12);
  if (p <= 0) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) scale(${0.7 + 0.3 * p})`,
        opacity: p,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 22px 12px 14px',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.95)',
        boxShadow: '0 14px 36px rgba(60,90,180,0.2)',
        fontFamily: FUENTE,
        fontSize: 26,
        fontWeight: 600,
        color: tema.tinta,
        whiteSpace: 'nowrap',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          background: `${tema.malo}1f`,
          color: tema.malo,
        }}
      >
        <Icono nombre={icono} tam={24} grosor={2.4} />
      </div>
      {texto}
    </div>
  );
};
