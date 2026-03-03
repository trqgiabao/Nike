import {
  register as registerApi,
  verifyEmailOtp as verifyEmailOtpApi,
  signIn as signInApi,
} from "./api.js";

export function register(payload) {
  return registerApi(payload);
}

export function verifyEmailOtp(payload) {
  return verifyEmailOtpApi(payload);
}

export function signIn(payload) {
  return signInApi(payload);
}
