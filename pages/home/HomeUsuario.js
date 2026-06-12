function lerJsonHome(chave, fallback) {
    try {
        return JSON.parse(localStorage.getItem(chave)) || fallback;
    } catch (error) {
        return fallback;
    }
}

const usuarioLogado = lerJsonHome("usuarioLogado", null);
const dadosInteresses = lerJsonHome("interessesUsuario", {});

// A Home só pode ser acessada depois do login.
if (!usuarioLogado) {
    window.location.href = "../Login/login.html";
}

// Perfis simulados usados na área "Descobrir". A fonte principal fica em
// appData.js para que Home, Matches, Favoritos e Conversas falem a mesma língua.
const perfisBase = typeof MatchConnectApp !== "undefined" && Array.isArray(MatchConnectApp.perfisBase)
    ? MatchConnectApp.perfisBase
    : [
        {
            nome: "Ana",
            idade: 24,
            distanciaKm: 4,
            inicial: "A",
            foto: "",
            interesses: ["Cinema", "Livros", "Gastronomia", "Viagens"],
            objetivo: "Relacionamento sério",
            procura: "conversa leve e encontro tranquilo",
            programaIdeal: "Cinema seguido de jantar",
            energia: "Calma e curiosa",
            frase: "Prefiro conexões que começam simples e continuam com vontade.",
            bio: "Gosta de roteiros tranquilos, bons filmes e conversas que continuam depois do primeiro assunto.",
            mensagem: "Vi que a gente combina em cinema e gastronomia. Qual foi o último lugar que te surpreendeu?"
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

function obterConversasHome() {
    const encerradas = lerJsonHome("conversasEncerradas", []);
    const bloqueados = lerJsonHome("perfisBloqueados", []);
    const matches = typeof MatchConnectApp !== "undefined"
        ? MatchConnectApp.getMatchedProfiles()
        : perfisBase.filter(function (perfil) {
            return matchesSalvos.includes(perfil.nome);
        });
    const mensagens = typeof MatchConnectApp !== "undefined"
        ? MatchConnectApp.getMensagens()
        : lerJsonHome("mensagensUsuario", {});
    let naoLidas = typeof MatchConnectApp !== "undefined"
        ? MatchConnectApp.getNaoLidas()
        : lerJsonHome("mensagensNaoLidas", {});
    const matchesAtivos = matches.filter(function (perfil) {
        return !encerradas.includes(perfil.nome) && !bloqueados.includes(perfil.nome);
    });

    encerradas.concat(bloqueados).forEach(function (nome) {
        if (naoLidas[nome]) {
            delete naoLidas[nome];
        }
    });

    localStorage.setItem("mensagensNaoLidas", JSON.stringify(naoLidas));

    return matchesAtivos.map(function (perfil) {
        const mensagensPerfil = mensagens[perfil.nome] || [];
        const ultima = mensagensPerfil[mensagensPerfil.length - 1];
        return {
            nome: perfil.nome,
            inicial: perfil.inicial,
            tempo: naoLidas[perfil.nome] ? "nova" : "agora",
            ultima: ultima ? ultima.texto : "Match criado. O EROS pode sugerir a primeira mensagem.",
            interesses: perfil.interessesEmComum && perfil.interessesEmComum.length > 0 ? perfil.interessesEmComum : perfil.interesses.slice(0, 2),
            naoLidas: naoLidas[perfil.nome] || 0,
            percentual: perfil.percentual
        };
    }).sort(function (a, b) {
        return b.naoLidas - a.naoLidas || b.percentual - a.percentual;
    });
}

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
const perfilPercentualTopo = document.getElementById("perfilPercentualTopo");
const barraPerfilTopo = document.getElementById("barraPerfilTopo");
const totalInteresses = document.getElementById("totalInteresses");
const tomConversa = document.getElementById("tomConversa");
const listaConversas = document.getElementById("listaConversas");
const buscaConversas = document.getElementById("buscaConversas");
const buscaGlobal = document.getElementById("buscaGlobal");
const sugestaoConversa = document.getElementById("sugestaoConversa");
const chatPreview = document.getElementById("chatPreview");
const cardPerfilSwipe = document.getElementById("cardPerfilSwipe");
const contadorSwipe = document.getElementById("contadorSwipe");
const resultadoSwipe = document.getElementById("resultadoSwipe");
const btnRecusar = document.getElementById("btnRecusar");
const btnCurtir = document.getElementById("btnCurtir");
const btnVoltar = document.getElementById("btnVoltar");
const btnSair = document.getElementById("btnSair");
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");
const cupidoDica = document.getElementById("erosDica");
const cupidoAlvo = document.getElementById("erosAlvo");
const cupidoMensagem = document.getElementById("erosMensagem");
const cupidoOrb = document.querySelector(".pet-robot");
const btnNovaDicaCupido = document.getElementById("btnNovaDicaEROS");
const btnCopiarCupido = document.getElementById("btnCopiarCupido");
const btnEnviarSugestao = document.getElementById("btnEnviarSugestao");
const btnAbrirConversaHome = document.getElementById("btnAbrirConversaHome");
const listaMatchesAnimados = document.getElementById("listaMatchesAnimados");
const matchCelebration = document.getElementById("matchCelebration");
const matchCelebrationText = document.getElementById("matchCelebrationText");
const ideaActions = document.querySelectorAll(".idea-action");
const quickActionCards = document.querySelectorAll(".quick-action-card");
const homeActionStatus = document.getElementById("homeActionStatus");
const todayModeButtons = document.querySelectorAll(".today-mode-btn");
const listaMissoesHome = document.getElementById("listaMissoesHome");
const cupidoGuide = document.getElementById("erosGuide");
const cupidoGuideStep = document.getElementById("erosGuideStep");
const cupidoGuideTitle = document.getElementById("erosGuideTitle");
const cupidoGuideText = document.getElementById("erosGuideText");
const btnPularGuiaCupido = document.getElementById("btnPularGuiaEROS");
const btnProximoGuiaCupido = document.getElementById("btnProximoGuiaEROS");
const btnCupidoPet = document.getElementById("btnEROSPet");
const cupidoPet = document.getElementById("erosPet");
const cupidoPetPanel = document.getElementById("erosPetPanel");
const cupidoSpeech = document.getElementById("erosSpeech");
const cupidoNivel = document.getElementById("erosNivel");
const cupidoEnergiaTexto = document.getElementById("erosEnergiaTexto");
const cupidoEnergiaBarra = document.getElementById("erosEnergiaBarra");
const cupidoMissao = document.getElementById("erosMissao");
const cupidoDesbloqueio = document.getElementById("erosDesbloqueio");
const cupidoHumor = document.getElementById("erosHumor");
const btnAlimentarCupido = document.getElementById("btnAlimentarEROS");
const btnMissaoCupido = document.getElementById("btnMissaoEROS");
const btnEnviarCupidoPet = document.getElementById("btnEnviarEROSPet");
const cupidoRewardSteps = document.querySelectorAll(".eros-reward-track button");

let indiceSwipe = 0;
let ultimoIndice = 0;
let swipeStartX = 0;
let swipeStartY = 0;
let swipeDeltaX = 0;
let swiping = false;
let swiped = false;
const SWIPE_THRESHOLD = 80;
let indiceDicaCupido = 0;
let indiceVariacaoCupido = 0;
let indiceGuiaCupido = 0;
let indiceHumorCupido = 0;
let filtroGlobal = "";
let conversaSelecionadaHome = null;
let cupidoXp = Number(localStorage.getItem("erosPetXp") || localStorage.getItem("cupidoPetXp")) || 18;
let intervaloCupidoPet = null;
const cupidoStatsPadrao = { likes: 0, sugestoes: 0, eventos: 0, quizzes: 0 };
const filtrosMatchConnect = lerJsonHome("filtrosMatchConnect", {});
const matchesCurtidos = [];
const matchesSalvos = lerJsonHome("matchesUsuario", []);
const urlApiCompatibilidade = "http://127.0.0.1:8000/compatibilidade";

const interessesUsuario = Array.isArray(dadosInteresses.interesses) ? dadosInteresses.interesses : [];
const camadasUsuario = dadosInteresses.camadas || {};
const fotoPrincipal = dadosInteresses.fotos && dadosInteresses.fotos.length > 0
    ? dadosInteresses.fotos[0]
    : "../../assets/img/MatchConnectLOGO.PNG";

function normalizarListaInteresse(valor) {
    if (Array.isArray(valor)) return valor;
    if (!valor) return [];
    return String(valor).split(",").map(function (item) {
        return item.trim();
    }).filter(Boolean);
}

function calcularIdadeLocal(dataNascimento) {
    if (!dataNascimento) return null;

    const nascimento = new Date(dataNascimento);
    if (Number.isNaN(nascimento.getTime())) return null;

    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade;
}

function montarUsuarioLogadoParaApi() {
    return {
        nome: usuarioLogado ? usuarioLogado.nome : "Usuario",
        idade: calcularIdadeLocal(usuarioLogado ? usuarioLogado.dataNascimento : null),
        data_nascimento: usuarioLogado ? usuarioLogado.dataNascimento : null,
        interesses: interessesUsuario,
        objetivo: dadosInteresses.objetivo || "",
        descricao: dadosInteresses.descricao || ""
    };
}

function montarPerfilParaApi(perfil) {
    return {
        nome: perfil.nome,
        idade: perfil.idade,
        interesses: perfil.interesses,
        objetivo: perfil.objetivo || "",
        descricao: perfil.bio || perfil.descricao || ""
    };
}

async function verificarCompatibilidadeApi(perfil) {
    const resposta = await fetch(urlApiCompatibilidade, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuario1: montarUsuarioLogadoParaApi(),
            usuario2: montarPerfilParaApi(perfil)
        })
    });

    if (!resposta.ok) {
        throw new Error("Nao foi possivel calcular a compatibilidade.");
    }

    return resposta.json();
}

