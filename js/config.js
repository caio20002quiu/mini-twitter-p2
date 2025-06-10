// Define a URL base da API utilizada pelo projeto
const API_BASE_URL = 'https://mini-twitter-api-vy9q.onrender.com';

// Variável global que armazena o usuário atualmente logado (null se não houver login)
let currentUser = null;
// Variável global que armazena o token de autenticação do usuário (null se não houver login)
let authToken = null;
// Variável global que indica qual aba está ativa no momento (por padrão, 'feed')
let currentTab = 'feed';