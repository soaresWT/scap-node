import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const dbConnection = async () => {
    const maxAttempts = 5; // Número máximo de tentativas
    const retryInterval = 3000; // Intervalo de tempo em milissegundos entre as tentativas
    let attempts = 1;
    while (attempts <= maxAttempts) {
        try {
            console.log("tentando conectar ao banco...")
            mongoose.set("strictQuery", false);
            const conection = await mongoose.connect(process.env.DATABASE_URL, {
                serverSelectionTimeoutMS: 3000
            });
            console.log('Database connected: ', conection.connection.name);
            break
        }
        catch (error) {
            console.error('Erro ao conectar ao banco de dados:', error.message);
            attempts++;
            if (attempts <= maxAttempts) {
                console.log(`Tentando novamente em ${retryInterval / 1000} segundos...`);
                await new Promise((resolve) => setTimeout(resolve, retryInterval)); // Aguarda o intervalo de tempo antes de tentar novamente
            } else {
                console.error('Número máximo de tentativas atingido. Falha ao conectar ao banco de dados.');
            }
        }
    }
}

export default dbConnection;