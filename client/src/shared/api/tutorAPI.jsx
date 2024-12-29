import axios from "axios";


export const updatePassword = async (currentPassword, newPassword, confirmPassword, id) => {
    await axios.post(`http://localhost:5000/api/tutor/updatePassword`, { currentPassword, newPassword, confirmPassword, id })
        .then(response => {
            alert(response.data.message);
        }).catch(e => {
            alert(e.response.data.message);
        })

}