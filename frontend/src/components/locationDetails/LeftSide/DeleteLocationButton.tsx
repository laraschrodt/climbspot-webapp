import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  /** ID der Location, die gelöscht werden soll */
  locationId: string;
}

/**
 * Button-Komponente zum Löschen einer Location.
 *
 * Kontext:
 * Wird z.B. in der Detailansicht einer Location verwendet,
 * um diese dauerhaft vom Server zu entfernen.
 *
 * Funktion:
 * - Fragt den Nutzer vor dem Löschen per Bestätigungsdialog.
 * - Sendet eine DELETE-Anfrage an den API-Endpunkt `/api/locations/:locationId`.
 * - Bei Erfolg erfolgt eine Navigation zurück zur Übersichtsseite `/locations`.
 * - Bei Fehler wird eine Fehlermeldung angezeigt.
 */
const DeleteLocationButton: React.FC<Props> = ({ locationId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Standort wirklich löschen?")) return;

    const token = localStorage.getItem("token") ?? "";
    const res = await fetch(`/api/locations/${locationId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      navigate("/locations");
    } else {
      alert("Löschen fehlgeschlagen");
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-error">
      Löschen
    </button>
  );
};

export default DeleteLocationButton;
