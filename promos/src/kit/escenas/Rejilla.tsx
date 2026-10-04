import React from 'react';
import { useCurrentFrame } from 'remotion';
import { entra, pop } from '../anim';
import { Cristal } from '../Cristal';
import { Escena } from '../Escena';
import { Esfera } from '../Esfera';
import { Anillos } from '../Fondo';
import { Icono } from '../Iconos';
import { FUENTE, Tema } from '../tema';
import { EscenaRejilla } from '../tipos';
import { Rotulo } from '../Titular';
import { Chip } from '../UI';
import { colorTono } from '../colores';

/** Casillas que se van marcando mientras la esfera salta de una a otra. */
export const Rejilla: React.FC<{ e: EscenaRejilla; tema: Tema }> = ({ e, tema }) => {
  const f = useCurrentFrame();
  const D = e.rotulo ? 12 : 4;
  const cols = e.columnas;
  const filas = Math.ceil(e.celdas.length / cols);
  const ancho = e.lateral ? 1240 : 1440;
  const cx = e.lateral ? 800 : 960;
  const cy = e.rotulo ? 630 : 560;
  const alto = 150 + filas * 128;
  const gap = 18;
  const cw = (ancho - 88 - gap * (cols - 1)) / cols;
  const ch = 110;
  const paso = Math.max(3, Math.min(8, Math.floor((e.dur - D - 50) / e.celdas.length)));
  const marca = (i: number) => D + 16 + i * paso;
  // la esfera salta a la última casilla marcada
  const actual = Math.max(0, Math.min(e.celdas.length - 1, Math.floor((f - D - 16) / paso)));
  const sig = Math.min(e.celdas.length - 1, actual + 1);
  const t = ((f - D - 16) % paso) / paso;
  const pos = (i: number) => {
    const c = i % cols;
    const r = Math.floor(i / cols);
    return {
      x: cx - ancho / 2 + 44 + c * (cw + gap) + cw - 30,
      y: cy - alto / 2 + 140 + r * (ch + gap) + 26,
    };
  };
  const a = pos(actual);
  const b = pos(sig);
  const salto = f > D + 16 && actual < e.celdas.length - 1 ? t : 0;
  const ex = a.x + (b.x - a.x) * salto;
  const ey = a.y + (b.y - a.y) * salto - Math.sin(salto * Math.PI) * 50;
  const lat = e.lateral ? entra(f, D + 30, 14) : 0;
  return (
    <Escena dur={e.dur}>
      <Anillos x={cx} y={cy + alto / 2 + 40} />
      {e.rotulo && <Rotulo texto={e.rotulo.texto} acento={e.rotulo.acento} tema={tema} desde={2} hasta={e.dur - 6} />}
      <Cristal tema={tema} x={cx} y={cy} ancho={ancho} alto={alto} relleno={44}>
        <div style={{ fontFamily: FUENTE, color: tema.tinta }}>
          <div style={{ fontSize: 42, fontWeight: 700, letterSpacing: '-0.02em' }}>{e.titulo}</div>
          {e.sub && <div style={{ fontSize: 24, color: tema.tintaSuave, marginTop: 2 }}>{e.sub}</div>}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, ${cw}px)`, gap, marginTop: 26 }}>
            {e.celdas.map((c, i) => {
              const ap = entra(f, D + i * 1.2, 10);
              const ok = entra(f, marca(i), 8);
              const col = colorTono(c.tono ?? 'acento', tema);
              return (
                <div
                  key={i}
                  style={{
                    height: ch,
                    borderRadius: 18,
                    background: ok > 0 ? `linear-gradient(160deg, #ffffff, ${col}12)` : 'rgba(255,255,255,0.7)',
                    border: `1.5px solid ${ok > 0.5 ? col + '55' : '#e3e8f5'}`,
                    padding: '16px 18px',
                    boxSizing: 'border-box',
                    position: 'relative',
                    opacity: ap,
                    transform: `translateY(${(1 - ap) * 16}px)`,
                  }}
                >
                  <div style={{ fontSize: 24, fontWeight: 650, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: 34 }}>
                    {c.texto}
                  </div>
                  {c.sub && (
                    <div
                      style={{
                        fontSize: 19,
                        color: tema.tintaSuave,
                        marginTop: 6,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontFamily: /\d{5,}/.test(c.sub) ? 'ui-monospace, monospace' : undefined,
                      }}
                    >
                      {c.sub}
                    </div>
                  )}
                  {ok > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 14,
                        top: 14,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: col,
                        color: '#fff',
                        display: 'grid',
                        placeItems: 'center',
                        transform: `scale(${pop(f, marca(i), 10)})`,
                      }}
                    >
                      <Icono nombre="check" tam={20} grosor={3.2} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Cristal>
      <Esfera x={ex} y={ey} tam={44} tema={tema} opacidad={entra(f, D + 10, 8)} />
      {e.lateral && lat > 0 && (
        <div
          style={{
            position: 'absolute',
            left: 1520,
            top: cy - 170,
            width: 320,
            height: 300,
            borderRadius: 34,
            padding: 3,
            background: `linear-gradient(160deg, ${tema.borde[0]}, ${tema.borde[1]})`,
            opacity: lat,
            transform: `scale(${0.85 + 0.15 * lat})`,
            boxShadow: '0 30px 70px rgba(50,90,190,0.2)',
          }}
        >
          <div
            style={{
              height: '100%',
              borderRadius: 31,
              background: 'rgba(255,255,255,0.96)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              fontFamily: FUENTE,
              color: tema.tinta,
            }}
          >
            <div
              style={{
                width: 130,
                height: 130,
                borderRadius: '50%',
                border: `8px solid ${tema.barra[0]}`,
                borderRightColor: tema.barra[1],
                display: 'grid',
                placeItems: 'center',
                transform: `rotate(${f * 3}deg)`,
              }}
            >
              <div style={{ transform: `rotate(${-f * 3}deg)` }}>
                <Icono nombre={e.lateral.icono} tam={60} color={tema.tinta} />
              </div>
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, textAlign: 'center', padding: '0 20px' }}>{e.lateral.texto}</div>
          </div>
        </div>
      )}
      {e.chips && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: cy + alto / 2 + 36,
            display: 'flex',
            justifyContent: 'center',
            gap: 22,
          }}
        >
          {e.chips.map((c, i) => (
            <Chip key={i} tema={tema} texto={c.texto} icono={c.icono} desde={D + 36 + i * 8} />
          ))}
        </div>
      )}
    </Escena>
  );
};
