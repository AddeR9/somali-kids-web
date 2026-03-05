import { useEffect, useRef } from "react";

const API_BASE = "https://localhost:44358";

type Props = {
  onSignedIn: (accessToken: string) => void;
  onError: (message: string) => void;
};

declare global {
  interface Window {
    google?: any;
  }
}

export default function GoogleButton({ onSignedIn, onError }: Props) {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
    if (!clientId) {
      onError("Missing VITE_GOOGLE_CLIENT_ID in .env");
      return;
    }

    console.log("CLIENT ID USED:", import.meta.env.VITE_GOOGLE_CLIENT_ID);


    // Load GIS script once
    const existing = document.getElementById("google-gis");
    if (!existing) {
      const s = document.createElement("script");
      s.id = "google-gis";
      s.src = "https://accounts.google.com/gsi/client";
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    }

    const timer = setInterval(() => {
      if (!window.google || !divRef.current) return;

      clearInterval(timer);

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response: any) => {
          try {
            const idToken = response.credential;
            const res = await fetch(`${API_BASE}/auth/google`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ idToken }),
            });

            if (!res.ok) throw new Error("Google sign-in failed.");

            const data = await res.json();
            onSignedIn(data.accessToken);
          } catch (e: any) {
            onError(e?.message ?? "Google sign-in failed.");
          }
        },
      });

      window.google.accounts.id.renderButton(divRef.current, {
        theme: "outline",
        size: "large",
        text: "continue_with",
        width: 320,
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onError, onSignedIn]);

  return <div ref={divRef} />;
}
