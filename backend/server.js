const dns = require("dns");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

dns.setDefaultResultOrder("ipv4first");

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/tarefas";
const STATUS_TAREFA = {
    TODO: "todo",
    DOING: "doing",
    DONE: "done"
};
const STATUS_VALIDOS = Object.values(STATUS_TAREFA);

const app = express();

app.use(cors());
app.use(express.json());

const tarefaSchema = new mongoose.Schema(
    {
        texto: {
            type: String,
            required: true,
            trim: true
        },
        data: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: STATUS_VALIDOS,
            default: STATUS_TAREFA.TODO
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const Tarefa = mongoose.model("Tarefa", tarefaSchema);

function idValido(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

function responderErro(res, status, mensagem) {
    return res.status(status).json({ erro: mensagem });
}

function tratarErro(res, err) {
    console.error(err);

    if (err instanceof mongoose.Error.ValidationError) {
        return responderErro(res, 400, "Dados invalidos para a tarefa.");
    }

    return responderErro(res, 500, "Erro interno do servidor.");
}

function obterTextoValido(texto) {
    if (typeof texto !== "string") {
        return null;
    }

    const textoTratado = texto.trim();
    return textoTratado || null;
}

function montarAtualizacoes(body) {
    const atualizacoes = {};

    if (Object.prototype.hasOwnProperty.call(body, "texto")) {
        const texto = obterTextoValido(body.texto);

        if (!texto) {
            return { erro: "O texto da tarefa nao pode ficar vazio." };
        }

        atualizacoes.texto = texto;
    }

    if (Object.prototype.hasOwnProperty.call(body, "status")) {
        if (!STATUS_VALIDOS.includes(body.status)) {
            return { erro: "Status de tarefa invalido." };
        }

        atualizacoes.status = body.status;
    }

    return { atualizacoes };
}

app.get("/tasks", async (req, res) => {
    try {
        const tarefas = await Tarefa.find().sort({ createdAt: -1 });
        res.json(tarefas);
    } catch (err) {
        tratarErro(res, err);
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const texto = obterTextoValido(req.body.texto);

        if (!texto) {
            return responderErro(res, 400, "O texto da tarefa e obrigatorio.");
        }

        const novaTarefa = new Tarefa({
            texto,
            data: new Date().toLocaleDateString("pt-BR"),
            status: STATUS_TAREFA.TODO
        });

        await novaTarefa.save();
        res.status(201).json(novaTarefa);
    } catch (err) {
        tratarErro(res, err);
    }
});

app.delete("/tasks", async (req, res) => {
    try {
        await Tarefa.deleteMany({});
        res.json({ ok: true });
    } catch (err) {
        tratarErro(res, err);
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        if (!idValido(req.params.id)) {
            return responderErro(res, 400, "ID de tarefa invalido.");
        }

        const tarefaRemovida = await Tarefa.findByIdAndDelete(req.params.id);

        if (!tarefaRemovida) {
            return responderErro(res, 404, "Tarefa nao encontrada.");
        }

        res.json({ ok: true });
    } catch (err) {
        tratarErro(res, err);
    }
});

app.put("/tasks/:id", async (req, res) => {
    try {
        if (!idValido(req.params.id)) {
            return responderErro(res, 400, "ID de tarefa invalido.");
        }

        const { atualizacoes, erro } = montarAtualizacoes(req.body);

        if (erro) {
            return responderErro(res, 400, erro);
        }

        if (Object.keys(atualizacoes).length === 0) {
            return responderErro(res, 400, "Nenhum campo valido foi enviado para atualizacao.");
        }

        const tarefaAtualizada = await Tarefa.findByIdAndUpdate(
            req.params.id,
            atualizacoes,
            { new: true, runValidators: true }
        );

        if (!tarefaAtualizada) {
            return responderErro(res, 404, "Tarefa nao encontrada.");
        }

        res.json(tarefaAtualizada);
    } catch (err) {
        tratarErro(res, err);
    }
});

async function iniciarServidor() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Mongo local conectado.");

        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Falha ao conectar no MongoDB.", err);
        process.exit(1);
    }
}

iniciarServidor();
