import mongoose from "mongoose";
import { Schema } from "mongoose";

/**
 * Definição do modelo 'User' usando o Mongoose.
 * - name: Nome do usuário (string, obrigatório, máximo de 80 caracteres).
 * - email: Email do usuário (string, obrigatório).
 * - password: Senha do usuário (string, obrigatório).
 * - phone: Telefone do usuário (string, obrigatório).
 * - image: Imagem do usuário (string, opcional).
 * - address: Endereço do usuário (string, obrigatório).
 * O esquema possui timestamps automáticos para criação e atualização.
 */
const User = mongoose.model(
    "User",
    new Schema({
       name: {
        type: String,
        required: true,
        maxlength: 80
       },
       email: {
        type: String,
        required: true
       },
       password: {
        type: String,
        required: true
       },
       phone: {
        type: String,
        required: true
       },
       image: String,
       address: {
        type: String,
        required: true
       }
    }, { timestamps: true })
);

export default User;
