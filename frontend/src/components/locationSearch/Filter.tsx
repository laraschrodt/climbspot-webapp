import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProtectedComponent from "../../routes/ProtectedComponent";

/**
 * Datenstruktur zur Beschreibung aller möglichen Filterkriterien.
 * Wird beim Absenden des Formulars übergeben.
 */

export interface FilterCriteria {
  kletterart: string;
  maxDifficulty: number;
  standort: string;
  kletterzeit: number;
  kletterlaenge: number;
  kinderfreundlich: boolean | null;
}

/**
 * Props für die Filter-Komponente.
 * Erwartet eine Callback-Funktion, die mit den aktuellen Filterwerten aufgerufen wird.
 */

interface FilterProps {
  onApply: (criteria: FilterCriteria) => void;
}

/**
 * Diese Komponente stellt ein responsives Filterformular dar.
 *
 * Hauptfunktion:
 * - Nutzer können nach Kletterart, Schwierigkeitsgrad, Standort, Zeit, Länge und Kinderfreundlichkeit filtern.
 * - Nach Absenden werden die gewählten Filter als Objekt zurückgegeben.
 *
 * Integration:
 * - Die Komponente wird z.B. in der Karten- oder Listenseite verwendet.
 * - Das `onApply`-Callback erlaubt die Weitergabe der Filter an die Parent-Komponente (z.B. zum Filtern von Locations).
 */

const Filter: React.FC<FilterProps> = ({ onApply }) => {
  // Sichtbarkeit des Filters (auf- und zuklappbar)
  const [open, setOpen] = useState(true);
  // Kletterart (z.B. "klettern" oder "klettersteig")
  const [kletterart, setKletterart] = useState("");
  // Maximal erlaubter Schwierigkeitsgrad (1–10)
  const [maxDifficulty, setMaxDifficulty] = useState(10);
  // Freitextfeld für Standort (Land, Region …)
  const [standort, setStandort] = useState("");
  // Geschätzte Kletterzeit in Stunden
  const [kletterzeit, setKletterzeit] = useState(0);
  // Gesamtlänge der Route in Metern
  const [kletterlaenge, setKletterlaenge] = useState(0);
  // Kinderfreundlichkeit: "ja", "nein" oder null (egal)
  const [kinder, setKinder] = useState<string | null>(null);

  /**
   * Behandelt das Absenden des Filterformulars.
   *
   * - Verhindert die Standard-Formularaktion.
   * - Ruft die `onApply`-Callbackfunktion mit den aktuellen Filterwerten auf.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply({
      kletterart,
      maxDifficulty,
      standort,
      kletterzeit,
      kletterlaenge,
      kinderfreundlich: kinder === null ? null : kinder === "ja",
    });
  };

  return (
    <aside className="w-full bg-base-100 text-base-content shadow-md">
      <div
        className="flex items-center justify-between p-4 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-2xl font-bold mx-auto">Filter</h2>
        <span className="text-xl">{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <form
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="font-semibold block mb-2">Kletterart</label>
            <select
              className="select select-bordered w-full"
              value={kletterart}
              onChange={(e) => setKletterart(e.target.value)}
            >
              <option value="">– egal –</option>
              <option value="klettern">klettern</option>
              <option value="klettersteig">klettersteig</option>
            </select>
          </div>
          <div>
            <label className="font-semibold block mb-2">
              Schwierigkeit (max)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={maxDifficulty}
              className="range range-primary"
              onChange={(e) => setMaxDifficulty(parseInt(e.target.value, 10))}
            />
            <div className="text-right">{maxDifficulty}</div>
          </div>
          <div>
            <label className="font-semibold block mb-2">Standort</label>
            <input
              type="text"
              placeholder="Land, Region …"
              className="input input-bordered w-full"
              value={standort}
              onChange={(e) => setStandort(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold block mb-2">
              Kletterzeit (Std.)
            </label>
            <input
              type="number"
              min="0"
              className="input input-bordered w-full"
              placeholder="z. B. 2"
              value={kletterzeit}
              onChange={(e) => setKletterzeit(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">Kletterlänge (m)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="z. B. 30"
              value={kletterlaenge}
              step={25}
              onChange={(e) => setKletterlaenge(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="font-semibold block mb-2">Kinderfreundlich</label>
            <div className="flex gap-4">
              {["ja", "nein"].map((val) => (
                <label key={val} className="label cursor-pointer">
                  <input
                    type="radio"
                    name="kinder"
                    className="radio radio-primary"
                    checked={kinder === val}
                    onChange={() => setKinder(val)}
                  />
                  <span className="ml-2">
                    {val.charAt(0).toUpperCase() + val.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="col-span-full flex justify-end">
            <ProtectedComponent roles={["user", "admin"]}>
              <Link to="/add-location" className="btn btn-secondary mr-4">
                Neue Location hinzufügen
              </Link>
            </ProtectedComponent>
            <button type="submit" className="btn btn-primary px-8">
              Filter anwenden
            </button>
          </div>
        </form>
      )}
    </aside>
  );
};

export default Filter;
