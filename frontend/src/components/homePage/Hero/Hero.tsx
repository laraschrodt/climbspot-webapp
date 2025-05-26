import React from "react";

const Hero: React.FC = () => {
  return (
    <div
      className="hero min-h-[50vh]" /* sorgt dafür, dass Element mindestens 50% der Höhe des Bildschirms einnimmt  */
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
          <button className="btn btn-primary">Komm in die Community</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
