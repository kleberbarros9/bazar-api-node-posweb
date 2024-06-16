import express from "express";
import connectDB from "./db/db.js";
import UserRoutes from "./routes/UserRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";

const app = express();
app.use(express.json());

/**
 * Rota para as operações de usuários.
 * Usa as rotas definidas em 'UserRoutes'.
 */
app.use("/users", UserRoutes);

/**
 * Rota para as operações de produtos.
 * Usa as rotas definidas em 'ProductRoutes'.
 */
app.use("/products", ProductRoutes);

/**
 * Conecta ao banco de dados e inicia o servidor na porta especificada no arquivo de ambiente.
 * Exibe uma mensagem no console indicando que o servidor está escutando na porta configurada.
 */
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server listen in port ${process.env.PORT}`);
    });
});
