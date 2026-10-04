import React from 'react';

// Iconos de trazo simples (24×24), dibujados aquí para no depender de librerías ni de marcas.
const rutas: Record<string, React.ReactNode> = {
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
  lupa: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  chispa: <path d="M12 3l1.8 5.7L19.5 10.5l-5.7 1.8L12 18l-1.8-5.7L4.5 10.5l5.7-1.8z" />,
  mas: <path d="M12 5v14M5 12h14" />,
  menos: <path d="M5 12h14" />,
  tijera: (
    <>
      <circle cx="6.5" cy="17" r="3" />
      <circle cx="17.5" cy="17" r="3" />
      <path d="M8.6 14.8L18 4M15.4 14.8L6 4" />
    </>
  ),
  caja: (
    <>
      <path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z" />
      <path d="M3.5 7.5L12 12l8.5-4.5M12 12v9" />
    </>
  ),
  reloj: (
    <>
      <circle cx="12" cy="13" r="7.5" />
      <path d="M12 9v4.2l2.8 1.8M9.5 2.8h5" />
    </>
  ),
  documento: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </>
  ),
  alerta: (
    <>
      <path d="M12 3.5L21.5 20h-19z" />
      <path d="M12 10v4.5M12 17.2v.3" />
    </>
  ),
  nube: <path d="M7 18.5h10.5a4 4 0 00.6-7.95A6 6 0 006.4 9.2 4.7 4.7 0 007 18.5z" />,
  telefono: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  tienda: (
    <>
      <path d="M4 9.5V20h16V9.5M3 9.5l1.8-5h14.4l1.8 5z" />
      <path d="M9.5 20v-5.5h5V20" />
    </>
  ),
  flecha: <path d="M5 12h13M13 6l6 6-6 6" />,
  usuario: (
    <>
      <circle cx="12" cy="8.5" r="3.8" />
      <path d="M4.5 20.5c1.2-3.8 4-5.6 7.5-5.6s6.3 1.8 7.5 5.6" />
    </>
  ),
  dinero: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  tarjeta: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
      <path d="M2.5 10h19M6 15h4" />
    </>
  ),
  escudo: <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6z" />,
  grafica: <path d="M4 19V5M4 19h16M8 15l3.5-4 3 2.5L20 7" />,
  wifi: (
    <>
      <path d="M2.5 9a14 14 0 0119 0M5.8 12.5a9 9 0 0112.4 0M9.2 16a4 4 0 015.6 0" />
      <path d="M12 19.3v.2" />
    </>
  ),
  codigo: <path d="M4 6v12M7 6v12M10 6v12M13.5 6v12M16 6v12M20 6v12" />,
  camion: (
    <>
      <path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7z" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="16.5" cy="17.5" r="1.8" />
    </>
  ),
};

export type NombreIcono = keyof typeof rutas | string;

export const Icono: React.FC<{ nombre: NombreIcono; tam?: number; color?: string; grosor?: number }> = ({
  nombre,
  tam = 28,
  color = 'currentColor',
  grosor = 2,
}) => (
  <svg
    width={tam}
    height={tam}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={grosor}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'block', flexShrink: 0 }}
  >
    {rutas[nombre] ?? rutas.chispa}
  </svg>
);
