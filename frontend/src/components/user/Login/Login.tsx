import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserSession } from "../../../auth/UseUserSession";
import { LoginApi } from "../../../api/LoginApi";

/**
 * Login-Komponente für die Authentifizierung.
 *
 * Kontext:
 * - Wird verwendet, um Benutzer anzumelden.
 *
 * Funktion:
 * - Nimmt E-Mail und Passwort entgegen.
 * - Authentifiziert über `LoginApi`.
 * - Speichert Sessiondaten per `useUserSession`.
 * - Leitet bei Erfolg zur Startseite um.
 */

const loginApi = new LoginApi();

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { storeLoginData } = useUserSession();

  /**
   * Verarbeitet das Login-Formular.
   * Ruft die API auf und speichert bei Erfolg die Sessiondaten.
   */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { token, username, role, userId } = await loginApi.login(
        email,
        password
      );

      storeLoginData({ username, role, userId }, token);

      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center bg-base-100 p-10">
        <div className="w-full max-w-md">
          <h1 className="text-xl font-bold mb-2">Willkommen bei Climbspot!</h1>
          <p className="mb-6 text-sm text-gray-600">
            Geben Sie Ihre Anmeldedaten ein, um auf Ihr Konto zuzugreifen
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            {/* E-Mail */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                E-Mail Adresse
              </label>
              <input
                id="email"
                type="email"
                value={email}
                required
                placeholder="E-Mail Adresse eingeben"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Passwort */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Passwort
              </label>
              <input
                id="password"
                type="password"
                value={password}
                required
                placeholder="Passwort eingeben"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-600 text-sm -mt-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-green-700 text-white font-semibold py-3 rounded hover:bg-green-600 transition disabled:opacity-50"
            >
              {loading ? "Login …" : "Login"}
            </button>

            <div className="flex items-center justify-center text-gray-400 text-sm">
              <hr className="w-full border-gray-200" />
              <span className="px-3">oder</span>
              <hr className="w-full border-gray-200" />
            </div>

            <p className="text-sm text-center text-gray-700 mt-6">
              Haben Sie noch kein Konto?{" "}
              <Link to="/register" className="text-green-500 hover:underline">
                Registrieren
              </Link>
            </p>
          </form>
        </div>
      </div>

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
