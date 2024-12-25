const { Group } = require('../models/models');

class GroupController {
    async create(req, res) {
        const { academGroup, studentId } = req.body;
        const group = await Group.create({ academGroup, studentId });

        return res.json(group);
    }

    async getAll(req, res) {
        const { academGroup } = req.body;
        const students = await Group.findAll({ where: { academGroup } })

        return res.json(students);
    }

    async getOne(req, res) {
        const { studentId } = req.body;
        const group = await Group.findOne({ where: { studentId } })

        return res.json(group);
    }
}

module.exports = new GroupController();
