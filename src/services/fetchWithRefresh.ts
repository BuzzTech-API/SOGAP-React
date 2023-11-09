import { refreshTokenFetch } from "./token"
interface headers {
    method?: string,
    headers?: any,
    body?: any
}
const fetchWithRefresh = async (url: string, headers: headers) => {
    const firstFetch = await fetch(url, headers)
    if (firstFetch.status === 401) {
        await refreshTokenFetch()
        const token = localStorage.getItem('access_token');
        headers.headers.Authorization = 'Bearer ' + token
        const secondFetch = await fetch(url, headers)
        return secondFetch




    }
    return firstFetch
}

export default fetchWithRefresh