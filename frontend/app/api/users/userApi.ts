import axios from "axios"
const usersApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
});
export const usersEndpoint = "/users";

export const getUsers = async ({ accessToken, page, limit, search }: { accessToken: string, page: number, limit: number, search: string }) => {
    try {
        const response = await usersApi.get(`${usersEndpoint}?page=${page}&limit=${limit}&search=${search}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
        return response.data;
    } catch (error) {

        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error(error.response.data.message || "Failed to get users")
            }
        }
        throw new Error("Unexpected error occurred");
    }
}
