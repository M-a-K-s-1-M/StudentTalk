const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AdminController {
    async login(req, res) {
        const { password } = req.body;
        const hashPasswordAdmin = await bcrypt.hash(process.env.ADMIN_PASSWORD, 5);

        const comparePassword = bcrypt.compareSync(password, hashPasswordAdmin);

        if (!comparePassword) {
            return res.status(401).json({ message: 'Указан неверный пароль' })
        }

        const token = jwt.sign({ role: 'ADMIN' }, process.env.SECRET_KEY, { expiresIn: '24h' });

        return res.status(200).json({ token })
    }
}

module.exports = new AdminController();
