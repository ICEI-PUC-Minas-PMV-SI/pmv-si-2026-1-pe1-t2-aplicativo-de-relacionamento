const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
const dadosInteresses = JSON.parse(localStorage.getItem("interessesUsuario")) || {};

// A Home só pode ser acessada depois do login.
if (!usuarioLogado) {
    window.location.href = "../Login/login.html";
}

// Perfis simulados usados na área "Descobrir". Cada objeto traz dados para card,
// cálculo de afinidade e sugestão inicial de conversa.
const perfisBase = [
    {
        nome: "Ana",
        idade: 24,
        inicial: "A",
        foto: "",
        interesses: ["Cinema", "Livros", "Gastronomia", "Viagens"],
        procura: "conversa leve e encontro tranquilo",
        programaIdeal: "cinema seguido de jantar",
        energia: "Calma e curiosa",
        frase: "Prefiro conexões que começam simples e continuam com vontade.",
        bio: "Gosta de roteiros tranquilos, bons filmes e conversas que continuam depois do primeiro assunto.",
        mensagem: "Vi que a gente combina em cinema e gastronomia. Qual foi o último lugar que te surpreendeu?"
    },
    {
        nome: "Karol",
        idade: 26,
        inicial: "K",
        foto: "",
        interesses: ["Música", "Academia", "Corrida", "Tecnologia"],
        procura: "alguém animado para conversar e sair da rotina",
        programaIdeal: "show, treino ou café depois do trabalho",
        energia: "Alta e espontânea",
        frase: "Se tiver playlist boa e assunto sincero, eu topo.",
        bio: "Curte treino, playlists novas e gente que fala de planos sem perder o bom humor.",
        mensagem: "Você prefere treino com música animada ou podcast para desligar um pouco?"
    },
    {
        nome: "Mariana",
        idade: 23,
        inicial: "M",
        foto: "",
        interesses: ["Séries", "Praia", "Pets", "Cinema"],
        procura: "conversas carinhosas e programas sem pressa",
        programaIdeal: "praia no fim da tarde",
        energia: "Doce e observadora",
        frase: "Gosto de gente que presta atenção nos detalhes pequenos.",
        bio: "Entre um episódio novo e um fim de tarde na praia, sempre encontra assunto para puxar papo.",
        mensagem: "Se você fosse escolher uma série para rever hoje, qual entraria sem pensar?"
    },
    {
        nome: "Beatriz",
        idade: 27,
        inicial: "B",
        foto: "",
        interesses: ["Viagens", "Gastronomia", "Livros", "Música"],
        procura: "companhia para descobrir lugares e histórias",
        programaIdeal: "restaurante novo ou bate-volta",
        energia: "Exploradora e bem-humorada",
        frase: "Memória boa quase sempre envolve comida, música ou estrada.",
        bio: "Acredita que conhecer pessoas também é descobrir novos lugares, sabores e ideias.",
        mensagem: "Qual viagem curta você faria de novo só pela memória boa?"
    },
    {
        nome: "Luiza",
        idade: 25,
        inicial: "L",
        foto: "",
        interesses: ["Games", "Tecnologia", "Séries", "Pets"],
        procura: "parceria para rir, jogar e conversar sem pressão",
        programaIdeal: "game cooperativo e comida em casa",
        energia: "Criativa e tranquila",
        frase: "Eu gosto quando a conversa parece fase bônus.",
        bio: "Mistura tecnologia, jogos cooperativos e conversas sinceras sem pressa.",
        mensagem: "Qual jogo ou série você recomenda para alguém que quer entrar no seu universo?"
    }
];

// Conversas simuladas exibidas no painel lateral da Home.
const conversasBase = [
    {
        nome: "Ana",
        inicial: "A",
        tempo: "2 min",
        ultima: "Adorei sua resposta sobre programa ideal.",
        interesses: ["Cinema", "Gastronomia"]
    },
    {
        nome: "Karol",
        inicial: "K",
        tempo: "18 min",
        ultima: "Me manda aquela playlist depois?",
        interesses: ["Música", "Academia"]
    },
    {
        nome: "Mariana",
        inicial: "M",
        tempo: "1 h",
        ultima: "Praia no fim de tarde é sempre uma boa.",
        interesses: ["Praia", "Séries"]
    }
];

