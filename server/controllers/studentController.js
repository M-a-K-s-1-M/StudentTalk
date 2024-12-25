const bcrypt = require('bcrypt');
const { Student } = require('../models/models');
const jwt = require('jsonwebtoken');

const generateJWT = (id, firstname, lastname, patronymic, email, academGorup, role) => {
    return jwt.sign({ id, firstname, lastname, patronymic, email, academGorup, role }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class StudentController {
    async registration(req, res) {
        const { firstname, lastname, patronymic, email, password, role, academGroup } = req.body;
        if (!email || !password) {
            return res.json({ message: 'Некорректный email или пароль' })
        }

        const candidate = await Student.findOne({ where: { email } })
        if (candidate) {
            return res.json({ message: 'Пользоваетль с таким email уже существует' })
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const student = await Student.create({ firstname, lastname, patronymic, email, password: hashPassword, role, academGroup })
        //Дописать зависимые id, пример:  const basket = await Basket.create({ userId: user.id })

        const token = generateJWT(student.id, student.firstname, student.lastname, student.patronymic, student.email, student.academGorup, student.role);
        return res.json({ token })

    }

    async login(req, res) {
        const { email, password } = req.body;
        const student = await Student.findOne({ where: { email } });


        if (!student) {
            return res.json({ message: 'Пользователь не найден' })
        }

        let comparePassword = bcrypt.compareSync(password, student.password);
        if (!comparePassword) {
            return res.json({ message: 'Указан неверный пароль' })
        }

        const token = generateJWT(student.id, student.firstname, student.lastname, student.patronymic, student.email, student.academGorup, student.role);
        return res.json({ token })
    }

}


module.exports = new StudentController();