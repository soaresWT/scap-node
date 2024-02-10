import Atividade from "../models/Atividades.js";
import User from "../models/Usuario.js"

const createAtividade = async (req, res) => {
    try {
        const requestingUser = req.user;
        console.log("requestingUser", requestingUser)

        if (requestingUser.role !== 'bolsista') {
            return res.status(403).json({ message: 'Sem permissão para criar atividades' });
        }

        const atividade = {
            ...req.body,
            bolsistas: requestingUser.userId
        };

        const novaAtividade = await Atividade.create(atividade);
        await User.findByIdAndUpdate(requestingUser.userId, { $push: { atividades: novaAtividade._id } });

        res.status(201).json({ atividade: novaAtividade });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar atividade' });
    }
}

const updateAtividade = async (req, res) => {
    try {
        const requestingUser = req.user;
        const atividadeId = req.params.id;

        if (requestingUser.role !== 'bolsista') {
            return res.status(403).json({ message: 'Sem permissão para atualizar atividades' });
        }

        const atividadeAtualizada = await Atividade.findByIdAndUpdate(
            atividadeId,
            req.body,
            { new: true }
        );

        if (!atividadeAtualizada) {
            return res.status(404).json({ message: 'Atividade não encontrada' });
        }

        res.status(200).json({ atividade: atividadeAtualizada });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar atividade' });
    }
}

const deleteAtividade = async (req, res) => {
    try {
        const requestingUser = req.user; // Obtém o usuário da autenticação
        const atividadeId = req.params.id; // ID da atividade a ser excluída

        if (requestingUser.role !== 'bolsista') {
            return res.status(403).json({ message: 'Sem permissão para excluir atividades' });
        }

        const atividadeExcluida = await Atividade.findByIdAndDelete(atividadeId);

        if (!atividadeExcluida) {
            return res.status(404).json({ message: 'Atividade não encontrada' });
        }

        res.status(200).json({ message: 'Atividade excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir atividade' });
    }
}
const getAtividades = async (req, res) => {
    try {
        const atividades = await Atividade.find();
        res.status(200).json({ atividades });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar atividades' });
    }
}



export { createAtividade, updateAtividade, deleteAtividade, getAtividades }