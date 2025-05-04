import { FC } from "react";
import { Link } from "react-router-dom";

const NavbarEnd: FC = () => {
  return (
    <div className="navbar-end flex items-center gap-2">
      {/* Suche (Desktop) */}
      <input
        type="text"
        placeholder="Suche"
        className="hidden lg:block input input-bordered input-sm w-60"
      />

      {/* Suche (Mobile Dropdown) */}
      <div className="dropdown dropdown-end lg:hidden">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </label>
        <div
          tabIndex={0}
          className="mt-3 z-[1] p-4 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-60"
        >
          <input
            type="text"
            placeholder="Suche"
            className="input input-bordered input-sm w-full"
          />
        </div>
      </div>

      {/* ✅ Profil-Menü */}
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-6 h-6 rounded-full bg-neutral text-neutral-content flex items-center justify-center"></div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <a>Profil</a>
          </li>
          <li>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarEnd;
