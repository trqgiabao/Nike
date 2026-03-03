import { apiClient } from "@/shared/utils/Api";

/**
 * Create order from cart (checkout)
 */
export async function createOrder(orderData) {
  return await apiClient.post("/api/order/checkout", orderData);
}

/**
 * Get order by ID
 */
export async function getOrderById(orderId) {
  return await apiClient.get(`/api/order/${orderId}`);
}

/**
 * Get orders by customer ID
 */
export async function getOrdersByCustomer(customerId, params = {}) {
  const queryString = apiClient.buildQueryString(params);
  return await apiClient.get(`/api/order/customer/${customerId}${queryString}`);
}

/**
 * Cancel order
 */
export async function cancelOrder(orderId) {
  return await apiClient.put(`/api/order/${orderId}/cancel`);
}
