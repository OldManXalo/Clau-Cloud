import React from 'react';
import { useCurrentFrame } from 'remotion';
import { entra, suave } from '../anim';
import { Cristal } from '../Cristal';
import { Escena } from '../Escena';
import { Esfera } from '../Esfera';
import { Anillos } from '../Fondo';
import { Icono } from '../Iconos';
import { FUENTE, Tema } from '../tema';
import { EscenaGrafica } from '../tipos';
import { Rotulo } from '../Titular';
import { colorTono } from '../colores';

/** Gráfica que se dibuja con la esfera en la punta; al final salta un aviso a un costado. */
export const Grafica: React.FC<{ e: EscenaGrafica; tema: Tema }> = ({ e, tema }) => {
  const f = useCurrentFrame();
  const D = e.rotulo ? 12 : 4;
  const W = 1040;
  const H = 300;
  const cx = 800;
  const cy = e.rotulo ? 630 : 560;
  const max = Math.max(...e.puntos) * 1.1;
  const min = Math.min(...e.puntos) * 0.8;
  const pts = e.puntos.map((v, i) => ({ x: (i / (e.puntos.length - 1)) * W, y: H - ((v - min) / (max - min)) * H }));
  const p = entra(f, D, 50, suave);
  // punto de la punta
  const pos = p * (pts.length - 1);
  const k = Math.min(pts.length - 2, Math.floor(pos));
  const t = pos - k;
  const punta = { x: pts[k].x + (pts[k + 1].x - pts[k].x) * t, y: pts[k].y + (pts[k + 1].y - pts[k].y) * t };
  const visibles = [...pts.slice(0, k + 1), punta];
  const d = visibles.map((q, i) => `${i ? 'L' : 'M'}${q.x},${q.y}`).join(' ');
  const area = `${d} L${punta.x},${H} L0,${H} Z`;
  const al = entra(f, D + 46, 14);
  const ct = colorTono(e.alerta.tono ?? 'aviso', tema);
  // posición de la tarjeta en el lienzo (para colocar la esfera sobre la punta)
  const ox = cx - 1180 / 2 + 50;
  const oy = cy - 560 / 2 + 170;
  return (
    <Escena dur={e.dur}>
      <Anillos x={cx} y={cy + 320} />
      {e.rotulo && <Rotulo texto={e.rotulo.texto} acento={e.rotulo.acento} tema={tema} desde={2} hasta={e.dur - 6} />}
      <Cristal tema={tema} x={cx} y={cy} ancho={1180} alto={560} relleno={50}>
        <div style={{ fontFamily: FUENTE, color: tema.tinta, display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.02em' }}>{e.titulo}</div>
            {e.sub && <div style={{ fontSize: 24, color: tema.tintaSuave, marginTop: 4 }}>{e.sub}</div>}
          </div>
          {e.esquina && <div style={{ fontSize: 22, color: tema.tintaSuave, fontWeight: 500 }}>{e.esquina}</div>}
        </div>
        <svg width={W} height={H + 20} style={{ position: 'absolute', left: 50, top: 170, overflow: 'visible' }}>
          <defs>
            <linearGradient id="relleno" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={tema.barra[0]} stopOpacity={0.28} />
              <stop offset="1" stopColor={tema.barra[0]} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="trazo" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={tema.barra[0]} />
              <stop offset="1" stopColor={tema.barra[1]} />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1={0} x2={W} y1={H * g} y2={H * g} stroke="#e3e8f5" strokeWidth={2} />
          ))}
          <path d={area} fill="url(#relleno)" />
          <path d={d} fill="none" stroke="url(#trazo)" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          {visibles.slice(0, -1).map((q, i) => (
            <circle key={i} cx={q.x} cy={q.y} r={8} fill="#fff" stroke={tema.barra[0]} strokeWidth={4} />
          ))}
        </svg>
      </Cristal>
      <Esfera x={ox + punta.x} y={oy + punta.y} tam={58} tema={tema} />
      {al > 0 && (
        <div
          style={{
            position: 'absolute',
            left: 1440,
            top: cy - 210,
            width: 420,
            opacity: al,
            transform: `translateX(${(1 - al) * -60}px) scale(${0.9 + 0.1 * al})`,
            borderRadius: 28,
            padding: 28,
            background: 'rgba(255,255,255,0.96)',
            border: `2px solid ${ct}40`,
            boxShadow: '0 24px 60px rgba(60,100,200,0.2)',
            fontFamily: FUENTE,
            color: tema.tinta,
          }}
        >
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            <div style={{ width: 62, height: 62, borderRadius: '50%', background: ct, color: '#fff', display: 'grid', placeItems: 'center' }}>
              <Icono nombre={e.alerta.icono ?? 'alerta'} tam={32} grosor={2.4} />
            </div>
            <div>
              <div style={{ fontSize: 22, color: ct, fontWeight: 600 }}>{e.alerta.titulo}</div>
              <div style={{ fontSize: 28, fontWeight: 650, lineHeight: 1.2 }}>{e.alerta.texto}</div>
            </div>
          </div>
          {e.alerta.botones && (
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {e.alerta.botones.map((b, i) => (
                <div
                  key={i}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 12,
                    border: '1.5px solid #dfe5f3',
                    fontSize: 22,
                    fontWeight: 600,
                    opacity: entra(f, D + 54 + i * 4, 8),
                  }}
                >
                  {b}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Escena>
  );
};
