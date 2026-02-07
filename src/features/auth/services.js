import { register as registerApi } from "./api.js";

const AUTH_KEY = "nike_auth";

export function register(payload) {
  return registerApi(payload);
}

export function saveAuth({ accessToken, refreshToken, id }) {
  const data = { accessToken, refreshToken, id };
  localStorage.setItem(AUTH_KEY, JSON.stringify(data));
}

export function getAuth() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}
