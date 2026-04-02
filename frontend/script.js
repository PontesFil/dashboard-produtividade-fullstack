const STATUS = {
    TODO: "todo",
    DOING: "doing",
    DONE: "done"
};

const FILTROS = {
    TODAS: "todas",
    PENDENTES: "pendentes",
    CONCLUIDAS: "concluidas"
};

const API_URL = "http://localhost:3000/tasks";

const estado = {
    tarefas: [],
    filtroAtual: FILTROS.TODAS,
    touchDrag: {
        ativo: false,
        pendente: false,
        card: null,
        tarefaId: null,
        colunaDestino: null,
        inicioX: 0,
        inicioY: 0,
        deslocamentoX: 0,
        deslocamentoY: 0
    }
};

const elementos = {
    inputTarefa: document.getElementById("inputTarefa"),
    botaoAdicionar: document.getElementById("btnAdicionar"),
    botaoLimpar: document.getElementById("btnLimpar"),
    contador: document.getElementById("contador"),
    colunas: {
        [STATUS.TODO]: document.querySelector("#todo .lista"),
        [STATUS.DOING]: document.querySelector("#doing .lista"),
        [STATUS.DONE]: document.querySelector("#done .lista")
    },
    filtros: {
        [FILTROS.TODAS]: document.getElementById("filtroTodas"),
        [FILTROS.PENDENTES]: document.getElementById("filtroPendentes"),
        [FILTROS.CONCLUIDAS]: document.getElementById("filtroConcluidas")
    }
};

async function requisicao(url, options = {}) {
    const resposta = await fetch(url, options);

    if (!resposta.ok) {
        let mensagem = "Nao foi possivel concluir a operacao.";

        try {
            const erro = await resposta.json();
            if (erro?.erro) {
                mensagem = erro.erro;
            }
        } catch {
            mensagem = `${mensagem} Codigo ${resposta.status}.`;
        }

        throw new Error(mensagem);
    }

    if (resposta.status === 204) {
        return null;
    }

    return resposta.json();
}

function criarTarefa(texto) {
    return requisicao(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ texto })
    });
}

function listarTarefas() {
    return requisicao(API_URL);
}

function atualizarTarefa(id, dados) {
    return requisicao(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
}

function removerTarefaPorId(id) {
    return requisicao(`${API_URL}/${id}`, {
        method: "DELETE"
    });
}

function removerTodasAsTarefas() {
    return requisicao(API_URL, {
        method: "DELETE"
    });
}

function exibirErro(err) {
    alert(err.message);
}

function limparColunas() {
    Object.values(elementos.colunas).forEach((coluna) => {
        coluna.innerHTML = "";
        coluna.parentElement.classList.remove("coluna-destino");
    });
}

function obterTarefasFiltradas() {
    if (estado.filtroAtual === FILTROS.PENDENTES) {
        return estado.tarefas.filter((tarefa) => tarefa.status !== STATUS.DONE);
    }

    if (estado.filtroAtual === FILTROS.CONCLUIDAS) {
        return estado.tarefas.filter((tarefa) => tarefa.status === STATUS.DONE);
    }

    return estado.tarefas;
}

function atualizarFiltroVisual() {
    Object.entries(elementos.filtros).forEach(([filtro, botao]) => {
        botao.classList.toggle("filtro-ativo", estado.filtroAtual === filtro);
    });
}

function criarBotaoAcao(texto, onClick) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = texto;
    botao.onclick = onClick;
    return botao;
}

function obterTarefaPorId(id) {
    return estado.tarefas.find((tarefa) => tarefa._id === id);
}

function atualizarPosicaoTouch(card, touch) {
    card.style.left = `${touch.clientX - estado.touchDrag.deslocamentoX}px`;
    card.style.top = `${touch.clientY - estado.touchDrag.deslocamentoY}px`;
}

function limparDestaqueColunas() {
    Object.values(elementos.colunas).forEach((coluna) => {
        coluna.parentElement.classList.remove("coluna-destino");
    });
}

function definirColunaDestino(coluna) {
    limparDestaqueColunas();
    estado.touchDrag.colunaDestino = coluna;

    if (coluna) {
        coluna.parentElement.classList.add("coluna-destino");
    }
}

function obterColunaPorPonto(x, y) {
    const elemento = document.elementFromPoint(x, y);
    if (!elemento) return null;
    return elemento.closest(".lista");
}

