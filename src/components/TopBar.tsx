import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function TopBar() {
  const nav = useNavigate();
  const { me, signOut } = useAuth();

  return (
    <div className="ui inverted menu" style={{ margin: 0, borderRadius: 0, background: "#5f00c3" }}>
      <div className="ui container">
        <Link className="header item" to="/">Somali Kids</Link>

        <div className="right menu">
          {me?.role === "admin" && (
            <Link className="item" to="/admin">Admin</Link>
          )}

          {!me ? (
            <Link className="item" to="/login">Sign in</Link>
          ) : (
            <a
              className="item"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                signOut();
                nav("/");
              }}
            >
              Sign out
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