function montarCompatibilidadeLocal(perfil) {
    const compatibilidade = calcularCompatibilidade(perfil);
    const interesses = compatibilidade.interessesEmComum.length > 0
        ? compatibilidade.interessesEmComum
        : perfil.interesses.slice(0, 2);
    const objetivoTexto = dadosInteresses.objetivo && perfil.objetivo
        ? `Seu objetivo atual é "${dadosInteresses.objetivo}" e o perfil busca "${perfil.objetivo}".`
        : "Complete o objetivo do perfil para refinar esse resultado.";

    return {
        porcentagem: compatibilidade.percentual,
        interesses_em_comum: interesses,
        explicacao: `Cálculo local baseado em interesses, camadas do perfil e distância. ${objetivoTexto}`
    };
}

function obterCamadasInteresses() {
    return {
        gostoMuito: normalizarListaInteresse(camadasUsuario.gostoMuito).length ? normalizarListaInteresse(camadasUsuario.gostoMuito) : interessesUsuario.slice(0, 2),
        queroExplorar: normalizarListaInteresse(camadasUsuario.queroExplorar),
        naoCurto: normalizarListaInteresse(camadasUsuario.naoCurto),
        assuntoFavorito: camadasUsuario.assuntoFavorito || interessesUsuario[0] || ""
    };
}

// Calcula compatibilidade usando interesses em comum e dados preenchidos no cadastro.
function calcularCompatibilidade(perfil) {
    const camadas = obterCamadasInteresses();
    const interessesEmComum = perfil.interesses.filter(function (interesse) {
        return interessesUsuario.includes(interesse);
    });
    const favoritosEmComum = perfil.interesses.filter(function (interesse) {
        return camadas.gostoMuito.includes(interesse);
    });
    const bloqueados = perfil.interesses.filter(function (interesse) {
        return camadas.naoCurto.includes(interesse);
    });

    const base = interessesUsuario.length > 0 ? 58 : 42;
    const bonusInteresses = interessesEmComum.length * 11;
    const bonusCamada = favoritosEmComum.length * 6;
    const bonusObjetivo = dadosInteresses.objetivo ? 7 : 0;

    return {
        interessesEmComum: interessesEmComum,
        percentual: Math.max(18, Math.min(98, base + bonusInteresses + bonusCamada + bonusObjetivo - bloqueados.length * 10))
    };
}

function calcularCompatibilidadeCategorias(perfil) {
    const camadas = obterCamadasInteresses();
    const emComum = perfil.interessesEmComum || [];
    const favoritosEmComum = perfil.interesses.filter(function (interesse) {
        return camadas.gostoMuito.includes(interesse);
    });
    const explorarEmComum = perfil.interesses.filter(function (interesse) {
        return camadas.queroExplorar.includes(interesse);
    });
    const bloqueados = perfil.interesses.filter(function (interesse) {
        return camadas.naoCurto.includes(interesse);
    });
    const culturais = ["Cinema", "Livros", "Música", "Séries", "Games", "Tecnologia", "Gastronomia"];
    const ativos = ["Academia", "Corrida", "Praia", "Viagens"];
    const culturaisComum = emComum.filter(function (interesse) {
        return culturais.includes(interesse);
    }).length;
    const ativosComum = emComum.filter(function (interesse) {
        return ativos.includes(interesse);
    }).length;
    const estilo = dadosInteresses.programaIdeal && perfil.programaIdeal
        ? (perfil.programaIdeal.toLowerCase().includes(dadosInteresses.programaIdeal.toLowerCase().split(" ")[0]) ? 78 : 58)
        : 56;

    return [
        { rotulo: "Conversa", valor: Math.max(35, Math.min(98, 54 + emComum.length * 10 + favoritosEmComum.length * 7 + (camadas.assuntoFavorito ? 6 : 0))) },
        { rotulo: "Estilo de encontro", valor: Math.max(30, Math.min(96, estilo + explorarEmComum.length * 6 - bloqueados.length * 7)) },
        { rotulo: "Interesses culturais", valor: Math.max(28, Math.min(98, 42 + culturaisComum * 16 + favoritosEmComum.length * 5)) },
        { rotulo: "Rotina", valor: Math.max(24, Math.min(94, 46 + ativosComum * 13 + (perfil.distanciaKm <= 12 ? 14 : 2) - bloqueados.length * 8)) }
    ];
}

function perguntaPorInteresse(interesse) {
    const perguntas = {
        Cinema: "Qual filme você defenderia mesmo quando ninguém concorda?",
        Livros: "Que livro você indicaria para alguém entender melhor seu gosto?",
        Música: "Qual música resume sua semana?",
        Séries: "Qual série você reassistiria sem pensar?",
        Gastronomia: "Qual lugar ou prato te surpreendeu de verdade?",
        Viagens: "Qual viagem curta você faria de novo?",
        Games: "Qual jogo mostra melhor seu jeito de se divertir?",
        Tecnologia: "Qual tecnologia você acha que mudou sua rotina?",
        Academia: "Você prefere treino com música, podcast ou silêncio?",
        Corrida: "Você corre mais para competir ou para desligar a cabeça?",
        Praia: "Praia para você combina com conversa, música ou silêncio?",
        Pets: "Qual história de pet sempre vira assunto?"
    };

    return perguntas[interesse] || `O que faz ${interesse} ser um assunto bom para você?`;
}

