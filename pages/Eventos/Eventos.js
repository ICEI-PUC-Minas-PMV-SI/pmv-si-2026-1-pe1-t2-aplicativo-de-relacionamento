MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

// Dados do usuário e perfis simulados vêm do módulo compartilhado.
const dados = MatchConnectApp.interesses();
const meusInteresses = Array.isArray(dados.interesses) ? dados.interesses : [];
const perfis = MatchConnectApp.perfisOrdenados();

// Catálogo de ideias de eventos usadas para montar convites personalizados.
const eventos = [
    { icone: "bi-cup-hot", titulo: "Café compatível", tipo: "Café", interesses: ["Livros", "Gastronomia"], local: "cafeteria movimentada", convite: "Topa um café curto para conversar sobre um assunto que a gente tem em comum?" },
    { icone: "bi-film", titulo: "Sessão comentada", tipo: "Cinema", interesses: ["Cinema", "Séries"], local: "cinema de shopping", convite: "Vi que cinema combina com a gente. Quer escolher um filme e comentar depois?" },
    { icone: "bi-music-note-beamed", titulo: "Playlist ao vivo", tipo: "Música", interesses: ["Música"], local: "bar com música em volume baixo", convite: "A gente podia testar uma playlist ao vivo e trocar recomendações." },
    { icone: "bi-controller", titulo: "Game cooperativo", tipo: "Games", interesses: ["Games", "Tecnologia"], local: "evento gamer ou chamada online", convite: "Que tal começar com um jogo cooperativo sem pressão?" },
    { icone: "bi-tree", titulo: "Passeio leve", tipo: "Ar livre", interesses: ["Praia", "Corrida", "Pets"], local: "parque público", convite: "Um passeio em lugar aberto parece combinar com nosso ritmo." },
    { icone: "bi-map", titulo: "Descobrir sabores", tipo: "Gastronomia", interesses: ["Gastronomia", "Viagens"], local: "restaurante bem avaliado", convite: "Vamos escolher um lugar novo e transformar isso numa memória boa?" }
];
let eventoSelecionado = null;

// Preenche o seletor de match com perfis ordenados por compatibilidade.
document.getElementById("matchConvite").innerHTML = perfis.map(function (perfil) {
    return `<option value="${perfil.nome}">${perfil.nome} • ${perfil.percentual}% compatível</option>`;
}).join("");

// Retorna quais interesses do evento também existem no perfil do usuário.
function afinidade(evento) {
    return evento.interesses.filter(function (interesse) {
        return meusInteresses.includes(interesse);
    });
}

// Renderiza os cards iniciais com percentual de alinhamento ao perfil.
function renderizarEventos() {
    document.getElementById("listaEventos").innerHTML = eventos.map(function (evento, index) {
        const comum = afinidade(evento);
        const percentual = Math.min(96, 55 + comum.length * 18);

        return `
            <article class="feature-card">
                <i class="bi ${evento.icone}"></i>
                <h2 class="h5 mt-3">${evento.titulo}</h2>
                <p>${evento.tipo} em ${evento.local}, pensado para começar com leveza.</p>
                <div class="compat-meter mb-2"><span style="width:${percentual}%"></span></div>
                <small class="text-muted d-block mb-3">${percentual}% alinhado ao seu perfil</small>
                <div class="d-flex flex-wrap gap-2 mb-3">
                    ${(comum.length ? comum : evento.interesses).map(function (item) { return `<span class="tag-match">${item}</span>`; }).join("")}
                </div>
                <button class="btn btn-match-outline w-100 escolher-evento" type="button" data-index="${index}">Montar convite</button>
            </article>
        `;
    }).join("");
}

// Monta a mensagem final do convite usando evento, match, horário e duração escolhidos.
function montarMensagemConvite() {
    if (!eventoSelecionado) {
        return "Escolha um evento para gerar uma mensagem.";
    }

    const match = document.getElementById("matchConvite").value || "você";
    const periodo = document.getElementById("periodoConvite").value;
    const duracao = document.getElementById("duracaoConvite").value;
    const comum = afinidade(eventoSelecionado);
    const motivo = comum.length > 0
        ? `porque a gente combina em ${comum.join(" e ")}`
        : `porque parece combinar com nosso jeito de conversar`;

    return `${match}, pensei em uma ideia simples: ${eventoSelecionado.convite} Pode ser ${periodo}, em ${eventoSelecionado.local}, por ${duracao}. Acho que faz sentido ${motivo}.`;
}

