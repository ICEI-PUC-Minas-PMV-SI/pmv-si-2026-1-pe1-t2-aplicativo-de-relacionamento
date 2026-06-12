MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const matches = MatchConnectApp.getMatchedProfiles();
const perfisBase = matches.length > 0 ? matches : MatchConnectApp.perfisOrdenados().slice(0, 4);
const preferenciasPadrao = {
    plataforma: "PC",
    estilo: "Casual",
    comunicacao: "Chat primeiro",
    horario: "Noite",
    jogos: "Valorant, Fortnite, Minecraft"
};
const preferencias = { ...preferenciasPadrao, ...MatchConnectApp.getJson("preferenciasPlayMatchConnect", {}) };

const jogosPorPerfil = {
    Ana: ["Stardew Valley", "It Takes Two", "Minecraft"],
    Karol: ["Valorant", "Rocket League", "Fortnite"],
    Mariana: ["The Sims", "Fall Guys", "Mario Kart"],
    Beatriz: ["FIFA", "Overcooked", "Forza Horizon"],
    Luiza: ["League of Legends", "Minecraft", "Overwatch"]
};

const miniGames = [
    {
        titulo: "Duas Verdades e Uma Mentira",
        icone: "bi-incognito",
        descricao: "Cada um manda três afirmações sobre si e o match adivinha qual é falsa.",
        tipo: "duas-verdades"
    },
    {
        titulo: "Nunca Nunca",
        icone: "bi-hand-index-thumb",
        descricao: "Marque o que você já fez e compare com seu match.",
        tipo: "nunca-nunca",
        afirmacoes: [
            "Já assisti uma série inteira em um fim de semana",
            "Já viajei sozinho para uma cidade desconhecida",
            "Já cozinhei um jantar especial para alguém",
            "Já joguei vídeo game por mais de 5 horas seguidas",
            "Já fiquei acordado até o amanhecer conversando"
        ]
    },
    {
        titulo: "A vs B",
        icone: "bi-lightning-charge",
        descricao: "Escolha rápido entre dois opostos e revele seu perfil para o match.",
        tipo: "batalha",
        rodadas: [
            { a: "🏖️ Praia", b: "⛰️ Montanha" },
            { a: "📺 Séries", b: "🎬 Filmes" },
            { a: "🍕 Pizza", b: "🍔 Hambúrguer" },
            { a: "🌅 Manhã", b: "🌙 Noite" },
            { a: "🎮 Aventura", b: "🛋️ Sossego" },
            { a: "👨‍🍳 Cozinhar", b: "🛵 Delivery" },
            { a: "💬 Chat", b: "📞 Ligação" }
        ]
    },
    {
        titulo: "Emoji Quiz",
        icone: "bi-emoji-laughing",
        descricao: "Adivinhe o que os emojis escondem e desafie seu match.",
        tipo: "emoji-quiz",
        perguntas: [
            { emojis: "🎬🧟💃", resposta: "Thriller", dica: "Música icônica dos anos 80" },
            { emojis: "🧊👸❄️", resposta: "Frozen", dica: "Animação da Disney" },
            { emojis: "🕷️👨🏙️", resposta: "Homem-Aranha", dica: "Super-herói que sobe paredes" },
            { emojis: "🚀🪐⭐🛸", resposta: "Star Wars", dica: "Saga espacial clássica" },
            { emojis: "💀☠️🏴‍☠️⚓", resposta: "Piratas do Caribe", dica: "Aventura no alto mar" },
            { emojis: "🦁👑🌅", resposta: "O Rei Leão", dica: "Clássico da Disney" }
        ]
    }
];

const BOT_AFIRMACOES_2V1M = [
    ["Já visitei 15 países", "Falo 3 idiomas fluentemente", "Tenho medo de altura"],
    ["Já comi sushi de crocodilo", "Toco violão desde os 8 anos", "Nunca assisti Star Wars"],
    ["Já fiz paraquedismo", "Tenho 2 gatos e 1 cachorro", "Não gosto de chocolate"],
    ["Já morei em 4 cidades", "Aprendi a nadar com 30 anos", "Tenho um irmão gêmeo"],
    ["Já fiz aula de teatro", "Durmo 5 horas por noite", "Coleciono moedas antigas"],
    ["Já escalei uma montanha", "Faço maratona todo ano", "Nunca comi pizza"],
    ["Já vi um OVNI", "Toco bateria numa banda", "Não sei andar de bicicleta"],
    ["Já ganhei um concurso de dança", "Leio 2 livros por semana", "Detesto animais"]
];

const estado2V1M = {
    minhasAfirmacoes: ["", "", ""],
    minhaMentira: -1,
    minhasProntas: false,
    botAfirmacoes: [],
    botMentira: -1,
    botPalpite: -1,
    meuPalpite: -1,
    acertei: null,
    fase: "criar"
};
const estadoNN = { marcados: new Set(), botMarcados: new Set() };
const estadoBatalha = { rodada: 0, escolhas: [], botEscolhas: [] };
const estadoEQ = { atual: 0, revelado: false, palpite: "", acertou: null, botAcertos: 0, acertosUsuario: 0 };

const sessaoJogo = { ativa: false, match: null };

const filasOnline = [
    {
        id: "casual",
        titulo: "Casual rápido",
        icone: "bi-emoji-smile",
        formato: "Duo ou trio",
        tempo: "2 min",
        foco: "Partidas leves para conversar sem pressão."
    },
    {
        id: "coop",
        titulo: "Cooperativo",
        icone: "bi-people",
        formato: "Squad",
        tempo: "4 min",
        foco: "Jogos em equipe, missão compartilhada e clima tranquilo."
    },
    {
        id: "ranked",
        titulo: "Competitivo leve",
        icone: "bi-trophy",
        formato: "Duo",
        tempo: "5 min",
        foco: "Competição com comunicação respeitosa e objetivo claro."
    }
];

let matchSelecionado = perfisBase[0] || null;
let miniGameSelecionado = miniGames[0];
let filaSelecionada = localStorage.getItem("filaPlayMatchConnect") || "";

