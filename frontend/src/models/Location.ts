export interface Location {
  ort_id: string;
  name: string;
  region: string;
  land: string;
  schwierigkeit: number | string;
  picture_url: string | null;

  bewertungen?: { sterne: number }[];

  rating?: number;

  lat?: number;
  long?: number;
  charakter?: string;
  gebirge?: string;
  berg?: string;
  hoehe_einstieg_m?: number;
  talort?: string;
  ausruestung?: string;
  kletterlaenge_m?: number;
  kletterzeit?: string;
  kletterart?: string;
  kinderfreundlich?: boolean;
}
