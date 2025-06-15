import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  locationId: string;
}

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
