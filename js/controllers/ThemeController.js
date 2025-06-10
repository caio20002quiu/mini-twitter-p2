// Controlador responsável por alternar entre modo claro e escuro (dark mode)
class ThemeController {
    // Construtor: inicializa elementos e eventos do tema
    constructor() {
        this.themeToggle = document.getElementById('themeToggle'); // Botão de alternância de tema
        this.themeIcon = this.themeToggle.querySelector('i'); // Ícone do botão
        this.initTheme(); // Inicializa o tema conforme preferência
        this.addEventListeners(); // Adiciona listeners
    }

    // Inicializa o tema ao abrir o site
    initTheme() {
        // Verifica se há tema salvo no localStorage ou preferência do sistema
        const savedTheme = localStorage.getItem('theme');
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
            this.enableDarkMode(); // Ativa modo escuro
        } else {
            this.enableLightMode(); // Ativa modo claro
        }
    }

    // Adiciona listener para alternar tema ao clicar no botão
    addEventListeners() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Alterna entre modo claro e escuro
    toggleTheme() {
        if (document.documentElement.classList.contains('dark-mode')) {
            this.enableLightMode(); // Se já está escuro, vai para claro
        } else {
            this.enableDarkMode(); // Se está claro, vai para escuro
        }
    }

    // Ativa modo escuro
    enableDarkMode() {
        document.documentElement.classList.add('dark-mode'); // Adiciona classe no <html>
        this.themeIcon.classList.remove('fa-moon'); // Troca ícone
        this.themeIcon.classList.add('fa-sun');
        this.themeToggle.querySelector('span')?.remove(); // Remove texto antigo
        this.themeToggle.insertAdjacentHTML('beforeend', '<span>Modo Claro</span>'); // Adiciona texto
        localStorage.setItem('theme', 'dark'); // Salva preferência
    }

    // Ativa modo claro
    enableLightMode() {
        document.documentElement.classList.remove('dark-mode'); // Remove classe do <html>
        this.themeIcon.classList.remove('fa-sun'); // Troca ícone
        this.themeIcon.classList.add('fa-moon');
        this.themeToggle.querySelector('span')?.remove(); // Remove texto antigo
        this.themeToggle.insertAdjacentHTML('beforeend', '<span>Modo Noturno</span>'); // Adiciona texto
        localStorage.setItem('theme', 'light'); // Salva preferência
    }
}

// Inicializa o controlador de tema quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new ThemeController();
}); 