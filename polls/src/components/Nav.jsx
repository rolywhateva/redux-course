import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/" exact activeClassName="active">
        Home
      </NavLink>

      <NavLink to="/leaderboard" exact activeClassName="active">
        Leaderboard
      </NavLink>

      <NavLink to="/add" exact activeClassName="active">
        Dashboard
      </NavLink>
    </nav>
  );
}