const nomeUsuario = document.getElementById("nomeUsuario");
const resumoAfinidade = document.getElementById("resumoAfinidade");
const fotoPerfilNavbar = document.getElementById("fotoPerfilNavbar");
const fotoPerfilPrincipal = document.getElementById("fotoPerfilPrincipal");
const tituloPerfil = document.getElementById("tituloPerfil");
const descricaoUsuario = document.getElementById("descricaoUsuario");
const listaInteressesUsuario = document.getElementById("listaInteressesUsuario");
const objetivoUsuario = document.getElementById("objetivoUsuario");
const personalidadeUsuario = document.getElementById("personalidadeUsuario");
const programaIdealUsuario = document.getElementById("programaIdealUsuario");
const perfilPercentual = document.getElementById("perfilPercentual");
const barraPerfilHome = document.getElementById("barraPerfilHome");
const totalInteresses = document.getElementById("totalInteresses");
const tomConversa = document.getElementById("tomConversa");
const listaConversas = document.getElementById("listaConversas");
const buscaConversas = document.getElementById("buscaConversas");
const buscaGlobal = document.getElementById("buscaGlobal");
const sugestaoConversa = document.getElementById("sugestaoConversa");
const cardPerfilSwipe = document.getElementById("cardPerfilSwipe");
const contadorSwipe = document.getElementById("contadorSwipe");
const resultadoSwipe = document.getElementById("resultadoSwipe");
const btnRecusar = document.getElementById("btnRecusar");
const btnCurtir = document.getElementById("btnCurtir");
const btnVoltar = document.getElementById("btnVoltar");
const btnSair = document.getElementById("btnSair");
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");
const cupidoDica = document.getElementById("cupidoDica");
const cupidoAlvo = document.getElementById("cupidoAlvo");
const cupidoMensagem = document.getElementById("cupidoMensagem");
const cupidoOrb = document.querySelector(".cupid-robot");
const btnNovaDicaCupido = document.getElementById("btnNovaDicaCupido");
const btnCopiarCupido = document.getElementById("btnCopiarCupido");
const btnEnviarSugestao = document.getElementById("btnEnviarSugestao");
const listaMatchesAnimados = document.getElementById("listaMatchesAnimados");
const matchCelebration = document.getElementById("matchCelebration");
const matchCelebrationText = document.getElementById("matchCelebrationText");
const ideaActions = document.querySelectorAll(".idea-action");
const cupidoGuide = document.getElementById("cupidoGuide");
const cupidoGuideStep = document.getElementById("cupidoGuideStep");
const cupidoGuideTitle = document.getElementById("cupidoGuideTitle");
const cupidoGuideText = document.getElementById("cupidoGuideText");
const btnPularGuiaCupido = document.getElementById("btnPularGuiaCupido");
const btnProximoGuiaCupido = document.getElementById("btnProximoGuiaCupido");

let indiceSwipe = 0;
let ultimoIndice = 0;
let indiceDicaCupido = 0;
let indiceVariacaoCupido = 0;
let indiceGuiaCupido = 0;
let filtroGlobal = "";
const matchesCurtidos = [];
const matchesSalvos = JSON.parse(localStorage.getItem("matchesUsuario")) || [];

const interessesUsuario = Array.isArray(dadosInteresses.interesses) ? dadosInteresses.interesses : [];
const fotoPrincipal = dadosInteresses.fotos && dadosInteresses.fotos.length > 0
    ? dadosInteresses.fotos[0]
    : "../../assets/img/MatchConnectLOGO.PNG";

