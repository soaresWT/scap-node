import mongoose from "mongoose";

const presencaSchema = new mongoose.Schema({
    data: { type: Date, default: Date.now, Type: Boolean, default: false }
});

const atividadeSchema = new mongoose.Schema({
    nome: String,
    descricao: String,
    campus: String,
    visibilidade: { type: Boolean, default: false },
    descricaoCompleta: {
        Objetivo: String,
        Metodologia: String,
        Recursos: String,
        Avaliacao: String,
        Referencias: String
    },
    bolsistas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    participantes: [{
        aluno: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        presencas: [presencaSchema]
    }],
    dataInicio: { type: Date, default: Date.now },
    dataFim: { type: Date },
});

const Atividade = mongoose.model('Atividade', atividadeSchema);
export default Atividade