function ativarAba(id) {
    document.querySelectorAll("[data-tab-target]").forEach(function (botao) {
        const ativo = botao.dataset.tabTarget === id;
        botao.classList.toggle("active", ativo);
        botao.setAttribute("aria-selected", String(ativo));
    });

    document.querySelectorAll(".play-tab-panel").forEach(function (painel) {
        painel.classList.toggle("active", painel.id === id);
    });
}

function tagsJogos(perfil) {
    return jogosPorPerfil[perfil.nome] || ["Minecraft", "Fall Guys", "Overcooked"];
}

function compatPlay(perfil) {
    const meusJogos = preferencias.jogos.toLowerCase();
    const jogos = tagsJogos(perfil);
    const jogoEmComum = jogos.some(function (jogo) {
        return meusJogos.includes(jogo.toLowerCase());
    });
    const base = perfil.percentual || 60;
    return Math.min(98, base + (jogoEmComum ? 10 : 0) + (preferencias.estilo.includes("Casual") ? 4 : 0));
}

function montarConvite(perfil) {
    const jogo = tagsJogos(perfil)[0];
    return `${perfil.nome}, vi que a gente combina para jogar ${jogo}. Topa uma partida ${preferencias.estilo.toLowerCase()} hoje à ${preferencias.horario.toLowerCase()}, começando por ${preferencias.comunicacao.toLowerCase()}?`;
}

function enviarMensagem(match, texto, origem) {
    if (!match || !texto) return;

    const mensagens = MatchConnectApp.getMensagens();
    if (!mensagens[match.nome]) {
        mensagens[match.nome] = [];
    }

    mensagens[match.nome].push({
        autor: "Você",
        texto: texto,
        origem: origem,
        data: new Date().toISOString()
    });
    MatchConnectApp.addMatch(match);
    MatchConnectApp.setMensagens(mensagens);
    MatchConnectApp.registrarHistorico(origem, match, texto);
    localStorage.setItem("conversaAberta", match.nome);
}

function iniciarPartida(match) {
    sessaoJogo.ativa = true;
    sessaoJogo.match = match;
    resetarEstadoJogo();
    sortearBotNN();
    document.getElementById("arenaStatus").textContent = `🎮 Em partida com ${match.nome}`;
    renderizarArena();
    renderizarEROSPlay();
}

function encerrarPartida() {
    sessaoJogo.ativa = false;
    sessaoJogo.match = null;
    document.getElementById("arenaStatus").textContent = "Simulação local";
    renderizarArena();
    renderizarEROSPlay();
}

function sortearBotNN() {
    estadoNN.botMarcados.clear();
    for (let i = 0; i < miniGames[1].afirmacoes.length; i++) {
        if (Math.random() > 0.45) estadoNN.botMarcados.add(i);
    }
}

function resetarEstadoJogo() {
    estado2V1M.minhasAfirmacoes = ["", "", ""];
    estado2V1M.minhaMentira = -1;
    estado2V1M.minhasProntas = false;
    estado2V1M.botAfirmacoes = [];
    estado2V1M.botMentira = -1;
    estado2V1M.botPalpite = -1;
    estado2V1M.meuPalpite = -1;
    estado2V1M.acertei = null;
    estado2V1M.fase = "criar";
    estadoNN.marcados.clear();
    estadoNN.botMarcados.clear();
    estadoBatalha.rodada = 0;
    estadoBatalha.escolhas = [];
    estadoBatalha.botEscolhas = [];
    estadoEQ.atual = 0;
    estadoEQ.revelado = false;
    estadoEQ.palpite = "";
    estadoEQ.acertou = null;
    estadoEQ.botAcertos = 0;
    estadoEQ.acertosUsuario = 0;
}

function botJogar2V1M() {
    const pool = BOT_AFIRMACOES_2V1M[Math.floor(Math.random() * BOT_AFIRMACOES_2V1M.length)];
    estado2V1M.botAfirmacoes = pool.slice();
    estado2V1M.botMentira = Math.floor(Math.random() * 3);
    estado2V1M.botPalpite = Math.floor(Math.random() * 3);
}

function botJogarBatalha() {
    estadoBatalha.botEscolhas.push(Math.random() > 0.5 ? "a" : "b");
}

function botJogarEQ(jogo) {
    if (Math.random() > 0.55) estadoEQ.botAcertos++;
}

