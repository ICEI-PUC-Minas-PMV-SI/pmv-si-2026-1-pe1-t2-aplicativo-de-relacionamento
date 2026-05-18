MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const TEMPO_FRASE_INTRO = 2000;
const TEMPO_FEEDBACK_RESPOSTA = 1250;

const perfis = MatchConnectApp.perfisOrdenados().slice(0, 4);

const estado = {
    rodada: 0,
    sinal: 0,
    respostas: [],
    iniciado: false,
    aguardando: false,
    introIntervalo: null
};

const aberturaEROS = [
    "Você está cansado de conversas que morrem no 'oi, tudo bem?'",
    "Todos os dias, estranhos se tornam inseparáveis...",
    "E pessoas inseparáveis voltam a ser estranhas.",
    "O mundo muda constantemente.",
    "As pessoas também.",
    "Então me deixe entender o que realmente cria conexão em você.",
    "Vamos começar."
];

const rodadas = [
    {
        titulo: "Rodada 1 - Primeiras conexões",
        descricao: "EROS observa como você permite que uma conversa deixe de ser protocolo e vire presença.",
        pergunta: "Qual conversa faria você esquecer o celular na mesa por horas?",
        comentario: "Interessante. O primeiro sinal revela o tipo de porta que você abre para alguém entrar.",
        opcoes: [
            { icone: "bi-camera-reels", texto: "Filmes que marcaram sua infância", tag: "Memória afetiva", eixo: "cultura", valor: "Cinema emocional" },
            { icone: "bi-globe-americas", texto: "Viagens que mudaram sua visão", tag: "Expansão", eixo: "exploracao", valor: "Viagens culturais" },
            { icone: "bi-cup-hot", texto: "Cafés escondidos da cidade", tag: "Intimidade leve", eixo: "encontro", valor: "Cafés tranquilos" },
            { icone: "bi-music-note-beamed", texto: "Música para ouvir de madrugada", tag: "Atmosfera", eixo: "musica", valor: "Energia noturna" }
        ]
    },
    {
        titulo: "Rodada 2 - Universo cultural",
        descricao: "Cultura é um mapa discreto: mostra humor, memória, ritmo e linguagem.",
        pergunta: "Se alguém entrasse no seu universo por uma obra, qual porta você abriria?",
        comentario: "Alta compatibilidade cultural detectada. Você escolhe símbolos antes de escolher respostas prontas.",
        opcoes: [
            { icone: "bi-vinyl", texto: "Uma playlist com faixas que explicam fases da sua vida", tag: "Som e identidade", eixo: "musica", valor: "Playlists pessoais" },
            { icone: "bi-book", texto: "Um livro que mudou seu jeito de pensar", tag: "Profundidade", eixo: "profundidade", valor: "Leitura reflexiva" },
            { icone: "bi-tv", texto: "Uma série que você defenderia numa conversa longa", tag: "Narrativa", eixo: "cultura", valor: "Séries marcantes" },
            { icone: "bi-controller", texto: "Um jogo ou experiência interativa que revela seu humor", tag: "Lúdico", eixo: "hobbies", valor: "Jogos e humor" }
        ]
    },
    {
        titulo: "Rodada 3 - Energia social",
        descricao: "EROS mede seu ritmo: velocidade, presença, silêncio e disponibilidade emocional.",
        pergunta: "Em um grupo novo, como sua conexão costuma nascer?",
        comentario: "Talvez você valorize mais timing do que volume. Nem toda presença precisa gritar.",
        opcoes: [
            { icone: "bi-chat-dots", texto: "Puxo uma conversa leve até encontrar um ponto real", tag: "Abertura suave", eixo: "conversa", valor: "Conversa gradual" },
            { icone: "bi-stars", texto: "Observo primeiro, depois entro com precisão", tag: "Observador", eixo: "energia", valor: "Energia reservada" },
            { icone: "bi-lightning-charge", texto: "Entro rápido quando percebo bom humor", tag: "Espontâneo", eixo: "energia", valor: "Energia expansiva" },
            { icone: "bi-moon-stars", texto: "Prefiro conversas menores, menos barulho e mais verdade", tag: "Profundo", eixo: "profundidade", valor: "Baixa pressão" }
        ]
    },
    {
        titulo: "Rodada 4 - Sintonia emocional",
        descricao: "A conexão real aparece quando alguém entende o que você não explica de primeira.",
        pergunta: "O que faz você sentir que uma pessoa realmente te percebeu?",
        comentario: "Você parece valorizar conexões mais profundas. A resposta não foi sobre atenção; foi sobre leitura.",
        opcoes: [
            { icone: "bi-eye", texto: "Ela lembra de um detalhe pequeno que eu contei sem dar importância", tag: "Atenção", eixo: "profundidade", valor: "Detalhes emocionais" },
            { icone: "bi-emoji-smile", texto: "Ela entende meu humor sem eu precisar explicar", tag: "Humor social", eixo: "humor", valor: "Humor inteligente" },
            { icone: "bi-heart-pulse", texto: "Ela sabe quando aprofundar e quando deixar leve", tag: "Ritmo emocional", eixo: "energia", valor: "Equilíbrio emocional" },
            { icone: "bi-compass", texto: "Ela transforma planos simples em experiências memoráveis", tag: "Experiência", eixo: "encontro", valor: "Experiências compartilhadas" }
        ]
    },
    {
        titulo: "Rodada Final - Compatibilidade real",
        descricao: "O último cenário combina cultura, presença e intenção. Aqui o EROS procura sintonia humana.",
        pergunta: "Qual cenário teria mais chance de virar uma conexão real para você?",
        comentario: "Leitura final recebida. Você não está escolhendo um encontro; está escolhendo um tipo de vínculo.",
        opcoes: [
            { icone: "bi-cup-hot", texto: "Café demorado, assunto imprevisível e zero pressa", tag: "Conversas profundas", eixo: "conversa", valor: "Conexão por conversa" },
            { icone: "bi-music-note-list", texto: "Troca de músicas, memórias e histórias de madrugada", tag: "Intensidade cultural", eixo: "musica", valor: "Sintonia musical" },
            { icone: "bi-map", texto: "Descobrir um lugar novo e criar uma memória juntos", tag: "Exploração", eixo: "exploracao", valor: "Presença em movimento" },
            { icone: "bi-film", texto: "Assistir algo marcante e conversar sobre o que ficou depois", tag: "Narrativa emocional", eixo: "cultura", valor: "Cinema e reflexão" }
        ]
    }
];

