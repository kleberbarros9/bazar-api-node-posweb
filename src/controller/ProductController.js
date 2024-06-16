import ProductService from "../service/ProductService.js";

export default class ProductController{
    /**
     * Método assíncrono estático 'create' para criar um novo produto.
     * Parâmetros: 'req' (requisição) e 'res' (resposta).
     * Extrai 'name', 'description', 'state' e 'purchased_at' do corpo da requisição.
     * Chama 'ProductService.create' para criar o produto e retorna o produto criado.
     * Em caso de erro, define o statusCode como 500 (ou o do erro) e retorna a mensagem de erro.
     */
    static async create(req, res) {
        try {
            const { name, description, state, purchased_at } = req.body;
            const product = await ProductService.create(req, name, description, state, purchased_at);
            res.status(201).json({ product });
        } catch (error) {
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({ error: error.message });
        }
    }

    /**
     * Método assíncrono estático 'index' para listar produtos com paginação.
     * Parâmetros: 'req' (requisição) e 'res' (resposta).
     * Extrai 'page' e 'limit' da query string, com valores padrão 1 e 10.
     * Chama 'ProductService.index' para obter os produtos e retorna a lista de produtos.
     * Em caso de erro, define o statusCode como 500 (ou o do erro) e retorna a mensagem de erro.
     */
    static async index(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const products = await ProductService.index(page, limit);
            res.status(200).json({ products });
        } catch (error) {
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({ error: error.message });
        }
    }

    /**
     * Método assíncrono estático 'show' para exibir uma mensagem de teste.
     * Parâmetros: 'req' (requisição) e 'res' (resposta).
     * Retorna uma mensagem de teste.
     * Em caso de erro, define o statusCode como 500 (ou o do erro) e retorna a mensagem de erro.
     */
    static async show(req, res){
        try{
            res.json({message:"show"});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({error: error.message});
        }
    }

    /**
     * Método assíncrono estático 'update' para atualizar um produto.
     * Parâmetros: 'req' (requisição) e 'res' (resposta).
     * Extrai 'name', 'description', 'state' e 'purchased_at' do corpo da requisição.
     * Chama 'ProductService.update' para atualizar o produto e retorna o produto atualizado.
     * Em caso de erro, define o statusCode como 500 (ou o do erro) e retorna a mensagem de erro.
     */
    static async update(req, res){
        try{
            const { name, description, state, purchased_at } = req.body;
            const updatedProduct = await ProductService.update(req, name, description, state, purchased_at);
            res.json({message:"update", updatedProduct});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({error: error.message});
        }
    }

    /**
     * Método assíncrono estático 'delete' para excluir um produto.
     * Parâmetros: 'req' (requisição) e 'res' (resposta).
     * Extrai 'id' dos parâmetros da requisição.
     * Chama 'ProductService.delete' para excluir o produto e retorna uma mensagem de confirmação.
     * Em caso de erro, define o statusCode como 500 (ou o do erro) e retorna a mensagem de erro.
     */
    static async delete(req, res){
        try{
            const productId = req.params.id;
            const deletedProduct = await ProductService.delete(productId);
            if (deletedProduct) {
                const msg = `Produto id: ${productId} deletado!`;
                res.json({msg});
            }
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({error: error.message});
        }
    }

    /**
     * Método assíncrono estático 'showProductById' para exibir um produto pelo ID.
     * Parâmetros: 'req' (requisição) e 'res' (resposta).
     * Extrai 'id' dos parâmetros da requisição.
     * Chama 'ProductService.showProductById' para obter o produto e retorna o produto.
     * Em caso de erro, define o statusCode como 500 (ou o do erro) e retorna a mensagem de erro.
     */
    static async showProductById(req, res) {
        try{
            const productId = req.params.id;
            const product = await ProductService.showProductById(productId);
            res.json({product});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({error: error.message});
        }
    }

    /**
     * Método assíncrono estático 'showUserProducts' para listar produtos de um usuário.
     * Parâmetros: 'req' (requisição) e 'res' (resposta).
     * Extrai 'id' do usuário autenticado.
     * Chama 'ProductService.showUserProducts' para obter os produtos e retorna a lista de produtos.
     * Em caso de erro, define o statusCode como 500 (ou o do erro) e retorna a mensagem de erro.
     */
    static async showUserProducts(req, res){
        try{
            const userId = req.user.id;
            const products = await ProductService.showUserProducts(userId);
            res.json({products});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({error: error.message});
        }
    }

    /**
     * Método assíncrono estático 'showRecieverProducts' para listar produtos recebidos por um usuário.
     * Parâmetros: 'req' (requisição) e 'res' (resposta).
     * Extrai 'id' do usuário autenticado.
     * Chama 'ProductService.showRecieverProducts' para obter os produtos e retorna a lista de produtos.
     * Em caso de erro, define o statusCode como 500 (ou o do erro) e retorna a mensagem de erro.
     */
    static async showRecieverProducts(req, res){
        try{
            const userId = req.user.id;
            const products = await ProductService.showRecieverProducts(userId);
            res.json({products});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({error: error.message});
        }
    }

    /**
     * Método assíncrono estático 'schedule' para agendar um produto.
     * Parâmetros: 'req' (requisição) e 'res' (resposta).
     * Chama 'ProductService.schedule' para agendar o produto e retorna o agendamento.
     * Em caso de erro, define o statusCode como 500 (ou o do erro) e retorna a mensagem de erro.
     */
    static async schedule(req, res){
        try{
            const schedule = await ProductService.schedule(req);
            res.json({schedule});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({error: error.message});
        }
    }

    /**
     * Método assíncrono estático 'concludeDonation' para concluir uma doação.
     * Parâmetros: 'req' (requisição) e 'res' (resposta).
     * Chama 'ProductService.concludeDonation' para concluir a doação e retorna a confirmação.
     * Em caso de erro, define o statusCode como 500 (ou o do erro) e retorna a mensagem de erro.
     */
    static async concludeDonation(req, res){
        try{
            const concludeDonation = await ProductService.concludeDonation(req);
            res.json({concludeDonation});
        }catch(error){
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({error: error.message});
        }
    }
}
