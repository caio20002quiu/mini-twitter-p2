// Classe responsável por lidar com as operações de postagens (tweets)
class PostRepository {
    // Cria uma nova postagem na API
    async createPost(content) {
        // Faz uma requisição POST para criar o post
        const response = await fetch(`${API_BASE_URL}/api/posts`, {
            method: 'POST', // Método HTTP POST
            headers: {
                'Content-Type': 'application/json', // Envia os dados como JSON
                'Authorization': `Bearer ${authToken}` // Envia o token de autenticação
            },
            body: JSON.stringify({ content }) // Corpo da requisição com o conteúdo do post
        });
        
        // Se a resposta não for OK, lança um erro com a mensagem da API
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao criar postagem');
        }
        
        // Retorna o JSON da resposta (post criado)
        return await response.json();
    }

    // Busca todas as postagens da API
    async getAllPosts() {
        // Faz uma requisição GET para buscar todos os posts
        const response = await fetch(`${API_BASE_URL}/api/posts`, {
            headers: {
                'Authorization': `Bearer ${authToken}` // Envia o token de autenticação
            }
        });
        
        // Se a resposta não for OK, lança um erro
        if (!response.ok) {
            throw new Error('Erro ao carregar postagens');
        }
        
        // Retorna o JSON da resposta (lista de posts)
        return await response.json();
    }

    // Busca apenas as postagens do usuário logado
    async getMyPosts() {
        // Faz uma requisição GET para buscar os posts do usuário
        const response = await fetch(`${API_BASE_URL}/api/posts/my-posts`, {
            headers: {
                'Authorization': `Bearer ${authToken}` // Envia o token de autenticação
            }
        });
        
        // Se a resposta não for OK, lança um erro
        if (!response.ok) {
            throw new Error('Erro ao carregar suas postagens');
        }
        
        // Retorna o JSON da resposta (lista de posts do usuário)
        return await response.json();
    }

    // Deleta uma postagem pelo ID
    async deletePost(postId) {
        // Faz uma requisição DELETE para deletar o post
        const response = await fetch(`${API_BASE_URL}/api/posts/${postId}`, {
            method: 'DELETE', // Método HTTP DELETE
            headers: {
                'Authorization': `Bearer ${authToken}` // Envia o token de autenticação
            }
        });
        
        // Se a resposta não for OK, lança um erro
        if (!response.ok) {
            throw new Error('Erro ao deletar postagem');
        }
        
        // Retorna o JSON da resposta (confirmação de deleção)
        return await response.json();
    }
}