const perguntasRelampago = [
    {
        pergunta: "Qual música entregaria seu humor de hoje?",
        sugestao: "Música é um atalho emocional. Uma resposta boa aqui revela ritmo, fase e clima social."
    },
    {
        pergunta: "Qual filme você usaria para puxar assunto sem parecer óbvio?",
        sugestao: "Filmes mostram memória, humor e repertório. EROS usaria essa resposta para sugerir conversas culturais."
    },
    {
        pergunta: "Qual lugar da cidade combina com uma conversa honesta?",
        sugestao: "Lugares revelam estilo de encontro: movimento, calma, intimidade ou descoberta."
    },
    {
        pergunta: "Que detalhe faz você perceber que existe química?",
        sugestao: "Química aparece nos detalhes: timing, humor, atenção e leitura emocional."
    },
    {
        pergunta: "Qual livro, série ou playlist você gostaria que alguém conhecesse para te entender melhor?",
        sugestao: "Essa resposta vira um sinal forte para matches com afinidade cultural."
    }
];

const elementos = {
    intro: document.getElementById("introCinematica"),
    introLine: document.getElementById("introLine"),
    pergunta: document.getElementById("perguntaQuiz"),
    opcoes: document.getElementById("opcoesQuiz"),
    feedback: document.getElementById("feedbackQuiz"),
    status: document.getElementById("statusJogo"),
    rodada: document.getElementById("rodadaQuiz"),
    sinal: document.getElementById("pontuacaoJogo"),
    jogadores: document.getElementById("jogadoresSala"),
    roundLabel: document.getElementById("roundLabel"),
    roundDescription: document.getElementById("roundDescription"),
    resultado: document.getElementById("resultadoSocial"),
    resultadoTitulo: document.getElementById("resultadoTitulo"),
    resultadoResumo: document.getElementById("resultadoResumo"),
    resultadoTags: document.getElementById("resultadoTags"),
    perguntaRelampago: document.getElementById("perguntaQuebraGelo"),
    btnIniciarQuiz: document.getElementById("btnIniciarQuiz"),
    btnNovaPerguntaJogo: document.getElementById("btnNovaPerguntaJogo"),
    btnResponderQuebraGelo: document.getElementById("btnResponderQuebraGelo"),
    btnReiniciarExperiencia: document.getElementById("btnReiniciarExperiencia"),
    btnPularIntro: document.getElementById("btnPularIntro")
};