// Calcula compatibilidade usando interesses em comum e dados preenchidos no cadastro.
function calcularCompatibilidade(perfil) {
    const interessesEmComum = perfil.interesses.filter(function (interesse) {
        return interessesUsuario.includes(interesse);
    });

    const base = interessesUsuario.length > 0 ? 58 : 42;
    const bonusInteresses = interessesEmComum.length * 11;
    const bonusObjetivo = dadosInteresses.objetivo ? 7 : 0;

    return {
        interessesEmComum: interessesEmComum,
        percentual: Math.min(98, base + bonusInteresses + bonusObjetivo)
    };
}

// Ordena os perfis para mostrar primeiro quem combina mais com o usuário.
function ordenarPerfisPorAfinidade() {
    return perfisBase
        .map(function (perfil) {
            const compatibilidade = calcularCompatibilidade(perfil);
            return {
                ...perfil,
                interessesEmComum: compatibilidade.interessesEmComum,
                percentual: compatibilidade.percentual
            };
        })
        .sort(function (a, b) {
            return b.percentual - a.percentual;
        });
}

let perfisDescoberta = ordenarPerfisPorAfinidade();

// Frases gerais do Cupido. A mensagem final também considera o perfil selecionado.
const dicasCupido = [
    "Comece pelo ponto em comum e faça uma pergunta simples. Isso deixa a conversa leve e fácil de responder.",
    "Evite abrir com elogio genérico. Mostre que você reparou em algo do perfil ou dos interesses.",
    "Uma boa primeira mensagem precisa dar espaço para a outra pessoa contar uma história curta.",
    "Se o perfil combina muito com você, puxe um convite imaginário: filme, café, playlist ou viagem curta."
];

// Textos de feedback para os botões das abas Eventos e Segurança.
const sugestoesAcao = {
    "evento-cafe": "Convite sugerido: chamar para um café em local movimentado e com tempo curto para começar leve.",
    "evento-interesse": "Ideia criada: escolha um interesse em comum e proponha um rolê simples ligado a ele.",
    "evento-local": "Sugestão: prefira lugares públicos, bem avaliados e fáceis de chegar para os dois.",
    "seguranca-verificar": "Perfil em revisão: adicione foto clara e dados consistentes para liberar o selo.",
    "seguranca-contato": "Contato de confiança configurado como próximo passo antes de encontros presenciais.",
    "seguranca-denuncia": "Suporte aberto: use denúncia rápida se alguma conversa parecer invasiva ou insegura."
};

// Etapas do guia mostrado apenas no primeiro acesso à Home.
const etapasGuiaCupido = [
    {
        titulo: "Bem-vindo ao MatchConnect",
        texto: "Eu sou o Cupido. Vou te mostrar rapidinho as principais funções do site."
    },
    {
        titulo: "Descobrir perfis",
        texto: "Aqui você vê pessoas ordenadas por afinidade. Use curtir, recusar ou voltar para controlar suas sugestões."
    },
    {
        titulo: "Conversas com ajuda",
        texto: "Quando bater dúvida, eu sugiro mensagens com base nos interesses em comum para você começar melhor."
    },
    {
        titulo: "Eventos e encontros",
        texto: "Use Eventos e Evento do Dia para transformar assunto em convite. Depois, confira o checklist de segurança."
    }
];

// Mede a força do perfil com base nos campos mais importantes preenchidos.
function calcularProgressoPerfil() {
    const campos = [
        dadosInteresses.fotos && dadosInteresses.fotos.length > 0,
        interessesUsuario.length >= 3,
        Boolean(dadosInteresses.objetivo),
        Boolean(dadosInteresses.personalidade),
        Boolean(dadosInteresses.programaIdeal),
        Boolean(dadosInteresses.descricao)
    ];

    const completos = campos.filter(Boolean).length;
    return Math.round((completos / campos.length) * 100);
}

// Cria uma tag visual reutilizada para interesses e afinidades.
function criarTag(texto) {
    const tag = document.createElement("span");
    tag.className = "tag-match";
    tag.textContent = texto;
    return tag;
}