function normalizarTextoComparacao(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function textosParecidos(textoA, textoB) {
    const a = normalizarTextoComparacao(textoA);
    const b = normalizarTextoComparacao(textoB);

    if (!a || !b) return false;
    if (a.includes(b) || b.includes(a)) return true;

    const palavrasA = new Set(a.split(" ").filter(function (palavra) {
        return palavra.length > 3;
    }));
    const palavrasB = b.split(" ").filter(function (palavra) {
        return palavra.length > 3;
    });
    const comuns = palavrasB.filter(function (palavra) {
        return palavrasA.has(palavra);
    });

    return palavrasB.length > 0 && comuns.length / palavrasB.length >= 0.72;
}

function perguntaComplementarEROS(interesse, sugestao, perfil) {
    const principal = perguntaPorInteresse(interesse);
    const alternativas = [
        `O que você gostaria de descobrir sobre ${perfil.nome} a partir desse interesse?`,
        `Esse assunto combina mais com conversa leve ou convite para um programa simples?`,
        `Qual detalhe deixaria essa abertura mais natural para você?`
    ];
    const opcoes = [principal, ...alternativas];

    return opcoes.find(function (pergunta) {
        return !textosParecidos(pergunta, sugestao);
    }) || "";
}

// Ordena os perfis para mostrar primeiro quem combina mais com o usuário.
function ordenarPerfisPorAfinidade() {
    const perfisBloqueados = lerJsonHome("perfisBloqueados", []);
    const conversasEncerradas = lerJsonHome("conversasEncerradas", []);

    return perfisBase
        .filter(function (perfil) {
            return !perfisBloqueados.includes(perfil.nome) && !conversasEncerradas.includes(perfil.nome);
        })
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

function aplicarFiltrosSalvos(perfis) {
    const temFiltros = Object.keys(filtrosMatchConnect).length > 0;

    if (!temFiltros) {
        return perfis;
    }

    const idadeMinima = Number(filtrosMatchConnect.idadeMinima) || 18;
    const idadeMaxima = Number(filtrosMatchConnect.idadeMaxima) || 99;
    const distanciaMaxima = Number(filtrosMatchConnect.distanciaMaxima) || 100;
    const interesse = (filtrosMatchConnect.interesse || "").toLowerCase();
    const objetivo = filtrosMatchConnect.objetivo || "";
    const objetivosDisponiveis = perfis.map(function (perfil) {
        return perfil.objetivo;
    });
    const objetivoAplicavel = objetivosDisponiveis.includes(objetivo) ? objetivo : "";

    const filtrados = perfis.filter(function (perfil) {
        const atendeIdade = perfil.idade >= idadeMinima && perfil.idade <= idadeMaxima;
        const atendeDistancia = !perfil.distanciaKm || perfil.distanciaKm <= distanciaMaxima;
        const atendeInteresse = !interesse || perfil.interesses.join(" ").toLowerCase().includes(interesse);
        const atendeObjetivo = !objetivoAplicavel || perfil.objetivo === objetivoAplicavel;
        return atendeIdade && atendeDistancia && atendeInteresse && atendeObjetivo;
    });

    return filtrados.length > 0 ? filtrados : perfis;
}

let perfisDescoberta = aplicarFiltrosSalvos(ordenarPerfisPorAfinidade());
const filtrosSemResultado = Object.keys(filtrosMatchConnect).length > 0
    && perfisDescoberta.length === ordenarPerfisPorAfinidade().length
    && ordenarPerfisPorAfinidade().some(function (perfil) {
        const idadeMinima = Number(filtrosMatchConnect.idadeMinima) || 18;
        const idadeMaxima = Number(filtrosMatchConnect.idadeMaxima) || 99;
        const distanciaMaxima = Number(filtrosMatchConnect.distanciaMaxima) || 100;
        const interesse = (filtrosMatchConnect.interesse || "").toLowerCase();
        return perfil.idade < idadeMinima
            || perfil.idade > idadeMaxima
            || (perfil.distanciaKm && perfil.distanciaKm > distanciaMaxima)
            || (interesse && !perfil.interesses.join(" ").toLowerCase().includes(interesse));
    });

// Frases gerais do EROS. A mensagem final também considera o perfil selecionado.
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
        texto: "Eu sou o EROS. Vou te mostrar rapidinho onde encontrar matches, conversas, eventos e minhas missões."
    },
    {
        titulo: "Descobrir perfis",
        texto: "A área Descobrir é o centro da Home: veja compatibilidade, interesses em comum e use curtir, recusar ou voltar."
    },
    {
        titulo: "EROS flutuante",
        texto: "Eu fico no canto da tela com energia, missões, recompensas e frases para te ajudar a puxar assunto."
    },
    {
        titulo: "Eventos e encontros",
        texto: "Use Evento do Dia para entrar em salas ao vivo e Eventos para transformar afinidade em convite seguro."
    },
    {
        titulo: "Conversas e segurança",
        texto: "Depois do match, use minhas sugestões de mensagem e confira o checklist antes de marcar um encontro."
    }
];

const falasCupidoPet = [
    "Caraaa, ela está tão na sua! Só falta você não mandar um 'oi sumida'.",
    "Caraaa, esse match está piscando mais que minha antena.",
    "Ei, tem compatibilidade alta passando na sua frente.",
    "Alimente meu coração com uma curtida. Eu trabalho melhor com carinho.",
    "Seu perfil está quase irresistível. Falta só caprichar um detalhe.",
    "Hoje tem evento ao vivo. Vai deixar a sala falando sozinha?",
    "Eu gerei uma frase boa. Use antes que eu fique dramático.",
    "Missão do dia: curtir alguém sem pensar por 47 minutos."
];

const falasContextuaisCupido = [
    "Caraaa, ela está tão na sua. Vai com calma, mas vai.",
    "Caraaa, essa compatibilidade não apareceu por acaso.",
    "Tem mensagem esperando resposta. Eu não quero pressionar, mas minha antena já leu três vezes.",
    "Chama alguém para conversar antes que eu mesmo escreva uma cantada duvidosa.",
    "Mensagem não lida combina com resposta boa. Quer que eu sugira uma?",
    "Eu estou vendo esse perfil e minha antena está fazendo barulho.",
    "Dica do EROS: procure o interesse em comum antes de mandar mensagem.",
    "Se travar, eu gero uma frase. Se funcionar, digo que foi estratégia.",
    "Você pode abrir o evento do dia e deixar o assunto acontecer sozinho.",
    "Respira. Curtir um perfil não assina contrato com o universo."
];

const missoesCupidoPet = [
    "Curta um perfil para calibrar o EROS.",
    "Use uma dica de conversa para ganhar foco.",
    "Abra o evento do dia para ganhar energia social.",
    "Complete seu perfil para liberar mais destaque.",
    "Faça uma busca por interesse e encontre alguém novo."
];

const modosHoje = {
    conversar: {
        status: "Modo conversa ativado: vou priorizar perfis com bons assuntos em comum.",
        fala: "Modo conversa ligado. Prometo tentar evitar papo com energia de formulário."
    },
    sair: {
        status: "Modo sair ativado: eventos, cafés e convites inteligentes ganham prioridade.",
        fala: "Modo sair ligado. Local público, horário combinado e charme moderado."
    },
    evento: {
        status: "Modo evento ativado: o Evento do Dia e salas ao vivo entram no centro da experiência.",
        fala: "Modo evento ligado. Assunto pronto é meio caminho para não travar."
    },
    jogar: {
        status: "Modo jogar ativado: use a Sala de Jogos para quebrar o gelo antes da conversa.",
        fala: "Modo jogar ligado. Competição leve revela mais que bio de três linhas."
    }
};

const desbloqueiosCupidoPet = [
    "Dica de conversa melhorada",
    "Missão extra de perfil",
    "Sugestão de evento compatível",
    "Impulso visual nos matches",
    "Super dica do EROS"
];

const recompensasCupidoPet = {
    dica: "Dica desbloqueada: eu melhoro a primeira mensagem olhando interesses em comum.",
    evento: "Evento desbloqueado: eu sugiro convites ligados ao assunto do momento.",
    impulso: "Impulso visual: seus matches ficam com mais destaque quando você interage.",
    super: "Super dica: uma mensagem mais direta, com convite e contexto de segurança."
};