function validarElementosObrigatorios() {
    return Object.entries(elementos).every(function ([nome, elemento]) {
        if (!elemento) {
            console.error(`Elemento não encontrado no HTML: ${nome}`);
            return false;
        }

        return true;
    });
}

function registrarQuizEROS() {
    let stats = {};

    try {
        stats = JSON.parse(localStorage.getItem("erosPetStats")) || {};
    } catch (error) {
        stats = {};
    }

    stats.quizzes = (stats.quizzes || 0) + 1;
    localStorage.setItem("erosPetStats", JSON.stringify(stats));
}

function renderizarJogadores() {
    elementos.jogadores.innerHTML = perfis.map(function (perfil, index) {
        const status = index === 0 ? "sincronizando sinais" : "observando rodada";

        return `
            <div class="game-player">
                ${MatchConnectApp.avatarHtml(perfil.inicial)}
                <span>
                    <strong>${perfil.nome}</strong>
                    <small>${perfil.percentual}% compatível - ${status}</small>
                </span>
            </div>
        `;
    }).join("");
}

function atualizarPainel() {
    const rodadaVisivel = estado.iniciado
        ? Math.min(estado.rodada + 1, rodadas.length)
        : 0;

    elementos.rodada.textContent = `${rodadaVisivel}/${rodadas.length}`;
    elementos.sinal.textContent = `${Math.min(100, estado.sinal)}%`;
}

function esconderIntro() {
    elementos.intro.classList.remove("show");
    elementos.intro.classList.add("d-none");
    elementos.intro.style.display = "none";
    elementos.intro.style.pointerEvents = "none";
    elementos.intro.setAttribute("aria-hidden", "true");
}

function mostrarIntro(callback) {
    let indice = 0;
    let finalizado = false;

    function concluirIntro() {
        if (finalizado) return;

        finalizado = true;

        if (estado.introIntervalo) {
            window.clearInterval(estado.introIntervalo);
            estado.introIntervalo = null;
        }

        esconderIntro();

        if (typeof callback === "function") {
            callback();
        }
    }

    if (estado.introIntervalo) {
        window.clearInterval(estado.introIntervalo);
    }

    elementos.intro.classList.remove("d-none");
    elementos.intro.classList.add("show");
    elementos.intro.style.display = "flex";
    elementos.intro.style.pointerEvents = "auto";
    elementos.intro.setAttribute("aria-hidden", "false");
    elementos.introLine.textContent = aberturaEROS[indice];
    elementos.btnPularIntro.onclick = concluirIntro;

    estado.introIntervalo = window.setInterval(function () {
        indice += 1;

        if (indice >= aberturaEROS.length) {
            concluirIntro();
            return;
        }

        elementos.introLine.style.animation = "none";
        void elementos.introLine.offsetWidth;
        elementos.introLine.textContent = aberturaEROS[indice];
        elementos.introLine.style.animation = "";
    }, TEMPO_FRASE_INTRO);
}