// Atualiza o preview da mensagem sempre que algum detalhe do convite muda.
function atualizarConvite() {
    document.getElementById("mensagemConvite").textContent = montarMensagemConvite();
}

function enviarMensagemParaConversa(match, texto) {
    const mensagens = JSON.parse(localStorage.getItem("mensagensUsuario")) || {};

    if (!mensagens[match]) {
        mensagens[match] = [
            { autor: match, texto: "Oi! Vi que a gente tem alguns interesses em comum." }
        ];
    }

    mensagens[match].push({ autor: "Você", texto: texto });
    localStorage.setItem("mensagensUsuario", JSON.stringify(mensagens));
    localStorage.setItem("conversaAberta", match);
    localStorage.setItem("mensagemEnviadaRecentemente", texto);
}

// Ativa o painel de continuação após clicar em "Montar convite".
function selecionarEvento(index) {
    eventoSelecionado = eventos[index];
    const comum = afinidade(eventoSelecionado);
    const match = document.getElementById("matchConvite").value || "seu match";

    document.getElementById("tituloRoteiro").textContent = eventoSelecionado.titulo;
    document.getElementById("descricaoRoteiro").textContent = `${eventoSelecionado.tipo} em ${eventoSelecionado.local}. ${eventoSelecionado.convite}`;
    document.getElementById("statusConvite").textContent = comum.length > 0
        ? `${comum.length} afinidade${comum.length === 1 ? "" : "s"} em comum`
        : "Sugestão leve";
    atualizarConvite();
    document.getElementById("continuaConvite").scrollIntoView({ behavior: "smooth", block: "start" });

    window.MatchConnectEROS?.react({
        tema: `${eventoSelecionado.titulo} ${eventoSelecionado.tipo} ${eventoSelecionado.interesses.join(" ")}`,
        fala: `Eu chamaria ${match} assim: ${eventoSelecionado.convite}`
    });
}

// Delegação de clique: identifica qual card foi escolhido sem criar vários listeners.
document.getElementById("listaEventos").addEventListener("click", function (event) {
    const botao = event.target.closest(".escolher-evento");
    if (!botao) return;
    selecionarEvento(Number(botao.dataset.index));
});

// Qualquer mudança nos campos do formulário recalcula o texto do convite.
["matchConvite", "periodoConvite", "duracaoConvite"].forEach(function (id) {
    document.getElementById(id).addEventListener("change", atualizarConvite);
});

// Salva o plano para a tela "Primeiro Encontro" reutilizar as informações.
document.getElementById("btnSalvarConvite").addEventListener("click", function () {
    if (!eventoSelecionado) {
        document.getElementById("statusConvite").textContent = "Escolha um evento primeiro";
        return;
    }

    const plano = {
        match: document.getElementById("matchConvite").value,
        local: eventoSelecionado.local,
        horario: document.getElementById("periodoConvite").value,
        mensagem: montarMensagemConvite()
    };

    localStorage.setItem("planoEncontro", JSON.stringify(plano));
    localStorage.setItem("conviteEvento", JSON.stringify(plano));
    document.getElementById("statusConvite").textContent = "Plano salvo";
});

document.getElementById("btnCopiarConvite").addEventListener("click", function () {
    const mensagem = montarMensagemConvite();
    navigator.clipboard?.writeText(mensagem);
    document.getElementById("statusConvite").textContent = "Mensagem pronta para usar";
});

document.getElementById("btnEnviarConvite").addEventListener("click", function () {
    if (!eventoSelecionado) {
        document.getElementById("statusConvite").textContent = "Escolha um evento primeiro";
        return;
    }

    const match = document.getElementById("matchConvite").value;
    const mensagem = montarMensagemConvite();
    enviarMensagemParaConversa(match, mensagem);
    document.getElementById("statusConvite").textContent = `Mensagem enviada para ${match}`;

    window.setTimeout(function () {
        window.location.href = "../Conversas/Conversas.html";
    }, 500);
});

renderizarEventos();
