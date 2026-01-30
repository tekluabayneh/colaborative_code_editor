import axios from "axios";
import toast from "react-hot-toast";

export async function verifyOtp(code: string, email: string, apiBaseUrl: string) {
    try {
        const response = await axios.post(apiBaseUrl + "/api/auth/verifyOtp", { email: email, Otp: code })
        return response
    } catch (err) {
        if (axios.isAxiosError(err)) {
            toast.error(err.response?.data.message)
            return
        }
    }
}

