import React from "react";
import { Link } from "react-router-dom";

/**
 * Login-Komponente
 * Zweispaltiges Layout: links das Formular, rechts ein Bild
 */

/* TODO: Eindeutschen, damit Sprache konstant ist */
/* TODO: Prüfen ob man sign in with apple/google überhapt einbauen kann (ohne zu bezahlen) */
const Login: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Linke Seite: Login-Formular */}
      <div className="flex items-center justify-center bg-base-100 p-10">
        <div className="w-full max-w-md">
          {/* Überschrift */}
          <h1 className="text-xl font-bold mb-2">Willkommen bei Climbspot!</h1>
          <p className="mb-6 !text-sm text-gray-600 ">
            Geben Sie Ihre Anmeldedaten ein, um auf Ihr Konto zuzugreifen
          </p>

          {/* Login-Formular */}
          <form className="flex flex-col space-y-5">
            {/* E-Mail */}
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                E-Mail Adresse
              </label>

              <input
                id="username"
                type="email"
                placeholder="E-Mail Adresse eingeben"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Passwort */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Passwort
                </label>
                <span className="text-sm text-blue-600 cursor-pointer hover:underline">
                  Passwort vergessen?
                </span>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Passwort eingeben"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="bg-green-700 text-white font-semibold py-3 rounded hover:bg-green-600 transition"
            >
              Login
            </button>

            {/* Oder Trennlinie */}
            <div className="flex items-center justify-center text-gray-400 text-sm">
              <hr className="w-full border-gray-200" />
              <span className="px-3">oder</span>
              <hr className="w-full border-gray-200" />
            </div>

            {/* Footer */}
            <p className="text-sm text-center text-gray-700 mt-6">
              Haben Sie noch kein Konto?{" "}
              <Link to="/register" className="text-green-500 hover:underline">
                Registieren
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Rechte Seite: Bild */}
      <div className="hidden md:block">
        <img
          src="https://www.valgardena.it/fileadmin/_processed_/0/2/csm_klettern-groeden-21_f0fec0d9df.jpg"
          alt="Climbing"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
