import React from "react";
import { useParams } from "react-router-dom";

interface Location {
    id: number;
    name: string;
    schwierigkeit: string;
    koordinaten: string;
    charakter: string;
    land: string;
    region: string;
    gebirge: string;
    berg: string;
    berghoehe_m: number;
    talort: string;
    ausruestung: string;
    kletterlaenge_m: number;
    kletterzeit: string;
    kletterart: string;
    kinderfreundlichkeit: string;
    absicherung: string;
    bewertung: string;
}

// Dummy-Daten
const dummyLocations: Location[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Kletterspot ${i + 1}`,
  schwierigkeit: ["Leicht", "Mittel", "Schwer"][i % 3],
  koordinaten: `47.56${i}, 11.37${i}`,
  charakter: "Plattig, technische Routen",
  land: "Deutschland",
  region: `Region ${i + 1}`,
  gebirge: "Bayerische Alpen",
  berg: `Berg ${i + 1}`,
  berghoehe_m: 1500 + i * 10,
  talort: `Talort ${i + 1}`,
  ausruestung: "60m Seil, 12 Expressen",
  kletterlaenge_m: 22 + i,
  kletterzeit: "1,5h",
  kletterart: "Sportklettern",
  kinderfreundlichkeit: i % 2 === 0 ? "Gut – flacher Einstieg" : "Nur für Geübte",
  absicherung: "Sehr gut mit Klebehaken",
  bewertung: `${(4 + (i % 2) * 0.5).toFixed(1)} / 5`,
}));

const LocationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = dummyLocations.find((loc) => loc.id === Number(id));

  if (!location) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-600">Location nicht gefunden</h1>
        <p>Die angeforderte Kletterlocation mit der ID "{id}" existiert nicht.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{location.name}</h1>
      <div className="space-y-2">
        <p><strong>Schwierigkeit:</strong> {location.schwierigkeit}</p>
        <p><strong>Koordinaten:</strong> {location.koordinaten}</p>
        <p><strong>Charakter:</strong> {location.charakter}</p>
        <p><strong>Land:</strong> {location.land}</p>
        <p><strong>Region:</strong> {location.region}</p>
        <p><strong>Gebirge:</strong> {location.gebirge}</p>
        <p><strong>Berg:</strong> {location.berg}</p>
        <p><strong>Berghöhe:</strong> {location.berghoehe_m} m</p>
        <p><strong>Talort:</strong> {location.talort}</p>
        <p><strong>Ausrüstung:</strong> {location.ausruestung}</p>
        <p><strong>Kletterlänge:</strong> {location.kletterlaenge_m} m</p>
        <p><strong>Kletterzeit:</strong> {location.kletterzeit}</p>
        <p><strong>Kletterart:</strong> {location.kletterart}</p>
        <p><strong>Kinderfreundlichkeit:</strong> {location.kinderfreundlichkeit}</p>
        <p><strong>Absicherung:</strong> {location.absicherung}</p>
        <p><strong>Bewertung:</strong> {location.bewertung}</p>
      </div>
    </div>
  );
};

export default LocationDetails;

