import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Register-Komponente
 * Zweispaltiges Layout: links das Formular, rechts ein Bild
 */

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Linke Seite: Formular */}
      <div className="flex items-center justify-center bg-base-100 p-10">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-2">Erstelle dein Konto</h1>
          <p className="!text-sm text-gray-600 mb-6">
            Bitte gib deine Informationen ein, um dich zu registrieren
          </p>

          <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Benutzername
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Benutzername eingeben"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

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
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-Mail eingeben"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
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
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Passwort eingeben"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="bg-green-700 text-white font-semibold py-3 rounded hover:bg-green-600 transition"
            >
              Registrieren
            </button>

            {/* Trennlinie */}
            <div className="flex items-center justify-center text-gray-400 text-sm">
              <hr className="w-full border-gray-200" />
              <span className="px-3">oder</span>
              <hr className="w-full border-gray-200" />
            </div>

            {/* Footer-Link */}
            <p className="text-sm text-center text-gray-700 mt-6">
              Hast du bereits ein Konto?{" "}
              <Link to="/login" className="text-green-500 hover:underline">
                Anmelden
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Rechte Seite: Bild */}
      <div className="hidden md:block relative">
        <img
          src="https://images.pexels.com/photos/2055556/pexels-photo-2055556.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Climbing"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
