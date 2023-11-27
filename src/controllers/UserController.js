import User from "../models/Usuario.js"
import emailUtil from "../utils/sendmail.js";
import bcrypt from 'bcrypt';

const createUser = async (req, res) => {
    try {
        const { email, password, role, name, campus } = req.body;
        const requestUser = req.user;
        console.log("o request user:", requestUser.role)
        if (requestUser.role != "admin") {
            return res.status(401).json({ message: "Você não tem permissão para criar um usuário" });
        }
        if (!email || !password) {
            return res.status(400).json({ message: "Email e senha são obrigatórios" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword, role, campus, name });
        emailUtil(email, 'Bem-vindo ao sistema de gerenciamento de bolsas', `Você foi cadastrado no sistema de gerenciamento de bolsas. Sua senha é: ${password}`)
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        console.log("oldPassword", oldPassword)
        console.log("newPassword", newPassword)
        const user = req.user; // Obtém o usuário do middleware de autenticação
        console.log("user", user.idUser)
        let searchUser = await User.findOne({ _id: user.userId });
        console.log("searchUser", searchUser)


        const isPasswordValid = await bcrypt.compare(oldPassword, searchUser.password);
        console.log("isPasswordValid", isPasswordValid)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Senha antiga incorreta' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        searchUser.password = hashedNewPassword;
        await searchUser.save();

        res.status(200).json({ message: 'Senha alterada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao alterar a senha' });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const requestingUser = req.user; // Obtém o usuário da autenticação
        console.log("requestingUser", requestingUser)
        console.log("userId", userId)
        if (requestingUser.userId !== userId && requestingUser.role !== 'admin') {
            return res.status(403).json({ message: 'Sem permissão para atualizar este usuário' });
        }

        const { email } = req.body;

        const user = await User.findByIdAndUpdate(userId, { email }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
};

const uploadAvatar = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("userId", userId)
        const requestingUser = req.user; // Obtém o usuário da autenticação
        console.log("requestingUser", requestingUser)

        if (requestingUser.userId !== userId && requestingUser.role !== 'admin') {
            return res.status(403).json({ message: 'Sem permissão para atualizar este usuário' });
        }

        // Verifique se o arquivo foi enviado
        if (!req.file) {
            return res.status(400).json({ message: 'Nenhum arquivo enviado' });
        }

        const user = await User.findById(userId);
        console.log("user", user)
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Atualize o avatar apenas se for o próprio usuário ou um administrador
        //user.avatar = req.file.path;
        user.avatar = req.file.path;
        await user.save();

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
};


export { createUser, changePassword, updateUser, uploadAvatar };
