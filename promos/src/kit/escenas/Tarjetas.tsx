import React from 'react';
import { useCurrentFrame } from 'remotion';
import { entra, frena } from '../anim';
import { Cristal } from '../Cristal';
import { Escena } from '../Escena';
import { Esfera } from '../Esfera';
import { Anillos } from '../Fondo';
import { Icono } from '../Iconos';
import { FUENTE, Tema, degradado } from '../tema';
import { EscenaTarjetas } from '../tipos';
import { Rotulo } from '../Titular';
import { Chip, Insignia } from '../UI';
import { insigniaTono } from '../colores';

/** Varias tarjetas que se abren en abanico 3D (sucursales, roles, dispositivos…). */
export const Tarjetas: React.FC<{ e: EscenaTarjetas; tema: Tema }> = ({ e, tema }) => {
  const f = useCurrentFrame();
  const D = e.rotulo ? 12 : 4;
  const n = e.tarjetas.length;
  const cy = e.rotulo ? 600 : 540;
  const sep = n > 3 ? 420 : 500;
  const quien = Math.min(n - 1, Math.floor(Math.max(0, f - D - 30) / 18));
  return (
    <Escena dur={e.dur}>
      <Anillos x={960} y={cy + 300} />
      {e.rotulo && <Rotulo texto={e.rotulo.texto} acento={e.rotulo.acento} tema={tema} desde={2} hasta={e.dur - 6} />}
      {e.tarjetas.map((t, i) => {
        const p = entra(f, D + i * 6, 22, frena);
        const off = i - (n - 1) / 2;
        const x = 960 + off * sep * p;
        const activa = i === quien && f > D + 30;
        return (
          <Cristal
            key={i}
            tema={tema}
            x={x}
            y={cy + Math.abs(off) * 30 - (activa ? 16 : 0)}
            ancho={440}
            alto={420}
            rotY={-off * 14 * p}
            escala={0.8 + 0.2 * p}
            opacidad={Math.min(1, p * 1.5)}
            relleno={38}
          >
            <div style={{ fontFamily: FUENTE, color: tema.tinta, display: 'flex', flexDirection: 'column', gap: 18, height: '100%' }}>
              <div
                style={{
                  width: 92,
                  height: 92,
                  borderRadius: 26,
                  background: degradado(tema.barra, 135),
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  boxShadow: '0 12px 28px rgba(41,135,254,0.35)',
                }}
              >
                <Icono nombre={t.icono} tam={50} grosor={2.2} />
              </div>
              <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{t.titulo}</div>
              {t.sub && <div style={{ fontSize: 25, color: tema.tintaSuave, lineHeight: 1.3 }}>{t.sub}</div>}
              {t.insignia && (
                <div style={{ marginTop: 'auto' }}>
                  <Insignia texto={t.insignia.texto} tam={24} {...insigniaTono(t.insignia.tono, tema)} />
                </div>
              )}
            </div>
          </Cristal>
        );
      })}
      <Esfera
        x={960 + (quien - (n - 1) / 2) * sep + 150}
        y={cy - 230 + Math.sin(f / 10) * 6}
        tam={56}
        tema={tema}
        opacidad={entra(f, D + 26, 8)}
      />
      {e.chips && (
        <div style={{ position: 'absolute', left: 0, right: 0, top: cy + 290, display: 'flex', justifyContent: 'center', gap: 22 }}>
          {e.chips.map((c, i) => (
            <Chip key={i} tema={tema} texto={c.texto} icono={c.icono} desde={D + 40 + i * 8} tam={32} />
          ))}
        </div>
      )}
    </Escena>
  );
};
