/* TODO: In Componnts aufspalten */
/* TODO: Farblich bisshen anpassen */
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier kannst du die Logik für das Senden der Daten hinzufügen, falls erforderlich
    console.log(formData);
  };

  return (
    <div className="bg-slate-400 bg-opacity-60 p-10 rounded-2xl shadow-lg">
      <h1 className="text-white text-4xl font-bold mb-8 text-center">
        Register
      </h1>
      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        {/* Username */}
        <div className="flex flex-col">
          <label htmlFor="username" className="text-white mb-2">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="p-3 rounded bg-white text-black focus:outline-none"
            placeholder="Enter your username"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-white mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded bg-white text-black focus:outline-none"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="text-white mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 rounded bg-white text-black focus:outline-none"
            placeholder="Enter your password"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="bg-white text-white font-bold py-3 rounded hover:bg-gray-300 transition"
        >
          Register
        </button>

        {/* Already have an account? */}
        <div className="text-center mt-4">
          <span className="text-white">Already have an account? </span>
          <Link to="/" className="text-blue-400 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
