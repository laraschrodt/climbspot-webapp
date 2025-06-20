export interface Location {
  ort_id: string;
  name: string;
  region: string;
  land: string;
  schwierigkeit: string;
  picture_url: string;
  beschreibung?: string;
  zugaenglichkeit?: string;
  besonderheiten?: string;
  lat?: number;
  long?: number;
}
