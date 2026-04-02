# 🚀 Dashboard de Produtividade (Fullstack)

Aplicação web fullstack inspirada em um sistema Kanban, desenvolvida para gerenciamento de tarefas com persistência em banco de dados, drag-and-drop e experiência responsiva.

---

## 📌 Sobre o projeto

Este projeto é a evolução de uma aplicação frontend simples para uma arquitetura completa com backend, API REST e banco de dados MongoDB.

O objetivo foi simular um sistema real de produtividade, aplicando boas práticas de desenvolvimento, organização de código e experiência do usuário.

---

## 🧠 Funcionalidades

* ✅ Criação de tarefas
* ✏️ Edição de tarefas
* 🗑 Remoção individual de tarefas
* 🧹 Limpar todas as tarefas
* 🔄 Drag and drop entre colunas (Todo, Doing, Done)
* 📱 Suporte a toque (mobile/tablet)
* 💾 Persistência em banco de dados (MongoDB)
* ⚙️ API REST completa (CRUD)
* 🚦 Tratamento de erros no frontend e backend
* 📊 Ordenação das tarefas
* 🎯 Feedback visual no arraste
* ♿ Estrutura semântica e acessibilidade

---

## 🏗️ Arquitetura

```bash
📦 dashboard-produtividade
 ┣ 📂 backend
 ┃ ┣ 📄 server.js
 ┃ ┣ 📄 package.json
 ┃ ┗ 📂 node_modules
 ┣ 📂 frontend
 ┃ ┣ 📄 index.html
 ┃ ┣ 📄 style.css
 ┃ ┗ 📄 script.js
```

---

## 🛠️ Tecnologias utilizadas

### Frontend

* HTML5 (semântico)
* CSS3 (responsivo)
* JavaScript (ES6+)

### Backend

* Node.js
* Express

### Banco de Dados

* MongoDB (local)

---

## 🔗 API REST

| Método | Rota       | Descrição             |
| ------ | ---------- | --------------------- |
| GET    | /tasks     | Listar tarefas        |
| POST   | /tasks     | Criar nova tarefa     |
| PUT    | /tasks/:id | Atualizar tarefa      |
| DELETE | /tasks/:id | Remover tarefa        |
| DELETE | /tasks     | Remover todas tarefas |

---

## ⚙️ Como rodar o projeto

### 🔹 Backend

```bash
cd backend
npm install
npm start
```

Servidor disponível em:

```bash
http://localhost:3000
```

---

### 🔹 Frontend

Abra o arquivo:

```bash
frontend/index.html
```

ou utilize uma extensão como Live Server.

---

## 💡 Diferenciais do projeto

* Evolução de frontend simples para fullstack real
* Integração completa com API
* Código organizado por responsabilidade
* Experiência semelhante a aplicações reais (drag, feedback, responsividade)
* Suporte mobile com interação por toque
* Estrutura pronta para escalabilidade

---

## 🚀 Possíveis melhorias futuras

* 🔐 Autenticação de usuários (login)
* 🌐 Deploy completo (frontend + backend)
* 🧠 Integração com banco em nuvem (MongoDB Atlas)
* 📌 Sistema de prioridades nas tarefas
* 📊 Dashboard com métricas de produtividade

---

## 👨‍💻 Autor

Desenvolvido por Felipe Pontes

---

## 📈 Status do projeto

✔ Funcional
✔ Estruturado
✔ Pronto para portfólio
✔ Em evolução
