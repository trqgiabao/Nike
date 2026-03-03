/**
 * Decode JWT token (without verification)
 * @param {string} token - JWT token
 * @returns {object|null} Decoded payload
 */
export const decodeJWT = (token) => {
  if (!token) return null;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean}
 */
export const isTokenExpired = (token) => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

/**
 * Get user info from token
 * @param {string} token - JWT token
 * @returns {object|null}
 */
export const getUserFromToken = (token) => {
  const decoded = decodeJWT(token);
  if (!decoded) return null;

  return {
    id: decoded.sub || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
    email: decoded.email,
    username: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
    role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
    exp: decoded.exp,
    iss: decoded.iss,
    aud: decoded.aud,
  };
};