// Preenche o bloco "Seu perfil", fotos, barra de progresso e interesses.
function preencherPerfil() {
    const nome = usuarioLogado ? usuarioLogado.nome : "Usuário";
    const primeiroNome = nome.split(" ")[0];
    const progresso = calcularProgressoPerfil();

    nomeUsuario.textContent = primeiroNome;
    tituloPerfil.textContent = `Perfil de ${primeiroNome}`;
    fotoPerfilNavbar.src = fotoPrincipal;
    fotoPerfilPrincipal.src = fotoPrincipal;
    descricaoUsuario.textContent = dadosInteresses.descricao || "Complete seu cadastro de interesses para deixar suas conexões mais certeiras.";
    objetivoUsuario.textContent = dadosInteresses.objetivo || "Não informado";
    personalidadeUsuario.textContent = dadosInteresses.personalidade || "Não informado";
    programaIdealUsuario.textContent = dadosInteresses.programaIdeal || "Não informado";
    perfilPercentual.textContent = `${progresso}% completo`;
    barraPerfilHome.style.width = `${progresso}%`;
    totalInteresses.textContent = `${interessesUsuario.length} interesse${interessesUsuario.length === 1 ? "" : "s"}`;
    tomConversa.textContent = dadosInteresses.personalidade || "Conversa leve";

    resumoAfinidade.textContent = interessesUsuario.length > 0
        ? `Encontramos perfis e conversas usando ${interessesUsuario.slice(0, 3).join(", ")} como ponto de partida.`
        : "Complete seus interesses para receber conversas e perfis mais compatíveis.";

    listaInteressesUsuario.innerHTML = "";

    if (interessesUsuario.length === 0) {
        const aviso = document.createElement("p");
        aviso.className = "empty-state mb-0";
        aviso.textContent = "Nenhum interesse cadastrado ainda.";
        listaInteressesUsuario.appendChild(aviso);
        return;
    }

    interessesUsuario.forEach(function (interesse) {
        listaInteressesUsuario.appendChild(criarTag(interesse));
    });
}

// Renderiza a lista de conversas e aplica filtro por nome/interesse.
function renderizarConversas(filtro = "") {
    const termo = filtro.trim().toLowerCase();
    const conversas = conversasBase.filter(function (conversa) {
        return conversa.nome.toLowerCase().includes(termo)
            || conversa.interesses.join(" ").toLowerCase().includes(termo);
    });

    listaConversas.innerHTML = "";

    conversas.forEach(function (conversa) {
        const afinidade = conversa.interesses.filter(function (interesse) {
            return interessesUsuario.includes(interesse);
        });

        const item = document.createElement("button");
        item.className = "conversation-item";
        item.type = "button";
        item.innerHTML = `
            <span class="conversation-avatar">${conversa.inicial}</span>
            <span class="conversation-content">
                <span class="conversation-top">
                    <strong>${conversa.nome}</strong>
                    <small>${conversa.tempo}</small>
                </span>
                <span class="conversation-text">${conversa.ultima}</span>
                <span class="conversation-match">${afinidade.length > 0 ? afinidade.join(" + ") : conversa.interesses[0]}</span>
            </span>
        `;
        listaConversas.appendChild(item);
    });

    if (conversas.length === 0) {
        listaConversas.innerHTML = '<p class="empty-state mb-0">Nenhuma conversa encontrada.</p>';
    }
}

// Atualiza a sugestão de abertura usando o perfil atualmente exibido no swipe.
function atualizarSugestao() {
    const perfil = obterPerfilAtual();

    if (!perfil || interessesUsuario.length === 0) {
        sugestaoConversa.textContent = "Escolha seus interesses para receber uma sugestão de abertura personalizada.";
        return;
    }

    sugestaoConversa.textContent = montarMensagemCupido(perfil);
}

// Retorna o perfil que está visível no card de descoberta.
function obterPerfilAtual() {
    return perfisDescoberta[indiceSwipe] || perfisDescoberta[0];
}

