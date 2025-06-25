#Conectár - Frontend (ReactJS)#
Frontend da aplicação de gerenciamento de usuários, desenvolvida em ReactJS com TypeScript, como parte do desafio técnico da Conectár.

✨ Funcionalidades
Autenticação:

Telas de login e cadastro com integração ao backend.

Rotas Protegidas:

Acesso condicionado ao status de autenticação e papel do usuário (admin, comum).

Painel de Administração:

Listagem de usuários com filtros (nome, role).

Ordenação por: ID, nome, e-mail, criação e último login.

Permite alteração de roles, exclusão e exibição de status (Ativo/Inativo).

Página de Perfil:

Visualização e edição do nome do usuário logado.

🧠 Tecnologias Utilizadas
Framework: ReactJS

Linguagem: TypeScript

Roteamento: React Router DOM

Estado Global: React Context API

Estilização: CSS puro (com variáveis CSS)

HTTP Client: Axios

Ícones: Lucide React

⚙️ Como Rodar o Projeto
✅ Pré-requisitos
Node.js v18 ou superior

npm ou Yarn

Backend rodando (geralmente em: http://localhost:3000)

📦 Instalação
bash
Copiar
Editar
# Clone o repositório
git clone https://github.com/DevHerbertt/Conecta-Frontend.git

# Acesse a pasta do projeto
cd Conecta-Frontend

# Instale as dependências
npm install
# ou
yarn
🚀 Execução
bash
Copiar
Editar
# Inicie o app em modo de desenvolvimento
npm start
# ou
yarn start
O frontend será iniciado em http://localhost:3001 (ou outra porta disponível).

🧱 Estrutura e Decisões de Arquitetura
Componentização: Interface dividida em componentes reutilizáveis e modulares.

Context API: Controle centralizado do estado de autenticação (usuário + token).

Rotas Protegidas: Componente ProtectedRoute gerencia acesso por role/autenticação.

Estilização Simples: CSS puro com variáveis e responsividade.

Feedback ao Usuário: Carregamentos e erros são tratados nas operações assíncronas.

Atualização de Perfil: Usuários podem alterar seu nome na página de perfil.

⚠️ Limitações Conhecidas
Troca de Senha: Ainda não implementada. Exige endpoint seguro no backend com hash.

Login Social: Integração com Google/Microsoft ainda fora do escopo atual.

📁 Variáveis de Ambiente
O arquivo .env pode ser criado na raiz para customização futura. No momento, a URL da API está fixa no arquivo services/api.ts.
