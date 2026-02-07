const GATEWAY_BASE = "https://localhost:3110";

export async function register({ username, email, password, role = "User" }) {
  const res = await fetch(`${GATEWAY_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, role }),
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
