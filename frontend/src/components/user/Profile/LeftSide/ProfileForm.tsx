import React from "react";
import { Edit2 } from "react-feather";
import { FormDataType } from "./types";

interface Props {
  formData: FormDataType;
  editMode: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleEditMode: () => void;
  saveChanges: () => void;
}


/**
 * ProfileForm-Komponente
 *
 * Anzeige und Bearbeitung der Basis-Benutzerdaten im Profilbereich.
 * Wird im linken Seitenteil der `ProfilePage` verwendet und ermöglicht Nutzern,
 * ihre persönlichen Daten wie Vorname, Nachname, E-Mail etc. zu bearbeiten.
 *
 * Der editierbare Zustand wird über `editMode` gesteuert.
 * Änderungen werden lokal über `handleChange` verarbeitet und bei Klick auf „Speichern“
 * über `saveChanges` in die Anwendung zurückgegeben (z. B. API-Aufruf im Parent).
 */

const ProfileForm: React.FC<Props> = ({
  formData,
  editMode,
  handleChange,
  toggleEditMode,
  saveChanges,
}) => (
  <section className="bg-white p-6 rounded-xl shadow w-full">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Persönliche Informationen</h2>
      <button
        onClick={toggleEditMode}
        className="text-blue-600 flex items-center gap-1 text-sm"
      >
        <Edit2 size={14} />
        {editMode ? "Abbrechen" : "Bearbeiten"}
      </button>
    </div>

    {editMode ? (
      <div className="space-y-4 text-sm text-gray-700">
        {[
          { label: "Vorname", name: "vorname" },
          { label: "Nachname", name: "nachname" },
          { label: "E-Mail", name: "email" },
          { label: "Benutzername", name: "username" },
          { label: "Standort", name: "location" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block font-medium">{label}</label>
            <input
              type="text"
              name={name}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
        ))}

        <button
          onClick={saveChanges}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Speichern
        </button>
      </div>
    ) : (
      <div className="space-y-2 text-gray-700">
        <p><strong>Vorname:</strong> {formData.vorname}</p>
        <p><strong>Nachname:</strong> {formData.nachname}</p>
        <p><strong>E-Mail:</strong> {formData.email}</p>
        <p><strong>Benutzername:</strong> {formData.username}</p>
        <p><strong>Standort:</strong> {formData.location}</p>
      </div>
    )}
  </section>
);

export default ProfileForm;
