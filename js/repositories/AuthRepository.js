// Define a classe responsável por lidar com autenticação (login e cadastro)
class AuthRepository {
    // Método assíncrono para registrar um novo usuário na API
    async register(userData) {
        // Faz uma requisição POST para o endpoint de cadastro
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST', // Define o método HTTP como POST
            headers: {
                'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(userData) // Converte os dados do usuário para JSON
        });
        
        // Se a resposta não for OK, lança um erro com a mensagem da API
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao criar conta');
        }
        
        // Retorna o JSON da resposta (usuário criado)
        return await response.json();
    }

    // Método assíncrono para fazer login na API
    async login(credentials) {
        // Faz uma requisição POST para o endpoint de login
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST', // Define o método HTTP como POST
            headers: {
                'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(credentials) // Converte as credenciais para JSON
        });
        
        // Se a resposta não for OK, lança um erro com a mensagem da API
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao fazer login');
        }
        
        // Retorna o JSON da resposta (usuário e token)
        return await response.json();
    }
}