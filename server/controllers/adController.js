const { where } = require('sequelize');
const { Ad, StudentAd } = require('../models/models');

class AdController {
    async create(req, res) {
        const { title, description, tutorId, studentId } = req.body;
        const { id } = await Ad.create({ title, description, tutorId })
        const adId = id;
        const studentAd = await StudentAd.create(adId, studentId)
        return res.json(ad);
    }

    async getAll(req, res) {
        const { studentId } = req.body;
        const ad = await StudentAd.findAll({ where: { studentId } });

        return res.json(ad);
    }


}