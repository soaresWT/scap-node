import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    campus: {
        type: String,
        required: true,
        trim: true
    },
    bolsa: { type: mongoose.Schema.Types.ObjectId, ref: 'Bolsa' },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    avatar: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['bolsista', 'admin', 'tutor', 'aluno'],
    },
    titulacao: {
        type: String,
        enum: ['graduacao', 'especializacao', 'mestrado', 'doutorado', 'pos-doutorado'],
    },
    telefone: {
        type: String,
        trim: true
    },
    dataNascimento: {
        type: Date,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

const User = mongoose.model('User', userSchema);

export default User