import React from 'react';
import { useCurrentFrame } from 'remotion';
import { entra, escritos } from '../anim';
import { Escena } from '../Escena';
import { Anillos } from '../Fondo';
import { FUENTE, Tema } from '../tema';
import { Marca } from '../tipos';
import { Palabra, Pedestal } from './Logo';

/** Firma final: pedestal, nombre, lema, dirección escrita y la oferta en una píldora. */
export const Cierre: React.FC<{ dur: number; marca: Marca; tema: Tema }> = ({ dur, marca, tema }) => {
  const f = useCurrentFrame();
  const lema = entra(f, 30, 14);
  const urlDesde = 46;
  const n = marca.url ? escritos(f, urlDesde, marca.url, 24) : 0;
  const ofDesde = urlDesde + (marca.url ? 26 : 0);
  const of = entra(f, ofDesde, 14);
  const ofTexto = marca.oferta ? escritos(f, ofDesde + 8, marca.oferta.texto, 30) : 0;
  return (
    <Escena dur={dur} entrada="fundido" salida="ninguna" empuje={0.04}>
      <Anillos x={960} y={560} escala={0.9} />
      <Pedestal x={960} y={430} tema={tema} desde={0} escala={0.85} />
      <Palabra marca={marca} tema={tema} desde={10} x={960} y={500} tam={104} />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 660,
          textAlign: 'center',
          fontFamily: FUENTE,
          fontSize: 40,
          fontWeight: 500,
          color: tema.tintaSuave,
          opacity: lema,
          transform: `translateY(${(1 - lema) * 16}px)`,
        }}
      >
        {marca.lema}
      </div>
      {marca.url && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 730,
            textAlign: 'center',
            fontFamily: FUENTE,
            fontSize: 38,
            fontWeight: 650,
            color: tema.tinta,
          }}
        >
          {marca.url.slice(0, n)}
        </div>
      )}
      {marca.oferta && of > 0 && (
        <div style={{ position: 'absolute', left: 0, right: 0, top: marca.url ? 810 : 750, display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              padding: '12px 30px 12px 14px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.95)',
              border: `2px solid ${tema.acento[0]}55`,
              boxShadow: '0 14px 40px rgba(60,100,200,0.18)',
              fontFamily: FUENTE,
              fontSize: 30,
              fontWeight: 600,
              color: tema.tinta,
              opacity: of,
              transform: `scale(${0.85 + 0.15 * of})`,
              minWidth: 300,
            }}
          >
            <span
              style={{
                padding: '8px 18px',
                borderRadius: 999,
                background: `${tema.acento[0]}1c`,
                color: tema.acento[0],
              }}
            >
              {marca.oferta.etiqueta}
            </span>
            {marca.oferta.texto.slice(0, ofTexto)}
          </div>
        </div>
      )}
    </Escena>
  );
};
