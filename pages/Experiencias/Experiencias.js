MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const dados = MatchConnectApp.interesses();
const meusInteresses = Array.isArray(dados.interesses) ? dados.interesses : [];
const perfis = MatchConnectApp.perfisOrdenados();
const categoriasExperiencias = ["Todas", "Música", "Ingresso", "Livros", "Gastronomia", "Games", "Ar livre"];

const experiencias = [
    {
        icone: "bi-spotify",
        marca: "Spotify",
        titulo: "Playlist compartilhada",
        categoria: "Música",
        interesses: ["Música", "Academia", "Corrida"],
        oferta: "Monte uma playlist com 12 faixas para quebrar o gelo antes do encontro.",
        acao: "Compartilhar playlist",
        link: "https://open.spotify.com/",
        convite: "montar uma playlist com músicas que combinam com a gente"
    },
    {
        icone: "bi-ticket-perforated",
        marca: "Shows próximos",
        titulo: "Evento de artista compatível",
        categoria: "Ingresso",
        interesses: ["Música", "Viagens"],
        oferta: "Show nos próximos dias, com opção de ingresso promocional para duas pessoas.",
        acao: "Convidar para show",
        link: "https://www.ticketmaster.com/",
        convite: "ver um show nos próximos dias que parece combinar com nossos gostos"
    },
    {
        icone: "bi-book",
        marca: "Clube do Livro",
        titulo: "Promoção de livro",
        categoria: "Livros",
        interesses: ["Livros", "Cinema", "Séries"],
        oferta: "Livro em promoção para presente ou conversa temática, com cupom simulado MatchConnect.",
        acao: "Ver promoção",
        link: "https://www.amazon.com.br/",
        convite: "te mandar uma indicação de livro que combina com seu perfil"
    },
    {
        icone: "bi-cup-hot",
        marca: "Cafés parceiros",
        titulo: "Combo de primeiro encontro",
        categoria: "Gastronomia",
        interesses: ["Gastronomia", "Livros", "Cinema"],
        oferta: "Café + sobremesa em local movimentado, pensado para encontros curtos e seguros.",
        acao: "Salvar combo",
        link: "../PrimeiroEncontro/PrimeiroEncontro.html",
        convite: "marcar um café curto em um lugar movimentado e tranquilo"
    },
    {
        icone: "bi-controller",
        marca: "Game Pass",
        titulo: "Noite cooperativa",
        categoria: "Games",
        interesses: ["Games", "Tecnologia"],
        oferta: "Sugestão de jogo cooperativo para chamada online antes de marcar algo presencial.",
        acao: "Sugerir partida",
        link: "https://www.xbox.com/pt-BR/xbox-game-pass",
        convite: "começar com um jogo cooperativo rapidinho, sem pressão"
    },
    {
        icone: "bi-flower1",
        marca: "Experiências locais",
        titulo: "Passeio com pet",
        categoria: "Ar livre",
        interesses: ["Pets", "Praia", "Corrida"],
        oferta: "Roteiro em parque pet friendly com cafeteria próxima e ponto de encontro público.",
        acao: "Planejar passeio",
        link: "../PrimeiroEncontro/PrimeiroEncontro.html",
        convite: "fazer um passeio leve em parque pet friendly com café por perto"
    }
];

let experienciaSelecionada = null;
let categoriaAtiva = "Todas";

document.getElementById("matchExperiencia").innerHTML = perfis.map(function (perfil) {
    return `<option value="${perfil.nome}">${perfil.nome} • ${perfil.percentual}% compatível</option>`;
}).join("");

function afinidadeExperiencia(experiencia) {
    return experiencia.interesses.filter(function (interesse) {
        return meusInteresses.includes(interesse);
    });
}

function matchSugerido(experiencia) {
    const perfisComPontuacao = perfis.map(function (perfil) {
        const comuns = experiencia.interesses.filter(function (interesse) {
            return perfil.interesses.includes(interesse);
        });

        return {
            perfil: perfil,
            pontos: comuns.length * 20 + perfil.percentual,
            comuns: comuns
        };
    }).sort(function (a, b) {
        return b.pontos - a.pontos;
    });

    return perfisComPontuacao[0];
}

