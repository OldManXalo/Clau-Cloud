import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import React, { useEffect, useState } from 'react';
import { AbsoluteFill, Audio, Sequence, continueRender, delayRender, staticFile, useCurrentFrame } from 'remotion';
import { claves } from './anim';
import { SOLAPE } from './Escena';
import { Fondo } from './Fondo';
import { Tema } from './tema';
import { EscenaDef, Guion } from './tipos';
import { Barra } from './escenas/Barra';
import { Cierre } from './escenas/Cierre';
import { Grafica } from './escenas/Grafica';
import { Hero } from './escenas/Hero';
import { Logo } from './escenas/Logo';
import { Panel } from './escenas/Panel';
import { Rejilla } from './escenas/Rejilla';
import { Tarjetas } from './escenas/Tarjetas';

export type PromoProps = { guion: Guion; tema: Tema; musica?: string };

/** Fotograma de inicio de cada escena (se solapan SOLAPE fotogramas). */
export const inicios = (escenas: EscenaDef[]) => {
  const r: number[] = [];
  let t = 0;
  for (const e of escenas) {
    r.push(t);
    t += e.dur - SOLAPE;
  }
  return r;
};

export const duracionTotal = (escenas: EscenaDef[]) =>
  escenas.reduce((s, e) => s + e.dur, 0) - SOLAPE * (escenas.length - 1);

const useFuentes = () => {
  const [h] = useState(() => delayRender('fuentes'));
  useEffect(() => {
    Promise.all(['500 40px Inter', '600 40px Inter', '700 40px Inter'].map((x) => document.fonts.load(x)))
      .then(() => continueRender(h))
      .catch(() => continueRender(h));
  }, [h]);
};

export const Promo: React.FC<PromoProps> = ({ guion, tema, musica }) => {
  useFuentes();
  const f = useCurrentFrame();
  const ini = inicios(guion.escenas);
  const iLogo = guion.escenas.findIndex((e) => e.tipo === 'logo');
  const tLogo = iLogo >= 0 ? ini[iLogo] : Infinity;
  const mezcla = claves(f, [tLogo - 4, tLogo + 8], [0, 1]);
  // destello blanco al pasar del cielo a la bruma (como la referencia antes del logo)
  const destello = claves(f, [tLogo - 8, tLogo + 2, tLogo + 16], [0, 0.95, 0]);
  return (
    <AbsoluteFill style={{ backgroundColor: '#eaf1fd' }}>
      <Fondo mezcla={mezcla} />
      {guion.escenas.map((e, i) => (
        <Sequence key={i} from={ini[i]} durationInFrames={e.dur} name={`${i + 1}. ${e.tipo}`}>
          <EscenaPorTipo e={e} guion={guion} tema={tema} />
        </Sequence>
      ))}
      {destello > 0 && <AbsoluteFill style={{ background: 'radial-gradient(circle at 50% 45%, #fff 30%, #f2f6ff 100%)', opacity: destello }} />}
      {musica && <Audio src={staticFile(musica)} />}
    </AbsoluteFill>
  );
};

const EscenaPorTipo: React.FC<{ e: EscenaDef; guion: Guion; tema: Tema }> = ({ e, guion, tema }) => {
  switch (e.tipo) {
    case 'hero':
      return <Hero e={e} tema={tema} />;
    case 'barra':
      return <Barra e={e} tema={tema} />;
    case 'logo':
      return <Logo dur={e.dur} marca={guion.marca} tema={tema} />;
    case 'panel':
      return <Panel e={e} tema={tema} />;
    case 'grafica':
      return <Grafica e={e} tema={tema} />;
    case 'rejilla':
      return <Rejilla e={e} tema={tema} />;
    case 'tarjetas':
      return <Tarjetas e={e} tema={tema} />;
    case 'cierre':
      return <Cierre dur={e.dur} marca={guion.marca} tema={tema} />;
  }
};
