const BASE_URL = 'https://errable-amalia-uneventfully.ngrok-free.dev';

// Get auth token from storage
const getAuthToken = () => {
  const localAuth = localStorage.getItem('nike_auth');
  const sessionAuth = sessionStorage.getItem('nike_auth');
  const authData = localAuth || sessionAuth;
  
  if (authData) {
    try {
      const parsed = JSON.parse(authData);
      return parsed.accessToken;
    } catch {
      return null;
    }
  }
  return null;
};

const defaultHeaders = {
  'ngrok-skip-browser-warning': 'true',
  'Content-Type': 'application/json',
};

/**
 * API utility for making HTTP requests
 */
class ApiClient {
  constructor(baseURL = BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Make a GET request
   * @param {string} endpoint - API endpoint
   * @param {object} options - Additional fetch options
   * @returns {Promise} Response data
   */
  async get(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'GET',
      ...options,
    });
  }

  /**
   * Make a POST request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request body data
   * @param {object} options - Additional fetch options
   * @returns {Promise} Response data
   */
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  /**
   * Make a PUT request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request body data
   * @param {object} options - Additional fetch options
   * @returns {Promise} Response data
   */
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  /**
   * Make a PATCH request
   * @param {string} endpoint - API endpoint
   * @param {object} data - Request body data
   * @param {object} options - Additional fetch options
   * @returns {Promise} Response data
   */
  async patch(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...options,
    });
  }

  /**
   * Make a DELETE request
   * @param {string} endpoint - API endpoint
   * @param {object} options - Additional fetch options
   * @returns {Promise} Response data
   */
  async delete(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      ...options,
    });
  }

  /**
   * Generic request method
   * @param {string} endpoint - API endpoint
   * @param {object} options - Fetch options
   * @returns {Promise} Response data
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    // Add authorization token if available
    const token = getAuthToken();
    const authHeaders = token ? { 'Authorization': `Bearer ${token}` } : {};
    
    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...authHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // Handle non-OK responses
      if (!response.ok) {
        const error = await response.json().catch(() => ({
          message: response.statusText,
        }));
        throw new Error(error.message || `HTTP Error: ${response.status}`);
      }

      // Check if response has content
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      return response;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  /**
   * Build query string from object
   * @param {object} params - Query parameters
   * @returns {string} Query string
   */
  buildQueryString(params) {
    const query = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        query.append(key, params[key]);
      }
    });

    const queryString = query.toString();
    return queryString ? `?${queryString}` : '';
  }
}

// Export singleton instance
const apiClient = new ApiClient();

export default apiClient;
export { apiClient, ApiClient, BASE_URL };
