Conectár - Frontend (ReactJS)
Este é o frontend da aplicação de gerenciamento de usuários desenvolvida com ReactJS como parte do desafio técnico da Conectár.

Funcionalidades Implementadas
Autenticação: Telas de Login e Cadastro de usuários, integradas com o backend.

Rotas Protegidas: Gerenciamento de rotas com base no status de autenticação e papel (role) do usuário.

Painel de Administração: Listagem de usuários com opções de filtro (por nome, role) e ordenação (por ID, nome, e-mail, criação, último login). Permite alterar roles e excluir usuários. Exibe status de atividade (Ativo/Inativo).

Página de Perfil (Home): Exibe as informações do usuário logado e permite a atualização do nome.

Tecnologias Utilizadas
Framework: ReactJS

Linguagem: TypeScript

Roteamento: React Router DOM

Gerenciamento de Estado: React Context API

Estilização: CSS puro (com variáveis CSS para consistência)

Requisições HTTP: Axios

Ícones: Lucide React

Como Configurar e Executar
Pré-requisitos
Node.js (v18 ou superior recomendado)

npm ou Yarn

O backend da aplicação Conectár deve estar rodando (geralmente em http://localhost:3000).

Instalação e Execução
Clone este repositório:
git clone https://github.com/DevHerbertt/Conecta-Frontend.git

Navegue até a pasta do projeto:
cd Conecta-Frontend

Instale as dependências:
npm install (ou yarn)

Crie um arquivo .env na raiz do projeto (se houver variáveis de ambiente no frontend, embora o api.ts esteja fixo no momento).

Inicie o aplicativo em modo de desenvolvimento:
npm start (ou yarn start)

O frontend estará acessível em http://localhost:3001 (ou outra porta disponível).

Decisões de Design e Arquitetura
Componentização: A interface é dividida em componentes reutilizáveis para melhor organização e manutenibilidade.

Context API: Utilizada para gerenciamento global do estado de autenticação (usuário e token), evitando prop-drilling.

Rotas Protegidas: Implementação de um ProtectedRoute para controlar o acesso a páginas com base na autenticação e role do usuário.

Estilização: Uso de CSS puro com variáveis para manter a simplicidade, consistência visual e responsividade.

Requisições Assíncronas: Gerenciamento de estados de carregamento e erro para feedback ao usuário durante as operações de API.

Atualização de Perfil (Nome): Funcionalidade para usuários atualizarem seu nome diretamente na página de perfil.

Limitações Conhecidas: A troca de senha requer um endpoint dedicado no backend para ser implementada de forma segura (hash da senha), e o login social com Google/Microsoft não foi implementado neste escopo.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
