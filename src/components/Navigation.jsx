import { NavLink } from "react-router-dom";

export const Navigation = () => (
  <nav>
    <NavLink to="/" end>
      Home
    </NavLink>
    <NavLink to="/movies">Movies</NavLink>
  </nav>
);
