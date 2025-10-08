import axios from "axios"

const authApi = axios.create({
    baseURL: `${process.env.BASE_API_URL}`,
});
export const authEndpoint = "/auth";

export interface TRegData {
    name: string,
    email: string,
    role: string,
    password: string
}

export interface TLoginData {
    email: string,
    password: string
}
export const signup = async (data: TRegData) => {
    try {
        const response = await authApi.post(`${authEndpoint}/signup`, data)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error(error.response.data.message || "Signup failed")
            }
        }
        throw new Error("Unexpected error occurred");
    }
}

export const signin = async (data: TLoginData) => {
    console.log("Auth API URL:", `${process.env.BASE_API}`)


    try {
        const response = await authApi.post(`${authEndpoint}/signin`, data)
        return response.data;
    } catch (error) {

        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error(error.response.data.message || "Signin failed")
            }
        }
        throw new Error("Unexpected error occurred");
    }
}


export const requestPassReset = async (data: { email: string }) => {
    try {
        const response = await authApi.post(`${authEndpoint}/request-password-reset`, data)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error(error.response.data.message || "Request password reset failed")
            }
        }
        throw new Error("Unexpected error occurred");
    }
}

export const resendPassReset = async (data: { email: string }) => {
    try {
        const response = await authApi.post(`${authEndpoint}/resend-password-reset`, data)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error(error.response.data.message || "Resend password reset failed")
            }
        }
        throw new Error("Unexpected error occurred");
    }
}



export const setNewPassword = async (data: { password: string, token: string }) => {
    try {
        const response = await authApi.post(`${authEndpoint}/reset-password`, data)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error(JSON.stringify(error.response.data.response) || "Password reset failed")
            }
        }
        throw new Error("Unexpected error occurred");
    }
}