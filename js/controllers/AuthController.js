// Controlador responsável por toda a lógica de autenticação (login, cadastro, logout)
class AuthController {
    // Construtor: inicializa elementos e eventos
    constructor() {
        // Pega o formulário de login
        this.loginForm = document.getElementById('loginForm');
        // Pega o formulário de cadastro
        this.registerForm = document.getElementById('registerForm');
        // Pega a tela de login
        this.loginScreen = document.getElementById('loginScreen');
        // Pega a tela principal
        this.mainScreen = document.getElementById('mainScreen');
        
        // Inicializa os eventos dos formulários e botões
        this.initEventListeners();
        // Verifica se o usuário já está autenticado ao abrir o site
        this.checkAuthStatus();
    }

    // Adiciona os listeners de eventos dos formulários e botões
    initEventListeners() {
        // Evento de submit do login
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => {
                e.preventDefault(); // Evita recarregar a página
                this.handleLogin(); // Chama o método de login
            });
        }

        // Evento de submit do cadastro
        if (this.registerForm) {
            this.registerForm.addEventListener('submit', (e) => {
                e.preventDefault(); // Evita recarregar a página
                this.handleRegister(); // Chama o método de cadastro
            });
        }
        // Botão para mostrar tela de cadastro
        document.getElementById('showRegisterBtn').addEventListener('click', () => this.showRegister());
        // Botão para mostrar tela de login
        document.getElementById('showLoginBtn').addEventListener('click', () => this.showLogin());
        // Botão de logout
        document.getElementById('logoutBtn').addEventListener('click', () => this.handleLogout());
    }

    // Verifica se já existe usuário autenticado no localStorage
    checkAuthStatus() {
        const token = localStorage.getItem('authToken'); // Busca o token salvo
        const user = localStorage.getItem('currentUser'); // Busca o usuário salvo
        
        // Se ambos existem, define as variáveis globais e mostra a tela principal
        if (token && user) {
            authToken = token;
            currentUser = JSON.parse(user);
            this.showMainScreen();
        }
    }

    // Lida com o login do usuário
    async handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Remove mensagens de erro anteriores
        this.clearErrorMessages();

        // Validação simples dos campos
        if (!email || !password) {
            this.showLoginError('Por favor, preencha todos os campos.');
            return;
        }

        // Faz login usando o AuthRepository
        try {
            const authRepo = new AuthRepository();
            const data = await authRepo.login({ email, password });
            // Salva o token e o usuário no localStorage e nas variáveis globais
            localStorage.setItem('authToken', data.token);
            authToken = data.token;
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            currentUser = data.user;
            this.loginSuccessful(data.user); // Chama o método de sucesso
        } catch (error) {
            this.showLoginError(error.message || 'Erro ao fazer login');
        }
    }

    // Lida com o cadastro do usuário
    async handleRegister() {
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        // Remove mensagens de erro anteriores
        this.clearErrorMessages();

        // Validação simples dos campos
        if (!username || !email || !password) {
            this.showRegisterError('Por favor, preencha todos os campos.');
            return;
        }

        // Faz cadastro usando o AuthRepository
        try {
            const authRepo = new AuthRepository();
            await authRepo.register({ username, email, password });
            this.showRegisterSuccess('Cadastro realizado com sucesso!');
            this.registerForm.reset();
        } catch (error) {
            this.showRegisterError(error.message || 'Erro ao cadastrar usuário');
        }
    }

    // Exibe mensagem de erro no login
    showLoginError(message) {
        // Procura elemento de erro, se não existir cria
        let errorElement = this.loginScreen.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            this.loginForm.insertBefore(errorElement, this.loginForm.firstChild);
        }
        
        // Estiliza e exibe a mensagem
        errorElement.textContent = message;
        errorElement.style.backgroundColor = '#FFE6E6';
        errorElement.style.color = '#D32F2F';
        errorElement.style.padding = '10px';
        errorElement.style.borderRadius = '5px';
        errorElement.style.marginBottom = '15px';
        errorElement.style.textAlign = 'center';
    }

    // Exibe mensagem de erro no cadastro
    showRegisterError(message) {
        // Remove mensagens de erro anteriores
        const oldErrors = this.registerForm.querySelectorAll('.register-error-message');
        oldErrors.forEach(el => el.remove());

        // Cria elemento de erro
        let errorElement = document.createElement('div');
        errorElement.classList.add('register-error-message');
        errorElement.textContent = message;
        errorElement.style.backgroundColor = '#FFE6E6';
        errorElement.style.color = '#D32F2F';
        errorElement.style.padding = '10px';
        errorElement.style.borderRadius = '5px';
        errorElement.style.marginBottom = '15px';
        errorElement.style.textAlign = 'center';
        this.registerForm.insertBefore(errorElement, this.registerForm.firstChild);
    }

    // Exibe mensagem de sucesso no cadastro
    showRegisterSuccess(message) {
        // Remove mensagens de erro e sucesso anteriores
        const registerErrorElements = this.registerForm.querySelectorAll('.register-error-message');
        registerErrorElements.forEach(el => el.remove());
        const oldSuccess = this.registerForm.querySelectorAll('.register-success-message');
        oldSuccess.forEach(el => el.remove());

        // Cria elemento de sucesso
        let successElement = document.createElement('div');
        successElement.classList.add('register-success-message');
        successElement.textContent = message;
        successElement.style.backgroundColor = '#E6FFE6';
        successElement.style.color = '#17BF63';
        successElement.style.padding = '10px';
        successElement.style.borderRadius = '5px';
        successElement.style.marginBottom = '15px';
        successElement.style.textAlign = 'center';
        this.registerForm.insertBefore(successElement, this.registerForm.firstChild);
    }

    // Remove todas as mensagens de erro e sucesso dos formulários
    clearErrorMessages() {
        // Remove erro de login
        const loginErrorElement = this.loginScreen.querySelector('.error-message');
        if (loginErrorElement) {
            loginErrorElement.remove();
        }
        // Remove erro de cadastro
        const registerErrorElement = this.loginScreen.querySelector('.register-error-message');
        if (registerErrorElement) {
            registerErrorElement.remove();
        }
        // Remove sucesso de cadastro
        const registerSuccessElement = this.loginScreen.querySelector('.register-success-message');
        if (registerSuccessElement) {
            registerSuccessElement.remove();
        }
    }

    // Executado após login bem-sucedido
    loginSuccessful(user) {
        // Salva usuário logado
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUser = user;
        // Esconde tela de login
        this.loginScreen.classList.remove('active');
        // Mostra tela principal
        this.mainScreen.classList.add('active');
        // Atualiza nome do usuário no header
        const headerUsername = document.getElementById('headerUsername');
        if (headerUsername) {
            headerUsername.textContent = user.username;
        }
        // Inicializa controladores e carrega dados
        this.showMainScreen();
    }

    // Faz logout do usuário
    handleLogout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        authToken = null;
        currentUser = null;
        this.showLogin();
    }

    // Mostra tela de login
    showLogin() {
        document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
        document.getElementById('loginScreen').classList.add('active');
    }

    // Mostra tela de cadastro
    showRegister() {
        document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
        document.getElementById('registerScreen').classList.add('active');
    }

    // Mostra tela principal e inicializa controladores
    showMainScreen() {
        document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
        document.getElementById('mainScreen').classList.add('active');
        document.getElementById('headerUsername').textContent = `@${currentUser.username}`;
        // Inicializa controladores principais se ainda não existem
        if (!window.feedController) {
            window.feedController = new FeedController();
            window.profileController = new ProfileController();
            window.navController = new NavigationController();
        }
        // Carrega dados iniciais
        window.feedController.loadFeed();
        window.profileController.loadProfile();
    }

    // (Opcional) Exibe loading (pode ser implementado se quiser)
    showLoading(message = 'Carregando...') {
        // Implementar loading se necessário
    }

    // (Opcional) Esconde loading (pode ser implementado se quiser)
    hideLoading() {
        // Implementar hide loading se necessário
    }

    // Exibe mensagem de erro global
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Exibe mensagem de sucesso global
    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success';
        successDiv.textContent = message;
        document.body.appendChild(successDiv);
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
}

// Inicializa o controlador de autenticação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new AuthController();
});