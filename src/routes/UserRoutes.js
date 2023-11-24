import express from "express"
import { createUser, changePassword, updateUser } from "../controllers/UserController.js"
import login from "../middlewares/login.js"
import { authMiddleware, forgotPassword, resetPassword } from "../middlewares/auth.js"
const userRoutes = express.Router()


userRoutes.post("/createUser", authMiddleware, createUser);
userRoutes.post('/change-password', authMiddleware, changePassword);
userRoutes.post("/login", login)
userRoutes.post('/forgot-password', forgotPassword);
userRoutes.post('/reset-password/:token', resetPassword);
userRoutes.put('/users/:id', authMiddleware, updateUser);




export default userRoutes;