const humoresCupidoPet = [
    "curioso",
    "animado",
    "inspirado",
    "confiante",
    "lendário"
];

function humorAtualCupido(nivel) {
    return humoresCupidoPet[(nivel - 1 + indiceHumorCupido) % humoresCupidoPet.length];
}

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

    if (perfilPercentualTopo) {
        perfilPercentualTopo.textContent = `${progresso}%`;
    }

    if (barraPerfilTopo) {
        barraPerfilTopo.style.width = `${progresso}%`;
    }

    totalInteresses.textContent = `${interessesUsuario.length} interesse${interessesUsuario.length === 1 ? "" : "s"}`;
    tomConversa.textContent = dadosInteresses.personalidade || "Conversa leve";

    resumoAfinidade.textContent = interessesUsuario.length > 0
        ? `Encontramos perfis e conversas usando ${interessesUsuario.slice(0, 3).join(", ")} como ponto de partida.`
        : "Complete seus interesses para receber conversas e perfis mais compatíveis.";

    if (Object.keys(filtrosMatchConnect).length > 0) {
        resumoAfinidade.textContent += ` Filtros ativos: ${filtrosMatchConnect.idadeMinima || 18}-${filtrosMatchConnect.idadeMaxima || 99} anos, até ${filtrosMatchConnect.distanciaMaxima || 100} km.`;
    }

    if (filtrosSemResultado) {
        resumoAfinidade.textContent += " Como nenhum perfil bateu exatamente com os filtros, mostramos sugestões por afinidade.";
    }

    const radarTags = document.getElementById("radarTags");
    if (radarTags) {
        const distancia = filtrosMatchConnect.distanciaMaxima ? `${filtrosMatchConnect.distanciaMaxima} km` : "Até 30 km";
        const tagsRadar = [
            ...interessesUsuario.slice(0, 3),
            dadosInteresses.personalidade || "Conversas leves",
            distancia
        ].filter(Boolean);

        radarTags.innerHTML = tagsRadar.slice(0, 5).map(function (tag) {
            return `<span class="mood-chip"><i class="bi bi-stars"></i>${tag}</span>`;
        }).join("");
    }

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
    const conversas = obterConversasHome().filter(function (conversa) {
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
                    <small>${conversa.naoLidas ? `${conversa.naoLidas} nova` : conversa.tempo}</small>
                </span>
                <span class="conversation-text">${conversa.ultima}</span>
                <span class="conversation-match">${afinidade.length > 0 ? afinidade.join(" + ") : conversa.interesses[0]}</span>
            </span>
        `;
        item.classList.toggle("has-unread", conversa.naoLidas > 0);
        item.addEventListener("click", function () {
            selecionarConversaHome(conversa.nome);
        });
        listaConversas.appendChild(item);
    });

    if (conversas.length === 0) {
        listaConversas.innerHTML = `
            <div class="empty-state compact-empty mb-0">
                <i class="bi bi-chat-heart"></i>
                <strong>Nenhuma conversa ainda</strong>
                <p>Curta um perfil em Descobrir para liberar mensagens simuladas.</p>
            </div>
        `;
    }
}

function selecionarConversaHome(nome) {
    const perfil = typeof MatchConnectApp !== "undefined"
        ? MatchConnectApp.perfilPorNome(nome)
        : perfisBase.find(function (item) { return item.nome === nome; });

    if (!perfil) return;

    conversaSelecionadaHome = perfil;
    if (chatPreview) {
        chatPreview.classList.remove("d-none");
    }
    sugestaoConversa.textContent = montarMensagemCupido(perfil);
    localStorage.setItem("conversaAberta", perfil.nome);
    resultadoSwipe.textContent = `Conversa com ${perfil.nome} selecionada. Revise a sugestão antes de enviar.`;
    atualizarCupidoPet(`Selecionei ${perfil.nome}. Agora a sugestão vai para essa conversa, não para o perfil do swipe.`);
}

// Atualiza a sugestão de abertura usando o perfil atualmente exibido no swipe.
function atualizarSugestao() {
    const perfil = conversaSelecionadaHome;

    if (!perfil) {
        if (chatPreview) {
            chatPreview.classList.add("d-none");
        }
        return;
    }

    sugestaoConversa.textContent = montarMensagemCupido(perfil);
}

// Retorna o perfil que está visível no card de descoberta.
function obterPerfilAtual() {
    return perfisDescoberta[indiceSwipe] || perfisDescoberta[0];
}

// Monta variações de mensagem do EROS para evitar sempre o mesmo texto.
function montarMensagemCupido(perfil) {
    if (!perfil) {
        return "Complete seus interesses para o EROS criar uma abertura mais personalizada.";
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

function nivelCupido() {
    return Math.max(1, Math.min(5, Math.floor(cupidoXp / 25) + 1));
}

function getCupidoStats() {
    try {
        const stats = localStorage.getItem("erosPetStats") || localStorage.getItem("cupidoPetStats");
        return { ...cupidoStatsPadrao, ...JSON.parse(stats) };
    } catch (error) {
        return { ...cupidoStatsPadrao };
    }
}

function salvarCupidoStats(stats) {
    localStorage.setItem("cupidoPetStats", JSON.stringify(stats));
    localStorage.setItem("erosPetStats", JSON.stringify(stats));
}

function registrarAcaoCupido(tipo, quantidade = 1) {
    const stats = getCupidoStats();
    stats[tipo] = (stats[tipo] || 0) + quantidade;
    salvarCupidoStats(stats);
    renderizarMissoesHome();
}

function atualizarCupidoPet(fala) {
    const nivel = nivelCupido();
    const humor = humorAtualCupido(nivel);
    const energia = cupidoXp % 25;
    const percentual = Math.min(100, (energia / 25) * 100);
    const xpProximoNivel = 25 - energia;

    if (cupidoNivel) {
        cupidoNivel.textContent = `Nível ${nivel}`;
    }

    if (cupidoHumor) {
        cupidoHumor.textContent = `Humor: ${humor}`;
    }

    if (cupidoPet) {
        cupidoPet.classList.remove("cupido-state-curioso", "cupido-state-animado", "cupido-state-inspirado", "cupido-state-confiante", "cupido-state-lendario");
        cupidoPet.classList.add(`cupido-state-${humor.replace("á", "a")}`);
    }

    if (cupidoEnergiaTexto) {
        cupidoEnergiaTexto.textContent = `${cupidoXp} XP • ${xpProximoNivel === 25 ? 25 : xpProximoNivel} para subir`;
    }

    if (cupidoEnergiaBarra) {
        cupidoEnergiaBarra.style.width = `${percentual}%`;
    }

    if (cupidoMissao) {
        cupidoMissao.textContent = missoesCupidoPet[cupidoXp % missoesCupidoPet.length];
    }

    if (cupidoDesbloqueio) {
        const proximo = desbloqueiosCupidoPet[Math.min(nivel, desbloqueiosCupidoPet.length - 1)];
        cupidoDesbloqueio.textContent = nivel >= 5
            ? "Super dica desbloqueada. EROS está impossível hoje."
            : `Próximo: ${proximo}`;
    }

    cupidoRewardSteps.forEach(function (step, index) {
        step.classList.toggle("active", index < nivel);
    });

    if (cupidoSpeech) {
        cupidoSpeech.textContent = fala || falasCupidoPet[cupidoXp % falasCupidoPet.length];

        if (cupidoPetPanel?.classList.contains("show")) {
            cupidoSpeech.classList.remove("show");
        } else {
            cupidoSpeech.classList.add("show");
        }
    }
}

function renderizarMissoesHome() {
    if (!listaMissoesHome) return;

    const stats = getCupidoStats();
    const missoes = [
        { chave: "likes", meta: 2, icone: "bi-heart-fill", texto: "Curtir 2 perfis compatíveis", premio: "+8 XP" },
        { chave: "sugestoes", meta: 1, icone: "bi-chat-dots", texto: "Usar uma sugestão de conversa", premio: "+4 XP" },
        { chave: "eventos", meta: 1, icone: "bi-broadcast", texto: "Entrar no evento do dia", premio: "+6 XP" },
        { chave: "quizzes", meta: 1, icone: "bi-controller", texto: "Jogar um quiz com alguém", premio: "+6 XP" }
    ];

    listaMissoesHome.innerHTML = missoes.map(function (missao, index) {
        const progresso = Math.min(stats[missao.chave] || 0, missao.meta);
        const completa = progresso >= missao.meta;
        const percentual = (progresso / missao.meta) * 100;
        return `
            <button class="home-mission-item ${completa ? "done" : ""}" type="button" data-mission="${index}" data-mission-key="${missao.chave}">
                <i class="bi ${missao.icone}"></i>
                <span>
                    <strong>${missao.texto}</strong>
                    <small>${progresso}/${missao.meta} • ${completa ? "Concluida" : missao.premio}</small>
                    <em><b style="width:${percentual}%"></b></em>
                </span>
            </button>
        `;
    }).join("");
}

function falarCupidoContextual() {
    indiceHumorCupido += 1;
    const perfil = obterPerfilAtual();
    const mensagens = JSON.parse(localStorage.getItem("mensagensUsuario")) || {};
    const nomesComMensagem = Object.keys(mensagens);
    const nomeMensagem = nomesComMensagem[indiceHumorCupido % Math.max(nomesComMensagem.length, 1)];
    const falaMensagem = nomeMensagem
        ? `${nomeMensagem} tem conversa esperando. Posso te ajudar a responder sem parecer entrevista de emprego.`
        : "Quando aparecer uma mensagem, eu te ajudo a responder com charme moderado.";
    const falasRotativas = [
        "Caraaa, ela está tão na sua!! Só não deixa o momento esfriar.",
        falaMensagem,
        "Puxa uma mensagem agora. Começa pelo interesse em comum e deixa o resto comigo.",
        "Eu estou analisando esse match e minha antena está brilhando de intrometida.",
        "Se travar, abre o EROS: eu monto uma frase menos genérica."
    ];
    const base = falasRotativas[indiceHumorCupido % falasRotativas.length];
    const fala = perfil
        ? `${base} ${perfil.nome} tem ${perfil.percentual}% de compatibilidade.`
        : base;

    atualizarCupidoPet(fala);
}

function ganharXpCupido(pontos, fala) {
    cupidoXp += pontos;
    localStorage.setItem("cupidoPetXp", String(cupidoXp));
    localStorage.setItem("erosPetXp", String(cupidoXp));
    atualizarCupidoPet(fala);
    renderizarMissoesHome();

    if (cupidoOrb) {
        cupidoOrb.classList.remove("is-guiding");
        void cupidoOrb.offsetWidth;
        cupidoOrb.classList.add("is-guiding");
    }
}

function enviarMensagemCupidoPet() {
    const perfil = obterPerfilAtual();
    if (!perfil) {
        atualizarCupidoPet("Preciso de um perfil na tela antes de enviar uma mensagem.");
        return;
    }

    const texto = cupidoMensagem.textContent.trim();
    const mensagens = JSON.parse(localStorage.getItem("mensagensUsuario")) || {};

    if (!mensagens[perfil.nome]) {
        mensagens[perfil.nome] = [
            { autor: perfil.nome, texto: "Oi! Vi que a gente tem alguns interesses em comum." }
        ];
    }

    mensagens[perfil.nome].push({ autor: "Você", texto: texto });
    localStorage.setItem("mensagensUsuario", JSON.stringify(mensagens));
    localStorage.setItem("conversaAberta", perfil.nome);
    registrarAcaoCupido("sugestoes");
    ganharXpCupido(6, `Sugestão enviada para ${perfil.nome}. Eu mereço um carregador emocional.`);

    window.setTimeout(function () {
        window.location.href = "../Conversas/Conversas.html";
    }, 500);
}

function iniciarInteracoesCupido() {
    clearInterval(intervaloCupidoPet);
    window.setTimeout(falarCupidoContextual, 900);
    intervaloCupidoPet = window.setInterval(falarCupidoContextual, 5000);
}

function interagirCupidoAoClique() {
    const painelAberto = cupidoPetPanel?.classList.contains("show");

    if (painelAberto) {
        cupidoPetPanel.classList.remove("show");
        cupidoPet?.classList.remove("is-panel-open");
        atualizarCupidoPet("Fechando meu painel. Mas continuo de olho nos matches.");
        return;
    }

    const perfil = obterPerfilAtual();
    const acoes = ["coracoes", "dica", "descobrir", "missao", "evento"];
    const acao = acoes[(cupidoXp + indiceHumorCupido + indiceSwipe) % acoes.length];

    indiceHumorCupido += 1;

    if (cupidoPetPanel) {
        cupidoPetPanel.classList.add("show");
        cupidoPet?.classList.add("is-panel-open");
        cupidoSpeech?.classList.remove("show");
    }

    if (acao === "coracoes") {
        animarCoracoesCupido();
        ganharXpCupido(1, "Clique recebido. Meu coraçãozinho rodou em modo turbo.");
        return;
    }

    if (acao === "dica") {
        indiceDicaCupido += 1;
        indiceVariacaoCupido += 1;
        atualizarCupido();
        ganharXpCupido(1, perfil ? `Olhei para ${perfil.nome} e gerei uma frase melhor.` : "Gerei uma dica nova para você começar leve.");
        return;
    }

    if (acao === "descobrir") {
        document.getElementById("descobrir")?.scrollIntoView({ behavior: "smooth", block: "start" });
        ganharXpCupido(1, "Vamos para Descobrir. Minha antena quer comparar compatibilidade.");
        return;
    }

    if (acao === "evento") {
        if (homeActionStatus) {
            homeActionStatus.textContent = "EROS lembrou do evento do dia: entrar em uma sala ao vivo pode render assunto sem esforço.";
        }
        ganharXpCupido(1, "Sugestão do momento: entre no evento do dia e deixe o assunto começar sozinho.");
        return;
    }

    ganharXpCupido(1, missoesCupidoPet[(cupidoXp + indiceHumorCupido) % missoesCupidoPet.length]);
}

function prepararAcaoHome(acao) {
    const perfil = obterPerfilAtual();
    const mensagens = {
        descobrir: {
            status: "Descoberta em foco. Use os botões do card para curtir, recusar ou voltar sem sair da Home.",
            fala: perfil ? `Estou de olho em ${perfil.nome}: ${perfil.percentual}% de compatibilidade. Sem pressão, mas minha antena gostou.` : "Vou procurar alguém com afinidade para você."
        },
        matches: {
            status: "Mostrei suas conexões recentes na lateral. Você pode abrir uma conversa usando uma sugestão pronta.",
            fala: "Matches ficam melhores quando viram conversa. Eu posso te dar uma frase menos sem graça que 'oi'."
        },
        evento: {
            status: "Evento do dia preparado: Clube do Livro ao vivo quando a sala estiver aberta. Use o atalho da navbar para entrar.",
            fala: "Evento ao vivo é bom porque o assunto já nasce andando. Eu recomendo aparecer por lá."
        },
        seguranca: {
            status: "Lembrete rápido: combine local público, avise alguém de confiança e use o checklist antes do encontro.",
            fala: "Romance com checklist é menos poético, mas bem mais inteligente. Eu aprovo."
        },
        jogos: {
            status: "Sala de jogos preparada: quiz de afinidade e perguntas rápidas para quebrar o gelo.",
            fala: "Joguinhos são entrevista de emprego disfarçada de diversão. Eu apoio."
        }
    };
    const selecionada = mensagens[acao] || mensagens.descobrir;

    if (homeActionStatus) {
        homeActionStatus.textContent = selecionada.status;
    }

    atualizarCupidoPet(selecionada.fala);

    if (acao === "evento") {
        registrarAcaoCupido("eventos");
    }

    if (acao === "matches") {
        document.getElementById("conversas").scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (acao === "descobrir") {
        document.getElementById("descobrir").scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function ativarModoHoje(modo) {
    const config = modosHoje[modo] || modosHoje.conversar;

    todayModeButtons.forEach(function (button) {
        button.classList.toggle("active", button.dataset.mode === modo);
    });

    localStorage.setItem("modoHojeMatchConnect", modo);
    if (homeActionStatus) {
        homeActionStatus.textContent = config.status;
    }
    atualizarCupidoPet(config.fala);
}

function navegarComTransicao(destino) {
    if (!destino) {
        return;
    }

    if (destino.startsWith("#")) {
        document.querySelector(destino)?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
    }

    document.body.classList.add("page-transition-out");

    window.setTimeout(function () {
        window.location.href = destino;
    }, 260);
}

function animarCoracoesCupido() {
    if (!cupidoPet) {
        return;
    }

    for (let index = 0; index < 6; index += 1) {
        const heart = document.createElement("span");
        heart.className = "eros-feed-heart";
        heart.innerHTML = '<i class="bi bi-heart-fill"></i>';
        heart.style.setProperty("--heart-x", `${(index - 2.5) * 16}px`);
        heart.style.setProperty("--heart-delay", `${index * 70}ms`);
        cupidoPet.appendChild(heart);

        window.setTimeout(function () {
            heart.remove();
        }, 1100);
    }
}

function mostrarNovaMensagemSimulada(eventoMensagem) {
    if (!eventoMensagem) return;

    const aviso = document.createElement("div");
    aviso.className = "new-message-toast";
    aviso.innerHTML = `
        <span><i class="bi bi-chat-heart-fill"></i></span>
        <div>
            <strong>${eventoMensagem.pessoa} enviou uma mensagem</strong>
            <p>${eventoMensagem.texto}</p>
        </div>
        <a href="../Conversas/Conversas.html">Abrir</a>
    `;
    document.body.appendChild(aviso);
    document.body.classList.add("has-new-message");

    window.setTimeout(function () {
        aviso.classList.add("show");
    }, 40);

    window.setTimeout(function () {
        aviso.classList.remove("show");
        window.setTimeout(function () {
            aviso.remove();
        }, 260);
    }, 5200);
}

function simularMensagemAposMatch(perfil) {
    if (typeof MatchConnectApp === "undefined" || !perfil) return;

    window.setTimeout(function () {
        const eventoMensagem = MatchConnectApp.simularMensagemDoMatch(perfil, "match");
        localStorage.setItem("ultimaMensagemRecebida", JSON.stringify(eventoMensagem));
        mostrarNovaMensagemSimulada(eventoMensagem);
        renderizarConversas(buscaConversas ? buscaConversas.value : "");
    }, 1200);
}

// Atualiza o EROS e dispara a animação do robozinho.
function atualizarCupido() {
    const perfil = obterPerfilAtual();
    const dica = dicasCupido[indiceDicaCupido % dicasCupido.length];
    const nomePerfil = perfil ? perfil.nome : "um novo perfil";

    if (cupidoAlvo) {
        cupidoAlvo.textContent = `Mensagem sugerida para ${nomePerfil}`;
    }

    cupidoDica.textContent = `${dica} Agora o EROS está olhando para ${nomePerfil}.`;
    cupidoMensagem.textContent = montarMensagemCupido(perfil);

    if (cupidoOrb) {
        cupidoOrb.classList.remove("is-guiding");
        void cupidoOrb.offsetWidth;
        cupidoOrb.classList.add("is-guiding");
    }

    atualizarCupidoPet(`Estou olhando para ${nomePerfil}. Minha antena apitou.`);
}

// Explica no card por que aquele perfil combina com o usuário.
function obterMotivosCompatibilidade(perfil) {
    const motivos = [];
    const camadas = obterCamadasInteresses();
    const afinidade = perfil.interessesEmComum.length > 0 ? perfil.interessesEmComum : perfil.interesses.slice(0, 2);

    motivos.push(`${afinidade.join(" + ")} em comum`);
    if (camadas.gostoMuito.some(function (interesse) { return perfil.interesses.includes(interesse); })) {
        motivos.push("Temas que você gosta muito aparecem no perfil");
    }
    if (camadas.queroExplorar.some(function (interesse) { return perfil.interesses.includes(interesse); })) {
        motivos.push("Boa chance para explorar algo novo");
    }
    motivos.push(`Programa: ${perfil.programaIdeal}`);
    motivos.push(`Energia: ${perfil.energia}`);

    return motivos;
}

function resumoCompatibilidadePrincipal(perfil) {
    const camadas = obterCamadasInteresses();
    const emComum = perfil.interessesEmComum.length > 0 ? perfil.interessesEmComum : perfil.interesses.slice(0, 2);
    const favoritos = camadas.gostoMuito.filter(function (interesse) {
        return perfil.interesses.includes(interesse);
    });
    const explorar = camadas.queroExplorar.filter(function (interesse) {
        return perfil.interesses.includes(interesse);
    });
    const bloqueados = camadas.naoCurto.filter(function (interesse) {
        return perfil.interesses.includes(interesse);
    });
    const frasePrincipal = emComum.length > 0
        ? `Vocês combinam principalmente em ${emComum.slice(0, 3).join(", ")}.`
        : `O EROS encontrou sinais de conversa em ${perfil.interesses.slice(0, 2).join(", ")}.`;
    const explicacao = [
        favoritos.length ? `${favoritos.join(", ")} aparece entre os temas que você gosta muito.` : "",
        explorar.length ? `${explorar.join(", ")} pode virar uma descoberta em comum.` : "",
        bloqueados.length ? `Atenção: ${bloqueados.join(", ")} aparece em "não curto".` : "Não há conflito com seus limites informados.",
        `O programa ideal de ${perfil.nome} é ${perfil.programaIdeal}.`,
        `A energia do perfil é ${perfil.energia}.`
    ].filter(Boolean);

    return {
        emComum: emComum,
        favoritos: favoritos,
        explorar: explorar,
        bloqueados: bloqueados,
        frasePrincipal: frasePrincipal,
        explicacao: explicacao
    };
}

function renderizarBarrasCompatibilidade(perfil) {
    return `
        <div class="compat-category-panel">
            <div class="compat-category-head">
                <span>Compatibilidade por categoria</span>
                <small>Além do percentual geral</small>
            </div>
            ${calcularCompatibilidadeCategorias(perfil).map(function (categoria) {
        return `
                <div class="compat-category-row">
                    <div>
                        <strong>${categoria.rotulo}</strong>
                        <span>${categoria.valor}%</span>
                    </div>
                    <em><b style="width:${categoria.valor}%"></b></em>
                </div>
            `;
    }).join("")}
        </div>
    `;
}

function renderizarInformacoesPessoa(perfil) {
    return `
        <div class="interest-layer-panel">
            <span>Informações de ${perfil.nome}</span>
            <div class="interest-layer-row"><small>Interesses</small><strong>${perfil.interesses.join(", ")}</strong></div>
            <div class="interest-layer-row"><small>Busca</small><strong>${perfil.objetivo || "Não informado"}</strong></div>
            <div class="interest-layer-row"><small>Programa ideal</small><strong>${perfil.programaIdeal || "Não informado"}</strong></div>
            <div class="interest-layer-row"><small>Energia</small><strong>${perfil.energia || perfil.personalidade || "Não informado"}</strong></div>
            <div class="interest-layer-row"><small>Sobre</small><strong>${perfil.bio || "Não informado"}</strong></div>
        </div>
    `;
}

function renderizarPainelCompatibilidade(perfil) {
    const resumo = resumoCompatibilidadePrincipal(perfil);

    return `
        <div class="compat-summary-panel">
            <div class="compat-summary-head">
                <div>
                    <span>Por que vocês combinam</span>
                    <strong>${resumo.frasePrincipal}</strong>
                    <p>${resumo.explicacao[0] || "Os sinais de afinidade vêm dos interesses, estilo de encontro e preferências preenchidas."}</p>
                </div>
                <em>${perfil.percentual}%</em>
            </div>
            <div class="compat-summary-tags">
                ${resumo.emComum.slice(0, 4).map(function (interesse) {
        return `<span>${interesse}</span>`;
    }).join("")}
            </div>
            <button class="compat-details-toggle" type="button" data-compat-toggle aria-expanded="false">
                <span>
                    <strong>Ver explicação completa</strong>
                    <small>Categorias, camadas e pontos de atenção</small>
                </span>
                <i class="bi bi-chevron-down"></i>
            </button>
            <div class="compat-details-body" hidden>
                <div class="compat-explain-list">
                    ${resumo.explicacao.map(function (item) {
        return `<p><i class="bi bi-check2-heart"></i>${item}</p>`;
    }).join("")}
                </div>
                ${renderizarBarrasCompatibilidade(perfil)}
                ${renderizarInformacoesPessoa(perfil)}
            </div>
        </div>
    `;
}

// Mostra matches recentes na aba "Matches".
function renderizarMatchesAnimados() {
    const matchesSalvosPerfis = typeof MatchConnectApp !== "undefined" ? MatchConnectApp.getMatchedProfiles() : [];
    const matches = matchesCurtidos.length > 0 ? matchesCurtidos : matchesSalvosPerfis;

    if (!listaMatchesAnimados) return;

    if (matches.length === 0) {
        listaMatchesAnimados.innerHTML = `
            <div class="empty-state compact-empty">
                <i class="bi bi-heart"></i>
                <strong>Sem matches ainda</strong>
                <p>Curta alguém em Descobrir para iniciar sua primeira conversa.</p>
            </div>
        `;
        return;
    }

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
        cupidoDica.textContent = "Ajuste a busca ou edite seus interesses para o EROS encontrar novas conexões.";
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
    const sugestaoCupido = montarMensagemCupido(perfil);
    const interessePergunta = interessesParaExibir[0] || perfil.interesses[0] || "Conversa";
    const perguntaExtraEROS = perguntaComplementarEROS(interessePergunta, sugestaoCupido, perfil);

    cardPerfilSwipe.innerHTML = `
        <div class="discover-photo discover-photo-${perfil.inicial.toLowerCase()}">
            <div class="photo-signal"><i class="bi bi-heart-pulse"></i>${perfil.percentual}% match</div>
            <span>${perfil.inicial}</span>
            <div class="photo-caption">
                <small>Principal afinidade</small>
                <strong>${interessesParaExibir[0] || "Conversa"}</strong>
            </div>
        </div>
        <div class="discover-info">
            <div class="d-flex justify-content-between align-items-start gap-3 mb-2">
                <div>
                    <h3>${perfil.nome}, ${perfil.idade}</h3>
                    <p>${perfil.percentual}% compatível • ${perfil.distanciaKm} km</p>
                </div>
                <span class="compat-badge">${perfil.interessesEmComum.length} em comum</span>
            </div>
            <p class="discover-bio">${perfil.bio}</p>
            <p class="discover-quote">"${perfil.frase}"</p>
            <div class="interest-tags small-tags">
                ${interessesParaExibir.map(function (interesse) {
        return `<button class="tag-match interest-filter-chip" type="button" data-interest="${interesse}">${interesse}</button>`;
    }).join("")}
            </div>
            ${renderizarPainelCompatibilidade(perfil)}
            <div class="discover-cupid-tip">
                <i class="bi bi-stars"></i>
                <span>
                    <small>EROS sugere</small>
                    <strong>${sugestaoCupido}</strong>
                    ${perguntaExtraEROS ? `<em>${perguntaExtraEROS}</em>` : ""}
                </span>
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

    perfisDescoberta = aplicarFiltrosSalvos(ordenarPerfisPorAfinidade()).filter(function (perfil) {
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

// Controla a troca entre abas: EROS, Matches, Eventos e Segurança.
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
    localStorage.setItem("guiaEROSHomeVisto", "true");
    localStorage.removeItem("mostrarTourCupidoHome");
    localStorage.removeItem("mostrarTourEROSHome");
}

// Fecha o guia inicial do EROS.
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
    const deveMostrarAposCadastro = localStorage.getItem("mostrarTourCupidoHome") === "true"
        || localStorage.getItem("mostrarTourEROSHome") === "true";

    if (!cupidoGuide) {
        return;
    }

    if (!deveMostrarAposCadastro
        && (localStorage.getItem("guiaCupidoHomeVisto") === "true"
            || localStorage.getItem("guiaEROSHomeVisto") === "true")) {
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

cardPerfilSwipe.addEventListener("click", function (event) {
    if (swiped) {
        swiped = false;
        return;
    }
    const interesse = event.target.closest("[data-interest]");
    const compatToggle = event.target.closest("[data-compat-toggle]");

    if (compatToggle) {
        event.preventDefault();
        event.stopPropagation();
        const detalhe = cardPerfilSwipe.querySelector(".compat-details-body");
        if (!detalhe) return;
        const abrir = detalhe.hasAttribute("hidden");
        detalhe.toggleAttribute("hidden", !abrir);
        compatToggle.setAttribute("aria-expanded", String(abrir));
        compatToggle.classList.toggle("open", abrir);
        compatToggle.querySelector("strong").textContent = abrir ? "Ocultar explicação completa" : "Ver explicação completa";
        return;
    }

    if (interesse) {
        const termo = interesse.dataset.interest || "";
        if (buscaGlobal) {
            buscaGlobal.value = termo;
        }
        aplicarBuscaGlobal(termo);
        resultadoSwipe.textContent = `Filtrando perfis por ${termo}.`;
        atualizarCupidoPet(`Filtro por ${termo} ativado. Agora vou procurar afinidade nesse assunto.`);
        return;
    }
});

btnRecusar.addEventListener("click", function () {
    atualizarCupidoPet("Tudo bem recusar. Eu também tenho padrões, e olha que eu sou um robô com asas.");
    avancarSwipe("Perfil recusado. Próxima sugestão carregada.", "reject");
});

// --- Drag-to-swipe gesture support on the profile card ---
cardPerfilSwipe.addEventListener("pointerdown", function (e) {
    if (btnRecusar.disabled || btnCurtir.disabled) return;
    if (e.target.closest("button, a, input, select, textarea, [data-compat-toggle], [data-interest]")) return;
    swipeStartX = e.clientX;
    swipeStartY = e.clientY;
    swipeDeltaX = 0;
    swiping = false;
    swiped = false;
    cardPerfilSwipe.setPointerCapture(e.pointerId);
});

cardPerfilSwipe.addEventListener("pointermove", function (e) {
    if (!cardPerfilSwipe.hasPointerCapture(e.pointerId)) return;
    var dx = e.clientX - swipeStartX;
    var dy = e.clientY - swipeStartY;
    if (!swiping && Math.abs(dx) > 10) {
        swiping = true;
        cardPerfilSwipe.style.transition = "none";
        cardPerfilSwipe.style.cursor = "grabbing";
    }
    if (!swiping) return;
    e.preventDefault();
    swipeDeltaX = dx;
    cardPerfilSwipe.style.transform = "translateX(" + dx + "px) rotate(" + (dx * 0.05) + "deg)";
    cardPerfilSwipe.style.opacity = String(Math.max(0.4, 1 - Math.abs(dx) * 0.003));
});

cardPerfilSwipe.addEventListener("pointerup", function (e) {
    cardPerfilSwipe.style.cursor = "";
    if (!swiping) return;
    swiping = false;
    swiped = true;
    cardPerfilSwipe.style.transition = "";
    cardPerfilSwipe.style.transform = "";
    cardPerfilSwipe.style.opacity = "";

    if (swipeDeltaX > SWIPE_THRESHOLD) {
        btnCurtir.click();
    } else if (swipeDeltaX < -SWIPE_THRESHOLD) {
        btnRecusar.click();
    }
});

cardPerfilSwipe.addEventListener("pointercancel", function (e) {
    cardPerfilSwipe.style.cursor = "";
    if (!swiping) return;
    swiping = false;
    cardPerfilSwipe.style.transition = "";
    cardPerfilSwipe.style.transform = "";
    cardPerfilSwipe.style.opacity = "";
});

btnCurtir.addEventListener("click", function () {
    const perfil = perfisDescoberta[indiceSwipe];

    if (!perfil) {
        resultadoSwipe.textContent = "Nenhum perfil disponível para curtir agora.";
        return;
    }

    matchesCurtidos.unshift(perfil);
    if (typeof MatchConnectApp !== "undefined") {
        MatchConnectApp.addMatch(perfil);
    } else if (!matchesSalvos.includes(perfil.nome)) {
        matchesSalvos.unshift(perfil.nome);
        localStorage.setItem("matchesUsuario", JSON.stringify(matchesSalvos));
    }
    renderizarMatchesAnimados();
    renderizarConversas(buscaConversas ? buscaConversas.value : "");
    mostrarAnimacaoMatch(perfil);
    registrarAcaoCupido("likes");
    ganharXpCupido(8, `Nhac! Curtida em ${perfil.nome}. Minha energia subiu.`);
    simularMensagemAposMatch(perfil);
    avancarSwipe(`Você curtiu ${perfil.nome}. A conversa já pode começar.`, "like");
});

btnVoltar.addEventListener("click", function () {
    voltarSwipe();
    atualizarCupidoPet("Voltamos um perfil. Investigação romântica em andamento.");
});

tabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        ativarAba(button.dataset.tab);
    });
});