// Monta variações de mensagem do Cupido para evitar sempre o mesmo texto.
function montarMensagemCupido(perfil) {
    if (!perfil) {
        return "Complete seus interesses para o Cupido criar uma abertura mais personalizada.";
    }

    const interessePrincipal = perfil.interessesEmComum[0] || perfil.interesses[0] || "um assunto em comum";
    const variacoes = [
        perfil.mensagem,
        `Vi ${interessePrincipal} no seu perfil e fiquei curioso: qual parte disso mais combina com sua rotina hoje?`,
        `${perfil.nome}, seu programa ideal tem mais cara de ${perfil.programaIdeal} ou você prefere improvisar?`,
        `A gente tem ${interessePrincipal} como ponto em comum. Me indica algo desse universo que vale muito conhecer?`
    ].filter(Boolean);

    if (variacoes.length > 0) {
        return variacoes[indiceVariacaoCupido % variacoes.length];
    }

    if (perfil.mensagem) {
        return perfil.mensagem;
    }

    if (dadosInteresses.programaIdeal) {
        return `Vi que a gente combina em ${interessePrincipal}. Seu programa ideal também tem mais cara de ${dadosInteresses.programaIdeal} ou você prefere improvisar?`;
    }

    return `Vi que a gente combina em ${interessePrincipal}. Qual detalhe desse assunto mais prende sua atenção ultimamente?`;
}

// Atualiza a aba Cupido e dispara a animação do robozinho.
function atualizarCupido() {
    const perfil = obterPerfilAtual();
    const dica = dicasCupido[indiceDicaCupido % dicasCupido.length];
    const nomePerfil = perfil ? perfil.nome : "um novo perfil";

    if (cupidoAlvo) {
        cupidoAlvo.textContent = `Mensagem sugerida para ${nomePerfil}`;
    }

    cupidoDica.textContent = `${dica} Agora o Cupido está olhando para ${nomePerfil}.`;
    cupidoMensagem.textContent = montarMensagemCupido(perfil);

    if (cupidoOrb) {
        cupidoOrb.classList.remove("is-guiding");
        void cupidoOrb.offsetWidth;
        cupidoOrb.classList.add("is-guiding");
    }
}

// Explica no card por que aquele perfil combina com o usuário.
function obterMotivosCompatibilidade(perfil) {
    const motivos = [];
    const afinidade = perfil.interessesEmComum.length > 0 ? perfil.interessesEmComum : perfil.interesses.slice(0, 2);

    motivos.push(`${afinidade.join(" + ")} em comum`);
    motivos.push(`Programa: ${perfil.programaIdeal}`);
    motivos.push(`Energia: ${perfil.energia}`);

    return motivos;
}

// Mostra matches recentes na aba "Matches".
function renderizarMatchesAnimados() {
    const matches = matchesCurtidos.length > 0 ? matchesCurtidos : perfisDescoberta.slice(0, 3);

    listaMatchesAnimados.innerHTML = matches.map(function (perfil, index) {
        const afinidade = perfil.interessesEmComum.length > 0
            ? perfil.interessesEmComum.join(" + ")
            : perfil.interesses.slice(0, 2).join(" + ");

        return `
            <div class="match-mini-card" style="animation-delay: ${index * 90}ms">
                <span class="match-mini-avatar">${perfil.inicial}</span>
                <span>
                    <strong>${perfil.nome}</strong>
                    <small>${perfil.percentual}% compatível • ${afinidade}</small>
                </span>
                <button class="btn btn-match-outline btn-sm btn-open-chat" type="button" data-match="${perfil.nome}">Abrir conversa</button>
            </div>
        `;
    }).join("");
}

