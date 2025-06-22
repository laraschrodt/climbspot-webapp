import React, { useEffect, useState } from "react";
import { Bell } from "react-feather";
import io from "socket.io-client";
import axios from "axios";

interface Notification {
  erstellt_am: string;
  message: string | undefined;
  id: string;
  name?: string;
  region?: string;
  land?: string;
  picture_url?: string;
  date: string;
}

/**
 * Notifications-Komponente
 *
 * Zeigt ortsbezogene Benachrichtigungen im Nutzerprofil an.
 * Baut beim Laden eine WebSocket-Verbindung zum Backend auf und empfängt neue Orte in Echtzeit.
 * Initialer Abruf vorhandener Benachrichtigungen erfolgt via HTTP-Request.
 *
 * Eingebunden im Profilbereich (LeftSide), dient sie der Benachrichtigung über neue Orte,
 * etwa durch andere Nutzer erstellte Spots oder Systemmeldungen.
 *
 * Die Zustände "gesehen" werden aktuell nur lokal im Frontend gespeichert.
 */

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL!, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Frontend: Mit WebSocket verbunden!");
    });

    socket.on("new-location", (data: Notification) => {
      setNotifications((prev) =>
        prev.find((n) => n.id === data.id) ? prev : [data, ...prev]
      );
    });

    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/profile/notifications", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setNotifications(response.data);
      } catch (error) {
        console.error("Fehler beim Laden der Benachrichtigungen:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSeen = async (id: string) => {
    const token = localStorage.getItem("token");

    try {
      await axios.patch(`/api/profile/notifications/${id}/read`, null, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Fehler beim Setzen auf 'gelesen':", err);
    }
  };
  const unseenNotifications = notifications;

  return (
    <div className="relative w-full">
      <div
        className="flex items-center gap-2 cursor-pointer text-sm text-gray-800 hover:text-black"
        onClick={() => setShowPopup((val) => !val)}
      >
        <div className="relative">
          <Bell className="w-5 h-5" />
          {unseenNotifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unseenNotifications.length}
            </span>
          )}
        </div>
        <span>Benachrichtigungen</span>
      </div>

      {showPopup && (
        <div className="mt-2 bg-white border rounded-xl shadow-lg p-4 max-w-xs w-full z-50">
          <h3 className="font-semibold mb-3">Neue Benachrichtigungen</h3>
          {loading ? (
            <div className="text-sm text-gray-400">Lade ...</div>
          ) : unseenNotifications.length > 0 ? (
            <ul className="space-y-4">
              {unseenNotifications.map((n) => (
                <li
                  key={n.id}
                  className="flex items-center border rounded-lg p-2 shadow-sm bg-gray-50 gap-2"
                >
                  <img
                    src={n.picture_url || "/placeholder.png"}
                    alt="Ort"
                    className="w-12 h-12 object-cover rounded-full border flex-shrink-0"
                    style={{ aspectRatio: "1/1" }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs break-words mb-1">
                      {n.message || n.name || "Neuer Ort"}
                    </div>

                    <div className="text-xs text-gray-400">
                      {(n.date || n.erstellt_am || "")
                        .slice(0, 16)
                        .replace("T", " ")}
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-primary ml-1"
                    style={{ minWidth: "60px" }}
                    onClick={() => handleSeen(n.id)}
                  >
                    Gesehen
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-gray-400">
              Keine neuen Benachrichtigungen
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
