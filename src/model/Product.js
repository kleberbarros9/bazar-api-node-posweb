import mongoose from "mongoose";
import { Schema } from "mongoose";

/**
 * Definição do modelo 'Product' usando o Mongoose.
 * - name: Nome do produto (string, obrigatório).
 * - description: Descrição do produto (string, obrigatório).
 * - images: Lista de imagens do produto (array, obrigatório).
 * - available: Disponibilidade do produto (booleano, obrigatório).
 * - state: Estado do produto (string, pode ser "good", "fair" ou "bad").
 * - owner: Referência ao dono do produto (ObjectId, referência ao modelo 'User').
 * - reciever: Referência ao receptor do produto (ObjectId, referência ao modelo 'User').
 * - purchased_at: Data da compra do produto (Date).
 * - donated_at: Data da doação do produto (Date).
 * O esquema possui timestamps automáticos para criação e atualização.
 */
const Product = mongoose.model(
    "Product",
    new Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            required: true
        },
        available: {
            type: Boolean,
            required: true
        },
        state: {
            type: String,
            enum: ["good", "fair", "bad"]
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        reciever: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        purchased_at: Date,
        donated_at: Date
    }, { timestamps: true })
);

export default Product;
