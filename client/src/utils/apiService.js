import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const fetcher = async (url, method = "get", body = null, options = {}) => {
    try {
        const config = {
            url,
            method,
            baseURL: API_BASE_URL,
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },
            data: body,
            ...options,
        }
        const response = await axios(config)
        
        return await response.data
    } catch (error) {
        console.error(error)
        throw new Error(error.message || "An unexpected error occurred")   
    }
}

// Specific API Endpoints

const apiService = {
    getCurrentUser: () => fetcher("/api/user"),
    createUser: (userData) => fetcher("/api/user", "post", userData)
}

export default apiService