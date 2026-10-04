import React from 'react';
import { Composition } from 'remotion';
import { Promo, PromoProps, duracionTotal } from './kit/Promo';
import { guionBarberGest, temaBarberGest } from './videos/barbergest';
import { guionDataGest, temaDataGest } from './videos/datagest';

const promos: { id: string; props: PromoProps }[] = [
  { id: 'BarberGest', props: { guion: guionBarberGest, tema: temaBarberGest, voz: 'voz/barbergest.mp3' } },
  { id: 'DataGest', props: { guion: guionDataGest, tema: temaDataGest, voz: 'voz/datagest.mp3' } },
];

export const Root: React.FC = () => (
  <>
    {promos.map((p) => (
      <Composition
        key={p.id}
        id={p.id}
        component={Promo}
        durationInFrames={duracionTotal(p.props.guion.escenas)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={p.props}
      />
    ))}
  </>
);
