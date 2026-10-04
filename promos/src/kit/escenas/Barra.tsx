import React from 'react';
import { useCurrentFrame } from 'remotion';
import { claves, entra, frena } from '../anim';
import { Escena } from '../Escena';
import { Esfera } from '../Esfera';
import { Anillos } from '../Fondo';
import { Icono } from '../Iconos';
import { FUENTE, Tema } from '../tema';
import { EscenaBarra } from '../tipos';
import { Rotulo } from '../Titular';
import { Barra as Pildora, Chip, Insignia } from '../UI';
import { colorTono, insigniaTono } from '../colores';

/** La acción principal en una «píldora»: aparece girando en 3D, se escribe, se pulsa, sube y
 *  deja caer debajo los resultados (como el buscador «Ask AI» de la referencia). */
export const Barra: React.FC<{ e: EscenaBarra; tema: Tema }> = ({ e, tema }) => {
  const f = useCurrentFrame();
  const gira = entra(f, 0, 22, frena);
  const hay = (e.resultados?.length ?? 0) > 0;
  const subir = hay ? entra(f, e.clic + 6, 18) : 0;
  const ancho = 1240;
  const alto = 170;
  const by = claves(subir, [0, 1], [e.rotulo ? 560 : 520, e.rotulo ? 300 : 220], (t) => t);
  const escala = 1 - subir * 0.36;
  // la esfera hace de dedo: llega al botón justo en el clic
  const bx = 960 + ancho / 2 - 190;
  const llega = entra(f, e.clic - 16, 16);
  const ex = claves(llega, [0, 1], [1700, bx], (t) => t);
  const ey = claves(llega, [0, 1], [880, by + 6], (t) => t) - Math.sin(llega * Math.PI) * 120;
  const esferaFuera = entra(f, e.clic + 4, 10);
  return (
    <Escena dur={e.dur}>
      <Anillos x={960} y={900} opacidad={0.8} />
      {e.rotulo && <Rotulo texto={e.rotulo.texto} acento={e.rotulo.acento} tema={tema} desde={4} hasta={e.dur - 6} />}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `perspective(1600px) rotateX(${(1 - gira) * 62}deg) scale(${0.7 + 0.3 * gira})`,
          transformOrigin: `960px ${by}px`,
          opacity: Math.min(1, gira * 1.6),
        }}
      >
        <Pildora
          tema={tema}
          x={960}
          y={by}
          ancho={ancho}
          alto={alto}
          variante={e.variante}
          icono={e.icono}
          placeholder={e.placeholder}
          texto={e.texto}
          desde={16}
          clic={e.clic}
          boton={e.boton}
          iconoBoton={e.iconoBoton}
          escala={escala}
        />
      </div>
      {e.chips && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: by + alto / 2 + 60,
            display: 'flex',
            justifyContent: 'center',
            gap: 22,
            opacity: 1 - subir,
          }}
        >
          {e.chips.map((c, i) => (
            <Chip key={i} tema={tema} texto={c.texto} icono={c.icono} desde={e.clic - 40 + i * 8} />
          ))}
        </div>
      )}
      {e.resultados?.map((r, i) => {
        const p = entra(f, e.clic + 14 + i * 7, 16);
        if (p <= 0) return null;
        const c = colorTono(r.tono, tema);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 960 - 520,
              width: 1040,
              top: 430 + i * 150 + (1 - p) * 80,
              height: 124,
              opacity: p,
              transform: `scale(${0.94 + 0.06 * p})`,
              borderRadius: 28,
              background: 'linear-gradient(170deg, rgba(255,255,255,0.97), rgba(240,245,255,0.92))',
              border: '2px solid rgba(140,170,240,0.45)',
              boxShadow: '0 24px 60px rgba(60,100,200,0.16)',
              display: 'flex',
              alignItems: 'center',
              gap: 26,
              padding: '0 36px',
              boxSizing: 'border-box',
              fontFamily: FUENTE,
              color: tema.tinta,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                background: `${c}1c`,
                color: c,
              }}
            >
              <Icono nombre={r.icono ?? 'check'} tam={34} grosor={2.4} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 34, fontWeight: 650 }}>{r.titulo}</div>
              {r.sub && <div style={{ fontSize: 24, color: tema.tintaSuave, marginTop: 4 }}>{r.sub}</div>}
            </div>
            {r.dato &&
              (r.tono ? (
                <Insignia texto={r.dato} tam={28} {...insigniaTono(r.tono, tema)} />
              ) : (
                <div style={{ fontSize: 34, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{r.dato}</div>
              ))}
          </div>
        );
      })}
      <Esfera x={ex} y={ey} tam={64} tema={tema} opacidad={(f > e.clic - 16 ? 1 : 0) * (1 - esferaFuera)} />
    </Escena>
  );
};
