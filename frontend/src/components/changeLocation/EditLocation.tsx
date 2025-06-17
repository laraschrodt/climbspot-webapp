import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserSession } from "../../auth/UseUserSession";
import type { Location } from "../../models/Location";
import LocationPicture from "../addLocation/LocationPicture";

const EditLocation: React.FC = () => {
  const { user } = useUserSession();
  const navigate = useNavigate();
  const { locationId } = useParams<{ locationId: string }>();

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
    picture_url: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!locationId || !user) return;
    setLoading(true);
    fetch(`/api/locations/details/${locationId}`, {
      headers: { "x-user-id": user.userId },
    })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data: Location) => {
        setForm(data);
        setPreviewUrl(data.picture_url ?? "");
      })
      .catch(() => alert("Standort konnte nicht geladen werden"))
      .finally(() => setLoading(false));
  }, [locationId, user]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "radio" || type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!locationId) return;

    const fd = new FormData();
    fd.append("ort_id", locationId);
    Object.entries(form).forEach(
      ([k, v]) => v != null && fd.append(k, String(v))
    );
    if (imageFile) fd.append("image", imageFile);

    const token = localStorage.getItem("token") ?? "";
    const res = await fetch(`/api/locations/edit-location/${locationId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });

    if (res.ok) navigate(`/details/${locationId}`);
    else alert("Fehler beim Speichern der Location");
  };

  if (loading) return <div>Lädt…</div>;

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="mb-8 mt-8 text-2xl font-bold">
        Bearbeite deine Location:
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
            value={form.name || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </label>
        <label>
          Region
          <input
            name="region"
            value={form.region || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </label>
        <label>
          Land
          <input
            name="land"
            value={form.land || ""}
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
            value={form.lat as number}
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
            value={form.long as number}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </label>
        <label className="sm:col-span-2">
          Charakter
          <textarea
            name="charakter"
            value={form.charakter || ""}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />
        </label>
        <label>
          Gebirge
          <input
            name="gebirge"
            value={form.gebirge || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </label>
        <label>
          Berg
          <input
            name="berg"
            value={form.berg || ""}
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
            value={form.hoehe_einstieg_m as number}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </label>
        <label>
          Talort
          <input
            name="talort"
            value={form.talort || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </label>
        <label>
          Ausrüstung
          <input
            name="ausruestung"
            value={form.ausruestung || ""}
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
            value={form.kletterlaenge_m as number}
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
            value={form.kletterzeit || "00:00:00"}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </label>
        <label>
          Kletterart
          <select
            name="kletterart"
            value={form.kletterart || ""}
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
              className="radio radio-primary"
              checked={form.kinderfreundlich === true}
              onChange={handleChange}
              required
            />
            <span className="ml-2">Ja</span>
          </label>
          // FIXME: Ja/Nein Button klappt nicht
          <label className="label cursor-pointer">
            <input
              type="radio"
              name="kinderfreundlich"
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

export default EditLocation;
