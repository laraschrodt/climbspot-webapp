import React, { FC } from "react";

const FilterSidebar: FC = () => {
  return (
    <aside className="w-full md:w-1/3 p-4 overflow-auto h-full color-base-100">
      <h2 className="text-2xl font-bold mb-4">Filter</h2>

      {/* Indoor / Outdoor */}
      <div className="mb-4">
        <label className="font-semibold block mb-2">Ort</label>
        <div className="flex gap-4">
          <label className="label cursor-pointer">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span className="ml-2">Indoor</span>
          </label>
          <label className="label cursor-pointer">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span className="ml-2">Outdoor</span>
          </label>
        </div>
      </div>

      {/* Kletterart */}
      <div className="mb-4">
        <label className="font-semibold block mb-2">Kletterart</label>
        <select className="select select-bordered w-full">
          <option>Klettern</option>
          <option>Klettersteig</option>
          <option>Klettergarten</option>
        </select>
      </div>

      {/* Schwierigkeit */}
      <div className="mb-4">
        <label className="font-semibold block mb-2">Schwierigkeit (1–10)</label>
        <input type="range" min="1" max="10" className="range range-primary" />
      </div>

      {/* Standort */}
      <div className="mb-4">
        <label className="font-semibold block mb-2">Standort</label>
        <input
          type="text"
          placeholder="Land, Region, Gebirge, Berg …"
          className="input input-bordered w-full"
        />
      </div>

      {/* Kletterzeit (nur Stunden) */}
      <div className="mb-4">
        <label className="font-semibold block mb-2">
          Kletterzeit (Stunden)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            className="input input-bordered w-24 text-center"
            placeholder="z. B. 2"
          />
          <span>Std.</span>
        </div>
      </div>

      {/* Kletterlänge */}
      <div className="mb-4">
        <label className="font-semibold block mb-2">Kletterlänge (Meter)</label>
        <input
          type="number"
          className="input input-bordered w-full"
          placeholder="z.B. 30"
        />
      </div>

      {/* Kinderfreundlich */}
      <div className="mb-4">
        <label className="font-semibold block mb-2">Kinderfreundlich</label>
        <div className="flex gap-4">
          <label className="label cursor-pointer">
            <input type="radio" name="kinder" className="radio radio-primary" />
            <span className="ml-2">Ja</span>
          </label>
          <label className="label cursor-pointer">
            <input type="radio" name="kinder" className="radio radio-primary" />
            <span className="ml-2">Nein</span>
          </label>
        </div>
      </div>

      <button className="btn btn-primary w-full mt-4">Filter anwenden</button>
    </aside>
  );
};

export default FilterSidebar;
