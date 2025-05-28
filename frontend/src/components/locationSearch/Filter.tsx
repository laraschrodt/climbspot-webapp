import React, { useState } from "react";

const Filter: React.FC = () => {
  const [open, setOpen] = useState(true);

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
        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <div>
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

          <div>
            <label className="font-semibold block mb-2">Kletterart</label>
            <select className="select select-bordered w-full">
              <option>Klettern</option>
              <option>Klettersteig</option>
              <option>Klettergarten</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Schwierigkeit (1–10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              className="range range-primary"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">Standort</label>
            <input
              type="text"
              placeholder="Land, Region …"
              className="input input-bordered w-full"
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
              placeholder="z. B. 2"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">Kletterlänge (m)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="z. B. 30"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">Kinderfreundlich</label>
            <div className="flex gap-4">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="kinder"
                  className="radio radio-primary"
                />
                <span className="ml-2">Ja</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="kinder"
                  className="radio radio-primary"
                />
                <span className="ml-2">Nein</span>
              </label>
            </div>
          </div>
          {/* ------- Button ------- */}
          <div className="col-span-full flex justify-end">
            <button className="btn btn-primary px-8">Filter anwenden</button>
          </div>
        </form>
      )}
    </aside>
  );
};

export default Filter;
