// authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/Usuario.js';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifique se o usuário existe no banco de dados
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Verifique se a senha está correta
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Se as credenciais estiverem corretas, gere um token JWT
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao realizar login' });
    }
};

export default login;
