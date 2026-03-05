import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const nav = useNavigate();
  const { me, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!me) {
      nav("/login");
      return;
    }
    if (me.role !== "admin") {
      nav("/");
      return;
    }
  }, [loading, me, nav]);

  if (loading) return <div className="ui container" style={{ padding: 24 }}>Loading…</div>;
  if (!me || me.role !== "admin") return null;

  return <>{children}</>;
}
