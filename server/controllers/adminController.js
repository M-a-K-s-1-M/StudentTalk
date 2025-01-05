const bcrypt = require('bcrypt');

class AdminController {
    async login(req, res) {
        const { password } = req.body;
        const hashPasswordAdmin = await bcrypt.hash(process.env.ADMIN_PASSWORD, 5);

        const comparePassword = bcrypt.compareSync(password, hashPasswordAdmin);

        if (!comparePassword) {
            return res.status(401).json({ message: 'Указан неверный пароль' })
        }

        return res.status(200).json({ message: 'Успешный вход' })
    }
}

module.exports = new AdminController();