quickActionCards.forEach(function (card) {
    card.addEventListener("click", function () {
        prepararAcaoHome(card.dataset.homeAction);
        window.setTimeout(function () {
            navegarComTransicao(card.dataset.homeTarget);
        }, card.dataset.homeTarget?.startsWith("#") ? 0 : 520);
    });
});

todayModeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        ativarModoHoje(button.dataset.mode);
    });
});

if (listaMissoesHome) {
    listaMissoesHome.addEventListener("click", function (event) {
        const item = event.target.closest(".home-mission-item");
        if (!item) return;

        atualizarCupidoPet("Missão acompanhada. Faça a ação indicada e eu marco o progresso sozinho.");
    });
}

document.querySelector(".eros-reward-track")?.addEventListener("click", function (event) {
    const botao = event.target.closest("[data-reward]");
    if (!botao) return;

    atualizarCupidoPet(recompensasCupidoPet[botao.dataset.reward]);
});

if (btnNovaDicaCupido) {
    btnNovaDicaCupido.addEventListener("click", function () {
        indiceDicaCupido += 1;
        indiceVariacaoCupido += 1;
        atualizarCupido();
        atualizarSugestao();
        ganharXpCupido(4, "Dica gerada. Eu aceito pagamento em atenção e curtidas.");
    });
}