// Renderiza o card principal de descoberta, incluindo estado vazio.
function renderizarSwipe() {
    const perfil = perfisDescoberta[indiceSwipe];

    if (!perfil) {
        cardPerfilSwipe.innerHTML = `
            <div class="discover-empty">
                <i class="bi bi-check2-heart"></i>
                <h3>Você viu todos os perfis de hoje</h3>
                <p>Volte mais tarde ou edite seus interesses para recalcular novas sugestões.</p>
            </div>
        `;
        contadorSwipe.textContent = "0/0";
        cupidoAlvo.textContent = "Mensagem sugerida";
        cupidoDica.textContent = "Ajuste a busca ou edite seus interesses para o Cupido encontrar novas conexões.";
        cupidoMensagem.textContent = "Sem perfil selecionado no momento.";
        sugestaoConversa.textContent = "Quando um perfil aparecer, a sugestão de conversa será atualizada aqui.";
        btnRecusar.disabled = true;
        btnCurtir.disabled = true;
        btnVoltar.disabled = true;
        return;
    }

    btnRecusar.disabled = false;
    btnCurtir.disabled = false;
    btnVoltar.disabled = false;
    contadorSwipe.textContent = `${indiceSwipe + 1}/${perfisDescoberta.length}`;
    const interessesParaExibir = perfil.interessesEmComum.length > 0 ? perfil.interessesEmComum : perfil.interesses.slice(0, 3);
    const motivos = obterMotivosCompatibilidade(perfil);

    cardPerfilSwipe.innerHTML = `
        <div class="discover-photo discover-photo-${perfil.inicial.toLowerCase()}">
            <span>${perfil.inicial}</span>
        </div>
        <div class="discover-info">
            <div class="d-flex justify-content-between align-items-start gap-3 mb-2">
                <div>
                    <h3>${perfil.nome}, ${perfil.idade}</h3>
                    <p>${perfil.percentual}% compatível</p>
                </div>
                <span class="compat-badge">${perfil.interessesEmComum.length} em comum</span>
            </div>
            <p class="discover-bio">${perfil.bio}</p>
            <p class="discover-quote">"${perfil.frase}"</p>
            <div class="interest-tags small-tags">
                ${interessesParaExibir.map(function (interesse) {
                    return `<span class="tag-match">${interesse}</span>`;
                }).join("")}
            </div>
            <div class="match-reasons">
                <span>Por que combinou</span>
                ${motivos.map(function (motivo) {
                    return `<strong><i class="bi bi-check2-heart"></i>${motivo}</strong>`;
                }).join("")}
            </div>
            <div class="profile-details-grid">
                <div>
                    <span>Procura</span>
                    <strong>${perfil.procura}</strong>
                </div>
                <div>
                    <span>Programa ideal</span>
                    <strong>${perfil.programaIdeal}</strong>
                </div>
            </div>
        </div>
    `;
    cardPerfilSwipe.classList.remove("card-enter");
    void cardPerfilSwipe.offsetWidth;
    cardPerfilSwipe.classList.add("card-enter");
    atualizarCupido();
    atualizarSugestao();
}

// Avança para o próximo perfil com animação de curtir ou recusar.
function avancarSwipe(mensagem, direcao = "next") {
    ultimoIndice = indiceSwipe;
    btnRecusar.disabled = true;
    btnCurtir.disabled = true;
    btnVoltar.disabled = true;
    cardPerfilSwipe.classList.add(direcao === "like" ? "swipe-like-out" : "swipe-reject-out");

    window.setTimeout(function () {
        indiceSwipe = (indiceSwipe + 1) % perfisDescoberta.length;
        indiceVariacaoCupido = 0;
        resultadoSwipe.textContent = mensagem;
        cardPerfilSwipe.classList.remove("swipe-like-out", "swipe-reject-out");
        btnRecusar.disabled = false;
        btnCurtir.disabled = false;
        btnVoltar.disabled = false;
        renderizarSwipe();
    }, 260);
}

// Volta para o perfil anterior no fluxo de descoberta.
function voltarSwipe() {
    indiceSwipe = ultimoIndice;
    indiceVariacaoCupido = 0;
    resultadoSwipe.textContent = "Perfil anterior restaurado.";
    renderizarSwipe();
}

