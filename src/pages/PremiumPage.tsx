import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getToken } from "../auth/auth";
import { useAuth } from "../auth/AuthProvider";

const API_BASE = "https://localhost:44358";

export default function PremiumPage() {
  const nav = useNavigate();
  const location = useLocation();
  const { me, loading, refresh } = useAuth();

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const success = params.get("success") === "1";
  const canceled = params.get("canceled") === "1";

  // After checkout redirect, refresh user state so UI updates
  useEffect(() => {
    if (success) refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const isActive = me?.subscriptionStatus?.toLowerCase() === "active";

  async function subscribe() {
    setError(null);

    if (!me) {
      nav("/login?next=/premium");
      return;
    }

    setBusy(true);
    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/billing/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: "monthly" }),
      });

      if (!res.ok) throw new Error("Failed to start checkout.");
      const data = await res.json();
      window.location.href = data.url;
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  async function manageSubscription() {
    setError(null);

    if (!me) {
      nav("/login?next=/premium");
      return;
    }

    setBusy(true);
    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/billing/create-portal-session`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to open billing portal.");
      const data = await res.json();
      window.location.href = data.url;
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="ui container" style={{ maxWidth: 760, padding: 24 }}>
      <h2 className="ui header">Somali Kids Premium</h2>
      <p style={{ opacity: 0.8 }}>
        Unlock the full experience with premium content. Cancel anytime.
      </p>

      {success && (
        <div className="ui positive message">
          <div className="header">Payment successful</div>
          <p>Thanks! Your subscription is being activated.</p>
        </div>
      )}

      {canceled && (
        <div className="ui message">
          <div className="header">Checkout canceled</div>
          <p>No worries — you can subscribe anytime.</p>
        </div>
      )}

      {error && <div className="ui negative message">{error}</div>}

      <div className="ui segment">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h3 className="ui header" style={{ marginBottom: 6 }}>Monthly plan</h3>
            <div style={{ opacity: 0.8 }}>Perfect for families. Works anywhere you sign in.</div>
          </div>

          <div style={{ fontSize: 32, fontWeight: 700 }}>
            4.99 <span style={{ fontSize: 16, fontWeight: 400 }}>/ month</span>
          </div>
        </div>

        <div className="ui divider" />

        {!me && !loading && (
          <div className="ui message">
            <div className="header">Sign in required</div>
            <p>You only need to sign in when you subscribe.</p>
          </div>
        )}

        {me && (
          <div className="ui message">
            <div><b>Signed in:</b> {me.email}</div>
            <div><b>Status:</b> {me.subscriptionStatus}</div>
            {me.currentPeriodEnd && (
              <div><b>Renews / ends:</b> {new Date(me.currentPeriodEnd).toLocaleDateString()}</div>
            )}
          </div>
        )}

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {!isActive ? (
            <button
              className={`ui primary button ${busy ? "loading" : ""}`}
              onClick={subscribe}
              disabled={loading || busy}
            >
              Subscribe
            </button>
          ) : (
            <button
              className={`ui button ${busy ? "loading" : ""}`}
              onClick={manageSubscription}
              disabled={loading || busy}
            >
              Manage subscription
            </button>
          )}

          {me && (
            <button className="ui basic button" onClick={refresh} disabled={busy}>
              Refresh
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
