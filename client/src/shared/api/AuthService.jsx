import axios from 'axios';

// const API_URL = 'http://localhost/auth-service'; // URL вашего бекенда

class AuthService {
    static login(email, password) {
        return axios.post(`http://localhost:8080/api/v1/auth/signin`, {
            email,
            password,
        }).then(response => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.accessToken);
            }
            return response.data;
        });
    }

    // Удаление access и refresh токена из localStorage
    static logout() {
        localStorage.removeItem('token');
    }

    // Возварщает access токен из localStorage
    static getAccessToken() {
        return localStorage.getItem('token'); //?? null;
    }

    // Обновляет access и refresh токен и добавляет их в localStorage
    static async refreshTokens() {
        const response = await axios.post('http://localhost:8080/api/v1/auth/refresh-token', {
            withCredentials: true,
        });

        if (response.data.accessToken) {
            localStorage.setItem('token', response.data.accessToken);
        }

        return response.data;
    }
}

export default AuthService;