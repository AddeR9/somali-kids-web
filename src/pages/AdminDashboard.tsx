import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function AdminDashboard() {
  const nav = useNavigate();
  const { me, signOut } = useAuth();

  return (
    <div className="ui container" style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <h1 className="ui header" style={{ marginBottom: 6 }}>Admin dashboard 👑</h1>
          <div style={{ opacity: 0.8 }}>{me?.email}</div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <Link className="ui button" to="/">Home</Link>
          <button
            className="ui button"
            onClick={() => {
              signOut();
              nav("/");
            }}
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="ui segment" style={{ marginTop: 16 }}>
        <p>Only admins can see this page.</p>
      </div>
    </div>
  );
}
