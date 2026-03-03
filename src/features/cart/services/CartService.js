import { apiClient } from "@/shared/utils/Api";

/**
 * Get cart by customer ID
 */
export async function getCart(customerId) {
  return await apiClient.get(`/api/Cart/${customerId}`);
}

/**
 * Add item to cart
 */
export async function addToCart(customerId, item) {
  return await apiClient.post(`/api/Cart/${customerId}/items`, item);
}

/**
 * Update cart item quantity
 */
export async function updateCartItemQuantity(customerId, cartItemId, quantity) {
  return await apiClient.put(
    `/api/Cart/${customerId}/items/${cartItemId}/quantity`,
    { quantity }
  );
}

/**
 * Remove item from cart
 */
export async function removeCartItem(customerId, cartItemId) {
  return await apiClient.delete(`/api/Cart/${customerId}/items/${cartItemId}`);
}

/**
 * Clear cart
 */
export async function clearCart(customerId) {
  return await apiClient.delete(`/api/Cart/${customerId}`);
}
