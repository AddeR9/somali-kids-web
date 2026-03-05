const API_BASE = "https://localhost:44358";

export type MeDto = {
  id: string;
  email: string;
  role: "admin" | "user";
  emailVerified: boolean;
  subscriptionStatus: string;
  currentPeriodEnd: string | null;
};

export function setToken(token: string) {
  localStorage.setItem("accessToken", token);
}

export function getToken() {
  return localStorage.getItem("accessToken");
}

export function logout() {
  localStorage.removeItem("accessToken");
}

export async function fetchMe(): Promise<MeDto | null> {
  const token = getToken();
  if (!token) return null;

  const res = await fetch(`${API_BASE}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    logout();
    return null;
  }

  return res.json();
}

export async function requestEmailCode(email: string) {
  const res = await fetch(`${API_BASE}/auth/email/request-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Failed to send code.");
}

export async function verifyEmailCode(email: string, code: string) {
  const res = await fetch(`${API_BASE}/auth/email/verify-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  if (!res.ok) throw new Error("Invalid code.");
  return res.json() as Promise<{ accessToken: string }>;
}
