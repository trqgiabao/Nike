import { Link, Outlet, useNavigate } from "react-router-dom";
import { clearAuthSession, readAuthSession } from "../../features/auth/session";
import "../../styles/Backoffice.css";

export default function BackofficeLayout({ title }) {
  const navigate = useNavigate();
  const auth = readAuthSession();

  const logout = () => {
    clearAuthSession();
    navigate("/signin", { replace: true });
  };

  return (
    <div className="bo-layout">
      <aside className="bo-sidebar">
        <h2>{title}</h2>
        <p className="bo-user">Signed in as: {auth?.username || auth?.email || "Unknown"}</p>
        <nav>
          <Link to="/">Storefront</Link>
        </nav>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </aside>
      <main className="bo-content">
        <Outlet />
      </main>
    </div>
  );
}
