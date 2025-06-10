// Controlador responsável pela lógica da tela de perfil do usuário
class ProfileController {
    // Construtor: inicializa eventos e estado do perfil
    constructor() {
        this.initEventListeners(); // Inicializa os listeners dos botões
        this.profile = null; // Armazena os dados do perfil carregado
    }

    // Adiciona listeners para editar e cancelar edição do perfil
    initEventListeners() {
        // Botão para abrir modal de edição
        document.getElementById('editProfileBtn').addEventListener('click', () => this.showEditModal());
        // Formulário de edição de perfil
        document.getElementById('editProfileForm').addEventListener('submit', (e) => this.handleEditProfile(e));
        // Botão para cancelar edição
        document.getElementById('cancelEditBtn').addEventListener('click', () => this.hideEditModal());
    }

    // Carrega o perfil do usuário logado
    async loadProfile() {
        try {
            this.profile = await userRepo.getProfile(); // Busca perfil na API
            this.renderProfile(); // Atualiza tela com dados
            this.loadMyPosts(); // Carrega posts do usuário
        } catch (error) {
            this.showError('Erro ao carregar perfil');
        }
    }

    // Atualiza os elementos da tela com os dados do perfil
    renderProfile() {
        if (!this.profile) return;
        
        document.getElementById('profileUsername').textContent = `@${this.profile.username}`;
        document.getElementById('profileEmail').textContent = this.profile.email;
        
        const memberSince = new Date(this.profile.createdAt).toLocaleDateString();
        document.getElementById('memberSince').textContent = memberSince;
    }

    // Carrega as postagens do usuário logado
    async loadMyPosts() {
        const feedContainer = document.getElementById('myTweetsFeed'); // Container dos posts
        
        try {
            feedContainer.innerHTML = '<div class="loading">Carregando suas postagens...</div>';
            const posts = await postRepo.getMyPosts(); // Busca posts do usuário
            
            // Atualiza contador de posts
            document.getElementById('postCount').textContent = posts.length;
            
            if (window.feedController) {
                window.feedController.renderPosts(posts, feedContainer); // Renderiza posts usando FeedController
            }
        } catch (error) {
            feedContainer.innerHTML = '<div class="error">Erro ao carregar suas postagens</div>';
        }
    }

    // Mostra o modal de edição de perfil preenchido com os dados atuais
    showEditModal() {
        if (this.profile) {
            document.getElementById('editUsername').value = this.profile.username;
            document.getElementById('editEmail').value = this.profile.email;
            document.getElementById('editProfileModal').classList.remove('hidden');
        }
    }

    // Esconde o modal de edição de perfil
    hideEditModal() {
        document.getElementById('editProfileModal').classList.add('hidden');
    }

    // Lida com o submit do formulário de edição de perfil
    async handleEditProfile(e) {
        e.preventDefault(); // Evita recarregar a página
        
        const username = document.getElementById('editUsername').value;
        const email = document.getElementById('editEmail').value;
        
        try {
            const response = await userRepo.updateProfile({ username, email }); // Atualiza perfil na API
            this.profile = response.user; // Atualiza estado local
            currentUser.username = username;
            currentUser.email = email;
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser)); // Atualiza localStorage
            
            this.renderProfile(); // Atualiza tela
            this.hideEditModal(); // Fecha modal
            
            // Atualiza nome no header
            document.getElementById('headerUsername').textContent = `@${username}`;
            
            this.showSuccess('Perfil atualizado com sucesso!');
        } catch (error) {
            this.showError(error.message);
        }
    }

    // Exibe erro global usando AuthController
    showError(message) {
        window.authController.showError(message);
    }

    // Exibe sucesso global usando AuthController
    showSuccess(message) {
        window.authController.showSuccess(message);
    }
}