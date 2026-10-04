// Colores del estilo «cristal». Los valores base se midieron en el video de referencia
// (titular #020d2f, degradado de acento #6067f2 → #23cfee, esfera #03a4fd, borde de las
// tarjetas #766ee0 → #8ae0fa, barras #2987fe → #2ac7fd). Cada marca cambia solo lo suyo.

export type Tema = {
  tinta: string; // titulares y texto fuerte
  tintaSuave: string; // texto secundario
  linea: string; // barras grises de relleno dentro de las tarjetas
  acento: [string, string]; // degradado de la palabra acento y de los botones
  barra: [string, string]; // barras de progreso
  esfera: [string, string, string]; // centro, borde, reflejo violeta
  borde: [string, string]; // borde de las tarjetas de cristal
  pastilla: [string, string]; // barra oscura (buscador / acción)
  boton: [string, string]; // botón dentro de la barra oscura
  disco: [string, string]; // discos del pedestal del logo
  ok: string;
  aviso: string;
  malo: string;
};

export const TEMA_BASE: Tema = {
  tinta: '#020d2f',
  tintaSuave: '#5b6585',
  linea: '#d9deec',
  acento: ['#6067f2', '#23cfee'],
  barra: ['#2987fe', '#2ac7fd'],
  esfera: ['#03a4fd', '#0a4fd8', '#8b5cf6'],
  borde: ['#766ee0', '#8ae0fa'],
  pastilla: ['#0f1d4a', '#16307a'],
  boton: ['#38d6f5', '#1aa7e8'],
  disco: ['#8f7cf7', '#3b8df5'],
  ok: '#10b981',
  aviso: '#e8891c',
  malo: '#e5484d',
};

export const FUENTE = 'Inter, "SF Pro Display", system-ui, sans-serif';

export const degradado = (c: [string, string], angulo = 90) =>
  `linear-gradient(${angulo}deg, ${c[0]}, ${c[1]})`;
