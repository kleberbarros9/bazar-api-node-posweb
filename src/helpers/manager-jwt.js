import jwt from "jsonwebtoken";

/**
 * Função 'createUserToken' para criar um token JWT para um usuário.
 * Parâmetro: 'user' (objeto do usuário contendo 'name' e '_id').
 * Gera um token assinado com o 'name' e 'id' do usuário usando a chave privada em 'process.env.PRIVATE_KEY'.
 * Retorna o token gerado.
 */
export const createUserToken = (user) => {
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.PRIVATE_KEY);

    return token;
}

/**
 * Middleware 'verifyJwt' para verificar a validade de um token JWT.
 * Parâmetros: 'req' (requisição), 'res' (resposta) e 'next' (função de próximo middleware).
 * Extrai o token do cabeçalho de autorização da requisição.
 * Se o token não for encontrado, retorna um erro 401 (Não Autorizado).
 * Tenta verificar o token usando a chave privada em 'process.env.PRIVATE_KEY'.
 * Se válido, armazena o payload do token em 'req.user' e chama 'next'.
 * Em caso de erro na verificação, retorna um erro 498 (Token inválido).
 */
export const verifyJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "Não Autorizado." });
        return;
    }

    try {
        const payload = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = payload;
        next();
    } catch (error) {
        res.status(498).json({ error: "Token inválido." });
        return;
    }
}