if (btnCupidoPet) {
    btnCupidoPet.addEventListener("click", function () {
        interagirCupidoAoClique();
    });
}

if (btnAlimentarCupido) {
    btnAlimentarCupido.addEventListener("click", function () {
        animarCoracoesCupido();
        ganharXpCupido(5, "Coração abastecido. Agora posso julgar seus matches com mais carinho.");
    });
}

if (btnMissaoCupido) {
    btnMissaoCupido.addEventListener("click", function () {
        ganharXpCupido(2, missoesCupidoPet[(cupidoXp + 1) % missoesCupidoPet.length]);
    });
}

if (btnEnviarCupidoPet) {
    btnEnviarCupidoPet.addEventListener("click", enviarMensagemCupidoPet);
}

if (btnCopiarCupido) {
    btnCopiarCupido.addEventListener("click", function () {
        if (!conversaSelecionadaHome) {
            resultadoSwipe.textContent = "Selecione uma conversa na lista antes de usar a sugestão.";
            document.getElementById("conversas").scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }
        sugestaoConversa.textContent = cupidoMensagem.textContent;
        resultadoSwipe.textContent = "Dica do EROS enviada para a sugestão de conversa.";
        btnCopiarCupido.textContent = "Sugestão adicionada";
        window.setTimeout(function () {
            btnCopiarCupido.textContent = "Usar na conversa";
        }, 1400);
        document.getElementById("conversas").scrollIntoView({ behavior: "smooth", block: "start" });
    });
}

