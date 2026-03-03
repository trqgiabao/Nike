const GATEWAY_BASE =
    import.meta.env.VITE_API_BASE || "https://localhost:3110";

async function requestJson(url, options) {
    const res = await fetch(url, options);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        const err = new Error(data.message || data.title || "Request failed");
        err.status = res.status;
        err.data = data;
        throw err;
    }

    return data;
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