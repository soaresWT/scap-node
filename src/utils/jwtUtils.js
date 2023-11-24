// jwtUtils.js
import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' }); // Substitua 'seu_segredo_secreto' por uma chave secreta mais robusta
};

export default generateToken;
