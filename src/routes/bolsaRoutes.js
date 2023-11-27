import express from "express"
import { createBolsa, deleteBolsa, updateBolsa, getBolsas, getBolsasByNome } from "../controllers/BolsaController.js"
import { authMiddleware } from "../middlewares/auth.js"
const bolsaRoutes = express.Router()

bolsaRoutes.post('/bolsas', authMiddleware, createBolsa);
bolsaRoutes.put('/bolsas/:id', authMiddleware, updateBolsa);
bolsaRoutes.delete('/bolsas/:id', authMiddleware, deleteBolsa);
bolsaRoutes.get('/bolsas', getBolsas);
bolsaRoutes.get('/bolsas/:nome', getBolsasByNome);



export default bolsaRoutes;