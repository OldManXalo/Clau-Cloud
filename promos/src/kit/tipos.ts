// Guion de un promo como datos: cada escena es un tipo con sus textos.
// Las duraciones van en fotogramas (30 fps). Con música a 120 BPM, 15 fotogramas = 1 golpe
// y 60 = 1 compás: conviene que cada escena dure compases enteros.

export type Tono = 'ok' | 'aviso' | 'malo' | 'acento' | 'violeta' | 'neutro';

export type Marca = {
  nombre: [string, string]; // «Barber» + «Gest» (la 2.ª parte va con degradado)
  icono: string;
  lema: string;
  url?: string;
  oferta?: { etiqueta: string; texto: string };
};

export type EscenaHero = {
  tipo: 'hero';
  dur: number;
  titulares: { lineas: [string, string]; desde: number; hasta?: number }[];
  app: {
    titulo: string;
    filas: { etiqueta: string; valor: string }[];
    mosaicos: { icono: string; etiqueta: string }[];
  };
  alertas: { texto: string; icono: string; desde: number }[];
};

export type EscenaBarra = {
  tipo: 'barra';
  dur: number;
  variante: 'oscura' | 'clara';
  rotulo?: { texto: string; acento?: string };
  icono: string;
  placeholder?: string;
  texto: string;
  boton: string;
  iconoBoton?: string;
  clic: number;
  resultados?: { titulo: string; sub?: string; dato?: string; tono?: Tono; icono?: string }[];
  chips?: { texto: string; icono?: string }[];
};

export type EscenaLogo = { tipo: 'logo'; dur: number };

export type EscenaPanel = {
  tipo: 'panel';
  dur: number;
  rotulo?: { texto: string; acento?: string };
  url?: string;
  titulo: string;
  sub?: string;
  anillo?: {
    valor: number;
    max?: number;
    sufijo?: string;
    decimales?: number;
    etiqueta: string;
    insignia?: { texto: string; tono: Tono };
    tono?: Tono;
  };
  barras?: { etiqueta: string; valor: number; tono?: Tono; dato?: string }[];
  filas?: { insignia?: { texto: string; tono: Tono }; texto: string; dato?: string; icono?: string }[];
  chips?: { texto: string; icono?: string }[];
};

export type EscenaGrafica = {
  tipo: 'grafica';
  dur: number;
  rotulo?: { texto: string; acento?: string };
  titulo: string;
  sub?: string;
  esquina?: string;
  puntos: number[];
  alerta: { titulo: string; texto: string; icono?: string; tono?: Tono; botones?: string[] };
};

export type EscenaRejilla = {
  tipo: 'rejilla';
  dur: number;
  rotulo?: { texto: string; acento?: string };
  titulo: string;
  sub?: string;
  columnas: number;
  celdas: { texto: string; sub?: string; tono?: Tono }[];
  lateral?: { icono: string; texto: string };
  chips?: { texto: string; icono?: string }[];
};

export type EscenaTarjetas = {
  tipo: 'tarjetas';
  dur: number;
  rotulo?: { texto: string; acento?: string };
  tarjetas: { titulo: string; sub?: string; icono: string; insignia?: { texto: string; tono: Tono } }[];
  chips?: { texto: string; icono?: string }[];
};

export type EscenaCierre = { tipo: 'cierre'; dur: number };

export type EscenaDef =
  | EscenaHero
  | EscenaBarra
  | EscenaLogo
  | EscenaPanel
  | EscenaGrafica
  | EscenaRejilla
  | EscenaTarjetas
  | EscenaCierre;

export type Guion = {
  marca: Marca;
  escenas: EscenaDef[];
};
