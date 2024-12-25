const { Curs } = require('../models/models');

class CursController {
    async create(req, res) {
        const { numberCurs, studentId } = req.body;
        const curs = await Curs.create({ numberCurs, studentId })

        return res.json(curs);
    }

    async getAll(req, res) {
        const { numberCurs } = req.body;
        const curs = await Curs.findAll({ where: { numberCurs } })

        return res.json(curs);
    }

    async getOne(req, res) {
        const { studentId } = req.body;
        const curs = await Curs.findOne({ where: { studentId } })

        return res.json(curs)
    }
}


module.exports = new CursController();