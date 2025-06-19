import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import LocationPicture from "./LocationPicture";
import type { Location } from "../../models/Location";

/**
 * Seite zur Erstellung einer neuen Kletterlocation.
 *
 * Kontext:
 * Diese Komponente wird gerendert, wenn ein eingeloggter Benutzer eine neue
 * Location hinzufügen möchte. Sie bietet ein Formular zur Eingabe aller relevanten
 * Daten inklusive Upload eines Bildes.
 *
 * Funktion:
 * - Validiert Benutzereingaben lokal.
 * - Bereitet ein `FormData`-Objekt inklusive Bild-Upload vor.
 * - Sendet die Daten via `POST` an den geschützten API-Endpunkt `/api/locations/add-location`.
 * - Leitet bei Erfolg zur Detailseite der neuen Location weiter.
 */

const AddLocation: React.FC = () => {
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [form, setForm] = useState<Partial<Location>>({
    name: "",
    region: "",
    land: "",
    schwierigkeit: 1,
    lat: 0,
    long: 0,
    charakter: "",
    gebirge: "",
    berg: "",
    hoehe_einstieg_m: 0,
    talort: "",
    ausruestung: "",
    kletterlaenge_m: 0,
    kletterzeit: "00:00:00",
    kletterart: "klettern",
    kinderfreundlich: true,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const { name } = target;

    if (
      target instanceof HTMLInputElement &&
      target.type === "radio" &&
      name === "kinderfreundlich"
    ) {
      setForm((prev) => ({
        ...prev,
        kinderfreundlich: target.value === "true",
      }));
      return;
    }

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: target.checked }));
      return;
    }

    if (
      target instanceof HTMLInputElement &&
      (target.type === "number" || target.type === "range")
    ) {
      setForm((prev) => ({ ...prev, [name]: Number(target.value) }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: target.value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const ort_id = uuidv4();
    const fd = new FormData();
    if (imageFile) fd.append("image", imageFile);
    fd.append("ort_id", ort_id);
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));

    const token = localStorage.getItem("token") ?? "";
    const res = await fetch("/api/locations/add-location", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });

    if (res.ok) {
      const { id } = await res.json();
      navigate(`/details/${id}`);
    } else {
      alert("Fehler beim Speichern der Location");
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="mb-8 mt-8 text-2xl font-bold">
        Füge eine neue Location hinzu:
      </h1>

      <div className="flex justify-center mb-8">
        <LocationPicture
          imageUrl={previewUrl}
          onImageChange={handleImageChange}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </label>
        <label>
          Region
          <input
            name="region"
            value={form.region}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </label>
        <label>
          Land
          <input
            name="land"
            value={form.land}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </label>
        <label>
          Schwierigkeit
          <input
            type="range"
            name="schwierigkeit"
            min={1}
            max={10}
            value={form.schwierigkeit as number}
            onChange={handleChange}
            className="range range-primary"
            required
          />
          <span className="text-right">{form.schwierigkeit}</span>
        </label>
        <label>
          Breitengrad
          <input
            type="number"
            name="lat"
            step="any"
            value={form.lat}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </label>
        <label>
          Längengrad
          <input
            type="number"
            name="long"
            step="any"
            value={form.long}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </label>
        <label className="sm:col-span-2">
          Charakter
          <textarea
            name="charakter"
            value={form.charakter}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />
        </label>
        <label>
          Gebirge
          <input
            name="gebirge"
            value={form.gebirge}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </label>
        <label>
          Berg
          <input
            name="berg"
            value={form.berg}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </label>
        <label>
          Höhe Einstieg (m)
          <input
            type="number"
            name="hoehe_einstieg_m"
            value={form.hoehe_einstieg_m}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </label>
        <label>
          Talort
          <input
            name="talort"
            value={form.talort}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </label>
        <label>
          Ausrüstung
          <input
            name="ausruestung"
            value={form.ausruestung}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </label>
        <label>
          Kletterlänge (m)
          <input
            type="number"
            name="kletterlaenge_m"
            value={form.kletterlaenge_m}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </label>
        <label>
          Kletterzeit (hh:mm:ss)
          <input
            type="time"
            step={1}
            name="kletterzeit"
            value={form.kletterzeit}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </label>
        <label>
          Kletterart
          <select
            name="kletterart"
            value={form.kletterart}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">– auswählen –</option>
            <option value="klettern">klettern</option>
            <option value="klettersteig">klettersteig</option>
          </select>
        </label>

        <div className="flex items-center gap-4">
          <label className="label cursor-pointer">
            <input
              type="radio"
              name="kinderfreundlich"
              value="true"
              className="radio radio-primary"
              checked={form.kinderfreundlich === true}
              onChange={handleChange}
              required
            />
            <span className="ml-2">Ja</span>
          </label>

          <label className="label cursor-pointer">
            <input
              type="radio"
              name="kinderfreundlich"
              value="false"
              className="radio radio-primary"
              checked={form.kinderfreundlich === false}
              onChange={handleChange}
              required
            />
            <span className="ml-2">Nein</span>
          </label>
        </div>

        <button type="submit" className="btn btn-primary sm:col-span-2">
          Speichern
        </button>
      </form>
    </section>
  );
};

export default AddLocation;
