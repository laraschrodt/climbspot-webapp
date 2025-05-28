import React, { useState } from "react";



const AddLocation: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <aside className="w-full bg-base-100 text-base-content shadow-md">
      {/* Header mit Toggle */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-2xl font-bold mx-auto">Location hinzufügen</h2>
        <span className="text-xl">{open ? "▲" : "▼"}</span>
      </div>

      {/* Inhalt ein-/ausblendbar */}
      {open && (
        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {/* Name */}
          <div>
            <label className="font-semibold block mb-2">Name</label>
            <input type="text" className="input input-bordered w-full" placeholder="z. B. Klettergarten Isarwinkel" />
          </div>

          {/* Schwierigkeit */}
          <div>
            <label className="font-semibold block mb-2">Schwierigkeit</label>
            <input type="text" className="input input-bordered w-full" placeholder="z. B. 5a – 7c" />
          </div>

          {/* Koordinaten */}
          <div>
            <label className="font-semibold block mb-2">Koordinaten</label>
            <input type="text" className="input input-bordered w-full" placeholder="z. B. 47.5600, 11.3785" />
          </div>

          {/* Kletterart */}
          <div>
            <label className="font-semibold block mb-2">Kletterart</label>
            <select className="select select-bordered w-full">
              <option>Sportklettern</option>
              <option>Alpinklettern</option>
              <option>Bouldern</option>
            </select>
          </div>

          {/* Kletterzeit */}
          <div>
            <label className="font-semibold block mb-2">Kletterzeit (Std.)</label>
            <input type="text" className="input input-bordered w-full" placeholder="z. B. 1,5h" />
          </div>

          {/* Kletterlänge */}
          <div>
            <label className="font-semibold block mb-2">Kletterlänge (m)</label>
            <input type="number" className="input input-bordered w-full" placeholder="z. B. 30" />
          </div>

          {/* Kinderfreundlich */}
          <div>
            <label className="font-semibold block mb-2">Kinderfreundlich</label>
            <div className="flex gap-4">
              <label className="label cursor-pointer">
                <input type="radio" name="kinderfreundlich" className="radio radio-primary" />
                <span className="ml-2">Ja</span>
              </label>
              <label className="label cursor-pointer">
                <input type="radio" name="kinderfreundlich" className="radio radio-primary" />
                <span className="ml-2">Nein</span>
              </label>
            </div>
          </div>

          {/* Speichern Button */}
          <div className="col-span-full flex justify-end">
            <button className="btn btn-success px-8">Speichern</button>
          </div>
        </form>
      )}
    </aside>
  );
};

export default AddLocation;
