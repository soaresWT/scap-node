import express from "express"
import { createAtividade, deleteAtividade, updateAtividade, getAtividades } from "../controllers/AtividadeController.js"
import { authMiddleware } from "../middlewares/auth.js"
const atividadeRoutes = express.Router()

atividadeRoutes.post('/atividades', authMiddleware, createAtividade);
atividadeRoutes.put('/atividades/:id', authMiddleware, updateAtividade);
atividadeRoutes.delete('/atividades/:id', authMiddleware, deleteAtividade);
atividadeRoutes.get('/atividades', getAtividades);


export default atividadeRoutes;
