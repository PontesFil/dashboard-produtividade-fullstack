# Dashboard de Produtividade (Fullstack)

Aplicacao web fullstack inspirada em um sistema Kanban, desenvolvida para gerenciamento de tarefas com persistencia em banco de dados, drag-and-drop e experiencia responsiva.

## Sobre o projeto

Este projeto evoluiu de uma aplicacao frontend simples para uma arquitetura completa com backend, API REST e banco de dados MongoDB.

O objetivo foi simular um sistema real de produtividade, aplicando boas praticas de desenvolvimento, organizacao de codigo e experiencia do usuario.

## Funcionalidades

- Criacao de tarefas
- Edicao de tarefas
- Remocao individual de tarefas
- Limpar todas as tarefas
- Drag and drop entre colunas
- Suporte a toque para mobile e tablet
- Persistencia em banco de dados com MongoDB
- API REST completa
- Tratamento de erros no frontend e backend
- Layout responsivo

## Estrutura

```text
dashboard-produtividade
|- backend/
|  |- server.js
|  |- package.json
|  `- package-lock.json
|- frontend/
|  |- index.html
|  |- style.css
|  `- script.js
`- docs/
   |- index.html
   |- style.css
   `- script.js
```

- `frontend/`: copia de trabalho do frontend para desenvolvimento local.
- `docs/`: frontend preparado para publicacao no GitHub Pages.
- `backend/`: API e persistencia com MongoDB.

## API REST

| Metodo | Rota | Descricao |
| ------ | ---- | --------- |
| GET | `/tasks` | Listar tarefas |
| POST | `/tasks` | Criar nova tarefa |
| PUT | `/tasks/:id` | Atualizar tarefa |
| DELETE | `/tasks/:id` | Remover tarefa |
| DELETE | `/tasks` | Remover todas as tarefas |

## Como rodar o projeto

### Backend

```powershell
cd "E:\Workspace VSCode\dashboard-produtividade\backend"
npm install
npm start
```

Servidor disponivel em `http://localhost:3000`.

### Frontend local

Abra `frontend/index.html` no navegador ou utilize uma extensao como Live Server.

## GitHub Pages com `docs/`

O frontend pode ser publicado no GitHub Pages usando a pasta `docs/` como origem. O arquivo principal publicado e `docs/index.html`.

Para habilitar o Pages:

1. Abra o repositorio no GitHub.
2. Acesse `Settings`.
3. Entre em `Pages`.
4. Em `Build and deployment`, escolha `Deploy from a branch`.
5. Selecione a branch `main`.
6. Selecione a pasta `/docs`.
7. Salve a configuracao.

## Backend separado

O backend continua separado na pasta `backend/` e nao faz parte da publicacao do GitHub Pages.

Localmente, a API segue em `http://localhost:3000/tasks`. Se no futuro o frontend publicado no GitHub Pages precisar conversar com um backend online, ajuste a URL da API em `frontend/script.js` e `docs/script.js`.

## Observacoes sobre a publicacao

- O frontend em `docs/` usa os mesmos arquivos do frontend local, copiados para a pasta publicada.
- Os caminhos de `style.css` e `script.js` em `docs/index.html` continuam relativos e funcionam corretamente dentro de `docs/`.
- Nao existem pastas extras de imagens, fontes ou assets no frontend atual para copiar.

## Proximos passos sugeridos

- Publicar um backend online para conectar ao GitHub Pages
- Transformar o frontend em PWA
- Integrar um banco em nuvem, como MongoDB Atlas
- Adicionar autenticacao de usuarios
