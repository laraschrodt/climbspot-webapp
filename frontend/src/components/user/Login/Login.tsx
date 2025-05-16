import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * Login-Komponente
 * – unverändertes Layout von dir
 * – zusätzliche State-Variablen & handleSubmit
 */
const Login: React.FC = () => {
  const navigate = useNavigate();

  /* ---------- Formular-State ---------- */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ---------- Submit ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // z. B. „Falsches Passwort“
        throw new Error(data.message || "Login fehlgeschlagen");
      }

      /* ---------- Token speichern ---------- */
      localStorage.setItem("token", data.token);

      /* ---------- Weiterleitung ---------- */
      navigate("/");
    } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Unbekannter Fehler");
    }
  } finally {
    setLoading(false);
}
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Linke Seite: Login-Formular */}
      <div className="flex items-center justify-center bg-base-100 p-10">
        <div className="w-full max-w-md">
          <h1 className="text-xl font-bold mb-2">Willkommen bei Climbspot!</h1>
          <p className="mb-6 !text-sm text-gray-600">
            Geben Sie Ihre Anmeldedaten ein, um auf Ihr Konto zuzugreifen
          </p>

          {/* ---------- Login-Formular ---------- */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            {/* E-Mail */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
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
              <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
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

            {/* Fehlermeldung */}
            {error && (
              <p className="text-red-600 text-sm -mt-2">
                {error}
              </p>
            )}

            {/* Submit-Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-green-700 text-white font-semibold py-3 rounded hover:bg-green-600 transition disabled:opacity-50"
            >
              {loading ? "Login ..." : "Login"}
            </button>

            {/* Oder-Trennlinie */}
            <div className="flex items-center justify-center text-gray-400 text-sm">
              <hr className="w-full border-gray-200" />
              <span className="px-3">oder</span>
              <hr className="w-full border-gray-200" />
            </div>

            {/* Footer */}
            <p className="text-sm text-center text-gray-700 mt-6">
              Haben Sie noch kein Konto?{" "}
              <Link to="/register" className="text-green-500 hover:underline">
                Registrieren
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