async function moverTarefaParaColuna(tarefaId, coluna) {
    const tarefa = obterTarefaPorId(tarefaId);
    if (!tarefa || !coluna) return;

    const novoStatus = coluna.dataset.status || STATUS.TODO;
    if (tarefa.status === novoStatus) return;

    try {
        await atualizarTarefa(tarefa._id, { status: novoStatus });
        await carregarTarefas();
    } catch (err) {
        exibirErro(err);
        renderizarTarefas();
    }
}

function encerrarTouchDrag() {
    const { card } = estado.touchDrag;

    limparDestaqueColunas();

    if (card) {
        card.classList.remove("arrastando-touch");
        card.style.left = "";
        card.style.top = "";
    }

    estado.touchDrag.ativo = false;
    estado.touchDrag.pendente = false;
    estado.touchDrag.card = null;
    estado.touchDrag.tarefaId = null;
    estado.touchDrag.colunaDestino = null;
    estado.touchDrag.inicioX = 0;
    estado.touchDrag.inicioY = 0;
    estado.touchDrag.deslocamentoX = 0;
    estado.touchDrag.deslocamentoY = 0;
}

function ativarTouchDrag(card, toque) {
    const rect = card.getBoundingClientRect();

    estado.touchDrag.ativo = true;
    estado.touchDrag.deslocamentoX = toque.clientX - rect.left;
    estado.touchDrag.deslocamentoY = toque.clientY - rect.top;

    card.classList.add("arrastando-touch");
    atualizarPosicaoTouch(card, toque);
    definirColunaDestino(obterColunaPorPonto(toque.clientX, toque.clientY));
}

function configurarTouchDrag(card) {
    card.addEventListener("touchstart", (evento) => {
        if (evento.target.closest("button")) return;
        const toque = evento.touches[0];

        estado.touchDrag.pendente = true;
        estado.touchDrag.card = card;
        estado.touchDrag.tarefaId = card.dataset.id;
        estado.touchDrag.inicioX = toque.clientX;
        estado.touchDrag.inicioY = toque.clientY;
    }, { passive: true });
}

function criarCardTarefa(tarefa) {
    const card = document.createElement("article");
    card.className = "card";
    card.draggable = true;
    card.dataset.id = tarefa._id;

    card.addEventListener("dragstart", () => {
        card.classList.add("arrastando");
    });

    card.addEventListener("dragend", () => {
        card.classList.remove("arrastando");
    });

    configurarTouchDrag(card);

    const titulo = document.createElement("p");
    titulo.className = "card-texto";
    titulo.textContent = tarefa.texto;

    const data = document.createElement("small");
    data.className = "card-data";
    data.textContent = tarefa.data || "";

    const acoes = document.createElement("div");
    acoes.className = "card-acoes";

    const textoBotaoStatus = tarefa.status === STATUS.DONE ? "Reabrir" : "Concluir";
    const proximoStatus = tarefa.status === STATUS.DONE ? STATUS.TODO : STATUS.DONE;

    acoes.appendChild(criarBotaoAcao("Editar", () => editarTarefa(tarefa)));
    acoes.appendChild(criarBotaoAcao(textoBotaoStatus, () => alterarStatusTarefa(tarefa, proximoStatus)));
    acoes.appendChild(criarBotaoAcao("Remover", () => confirmarRemocaoTarefa(tarefa._id)));

    card.appendChild(titulo);
    card.appendChild(data);
    card.appendChild(acoes);

    return card;
}

function renderizarEstadoVazio() {
    const mensagem = document.createElement("p");
    mensagem.className = "estado-vazio";
    mensagem.textContent = "Nenhuma tarefa encontrada.";
    elementos.colunas[STATUS.TODO].appendChild(mensagem);
}

function renderizarTarefas() {
    limparColunas();
    atualizarFiltroVisual();

    const tarefasFiltradas = obterTarefasFiltradas();
    elementos.contador.textContent = `Total: ${tarefasFiltradas.length}`;

    if (tarefasFiltradas.length === 0) {
        renderizarEstadoVazio();
        return;
    }

    tarefasFiltradas.forEach((tarefa) => {
        const coluna = elementos.colunas[tarefa.status] || elementos.colunas[STATUS.TODO];
        coluna.appendChild(criarCardTarefa(tarefa));
    });
}

async function carregarTarefas() {
    estado.tarefas = await listarTarefas();
    renderizarTarefas();
}

async function confirmarRemocaoTarefa(id) {
    if (!confirm("Deseja remover esta tarefa?")) return;

    try {
        await removerTarefaPorId(id);
        await carregarTarefas();
    } catch (err) {
        exibirErro(err);
    }
}

