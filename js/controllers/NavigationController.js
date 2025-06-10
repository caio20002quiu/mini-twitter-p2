// Controlador responsável pela navegação entre abas (Feed e Perfil)
class NavigationController {
    // Construtor: inicializa eventos de navegação
    constructor() {
        this.initEventListeners(); // Inicializa os listeners dos itens de navegação
    }

    // Adiciona listeners para cada item do menu de navegação
    initEventListeners() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => this.handleTabChange(e)); // Ao clicar, troca de aba
        });
    }

    // Lida com a troca de abas
    handleTabChange(e) {
        const tabName = e.target.dataset.tab; // Nome da aba clicada
        
        // Remove classe 'active' de todos os itens de navegação
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        // Adiciona classe 'active' ao item clicado
        e.target.classList.add('active');
        
        // Esconde todos os conteúdos de aba
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Mostra o conteúdo da aba selecionada e carrega dados se necessário
        if (tabName === 'feed') {
            document.getElementById('feedTab').classList.add('active');
            if (window.feedController) {
                window.feedController.loadFeed();
            }
        } else if (tabName === 'profile') {
            document.getElementById('profileTab').classList.add('active');
            if (window.profileController) {
                window.profileController.loadProfile();
            }
        }
        
        // Atualiza variável global de aba atual
        currentTab = tabName;
    }
}