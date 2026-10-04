import { Tema, degradado } from './tema';
import { Tono } from './tipos';

export const colorTono = (t: Tono | undefined, tema: Tema): string => {
  switch (t) {
    case 'ok':
      return tema.ok;
    case 'aviso':
      return tema.aviso;
    case 'malo':
      return tema.malo;
    case 'violeta':
      return '#7c3aed';
    case 'neutro':
      return tema.tintaSuave;
    default:
      return tema.barra[0];
  }
};

/** Relleno de barra / anillo según el tono (el acento usa el degradado de la marca). */
export const rellenoTono = (t: Tono | undefined, tema: Tema): string =>
  t === undefined || t === 'acento' ? degradado(tema.barra) : colorTono(t, tema);

/** Texto + fondo suave para insignias. */
export const insigniaTono = (t: Tono, tema: Tema): { color: string; fondo: string } => {
  const c = colorTono(t, tema);
  return { color: c, fondo: `${c}1f` };
};
