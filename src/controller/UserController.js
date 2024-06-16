import { createUserToken } from "../helpers/manager-jwt.js";
import UserService from "../service/UserService.js";

export default class UserController {
    /**
     * Método assíncrono estático 'register' para registrar um novo usuário.
     * Parâmetros: 'req' (requisição) e 'res' (resposta).
     * Extrai 'name', 'email', 'password', 'confirmPassword', 'phone' e 'address' do corpo da requisição.
     * Chama 'UserService.register' para registrar o usuário e gera um token JWT.
     * Retorna o token e o ID do usuário.
     * Em caso de erro, define o statusCode como 500 (ou o do erro) e retorna a mensagem de erro.
     */
    static async register(req, res) {
        try {
            const { name, email, password, confirmPassword, phone, address } = req.body;
            const user = await UserService.register(name, email, password, confirmPassword, phone, address);
            const token = createUserToken(user);
            res.status(201).json({ token: token, userId: user._id });
        } catch (error) {
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({ error: error.message });
        }
    }

    /**
     * Método assíncrono estático 'login' para autenticar um usuário.
     * Parâmetros: 'req' (requisição) e 'res' (resposta).
     * Extrai 'email' e 'password' do corpo da requisição.
     * Chama 'UserService.verifyLogin' para verificar as credenciais do usuário e gera um token JWT.
     * Retorna o token e o ID do usuário.
     * Em caso de erro, define o statusCode como 500 (ou o do erro) e retorna a mensagem de erro.
     */
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserService.verifyLogin(email, password);
            const token = createUserToken(user);
            res.status(200).json({ token, userId: user._id });
        } catch (error) {
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({ error: error.message });
        }
    }

    /**
     * Método assíncrono estático 'getUser' para obter informações do usuário autenticado.
     * Parâmetros: 'req' (requisição) e 'res' (resposta).
     * Chama 'UserService.getUser' para obter os dados do usuário com base no token JWT.
     * Retorna os dados do usuário.
     * Em caso de erro, define o statusCode como 500 (ou o do erro) e retorna a mensagem de erro.
     */
    static async getUser(req, res) {
        try {
            const user = await UserService.getUser(req);
            res.status(200).json({ user });
        } catch (error) {
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({ error: error.message });
        }
    }

    /**
     * Método assíncrono estático 'updateUser' para atualizar informações do usuário.
     * Parâmetros: 'req' (requisição) e 'res' (resposta).
     * Extrai 'name', 'email', 'password', 'confirmPassword', 'phone' e 'address' do corpo da requisição.
     * Chama 'UserService.updateUser' para atualizar os dados do usuário e retorna os dados atualizados.
     * Em caso de erro, define o statusCode como 500 (ou o do erro) e retorna a mensagem de erro.
     */
    static async updateUser(req, res) {
        try {
            const { name, email, password, confirmPassword, phone, address } = req.body;
            const user = await UserService.updateUser(req, name, email, password, confirmPassword, phone, address);
            res.status(200).json({ user });
        } catch (error) {
            error.statusCode = error.statusCode || 500;
            res.status(error.statusCode).json({ error: error.message });
        }
    }
}
