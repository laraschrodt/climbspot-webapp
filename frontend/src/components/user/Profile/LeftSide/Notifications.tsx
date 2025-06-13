// TODO: Benachrichtigungen
/**
 * Der Pfad ins backend /api/profile/notifications ist schon vorbereitet,
 * d.h. es muss nurnoch in der Servicelayer (und beim Controller) ergänzt werden.
 * => @file: services/profile.service.ts und @file: router/profile.routes.ts
 **/

import React, { useEffect, useState } from "react";
import { Bell } from "react-feather";
import io from "socket.io-client";
import axios from "axios";

// Typ für die Notification
interface Notification {
  id: string;
  message: string;
  date: string;
  name?: string;
  picture_url?: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [seen, setSeen] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // ----> SOCKET VERBINDUNG <----
    const socket = io("http://localhost:3001");

    // Neue Notification vom Server empfangen
    socket.on("new-location", (notif: Notification) => {
      setNotifications((prev) => [notif, ...prev]);
    });

    // Alte Notifications per API laden
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/profile/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data);
      } catch (error) {
        console.error("Fehler beim Laden der Benachrichtigungen:", error);
      }
    };
    fetchNotifications();

    // Clean up: Verbindung beenden, wenn Komponente entladen wird
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSeen = (id: string) => {
    setSeen((prev) => [...prev, id]);
  };

  // Noch nicht gesehene Notifications
  const unseenNotifications = notifications.filter((n) => !seen.includes(n.id));

  return (
    <div className="relative w-full">
      <div
        className="flex items-center gap-2 cursor-pointer text-sm text-gray-800 hover:text-black"
        onClick={() => setShowPopup(!showPopup)}
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
          {unseenNotifications.length > 0 ? (
            <ul className="space-y-4">
              {unseenNotifications.map((n) => (
                <li
                  key={n.id}
                  className="flex gap-3 items-center border rounded-lg p-2 shadow-sm bg-gray-50"
                >
                  <img
                    src={n.picture_url || "/placeholder.png"}
                    alt="Ort"
                    className="w-12 h-12 object-cover rounded-full border"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-sm text-green-700">
                      Neuer Ort wurde hinzugefügt!
                    </div>
                    <div className="font-semibold text-xs">{n.name || "Neuer Ort"}</div>
                    <div className="text-xs text-gray-400">{n.date}</div>
                  </div>
                  <button
                    className="btn btn-sm btn-primary"
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

