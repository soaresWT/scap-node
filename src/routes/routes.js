import express from "express";
import userRoutes from "./UserRoutes.js";
const router = express.Router()

router.get("/", (req, res) => {
    res.send("ok").status(200)
})
router.use(userRoutes)

export default router


