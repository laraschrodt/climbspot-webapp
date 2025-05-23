import React from "react";

interface Location {
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

// Statische Dummy-Daten für eine Bsp-Location
const location: Location = {
    name: "Klettergarten Isarwinkel",
    schwierigkeit: "5a – 7c",
    koordinaten: "47.5600, 11.3785",
    charakter: "Plattig, technische Routen",
    land: "Deutschland",
    region: "Oberbayern",
    gebirge: "Bayerische Alpen",
    berg: "Brauneck",
    berghoehe_m: 1555,
    talort: "Lenggries",
    ausruestung: "60m Seil, 12 Expressen",
    kletterlaenge_m: 22,
    kletterzeit: "1,5h",
    kletterart: "Sportklettern",
    kinderfreundlichkeit: "Gut – flacher Einstieg",
    absicherung: "Sehr gut mit Klebehaken",
    bewertung: "4.5 / 5"
};

// React-Komponente, die die Location-Details als HTML darstellt
const LocationDetails: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto p-4">
            {/* Titel */}
            <h1 className="text-3xl font-bold mb-4">{location.name}</h1>

            {/* Alle Informationen als Liste */}
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

