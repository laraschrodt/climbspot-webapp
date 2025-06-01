import React, { useEffect, useState } from "react";
import { Bell, Info } from "react-feather";
import axios from "axios";

interface Notification {
  id: number;
  message: string;
  erstellt_am: string; 
}

interface MappedNotification {
  id: number;
  message: string;
  date: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<MappedNotification[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    if (!showPopup) {
      setHasUnread(false); // Als gelesen markieren
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<Notification[]>("/api/profile/notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const mapped: MappedNotification[] = response.data.map((n) => ({
          id: n.id,
          message: n.message,
          date: new Date(n.erstellt_am).toLocaleString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setNotifications(mapped);
      } catch (error) {
        console.error("Fehler beim Laden der Benachrichtigungen:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="w-full relative">
      <div
        className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-gray-900 transition"
        onClick={togglePopup}
      >
        <div className="relative">
          <Bell className="w-5 h-5" />
          {hasUnread && notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-pulse">
              {notifications.length}
            </span>
          )}
        </div>
        <span className="font-medium">Benachrichtigungen</span>
      </div>

      {showPopup && (
        <div className="absolute z-40 right-0 mt-3 w-96 max-h-96 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-xl animate-fadeIn">
          <div className="px-5 py-4 border-b bg-gradient-to-r from-gray-100 to-white rounded-t-xl">
            <h2 className="text-lg font-semibold text-gray-800">Benachrichtigungen</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start gap-3 p-4 hover:bg-gray-50 transition"
                >
                  <div className="pt-1">
                    <Info className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-800 font-medium">
                      {n.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 italic">
                      📅 {n.date}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-sm text-gray-500 italic">
                Keine neuen Benachrichtigungen
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