// Filtro global usado na barra de busca do topo.
function aplicarBuscaGlobal(termo) {
    filtroGlobal = termo.trim().toLowerCase();
    indiceSwipe = 0;
    ultimoIndice = 0;
    indiceVariacaoCupido = 0;

    perfisDescoberta = ordenarPerfisPorAfinidade().filter(function (perfil) {
        if (!filtroGlobal) {
            return true;
        }

        return perfil.nome.toLowerCase().includes(filtroGlobal)
            || perfil.bio.toLowerCase().includes(filtroGlobal)
            || perfil.procura.toLowerCase().includes(filtroGlobal)
            || perfil.programaIdeal.toLowerCase().includes(filtroGlobal)
            || perfil.interesses.join(" ").toLowerCase().includes(filtroGlobal);
    });

    renderizarSwipe();
    renderizarMatchesAnimados();

    if (filtroGlobal && perfisDescoberta.length === 0) {
        resultadoSwipe.textContent = `Nenhum perfil encontrado para "${termo}".`;
    } else if (filtroGlobal) {
        resultadoSwipe.textContent = `${perfisDescoberta.length} perfil${perfisDescoberta.length === 1 ? "" : "s"} encontrado${perfisDescoberta.length === 1 ? "" : "s"}.`;
    }
}

// Mostra a animação de celebração quando o usuário curte um perfil.
function mostrarAnimacaoMatch(perfil) {
    matchCelebrationText.textContent = `Você e ${perfil.nome} têm ${perfil.percentual}% de compatibilidade.`;
    matchCelebration.setAttribute("aria-hidden", "false");
    matchCelebration.classList.add("show");

    window.setTimeout(function () {
        matchCelebration.classList.remove("show");
        matchCelebration.setAttribute("aria-hidden", "true");
    }, 1800);
}

// Controla a troca entre abas: Cupido, Matches, Eventos e Segurança.
function ativarAba(idPainel) {
    tabButtons.forEach(function (button) {
        const ativo = button.dataset.tab === idPainel;
        button.classList.toggle("active", ativo);
        button.setAttribute("aria-selected", String(ativo));
    });

    tabPanels.forEach(function (panel) {
        panel.classList.toggle("active", panel.id === idPainel);
    });
}

// Marca o guia inicial como visto para não exibir novamente nos próximos logins.
function marcarGuiaCupidoComoVisto() {
    localStorage.setItem("guiaCupidoHomeVisto", "true");
}

// Fecha o guia inicial do Cupido.
function fecharGuiaCupido() {
    if (!cupidoGuide) {
        return;
    }

    cupidoGuide.classList.remove("show");
    cupidoGuide.setAttribute("aria-hidden", "true");
}

// Atualiza título, texto e botão do guia de acordo com a etapa atual.
function renderizarGuiaCupido() {
    if (!cupidoGuide) {
        return;
    }

    const etapa = etapasGuiaCupido[indiceGuiaCupido];
    cupidoGuideStep.textContent = `Guia inicial ${indiceGuiaCupido + 1}/${etapasGuiaCupido.length}`;
    cupidoGuideTitle.textContent = etapa.titulo;
    cupidoGuideText.textContent = etapa.texto;
    btnProximoGuiaCupido.textContent = indiceGuiaCupido === etapasGuiaCupido.length - 1 ? "Finalizar" : "Próximo";
}

// Abre o guia inicial apenas se o usuário ainda não tiver pulado/finalizado.
function abrirGuiaCupidoSeNecessario() {
    if (!cupidoGuide || localStorage.getItem("guiaCupidoHomeVisto") === "true") {
        return;
    }

    indiceGuiaCupido = 0;
    renderizarGuiaCupido();
    cupidoGuide.classList.add("show");
    cupidoGuide.setAttribute("aria-hidden", "false");
}

if (btnSair) {
    btnSair.addEventListener("click", function () {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "../Login/login.html";
    });
}