function renderizarArena() {
    const container = document.getElementById("arenaMatches");

    if (perfisBase.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-controller"></i>
                <strong>Nenhum match disponível</strong>
                <p>Curta perfis em Descobrir para formar duos e squads.</p>
                <a class="btn btn-match-primary" href="../home/Homeusuario.html#descobrir">Descobrir perfis</a>
            </div>
        `;
        return;
    }

    container.innerHTML = perfisBase.map(function (perfil) {
        const compat = compatPlay(perfil);
        const jogos = tagsJogos(perfil);
        const emJogo = sessaoJogo.ativa && sessaoJogo.match?.nome === perfil.nome;
        return `
            <article class="arena-card ${matchSelecionado?.nome === perfil.nome ? "selected" : ""} ${emJogo ? "in-game" : ""}" data-match="${perfil.nome}">
                <div class="arena-card-head">
                    ${MatchConnectApp.avatarHtml(perfil.inicial)}
                    <div>
                        <h3>${perfil.nome} ${emJogo ? '<span class="play-status-live">● JOGANDO</span>' : ""}</h3>
                        <span>${compat}% play match - ${perfil.distanciaKm} km</span>
                    </div>
                </div>
                <p>${perfil.energia}. Combina para ${preferencias.estilo.toLowerCase()} em ${preferencias.plataforma}.</p>
                <div class="play-tag-row">
                    ${jogos.map(function (jogo) { return `<span>${jogo}</span>`; }).join("")}
                </div>
                <div class="arena-actions">
                    ${emJogo
                ? `<button class="btn btn-match-primary btn-sm" type="button" data-action="play" data-match="${perfil.nome}">
                               <i class="bi bi-controller"></i> Jogar agora
                           </button>
                           <button class="btn btn-match-outline btn-sm" type="button" data-action="leave" data-match="${perfil.nome}">
                               <i class="bi bi-box-arrow-left"></i> Sair
                            </button>`
                : `<button class="btn btn-match-primary btn-sm" type="button" data-action="invite" data-match="${perfil.nome}">
                                Convidar
                            </button>
                            <button class="btn btn-match-outline btn-sm" type="button" data-action="play" data-match="${perfil.nome}">
                                <i class="bi bi-controller"></i> Jogar
                            </button>`
            }
                </div>
            </article>
        `;
    }).join("");
}

function renderizarEROSPlay() {
    const painel = document.getElementById("erosPlayActions");
    const texto = document.getElementById("erosPlayText");

    if (sessaoJogo.ativa && sessaoJogo.match) {
        const m = sessaoJogo.match;
        texto.innerHTML = `
            <div class="session-lobby">
                <div class="session-players">
                    <div class="session-player">
                        ${MatchConnectApp.avatarHtml("V")}
                        <strong>Você</strong>
                    </div>
                    <div class="session-vs">VS</div>
                    <div class="session-player">
                        ${MatchConnectApp.avatarHtml(m.inicial)}
                        <strong>${m.nome}</strong>
                        <span class="text-muted">🤖 Bot</span>
                    </div>
                </div>
                <p class="session-status">${m.nome} entrou na sala! Pronto para jogar.</p>
            </div>
        `;
        painel.innerHTML = `
            <button class="btn btn-match-primary" type="button" data-eros-play="start">
                <i class="bi bi-controller"></i> Iniciar partida
            </button>
            <button class="btn btn-match-outline" type="button" data-eros-play="leave">
                <i class="bi bi-box-arrow-left"></i> Sair da sala
            </button>
        `;
        return;
    }

    if (!matchSelecionado) {
        texto.textContent = "Selecione um match na arena para montar um convite de jogo.";
        painel.innerHTML = "";
        return;
    }

    const convite = montarConvite(matchSelecionado);
    texto.textContent = convite;
    painel.innerHTML = `
        <button class="btn btn-match-primary" type="button" data-eros-play="send">
            <i class="bi bi-send"></i> Enviar convite
        </button>
        <a class="btn btn-match-outline" href="../Conversas/Conversas.html" data-eros-play="open">
            <i class="bi bi-chat-heart"></i> Abrir conversa
        </a>
    `;
}

function preencherPreferencias() {
    document.getElementById("playPlataforma").value = preferencias.plataforma;
    document.getElementById("playEstilo").value = preferencias.estilo;
    document.getElementById("playComunicacao").value = preferencias.comunicacao;
    document.getElementById("playHorario").value = preferencias.horario;
    document.getElementById("playJogos").value = preferencias.jogos;
}

function renderizarFilasOnline() {
    document.getElementById("filaPlayOnline").innerHTML = filasOnline.map(function (fila) {
        return `
            <button class="queue-card ${filaSelecionada === fila.id ? "selected" : ""}" type="button" data-queue="${fila.id}">
                <span class="queue-icon"><i class="bi ${fila.icone}"></i></span>
                <span>
                    <strong>${fila.titulo}</strong>
                    <small>${fila.formato} - espera ${fila.tempo}</small>
                    <em>${fila.foco}</em>
                </span>
            </button>
        `;
    }).join("");

    const fila = filasOnline.find(function (item) {
        return item.id === filaSelecionada;
    });
    document.getElementById("filaStatusPlay").textContent = fila ? `Na fila: ${fila.titulo}` : "Aberto";
}

function renderHTMLDuasVerdades(jogo) {
    const e = estado2V1M;

    if (e.fase === "recebendo") {
        return `
            <p class="text-muted mb-3">${jogo.descricao}</p>
            <div class="dv-recebendo">
                <div class="dv-typing">
                    <span class="dv-typing-dot"></span>
                    <span class="dv-typing-dot"></span>
                    <span class="dv-typing-dot"></span>
                </div>
                <p><strong>${sessaoJogo.match ? sessaoJogo.match.nome : "Match"}</strong> está escrevendo as afirmações dela...</p>
            </div>
        `;
    }

    if (e.fase === "criar") {
        const inputs = e.minhasAfirmacoes.map(function (val, i) {
            return `
                <div class="dv-input-group">
                    <label>Afirmação ${i + 1}</label>
                    <input class="dv-input" type="text" data-dv-idx="${i}" value="${val}" placeholder="Digite algo sobre você..." autocomplete="off">
                </div>
            `;
        }).join("");

        const mentiraBtns = e.minhasAfirmacoes.map(function (_, i) {
            const sel = e.minhaMentira === i ? " selected" : "";
            return `<button class="dv-mentira-btn${sel}" data-dv-mentira="${i}">${i + 1}</button>`;
        }).join("");

        const podeConfirmar = e.minhasAfirmacoes.every(function (v) { return v.trim() !== ""; }) && e.minhaMentira >= 0;

        return `
            <p class="text-muted mb-3">${jogo.descricao}</p>
            <p class="dv-subtitle">Escreva <strong>3 afirmações</strong> sobre você — duas verdadeiras e uma mentira. Depois marque qual é a mentira.</p>
            <div class="dv-inputs">${inputs}</div>
            <p class="dv-mentira-label">Qual afirmação é a <strong>mentira</strong>?</p>
            <div class="dv-mentira-opts">${mentiraBtns}</div>
            <button class="btn btn-match-primary w-100 mt-3" data-mg-action="dv-confirmar" ${podeConfirmar ? "" : "disabled"}>
                <i class="bi bi-check-circle"></i> Confirmar
            </button>
        `;
    }

    if (e.fase === "aguardar") {
        return `
            <p class="text-muted mb-3">${jogo.descricao}</p>
            <div class="dv-minhas-prontas">
                <span>Suas afirmações:</span>
                <ul>${e.minhasAfirmacoes.map(function (a, i) {
            return `<li>${a}${i === e.minhaMentira ? ' <span class="dv-mentira-tag">MENTIRA</span>' : ''}</li>`;
        }).join("")}</div>
            </div>
            <div class="mg-card mg-card-idle">⏳ Aguardando ${sessaoJogo.match.nome} criar as afirmações...</div>
        `;
    }

    if (e.fase === "adivinhar") {
        const botItens = e.botAfirmacoes.map(function (a, i) {
            const sel = e.meuPalpite === i ? " selected" : "";
            return `<button class="dv-palpite-btn${sel}" data-dv-palpite="${i}">${a}</button>`;
        }).join("");

        return `
            <p class="text-muted mb-3">Adivinhe qual afirmação do <strong>${sessaoJogo.match ? sessaoJogo.match.nome : "match"}</strong> é mentira!</p>
            <div class="dv-palpite-area">
                <p class="dv-mentira-label">Qual é a <strong>mentira</strong>?</p>
                <div class="dv-palpite-opts">${botItens}</div>
                <button class="btn btn-match-primary w-100 mt-3" data-mg-action="dv-palpite" ${e.meuPalpite >= 0 ? "" : "disabled"}>
                    <i class="bi bi-send"></i> Responder ✍️
                </button>
            </div>
        `;
    }

    if (e.fase === "adivinhar-feedback") {
        const botItens = e.botAfirmacoes.map(function (a, i) {
            const isLie = i === e.botMentira;
            const myGuess = i === e.meuPalpite;
            let badge = isLie ? ' <span class="dv-mentira-tag">MENTIRA</span>' : "";
            if (myGuess) badge += isLie ? ' <span class="dv-acertou-tag">✅ Certo!</span>' : ' <span class="dv-errou-tag">❌ Errado!</span>';
            return `<div class="dv-palpite-btn${myGuess ? " selected" : ""}">${a}${badge}</div>`;
        }).join("");

        return `
            <p class="text-muted mb-3">Adivinhe qual afirmação do <strong>${sessaoJogo.match ? sessaoJogo.match.nome : "match"}</strong> é mentira!</p>
            <p class="dv-resultado-header" style="margin-bottom:12px;">${e.acertei ? "✅ Você acertou!" : "❌ Você errou!"}</p>
            <div class="dv-palpite-area">
                <div class="dv-palpite-opts">${botItens}</div>
                <p class="text-muted text-center mt-2" style="font-size:0.8rem;">Aguarde, agora é sua vez de criar afirmações...</p>
            </div>
        `;
    }

    if (e.fase === "resultado") {
        const temBot = sessaoJogo.ativa && e.botAfirmacoes.length > 0;
        const header = temBot
            ? `<div class="dv-resultado-header">${e.acertei ? "✅ Você acertou a mentira!" : "❌ Você errou a mentira!"}</div>`
            : `<div class="dv-resultado-header">Suas afirmações</div>`;

        const botMsg = temBot
            ? `<div class="dv-bot-resultado">
                   <strong>${sessaoJogo.match.nome}</strong> achou que sua mentira era a afirmação <strong>${e.botPalpite + 1}</strong>
                   — ${e.botPalpite === e.minhaMentira ? "✅ Ele acertou!" : "❌ Ele errou!"}
               </div>`
            : "";

        return `
            <div class="dv-resultado">
                ${header}
                <div class="dv-resultado-col">
                    <span class="dv-resultado-label">Suas afirmações</span>
                    <ul>${e.minhasAfirmacoes.map(function (a, i) {
            const isLie = i === e.minhaMentira;
            const botGuess = temBot && i === e.botPalpite;
            const guessCorrect = temBot && botGuess && e.botPalpite === e.minhaMentira;
            let badge = isLie ? ' <span class="dv-mentira-tag">MENTIRA</span>' : "";
            if (botGuess) badge += guessCorrect ? ' <span class="dv-acertou-tag">✅ Acertou</span>' : ' <span class="dv-errou-tag">❌ Achou que era</span>';
            return `<li class="${isLie ? "dv-lie" : "dv-truth"}">${a}${badge}</li>`;
        }).join("")}</ul>
                </div>
                ${temBot
                ? `<div class="dv-resultado-col">
                           <span class="dv-resultado-label">Afirmações de ${sessaoJogo.match.nome}</span>
                           <ul>${e.botAfirmacoes.map(function (a, i) {
                    const isLie = i === e.botMentira;
                    const myGuess = i === e.meuPalpite;
                    let badge = isLie ? ' <span class="dv-mentira-tag">MENTIRA</span>' : "";
                    if (myGuess) badge += isLie ? ' <span class="dv-acertou-tag">✅ Certo!</span>' : ' <span class="dv-errou-tag">❌ Você escolheu</span>';
                    return `<li class="${isLie ? "dv-lie" : "dv-truth"}">${a}${badge}</li>`;
                }).join("")}</ul>
                       </div>`
                : ""}
            </div>
            ${botMsg}
            <div class="d-grid gap-2 mt-3">
                <button class="btn btn-match-primary" data-mg-action="enviar">
                    <i class="bi bi-send"></i> Compartilhar
                </button>
                <button class="btn btn-match-outline" data-mg-action="dv-restart">
                    <i class="bi bi-arrow-counterclockwise"></i> Jogar de novo
                </button>
            </div>
        `;
    }

    return "";
}

function renderHTMLNuncaNunca(jogo) {
    const itens = jogo.afirmacoes.map(function (a, i) {
        const marcado = estadoNN.marcados.has(i);
        const botMarcado = sessaoJogo.ativa && estadoNN.botMarcados.has(i);
        const botClass = botMarcado ? " bot-marcou" : "";
        return `<button class="nunca-btn${marcado ? " marcado" : ""}${botClass}" type="button" data-mg-action="nn-toggle" data-nn="${i}">
            <span class="nunca-check ${marcado ? "checked" : ""}">${marcado ? "✓" : "◌"}</span>
            <span>${a}${botMarcado ? ' <span class="bot-tag">✓ ' + sessaoJogo.match?.nome + "</span>" : ""}</span>
        </button>`;
    }).join("");

    const total = estadoNN.marcados.size;
    const botTotal = estadoNN.botMarcados.size;
    const frases = ["Você nunca fez nenhum!", "Começou bem!", "Na metade!", "Quase tudo!", "Já fez tudo!"];
    const frase = frases[Math.min(total, frases.length - 1)];

    const botInfo = sessaoJogo.ativa
        ? `<div class="nunca-score-bot">🤖 ${sessaoJogo.match.nome} marcou <strong>${botTotal}</strong> de ${jogo.afirmacoes.length}</div>`
        : "";

    return `
        <p class="text-muted mb-3">${jogo.descricao}</p>
        <div class="nunca-list">${itens}</div>
        <div class="nunca-score">
            <strong>${total}</strong> de ${jogo.afirmacoes.length} — ${frase}
        </div>
        ${botInfo}
        <button class="btn btn-match-primary w-100 mt-3" type="button" data-mg-action="enviar">
            <i class="bi bi-send"></i> ${sessaoJogo.ativa ? "Compartilhar na conversa" : "Compartilhar com match"}
        </button>
        <button class="btn btn-match-outline w-100 mt-2" type="button" data-mg-action="nn-restart">
            <i class="bi bi-arrow-counterclockwise"></i> Limpar e começar de novo
        </button>
    `;
}

function renderHTMLBatalha(jogo) {
    if (estadoBatalha.rodada < jogo.rodadas.length) {
        const rodada = jogo.rodadas[estadoBatalha.rodada];
        const barra = Math.round((estadoBatalha.rodada / jogo.rodadas.length) * 100);

        const botFeedback = sessaoJogo.ativa && estadoBatalha.botEscolhas.length > estadoBatalha.escolhas.length - 1
            ? ""
            : "";

        return `
            <p class="text-muted mb-2">${jogo.descricao}</p>
            <div class="batalha-barra"><div style="width:${barra}%"></div></div>
            <div class="batalha-arena">
                <button class="batalha-opt" data-mg-action="batalha-escolha" data-lado="a">${rodada.a}</button>
                <span class="batalha-vs">VS</span>
                <button class="batalha-opt" data-mg-action="batalha-escolha" data-lado="b">${rodada.b}</button>
            </div>
        `;
    }

    const minhasTags = jogo.rodadas.map(function (r, i) {
        return estadoBatalha.escolhas[i] === "a" ? r.a : r.b;
    });

    const botTags = sessaoJogo.ativa
        ? jogo.rodadas.map(function (r, i) {
            return estadoBatalha.botEscolhas[i] === "a" ? r.a : r.b;
        })
        : [];

    const totalRodadas = jogo.rodadas.length;
    const rodadasComparaveis = Math.min(estadoBatalha.escolhas.length, estadoBatalha.botEscolhas.length);
    const matches = rodadasComparaveis > 0
        ? jogo.rodadas.slice(0, rodadasComparaveis).filter(function (_, i) {
            return estadoBatalha.escolhas[i] === estadoBatalha.botEscolhas[i];
        }).length
        : 0;
    const compatibilidade = rodadasComparaveis > 0 ? Math.round((matches / rodadasComparaveis) * 100) : 0;

    return `
        <div class="batalha-resultado-dual">
            <div class="batalha-perfil">
                <span class="batalha-perfil-label">🧑 Você</span>
                <div class="batalha-tags">${minhasTags.map(function (t) { return `<span>${t}</span>`; }).join("")}</div>
            </div>
            ${sessaoJogo.ativa
            ? `<div class="batalha-perfil">
                       <span class="batalha-perfil-label">🤖 ${sessaoJogo.match.nome}</span>
                       <div class="batalha-tags">${botTags.map(function (t) { return `<span>${t}</span>`; }).join("")}</div>
                   </div>`
            : ""}
        </div>
        ${sessaoJogo.ativa && estadoBatalha.botEscolhas.length >= totalRodadas
            ? `<div class="batalha-compat">
                   <span class="batalha-compat-label">🧬 Compatibilidade</span>
                   <div class="batalha-compat-barra">
                       <div class="batalha-compat-preenchimento" style="width:${compatibilidade}%"></div>
                   </div>
                   <span class="batalha-compat-valor">${compatibilidade}%</span>
               </div>`
            : sessaoJogo.ativa && estadoBatalha.botEscolhas.length < totalRodadas
                ? `<p class="text-muted text-center mt-3" style="font-size:0.85rem;">🤖 ${sessaoJogo.match.nome} ainda está escolhendo...</p>`
                : ""}
        <div class="d-grid gap-2 mt-3">
            <button class="btn btn-match-primary" data-mg-action="enviar">
                <i class="bi bi-send"></i> Compartilhar perfil
            </button>
            <button class="btn btn-match-outline" data-mg-action="batalha-restart">
                <i class="bi bi-arrow-counterclockwise"></i> Jogar de novo
            </button>
        </div>
    `;
}

function renderHTMLEmojiQuiz(jogo) {
    if (estadoEQ.atual >= jogo.perguntas.length) {
        const botMsg = sessaoJogo.ativa
            ? `
            <div class="eq-fim"><strong>Quiz encerrado!</strong></div>
            <div class="eq-placar">
                <div class="eq-placar-jogador">
                    ${MatchConnectApp.avatarHtml("V")}
                    <strong>Você</strong>
                    <span class="eq-placar-num">${estadoEQ.acertosUsuario}</span>
                </div>
                <div class="eq-placar-vs">X</div>
                <div class="eq-placar-jogador">
                    ${MatchConnectApp.avatarHtml(sessaoJogo.match.inicial)}
                    <strong>${sessaoJogo.match.nome}</strong>
                    <span class="eq-placar-num">${estadoEQ.botAcertos}</span>
                </div>
            </div>`
            : `<div class="eq-fim">
                   <strong>Quiz encerrado!</strong>
                   <p>Você acertou <strong>${estadoEQ.acertosUsuario}</strong> de ${jogo.perguntas.length}</p>
               </div>`;

        return `
            ${botMsg}
            <div class="d-grid gap-2 mt-3">
                <button class="btn btn-match-primary" data-mg-action="enviar">
                    <i class="bi bi-send"></i> Desafiar match
                </button>
                <button class="btn btn-match-outline" data-mg-action="eq-restart">
                    <i class="bi bi-arrow-counterclockwise"></i> Recomeçar
                </button>
            </div>
        `;
    }

    const q = jogo.perguntas[estadoEQ.atual];
    const feedbackHtml = estadoEQ.acertou === true
        ? `<div class="eq-feedback eq-feedback-certo">✅ Correto! <span>${q.resposta}</span></div>`
        : estadoEQ.acertou === false
            ? `<div class="eq-feedback eq-feedback-erro">❌ Errado! A resposta era <span>${q.resposta}</span></div>`
            : estadoEQ.revelado
                ? `<div class="eq-resposta">${q.resposta}</div>`
                : "";

    const podeProximo = estadoEQ.acertou === true || estadoEQ.revelado;
    const acoesHtml = estadoEQ.acertou === null && !estadoEQ.revelado
        ? `
            <div class="eq-palpite">
                <input class="eq-input" type="text" id="eqPalpiteInput" placeholder="Digite sua resposta..." value="${estadoEQ.palpite}" autocomplete="off">
                <button class="btn btn-match-primary" data-mg-action="eq-confirmar">Confirmar</button>
            </div>
            <button class="btn btn-match-outline w-100" data-mg-action="eq-reveal">Revelar resposta</button>`
        : "";

    const btnProximo = podeProximo
        ? `<button class="btn btn-match-primary w-100 mt-2" data-mg-action="${estadoEQ.atual < jogo.perguntas.length - 1 ? "eq-next" : "eq-done"}">
               ${estadoEQ.atual < jogo.perguntas.length - 1 ? "Próxima →" : "Ver resultado"}
           </button>`
        : "";

    const botMsg = sessaoJogo.ativa && estadoEQ.botAcertos > 0
        ? `<p class="eq-bot-score-small">🤖 ${sessaoJogo.match.nome} acertou ${estadoEQ.botAcertos} perguntas até agora</p>`
        : "";

    return `
        <div class="eq-progress">Pergunta ${estadoEQ.atual + 1} de ${jogo.perguntas.length}</div>
        <div class="eq-emojis">${q.emojis}</div>
        <p class="eq-dica">💡 ${q.dica}</p>
        ${feedbackHtml}
        ${acoesHtml}
        ${btnProximo}
        ${botMsg}
        <button class="btn btn-match-outline w-100 mt-2" data-mg-action="enviar">
            <i class="bi bi-send"></i> Desafiar match
        </button>
    `;
}

function textoParaEnviar() {
    const jogo = miniGameSelecionado;
    const nome = sessaoJogo.ativa ? sessaoJogo.match.nome : (matchSelecionado ? matchSelecionado.nome : "Match");

    switch (jogo.tipo) {
        case "duas-verdades": {
            if (estado2V1M.fase !== "resultado") return null;
            let texto = `${nome}, no Duas Verdades e Uma Mentira:\n\n`;
            texto += `Minhas afirmações:\n`;
            estado2V1M.minhasAfirmacoes.forEach(function (a, i) {
                texto += `  ${i + 1}. ${a}${i === estado2V1M.minhaMentira ? " (MENTIRA)" : ""}\n`;
            });
            if (sessaoJogo.ativa && estado2V1M.botAfirmacoes.length > 0) {
                texto += `\nAfirmações de ${nome}:\n`;
                estado2V1M.botAfirmacoes.forEach(function (a, i) {
                    texto += `  ${i + 1}. ${a}${i === estado2V1M.botMentira ? " (MENTIRA)" : ""}\n`;
                });
                texto += `\nEu ${estado2V1M.acertei ? "acertei" : "errei"} a mentira de ${nome}!`;
            }
            return texto;
        }
        case "nunca-nunca": {
            if (estadoNN.marcados.size === 0) {
                return `${nome}, vamos jogar Nunca Nunca? Marque o que você já fez e manda pra mim!`;
            }
            const feitos = jogo.afirmacoes.filter(function (_, i) { return estadoNN.marcados.has(i); });
            const botFeitos = sessaoJogo.ativa
                ? jogo.afirmacoes.filter(function (_, i) { return estadoNN.botMarcados.has(i); })
                : [];
            let texto = `${nome}, no Nunca Nunca já fiz: ${feitos.join("; ")}.`;
            if (botFeitos.length > 0) texto += ` ${nome} já fez: ${botFeitos.join("; ")}.`;
            texto += " E você?";
            return texto;
        }
        case "batalha": {
            if (estadoBatalha.escolhas.length === 0) return `${nome}, bora jogar A vs B? Cada um escolhe e compara!`;
            const tags = jogo.rodadas.map(function (r, i) {
                return estadoBatalha.escolhas[i] === "a" ? r.a : r.b;
            }).filter(Boolean);
            const botTags = sessaoJogo.ativa
                ? jogo.rodadas.map(function (r, i) {
                    return estadoBatalha.botEscolhas[i] === "a" ? r.a : r.b;
                }).filter(Boolean)
                : [];
            let texto = `${nome}, no A vs B escolhi: ${tags.join(", ")}.`;
            if (botTags.length > 0) texto += ` ${nome} escolheu: ${botTags.join(", ")}.`;
            return texto;
        }
        case "emoji-quiz": {
            if (estadoEQ.atual >= jogo.perguntas.length) {
                return `${nome}, consegue acertar os emojis quiz? ${jogo.perguntas.map(function (p) { return p.emojis; }).join(" / ")}`;
            }
            const q = jogo.perguntas[estadoEQ.atual];
            return `${nome}, consegue adivinhar? ${q.emojis} — Dica: ${q.dica}`;
        }
        default:
            return null;
    }
}

function renderizarJogoAtivo() {
    const area = document.getElementById("miniGameArea");
    const kicker = document.getElementById("miniGameKicker");
    const titulo = document.getElementById("miniGameTitulo");
    const jogo = miniGameSelecionado;

    titulo.textContent = jogo.titulo;

    const partnerBanner = sessaoJogo.ativa
        ? `<div class="mini-game-partner">🤖 Jogando com <strong>${sessaoJogo.match.nome}</strong></div>`
        : "";

    let ConteudoHtml = "";
    const partnerTag = sessaoJogo.ativa
        ? ` — com ${sessaoJogo.match.nome}`
        : "";

    switch (jogo.tipo) {
        case "duas-verdades":
            if (sessaoJogo.ativa && estado2V1M.fase === "criar") {
                estado2V1M.fase = "recebendo";
                botJogar2V1M();
                setTimeout(function () {
                    estado2V1M.fase = "adivinhar";
                    renderizarJogoAtivo();
                }, 1200);
            }
            kicker.textContent = (
                estado2V1M.fase === "criar" ? "Crie suas afirmações" :
                    estado2V1M.fase === "recebendo" ? "Mensagem recebida" :
                        estado2V1M.fase === "adivinhar" ? "Adivinhe a mentira" :
                            estado2V1M.fase === "adivinhar-feedback" ? (estado2V1M.acertei ? "Você acertou!" : "Você errou!") :
                                "Resultado"
            ) + partnerTag;
            ConteudoHtml = renderHTMLDuasVerdades(jogo);
            break;
        case "nunca-nunca":
            kicker.textContent = "Marque os seus" + partnerTag;
            ConteudoHtml = renderHTMLNuncaNunca(jogo);
            break;
        case "batalha":
            kicker.textContent = (estadoBatalha.rodada < jogo.rodadas.length
                ? `Rodada ${estadoBatalha.rodada + 1} de ${jogo.rodadas.length}`
                : "Resultado") + partnerTag;
            ConteudoHtml = renderHTMLBatalha(jogo);
            break;
        case "emoji-quiz":
            kicker.textContent = `Pergunta ${Math.min(estadoEQ.atual + 1, jogo.perguntas.length)} de ${jogo.perguntas.length}` + partnerTag;
            ConteudoHtml = renderHTMLEmojiQuiz(jogo);
            break;
        default:
            ConteudoHtml = `<p class="text-muted">${jogo.descricao}</p>`;
    }

    area.innerHTML = partnerBanner + ConteudoHtml;
}

function renderizarMiniGames() {
    document.getElementById("miniGameList").innerHTML = miniGames.map(function (game, index) {
        return `
            <button class="mini-game-card ${miniGameSelecionado.titulo === game.titulo ? "selected" : ""}" type="button" data-mini-index="${index}">
                <i class="bi ${game.icone}"></i>
                <strong>${game.titulo}</strong>
                <span>${game.descricao}</span>
            </button>
        `;
    }).join("");

    renderizarJogoAtivo();
}

document.querySelectorAll("[data-tab-target]").forEach(function (botao) {
    botao.addEventListener("click", function () {
        ativarAba(botao.dataset.tabTarget);
    });
});

document.getElementById("arenaMatches").addEventListener("click", function (event) {
    const botao = event.target.closest("[data-action]");
    if (!botao) return;

    const match = perfisBase.find(function (perfil) {
        return perfil.nome === botao.dataset.match;
    });
    if (!match) return;

    matchSelecionado = match;

    if (botao.dataset.action === "play") {
        iniciarPartida(match);
        return;
    }

    if (botao.dataset.action === "leave") {
        encerrarPartida();
        return;
    }

    if (botao.dataset.action === "invite") {
        enviarMensagem(match, montarConvite(match), "convite-play");
        document.getElementById("arenaStatus").textContent = `Convite enviado para ${match.nome}`;
    }

    renderizarArena();
    renderizarEROSPlay();
});

document.getElementById("erosPlayActions").addEventListener("click", function (event) {
    const botao = event.target.closest("[data-eros-play]");
    if (!botao) return;

    if (botao.dataset.erosPlay === "start" && sessaoJogo.match) {
        resetarEstadoJogo();
        sortearBotNN();
        ativarAba("minigames");
        renderizarMiniGames();
        return;
    }

    if (botao.dataset.erosPlay === "leave") {
        encerrarPartida();
        return;
    }

    if (!matchSelecionado) return;

    localStorage.setItem("conversaAberta", matchSelecionado.nome);
    if (botao.dataset.erosPlay === "send") {
        enviarMensagem(matchSelecionado, montarConvite(matchSelecionado), "convite-play");
        document.getElementById("arenaStatus").textContent = `Convite enviado para ${matchSelecionado.nome}`;
    }
});

document.getElementById("formPreferenciasPlay").addEventListener("submit", function (event) {
    event.preventDefault();

    preferencias.plataforma = document.getElementById("playPlataforma").value;
    preferencias.estilo = document.getElementById("playEstilo").value;
    preferencias.comunicacao = document.getElementById("playComunicacao").value;
    preferencias.horario = document.getElementById("playHorario").value;
    preferencias.jogos = document.getElementById("playJogos").value.trim() || preferenciasPadrao.jogos;

    MatchConnectApp.setJson("preferenciasPlayMatchConnect", preferencias);
    document.getElementById("statusPreferenciasPlay").textContent = "Preferências salvas. A arena foi recalculada.";
    renderizarArena();
    renderizarEROSPlay();
    renderizarFilasOnline();
});

document.getElementById("filaPlayOnline").addEventListener("click", function (event) {
    const card = event.target.closest("[data-queue]");
    if (!card) return;

    filaSelecionada = card.dataset.queue;
    localStorage.setItem("filaPlayMatchConnect", filaSelecionada);
    document.getElementById("statusPreferenciasPlay").textContent = "Fila selecionada. EROS vai priorizar matches com esse ritmo de jogo.";
    renderizarFilasOnline();
});

document.getElementById("miniGameList").addEventListener("click", function (event) {
    const card = event.target.closest("[data-mini-index]");
    if (!card) return;

    const novo = miniGames[Number(card.dataset.miniIndex)];
    if (!novo || novo.titulo === miniGameSelecionado.titulo) return;

    miniGameSelecionado = novo;
    resetarEstadoJogo();
    if (novo.tipo === "nunca-nunca") sortearBotNN();
    renderizarMiniGames();
});

document.getElementById("btnNovoMiniGame").addEventListener("click", function () {
    const idx = miniGames.indexOf(miniGameSelecionado);
    miniGameSelecionado = miniGames[(idx + 1) % miniGames.length];
    resetarEstadoJogo();
    if (miniGameSelecionado.tipo === "nunca-nunca") sortearBotNN();
    renderizarMiniGames();
});

document.getElementById("miniGameArea").addEventListener("click", function (event) {
    const jogo = miniGameSelecionado;

    const palpiteBtn = event.target.closest("[data-dv-palpite]");
    if (palpiteBtn && jogo.tipo === "duas-verdades") {
        estado2V1M.meuPalpite = Number(palpiteBtn.dataset.dvPalpite);
        renderizarJogoAtivo();
        return;
    }

    const mentiraBtn = event.target.closest("[data-dv-mentira]");
    if (mentiraBtn && jogo.tipo === "duas-verdades") {
        estado2V1M.minhaMentira = Number(mentiraBtn.dataset.dvMentira);
        renderizarJogoAtivo();
        return;
    }

    const btn = event.target.closest("[data-mg-action]");
    if (!btn) return;

    const action = btn.dataset.mgAction;

    if (action === "dv-confirmar") {
        const inputs = document.querySelectorAll("#miniGameArea .dv-input");
        inputs.forEach(function (inp) {
            estado2V1M.minhasAfirmacoes[Number(inp.dataset.dvIdx)] = inp.value;
        });
        if (estado2V1M.minhasAfirmacoes.every(function (v) { return v.trim() !== ""; }) && estado2V1M.minhaMentira >= 0) {
            estado2V1M.minhasProntas = true;
            if (sessaoJogo.ativa) {
                estado2V1M.botPalpite = Math.floor(Math.random() * 3);
            }
            estado2V1M.fase = "resultado";
            renderizarJogoAtivo();
        }
    } else if (action === "dv-palpite") {
        if (estado2V1M.meuPalpite < 0) return;
        estado2V1M.acertei = estado2V1M.meuPalpite === estado2V1M.botMentira;
        if (sessaoJogo.ativa) {
            estado2V1M.fase = "adivinhar-feedback";
            renderizarJogoAtivo();
            setTimeout(function () {
                estado2V1M.fase = "criar";
                renderizarJogoAtivo();
            }, 1400);
        } else {
            estado2V1M.fase = "resultado";
            renderizarJogoAtivo();
        }
    } else if (action === "nn-toggle") {
        if (jogo.tipo !== "nunca-nunca") return;
        const indice = Number(btn.dataset.nn);
        if (!Number.isInteger(indice)) return;
        if (estadoNN.marcados.has(indice)) {
            estadoNN.marcados.delete(indice);
        } else {
            estadoNN.marcados.add(indice);
        }
        renderizarJogoAtivo();
    } else if (action === "nn-restart") {
        estadoNN.marcados.clear();
        if (sessaoJogo.ativa) {
            sortearBotNN();
        }
        renderizarJogoAtivo();
    } else if (action === "batalha-escolha") {
        estadoBatalha.escolhas.push(btn.dataset.lado);
        estadoBatalha.rodada++;
        renderizarJogoAtivo();
        if (sessaoJogo.ativa && estadoBatalha.rodada <= jogo.rodadas.length) {
            setTimeout(function () {
                botJogarBatalha();
                renderizarJogoAtivo();
            }, 400);
        }
    } else if (action === "batalha-restart") {
        estadoBatalha.rodada = 0;
        estadoBatalha.escolhas = [];
        estadoBatalha.botEscolhas = [];
        renderizarJogoAtivo();
    } else if (action === "eq-reveal") {
        estadoEQ.revelado = true;
        estadoEQ.acertou = null;
        renderizarJogoAtivo();
        if (sessaoJogo.ativa) {
            setTimeout(function () {
                botJogarEQ(jogo);
                renderizarJogoAtivo();
            }, 400);
        }
    } else if (action === "eq-confirmar") {
        const input = document.getElementById("eqPalpiteInput");
        if (!input) return;
        const palpite = input.value.trim().toLowerCase();
        const resposta = jogo.perguntas[estadoEQ.atual].resposta.toLowerCase();
        estadoEQ.palpite = input.value;
        estadoEQ.acertou = palpite === resposta;
        estadoEQ.revelado = true;
        if (estadoEQ.acertou) estadoEQ.acertosUsuario++;
        renderizarJogoAtivo();
        if (sessaoJogo.ativa) {
            setTimeout(function () {
                botJogarEQ(jogo);
                renderizarJogoAtivo();
            }, 500);
        }
    } else if (action === "eq-next") {
        estadoEQ.atual++;
        estadoEQ.revelado = false;
        estadoEQ.palpite = "";
        estadoEQ.acertou = null;
        renderizarJogoAtivo();
        if (sessaoJogo.ativa) {
            setTimeout(function () {
                botJogarEQ(jogo);
                renderizarJogoAtivo();
            }, 300);
        }
    } else if (action === "eq-done") {
        estadoEQ.atual = jogo.perguntas.length;
        if (sessaoJogo.ativa) {
            for (let i = estadoEQ.botAcertos; i < jogo.perguntas.length; i++) {
                if (Math.random() > 0.55) estadoEQ.botAcertos++;
            }
            renderizarJogoAtivo();
        }
        renderizarJogoAtivo();
    } else if (action === "eq-restart") {
        estadoEQ.atual = 0;
        estadoEQ.revelado = false;
        estadoEQ.palpite = "";
        estadoEQ.acertou = null;
        estadoEQ.botAcertos = 0;
        estadoEQ.acertosUsuario = 0;
        renderizarJogoAtivo();
    } else if (action === "enviar") {
        const texto = textoParaEnviar();
        if (!texto) return;
        const alvo = sessaoJogo.ativa ? sessaoJogo.match : matchSelecionado;
        if (!alvo) {
            document.getElementById("miniGameKicker").textContent = "Selecione um match na Arena!";
            return;
        }
        enviarMensagem(alvo, texto, "mini-game");
        window.location.href = "../Conversas/Conversas.html";
    }
});

document.getElementById("miniGameArea").addEventListener("input", function (event) {
    const inp = event.target.closest(".dv-input");
    if (!inp) return;
    estado2V1M.minhasAfirmacoes[Number(inp.dataset.dvIdx)] = inp.value;
});

preencherPreferencias();
renderizarArena();
renderizarEROSPlay();
renderizarFilasOnline();
renderizarMiniGames();
