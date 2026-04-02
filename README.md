# 🚀 Dashboard de Produtividade (Fullstack)

Aplicação web fullstack inspirada em um sistema Kanban, desenvolvida para gerenciamento de tarefas com persistência em banco de dados, drag-and-drop e experiência responsiva.

---

## 🌐 Demo

🔗 Frontend publicado:
https://pontesfil.github.io/dashboard-produtividade-fullstack/

---

## 📌 Sobre o projeto

Este projeto começou como uma aplicação frontend simples e evoluiu para uma arquitetura completa com backend, API REST e banco de dados MongoDB.

O objetivo foi simular um sistema real de produtividade, aplicando boas práticas de desenvolvimento, organização de código e experiência do usuário.

---

## 🧠 Funcionalidades

* Criação de tarefas
* Edição de tarefas
* Remoção individual de tarefas
* Limpar todas as tarefas
* Drag and drop entre colunas (Todo, Doing, Done)
* Suporte a toque (mobile e tablet)
* Persistência em MongoDB
* API REST completa (CRUD)
* Tratamento de erros no frontend e backend
* Layout responsivo

---

## 🏗️ Estrutura do projeto

```text
dashboard-produtividade-fullstack/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── ...
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── docs/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
```

### 📂 Organização

* `frontend/`: ambiente de desenvolvimento local
* `docs/`: versão do frontend publicada no GitHub Pages
* `backend/`: API e persistência com MongoDB

---

## 🔗 API REST

| Método | Rota         | Descrição        |
| ------ | ------------ | ---------------- |
| GET    | `/tasks`     | Listar tarefas   |
| POST   | `/tasks`     | Criar tarefa     |
| PUT    | `/tasks/:id` | Atualizar tarefa |
| DELETE | `/tasks/:id` | Remover tarefa   |
| DELETE | `/tasks`     | Remover todas    |

---

## ⚙️ Como rodar o projeto

### 🔹 Backend

```bash
cd backend
npm install
npm start
```

Servidor:

```
http://localhost:3000
```

---

### 🔹 Frontend

Abra:

```
frontend/index.html
```

ou use Live Server.

---

## 📄 GitHub Pages (Frontend)

O frontend foi preparado para publicação usando a pasta `docs/`.

Para ativar:

1. Settings
2. Pages
3. Deploy from a branch
4. Branch: `main`
5. Folder: `/docs`

---

## ⚠️ Backend separado

O GitHub Pages publica apenas frontend (HTML, CSS e JS).

O backend continua separado em:

```
backend/
```

Localmente, a API roda em:

```
http://localhost:3000/tasks
```

---

## 💡 Diferenciais do projeto

* Evolução de frontend simples para fullstack real
* Integração completa com API
* Drag-and-drop com suporte a toque
* Código organizado por responsabilidade
* Estrutura pronta para portfólio

---

## 🚀 Melhorias futuras

* Deploy do backend (Render / Vercel / Railway)
* Integração com MongoDB Atlas
* Autenticação de usuários
* Sistema de prioridades
* Dashboard com métricas

---

## 👨‍💻 Autor

Felipe Pontes

---

## 📈 Status

✔ Funcional
✔ Publicado
✔ Pronto para portfólio
✔ Em evolução
