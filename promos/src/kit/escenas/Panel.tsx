import React from 'react';
import { useCurrentFrame } from 'remotion';
import { entra } from '../anim';
import { Cristal, Linea } from '../Cristal';
import { Escena } from '../Escena';
import { Esfera } from '../Esfera';
import { Anillos } from '../Fondo';
import { Icono } from '../Iconos';
import { FUENTE, Tema } from '../tema';
import { EscenaPanel } from '../tipos';
import { Rotulo } from '../Titular';
import { AnilloPuntaje, Chip, Insignia, Progreso } from '../UI';
import { colorTono, insigniaTono, rellenoTono } from '../colores';

/** Tablero de la app: anillo que cuenta, barras que crecen y filas que entran de a una. */
export const Panel: React.FC<{ e: EscenaPanel; tema: Tema }> = ({ e, tema }) => {
  const f = useCurrentFrame();
  const conChips = (e.chips?.length ?? 0) > 0;
  const ancho = 1440;
  const cx = 960;
  const alto = conChips ? 600 : 660;
  const cy = (e.rotulo ? 640 : 560) - (conChips ? 40 : 0);
  const fila = !!e.anillo; // con anillo: anillo a la izquierda y barras a la derecha
  const D = e.rotulo ? 14 : 4; // retraso del contenido
  const flota = Math.sin(f / 16) * 8;
  return (
    <Escena dur={e.dur}>
      <Anillos x={cx} y={cy + alto / 2 + 30} />
      {e.rotulo && <Rotulo texto={e.rotulo.texto} acento={e.rotulo.acento} tema={tema} desde={2} hasta={e.dur - 6} />}
      <Cristal tema={tema} x={cx} y={cy} ancho={ancho} alto={alto} relleno={44}>
        <div style={{ fontFamily: FUENTE, color: tema.tinta, display: 'flex', flexDirection: 'column', gap: 26, height: '100%' }}>
          {e.url && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: -10 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 16, height: 16, borderRadius: '50%', background: '#cdd4e6' }} />
              ))}
              <div
                style={{
                  marginLeft: 16,
                  flex: 1,
                  padding: '8px 20px',
                  borderRadius: 999,
                  background: 'rgba(230,236,250,0.7)',
                  fontSize: 22,
                  color: tema.tintaSuave,
                }}
              >
                {e.url}
              </div>
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: fila ? 'row' : 'column', gap: fila ? 50 : 22 }}>
            <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <div style={{ fontSize: 46, fontWeight: 700, letterSpacing: '-0.02em' }}>{e.titulo}</div>
                {e.sub && <div style={{ fontSize: 26, color: tema.tintaSuave, marginTop: 4 }}>{e.sub}</div>}
              </div>
              {e.anillo && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
                  <AnilloPuntaje
                    valor={e.anillo.valor}
                    max={e.anillo.max}
                    sufijo={e.anillo.sufijo}
                    decimales={e.anillo.decimales}
                    desde={D}
                    dur={42}
                    tam={210}
                    color={colorTono(e.anillo.tono ?? 'acento', tema)}
                    tema={tema}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ fontSize: 24, letterSpacing: '0.12em', fontWeight: 600, color: tema.tintaSuave }}>
                      {e.anillo.etiqueta.toUpperCase()}
                    </div>
                    {e.anillo.insignia && entra(f, D + 30, 8) > 0 && (
                      <div style={{ opacity: entra(f, D + 30, 8) }}>
                        <Insignia texto={e.anillo.insignia.texto} tam={30} {...insigniaTono(e.anillo.insignia.tono, tema)} />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {e.barras && (
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 16,
                  borderLeft: fila ? '2px solid #e3e8f5' : undefined,
                  paddingLeft: fila ? 40 : 0,
                }}
              >
                {e.barras.map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 22, opacity: entra(f, D + 6 + i * 4, 10) }}>
                    <div style={{ width: 170, fontSize: 25, fontWeight: 500 }}>{b.etiqueta}</div>
                    <Progreso valor={b.valor} desde={D + 8 + i * 4} ancho={fila ? 330 : 900} alto={20} color={rellenoTono(b.tono, tema)} />
                    {b.dato && (
                      <div style={{ fontSize: 25, fontWeight: 650, fontVariantNumeric: 'tabular-nums', minWidth: 120, textAlign: 'right' }}>
                        {b.dato}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          {!e.barras && !e.anillo && <Linea ancho={300} />}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 'auto' }}>
            {e.filas?.map((r, i) => {
              const p = entra(f, D + 34 + i * 9, 14);
              const tono = r.insignia ? insigniaTono(r.insignia.tono, tema) : null;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 24,
                    padding: '16px 24px',
                    borderRadius: 18,
                    background: tono && r.insignia?.tono === 'malo' ? `${tema.malo}0f` : 'rgba(255,255,255,0.8)',
                    border: '1.5px solid #e3e8f5',
                    boxShadow: '0 6px 18px rgba(60,100,200,0.06)',
                    opacity: p,
                    transform: `translateY(${(1 - p) * 30}px)`,
                    fontSize: 28,
                  }}
                >
                  {r.insignia && tono && <Insignia texto={r.insignia.texto} tam={24} {...tono} />}
                  <div style={{ flex: 1, fontWeight: 500 }}>{r.texto}</div>
                  {r.dato && (
                    <div style={{ color: tema.tintaSuave, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{r.dato}</div>
                  )}
                  {r.icono && (
                    <div style={{ color: r.insignia ? colorTono(r.insignia.tono, tema) : tema.tintaSuave }}>
                      <Icono nombre={r.icono} tam={30} grosor={2.4} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Cristal>
      {conChips && (
        <div style={{ position: 'absolute', left: 0, right: 0, top: cy + alto / 2 + 34, display: 'flex', justifyContent: 'center', gap: 22 }}>
          {e.chips!.map((c, i) => (
            <Chip key={i} tema={tema} texto={c.texto} icono={c.icono} desde={D + 40 + i * 10} />
          ))}
        </div>
      )}
      <Esfera x={cx - ancho / 2 + 10} y={cy + alto / 2 - 40 + flota} tam={96} tema={tema} />
    </Escena>
  );
};
