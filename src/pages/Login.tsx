/* TODO: In Componnts aufspalten */
/* TODO: Farblich bisshen anpassen */
import React from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="bg-slate-400 bg-opacity-60 p-10 rounded-2xl shadow-lg">
      <h1 className="text-white text-4xl font-bold mb-8 text-center">Login</h1>
      <form className="flex flex-col space-y-6">
        <div className="flex flex-col">
          <label htmlFor="username" className="text-white mb-2">
            Your Username
          </label>
          <input
            id="username"
            type="text"
            className="p-3 rounded bg-white text-black focus:outline-none"
            placeholder="Enter your username"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-white mb-2">
            Your Password
          </label>
          <input
            id="password"
            type="password"
            className="p-3 rounded bg-white text-black focus:outline-none"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input id="remember" type="checkbox" />
          <label htmlFor="remember" className="text-white">
            Remember Me
          </label>
        </div>
        <span className="text-sm text-white underline cursor-pointer">
          Forgot Password?
        </span>

        <div className="text-center mt-4">
          <span className="text-white">New Here? </span>
          <Link to="/register" className="text-blue-400 hover:underline">
            Create an Account
          </Link>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-3 rounded hover:bg-blue-400 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
