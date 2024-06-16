import { Router } from "express";
import UserController from "../controller/UserController.js";
import { verifyJwt } from "../helpers/manager-jwt.js";
import imageUpload from "../helpers/image-upload.js";

const router = Router();

/**
 * Rota POST para registrar um novo usuário.
 * Chama o método 'register' do 'UserController'.
 */
router.post("/register", UserController.register);

/**
 * Rota POST para autenticar um usuário.
 * Chama o método 'login' do 'UserController'.
 */
router.post("/login", UserController.login);

/**
 * Rota GET para obter os dados do usuário autenticado.
 * Middleware: 'verifyJwt' para autenticação do usuário.
 * Chama o método 'getUser' do 'UserController'.
 */
router.get("/currentUser", verifyJwt, UserController.getUser);

/**
 * Rota PUT para atualizar os dados do usuário autenticado.
 * Middleware: 'verifyJwt' para autenticação do usuário e 'imageUpload.single' para upload de uma imagem.
 * Chama o método 'updateUser' do 'UserController'.
 */
router.put("/currentUser", verifyJwt, imageUpload.single("image"), UserController.updateUser);

export default router;
