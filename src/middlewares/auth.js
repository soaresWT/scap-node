// authMiddleware.js
import jwt from 'jsonwebtoken';
import emailUtils from '../utils/sendmail.js';
import User from '../models/Usuario.js';
import dotenv from 'dotenv';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
dotenv.config();

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};


const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("email", email)
        const user = await User.findOne({ email });
        console.log("user", user)


        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora para expirar
        console.log("user", user)
        await user.save();

        emailUtils(email, 'Redefinição de senha', `Para redefinir sua senha, clique no link a seguir: http://localhost:3333/reset-password/${resetToken}`);

        res.status(200).json({ message: 'E-mail enviado com instruções para redefinir a senha' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao processar a solicitação de redefinição de senha' });
    }
};


const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Token inválido ou expirado' });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Senha redefinida com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao redefinir a senha' });
    }
};



export { authMiddleware, forgotPassword, resetPassword };
