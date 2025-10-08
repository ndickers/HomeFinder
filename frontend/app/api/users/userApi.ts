import axios from "axios"
const usersApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
});
export const usersEndpoint = "/users";

//console.log("Auth API URL:", usersApi.defaults.baseURL);


export const getUsers = async ({ accessToken, page, limit, search, role, status }: { accessToken: string, page: number, limit: number, search?: string, role?: string, status?: string }) => {
    try {
        const response = await usersApi.get(usersEndpoint, {
            params: { page, limit, search, roles: role, status },
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            }
        })
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error);

            if (error.response) {
                throw new Error(error.response.data.message || "Failed to get users")
            }
        }
        throw new Error("Unexpected error occurred");
    }
}


export const changeUserStatus = async ({ accessToken, id, status }: { accessToken: string, id: string, status: { status: string } }) => {
    try {
        const response = await usersApi.put(`${usersEndpoint}/${id}`, status, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            }
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error(error.response.data.message || "Failed to update user status")
            }
        }
        throw new Error("Unexpected error occurred");
    }
}