const bcrypt = require('bcrypt');
const { Tutor, Student } = require('../models/models');
const jwt = require('jsonwebtoken');

class UserController {
    async login(req, res) {
        const { email, password } = req.body;
        const student = await Student.findOne({ where: { email } });
        const tutor = await Tutor.findOne({ where: { email } });

        if (!tutor && !student) {
            return res.json('Пользователь не найден');
        }

        if (student) {
            let comparePassword = bcrypt.compareSync(password, student.password);
            if (!comparePassword) {
                return res.json({ message: 'Указан неверный пароль' })
            }

            const token = jwt.sign({ id: student.id, firstname: student.firstname, lastname: student.lastname, patronymic: student.patronymic, email: student.email, role: student.role, academGroup: student.academGroup, numberCurs: student.numberCurs }, process.env.SECRET_KEY, { expiresIn: '24h' });
            return res.json({ token })

        } else if (tutor) {
            let comparePassword = bcrypt.compareSync(password, tutor.password);
            if (!comparePassword) {
                return res.json({ message: 'Указан неверный пароль' })
            }

            const token = jwt.sign({ id: tutor.id, firstname: tutor.firstname, lastname: tutor.lastname, patronymic: tutor.patronymic, email: tutor.email, role: tutor.role }, process.env.SECRET_KEY, { expiresIn: '24h' });
            return res.json({ token })
        }
    }
}

module.exports = new UserController();