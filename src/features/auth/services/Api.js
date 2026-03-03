import { apiClient, BASE_URL } from "@/shared/utils/Api";

const GATEWAY_BASE = import.meta.env.VITE_API_BASE || BASE_URL;

async function requestJson(url, options) {
  const endpoint = url.replace(GATEWAY_BASE, '');
  const method = options.method || 'GET';
  const body = options.body ? JSON.parse(options.body) : undefined;

  try {
    if (method === 'POST') {
      return await apiClient.post(endpoint, body);
    } else if (method === 'GET') {
      return await apiClient.get(endpoint);
    } else if (method === 'PUT') {
      return await apiClient.put(endpoint, body);
    } else if (method === 'DELETE') {
      return await apiClient.delete(endpoint);
    }
  } catch (error) {
    const err = new Error(error.message || "Request failed");
    err.data = error;
    throw err;
  }
}

export async function register({ username, email, password, role }) {
  const body = { username, email, password, role: role ?? "Customer" };
  return requestJson(`${GATEWAY_BASE}/api/Auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function verifyEmailOtp({ email, code }) {
  return requestJson(`${GATEWAY_BASE}/api/Auth/verify-email-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otpCode: code }),
  });
}

export async function signIn({username, password }) {
  return requestJson(`${GATEWAY_BASE}/api/Auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({username, password }),
  });
}