buscaConversas.addEventListener("input", function () {
    renderizarConversas(buscaConversas.value);
});

if (buscaGlobal) {
    buscaGlobal.closest("form").addEventListener("submit", function (event) {
        event.preventDefault();
    });

    buscaGlobal.addEventListener("input", function () {
        aplicarBuscaGlobal(buscaGlobal.value);
    });
}

btnRecusar.addEventListener("click", function () {
    avancarSwipe("Perfil recusado. Próxima sugestão carregada.", "reject");
});

btnCurtir.addEventListener("click", function () {
    const perfil = perfisDescoberta[indiceSwipe];

    if (!perfil) {
        resultadoSwipe.textContent = "Nenhum perfil disponível para curtir agora.";
        return;
    }

    matchesCurtidos.unshift(perfil);
    if (!matchesSalvos.includes(perfil.nome)) {
        matchesSalvos.unshift(perfil.nome);
        localStorage.setItem("matchesUsuario", JSON.stringify(matchesSalvos));
    }
    renderizarMatchesAnimados();
    mostrarAnimacaoMatch(perfil);
    avancarSwipe(`Você curtiu ${perfil.nome}. A conversa já pode começar.`, "like");
});

btnVoltar.addEventListener("click", voltarSwipe);

tabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        ativarAba(button.dataset.tab);
    });
});

btnNovaDicaCupido.addEventListener("click", function () {
    indiceDicaCupido += 1;
    indiceVariacaoCupido += 1;
    atualizarCupido();
    atualizarSugestao();
});

if (btnCopiarCupido) {
    btnCopiarCupido.addEventListener("click", function () {
        sugestaoConversa.textContent = cupidoMensagem.textContent;
        resultadoSwipe.textContent = "Dica do Cupido enviada para a sugestão de conversa.";
        btnCopiarCupido.textContent = "Sugestão adicionada";
        window.setTimeout(function () {
            btnCopiarCupido.textContent = "Usar na conversa";
        }, 1400);
        document.getElementById("conversas").scrollIntoView({ behavior: "smooth", block: "start" });
    });
}

if (btnEnviarSugestao) {
    btnEnviarSugestao.addEventListener("click", function () {
        const perfil = obterPerfilAtual();
        resultadoSwipe.textContent = `Sugestão enviada para ${perfil ? perfil.nome : "a conversa"}.`;
        btnEnviarSugestao.textContent = "Sugestão enviada";
        window.setTimeout(function () {
            btnEnviarSugestao.textContent = "Enviar sugestão";
        }, 1400);
    });
}

listaMatchesAnimados.addEventListener("click", function (event) {
    const botao = event.target.closest(".btn-open-chat");

    if (!botao) {
        return;
    }

    sugestaoConversa.textContent = `Abrindo conversa com ${botao.dataset.match}. Use uma pergunta curta para manter o ritmo.`;
    document.getElementById("conversas").scrollIntoView({ behavior: "smooth", block: "start" });
});

ideaActions.forEach(function (button) {
    button.addEventListener("click", function () {
        resultadoSwipe.textContent = sugestoesAcao[button.dataset.action] || "Ação preparada.";
    });
});

if (btnPularGuiaCupido) {
    btnPularGuiaCupido.addEventListener("click", function () {
        marcarGuiaCupidoComoVisto();
        fecharGuiaCupido();
    });
}

if (btnProximoGuiaCupido) {
    btnProximoGuiaCupido.addEventListener("click", function () {
        if (indiceGuiaCupido >= etapasGuiaCupido.length - 1) {
            marcarGuiaCupidoComoVisto();
            fecharGuiaCupido();
            return;
        }

        indiceGuiaCupido += 1;
        renderizarGuiaCupido();
    });
}

preencherPerfil();
renderizarConversas();
atualizarSugestao();
renderizarSwipe();
renderizarMatchesAnimados();
abrirGuiaCupidoSeNecessario();
