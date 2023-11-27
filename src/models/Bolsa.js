import mongoose from "mongoose";

const bolsaSchema = new mongoose.Schema({
    nome: String,
    bolsistas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bolsista' }] // Referência para os bolsistas na bolsa
});

const Bolsa = mongoose.model('Bolsa', bolsaSchema);

export default Bolsa
