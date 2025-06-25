##Conectár - Frontend (ReactJS)
Este é o frontend da aplicação de gerenciamento de usuários, desenvolvida em ReactJS com TypeScript, como parte do desafio técnico da Conectár.

##✨ Funcionalidades Implementadas
Autenticação:
Telas de login e cadastro com integração ao backend.

##Rotas Protegidas:
Acesso condicionado ao status de autenticação e papel do usuário (admin, comum).

##Painel de Administração:
Listagem de usuários com filtros (nome, role).
Ordenação por: ID, nome, e-mail, criação e último login.
Permite alteração de roles, exclusão e exibição de status (Ativo/Inativo).

##Página de Perfil (Home):
Visualização e edição do nome do usuário logado.

##🧠 Tecnologias Utilizadas
Framework: ReactJS

Linguagem: TypeScript

Roteamento: React Router DOM

Gerenciamento de Estado: React Context API

Estilização: CSS puro (com variáveis CSS para consistência)

HTTP Client: Axios

Ícones: Lucide React

##⚙️ Como Configurar e Executar
✅ Pré-requisitos
Node.js (v18 ou superior recomendado)

npm ou Yarn

Backend da aplicação Conectár rodando (geralmente em: http://localhost:3000)

##📦 Instalação e Execução
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

# Inicie o app em modo de desenvolvimento
npm start
# ou
yarn start
O frontend será iniciado em http://localhost:3001 (ou outra porta disponível).

##📁 Estrutura e Decisões de Arquitetura
Componentização: Interface dividida em componentes reutilizáveis e modulares.

Context API: Controle centralizado do estado de autenticação (usuário + token).

Rotas Protegidas: Componente ProtectedRoute gerencia acesso por role/autenticação.

Estilização Simples: CSS puro com variáveis e responsividade.

Feedback ao Usuário: Carregamentos e erros são tratados nas operações assíncronas.

Atualização de Perfil: Usuários podem alterar seu nome na página de perfil.

##🔐 Variáveis de Ambiente
Um arquivo .env pode ser criado na raiz do projeto para futuras customizações.

Atualmente, a URL da API está fixa no arquivo services/api.ts.

##⚠️ Limitações Conhecidas
Troca de Senha:
Ainda não implementada. Requer um endpoint seguro no backend com hash de senha.

Login Social (Google/Microsoft):
Ainda fora do escopo atual.