function abrirLinkParceiro(experiencia) {
    if (experiencia.link.startsWith("http")) {
        window.open(experiencia.link, "_blank", "noopener");
        return;
    }

    window.location.href = experiencia.link;
}

function mensagemDaExperiencia() {
    if (!experienciaSelecionada) {
        return "Escolha uma experiência para gerar uma mensagem.";
    }

    const match = document.getElementById("matchExperiencia").value || "você";
    const tom = document.getElementById("tomExperiencia").value;
    const comum = afinidadeExperiencia(experienciaSelecionada);
    const motivo = comum.length > 0
        ? `porque a gente combina em ${comum.join(" e ")}`
        : "porque parece combinar com a nossa conversa";

    if (tom === "direto") {
        return `${match}, vi essa ideia: ${experienciaSelecionada.convite}. Topa? Acho que faz sentido ${motivo}.`;
    }

    if (tom === "presente") {
        return `${match}, isso me lembrou seu perfil: ${experienciaSelecionada.oferta} Posso te mandar como sugestão?`;
    }

    return `${match}, achei uma ideia boa para começar leve: ${experienciaSelecionada.convite}. Acho que faz sentido ${motivo}.`;
}

function atualizarPreview() {
    document.getElementById("mensagemExperiencia").textContent = mensagemDaExperiencia();
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

function selecionarExperiencia(index) {
    experienciaSelecionada = experiencias[index];
    const sugestao = matchSugerido(experienciaSelecionada);

    if (sugestao && sugestao.perfil) {
        document.getElementById("matchExperiencia").value = sugestao.perfil.nome;
    }

    document.getElementById("tituloExperiencia").textContent = experienciaSelecionada.titulo;
    document.getElementById("descricaoExperiencia").textContent = `${experienciaSelecionada.marca}: ${experienciaSelecionada.oferta}`;
    document.getElementById("categoriaExperiencia").textContent = experienciaSelecionada.categoria;
    document.getElementById("statusExperiencia").textContent = experienciaSelecionada.acao;
    atualizarPreview();
    document.getElementById("mensagemExperiencia").scrollIntoView({ behavior: "smooth", block: "center" });

    window.MatchConnectEROS?.react({
        tema: `${experienciaSelecionada.titulo} ${experienciaSelecionada.categoria} ${experienciaSelecionada.interesses.join(" ")}`,
        fala: `Essa experiência combina com ${document.getElementById("matchExperiencia").value}: ${experienciaSelecionada.convite}.`
    });
}

function renderizarCategorias() {
    document.getElementById("filtrosExperiencias").innerHTML = categoriasExperiencias.map(function (categoria) {
        return `
            <button class="${categoria === categoriaAtiva ? "active" : ""}" type="button" data-categoria="${categoria}">
                ${categoria}
            </button>
        `;
    }).join("");
}

function renderizarExperiencias() {
    const ordenadas = experiencias
        .map(function (experiencia, index) {
            return {
                ...experiencia,
                index: index,
                interessesEmComum: afinidadeExperiencia(experiencia),
                match: matchSugerido(experiencia)
            };
        })
        .filter(function (experiencia) {
            return categoriaAtiva === "Todas" || experiencia.categoria === categoriaAtiva;
        })
        .sort(function (a, b) {
            return b.interessesEmComum.length - a.interessesEmComum.length;
        });

    document.getElementById("listaExperiencias").innerHTML = ordenadas.map(function (experiencia) {
        const comum = experiencia.interessesEmComum;
        const destaque = comum.length > 0 ? comum.join(" + ") : experiencia.interesses.slice(0, 2).join(" + ");
        const match = experiencia.match && experiencia.match.perfil ? experiencia.match.perfil : perfis[0];
        const selo = comum.length > 0 ? "Parceiro compatível" : "Sugestão comercial";

        return `
            <article class="commercial-card">
                <div class="commercial-icon">
                    <i class="bi ${experiencia.icone}"></i>
                </div>
                <div class="commercial-content">
                    <div class="commercial-topline">
                        <span>${experiencia.marca}</span>
                        <em>${experiencia.categoria}</em>
                    </div>
                    <span class="commercial-badge">${selo}</span>
                    <h3>${experiencia.titulo}</h3>
                    <p>${experiencia.oferta}</p>
                    <div class="commercial-reason">
                        <i class="bi bi-stars"></i>
                        Baseado em ${destaque}
                    </div>
                    <div class="commercial-match">
                        <i class="bi bi-person-heart"></i>
                        Boa ideia para convidar ${match.nome}
                    </div>
                    <div class="commercial-actions">
                        <button class="btn btn-match-primary escolher-experiencia" type="button" data-index="${experiencia.index}">
                            Enviar convite
                        </button>
                        <button class="btn btn-match-outline abrir-parceiro-card" type="button" data-index="${experiencia.index}">
                            Ver parceiro
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join("") || '<p class="empty-state">Nenhuma experiência nessa categoria.</p>';
}

document.getElementById("listaExperiencias").addEventListener("click", function (event) {
    const botao = event.target.closest(".escolher-experiencia");
    const botaoParceiro = event.target.closest(".abrir-parceiro-card");

    if (botao) {
        selecionarExperiencia(Number(botao.dataset.index));
        return;
    }

    if (botaoParceiro) {
        const experiencia = experiencias[Number(botaoParceiro.dataset.index)];
        selecionarExperiencia(Number(botaoParceiro.dataset.index));
        abrirLinkParceiro(experiencia);
    }
});

document.getElementById("filtrosExperiencias").addEventListener("click", function (event) {
    const botao = event.target.closest("button");
    if (!botao) return;

    categoriaAtiva = botao.dataset.categoria;
    renderizarCategorias();
    renderizarExperiencias();
    document.getElementById("statusExperiencia").textContent = categoriaAtiva === "Todas"
        ? "Todas as ideias"
        : categoriaAtiva;
});

["matchExperiencia", "tomExperiencia"].forEach(function (id) {
    document.getElementById(id).addEventListener("change", atualizarPreview);
});

document.getElementById("btnSalvarExperiencia").addEventListener("click", function () {
    if (!experienciaSelecionada) {
        document.getElementById("statusExperiencia").textContent = "Escolha uma experiência";
        return;
    }

    const plano = {
        match: document.getElementById("matchExperiencia").value,
        local: experienciaSelecionada.marca,
        horario: "nos próximos dias",
        mensagem: mensagemDaExperiencia()
    };

    localStorage.setItem("planoEncontro", JSON.stringify(plano));
    localStorage.setItem("conviteEvento", JSON.stringify(plano));
    document.getElementById("statusExperiencia").textContent = "Ideia salva";
});

document.getElementById("btnCopiarExperiencia").addEventListener("click", function () {
    navigator.clipboard?.writeText(mensagemDaExperiencia());
    document.getElementById("statusExperiencia").textContent = "Mensagem pronta para usar";
});

document.getElementById("btnEnviarExperiencia").addEventListener("click", function () {
    if (!experienciaSelecionada) {
        document.getElementById("statusExperiencia").textContent = "Escolha uma experiência";
        return;
    }

    const match = document.getElementById("matchExperiencia").value;
    const mensagem = mensagemDaExperiencia();
    enviarMensagemParaConversa(match, mensagem);
    document.getElementById("statusExperiencia").textContent = `Mensagem enviada para ${match}`;

    window.setTimeout(function () {
        window.location.href = "../Conversas/Conversas.html";
    }, 500);
});

document.getElementById("btnAbrirParceiro").addEventListener("click", function () {
    if (!experienciaSelecionada) {
        document.getElementById("statusExperiencia").textContent = "Escolha uma experiência";
        return;
    }

    abrirLinkParceiro(experienciaSelecionada);
});

renderizarCategorias();
renderizarExperiencias();
