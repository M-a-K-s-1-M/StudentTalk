const { TimeoutError } = require('sequelize');
const { Chat } = require('../models/models');

class ChatController {
    async create(req, res) {
        const { studentId, ticketId, tutorId } = req.body;
        const chat = await Chat.create({ studentId, ticketId, tutorId })

        return res.json(chat);
    }

    async update(req, res) {
        const { tutorId } = req.body;

    }
}