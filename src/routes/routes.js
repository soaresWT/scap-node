import express from "express";
import userRoutes from "./UserRoutes.js";
import bolsaRoutes from "./bolsaRoutes.js";
const router = express.Router()

router.get("/", (req, res) => {
    res.send("ok").status(200)
})
router.use(userRoutes)
router.use(bolsaRoutes)

export default router


