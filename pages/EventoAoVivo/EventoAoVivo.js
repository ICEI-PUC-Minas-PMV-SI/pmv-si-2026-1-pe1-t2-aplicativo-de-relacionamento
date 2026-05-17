MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const eventoPadrao = {
    titulo: "Clube do Livro",
    icone: "bi-book",
    horario: "Hoje, 19h30",
    local: "Sala online MatchConnect",
    aoVivo: true,
    interesses: ["Livros", "Cinema"],
    descricao: "Um encontro leve para conversar sobre histórias, personagens favoritos e recomendações.",
    perguntas: [
        "Qual livro ou história mudou seu jeito de ver alguma coisa?",
        "Você prefere personagens intensos, engraçados ou misteriosos?",
        "Que livro você indicaria para alguém conhecer melhor seu gosto?"
    ]
};

const respostasSimuladas = [
    "Eu gosto quando a história parece simples, mas fica na cabeça depois.",
    "Personagem misterioso sempre me prende mais.",
    "Eu indicaria algo curto primeiro, só para a conversa fluir.",
    "Acho legal quando cada pessoa traz uma leitura bem diferente.",
    "Esse tipo de pergunta entrega muito do jeito da pessoa pensar."
];

let eventoAtual = eventoPadrao;
let rodadaAtual = 0;
let mensagens = [];
let simulacao = null;

function getEventoAtual() {
    try {
        const salvo = JSON.parse(localStorage.getItem("eventoDiaAtual"));
        return salvo && salvo.aoVivo ? salvo : eventoPadrao;
    } catch (error) {
        return eventoPadrao;
    }
}

function escaparHtml(texto) {
    return String(texto).replace(/[&<>"']/g, function (caractere) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[caractere];
    });
}

function participantesAoVivo() {
    return MatchConnectApp.perfisOrdenados().slice(0, 4);
}

function perguntaAtual() {
    return eventoAtual.perguntas[rodadaAtual % eventoAtual.perguntas.length];
}

function criarMensagensIniciais() {
    const pessoas = participantesAoVivo();

    mensagens = [
        {
            autor: "MatchConnect",
            tipo: "sistema",
            texto: `Rodada aberta: ${perguntaAtual()}`
        },
        {
            autor: pessoas[0]?.nome || "Ana",
            texto: "Eu cheguei agora. Gostei porque parece uma conversa bem leve."
        },
        {
            autor: pessoas[1]?.nome || "Karol",
            texto: "Minha resposta depende muito do momento, mas adoro ouvir indicações."
        },
        {
            autor: pessoas[2]?.nome || "Mariana",
            texto: "Acho que histórias boas deixam alguma frase grudada na cabeça."
        }
    ];
}

function renderizarCabecalho() {
    document.getElementById("tituloEventoAoVivo").textContent = eventoAtual.titulo;
    document.getElementById("descricaoEventoAoVivo").textContent = eventoAtual.descricao;
    document.getElementById("horarioAoVivo").textContent = eventoAtual.horario;
    document.getElementById("rodadaAoVivo").textContent = `Rodada ${rodadaAtual + 1} de ${eventoAtual.perguntas.length}`;
    document.getElementById("totalAoVivo").textContent = participantesAoVivo().length + 1;
    document.getElementById("perguntaAoVivo").textContent = perguntaAtual();
    document.getElementById("tagsEventoAoVivo").innerHTML = eventoAtual.interesses.map(function (interesse) {
        return `<span class="tag-match">${interesse}</span>`;
    }).join("");
}

function renderizarParticipantes() {
    const status = ["falando agora", "digitando...", "ouvindo", "reagiu ao tema"];
    document.getElementById("participantesAoVivo").innerHTML = participantesAoVivo().map(function (perfil, index) {
        return `
            <div class="live-person">
                ${MatchConnectApp.avatarHtml(perfil.inicial)}
                <span>
                    <strong>${perfil.nome}</strong>
                    <small>${perfil.percentual}% compatível • ${status[index]}</small>
                </span>
            </div>
        `;
    }).join("");
}

function renderizarChat() {
    const chat = document.getElementById("chatAoVivo");

    chat.innerHTML = mensagens.map(function (mensagem) {
        const classe = mensagem.tipo === "usuario" ? "user" : mensagem.tipo === "sistema" ? "system" : "";
        return `
            <div class="live-message ${classe}">
                <strong>${escaparHtml(mensagem.autor)}</strong>
                <p>${escaparHtml(mensagem.texto)}</p>
            </div>
        `;
    }).join("");

    chat.scrollTop = chat.scrollHeight;
}

function adicionarMensagem(texto, tipo = "usuario", autor = "Você") {
    mensagens.push({ autor, tipo, texto });
    renderizarChat();
}

function simularMensagem() {
    const pessoas = participantesAoVivo();
    const pessoa = pessoas[mensagens.length % pessoas.length];
    const texto = respostasSimuladas[mensagens.length % respostasSimuladas.length];

    document.getElementById("statusDigitando").textContent = `${pessoa.nome} está digitando...`;
    setTimeout(function () {
        adicionarMensagem(texto, "", pessoa.nome);
        document.getElementById("statusDigitando").textContent = "MatchConnect está mediando o papo";
        renderizarParticipantes();
    }, 900);
}

document.getElementById("formMensagemAoVivo").addEventListener("submit", function (event) {
    event.preventDefault();

    const campo = document.getElementById("mensagemAoVivo");
    const texto = campo.value.trim();
    if (!texto) return;

    adicionarMensagem(texto);
    campo.value = "";
});

document.querySelector(".quick-replies").addEventListener("click", function (event) {
    const botao = event.target.closest("button");
    if (!botao) return;
    adicionarMensagem(botao.textContent.trim());
});

document.getElementById("btnNovaRodada").addEventListener("click", function () {
    rodadaAtual = (rodadaAtual + 1) % eventoAtual.perguntas.length;
    renderizarCabecalho();
    adicionarMensagem(`Nova rodada: ${perguntaAtual()}`, "sistema", "MatchConnect");
});

eventoAtual = getEventoAtual();
criarMensagensIniciais();
renderizarCabecalho();
renderizarParticipantes();
renderizarChat();

clearInterval(simulacao);
simulacao = setInterval(simularMensagem, 6500);
