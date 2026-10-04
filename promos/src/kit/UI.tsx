import React from 'react';
import { useCurrentFrame } from 'remotion';
import { claves, cursorVisible, entra, escritos, formato, frena, pop } from './anim';
import { Icono } from './Iconos';
import { FUENTE, Tema, degradado } from './tema';

/**
 * Barra de acción: la «píldora» de la referencia. `oscura` = azul marino brillante con botón
 * cian (buscador «Ask AI»); `clara` = cristal blanco con botón azul («Free site audit»).
 * El texto se escribe desde `desde`; en `clic` el botón se hunde y suelta un anillo de luz.
 */
export const Barra: React.FC<{
  tema: Tema;
  x: number;
  y: number;
  ancho?: number;
  alto?: number;
  variante?: 'oscura' | 'clara';
  icono?: string;
  placeholder?: string;
  texto: string;
  desde: number;
  clic?: number;
  boton: string;
  iconoBoton?: string;
  escala?: number;
  cps?: number;
}> = ({
  tema,
  x,
  y,
  ancho = 1240,
  alto = 170,
  variante = 'oscura',
  icono = 'lupa',
  placeholder = '',
  texto,
  desde,
  clic,
  boton,
  iconoBoton = 'chispa',
  escala = 1,
  cps = 16,
}) => {
  const f = useCurrentFrame();
  const n = escritos(f, desde, texto, cps);
  const oscura = variante === 'oscura';
  const hundido = clic !== undefined ? claves(f, [clic - 3, clic, clic + 6], [1, 0.93, 1]) : 1;
  const onda = clic !== undefined ? entra(f, clic, 22) : 0;
  const tamTexto = alto * 0.3;
  return (
    <div
      style={{
        position: 'absolute',
        left: x - ancho / 2,
        top: y - alto / 2,
        width: ancho,
        height: alto,
        transform: `scale(${escala})`,
        borderRadius: alto,
        padding: 5,
        background: oscura ? 'linear-gradient(180deg, #4fa3ff, #1d4fd8 60%, #3fd3f5)' : degradado(tema.borde, 160),
        boxShadow: oscura
          ? '0 30px 70px rgba(20,50,140,0.35), 0 0 0 10px rgba(80,160,255,0.10)'
          : '0 30px 70px rgba(60,100,200,0.18)',
        fontFamily: FUENTE,
      }}
    >
      <div
        style={{
          height: '100%',
          borderRadius: alto,
          background: oscura
            ? `linear-gradient(180deg, ${tema.pastilla[1]} 0%, ${tema.pastilla[0]} 70%)`
            : 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(240,245,255,0.95))',
          boxShadow: oscura ? 'inset 0 3px 0 rgba(255,255,255,0.18)' : 'inset 0 2px 0 #fff',
          display: 'flex',
          alignItems: 'center',
          padding: `0 ${alto * 0.2}px 0 ${alto * 0.32}px`,
          gap: alto * 0.16,
          boxSizing: 'border-box',
        }}
      >
        <Icono nombre={icono} tam={alto * 0.26} color={oscura ? '#cfe3ff' : tema.tinta} grosor={2.2} />
        <div
          style={{
            flex: 1,
            fontSize: tamTexto,
            fontWeight: 500,
            color: oscura ? '#ffffff' : tema.tinta,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {n === 0 && placeholder ? (
            <span style={{ color: oscura ? 'rgba(255,255,255,0.45)' : '#9aa3bd' }}>{placeholder}</span>
          ) : (
            texto.slice(0, n)
          )}
          {(clic === undefined || f < clic) && cursorVisible(f) && (
            <span
              style={{
                display: 'inline-block',
                width: 3,
                height: tamTexto * 1.1,
                marginLeft: 4,
                background: oscura ? '#ffffff' : tema.tinta,
              }}
            />
          )}
        </div>
        <div style={{ position: 'relative' }}>
          {onda > 0 && onda < 1 && (
            <div
              style={{
                position: 'absolute',
                inset: -8 - onda * 40,
                borderRadius: alto,
                border: `3px solid ${tema.boton[0]}`,
                opacity: 1 - onda,
              }}
            />
          )}
          <div
            style={{
              transform: `scale(${hundido})`,
              height: alto * 0.56,
              borderRadius: alto,
              padding: `0 ${alto * 0.2}px`,
              display: 'flex',
              alignItems: 'center',
              gap: alto * 0.07,
              background: oscura ? degradado(tema.boton, 180) : degradado(tema.barra),
              color: oscura ? '#062a4a' : '#fff',
              fontSize: alto * 0.15,
              fontWeight: 600,
              boxShadow: oscura
                ? `0 0 0 4px rgba(56,214,245,0.25), 0 8px 24px rgba(30,170,230,0.45)`
                : '0 8px 22px rgba(41,135,254,0.35)',
              whiteSpace: 'nowrap',
            }}
          >
            {iconoBoton && <Icono nombre={iconoBoton} tam={alto * 0.16} grosor={2.4} />}
            {boton}
          </div>
        </div>
      </div>
    </div>
  );
};

/** Píldora pequeña con icono en círculo (los «Nothing to install», «Free», «No sign-up»). */
export const Chip: React.FC<{
  tema: Tema;
  texto: string;
  desde: number;
  icono?: string;
  color?: string;
  tam?: number;
  style?: React.CSSProperties;
}> = ({ tema, texto, desde, icono = 'check', color, tam = 30, style }) => {
  const f = useCurrentFrame();
  const e = entra(f, desde, 10);
  if (e <= 0) return null;
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: tam * 0.4,
        padding: `${tam * 0.32}px ${tam * 0.7}px ${tam * 0.32}px ${tam * 0.35}px`,
        borderRadius: 999,
        background: 'rgba(255,255,255,0.92)',
        boxShadow: '0 10px 30px rgba(60,100,200,0.16), inset 0 1px 0 #fff',
        border: '1.5px solid rgba(140,170,240,0.35)',
        fontFamily: FUENTE,
        fontSize: tam * 0.72,
        fontWeight: 600,
        color: tema.tinta,
        opacity: e,
        transform: `scale(${pop(f, desde)}) translateY(${(1 - e) * 14}px)`,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      <div
        style={{
          width: tam * 1.1,
          height: tam * 1.1,
          borderRadius: '50%',
          background: color ?? degradado(tema.barra, 135),
          display: 'grid',
          placeItems: 'center',
          color: '#fff',
        }}
      >
        <Icono nombre={icono} tam={tam * 0.7} grosor={3} />
      </div>
      {texto}
    </div>
  );
};

