import { apiClient, BASE_URL } from "@/shared/utils/Api";

const GATEWAY_BASE =
    import.meta.env.VITE_API_BASE || BASE_URL;

async function requestJson(url, options) {
    const endpoint = url.replace(GATEWAY_BASE, '');
    const method = options.method || 'GET';
    const body = options.body ? JSON.parse(options.body) : undefined;

    try {
        if (method === 'POST') {
            return await apiClient.post(endpoint, body);
        } else if (method === 'GET') {
            return await apiClient.get(endpoint);
        } else if (method === 'PUT') {
            return await apiClient.put(endpoint, body);
        } else if (method === 'DELETE') {
            return await apiClient.delete(endpoint);
        }
    } catch (error) {
        const err = new Error(error.message || "Request failed");
        err.status = error.status;
        err.data = error;
        throw err;
    }
}

export async function getUserProfile(userId) {
    return requestJson(
        `${GATEWAY_BASE}/api/user-profiles/${userId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}