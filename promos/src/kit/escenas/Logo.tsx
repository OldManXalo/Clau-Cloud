import React from 'react';
import { useCurrentFrame } from 'remotion';
import { claves, entra, escritos, frena } from '../anim';
import { Escena } from '../Escena';
import { Esfera } from '../Esfera';
import { Anillos } from '../Fondo';
import { Icono } from '../Iconos';
import { FUENTE, Tema, degradado } from '../tema';
import { Marca } from '../tipos';

/** Pedestal de discos con la esfera encima: el símbolo de cierre del estilo. */
export const Pedestal: React.FC<{ x: number; y: number; tema: Tema; desde: number; escala?: number }> = ({
  x,
  y,
  tema,
  desde,
  escala = 1,
}) => {
  const f = useCurrentFrame();
  const discos = [300, 240, 180, 120];
  const caida = entra(f, desde + 10, 22, frena);
  const flota = Math.sin((f - desde) / 18) * 6 * caida;
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `scale(${escala})`, transformOrigin: '0 0' }}>
      {discos.map((w, i) => {
        const p = entra(f, desde + i * 4, 16, frena);
        const dy = -i * 34;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: -w / 2,
              top: dy - w * 0.12 + (1 - p) * 40,
              width: w,
              height: w * 0.3,
              borderRadius: '50%',
              opacity: p,
              transform: `scale(${0.6 + 0.4 * p})`,
              background: `linear-gradient(90deg, ${tema.disco[0]}, ${tema.disco[1]})`,
              boxShadow: `inset 0 ${w * 0.05}px ${w * 0.06}px rgba(255,255,255,0.9), 0 ${w * 0.04}px ${w * 0.08}px rgba(70,90,220,0.3)`,
            }}
          />
        );
      })}
      <Esfera x={0} y={-230 + (1 - caida) * -500 + flota} tam={110} tema={tema} opacidad={caida} />
    </div>
  );
};

/** Nombre de la marca: icono + 1.ª parte en tinta + 2.ª parte con degradado, escrito. */
export const Palabra: React.FC<{
  marca: Marca;
  tema: Tema;
  desde: number;
  x: number;
  y: number;
  tam?: number;
  desliza?: number; // 0..1: sale deslizándose a la derecha
}> = ({ marca, tema, desde, x, y, tam = 110, desliza = 0 }) => {
  const f = useCurrentFrame();
  const completo = marca.nombre.join('');
  const n = escritos(f, desde, completo, 22);
  const a = marca.nombre[0].slice(0, n);
  const b = marca.nombre[1].slice(0, Math.max(0, n - marca.nombre[0].length));
  const icono = entra(f, desde - 4, 12);
  return (
    <div
      style={{
        position: 'absolute',
        left: x - 900,
        width: 1800,
        top: y,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: tam * 0.25,
        fontFamily: FUENTE,
        fontWeight: 700,
        fontSize: tam,
        letterSpacing: '-0.03em',
        color: tema.tinta,
        transform: `translateX(${desliza * 260}px)`,
        opacity: 1 - desliza,
        filter: desliza > 0 ? `blur(${desliza * 10}px)` : undefined,
      }}
    >
      <div style={{ opacity: icono, transform: `scale(${0.6 + 0.4 * icono})`, color: tema.tinta }}>
        <Icono nombre={marca.icono} tam={tam * 0.72} grosor={2.4} />
      </div>
      <div style={{ whiteSpace: 'pre', minWidth: tam * completo.length * 0.55, textAlign: 'left' }}>
        {a}
        <span
          style={{
            backgroundImage: degradado(tema.acento),
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {b}
        </span>
      </div>
    </div>
  );
};

export const Logo: React.FC<{ dur: number; marca: Marca; tema: Tema }> = ({ dur, marca, tema }) => {
  const f = useCurrentFrame();
  const desliza = claves(f, [dur - 16, dur], [0, 1]);
  return (
    <Escena dur={dur} entrada="fundido" empuje={0.05}>
      <Anillos x={960} y={640} escala={0.8} />
      <Pedestal x={960} y={560} tema={tema} desde={0} />
      <Palabra marca={marca} tema={tema} desde={14} x={960} y={660} desliza={desliza} />
    </Escena>
  );
};