/** Anillo con número que cuenta (la «salud general» de la referencia). */
export const AnilloPuntaje: React.FC<{
  valor: number;
  max?: number;
  desde: number;
  dur?: number;
  tam?: number;
  color: string;
  tema: Tema;
  sufijo?: string;
  decimales?: number;
}> = ({ valor, max = 100, desde, dur = 40, tam = 200, color, tema, sufijo = '', decimales = 0 }) => {
  const f = useCurrentFrame();
  const p = entra(f, desde, dur);
  const r = tam / 2 - 14;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: tam, height: tam }}>
      <svg width={tam} height={tam} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={tam / 2} cy={tam / 2} r={r} stroke="#e6eaf4" strokeWidth={22} fill="none" />
        <circle
          cx={tam / 2}
          cy={tam / 2}
          r={r}
          stroke={color}
          strokeWidth={22}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - (p * valor) / max)}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          fontFamily: FUENTE,
          fontWeight: 700,
          fontSize: tam * 0.3,
          color: tema.tinta,
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-0.02em',
        }}
      >
        {formato(p * valor, decimales)}
        {sufijo}
      </div>
    </div>
  );
};

/** Barra de progreso que crece con frenada. */
export const Progreso: React.FC<{
  valor: number; // 0..1
  desde: number;
  ancho: number;
  alto?: number;
  color: string;
}> = ({ valor, desde, ancho, alto = 22, color }) => {
  const f = useCurrentFrame();
  const p = entra(f, desde, 26, frena);
  return (
    <div style={{ width: ancho, height: alto, borderRadius: alto, background: '#e8ecf6' }}>
      <div style={{ width: ancho * valor * p, height: alto, borderRadius: alto, background: color }} />
    </div>
  );
};

/** Etiqueta de color (Critical / High / Pagado …). */
export const Insignia: React.FC<{ texto: string; color: string; fondo: string; tam?: number }> = ({
  texto,
  color,
  fondo,
  tam = 26,
}) => (
  <span
    style={{
      display: 'inline-block',
      padding: `${tam * 0.25}px ${tam * 0.6}px`,
      borderRadius: tam * 0.4,
      background: fondo,
      color,
      fontFamily: FUENTE,
      fontWeight: 600,
      fontSize: tam,
      whiteSpace: 'nowrap',
    }}
  >
    {texto}
  </span>
);

/** Número que cuenta hasta `valor`. */
export const Cifra: React.FC<{
  valor: number;
  desde: number;
  dur?: number;
  decimales?: number;
  prefijo?: string;
  sufijo?: string;
  style?: React.CSSProperties;
}> = ({ valor, desde, dur = 30, decimales = 0, prefijo = '', sufijo = '', style }) => {
  const f = useCurrentFrame();
  const p = entra(f, desde, dur);
  return (
    <span style={{ fontVariantNumeric: 'tabular-nums', ...style }}>
      {prefijo}
      {formato(valor * p, decimales)}
      {sufijo}
    </span>
  );
};
