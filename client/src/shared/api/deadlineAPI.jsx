import axios from "axios";


export const createDeadline = async (title, description, object, date, studentId) => {
    const { data } = await axios.post('http://localhost:5000/api/deadline/create', { title, description, object, date, studentId })
    return data;
}

export const fetchDeadlines = async (studentId) => {
    const { data } = await axios.post('http://localhost:5000/api/deadline/getAll', { studentId: studentId, })
    return data;
}

export const getFilterDeadlines = async (date, object) => {

}

export const deleteDeadlines = async (deadlineId) => {

}

