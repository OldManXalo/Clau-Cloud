import React from 'react';
import { Tema } from './tema';

/**
 * La esfera brillante que guía la mirada por todo el video (en la referencia recorre la
 * tarjeta, pulsa botones, salta entre casillas y corona el logo).
 * x, y = centro en px del lienzo. `piso` = altura del piso para el reflejo y la sombra.
 */
export const Esfera: React.FC<{
  x: number;
  y: number;
  tam?: number;
  tema: Tema;
  piso?: number;
  opacidad?: number;
  desenfoque?: number;
}> = ({ x, y, tam = 120, tema, piso, opacidad = 1, desenfoque = 0 }) => {
  const [c, b, v] = tema.esfera;
  const bola: React.CSSProperties = {
    position: 'absolute',
    left: x - tam / 2,
    top: y - tam / 2,
    width: tam,
    height: tam,
    borderRadius: '50%',
    background: `radial-gradient(circle at 32% 26%, #ffffff 0%, #d9f3ff 7%, ${c} 30%, ${b} 72%, ${v} 100%)`,
    boxShadow: `inset -${tam * 0.08}px -${tam * 0.1}px ${tam * 0.2}px rgba(80,40,200,0.35), 0 ${tam * 0.18}px ${tam * 0.4}px rgba(20,80,200,0.28)`,
    opacity: opacidad,
    filter: desenfoque ? `blur(${desenfoque}px)` : undefined,
  };
  const alturaSobrePiso = piso !== undefined ? Math.max(0, piso - (y + tam / 2)) : 0;
  return (
    <>
      {piso !== undefined && (
        <>
          {/* sombra de contacto: más chica y tenue cuanto más alto está */}
          <div
            style={{
              position: 'absolute',
              left: x - tam * 0.55,
              top: piso - tam * 0.09,
              width: tam * 1.1,
              height: tam * 0.18,
              borderRadius: '50%',
              background: 'rgba(40,80,170,0.35)',
              filter: `blur(${10 + alturaSobrePiso * 0.08}px)`,
              opacity: opacidad * Math.max(0.15, 1 - alturaSobrePiso / 400),
            }}
          />
          {/* reflejo en el piso */}
          <div
            style={{
              ...bola,
              top: piso + alturaSobrePiso,
              transform: 'scaleY(-0.55)',
              transformOrigin: '50% 0%',
              opacity: opacidad * 0.25,
              filter: 'blur(6px)',
              boxShadow: 'none',
            }}
          />
        </>
      )}
      <div style={bola} />
    </>
  );
};