if (btnEnviarSugestao) {
    btnEnviarSugestao.addEventListener("click", function () {
        const perfil = conversaSelecionadaHome;
        const texto = sugestaoConversa.textContent.trim();

        if (!perfil || !texto) {
            resultadoSwipe.textContent = "Selecione uma conversa antes de enviar uma sugestão.";
            return;
        }

        const mensagens = typeof MatchConnectApp !== "undefined"
            ? MatchConnectApp.getMensagens()
            : lerJsonHome("mensagensUsuario", {});

        if (!mensagens[perfil.nome]) {
            mensagens[perfil.nome] = [];
        }

        mensagens[perfil.nome].push({
            autor: "Você",
            texto: texto,
            data: new Date().toISOString(),
            origem: "sugestao-home"
        });

        if (typeof MatchConnectApp !== "undefined") {
            MatchConnectApp.setMensagens(mensagens);
            MatchConnectApp.registrarHistorico("sugestao-enviada", perfil, texto);
        } else {
            localStorage.setItem("mensagensUsuario", JSON.stringify(mensagens));
        }

        localStorage.setItem("conversaAberta", perfil.nome);
        resultadoSwipe.textContent = `Sugestão enviada para ${perfil.nome}.`;
        registrarAcaoCupido("sugestoes");
        btnEnviarSugestao.textContent = "Sugestão enviada";
        window.setTimeout(function () {
            window.location.href = "../Conversas/Conversas.html";
        }, 450);
    });
}

if (btnAbrirConversaHome) {
    btnAbrirConversaHome.addEventListener("click", function () {
        if (!conversaSelecionadaHome) {
            resultadoSwipe.textContent = "Selecione uma conversa antes de abrir o chat.";
            return;
        }

        localStorage.setItem("conversaAberta", conversaSelecionadaHome.nome);
        window.location.href = "../Conversas/Conversas.html";
    });
}

listaMatchesAnimados.addEventListener("click", function (event) {
    const botao = event.target.closest(".btn-open-chat");

    if (!botao) {
        return;
    }

    selecionarConversaHome(botao.dataset.match);
    document.getElementById("conversas").scrollIntoView({ behavior: "smooth", block: "start" });
});

ideaActions.forEach(function (button) {
    button.addEventListener("click", function () {
        resultadoSwipe.textContent = sugestoesAcao[button.dataset.action] || "Ação preparada.";
        ganharXpCupido(3, "Boa ação. Eu anotei isso no meu diário de romance.");
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
atualizarCupidoPet();
renderizarMissoesHome();
ativarModoHoje(localStorage.getItem("modoHojeMatchConnect") || "conversar");
iniciarInteracoesCupido();
abrirGuiaCupidoSeNecessario();
