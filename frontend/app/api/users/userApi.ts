import axios from "axios"
const usersApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
});
export const usersEndpoint = "/users";

export const getUsers = async () => {
    try {
        const response = await usersApi.get(`${usersEndpoint}`)
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
