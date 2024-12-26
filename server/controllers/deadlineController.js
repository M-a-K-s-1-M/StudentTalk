const { Deadline } = require('../models/models');

class DeadlineController {
    async create(req, res) {
        const { title, description, object, date, studentId } = req.body;
        const deadline = await Deadline.create({ title, description, object, date, studentId });

        return res.json(deadline);
    }

    async getAll(req, res) {
        const { studentId } = req.body;
        const deadline = await Deadline.findAll({ where: { studentId } })
        return res.json(deadline);
    }

    async getFilter(req, res) {
        let { studentId, date, object } = req.body;
        let deadline;
        if (!date && !object) {
            deadline = await Deadline.findAll({ where: { studentId } });
        }

        if (date && !object) {
            deadline = await Deadline.findAll({ where: { studentId, date } });
        }

        if (!date && object) {
            deadline = await Deadline.findAll({ where: { studentId, object } });
        }

        if (date && object) {
            deadline = await Deadline.findAll({ where: { studentId, date, object } });
        }

        return res.json(deadline);
    }

    async delete(req, res) {
        const { studentId, deadlineId } = req.body;

        const deletedCount = await Deadline.destroy({
            where: { id: deadlineId }
        });

        if (deletedCount > 0) {
            return await Deadline.findAll({ where: { studentId } })
        } else {
            return res.status(404).json({ message: "Дедлайн не найден" });
        }
    }
}

module.exports = new DeadlineController();