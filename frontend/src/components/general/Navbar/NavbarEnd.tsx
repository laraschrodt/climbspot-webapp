import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserSession } from "../../../auth/useUserSession";

const NavbarEnd: FC = () => {
  const { user, clearSession } = useUserSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearSession();
    navigate("/");
  };

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
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
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

      {/* Profil-Menü */}
      //TODO: Hier muss noch das Profilbild angezeigt werden.
      {/**
       * In dem @foder frontend/src/api muss eine Datei erstellt werden, die eine Anfrage ans Backend sendet.
       * Diese anfrage kommt in @file profile.router.ts an und wird an @file profile.controller.ts weitergeleitet.
       * Der Controller ruft die Service Layer in @file profile.service.ts auf, wo eine Methode implementiert werden muss, die das Bild anhand der userId holt.
       **/}
      <div className="dropdown dropdown-end">
        {/* Avatar-Button */}
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-6 h-6 rounded-full bg-neutral text-base-100 flex items-center justify-center">
            {user ? user.username[0].toUpperCase() : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.239 0 4.338.55 6.121 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </div>
        </label>

        {/* Dropdown-Inhalt */}
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          {!user && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Registrieren</Link>
              </li>
            </>
          )}

          {user && (
            <>
              <li>
                <Link to="/profile">Profil</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavbarEnd;
