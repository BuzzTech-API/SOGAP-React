import { refreshTokenFetch } from "./token"

const fetchWithRefresh = async (url: string, headers: {}) => {
    const firstFetch = await fetch(url, headers)
    if (firstFetch.status === 401) {
        try {
            await refreshTokenFetch()
        } finally {
            const secondFetch = await fetch(url, headers)
            return secondFetch

        }
    }
    return firstFetch
}

export default fetchWithRefresh