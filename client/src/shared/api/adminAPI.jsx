import axios from "axios";

export const login = async (password) => {
    try {
        const response = await axios.post('http://localhost:5000/api/admin/login', { password: password })
        if (response.status === 200) {
            return response
        }
    } catch (e) {
        return e.response
    }
}