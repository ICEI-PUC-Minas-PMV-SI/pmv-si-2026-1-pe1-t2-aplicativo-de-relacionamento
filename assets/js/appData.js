const MatchConnectApp = (function () {
    // Dados simulados usados pelas telas de matches, conversas, filtros e EROS.
    // Em uma versão com backend, essa lista viria de uma API ou banco de dados.
    const perfisBase = [
        {
            nome: "Ana",
            idade: 24,
            distanciaKm: 4,
            inicial: "A",
            foto: "",
            interesses: ["Cinema", "Livros", "Gastronomia", "Viagens"],
            musical: {
                generos: ["pop", "indie", "mpb"],
                artistas: ["Melim", "Vance Joy", "ANAVITÓRIA"],
                climas: ["leve", "romântico", "calma"]
            },
            objetivo: "Relacionamento sério",
            procura: "conversa leve e encontro tranquilo",
            personalidade: "Calma e curiosa",
            energia: "Calma e curiosa",
            programaIdeal: "Cinema seguido de jantar",
            frase: "Prefiro conexões que começam simples e continuam com vontade.",
            bio: "Gosta de roteiros tranquilos, bons filmes e conversas que continuam depois do primeiro assunto.",
            mensagem: "Vi que a gente combina em cinema e gastronomia. Qual foi o último lugar que te surpreendeu?"
        },
        {
            nome: "Karol",
            idade: 26,
            distanciaKm: 12,
            inicial: "K",
            foto: "",
            interesses: ["Música", "Academia", "Corrida", "Tecnologia"],
            musical: {
                generos: ["pop", "eletrônica", "reggaeton"],
                artistas: ["Dua Lipa", "The Weeknd", "Calvin Harris"],
                climas: ["energia", "leve"]
            },
            objetivo: "Conhecer pessoas novas",
            procura: "alguém animado para conversar e sair da rotina",
            personalidade: "Alta e espontânea",
            energia: "Alta e espontânea",
            programaIdeal: "Show, treino ou café depois do trabalho",
            frase: "Se tiver playlist boa e assunto sincero, eu topo.",
            bio: "Curte treino, playlists novas e gente que fala de planos sem perder o bom humor.",
            mensagem: "Você prefere treino com música animada ou podcast para desligar um pouco?"
        },
        {
            nome: "Mariana",
            idade: 23,
            distanciaKm: 7,
            inicial: "M",
            foto: "",
            interesses: ["Séries", "Praia", "Pets", "Cinema"],
            musical: {
                generos: ["pop", "reggae", "mpb"],
                artistas: ["Billie Eilish", "Vitor Kley", "Bob Marley"],
                climas: ["calma", "leve", "romântico"]
            },
            objetivo: "Algo leve, sem pressão",
            procura: "conversas carinhosas e programas sem pressa",
            personalidade: "Doce e observadora",
            energia: "Doce e observadora",
            programaIdeal: "Praia no fim da tarde",
            frase: "Gosto de gente que presta atenção nos detalhes pequenos.",
            bio: "Entre um episódio novo e um fim de tarde na praia, sempre encontra assunto para puxar papo.",
            mensagem: "Se você fosse escolher uma série para rever hoje, qual entraria sem pensar?"
        },
        {
            nome: "Beatriz",
            idade: 27,
            distanciaKm: 18,
            inicial: "B",
            foto: "",
            interesses: ["Viagens", "Gastronomia", "Livros", "Música"],
            musical: {
                generos: ["mpb", "indie", "soul"],
                artistas: ["Djavan", "Marisa Monte", "Gilsons"],
                climas: ["romântico", "leve", "calma"]
            },
            objetivo: "Conhecer pessoas novas",
            procura: "companhia para descobrir lugares e histórias",
            personalidade: "Exploradora e bem-humorada",
            energia: "Exploradora e bem-humorada",
            programaIdeal: "Restaurante novo ou bate-volta",
            frase: "Memória boa quase sempre envolve comida, música ou estrada.",
            bio: "Acredita que conhecer pessoas também é descobrir novos lugares, sabores e ideias.",
            mensagem: "Qual viagem curta você faria de novo só pela memória boa?"
        },
        {
            nome: "Luiza",
            idade: 25,
            distanciaKm: 28,
            inicial: "L",
            foto: "",
            interesses: ["Games", "Tecnologia", "Séries", "Pets"],
            musical: {
                generos: ["eletrônica", "indie", "synthwave"],
                artistas: ["Porter Robinson", "M83", "Kavinsky"],
                climas: ["energia", "indie", "calma"]
            },
            objetivo: "Amizade",
            procura: "parceria para rir, jogar e conversar sem pressão",
            personalidade: "Criativa e tranquila",
            energia: "Criativa e tranquila",
            programaIdeal: "Game cooperativo e comida em casa",
            frase: "Eu gosto quando a conversa parece fase bônus.",
            bio: "Mistura tecnologia, jogos cooperativos e conversas sinceras sem pressa.",
            mensagem: "Qual jogo ou série você recomenda para alguém que quer entrar no seu universo?"
        }
    ];

    // Lê JSON do localStorage com segurança para evitar erro caso o dado esteja vazio ou inválido.
    function getJson(chave, fallback) {
        try {
            return JSON.parse(localStorage.getItem(chave)) || fallback;
        } catch (error) {
            return fallback;
        }
    }

    // Salva objetos/arrays no localStorage sempre no formato JSON.
    function setJson(chave, valor) {
        localStorage.setItem(chave, JSON.stringify(valor));
    }

    function usuario() {
        return getJson("usuarioLogado", null);
    }

    function interesses() {
        return getJson("interessesUsuario", {});
    }

    // Protege páginas internas: se não houver usuário logado, volta para o login.
    function protegerPagina() {
        if (!usuario()) {
            window.location.href = "../Login/login.html";
            throw new Error("Usuario nao logado");
        }
    }

    function sair() {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "../Login/login.html";
    }

    function isAdmin() {
        const dados = usuario();
        return dados && dados.role === "admin";
    }

    // Calcula idade a partir da data de nascimento cadastrada.
    function idade(dataNascimento) {
        if (!dataNascimento) return "";
        const nascimento = new Date(dataNascimento);
        const hoje = new Date();
        let anos = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();

        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            anos--;
        }

        return anos;
    }

    function fotoPrincipal() {
        const dados = interesses();
        return dados.fotos && dados.fotos.length > 0 ? dados.fotos[0] : "";
    }

    function normalizarLista(valor) {
        if (Array.isArray(valor)) return valor;
        if (!valor) return [];
        return String(valor).split(",").map(function (item) {
            return item.trim();
        }).filter(Boolean);
    }

    function camadasInteresses() {
        const dados = interesses();
        const camadas = dados.camadas || {};
        const base = Array.isArray(dados.interesses) ? dados.interesses : [];

        return {
            gostoMuito: normalizarLista(camadas.gostoMuito).length ? normalizarLista(camadas.gostoMuito) : base.slice(0, 2),
            queroExplorar: normalizarLista(camadas.queroExplorar),
            naoCurto: normalizarLista(camadas.naoCurto),
            assuntoFavorito: camadas.assuntoFavorito || base[0] || ""
        };
    }

    // Calcula afinidade com base nos interesses em comum e em dados preenchidos pelo usuário.
    function compatibilidade(perfil) {
        const dados = interesses();
        const meusInteresses = Array.isArray(dados.interesses) ? dados.interesses : [];
        const camadas = camadasInteresses();
        const emComum = perfil.interesses.filter(function (interesse) {
            return meusInteresses.includes(interesse);
        });
        const favoritosEmComum = perfil.interesses.filter(function (interesse) {
            return camadas.gostoMuito.includes(interesse);
        });
        const bloqueados = perfil.interesses.filter(function (interesse) {
            return camadas.naoCurto.includes(interesse);
        });

        return {
            emComum: emComum,
            percentual: Math.max(18, Math.min(98, 48 + emComum.length * 12 + favoritosEmComum.length * 6 + (dados.objetivo ? 8 : 0) - bloqueados.length * 10))
        };
    }

    function compatibilidadeCategorias(perfil) {
        const dados = interesses();
        const meusInteresses = Array.isArray(dados.interesses) ? dados.interesses : [];
        const camadas = camadasInteresses();
        const emComum = perfil.interesses.filter(function (interesse) {
            return meusInteresses.includes(interesse);
        });
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
        const estilo = dados.programaIdeal && perfil.programaIdeal
            ? (perfil.programaIdeal.toLowerCase().includes(dados.programaIdeal.toLowerCase().split(" ")[0]) ? 78 : 58)
            : 56;

        return [
            {
                chave: "conversa",
                rotulo: "Conversa",
                valor: Math.max(35, Math.min(98, 54 + emComum.length * 10 + favoritosEmComum.length * 7 + (camadas.assuntoFavorito ? 6 : 0)))
            },
            {
                chave: "encontro",
                rotulo: "Estilo de encontro",
                valor: Math.max(30, Math.min(96, estilo + explorarEmComum.length * 6 - bloqueados.length * 7))
            },
            {
                chave: "cultura",
                rotulo: "Interesses culturais",
                valor: Math.max(28, Math.min(98, 42 + culturaisComum * 16 + favoritosEmComum.length * 5))
            },
            {
                chave: "rotina",
                rotulo: "Rotina",
                valor: Math.max(24, Math.min(94, 46 + ativosComum * 13 + (perfil.distanciaKm <= 12 ? 14 : 2) - bloqueados.length * 8))
            }
        ];
    }

    function explicarCompatibilidade(perfil) {
        const dados = interesses();
        const afinidade = compatibilidade(perfil);
        const motivos = [];

        if (afinidade.emComum.length > 0) {
            motivos.push(`${afinidade.emComum.join(" + ")} em comum`);
        }

        if (dados.objetivo && perfil.objetivo) {
            motivos.push(`Busca: ${perfil.objetivo}`);
        }

        if (perfil.distanciaKm) {
            motivos.push(`${perfil.distanciaKm} km de distancia`);
        }

        motivos.push(`Programa: ${perfil.programaIdeal}`);

        return {
            percentual: afinidade.percentual,
            emComum: afinidade.emComum,
            motivos: motivos,
            categorias: compatibilidadeCategorias(perfil),
            camadas: camadasInteresses()
        };
    }

    // Retorna os perfis já ordenados do mais compatível para o menos compatível.
    function perfisOrdenados() {
        const bloqueados = getJson("perfisBloqueados", []);
        const encerradas = getJson("conversasEncerradas", []);

        return perfisBase.map(function (perfil) {
            const afinidade = compatibilidade(perfil);
            return {
                ...perfil,
                interessesEmComum: afinidade.emComum,
                percentual: afinidade.percentual
            };
        }).filter(function (perfil) {
            return !bloqueados.includes(perfil.nome) && !encerradas.includes(perfil.nome);
        }).sort(function (a, b) {
            return b.percentual - a.percentual;
        });
    }

    function getMatches() {
        return getJson("matchesUsuario", []);
    }

    function setMatches(matches) {
        setJson("matchesUsuario", matches);
    }

    function perfilPorNome(nome) {
        return perfisOrdenados().find(function (perfil) {
            return perfil.nome === nome;
        }) || perfisBase.find(function (perfil) {
            return perfil.nome === nome;
        });
    }

    function getMatchedProfiles() {
        const nomes = getMatches();
        return nomes.map(perfilPorNome).filter(Boolean);
    }

    function registrarHistorico(tipo, perfil, detalhe = "") {
        const historico = getJson("historicoAfinidade", []);
        historico.unshift({
            tipo: tipo,
            pessoa: perfil ? perfil.nome : "",
            percentual: perfil ? perfil.percentual : null,
            interesses: perfil ? (perfil.interessesEmComum || perfil.interesses || []).slice(0, 4) : [],
            detalhe: detalhe,
            data: new Date().toISOString()
        });
        setJson("historicoAfinidade", historico.slice(0, 40));
        return historico;
    }

    function addMatch(perfil) {
        if (!perfil || !perfil.nome) return getMatches();

        const matches = getMatches();
        if (!matches.includes(perfil.nome)) {
            matches.unshift(perfil.nome);
            setMatches(matches);
            registrarHistorico("match", perfil, "Match criado pela área Descobrir");
        }

        return matches;
    }

    function getMensagens() {
        return getJson("mensagensUsuario", {});
    }

    function setMensagens(mensagens) {
        setJson("mensagensUsuario", mensagens);
    }

    function addMensagem(nome, mensagem) {
        const mensagens = getMensagens();

        if (!mensagens[nome]) {
            mensagens[nome] = [];
        }

        mensagens[nome].push({
            data: new Date().toISOString(),
            ...mensagem
        });
        setMensagens(mensagens);
        return mensagens[nome];
    }

    function getNaoLidas() {
        return getJson("mensagensNaoLidas", {});
    }

    function setNaoLidas(naoLidas) {
        setJson("mensagensNaoLidas", naoLidas);
    }

    function incrementarNaoLida(nome) {
        const naoLidas = getNaoLidas();
        naoLidas[nome] = (naoLidas[nome] || 0) + 1;
        setNaoLidas(naoLidas);
        return naoLidas[nome];
    }

    function marcarConversaLida(nome) {
        const naoLidas = getNaoLidas();
        delete naoLidas[nome];
        setNaoLidas(naoLidas);
    }

    function totalNaoLidas() {
        return Object.values(getNaoLidas()).reduce(function (total, valor) {
            return total + Number(valor || 0);
        }, 0);
    }

    function criarMensagemSimulada(perfil, origem = "match") {
        if (!perfil) return "";

        const interesse = (perfil.interessesEmComum && perfil.interessesEmComum[0]) || perfil.interesses[0] || "um assunto em comum";
        const mensagens = {
            match: [
                `Oi! Curti que a gente combina em ${interesse}. Qual parte disso mais aparece na sua rotina?`,
                `Também reparei em ${interesse}. Você prefere falar disso ou me indicar algo bom?`,
                `Esse match veio com ${perfil.percentual || "boa"}% de afinidade. Começar por ${interesse} parece justo, né?`
            ],
            resposta: [
                `Gostei disso. Me conta mais sobre ${interesse}, fiquei curiosa.`,
                `Boa pergunta. Eu responderia com calma e ainda puxaria ${interesse} de volta para o papo.`,
                `Acho que esse assunto rende. Você toparia transformar ${interesse} em um programa leve?`
            ],
            evento: [
                `Esse evento parece combinar com a gente. Principalmente por causa de ${interesse}.`,
                `Curti a ideia. Se for em local tranquilo e público, eu toparia pensar.`
            ]
        };
        const lista = mensagens[origem] || mensagens.match;
        const indice = Math.abs((perfil.nome || "").length + new Date().getMinutes()) % lista.length;
        return lista[indice];
    }

    function simularMensagemDoMatch(perfil, origem = "match") {
        if (!perfil || !perfil.nome) return null;

        addMatch(perfil);
        const texto = criarMensagemSimulada(perfil, origem);
        addMensagem(perfil.nome, {
            autor: perfil.nome,
            texto: texto,
            origem: origem
        });
        incrementarNaoLida(perfil.nome);
        registrarHistorico("mensagem-recebida", perfil, texto);
        return { pessoa: perfil.nome, texto: texto };
    }

    function resetarEstadoNovoUsuario() {
        [
            "matchesUsuario",
            "mensagensUsuario",
            "mensagensNaoLidas",
            "conversaAberta",
            "conversasAtivas",
            "conversasEncerradas",
            "perfisBloqueados",
            "favoritosUsuario",
            "historicoAfinidade",
            "mensagemEnviadaRecentemente",
            "ultimaMensagemRecebida",
            "planoEncontro",
            "conviteEvento"
        ].forEach(function (chave) {
            localStorage.removeItem(chave);
        });
    }

    function getSalvos(chave) {
        return getJson(chave, []);
    }

    function addSalvo(chave, item) {
        const salvos = getSalvos(chave);
        salvos.unshift({
            ...item,
            salvoEm: new Date().toISOString()
        });
        setJson(chave, salvos);
        return salvos;
    }

    // Gera o HTML do avatar. Usa foto quando existir; caso contrário, mostra a inicial.
    function avatarHtml(inicial, foto, classe = "avatar-md") {
        if (foto) {
            return `<span class="${classe}"><img src="${foto}" alt="Foto do perfil"></span>`;
        }

        const variante = String(inicial || "m").toLowerCase();
        return `<span class="${classe} avatar-person avatar-${variante}"><span>${inicial}</span></span>`;
    }

    // Conecta o botão "Sair" ao fluxo de logout nas páginas que usam esse módulo.
    function configurarSair() {
        const botao = document.getElementById("btnSair");

        if (botao) {
            botao.addEventListener("click", sair);
        }
    }

    return {
        avatarHtml,
        camadasInteresses,
        compatibilidadeCategorias,
        configurarSair,
        explicarCompatibilidade,
        fotoPrincipal,
        addMatch,
        addMensagem,
        criarMensagemSimulada,
        getJson,
        getMatches,
        getMatchedProfiles,
        getMensagens,
        getNaoLidas,
        getSalvos,
        addSalvo,
        idade,
        interesses,
        isAdmin,
        incrementarNaoLida,
        marcarConversaLida,
        perfisBase,
        perfilPorNome,
        perfisOrdenados,
        protegerPagina,
        registrarHistorico,
        resetarEstadoNovoUsuario,
        simularMensagemDoMatch,
        setJson,
        setMensagens,
        setMatches,
        totalNaoLidas,
        usuario
    };
})();

window.MatchConnectApp = MatchConnectApp;
