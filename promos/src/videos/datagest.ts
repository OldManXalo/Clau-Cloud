import { TEMA_BASE, Tema } from '../kit/tema';
import { Guion } from '../kit/tipos';

// Data Gest no tiene paleta de marca (web/PRODUCT.md): se parte de su tinta slate-900 y del
// verde «entra» (emerald) de su DESIGN.md, combinados con el azul del estilo cristal.
export const temaDataGest: Tema = {
  ...TEMA_BASE,
  tinta: '#0f172a',
  tintaSuave: '#475569',
  acento: ['#2563eb', '#10b981'],
  barra: ['#0ea5e9', '#10b981'],
  esfera: ['#38d1f5', '#0369a1', '#10b981'],
  borde: ['#60a5fa', '#6ee7b7'],
  pastilla: ['#0b1222', '#1e293b'],
  boton: ['#6ee7b7', '#10b981'],
  disco: ['#7dd3fc', '#10b981'],
  ok: '#047857',
};

export const guionDataGest: Guion = {
  marca: {
    nombre: ['Data', 'Gest'],
    icono: 'caja',
    lema: 'Inventario por serial, caja y tasa del día',
    oferta: { etiqueta: 'Pruébalo', texto: 'Pide tu demo hoy' },
  },
  // Locución: una frase por escena; `desde` = segundo en que arranca el clip (escenas en
  // 0 · 6 · 10 · 12 · 16 · 20 · 24 · 28 s). El clip N va en public/<voz>/NN.mp3.
  locucion: [
    { desde: 0.4, texto: 'Tu tienda vende sin parar. ¿Pero sabes dónde está cada equipo… y a qué precio?' },
    { desde: 6.3, texto: 'Busca por serial o IMEI y lo encuentras al instante.' },
    { desde: 10.2, texto: 'Con Data Gest.' },
    { desde: 12.3, texto: 'Cada unidad con su serial. El stock se cuenta solo.' },
    { desde: 16.3, texto: 'Cobra en bolívares o en dólares, con la tasa del día.' },
    { desde: 20.3, texto: 'Mueve equipos entre locales, con rastro de todo.' },
    { desde: 24.3, texto: 'Y al final del día, la caja cierra cuadrada.' },
    { desde: 28.4, texto: 'Data Gest. Inventario por serial, caja y tasa del día. Pide tu demo hoy.' },
  ],
  escenas: [
    {
      tipo: 'hero',
      dur: 190,
      titulares: [
        { lineas: ['Tu tienda', 'vende sin parar.'], desde: 4, hasta: 84 },
        { lineas: ['¿Dónde está', 'cada equipo?'], desde: 90 },
      ],
      app: {
        titulo: 'Inventario de hoy',
        filas: [
          { etiqueta: 'Celulares', valor: '148' },
          { etiqueta: 'Audífonos', valor: '96' },
          { etiqueta: 'Routers', valor: '37' },
        ],
        mosaicos: [
          { icono: 'caja', etiqueta: 'Depósito' },
          { icono: 'tienda', etiqueta: 'Centro' },
          { icono: 'tienda', etiqueta: 'Este' },
        ],
      },
      alertas: [
        { texto: 'Seriales perdidos', icono: 'codigo', desde: 118 },
        { texto: 'Stock que no cuadra', icono: 'caja', desde: 130 },
        { texto: 'Precio con la tasa de ayer', icono: 'dinero', desde: 142 },
      ],
    },
    {
      tipo: 'barra',
      dur: 130,
      variante: 'oscura',
      rotulo: { texto: 'Búscalo por', acento: 'serial o IMEI.' },
      icono: 'lupa',
      placeholder: 'Serial, IMEI o producto',
      texto: '356938035643809',
      boton: 'Buscar',
      iconoBoton: 'lupa',
      clic: 54,
      resultados: [
        { titulo: 'Smartphone X · 256 GB', sub: 'IMEI 356938035643809', dato: 'Disponible', tono: 'ok', icono: 'telefono' },
        { titulo: 'Tienda Centro', sub: 'Llegó en la compra #214', icono: 'tienda' },
        { titulo: 'Precio de hoy', sub: 'En Bs con la tasa del día', dato: '$ 219', icono: 'dinero' },
      ],
    },
    { tipo: 'logo', dur: 70 },
    {
      tipo: 'rejilla',
      dur: 130,
      rotulo: { texto: 'Cada unidad,', acento: 'con su serial.' },
      titulo: 'Inventario por unidad',
      sub: 'La cantidad se cuenta sola, nunca se escribe a mano',
      columnas: 4,
      celdas: [
        { texto: 'Smartphone X', sub: '356938035643809' },
        { texto: 'Smartphone X', sub: '356938035643817' },
        { texto: 'Audífonos BT', sub: 'AB2309114' },
        { texto: 'Router AC', sub: 'RT77810452' },
        { texto: 'Smartphone Y', sub: '358240051111110' },
        { texto: 'Audífonos BT', sub: 'AB2309127' },
        { texto: 'Cargador 20 W', sub: 'CG0045521' },
        { texto: 'Smartwatch', sub: 'SW5530081' },
      ],
      lateral: { icono: 'caja', texto: 'Stock al día en 3 locales' },
    },
    {
      tipo: 'panel',
      dur: 130,
      rotulo: { texto: 'Cobra en Bs y $', acento: 'sin errores.' },
      url: 'Caja · Tienda Centro',
      titulo: 'Venta #0148',
      sub: 'La tasa queda congelada en la venta',
      anillo: {
        valor: 219,
        max: 219,
        etiqueta: 'Total en dólares',
        insignia: { texto: 'Bs 170.820', tono: 'acento' },
        tono: 'ok',
      },
      barras: [
        { etiqueta: 'Pago móvil', valor: 0.46, dato: '$ 100' },
        { etiqueta: 'Punto', valor: 0.36, dato: '$ 79' },
        { etiqueta: 'Efectivo $', valor: 0.18, dato: '$ 40' },
      ],
      filas: [
        { insignia: { texto: 'Financiada', tono: 'violeta' }, texto: 'Inicial y cuotas con financiera', dato: '3 cuotas', icono: 'tarjeta' },
        { insignia: { texto: 'Registrada', tono: 'ok' }, texto: 'Nota de entrega lista para imprimir', icono: 'documento' },
      ],
    },
    {
      tipo: 'tarjetas',
      dur: 130,
      rotulo: { texto: 'Mueve stock', acento: 'entre locales.' },
      tarjetas: [
        { titulo: 'Depósito', sub: 'Salen 12 unidades', icono: 'caja' },
        { titulo: 'Traslado #31', sub: 'Queda quién lo hizo y cuándo', icono: 'camion', insignia: { texto: 'Con rastro', tono: 'acento' } },
        { titulo: 'Tienda Este', sub: 'Entran 12 unidades', icono: 'tienda', insignia: { texto: 'Recibido', tono: 'ok' } },
      ],
    },
    {
      tipo: 'panel',
      dur: 130,
      rotulo: { texto: 'Cierra el día', acento: 'cuadrado.' },
      titulo: 'Cierre de caja',
      sub: 'Por cuenta de cobro, contra cada terminal',
      barras: [
        { etiqueta: 'Pago móvil', valor: 0.9, dato: '$ 1.240', tono: 'ok' },
        { etiqueta: 'Punto 1', valor: 0.63, dato: '$ 860', tono: 'ok' },
        { etiqueta: 'Punto 2', valor: 0.38, dato: '$ 515', tono: 'ok' },
        { etiqueta: 'Efectivo $', valor: 0.32, dato: '$ 430', tono: 'ok' },
      ],
      filas: [{ insignia: { texto: 'Cuadrado', tono: 'ok' }, texto: 'Todas las cuentas coinciden', icono: 'check' }],
      chips: [
        { texto: 'Rastro de cada operación', icono: 'escudo' },
        { texto: 'En el teléfono o la PC', icono: 'telefono' },
        { texto: 'Cada negocio ve lo suyo', icono: 'usuario' },
      ],
    },
    { tipo: 'cierre', dur: 190 },
  ],
};
