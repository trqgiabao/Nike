import { apiClient } from "@/shared/utils/Api";

/**
 * Create VNPay payment URL
 */
export async function createVNPayPayment(paymentData) {
  return await apiClient.post("/api/payments/vnpay/create", paymentData);
}

/**
 * Verify VNPay payment response
 */
export async function verifyVNPayPayment(queryString) {
  return await apiClient.get(`/api/payments/vnpay/verify?${queryString}`);
}
