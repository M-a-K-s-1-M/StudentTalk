const bcrypt = require('bcrypt');
const { Student } = require('../models/models');
const jwt = require('jsonwebtoken');

const generateJWT = (id, firstname, lastname, patronymic, email, role, academGroup, numberCurs) => {
    return jwt.sign({ id, firstname, lastname, patronymic, email, role, academGroup, numberCurs }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class StudentController {
    async registration(req, res) {
        const { firstname, lastname, patronymic, email, password, role, academGroup, numberCurs } = req.body;
        if (!email || !password) {
            return res.json({ message: 'Некорректный email или пароль' })
        }

        const candidate = await Student.findOne({ where: { email } })
        if (candidate) {
            return res.json({ message: 'Пользоваетль с таким email уже существует' })
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const student = await Student.create({ firstname, lastname, patronymic, email, password: hashPassword, role, academGroup, numberCurs })
        //Дописать зависимые id, пример:  const basket = await Basket.create({ userId: user.id })

        const token = generateJWT(student.id, student.firstname, student.lastname, student.patronymic, student.email, student.role, student.academGroup, student.numberCurs);
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

        const token = generateJWT(student.id, student.firstname, student.lastname, student.patronymic, student.email, student.role, student.academGroup, student.numberCurs);
        return res.json({ token })
    }

    async updatePassword(req, res) {
        const { currentPassword, newPassword, confirmPassword, id } = req.body;

        // Проверка текущего пароля
        const student = await Student.findOne({ where: { id } });
        if (!student) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        let compareCurrentPassword = bcrypt.compareSync(currentPassword, student.password);
        if (!compareCurrentPassword) {
            return res.status(401).json({ message: 'Неверный текущий пароль' });
        }

        // Проверка совпадения нового пароля и подтверждения
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Новые пароли не совпадают' });
        }

        // Обновление пароля
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await student.update({
            password: hashedNewPassword
        })

        return res.status(200).json({ message: 'Пароль успешно изменен' });
    }

    async getOneStudent(req, res) {
        const { id } = req.body;
        const student = await Student.findOne({ where: { id } })
        return res.json({ student });
    }
}


module.exports = new StudentController();