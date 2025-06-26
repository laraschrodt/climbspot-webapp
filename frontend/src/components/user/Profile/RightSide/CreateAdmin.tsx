import React, { useState } from "react";
import { RegisterApi } from "../../../../api/RegisterApi";

const registerApi = new RegisterApi();

/**
 * UI-Komponente, mit der Admins neue Admin Accounts erstellen können.
 * Aus Sicherheitsgründen geht das nicht im Register-Formular.
 */
const CreateAdmin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await registerApi.register(username, email, password, "admin");
      setUsername("");
      setEmail("");
      setPassword("");
      alert("New admin account has been created successfully.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full flex justify-center p-4">
      <div className="bg-white w-full max-w-xl p-4 sm:p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Erstelle einen neuen Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Benutzername</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">E‑Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Erstelle…" : "Erstelle Admin"}
          </button>
        </form>
      </div>
    </section>
  );
  
};

export default CreateAdmin;
