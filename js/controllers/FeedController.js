// Controlador responsável pelo feed de postagens (tweets)
class FeedController {
    // Construtor: inicializa eventos do feed
    constructor() {
        this.initEventListeners(); // Inicializa os listeners dos botões e textarea
    }

    // Adiciona listeners para tweetar e contar caracteres
    initEventListeners() {
        // Listener do botão de tweetar
        document.getElementById('tweetBtn').addEventListener('click', () => this.handleTweet());
        // Listener para atualizar contador de caracteres
        document.getElementById('tweetContent').addEventListener('input', (e) => this.updateCharCount(e));
    }

    // Atualiza o contador de caracteres do tweet
    updateCharCount(e) {
        const content = e.target.value; // Pega o texto digitado
        const count = content.length; // Conta os caracteres
        const charCountEl = document.getElementById('charCount'); // Elemento do contador
        const tweetBtn = document.getElementById('tweetBtn'); // Botão de tweetar
        
        charCountEl.textContent = `${count}/280`; // Atualiza o texto do contador
        
        // Aplica classes e habilita/desabilita botão conforme o limite
        if (count > 280) {
            charCountEl.className = 'char-count danger';
            tweetBtn.disabled = true;
        } else if (count > 250) {
            charCountEl.className = 'char-count warning';
            tweetBtn.disabled = false;
        } else {
            charCountEl.className = 'char-count';
            tweetBtn.disabled = count === 0;
        }
    }

    // Lida com o envio de um novo tweet
    async handleTweet() {
        const content = document.getElementById('tweetContent').value.trim(); // Pega o texto
        
        // Não faz nada se vazio ou acima do limite
        if (!content || content.length > 280) return;
        
        try {
            await postRepo.createPost(content); // Cria o post na API
            document.getElementById('tweetContent').value = ''; // Limpa textarea
            this.updateCharCount({ target: { value: '' } }); // Reseta contador
            this.loadFeed(); // Recarrega o feed
            this.showSuccess('Postagem criada com sucesso!');
        } catch (error) {
            this.showError(error.message);
        }
    }

    // Carrega o feed de postagens
    async loadFeed() {
        const feedContainer = document.getElementById('tweetsFeed'); // Container do feed
        
        try {
            feedContainer.innerHTML = '<div class="loading">Carregando postagens...</div>';
            const posts = await postRepo.getAllPosts(); // Busca posts na API
            this.renderPosts(posts, feedContainer); // Renderiza os posts
        } catch (error) {
            feedContainer.innerHTML = '<div class="error">Erro ao carregar postagens</div>';
        }
    }

    // Renderiza os posts no container
    renderPosts(posts, container) {
        if (posts.length === 0) {
            container.innerHTML = '<div class="text-center" style="padding: 2rem; color: #657786;">Nenhuma postagem ainda</div>';
            return;
        }
        
        // Monta o HTML de cada post
        container.innerHTML = posts.map(post => this.createPostHTML(post)).join('');
        
        // Adiciona listeners para os botões de deletar
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleDeletePost(e));
        });
    }

    // Cria o HTML de um post individual
    createPostHTML(post) {
        // Só mostra botão de deletar se o post for do usuário logado
        const canDelete = currentUser && post.author._id === currentUser.id;
        const postDate = new Date(post.createdAt).toLocaleString(); // Data formatada
        
        return `
            <div class="tweet" data-post-id="${post._id}">
                <div class="tweet-header">
                    <span class="tweet-author">@${post.author.username}</span>
                    <span class="tweet-date">${postDate}</span>
                </div>
                <div class="tweet-content">${this.escapeHtml(post.content)}</div>
                ${canDelete ? `
                    <div class="tweet-actions">
                        <button class="tweet-action delete-btn" data-post-id="${post._id}">
                            Deletar
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // Lida com a exclusão de um post
    async handleDeletePost(e) {
        const postId = e.target.dataset.postId; // ID do post
        
        // Confirmação antes de deletar
        if (!confirm('Tem certeza que deseja deletar esta postagem?')) return;
        
        try {
            await postRepo.deletePost(postId); // Deleta na API
            this.loadFeed(); // Recarrega feed
            if (window.profileController) {
                window.profileController.loadMyPosts(); // Atualiza perfil se necessário
            }
            this.showSuccess('Postagem deletada com sucesso!');
        } catch (error) {
            this.showError(error.message);
        }
    }

    // Escapa caracteres especiais para evitar XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
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