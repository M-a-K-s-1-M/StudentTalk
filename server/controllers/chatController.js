const { Chat } = require('../models/models');

class ChatController {
    async create(req, res) {
        const { studentId, ticketId, tutorId } = req.body;
        const chat = await Chat.create({ studentId, ticketId, tutorId })

        return res.json(chat);
    }
}

module.exports = new ChatController();
