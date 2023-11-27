import Bolsa from "../models/Bolsa.js";

const createBolsa = async (req, res) => {
    try {
        const requestingUser = req.user;
        console.log("requestingUser", requestingUser)

        if (requestingUser.role !== 'admin') {
            return res.status(403).json({ message: 'Sem permissão para criar bolsas' });
        }
        const { nome } = req.body;

        const novaBolsa = await Bolsa.create({ nome });

        res.status(201).json({ bolsa: novaBolsa });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar bolsa' });
    }
};

const updateBolsa = async (req, res) => {
    try {
        const requestingUser = req.user;
        const bolsaId = req.params.id;

        if (requestingUser.role !== 'admin') {
            return res.status(403).json({ message: 'Sem permissão para atualizar bolsas' });
        }

        const { nome } = req.body;

        const bolsaAtualizada = await Bolsa.findByIdAndUpdate(
            bolsaId,
            { nome, },
            { new: true }
        );

        if (!bolsaAtualizada) {
            return res.status(404).json({ message: 'Bolsa não encontrada' });
        }

        res.status(200).json({ bolsa: bolsaAtualizada });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar bolsa' });
    }
};

const deleteBolsa = async (req, res) => {
    try {
        const requestingUser = req.user; // Obtém o usuário da autenticação
        const bolsaId = req.params.id; // ID da bolsa a ser excluída

        if (requestingUser.role !== 'admin') {
            return res.status(403).json({ message: 'Sem permissão para excluir bolsas' });
        }

        const bolsaExcluida = await Bolsa.findByIdAndDelete(bolsaId);

        if (!bolsaExcluida) {
            return res.status(404).json({ message: 'Bolsa não encontrada' });
        }

        res.status(200).json({ message: 'Bolsa excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir bolsa' });
    }
};

const getBolsas = async (req, res) => {
    try {
        // Buscar todas as bolsas e retornar somente o nome e o ID
        const bolsas = await Bolsa.find({}, 'nome');

        res.status(200).json({ bolsas });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar bolsas' });
    }
};



const getBolsasByNome = async (req, res) => {
    try {
        const { nome } = req.params;

        const bolsas = await Bolsa.find({ nome }, 'nome');

        res.status(200).json({ bolsas });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar bolsas por nome' });
    }
};


export { createBolsa, updateBolsa, deleteBolsa, getBolsas, getBolsasByNome };
