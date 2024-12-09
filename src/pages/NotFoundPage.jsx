import { Link } from "react-router-dom";

export const NotFoundPage = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    <h1>404 - Page Not Found</h1>
    <p>Oops! The page youre looking for doesnt exist.</p>
    <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
      Go back to Home
    </Link>
  </div>
);
