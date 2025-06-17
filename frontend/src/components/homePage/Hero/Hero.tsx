import React from "react";
import { Link } from "react-router-dom";


/**
 * Hero-Komponente für die Startseite.
 *
 * Kontext:
 * Wird auf der Startseite angezeigt und dient als einladender Einstieg
 * in die Anwendung, mit einem großen Bild, einem Slogan und einer Handlungsaufforderung.
 *
 * Funktion:
 * - Zeigt einen Hintergrund mit Overlay.
 * - Enthält Überschrift, Beschreibung und einen Button mit Link zur Login-Seite.
 * - Ziel ist es, Nutzer zur Interaktion und Anmeldung zu motivieren.
 */
const Hero: React.FC = () => {
  return (
    <div
      className="hero min-h-[50vh]"
      style={{
        backgroundImage:
          "url(https://cdn.climbing.com/wp-content/uploads/2020/04/landscape-climb-2.jpg?crop=535:301&width=1070&enable=upscale)",
      }}
    >
      <div className="hero-overlay bg-opacity-50"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-3xl">
          <h1 className="mb-5 text-5xl font-bold">
            Deine nächste Herausforderung wartet!
          </h1>
          <p className="mb-5">
            ClimbSpot hilft dir, die besten Kletterspots zu finden – ob in
            deiner Nähe oder an deinem Traumziel. Durchstöbere unsere Datenbank
            von Kletterhallen und Outdoor-Stellen, finde die ideale Route für
            dein Level und erlebe unvergessliche Kletterabenteuer. Wir bieten
            dir alles, was du brauchst, um die perfekte Kletterlocation zu
            finden und neue Höhen zu erklimmen!
          </p>
          <Link to="/login">
            <button className="btn btn-primary">Komm in die Community</button>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Hero;
