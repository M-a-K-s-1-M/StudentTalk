const { Message } = require('../models/models');

class MessageController {
    async create(req, res) {
        const { description, role, chatId } = req.body;
        const message = await Message.create({ description, role, chatId });

        return res.json(message);
    }
}

module.exports = new MessageController();
