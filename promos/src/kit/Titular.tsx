import React from 'react';
import { useCurrentFrame } from 'remotion';
import { claves } from './anim';
import { FUENTE, Tema, degradado } from './tema';

/**
 * Titular que se escribe de izquierda a derecha con borde suave: las letras recién llegadas se
 * ven claras y desenfocadas un instante (en la referencia: «Your we…», «Loo…»). Las letras no
 * se recolocan; el bloque ocupa su sitio desde el inicio. La línea `acento` lleva el degradado.
 */
export const Titular: React.FC<{
  lineas: string[];
  tema: Tema;
  desde: number; // fotograma local en que empieza a escribirse
  hasta?: number; // fotograma local en que termina de borrarse
  acento?: number; // índice de la línea con degradado (-1 = ninguna)
  x: number;
  y: number; // borde superior del bloque
  tam?: number;
  alinear?: 'left' | 'center';
  cps?: number; // letras por segundo
  enLinea?: boolean; // todas las «líneas» en un solo renglón (para rótulos)
}> = ({ lineas, tema, desde, hasta, acento = 1, x, y, tam = 104, alinear = 'left', cps = 26, enLinea = false }) => {
  const f = useCurrentFrame();
  const total = lineas.join('').length;
  const durTotal = (total * 30) / cps;
  // salida: se borra todo en 8 fotogramas, de derecha a izquierda
  const borrado = hasta !== undefined ? claves(f, [hasta - 8, hasta], [0, 1]) : 0;
  let acumulado = 0;
  const contenido = lineas.map((linea, li) => {
    const ini = desde + (acumulado / total) * durTotal;
    const fin = desde + ((acumulado + linea.length) / total) * durTotal;
    acumulado += linea.length;
    // p: borde del barrido en % del ancho de la línea (con 18 % de borde suave)
    const p = claves(f, [ini, fin], [-18, 100], (t) => t);
    const pb = 100 - borrado * 118;
    const mascara = `linear-gradient(90deg, #000 ${Math.min(p, pb)}%, rgba(0,0,0,0.25) ${Math.min(p, pb) + 9}%, transparent ${Math.min(p, pb) + 18}%)`;
    const estilo: React.CSSProperties = {
      display: enLinea ? 'inline-block' : 'block',
      WebkitMaskImage: mascara,
      maskImage: mascara,
      paddingBottom: '0.08em',
    };
    if (li === acento) {
      Object.assign(estilo, {
        backgroundImage: degradado(tema.acento),
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      });
    }
    return (
      <span key={li} style={estilo}>
        {linea}
      </span>
    );
  });
  // desenfoque leve mientras escribe
  const escribiendo = f >= desde && f <= desde + durTotal + 6;
  return (
    <div
      style={{
        position: 'absolute',
        left: alinear === 'center' ? x - 950 : x,
        top: y,
        width: alinear === 'center' ? 1900 : undefined,
        textAlign: alinear,
        fontFamily: FUENTE,
        fontWeight: 700,
        fontSize: tam,
        lineHeight: 1.08,
        letterSpacing: '-0.025em',
        color: tema.tinta,
        whiteSpace: 'pre',
        filter: escribiendo ? 'blur(0.4px)' : undefined,
      }}
    >
      {contenido}
    </div>
  );
};

/** Frase corta de apoyo (rótulo superior de las escenas de producto). */
export const Rotulo: React.FC<{
  texto: string;
  acento?: string; // remate con degradado
  tema: Tema;
  desde: number;
  hasta?: number;
  x?: number;
  y?: number;
  tam?: number;
}> = ({ texto, acento, tema, desde, hasta, x = 960, y = 104, tam = 64 }) => (
  <Titular
    lineas={acento ? [texto + ' ', acento] : [texto]}
    acento={acento ? 1 : -1}
    tema={tema}
    desde={desde}
    hasta={hasta}
    x={x}
    y={y}
    tam={tam}
    alinear="center"
    cps={40}
    enLinea
  />
);
