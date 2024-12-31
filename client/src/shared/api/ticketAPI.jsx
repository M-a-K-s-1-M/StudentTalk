import axios from "axios";

export const createTicket = async (title, description, studentId, tutorId) => {
    const { data } = await axios.post('http://localhost:5000/api/ticket/create', { title, description, studentId, tutorId })
    return data;
}

export const fetchTickets = async (studentId, tutorId, status) => {
    const { data } = await axios.post('http://localhost:5000/api/ticket/getAll', { studentId, tutorId, status });
    return data;
}

export const deleteTicket = async (ticketId) => {
    const { data } = await axios.post('http://localhost:5000/api/ticket/delete', { ticketId });
    return data;
}

export const updateStatus = async (status, id) => {
    const { data } = await axios.post('http://localhost:5000/api/ticket/updateStatus', { status, id });
    return data;
}

export const updateTutor = async (tutorId, id) => {
    const { data } = await axios.post('http://localhost:5000/api/ticket/updateTutor', { tutorId, id });
    return data;
}

