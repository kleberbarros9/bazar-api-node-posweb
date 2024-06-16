import { Router } from "express";
import ProductController from "../controller/ProductController.js";
import { verifyJwt } from "../helpers/manager-jwt.js";
import imageUpload from "../helpers/image-upload.js";

const router = Router();

/**
 * Rota POST para criar um novo produto.
 * Middleware: 'verifyJwt' para autenticação do usuário e 'imageUpload.array' para upload de múltiplas imagens.
 * Chama o método 'create' do 'ProductController'.
 */
router.post("/", verifyJwt, imageUpload.array("images"), ProductController.create);

/**
 * Rota GET para listar todos os produtos.
 * Chama o método 'index' do 'ProductController'.
 */
router.get("/", ProductController.index);

/**
 * Rota GET para exibir um produto específico por ID.
 * Middleware: 'verifyJwt' para autenticação do usuário.
 * Chama o método 'showProductById' do 'ProductController'.
 */
router.get("/showProductBy/:id", verifyJwt, ProductController.showProductById);

/**
 * Rota GET para listar produtos de um usuário autenticado.
 * Middleware: 'verifyJwt' para autenticação do usuário.
 * Chama o método 'showUserProducts' do 'ProductController'.
 */
router.get("/showUserProducts", verifyJwt, ProductController.showUserProducts);

/**
 * Rota GET para listar produtos recebidos por um usuário autenticado.
 * Middleware: 'verifyJwt' para autenticação do usuário.
 * Chama o método 'showRecieverProducts' do 'ProductController'.
 */
router.get("/showRecieverProducts", verifyJwt, ProductController.showRecieverProducts);

/**
 * Rota PUT para atualizar um produto específico por ID.
 * Middleware: 'verifyJwt' para autenticação do usuário e 'imageUpload.array' para upload de múltiplas imagens.
 * Chama o método 'update' do 'ProductController'.
 */
router.put("/:id", verifyJwt, imageUpload.array("images"), ProductController.update);

/**
 * Rota DELETE para excluir um produto específico por ID.
 * Middleware: 'verifyJwt' para autenticação do usuário.
 * Chama o método 'delete' do 'ProductController'.
 */
router.delete("/:id", verifyJwt, ProductController.delete);

/**
 * Rota PATCH para agendar um produto específico por ID.
 * Middleware: 'verifyJwt' para autenticação do usuário.
 * Chama o método 'schedule' do 'ProductController'.
 */
router.patch("/schedule/:id", verifyJwt, ProductController.schedule);

/**
 * Rota PATCH para concluir a doação de um produto específico por ID.
 * Middleware: 'verifyJwt' para autenticação do usuário.
 * Chama o método 'concludeDonation' do 'ProductController'.
 */
router.patch("/concludeDonation/:id", verifyJwt, ProductController.concludeDonation);

/**
 * Rota GET para exibir os detalhes de um produto específico por ID.
 * Chama o método 'show' do 'ProductController'.
 */
router.get("/:id", ProductController.show);

export default router;
