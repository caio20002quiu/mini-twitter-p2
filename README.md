# 🐦 Mini Twitter

Um clone minimalista e moderno do Twitter, desenvolvido com HTML, CSS e JavaScript puro.

## ✨ Recursos

- 🔐 Sistema de autenticação completo
- 📝 Criação e gerenciamento de tweets
- 👤 Perfil de usuário personalizável
- 📱 Design responsivo e mobile-first
- 🎨 Interface moderna e intuitiva

## 🚀 Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis e design moderno)
- JavaScript Vanilla
- Font Awesome (ícones)
- Google Fonts (Inter)

## 🔧 Instalação

### Pré-requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexão com a internet (para fontes e ícones)

### Passos

1. Clone o repositório
```bash
git clone https://github.seu-usuario/mini-twitter-p2.git 
```

2. Navegue até o diretório do projeto
```bash
cd mini-twitter
```
a
3. Abra o arquivo `index.html` no seu navegador

## 📂 Estrutura do Projeto

```
mini-twitter/
│
├── index.html         # Página principal
│
├── css/
│   ├── reset.css      # Reset de estilos padrão
│   └── style.css      # Estilos personalizados
│
├── js/
│   ├── config.js      # Configurações globais
│   │
│   ├── repositories/
│   │   ├── AuthRepository.js
│   │   ├── PostRepository.js
│   │   └── UserRepository.js
│   │
│   ├── controllers/
│   │   ├── AuthController.js
│   │   ├── FeedController.js
│   │   ├── ProfileController.js
│   │   └── NavigationController.js
│   │
│   └── main.js        # Ponto de entrada da aplicação
│
└── README.md          # Documentação do projeto
```

## 🌟 Funcionalidades

- [x] Registro de usuário
- [x] Login e logout
- [x] Criar tweets
- [x] Visualizar feed de tweets
- [x] Editar perfil
- [ ] Curtir tweets (em desenvolvimento)
- [ ] Comentários (futuras melhorias)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 🎨 Personalização

Você pode personalizar facilmente o design modificando as variáveis CSS em `css/style.css`:

```css
:root {
    --primary-color: #1DA1F2;    /* Cor principal */
    --secondary-color: #14171A;  /* Cor secundária */
    --background-color: #F5F8FA; /* Cor de fundo */
}
```

Feito com pelos alunos Caio Vinicius e Pedro Martinez