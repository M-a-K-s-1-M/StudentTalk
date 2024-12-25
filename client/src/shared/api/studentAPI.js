import axios from "axios"
import { BASE_URL } from '../model/consts';
import { jwtDecode } from 'jwt-decode';

export const registration = async (firstname, lastname, patronymic, email, password, role, academGroup, numberCurs) => {
    await axios.post(`${BASE_URL}/api/student/registration`, { firstname, lastname, patronymic, email, password, role, academGroup, numberCurs })
        .then(response => {
            localStorage.setItem('token', response.data.token);
            return jwtDecode(response.data.token);
        }).catch(e => {
            console.log(e);
        })
}