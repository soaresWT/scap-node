import express from "express";
import dbConnection from "./dbconection.js";
import router from "./routes/routes.js";
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(router)

app.listen(port, () => {
    dbConnection()
    console.log(`🚀 Server is running on port: ${port} 🚀`);
});
