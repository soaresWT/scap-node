import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Garante que o email seja único no banco de dados
        lowercase: true, // Converte o email para minúsculas
        trim: true // Remove espaços extras no início e no final do email
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['bolsista', 'admin', 'tutor', 'aluno'], // Defina os possíveis cargos aqui
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

const User = mongoose.model('User', userSchema);

export default User