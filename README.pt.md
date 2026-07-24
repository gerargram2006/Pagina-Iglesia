# Iglesia Asamblea de Deus - Site Web

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/License-Institucional-green?style=flat-square)

**Site web institucional da Iglesia Asamblea de Deus**

Uma plataforma completa com painel de administração, gestão de eventos,
equipe pastoral e sistema de autenticação JWT.

</div>

---

[English](README.md) | [Español](README.es.md) | [Português](README.pt.md)

---

## Índice

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Início Rápido](#início-rápido)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Rotas](#rotas)
- [Autenticação](#autenticação)
- [Referência da API](#referência-da-api)
- [Banco de Dados](#banco-de-dados)
- [Animações de Scroll](#animações-de-scroll)
- [Configuração](#configuração)
- [Solução de Problemas](#solução-de-problemas)
- [Roadmap](#roadmap)
- [Contribuir](#contribuir)
- [Licença](#licença)

---

## Sobre

Este é o site oficial da **Iglesia Asamblea de Deus**, projetado para compartilhar
informações sobre horários de culto, eventos, pastores, história da igreja e
dados de contato. Inclui um painel de administração completo com autenticação
segura JWT.

### Por que este projeto?

- **Frontend Moderno**: React 19 + Vite 8 com JSX e Fast Refresh
- **Backend Robusto**: Node.js + Express 5 com autenticação JWT
- **Banco de Dados**: MySQL 8.0 rodando em Docker
- **Design Premium**: Glassmorphism, animações de scroll e totalmente responsivo
- **CRUD Completo**: Gestão de eventos, pastores e mensagens pelo painel admin

---

## Funcionalidades

### Páginas Públicas

| Página | Rota | Descrição |
|--------|------|-----------|
| **Início** | `/` | Hero interativo com imagem de fundo (hero-inicio.webp), formas flutuantes, animações de scroll e layout de uma coluna |
| **Horários** | `/horarios` | Cards dinâmicos com ícones para domingos, quartas e sábados |
| **Quem Somos** | `/quienes-somos` | Layout de 2 colunas com imagem, história, valores e métricas |
| **Galeria** | `/quienes-somos` | Bento grid com 6 espaços para fotos da congregação |
| **Pastores** | `/pastores` | Perfis da equipe pastoral com fotos reais e anéis decorativos |
| **Eventos** | `/eventos` | Lista cronológica dos próximos eventos com thumbnails |
| **Anexos** | `/anexos` | Sedes da igreja com info do pastor, endereço, horário e contato |
| **CTA** | `/` (seção) | Banner motivacional em tela cheia com partículas decorativas |
| **Contato** | `/contacto` | Formulário de contato e dados da congregação |

### Painel de Administração

| Funcionalidade | Descrição |
|----------------|-----------|
| **Login Seguro** | Formulário com email/senha, toggle de visibilidade, "Lembrar email" e proteção JWT |
| **Dashboard Premium** | Banner interativo, saudação dinâmica, relógio em tempo real e cards glassmorphism |
| **Estatísticas** | Métricas dinâmicas conectadas ao BD: total de membros, eventos e mensagens |
| **Gerenciador de Eventos** | CRUD completo: listagem em tabela, modal de criação/edição e exclusão |
| **Equipe Pastoral** | CRUD completo: gestão de líderes (nomes, cargos, biografias e fotos) |
| **Caixa de Mensagens** | Leitura e exclusão de mensagens recebidas do formulário público |
| **Logout** | Encerramento de sessão com limpeza completa do token JWT |

### Gerais

- **Design Responsivo**: Compatível com celular, tablet e desktop (3 breakpoints: 991px, 767px, 575px)
- **SPA Fluida**: Navegação entre páginas sem recarregamento usando React Router
- **UI Premium**: Glassmorphism na NavBar, hamburger customizado e efeitos hover/shimmer
- **Animações de Scroll**: Elementos em cascata ao fazer scroll com IntersectionObserver
- **Footer Persistente**: Versículo destacado, redes sociais e horários nas rotas públicas
- **Paleta de Cores**: Verde floresta + dourado eclesiástico com CSS custom properties
- **Acessibilidade**: aria-labels, focus-visible, HTML semântico, contraste WCAG

---

## Tecnologias

### Frontend

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| [React](https://react.dev/) | ^19.2.7 | Biblioteca para interfaces de usuário |
| [Vite](https://vite.dev/) | ^8.1.1 | Servidor de desenvolvimento e bundler |
| [React Router](https://reactrouter.com/) | ^7.18.1 | Roteamento SPA |
| [Bootstrap](https://getbootstrap.com/) | ^5.3.8 | Framework CSS (grid, utilidades) |
| [React Bootstrap](https://react-bootstrap.github.io/) | ^2.10.10 | Componentes Bootstrap para React |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | ^1.13.1 | Biblioteca de ícones |
| [OxLint](https://oxc.rs/) | ^1.71.0 | Linter ultrarrápido |

### Backend

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| [Node.js](https://nodejs.org/) | >= 18 | Runtime de JavaScript |
| [Express](https://expressjs.com/) | ^5.2.1 | Framework web para Node.js |
| [MySQL2](https://github.com/sidorares/node-mysql2) | ^3.22.6 | Driver de MySQL |
| [bcrypt](https://www.npmjs.com/package/bcrypt) | ^6.0.0 | Hashing seguro de senhas |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | ^9.0.3 | Geração e verificação de JWT |
| [cors](https://www.npmjs.com/package/cors) | ^2.8.6 | Cross-Origin Resource Sharing |
| [dotenv](https://www.npmjs.com/package/dotenv) | ^17.4.2 | Variáveis de ambiente a partir do .env |

### Banco de Dados

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| [MySQL](https://www.mysql.com/) | 8.0 | Banco de dados relacional (via Docker) |
| [Docker Compose](https://docs.docker.com/compose/) | - | Orquestração de contêineres |

---

## Arquitetura

```
┌─────────────────────────────────────────────────┐
│                  FRONTEND (Vite)                │
│  React 19 + React Router 7 + Bootstrap 5       │
│  Porta: 5173                                   │
│                                                 │
│  ┌───────────┐  ┌───────────┐  ┌─────────────┐ │
│  │   Pages    │  │Components │  │   Context   │ │
│  │ Home       │  │ NavBar    │  │ AuthContext  │ │
│  │ Login      │  │ Footer    │  │  (user,     │ │
│  │ Admin      │  │ Layout    │  │   token,    │ │
│  │ Horários   │  │ PageHeader│  │   login,    │ │
│  │ Eventos... │  │ 11 total  │  │   logout)   │ │
│  └───────────┘  └───────────┘  └─────────────┘ │
│                      │                          │
│              Vite Proxy (/api)                  │
└──────────────────────┼──────────────────────────┘
                       │
┌──────────────────────┼──────────────────────────┐
│               BACKEND (Express)                 │
│  Node.js + Express 5                            │
│  Porta: 3000                                    │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │  POST /api/auth/login                    │   │
│  │  GET, POST, PUT, DELETE /api/eventos     │   │
│  │  GET, POST, PUT, DELETE /api/pastores    │   │
│  │  GET, DELETE /api/mensajes               │   │
│  └──────────────────────────────────────────┘   │
│                      │                          │
│              MySQL2 Driver                      │
└──────────────────────┼──────────────────────────┘
                       │
┌──────────────────────┼──────────────────────────┐
│               DATABASE (MySQL 8.0)              │
│  Contêiner Docker - Porta 3306                 │
│  Banco de dados: iglesia_db                    │
│                                                 │
│  ┌──────────┐ ┌────────┐ ┌──────────┐          │
│  │ usuarios │ │eventos │ │ pastores │          │
│  ├──────────┤ ├────────┤ ├──────────┤          │
│  │ eventos  │ │horarios│ │ mensajes │          │
│  └──────────┘ └────────┘ └──────────┘          │
└─────────────────────────────────────────────────┘
```

---

## Estrutura do Projeto

```
Pagina-Iglesia/
├── public/                    # Arquivos estáticos servidos pelo Vite
│   ├── img/                   # Imagens públicas (logo, etc.)
│   ├── js/                    # Scripts estáticos (legado)
│   └── icons.svg              # Ícones SVG
├── src/                       # Código-fonte do frontend React
│   ├── api/                   # Cliente HTTP centralizado
│   │   └── index.js           # Função fetchAPI com injeção automática de JWT
│   ├── assets/                # Recursos importados pelo bundler
│   │   └── hero.png
│   ├── components/            # 11 componentes reutilizáveis
│   │   ├── Layout.jsx         # Layout principal com Outlet e Footer
│   │   ├── NavBar.jsx         # Barra de navegação responsiva com Glassmorphism
│   │   ├── Footer.jsx         # Rodapé com links, versículo e redes sociais
│   │   ├── PageHeader.jsx     # Cabeçalho de páginas internas
│   │   ├── ScheduleSection.jsx# Cards de horários de culto com ícones
│   │   ├── AboutSection.jsx   # Seção "Quem Somos" (2 colunas + métricas)
│   │   ├── GallerySection.jsx # Galeria de fotos (Bento grid de 6 espaços)
│   │   ├── PastorsSection.jsx # Cards de pastores/líderes (foto real)
│   │   ├── EventsSection.jsx  # Lista de próximos eventos (com thumbnails)
│   │   ├── CTASection.jsx     # Seção "Chamada à ação" com partículas
│   │   └── ContactSection.jsx # Info de contato + formulário
│   ├── context/
│   │   └── AuthContext.jsx    # Provedor de autenticação (login/logout/JWT)
│   ├── hooks/
│   │   └── useScrollAnimations.js # Hook de animações scroll (IntersectionObserver)
│   ├── pages/                 # Páginas e rotas da aplicação
│   │   ├── admin/             # Componentes de gestão CRUD (Painel Admin)
│   │   │   ├── AdminEventos.jsx
│   │   │   ├── AdminPastores.jsx
│   │   │   └── AdminMensajes.jsx
│   │   ├── Home.jsx           # Página principal (hero + seções)
│   │   ├── Horarios.jsx       # Página de horários
│   │   ├── QuienesSomos.jsx   # Página "Quem Somos"
│   │   ├── Pastores.jsx       # Página de pastores
│   │   ├── Eventos.jsx        # Página de eventos
│   │   ├── Anexos.jsx         # Página de anexos/sedes com info de cada igreja
│   │   ├── Contacto.jsx       # Página de contato
│   │   ├── Login.jsx          # Formulário de login
│   │   └── Admin.jsx          # Painel de administração protegido
│   ├── styles/
│   │   └── styles.css         # Estilos globais (~2540 linhas)
│   ├── App.jsx                # Definição de rotas (Router + Auth)
│   └── main.jsx               # Ponto de entrada da app
├── backend/                   # Código-fonte do servidor Express
│   ├── server.js              # Servidor Express com endpoints API
│   ├── generarClave.js        # Utilidade para gerar hashes bcrypt
│   ├── reseteo.js             # Utilidade para redefinir senha do admin
│   ├── middleware/
│   │   └── auth.js            # Middleware de verificação JWT
│   └── package.json           # Dependências do backend
├── index.html                 # HTML de entrada para o Vite
├── vite.config.js             # Configuração do Vite (proxy API, plugin React)
├── docker-compose.yml         # Configuração do MySQL em Docker
├── init.sql                   # Schema do banco de dados + dados de exemplo
├── .env                       # Variáveis de ambiente (NÃO versionar)
├── .gitignore                 # Arquivos ignorados pelo Git
├── .oxlintrc.json             # Configuração do OxLint
├── .prettierrc                # Configuração do Prettier
├── .editorconfig              # Configuração do editor
└── README.md                  # Arquivo de documentação principal
```

---

## Início Rápido

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) >= 9
- [Docker](https://www.docker.com/) (para MySQL)

### Instalação

```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd Pagina-Iglesia

# 2. Instalar dependências do frontend
npm install

# 3. Instalar dependências do backend
cd backend && npm install && cd ..

# 4. Configurar variáveis de ambiente
# Edite .env com suas credenciais de MySQL e JWT_SECRET

# 5. Iniciar MySQL no Docker
docker-compose up -d

# 6. Inicializar o banco de dados
mysql -u root -p < init.sql

# 7. Iniciar o backend (Terminal 1)
cd backend && npm start

# 8. Iniciar o frontend (Terminal 2)
npm run dev
```

### Abrir no Navegador

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3000](http://localhost:3000)

### Credenciais de Teste

| Campo | Valor |
|-------|-------|
| Email | `admin@iglesia.com` |
| Senha | `123456` |
| Função | `admin` |

---

## Scripts Disponíveis

### Frontend (`package.json` raiz)

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento com HMR (porta 5173) |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run preview` | Pré-visualização do build de produção |
| `npm run lint` | Executa o linter (OxLint) |

### Backend (`backend/package.json`)

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o servidor Express na porta 3000 |
| `node generarClave.js` | Gera um hash bcrypt para uma senha |
| `node reseteo.js` | Redefine a senha do admin para '123456' |

---

## Rotas

### Rotas Públicas

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | Início | Página principal com hero e seções |
| `/horarios` | Horários | Horários de culto (domingo, quarta, sábado) |
| `/quienes-somos` | Quem Somos | História, missão e valores da igreja |
| `/pastores` | Pastores | Equipe pastoral com perfis |
| `/eventos` | Eventos | Próximos eventos e atividades |
| `/anexos` | Anexos | Sedes da igreja com informações e recursos |
| `/contacto` | Contato | Formulário de contato e dados |

### Rotas Protegidas

| Rota | Página | Requisito |
|------|--------|-----------|
| `/admin` | Painel Admin | Sessão ativa (JWT válido) |
| `/login` | Login | Sem sessão ativa |

### Comportamento das Rotas Protegidas

```
Usuário não autenticado → /admin  → Redireciona para /login
Usuário autenticado     → /login  → Redireciona para /admin
```

---

## Autenticação

### Fluxo

```
1. Usuário insere email + senha no /login
           ↓
2. Frontend envia POST /api/auth/login com credenciais
           ↓
3. Backend busca usuário por email no MySQL
           ↓
4. Backend compara senha com bcrypt.compare()
           ↓
5. Se válida: gera JWT (expira em 2 horas)
           ↓
6. Backend retorna { token, user: { id, name, email, rol } }
           ↓
7. Frontend armazena token + user no localStorage
           ↓
8. Frontend redireciona para /admin
           ↓
9. ProtectedRoute verifica user no AuthContext
           ↓
10. Admin.jsx renderiza o painel de controle
```

### Token JWT

| Propriedade | Valor |
|-------------|-------|
| Algoritmo | HMAC-SHA256 |
| Validade | 2 horas |
| Payload | `{ id, rol }` |
| Armazenamento | localStorage do navegador |

### Funcionalidades do Login

| Função | Descrição |
|--------|-----------|
| Mostrar/Ocultar senha | Botão de olho com ícone dinâmico e animação de escala |
| Lembrar email | Checkbox que salva o email no localStorage |
| Validação HTML5 | Campos obrigatórios, email válido, mínimo 6 caracteres |
| Error shake | Animação de tremida ao falhar o login |
| Spinner | Indicador de carregamento circular durante o envío |
| Redirecionamento automático | Se já houver sessão ativa, redireciona para /admin |

### Segurança

| Medida | Implementação |
|--------|---------------|
| Hash de senhas | bcrypt com salt rounds |
| Tokens JWT | Validade de 2 horas, payload mínimo |
| SQL Injection | Consultas parametrizadas (`?`) em todas as consultas |
| Frontend | Senha nunca é armazenada em texto plano |
| Persistência | localStorage (aceitável para apps internas) |

---

## Referência da API

### URL Base

```
http://localhost:3000
```

### Endpoints

#### `GET /api/eventos`

Retorna todos os eventos da igreja.

**Resposta bem-sucedida (200):**

```json
[
  {
    "id": 1,
    "titulo": "Conferência de Jovens",
    "descripcion": "Evento especial para jovens da igreja",
    "fecha": "2026-07-20T10:00:00.000Z",
    "lugar": "Auditório Principal",
    "imagen_url": "https://..."
  }
]
```

---

#### `POST /api/auth/login`

Autentica um usuário com email e senha.

**Corpo da requisição:**

```json
{
  "email": "admin@iglesia.com",
  "password": "123456"
}
```

**Resposta bem-sucedida (200):**

```json
{
  "message": "Bem-vindo",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Gerar Admin",
    "email": "admin@iglesia.com",
    "rol": "admin"
  }
}
```

**Respostas de erro:**

| Código | Causa |
|--------|-------|
| `400` | Campos email ou password ausentes |
| `401` | Usuário não encontrado ou senha incorreta |
| `500` | Erro interno do servidor |

---

#### `POST /api/eventos` (Protegido)

Cria um novo evento. Requer token JWT válido.

**Corpo da requisição:**

```json
{
  "titulo": "Retiro de Jovens",
  "descripcion": "Um fim de semana de comunhão e crescimento espiritual",
  "fecha": "2026-08-15 09:00:00",
  "lugar": "Centro de Retiros",
  "imagen_url": "https://..."
}
```

---

#### `PUT /api/eventos/:id` (Protegido)

Atualiza um evento existente. Requer token JWT válido.

---

#### `DELETE /api/eventos/:id` (Protegido)

Exclui um evento. Requer token JWT válido.

---

#### `GET /api/pastores`

Retorna todos os pastores e líderes da igreja.

---

#### `POST /api/pastores` (Protegido)

Cria um novo registro de pastor/líder. Requer token JWT válido.

---

#### `PUT /api/pastores/:id` (Protegido)

Atualiza um registro de pastor existente. Requer token JWT válido.

---

#### `DELETE /api/pastores/:id` (Protegido)

Exclui um registro de pastor. Requer token JWT válido.

---

#### `GET /api/mensajes` (Protegido)

Retorna todas as mensagens do formulário de contato (ordenadas por data decrescente). Requer token JWT válido.

---

#### `DELETE /api/mensajes/:id` (Protegido)

Exclui uma mensagem. Requer token JWT válido.

---

## Banco de Dados

### Tabelas

| Tabela | Descrição | Colunas Principais |
|--------|-----------|---------------------|
| `usuarios` | Usuários administradores | id, email, password (hash bcrypt), nombre, rol |
| `eventos` | Eventos da igreja | id, titulo, descripcion, fecha, lugar, imagen_url |
| `pastores` | Pastores e líderes | id, nombre, cargo, biografia, foto_url |
| `horarios` | Horários de culto | id, dia, hora, actividad |
| `mensajes_contacto` | Mensagens do formulário | id, nombre, email, mensaje, fecha_envio |

### Usuário de Teste

| Campo | Valor |
|-------|-------|
| Email | `admin@iglesia.com` |
| Senha | `123456` |
| Função | `admin` |

---

## Animações de Scroll

O projeto usa um sistema de animações baseado em `IntersectionObserver`:

### Tipos de Animação Disponíveis

| Atributo `data-animate` | Efeito |
|--------------------------|--------|
| `fade-in-up` | Elemento aparece de baixo |
| `fade-in-down` | Elemento aparece de cima |
| `fade-in-left` | Elemento aparece da esquerda |
| `fade-in-right` | Elemento aparece da direita |
| `scale-in` | Elemento aparece com efeito de escala |

### Classes de Delay

Podem ser combinadas com classes `delay-1`, `delay-2`, `delay-3`, `delay-4` para criar efeitos escalonados:

```html
<div data-animate="fade-in-up" className="delay-1">...</div>
```

### Custom Hook: `useScrollAnimations`

Localizado em `src/hooks/useScrollAnimations.js`. Ele faz:

- Observar todos os elementos com `data-animate` no DOM
- Adicionar a classe `animated` quando entram no viewport
- Limpar o observer ao desmontar ou mudar de rota

---

## Configuração

### OxLint (`.oxlintrc.json`)

Linter configurado com plugins React e regras Oxc:

- `react/rules-of-hooks`: Erro — garante uso correto de hooks
- `react/only-export-components`: Warning — limita exports a componentes

### Prettier (`.prettierrc`)

| Opção | Valor |
|-------|-------|
| Aspas simples | Não |
| Indentação | 4 espaços |
| Vírgulas trailing | Estilo ES5 |
| Largura da linha | 120 caracteres |
| Quebra de linha | LF |

### EditorConfig (`.editorconfig`)

Configuração unificada para editores: indentação por espaços, charset UTF-8 e limpeza de espaços em branco.

### Vite (`vite.config.js`)

- **Plugin**: `@vitejs/plugin-react` para JSX e Fast Refresh
- **Proxy**: `/api` → `http://localhost:3000` (redireciona requisições para o backend)

### Docker Compose (`docker-compose.yml`)

- **Serviço**: MySQL 8.0
- **Porta**: 3307 (mapeada para 3306 do contêiner)
- **Banco de dados**: `iglesia_db` (criado automaticamente com `init.sql`)
- **Volume persistente**: Os dados sobrevivem à reinicialização do contêiner

### Paleta de Cores

| Grupo | Cores | Uso |
|-------|-------|-----|
| Verde floresta | `#0a1f12` → `#52b788` | Fundo do hero, navbar, footer, seções principais |
| Dourado | `#b8942e` → `#e8cf7a` | Botões primários, acentos, bordas decorativas |
| Neutros | `#f8faf7` → `#2d2d2d` | Texto, fundos, bordas, sombras |

### Tipografia

| Fonte | Uso |
|-------|-----|
| [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) | Títulos e cabeçalhos (serif elegante) |
| [Inter](https://fonts.google.com/specimen/Inter) | Texto do corpo (sans-serif legível) |

---

## Solução de Problemas

### O backend não conecta ao MySQL

- Verifique se o Docker está rodando: `docker ps`
- Certifique-se de que as variáveis de ambiente em `.env` estão corretas
- Verifique se o contêiner MySQL está na porta 3307: `docker logs mysql-proyecto-iglesia`
- Se o contêiner não iniciou, confira os logs: `docker-compose logs db`

### O frontend mostra erros de CORS

- Verifique se o proxy do Vite está configurado em `vite.config.js`
- Certifique-se de que o backend está rodando na porta 3000

### Os estilos não são aplicados corretamente

- Execute `npm run lint` para verificar erros de sintaxe
- Verifique se `styles.css` está importado em `main.jsx`

### A autenticação falha

- Verifique se `JWT_SECRET` está definido em `.env`
- Certifique-se de que o hash da senha foi gerado corretamente com `node generarClave.js`
- Se esqueceu a senha, execute `node reseteo.js` para redefini-la para '123456'
- Confira os logs do backend para erros detalhados

### O Docker não inicia o MySQL

- Verifique se o Docker Desktop está rodando
- Se a porta 3307 está ocupada, altere o mapeamento em `docker-compose.yml`
- Para uma reinicialização limpa: `docker-compose down -v && docker-compose up -d`

---

## Roadmap

### Implementado

- [x] Páginas públicas (Início, Horários, Quem Somos, Pastores, Eventos, Anexos, Contato)
- [x] Painel de administração com autenticação JWT e proteção de rotas
- [x] Dashboard dinâmico com estatísticas reais e design premium (Glassmorphism)
- [x] CRUD completo para eventos pelo painel admin
- [x] CRUD de pastores e líderes pelo painel admin
- [x] Gerenciador de caixa de entrada de mensagens
- [x] Login com toggle de senha, lembrar email e validação
- [x] Animações de scroll com IntersectionObserver
- [x] Design responsivo com 3 breakpoints
- [x] Navbar inteligente e Footer dinâmico
- [x] Docker Compose para deploy rápido do MySQL
- [x] Comentários detalhados em todos os arquivos do projeto

### Próximo

- [ ] Gestão de horários pelo painel admin
- [ ] Upload de imagens para CDN ou armazenamento local para eventos/pastores
- [ ] Paginação e busca dinâmica nas listas de eventos do painel
- [ ] Seção de galeria com lightbox público
- [ ] Otimização de imagens, formatos WebP e lazy loading
- [ ] PWA (Progressive Web App) para instalação em celulares
- [ ] Testes unitários e de integração (Jest + Testing Library)

---

## Contribuir

1. Crie um branch para sua feature: `git checkout -b feature/nova-funcionalidade`
2. Faça commit das suas alterações: `git commit -m "Adicionar nova funcionalidade"`
3. Push para o branch: `git push origin feature/nova-funcionalidade`
4. Abra um Pull Request

### Convenções de Código

- Usar **OxLint** para linting: `npm run lint`
- Formatar com **Prettier** antes de commitar
- Seguir a estrutura de pastas existente: `components/`, `pages/`, `hooks/`, `context/`
- Usar CSS custom properties (variáveis) em vez de valores hardcoded
- Comentar apenas o necessário — preferir código autoexplicativo

---

## Licença

Este projeto é para uso institucional da Iglesia Asamblea de Deus.

---

<div align="center">

**Desconectado com amor** — Iglesia Asamblea de Deus

</div>