function renderizarRodada() {
    const rodadaAtual = rodadas[estado.rodada];

    if (!rodadaAtual) {
        finalizarExperiencia();
        return;
    }

    elementos.resultado.classList.add("d-none");
    elementos.opcoes.classList.remove("d-none");
    elementos.opcoes.style.display = "grid";

    elementos.roundLabel.textContent = rodadaAtual.titulo;
    elementos.roundDescription.textContent = rodadaAtual.descricao;
    elementos.pergunta.textContent = rodadaAtual.pergunta;
    elementos.feedback.textContent = "EROS está ouvindo padrões, pausas e preferências sociais.";
    elementos.status.textContent = "Leitura em andamento";

    elementos.opcoes.innerHTML = rodadaAtual.opcoes.map(function (opcao, index) {
        return `
            <button class="quiz-option" type="button" data-index="${index}">
                <span class="option-icon"><i class="bi ${opcao.icone}"></i></span>
                <span class="option-title">${opcao.texto}</span>
                <span class="option-meta">${opcao.tag}</span>
            </button>
        `;
    }).join("");

    atualizarPainel();

    const primeiraOpcao = elementos.opcoes.querySelector(".quiz-option");
    if (primeiraOpcao) {
        primeiraOpcao.focus({ preventScroll: true });
    }

    document.querySelector(".game-stage-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function iniciarQuiz() {
    estado.rodada = 0;
    estado.sinal = 0;
    estado.respostas = [];
    estado.iniciado = true;
    estado.aguardando = false;

    elementos.resultado.classList.add("d-none");
    elementos.opcoes.classList.add("d-none");
    elementos.opcoes.style.display = "none";

    elementos.status.textContent = "Abertura cinematográfica";
    elementos.roundLabel.textContent = "Transmissão iniciada";
    elementos.pergunta.textContent = "EROS está abrindo a experiência.";
    elementos.roundDescription.textContent = "A primeira rodada começará automaticamente após a introdução.";
    elementos.feedback.textContent = "EROS está calibrando sinais de afinidade.";
    elementos.btnIniciarQuiz.innerHTML = '<i class="bi bi-arrow-clockwise"></i> Reiniciar experiência';

    atualizarPainel();

    mostrarIntro(function () {
        renderizarRodada();
    });
}

function interpretarResposta(opcao, botao) {
    if (estado.aguardando || !estado.iniciado) return;

    const rodadaAtual = rodadas[estado.rodada];

    estado.aguardando = true;
    estado.sinal += 18 + estado.rodada * 2;

    estado.respostas.push({
        rodada: rodadaAtual.titulo,
        pergunta: rodadaAtual.pergunta,
        eixo: opcao.eixo,
        valor: opcao.valor,
        tag: opcao.tag
    });

    botao.classList.add("selected");
    elementos.feedback.textContent = rodadaAtual.comentario;
    elementos.status.textContent = "EROS interpretando resposta";

    atualizarPainel();

    window.setTimeout(function () {
        estado.rodada += 1;
        estado.aguardando = false;
        renderizarRodada();
    }, TEMPO_FEEDBACK_RESPOSTA);
}

function contarEixos() {
    return estado.respostas.reduce(function (mapa, resposta) {
        mapa[resposta.eixo] = (mapa[resposta.eixo] || 0) + 1;
        return mapa;
    }, {});
}

function finalizarExperiencia() {
    const eixos = contarEixos();
    const dominante = Object.keys(eixos).sort((a, b) => eixos[b] - eixos[a])[0] || "conversa";
    const valores = [...new Set(estado.respostas.map((resposta) => resposta.valor))].slice(0, 6);

    const perfisResultado = {
        cultura: "Conector cultural",
        musica: "Sintonia noturna",
        profundidade: "Intensidade emocional",
        energia: "Radar de presença",
        encontro: "Curador de experiências",
        exploracao: "Explorador afetivo",
        conversa: "Conversador magnético",
        humor: "Humor inteligente",
        hobbies: "Afinidade lúdica"
    };

    const titulo = perfisResultado[dominante] || "Conector social";

    elementos.opcoes.classList.add("d-none");
    elementos.opcoes.style.display = "none";
    elementos.resultado.classList.remove("d-none");

    elementos.roundLabel.textContent = "Leitura neural concluída";
    elementos.roundDescription.textContent = "EROS encontrou padrões de afinidade, ritmo social e linguagem emocional.";
    elementos.pergunta.textContent = "Seu DNA social foi calibrado.";
    elementos.feedback.textContent = "Você tende a criar conexão através de cultura, humor inteligente e experiências compartilhadas.";
    elementos.status.textContent = "Experiência finalizada";
    elementos.rodada.textContent = `${rodadas.length}/${rodadas.length}`;
    elementos.sinal.textContent = "100%";
    elementos.resultadoTitulo.textContent = titulo;
    elementos.resultadoResumo.textContent = "EROS conclui: você cria conexão quando existe contexto, troca real e espaço para a conversa ganhar profundidade sem parecer uma entrevista.";

    elementos.resultadoTags.innerHTML = valores.map(function (valor) {
        return `<span class="result-tag">${valor}</span>`;
    }).join("");

    localStorage.setItem("erosPetXp", String((Number(localStorage.getItem("erosPetXp")) || 0) + 12));

    localStorage.setItem("dnaSocialMatchConnect", JSON.stringify({
        titulo,
        sinais: valores,
        respostas: estado.respostas,
        atualizadoEm: new Date().toISOString(),
        origem: "Sala de Jogos"
    }));

    localStorage.setItem("modoHojeMatchConnect", "jogar");

    registrarQuizEROS();
}

function renderizarSinalRelampago() {
    const item = perguntasRelampago[Math.floor(Math.random() * perguntasRelampago.length)];

    elementos.perguntaRelampago.textContent = item.pergunta;
    elementos.roundLabel.textContent = "Sinal relâmpago";
    elementos.pergunta.textContent = item.pergunta;
    elementos.roundDescription.textContent = item.sugestao;
    elementos.feedback.textContent = `EROS interpreta: ${item.sugestao}`;
    elementos.status.textContent = "Sinal relâmpago gerado";

    elementos.resultado.classList.add("d-none");
    elementos.opcoes.classList.add("d-none");
    elementos.opcoes.style.display = "none";
}

if (validarElementosObrigatorios()) {
    elementos.btnIniciarQuiz.addEventListener("click", iniciarQuiz);

    elementos.opcoes.addEventListener("click", function (event) {
        const botao = event.target.closest(".quiz-option");
        if (!botao) return;

        const rodadaAtual = rodadas[estado.rodada];
        const opcao = rodadaAtual?.opcoes[Number(botao.dataset.index)];
        if (!opcao) return;

        interpretarResposta(opcao, botao);
    });

    elementos.btnNovaPerguntaJogo.addEventListener("click", renderizarSinalRelampago);

    elementos.btnResponderQuebraGelo.addEventListener("click", function () {
        elementos.feedback.textContent = `EROS interpreta: "${elementos.perguntaRelampago.textContent}" revela como você transforma curiosidade em abertura social.`;
        elementos.roundLabel.textContent = "Interpretação do EROS";
        elementos.pergunta.textContent = elementos.perguntaRelampago.textContent;
        elementos.roundDescription.textContent = "Essa pergunta pode virar um assunto inicial mais humano e menos genérico.";
        elementos.status.textContent = "Sinal interpretado";

        elementos.resultado.classList.add("d-none");
        elementos.opcoes.classList.add("d-none");
        elementos.opcoes.style.display = "none";
    });

    elementos.btnReiniciarExperiencia.addEventListener("click", iniciarQuiz);

    renderizarJogadores();
    atualizarPainel();
}
