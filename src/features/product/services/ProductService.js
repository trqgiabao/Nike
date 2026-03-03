import { apiClient } from "@/shared/utils/Api";

/**
 * Get all products with pagination
 */
export async function getProducts(params = {}) {
  const queryString = apiClient.buildQueryString(params);
  return await apiClient.get(`/api/product${queryString}`);
}

/**
 * Get product by ID
 */
export async function getProductById(id) {
  return await apiClient.get(`/api/product/${id}`);
}

/**
 * Search products
 */
export async function searchProducts(keyword, params = {}) {
  const queryString = apiClient.buildQueryString({ ...params, keyword });
  return await apiClient.get(`/api/product/search${queryString}`);
}
