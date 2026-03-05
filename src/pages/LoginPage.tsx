import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestEmailCode, setToken, verifyEmailCode } from "../auth/auth";
import GoogleButton from "../auth/GoogleButton";
import { useLocation } from "react-router-dom";


function normalizeEmail(v: string) {
  return v.trim().toLowerCase();
}

export default function LoginPage() {
  const nav = useNavigate();

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailNorm = useMemo(() => normalizeEmail(email), [email]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const next = params.get("next") || "/";


  async function onSendCode() {
    setError(null);
    setLoading(true);
    try {
      await requestEmailCode(emailNorm);
      setStep("code");
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function onVerify() {
    setError(null);
    setLoading(true);
    try {
      const data = await verifyEmailCode(emailNorm, code.trim());
      setToken(data.accessToken);
      nav(next);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ui container" style={{ maxWidth: 520, padding: 24 }}>
      <h2 className="ui header">Sign in</h2>
      <p style={{ marginTop: -6, opacity: 0.8 }}>
        We’ll send a one-time code to your email.
      </p>

      {error && (
        <div className="ui negative message">
          <div className="header">Couldn’t sign you in</div>
          <p>{error}</p>
        </div>
      )}

      <div className="ui segment">
        {step === "email" ? (
          <>
            <div className="field">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                autoComplete="email"
              />
            </div>

            <button
              className={`ui primary button ${loading ? "loading" : ""}`}
              onClick={onSendCode}
              disabled={!emailNorm || loading}
            >
              Send code
            </button>

            <div className="ui horizontal divider">or</div>

            {/* Google sign-in (Step 2 below) */}
            <GoogleButton
              onSignedIn={(accessToken) => {
                setToken(accessToken);
                nav("/admin");
              }}
              onError={(msg) => setError(msg)}
            />
          </>
        ) : (
          <>
            <p style={{ marginTop: 0 }}>
              Enter the 6-digit code sent to <b>{emailNorm}</b>
            </p>

            <div className="field">
              <label>Code</label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                inputMode="numeric"
                autoComplete="one-time-code"
              />
            </div>

            <button
              className={`ui primary button ${loading ? "loading" : ""}`}
              onClick={onVerify}
              disabled={code.trim().length < 6 || loading}
            >
              Verify & continue
            </button>

            <button
              className="ui button"
              onClick={() => setStep("email")}
              disabled={loading}
              style={{ marginLeft: 8 }}
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
