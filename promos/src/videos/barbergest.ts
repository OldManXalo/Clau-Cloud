import { TEMA_BASE, Tema } from '../kit/tema';
import { Guion } from '../kit/tipos';

// Colores sacados de BarberGest (index.html: --acc #5e6ad2, --acc-hi #828fff).
export const temaBarberGest: Tema = {
  ...TEMA_BASE,
  tinta: '#0b1030',
  acento: ['#5e6ad2', '#22c3ee'],
  barra: ['#5e6ad2', '#828fff'],
  esfera: ['#8b95ff', '#3b45c4', '#a855f7'],
  borde: ['#828fff', '#8ae0fa'],
  pastilla: ['#0d0f24', '#1c2156'],
  disco: ['#a5adff', '#5e6ad2'],
  ok: '#27a644',
};

// Duraciones: cada escena avanza (dur − 10) fotogramas; con 120 BPM a 30 fps, 15 = 1 golpe.
export const guionBarberGest: Guion = {
  marca: {
    nombre: ['Barber', 'Gest'],
    icono: 'tijera',
    lema: 'Gestión de barberías en bolívares y dólares',
    oferta: { etiqueta: 'Pruébalo', texto: 'Pide tu demo hoy' },
  },
  // Locución: una frase por escena; `desde` = segundo en que arranca el clip (escenas en
  // 0 · 6 · 10 · 12 · 16 · 20 · 24 · 28 s). El clip N va en public/<voz>/NN.mp3.
  locucion: [
    { desde: 0.4, texto: 'Tu barbería no para. Pero al cerrar… ¿cuánto entró y cuánto le toca a cada uno?' },
    { desde: 6.3, texto: 'Ahora, cada corte se registra con un toque.' },
    { desde: 10.2, texto: 'Con BarberGest.' },
    { desde: 12.3, texto: 'Cobra en dólares o bolívares, con la tasa del día guardada.' },
    { desde: 16.3, texto: 'El pago de cada barbero se calcula solo.' },
    { desde: 20.3, texto: 'Mira tus ingresos y cierra la caja cuadrada.' },
    { desde: 24.3, texto: 'Todas tus sucursales en la nube… incluso sin internet.' },
    { desde: 28.4, texto: 'BarberGest. La gestión de tu barbería, en bolívares y dólares. Pide tu demo hoy.' },
  ],
  escenas: [
    {
      tipo: 'hero',
      dur: 190,
      titulares: [
        { lineas: ['Tu barbería', 'no para.'], desde: 4, hasta: 84 },
        { lineas: ['¿Y las cuentas', 'del día?'], desde: 90 },
      ],
      app: {
        titulo: 'Hoy en la barbería',
        filas: [
          { etiqueta: 'Cortes', valor: '23' },
          { etiqueta: 'Efectivo $', valor: '$ 64' },
          { etiqueta: 'Pago móvil', valor: 'Bs 41.500' },
        ],
        mosaicos: [
          { icono: 'tijera', etiqueta: 'Servicios' },
          { icono: 'usuario', etiqueta: 'Barberos' },
          { icono: 'dinero', etiqueta: 'Caja' },
        ],
      },
      alertas: [
        { texto: 'Pagos sin cuadrar', icono: 'alerta', desde: 118 },
        { texto: '¿Cuánto le toca a cada uno?', icono: 'usuario', desde: 130 },
        { texto: 'La tasa cambió otra vez', icono: 'dinero', desde: 142 },
      ],
    },
    {
      tipo: 'barra',
      dur: 130,
      variante: 'oscura',
      rotulo: { texto: 'Cada corte,', acento: 'un toque.' },
      icono: 'tijera',
      texto: 'Corte · Pago móvil',
      boton: '+1 corte',
      iconoBoton: 'mas',
      clic: 58,
      resultados: [
        { titulo: 'Corte × 3', sub: 'Pago móvil · precio editable', dato: 'Bs 13.500', icono: 'tijera' },
        { titulo: 'Al barbero (50 %)', sub: 'Se calcula solo', dato: 'Bs 6.750', icono: 'usuario' },
        { titulo: 'Para la barbería', sub: 'Queda en la caja del día', dato: 'Bs 6.750', icono: 'tienda' },
      ],
    },
    { tipo: 'logo', dur: 70 },
    {
      tipo: 'rejilla',
      dur: 130,
      rotulo: { texto: 'Bolívares y dólares,', acento: 'sin enredos.' },
      titulo: 'Registro diario',
      sub: 'Cada forma de pago en su moneda · tasa del día guardada',
      columnas: 4,
      celdas: [
        { texto: 'Efectivo $', sub: 'Corte × 2' },
        { texto: 'Pago móvil', sub: 'Corte × 3' },
        { texto: 'Punto', sub: 'Barba × 1' },
        { texto: 'Efectivo Bs', sub: 'Cejas × 2' },
        { texto: 'Efectivo $', sub: 'Barba × 1' },
        { texto: 'Pago móvil', sub: 'Cejas × 1' },
        { texto: 'Punto', sub: 'Corte × 2' },
        { texto: 'Zelle', sub: 'Corte × 1' },
      ],
      chips: [
        { texto: 'Precio en $ y en Bs', icono: 'dinero' },
        { texto: 'Tasa guardada en cada registro', icono: 'check' },
      ],
    },
    {
      tipo: 'panel',
      dur: 130,
      rotulo: { texto: 'El reparto', acento: 'se calcula solo.' },
      titulo: 'Pagos y cierres',
      sub: 'Esta semana',
      anillo: {
        valor: 50,
        sufijo: '%',
        etiqueta: 'Para el barbero',
        insignia: { texto: 'o monto fijo por servicio', tono: 'acento' },
      },
      barras: [
        { etiqueta: 'Luis', valor: 0.92, dato: '$ 142' },
        { etiqueta: 'Andrés', valor: 0.77, dato: '$ 118' },
        { etiqueta: 'Kevin', valor: 0.62, dato: '$ 96' },
        { etiqueta: 'Óscar', valor: 0.48, dato: '$ 74' },
      ],
      filas: [
        { insignia: { texto: 'Por pagar', tono: 'aviso' }, texto: 'Luis · 28 servicios', dato: '$ 142,00', icono: 'flecha' },
        { insignia: { texto: 'Pagado', tono: 'ok' }, texto: 'Andrés · 23 servicios', dato: '$ 118,50', icono: 'check' },
      ],
    },
    {
      tipo: 'grafica',
      dur: 130,
      rotulo: { texto: 'Ingresos claros,', acento: 'caja cuadrada.' },
      titulo: 'Ingresos',
      sub: 'Por día, por barbero y por forma de pago',
      esquina: 'Últimos 7 días',
      puntos: [32, 41, 38, 52, 47, 63, 71],
      alerta: {
        titulo: 'Cierre del día',
        texto: 'Caja cuadrada por forma de pago',
        icono: 'check',
        tono: 'ok',
        botones: ['Recibo PDF', 'Exportar CSV'],
      },
    },
    {
      tipo: 'tarjetas',
      dur: 130,
      rotulo: { texto: 'Todas tus sedes,', acento: 'en la nube.' },
      tarjetas: [
        { titulo: 'Varias sucursales', sub: 'Cada una con sus precios, barberos y tasa', icono: 'tienda' },
        {
          titulo: 'Desde el celular',
          sub: 'Botones grandes, sin teclado',
          icono: 'telefono',
          insignia: { texto: 'Guardado en la nube', tono: 'ok' },
        },
        {
          titulo: 'Sin internet',
          sub: 'Registra igual; se sube solo al volver',
          icono: 'wifi',
          insignia: { texto: 'Pendiente de subir', tono: 'aviso' },
        },
      ],
      chips: [{ texto: 'Cada barbería ve solo sus datos', icono: 'escudo' }],
    },
    { tipo: 'cierre', dur: 190 },
  ],
};
