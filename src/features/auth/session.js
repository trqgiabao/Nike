const AUTH_STORAGE_KEY = "nike_auth";

export function saveAuthSession(payload, remember = true) {
  const storage = remember ? window.localStorage : window.sessionStorage;
  const otherStorage = remember ? window.sessionStorage : window.localStorage;
  otherStorage.removeItem(AUTH_STORAGE_KEY);
  storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
}

export function readAuthSession() {
  const localValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
  const sessionValue = window.sessionStorage.getItem(AUTH_STORAGE_KEY);
  const raw = localValue || sessionValue;

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearAuthSession() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
}