const MatchConnectApp = (function () {
    // Dados simulados usados pelas telas de matches, conversas, filtros e Cupido.
    // Em uma versão com backend, essa lista viria de uma API ou banco de dados.
    const perfisBase = [
        {
            nome: "Ana",
            idade: 24,
            inicial: "A",
            interesses: ["Cinema", "Livros", "Gastronomia", "Viagens"],
            objetivo: "Relacionamento sério",
            personalidade: "Calma e curiosa",
            programaIdeal: "Cinema seguido de jantar",
            bio: "Gosta de roteiros tranquilos, bons filmes e conversas que continuam depois do primeiro assunto.",
            mensagem: "Vi que a gente combina em cinema e gastronomia. Qual foi o último lugar que te surpreendeu?"
        },
        {
            nome: "Karol",
            idade: 26,
            inicial: "K",
            interesses: ["Música", "Academia", "Corrida", "Tecnologia"],
            objetivo: "Conhecer pessoas novas",
            personalidade: "Alta e espontânea",
            programaIdeal: "Show, treino ou café depois do trabalho",
            bio: "Curte treino, playlists novas e gente que fala de planos sem perder o bom humor.",
            mensagem: "Você prefere treino com música animada ou podcast para desligar um pouco?"
        },
        {
            nome: "Mariana",
            idade: 23,
            inicial: "M",
            interesses: ["Séries", "Praia", "Pets", "Cinema"],
            objetivo: "Algo leve, sem pressão",
            personalidade: "Doce e observadora",
            programaIdeal: "Praia no fim da tarde",
            bio: "Entre um episódio novo e um fim de tarde na praia, sempre encontra assunto para puxar papo.",
            mensagem: "Se você fosse escolher uma série para rever hoje, qual entraria sem pensar?"
        },
        {
            nome: "Beatriz",
            idade: 27,
            inicial: "B",
            interesses: ["Viagens", "Gastronomia", "Livros", "Música"],
            objetivo: "Conhecer pessoas novas",
            personalidade: "Exploradora e bem-humorada",
            programaIdeal: "Restaurante novo ou bate-volta",
            bio: "Acredita que conhecer pessoas também é descobrir novos lugares, sabores e ideias.",
            mensagem: "Qual viagem curta você faria de novo só pela memória boa?"
        },
        {
            nome: "Luiza",
            idade: 25,
            inicial: "L",
            interesses: ["Games", "Tecnologia", "Séries", "Pets"],
            objetivo: "Amizade",
            personalidade: "Criativa e tranquila",
            programaIdeal: "Game cooperativo e comida em casa",
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

    // Calcula afinidade com base nos interesses em comum e em dados preenchidos pelo usuário.
    function compatibilidade(perfil) {
        const dados = interesses();
        const meusInteresses = Array.isArray(dados.interesses) ? dados.interesses : [];
        const emComum = perfil.interesses.filter(function (interesse) {
            return meusInteresses.includes(interesse);
        });

        return {
            emComum: emComum,
            percentual: Math.min(98, 48 + emComum.length * 12 + (dados.objetivo ? 8 : 0))
        };
    }

    // Retorna os perfis já ordenados do mais compatível para o menos compatível.
    function perfisOrdenados() {
        return perfisBase.map(function (perfil) {
            const afinidade = compatibilidade(perfil);
            return {
                ...perfil,
                interessesEmComum: afinidade.emComum,
                percentual: afinidade.percentual
            };
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

    // Gera o HTML do avatar. Usa foto quando existir; caso contrário, mostra a inicial.
    function avatarHtml(inicial, foto, classe = "avatar-md") {
        if (foto) {
            return `<span class="${classe}"><img src="${foto}" alt="Foto do perfil"></span>`;
        }

        return `<span class="${classe}">${inicial}</span>`;
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
        configurarSair,
        fotoPrincipal,
        getMatches,
        idade,
        interesses,
        perfisOrdenados,
        protegerPagina,
        setJson,
        setMatches,
        usuario
    };
})();
