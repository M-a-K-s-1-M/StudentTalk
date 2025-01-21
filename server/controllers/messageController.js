const { Message } = require('../models/models');

class MessageController {
    async create(req, res) {
        const { description, role, ticketId } = req.body;
        const message = await Message.create({ description, role, ticketId });

        return res.json({ message });
    }

    async getAll(req, res) {
        const { ticketId } = req.body;
        const messages = await Message.findAll({ where: { ticketId: ticketId } })

        return res.json({ messages })
    }
}

module.exports = new MessageController();
