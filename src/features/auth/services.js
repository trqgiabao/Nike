import { register as registerApi, verifyEmailOtp as verifyEmailOtpApi } from "./api.js";

export function register(payload) {
  return registerApi(payload);
}

export function verifyEmailOtp(payload) {
  return verifyEmailOtpApi(payload);
}