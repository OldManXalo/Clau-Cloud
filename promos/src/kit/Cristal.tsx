import React from 'react';
import { Tema, degradado } from './tema';

/**
 * Tarjeta de cristal: blanco translúcido, borde con degradado violeta → cian, sombra azulada
 * y un brillo en el borde superior. x, y = centro en px. rotY/rotX en grados (perspectiva del
 * contenedor). El contenido va en px reales de la tarjeta.
 */
export const Cristal: React.FC<{
  x: number;
  y: number;
  ancho: number;
  alto: number;
  tema: Tema;
  rotY?: number;
  rotX?: number;
  escala?: number;
  opacidad?: number;
  desenfoque?: number;
  radio?: number;
  relleno?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({
  x,
  y,
  ancho,
  alto,
  tema,
  rotY = 0,
  rotX = 0,
  escala = 1,
  opacidad = 1,
  desenfoque = 0,
  radio = 34,
  relleno = 36,
  style,
  children,
}) => (
  <div
    style={{
      position: 'absolute',
      left: x - ancho / 2,
      top: y - alto / 2,
      width: ancho,
      height: alto,
      transform: `perspective(2200px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${escala})`,
      opacity: opacidad,
      filter: desenfoque ? `blur(${desenfoque}px)` : undefined,
      borderRadius: radio,
      padding: 3,
      background: degradado(tema.borde, 160),
      boxShadow: '0 40px 90px rgba(50,90,190,0.20), 0 8px 24px rgba(50,90,190,0.10)',
      ...style,
    }}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: radio - 3,
        background: 'linear-gradient(170deg, rgba(255,255,255,0.97) 0%, rgba(244,247,255,0.93) 60%, rgba(236,242,255,0.92) 100%)',
        boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.9), inset 0 -10px 30px rgba(120,150,230,0.10)',
        padding: relleno,
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  </div>
);

/** Barra gris de relleno (texto simulado). */
export const Linea: React.FC<{ ancho: number; alto?: number; color?: string; style?: React.CSSProperties }> = ({
  ancho,
  alto = 14,
  color = '#d9deec',
  style,
}) => <div style={{ width: ancho, height: alto, borderRadius: alto, background: color, ...style }} />;
