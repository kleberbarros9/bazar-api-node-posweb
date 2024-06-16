import mongoose from "mongoose";
import Product from "../model/Product.js";
import UserService from "./UserService.js";

export default class ProductService {
    /**
     * Método assíncrono estático 'create' para criar um novo produto.
     * Parâmetros: 'req' (requisição), 'name', 'description', 'state' e 'purchased_at'.
     * Obtém o usuário atual, verifica a validade dos dados, cria e salva o produto.
     * Em caso de erro, lança exceções específicas com mensagens e códigos de status apropriados.
     */
    static async create(req, name, description, state, purchased_at) {
        const user = await UserService.getUser(req);
        let images = req.files ? req.files.map(file => file.filename) : [];
        const available = true;

        if (!name) {
            const error = new Error("O nome é obrigatório.");
            error.statusCode = 422;
            throw error;
        }
        if (!description) {
            const error = new Error("A descrição é obrigatória.");
            error.statusCode = 422;
            throw error;
        }
        if (!state) {
            const error = new Error("O estado é obrigatório.");
            error.statusCode = 422;
            throw error;
        }
        if (!purchased_at) {
            const error = new Error("A data de compra é obrigatória.");
            error.statusCode = 422;
            throw error;
        }
        if (images.length === 0) {
            const error = new Error("A imagem é obrigatória.");
            error.statusCode = 422;
            throw error;
        }

        const product = new Product({ name, description, state, owner: user._id, available, images });
        const productSaved = await product.save();
        return productSaved;
    }

    /**
     * Método assíncrono estático 'index' para listar produtos com paginação.
     * Parâmetros: 'page' e 'limit'.
     * Retorna uma lista de produtos com base na página e limite especificados, populando os campos 'owner' e 'reciever'.
     */
    static async index(page, limit) {
        const products = await Product.find()
            .sort("-createdAt")
            .limit(limit)
            .skip((page - 1) * limit)
            .populate({ path: "owner", select: "-password" })
            .populate("reciever");

        return products;
    }

    /**
     * Método assíncrono estático 'showProductById' para exibir um produto pelo ID.
     * Parâmetro: 'productID'.
     * Verifica a validade do ID, busca o produto pelo ID e retorna o produto encontrado.
     * Em caso de erro, lança uma exceção com mensagem e código de status apropriados.
     */
    static async showProductById(productID) {
        if (!mongoose.isValidObjectId(productID)) {
            const error = new Error("Produto não encontrado");
            error.statusCode = 404;
            throw error;
        }
        const product = await Product.findById(productID);
        return product;
    }

    static async show() {
        // Implementação necessária para futuros requisitos
    }

    /**
     * Método assíncrono estático 'update' para atualizar um produto.
     * Parâmetros: 'req', 'name', 'description', 'state' e 'purchased_at'.
     * Verifica a validade dos dados e atualiza o produto no banco de dados.
     * Em caso de erro, lança exceções específicas com mensagens e códigos de status apropriados.
     */
    static async update(req, name, description, state, purchased_at) {
        if (!mongoose.isValidObjectId(req.params.id)) {
            const error = new Error("Produto não encontrado");
            error.statusCode = 404;
            throw error;
        }

        const product = await Product.findById(req.params.id);
        let images = req.files ? req.files.map(file => file.filename) : [];
        const available = true;

        if (!name) {
            const error = new Error("O nome é obrigatório.");
            error.statusCode = 422;
            throw error;
        }
        if (!description) {
            const error = new Error("A descrição é obrigatória.");
            error.statusCode = 422;
            throw error;
        }
        if (!state) {
            const error = new Error("O estado é obrigatório.");
            error.statusCode = 422;
            throw error;
        }
        if (!purchased_at) {
            const error = new Error("A data de compra é obrigatória.");
            error.statusCode = 422;
            throw error;
        }
        if (images.length === 0) {
            const error = new Error("A imagem é obrigatória.");
            error.statusCode = 422;
            throw error;
        }

        product.name = name;
        product.description = description;
        product.state = state;
        product.purchased_at = purchased_at;
        product.available = available;

        const updatedProduct = await product.save();
        return updatedProduct;
    }

    /**
     * Método assíncrono estático 'delete' para excluir um produto.
     * Parâmetro: 'productID'.
     * Verifica a validade do ID e exclui o produto no banco de dados.
     * Em caso de erro, lança uma exceção com mensagem e código de status apropriados.
     */
    static async delete(productID) {
        if (!mongoose.isValidObjectId(productID)) {
            const error = new Error("Produto não encontrado");
            error.statusCode = 404;
            throw error;
        }
        return await Product.findByIdAndDelete(productID).then(() => { return true });
    }

    /**
     * Método assíncrono estático 'showUserProducts' para listar produtos de um usuário.
     * Parâmetro: 'userId'.
     * Retorna uma lista de produtos de um usuário específico, populando o campo 'owner'.
     */
    static async showUserProducts(userId) {
        const products = await Product.find({ owner: userId }).populate({ path: "owner", select: "-password" });
        return products;
    }

    /**
     * Método assíncrono estático 'showRecieverProducts' para listar produtos recebidos por um usuário.
     * Parâmetro: 'userId'.
     * Retorna uma lista de produtos recebidos por um usuário específico.
     */
    static async showRecieverProducts(userId) {
        const products = await Product.find({ reciever: userId });
        return products;
    }

    /**
     * Método assíncrono estático 'schedule' para agendar um produto.
     * Parâmetro: 'req'.
     * Verifica a validade do ID do produto e a disponibilidade do produto.
     * Verifica a autorização do usuário e agenda o produto.
     * Em caso de erro, lança exceções específicas com mensagens e códigos de status apropriados.
     */
    static async schedule(req) {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            const error = new Error("ID inválido.");
            error.statusCode = 404;
            throw error;
        }

        const product = await Product.findById(id);
        if (!product) {
            const error = new Error("Produto não encontrado.");
            error.statusCode = 404;
            throw error;
        }
        if (!product.available) {
            const error = new Error("Produto não disponível.");
            error.statusCode = 422;
            throw error;
        }

        const user = await UserService.getUser(req);
        if (!product.owner.equals(user._id)) {
            const error = new Error("Usuário não autorizado a agendar este produto.");
            error.statusCode = 403;
            throw error;
        }

        product.reciever = user._id;
        await product.save();
        return {
            message: `A visita foi agendada com Sucesso, entre em contato com ${user.name}, pelo telefone, ${user.phone}`
        };
    }

    /**
     * Método assíncrono estático 'concludeDonation' para concluir a doação de um produto.
     * Parâmetro: 'req'.
     * Verifica a validade do ID do produto e a disponibilidade do produto.
     * Verifica a autorização do usuário e conclui a doação.
     * Em caso de erro, lança exceções específicas com mensagens e códigos de status apropriados.
     */
    static async concludeDonation(req) {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            const error = new Error("ID inválido.");
            error.statusCode = 404;
            throw error;
        }

        const product = await Product.findById(id);
        if (!product) {
            const error = new Error("Produto não encontrado.");
            error.statusCode = 404;
            throw error;
        }
        if (!product.available) {
            const error = new Error("Produto não disponível.");
            error.statusCode = 422;
            throw error;
        }

        const user = await UserService.getUser(req);
        if (!product.owner.equals(user._id)) {
            const error = new Error("Usuário não autorizado a agendar este produto.");
            error.statusCode = 403;
            throw error;
        }

        product.available = false;
        product.donated_at = new Date();
        await product.save();
        return {
            message: "Doação concluída com Sucesso."
        };
    }
}
