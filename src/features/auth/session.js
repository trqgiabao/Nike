import { getUserFromToken, isTokenExpired } from '@/shared/utils/Token';

const AUTH_STORAGE_KEY = "nike_auth";

export function saveAuthSession(payload, remember = true) {
  const storage = remember ? window.localStorage : window.sessionStorage;
  const otherStorage = remember ? window.sessionStorage : window.localStorage;
  otherStorage.removeItem(AUTH_STORAGE_KEY);
  storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
  
  // Dispatch custom event to notify auth state change
  window.dispatchEvent(new CustomEvent('authStateChanged', { detail: payload }));
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
  
  // Dispatch custom event to notify auth state change
  window.dispatchEvent(new CustomEvent('authStateChanged', { detail: null }));
}

/**
 * Get current user from stored session
 * @returns {object|null}
 */
export function getCurrentUser() {
  const session = readAuthSession();
  if (!session?.accessToken) return null;

  // Decode token to get latest user info
  const userInfo = getUserFromToken(session.accessToken);
  
  return {
    ...session,
    ...userInfo,
  };
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  const session = readAuthSession();
  if (!session?.accessToken) return false;

  // Check if token is expired
  return !isTokenExpired(session.accessToken);
}

/**
 * Get access token
 * @returns {string|null}
 */
export function getAccessToken() {
  const session = readAuthSession();
  return session?.accessToken || null;
}

/**
 * Get refresh token
 * @returns {string|null}
 */
export function getRefreshToken() {
  const session = readAuthSession();
  return session?.refreshToken || null;
}