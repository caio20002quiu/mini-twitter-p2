// Classe responsável por lidar com operações relacionadas ao usuário (perfil)
class UserRepository {
    // Busca o perfil do usuário logado na API
    async getProfile() {
        // Faz uma requisição GET para buscar o perfil
        const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                'Authorization': `Bearer ${authToken}` // Envia o token de autenticação
            }
        });
        
        // Se a resposta não for OK, lança um erro
        if (!response.ok) {
            throw new Error('Erro ao carregar perfil');
        }
        
        // Retorna o JSON da resposta (dados do perfil)
        return await response.json();
    }

    // Atualiza o perfil do usuário logado na API
    async updateProfile(userData) {
        // Faz uma requisição PUT para atualizar o perfil
        const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
            method: 'PUT', // Método HTTP PUT
            headers: {
                'Content-Type': 'application/json', // Envia os dados como JSON
                'Authorization': `Bearer ${authToken}` // Envia o token de autenticação
            },
            body: JSON.stringify(userData) // Corpo da requisição com os dados atualizados
        });
        
        // Se a resposta não for OK, lança um erro com a mensagem da API
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao atualizar perfil');
        }
        
        // Retorna o JSON da resposta (perfil atualizado)
        return await response.json();
    }
}