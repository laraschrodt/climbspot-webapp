import { FC } from "react";
import { Link } from "react-router-dom";


/* Profilanzeige mit Dropdown Menü */
const NavbarEnd: FC = () => {
  return (
    <div className="navbar-end flex gap-15 items-center ">
      {/* Suchleiste */}
      <input
        type="text"
        placeholder="Suche"
        className="input input-bordered input-sm w-36 md:w-60"
      />

      {/* TODO: Gastmode implementieren (d.h. bei Klick auf Profil wird man
      aufgefordert sich einzuloggen) */}
      {/* Profilanzeige mit Dropdown Menü*/}
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 h-10 rounded-full bg-neutral text-neutral-content flex items-center justify-center"></div>
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
            <a>Einstellungen</a>
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
