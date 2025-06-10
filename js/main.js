// Cria uma instância do repositório de autenticação para lidar com login e cadastro
const authRepo = new AuthRepository();
// Cria uma instância do repositório de postagens para lidar com tweets
const postRepo = new PostRepository();
// Cria uma instância do repositório de usuários para lidar com dados do perfil
const userRepo = new UserRepository();

// Aguarda o carregamento completo do DOM para iniciar a aplicação
document.addEventListener('DOMContentLoaded', () => {
    window.authController = new AuthController();
});