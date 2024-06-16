import multer from "multer";
import path from "path";

/**
 * Configuração de armazenamento 'imageStore' para o multer, definindo onde e como as imagens serão salvas.
 * - 'destination': Define a pasta de destino com base na URL da requisição ('users' ou 'products').
 * - 'filename': Gera um nome de arquivo único com base no timestamp atual e um número aleatório, mantendo a extensão original do arquivo.
 */
const imageStore = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "";

        if(req.baseUrl.includes("users")){
            folder = "users";
        } else if(req.baseUrl.includes("products")){
            folder = "products";
        }

        cb(null, `src/public/images/${folder}`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + Math.floor(Math.random() * 1000) + path.extname(file.originalname));
    }
});

/**
 * Configuração do middleware 'imageUpload' utilizando o multer.
 * - 'storage': Define o armazenamento configurado em 'imageStore'.
 * - 'fileFilter': Filtra arquivos para aceitar apenas imagens com extensões 'png' ou 'jpg'.
 */
const imageUpload = multer({
    storage: imageStore,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("Por favor, envie uma imagem jpg ou png"));
        }
        cb(undefined, true);
    }
});

export default imageUpload;
