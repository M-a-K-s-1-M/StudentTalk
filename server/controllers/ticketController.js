const { Ticket } = require('../models/models');

class TicketController {
    async create(req, res) {
        const { title, description, status, studentId, tutorId } = req.body;
        if (!tutorId) {
            status = 'Ожидает прниятия'
        }
        const ticket = await Ticket.create({ title, description, status, studentId, tutorId })
        return res.json(ticket);
    }

    async getAll(req, res) {
        const { studentId } = req.body;
        const ticket = await Ticket.findAll({ where: { studentId } })
        return res.json(ticket);
    }

    async delete(req, res) {
        const { ticketId } = req.body;

        const ticketCount = await Ticket.destroy({
            where: { id: ticketId }
        });

        if (ticketCount > 0) {
            res.status(200).json({ message: "Дедлайн успешно удален" });
        } else {
            res.status(404).json({ message: "Дедлайн не найден" });
        }
    }
}

module.exports = new TicketController();
