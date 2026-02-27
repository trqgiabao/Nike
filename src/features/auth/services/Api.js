const GATEWAY_BASE = import.meta.env.VITE_API_BASE || "https://localhost:3110";

export async function register({ username, email, password, role }) {
  const body = { username, email, password, role: role ?? "user" };
  const res = await fetch(`${GATEWAY_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || data.title || "Registration failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export async function verifyEmailOtp({ email, code }) {
  const res = await fetch(`${GATEWAY_BASE}/api/auth/verify-email-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otpCode: code }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || data.title || "Verification failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}
