import React from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

// ---------- Props-Definition für die Benachrichtigungskomponente ----------
interface Props {
  notifications: { id: number; message: string; date: string }[]; // Liste der Benachrichtigungen
  currentIndex: number; // Index der aktuell angezeigten Benachrichtigung
  setCurrentIndex: (val: number | ((i: number) => number)) => void; // Funktion zum Ändern des Index
  onClose: () => void; // Funktion zum Schließen des Popups
}

// ---------- Komponente für einzelne Benachrichtigungs-Popups ----------
const ProfilNotification: React.FC<Props> = ({
  notifications,
  currentIndex,
  setCurrentIndex,
  onClose,
}) => {
  const currentNotification = notifications[currentIndex]; // Aktuelle Nachricht basierend auf dem Index

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-xl p-4 border border-gray-300 max-w-sm z-50">
      {/* Kopfzeile mit Titel und Schließen-Button */}
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-sm">
          Benachrichtigung {currentIndex + 1} von {notifications.length}
        </h4>
        <button
          className="text-xs text-gray-500 hover:text-black"
          onClick={onClose}
        >
          schließen
        </button>
      </div>

      {/* Nachrichtentext und Datum */}
      <p className="text-sm text-gray-700">{currentNotification.message}</p>
      <p className="text-xs text-gray-400 mt-1">{currentNotification.date}</p>

      {/* Navigationsbuttons für vorherige/nächste Nachricht */}
      <div className="flex justify-between mt-4">
        <button
          className="text-sm text-blue-500 disabled:text-gray-300"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
        >
          <ChevronLeft className="inline w-4 h-4" /> Zurück
        </button>

        <button
          className="text-sm text-blue-500 disabled:text-gray-300"
          disabled={currentIndex === notifications.length - 1}
          onClick={() => setCurrentIndex((i) => Math.min(i + 1, notifications.length - 1))}
        >
          Weiter <ChevronRight className="inline w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProfilNotification;