async function limparTarefas() {
    if (!confirm("Tem certeza que deseja apagar todas as tarefas?")) return;

    try {
        await removerTodasAsTarefas();
        await carregarTarefas();
    } catch (err) {
        exibirErro(err);
    }
}

async function editarTarefa(tarefa) {
    const novoTexto = prompt("Editar tarefa:", tarefa.texto);
    if (novoTexto === null) return;

    const textoTratado = novoTexto.trim();
    if (!textoTratado || textoTratado === tarefa.texto) return;

    try {
        await atualizarTarefa(tarefa._id, { texto: textoTratado });
        await carregarTarefas();
    } catch (err) {
        exibirErro(err);
    }
}

async function alterarStatusTarefa(tarefa, novoStatus) {
    try {
        await atualizarTarefa(tarefa._id, { status: novoStatus });
        await carregarTarefas();
    } catch (err) {
        exibirErro(err);
    }
}

function obterStatusDaColuna(coluna) {
    return coluna.dataset.status || STATUS.TODO;
}

function configurarDragAndDropDesktop() {
    Object.values(elementos.colunas).forEach((coluna) => {
        coluna.addEventListener("dragover", (evento) => {
            evento.preventDefault();

            const cardArrastando = document.querySelector(".arrastando");
            if (cardArrastando) {
                coluna.appendChild(cardArrastando);
            }
        });

        coluna.addEventListener("dragenter", () => {
            coluna.parentElement.classList.add("coluna-destino");
        });

        coluna.addEventListener("dragleave", () => {
            coluna.parentElement.classList.remove("coluna-destino");
        });

        coluna.addEventListener("drop", async () => {
            const cardArrastando = document.querySelector(".arrastando");
            if (!cardArrastando) return;

            coluna.parentElement.classList.remove("coluna-destino");
            await moverTarefaParaColuna(cardArrastando.dataset.id, coluna);
        });
    });
}

function configurarTouchGlobal() {
    document.addEventListener("touchmove", (evento) => {
        const toque = evento.touches[0];

        if (estado.touchDrag.pendente && !estado.touchDrag.ativo) {
            const deltaX = Math.abs(toque.clientX - estado.touchDrag.inicioX);
            const deltaY = Math.abs(toque.clientY - estado.touchDrag.inicioY);

            if (deltaX > 8 || deltaY > 8) {
                ativarTouchDrag(estado.touchDrag.card, toque);
            }
        }

        if (!estado.touchDrag.ativo) return;

        atualizarPosicaoTouch(estado.touchDrag.card, toque);
        definirColunaDestino(obterColunaPorPonto(toque.clientX, toque.clientY));
        evento.preventDefault();
    }, { passive: false });

    document.addEventListener("touchend", async () => {
        if (!estado.touchDrag.ativo && !estado.touchDrag.pendente) return;

        const tarefaId = estado.touchDrag.tarefaId;
        const colunaDestino = estado.touchDrag.colunaDestino;
        encerrarTouchDrag();

        if (colunaDestino) {
            await moverTarefaParaColuna(tarefaId, colunaDestino);
        }
    });

    document.addEventListener("touchcancel", () => {
        if (!estado.touchDrag.ativo) return;
        encerrarTouchDrag();
        renderizarTarefas();
    });
}

async function adicionarTarefa() {
    const texto = elementos.inputTarefa.value.trim();
    if (!texto) return;

    try {
        await criarTarefa(texto);
        elementos.inputTarefa.value = "";
        elementos.inputTarefa.focus();
        await carregarTarefas();
    } catch (err) {
        exibirErro(err);
    }
}

function definirFiltro(filtro) {
    estado.filtroAtual = filtro;
    renderizarTarefas();
}

function configurarEventos() {
    elementos.botaoAdicionar.onclick = adicionarTarefa;
    elementos.botaoLimpar.onclick = limparTarefas;

    elementos.filtros[FILTROS.TODAS].onclick = () => definirFiltro(FILTROS.TODAS);
    elementos.filtros[FILTROS.PENDENTES].onclick = () => definirFiltro(FILTROS.PENDENTES);
    elementos.filtros[FILTROS.CONCLUIDAS].onclick = () => definirFiltro(FILTROS.CONCLUIDAS);

    elementos.inputTarefa.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter") {
            adicionarTarefa();
        }
    });
}

async function iniciarAplicacao() {
    configurarEventos();
    configurarDragAndDropDesktop();
    configurarTouchGlobal();

    try {
        await carregarTarefas();
    } catch (err) {
        console.error(err);
        elementos.contador.textContent = "Erro ao carregar tarefas.";
    }
}

iniciarAplicacao();
