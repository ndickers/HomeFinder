import axios from "axios"
const propertyApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
});
export const propertyEndpoint = "/properties";

export const createDraftProperty = async ({ accessToken, data }: { accessToken: string, data: { userId: string } }) => {
    try {
        const response = await propertyApi.post(`${propertyEndpoint}/draft`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            }
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error(error.response.data.message || "Failed to create draft")
            }
        }
        throw new Error("Unexpected error occurred");
    }
}