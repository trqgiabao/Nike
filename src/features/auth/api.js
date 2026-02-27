const GATEWAY_BASE = import.meta.env.VITE_API_BASE || "https://localhost:3110";

async function requestJson(url, options) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.message || data.title || "Request failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export async function register({ username, email, password, role }) {
  const body = { username, email, password, role: role ?? "user" };
  return requestJson(`${GATEWAY_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function verifyEmailOtp({ email, code }) {
  return requestJson(`${GATEWAY_BASE}/api/auth/verify-email-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otpCode: code }),
  });
}

export async function signIn({ email, password }) {
  return requestJson(`${GATEWAY_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}
