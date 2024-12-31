const { where } = require('sequelize');
const { Ticket } = require('../models/models');

class TicketController {
    async create(req, res) {
        const { title, description, studentId, tutorId } = req.body;
        const status = 'Ожидает принятия';
        const ticket = await Ticket.create({ title, description, status, studentId, tutorId })
        return res.json(ticket);
    }

    async getAll(req, res) {
        const { studentId, tutorId, status } = req.body;
        let ticket;
        if (!tutorId && !status && studentId) {
            ticket = await Ticket.findAll({ where: { studentId } })
        }

        if (tutorId && status && !studentId) {
            ticket = await Ticket.findAll({ where: { tutorId, status } })
        }

        if (status && !tutorId && !studentId) {
            ticket = await Ticket.findAll({ where: { status } })
        }

        if (!status && !tutorId && !studentId) {
            ticket = await Ticket.findAll();
        }

        return res.json(ticket);
    }

    async delete(req, res) {
        const { ticketId } = req.body;

        const ticketCount = await Ticket.destroy({
            where: { id: ticketId }
        });

        if (ticketCount > 0) {
            return res.status(200).json({ message: "Дедлайн успешно удален" });
        } else {
            return res.status(404).json({ message: "Дедлайн не найден" });
        }
    }

    async updateStatus(req, res) {
        const { status, id } = req.body;

        const ticket = await Ticket.findOne({ where: { id } })

        await ticket.update({
            status: status
        })

        return res.status(200).json({ message: 'Статус тикета изменен' })
    }

    async updateTutor(req, res) {
        const { tutorId, id } = req.body;
        const ticket = await Ticket.findOne({ where: { id } })

        await ticket.update({
            tutorId: tutorId
        })

        return res.status(200).json({ message: 'Тикет принят для решения' })
    }
}

module.exports = new TicketController();
