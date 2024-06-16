import mongoose from "mongoose";

/**
 * Função assíncrona 'connectDB' para conectar ao banco de dados MongoDB.
 * Tenta estabelecer a conexão usando a URL do MongoDB fornecida em 'process.env.MONGO_URL'.
 * Em caso de sucesso, exibe uma mensagem de conexão estabelecida no console.
 * Em caso de erro, exibe o erro no console e encerra o processo com status 1.
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${conn.connection.db.namespace}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;
