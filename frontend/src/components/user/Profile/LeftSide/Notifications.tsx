import React, { useEffect, useState } from "react";
import { Bell } from "react-feather";
import axios from "axios";

// TODO: Benachrichtigungen
/**
 * Der Pfad ins backend /api/profile/notifications ist schon vorbereitet,
 * d.h. es muss nurnoch in der Servicelayer (und beim Controller) ergänzt werden.
 * => @file: services/profile.service.ts und @file: router/profile.routes.ts
**/

interface Notification {
  id: number;
  message: string;
  date: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => setShowPopup(!showPopup);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/profile/notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifications(response.data);
      } catch (error) {
        console.error("Fehler beim Laden der Benachrichtigungen:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="w-full">
      <div
        className="flex items-center gap-2 cursor-pointer text-sm text-gray-800 hover:text-black"
        onClick={togglePopup}
      >
        <div className="relative">
          <Bell className="w-5 h-5" />
          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </div>
        <span>Benachrichtigungen</span>
      </div>

      {showPopup && (
        <div className="mt-2 bg-white border rounded shadow p-4 max-w-xs w-full">
          <h3 className="font-semibold mb-2">Neue Benachrichtigungen</h3>
          {notifications.length > 0 ? (
            <ul className="space-y-2">
              {notifications.map((n) => (
                <li key={n.id} className="text-sm text-gray-700">
                  <p>{n.message}</p>
                  <p className="text-xs text-gray-400">{n.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Keine neuen Benachrichtigungen</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
