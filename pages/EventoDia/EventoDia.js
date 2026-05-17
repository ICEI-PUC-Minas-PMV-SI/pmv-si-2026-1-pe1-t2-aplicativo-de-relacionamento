MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

// Informações do usuário usadas para calcular afinidade com os clubes do dia.
const dados = MatchConnectApp.interesses();
const meusInteresses = Array.isArray(dados.interesses) ? dados.interesses : [];
const perfis = MatchConnectApp.perfisOrdenados();

// Clubes temáticos disponíveis para o "Evento do Dia".
const clubes = [
    {
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
    },
    {
        titulo: "Sessão Pipoca",
        icone: "bi-film",
        horario: "Hoje, 20h",
        local: "Chat temático de cinema",
        aoVivo: false,
        interesses: ["Cinema", "Séries"],
        descricao: "Conversa guiada sobre filmes confortáveis, séries recentes e cenas que renderiam horas de papo.",
        perguntas: [
            "Qual filme você reveria hoje sem pensar muito?",
            "Você é mais final feliz, final aberto ou reviravolta?",
            "Que personagem parece ter a mesma energia que você?"
        ]
    },
    {
        titulo: "Café e Playlist",
        icone: "bi-cup-hot",
        horario: "Hoje, 18h",
        local: "Mesa virtual de música",
        aoVivo: false,
        interesses: ["Música", "Gastronomia"],
        descricao: "Um clube para trocar músicas, cafés favoritos e pequenas histórias do dia.",
        perguntas: [
            "Qual música combina com sua semana?",
            "Café combina mais com conversa profunda ou papo bobo?",
            "Qual artista você indica para alguém entender seu humor?"
        ]
    },
    {
        titulo: "Controle Dois",
        icone: "bi-controller",
        horario: "Hoje, 21h",
        local: "Lobby gamer MatchConnect",
        aoVivo: false,
        interesses: ["Games", "Tecnologia"],
        descricao: "Um espaço para formar dupla, falar de jogos cooperativos e rir sem pressão.",
        perguntas: [
            "Qual jogo revela seu lado mais competitivo?",
            "Você prefere campanha, coop ou partida rápida?",
            "Qual universo de jogo você moraria por um dia?"
        ]
    }
];

let clubeAtual = 0;
let perguntaAtual = 0;

// Interesses em comum entre o usuário logado e o clube selecionado.
function afinidades(clube) {
    return clube.interesses.filter(function (interesse) {
        return meusInteresses.includes(interesse);
    });
}

// Percentual simples para destacar clubes mais próximos do perfil do usuário.
function percentualClube(clube) {
    return Math.min(98, 62 + afinidades(clube).length * 16);
}

function statusClube(clube) {
    return clube.aoVivo ? "Ao vivo agora" : "Ideia para participar depois";
}

// Lista os clubes no painel lateral e marca o clube selecionado.
function renderizarClubes() {
    document.getElementById("listaClubesDia").innerHTML = clubes.map(function (clube, index) {
        const comum = afinidades(clube);
        return `
            <button class="daily-club-item ${index === clubeAtual ? "active" : ""}" type="button" data-index="${index}">
                <i class="bi ${clube.icone}"></i>
                <span>
                    <strong>${clube.titulo}</strong>
                    <small>${statusClube(clube)} • ${clube.horario} • ${comum.length ? comum.join(", ") : clube.interesses.join(", ")}</small>
                </span>
                <em>${percentualClube(clube)}%</em>
            </button>
        `;
    }).join("");
}

// Mostra alguns perfis compatíveis como possíveis participantes do evento.
function renderizarParticipantes(clube) {
    const participantes = perfis.slice(0, 3);
    document.getElementById("participantesEvento").innerHTML = participantes.map(function (perfil) {
        const comum = perfil.interessesEmComum.length ? perfil.interessesEmComum : perfil.interesses.slice(0, 2);
        return `
            <div class="list-row">
                ${MatchConnectApp.avatarHtml(perfil.inicial)}
                <span class="row-main">
                    <strong>${perfil.nome}</strong>
                    <small>${perfil.percentual}% compatível • ${comum.join(", ")}</small>
                </span>
            </div>
        `;
    }).join("");
}

// Atualiza todo o destaque principal quando o usuário troca de clube.
function renderizarEvento() {
    const clube = clubes[clubeAtual];
    const comum = afinidades(clube);
    const botaoEntrar = document.getElementById("btnEntrarEvento");

    document.getElementById("tituloEventoDia").textContent = clube.titulo;
    document.getElementById("descricaoEventoDia").textContent = clube.descricao;
    document.getElementById("iconeEventoDia").className = `bi ${clube.icone}`;
    document.getElementById("horarioEventoDia").textContent = clube.aoVivo ? `${clube.horario} • ao vivo` : clube.horario;
    document.getElementById("localEventoDia").textContent = clube.local;
    document.getElementById("afinidadeEventoDia").textContent = `${percentualClube(clube)}% alinhado • ${statusClube(clube)}`;
    document.getElementById("tagsEventoDia").innerHTML = clube.interesses.map(function (interesse) {
        const destaque = comum.includes(interesse) ? " bi-check2-heart" : "";
        return `<span class="tag-match"><i class="bi${destaque}"></i>${interesse}</span>`;
    }).join("");
    document.getElementById("perguntaEvento").textContent = clube.perguntas[perguntaAtual % clube.perguntas.length];
    renderizarClubes();
    renderizarParticipantes(clube);

    botaoEntrar.disabled = false;
    botaoEntrar.innerHTML = clube.aoVivo
        ? '<i class="bi bi-broadcast"></i> Entrar ao vivo'
        : '<i class="bi bi-calendar-heart"></i> Ver ideia';
}

// Seleciona um clube quando o usuário clica em uma opção.
document.getElementById("listaClubesDia").addEventListener("click", function (event) {
    const botao = event.target.closest(".daily-club-item");
    if (!botao) return;
    clubeAtual = Number(botao.dataset.index);
    perguntaAtual = 0;
    renderizarEvento();
});

// Alterna a pergunta quebra-gelo do evento.
document.getElementById("btnNovaPergunta").addEventListener("click", function () {
    perguntaAtual += 1;
    renderizarEvento();
});

// Simula entrada no evento e guarda a escolha para outras telas usarem depois.
document.getElementById("btnEntrarEvento").addEventListener("click", function () {
    const clube = clubes[clubeAtual];
    localStorage.setItem("eventoDiaAtual", JSON.stringify(clube));

    if (!clube.aoVivo) {
        document.getElementById("statusEventoDia").textContent = `${clube.titulo} ainda não começou. Esta opção fica como ideia de encontro para salvar ou explorar.`;
        return;
    }

    document.getElementById("statusEventoDia").textContent = `Você entrou em ${clube.titulo}. A sala ao vivo foi aberta.`;
    window.location.href = "../EventoAoVivo/EventoAoVivo.html";
});

document.getElementById("btnSalvarEvento").addEventListener("click", function () {
    const clube = clubes[clubeAtual];
    localStorage.setItem("eventoDiaSalvo", JSON.stringify(clube));
    document.getElementById("statusEventoDia").textContent = `${clube.titulo} salvo para participar depois.`;
});

renderizarEvento();
