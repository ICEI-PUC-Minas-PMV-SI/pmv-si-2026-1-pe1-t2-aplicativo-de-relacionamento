MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const dados = MatchConnectApp.interesses();
const meusInteresses = Array.isArray(dados.interesses) ? dados.interesses : [];
const perfis = MatchConnectApp.perfisOrdenados();

const clubes = [
    {
        titulo: "Clube do Livro",
        icone: "bi-book",
        horario: "Hoje, 19h30",
        local: "Sala online MatchConnect",
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

function afinidades(clube) {
    return clube.interesses.filter(function (interesse) {
        return meusInteresses.includes(interesse);
    });
}

function percentualClube(clube) {
    return Math.min(98, 62 + afinidades(clube).length * 16);
}

function renderizarClubes() {
    document.getElementById("listaClubesDia").innerHTML = clubes.map(function (clube, index) {
        const comum = afinidades(clube);
        return `
            <button class="daily-club-item ${index === clubeAtual ? "active" : ""}" type="button" data-index="${index}">
                <i class="bi ${clube.icone}"></i>
                <span>
                    <strong>${clube.titulo}</strong>
                    <small>${clube.horario} • ${comum.length ? comum.join(", ") : clube.interesses.join(", ")}</small>
                </span>
                <em>${percentualClube(clube)}%</em>
            </button>
        `;
    }).join("");
}

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

function renderizarEvento() {
    const clube = clubes[clubeAtual];
    const comum = afinidades(clube);

    document.getElementById("tituloEventoDia").textContent = clube.titulo;
    document.getElementById("descricaoEventoDia").textContent = clube.descricao;
    document.getElementById("iconeEventoDia").className = `bi ${clube.icone}`;
    document.getElementById("horarioEventoDia").textContent = clube.horario;
    document.getElementById("localEventoDia").textContent = clube.local;
    document.getElementById("afinidadeEventoDia").textContent = `${percentualClube(clube)}% alinhado ao seu perfil`;
    document.getElementById("tagsEventoDia").innerHTML = clube.interesses.map(function (interesse) {
        const destaque = comum.includes(interesse) ? " bi-check2-heart" : "";
        return `<span class="tag-match"><i class="bi${destaque}"></i>${interesse}</span>`;
    }).join("");
    document.getElementById("perguntaEvento").textContent = clube.perguntas[perguntaAtual % clube.perguntas.length];
    renderizarClubes();
    renderizarParticipantes(clube);
}

document.getElementById("listaClubesDia").addEventListener("click", function (event) {
    const botao = event.target.closest(".daily-club-item");
    if (!botao) return;
    clubeAtual = Number(botao.dataset.index);
    perguntaAtual = 0;
    renderizarEvento();
});

document.getElementById("btnNovaPergunta").addEventListener("click", function () {
    perguntaAtual += 1;
    renderizarEvento();
});

document.getElementById("btnEntrarEvento").addEventListener("click", function () {
    const clube = clubes[clubeAtual];
    localStorage.setItem("eventoDiaAtual", JSON.stringify(clube));
    document.getElementById("statusEventoDia").textContent = `Você entrou em ${clube.titulo}. A pergunta do evento já está pronta para usar.`;
});

document.getElementById("btnSalvarEvento").addEventListener("click", function () {
    const clube = clubes[clubeAtual];
    localStorage.setItem("eventoDiaSalvo", JSON.stringify(clube));
    document.getElementById("statusEventoDia").textContent = `${clube.titulo} salvo para participar depois.`;
});

renderizarEvento();
