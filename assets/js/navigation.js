(function () {
    // Menu compartilhado das páginas internas. Ele substitui os menus escritos
    // manualmente em cada HTML e mantém a navegação consistente no site todo.
    const nav = document.querySelector(".navbar-match .navbar-nav");

    if (!nav) {
        return;
    }

    const path = window.location.pathname.toLowerCase();
    const isAdminPage = path.includes("/pages/admin/");

    function active(section) {
        return path.includes(`/pages/${section.toLowerCase()}/`) ? " active" : "";
    }

    function adminActive(section) {
        return path.includes(`/pages/admin/${section.toLowerCase()}`) ? " active" : "";
    }

    if (isAdminPage) {
        nav.className = "navbar-nav ms-auto align-items-lg-center gap-lg-2 text-center app-main-nav";
        nav.innerHTML = `
            <li class="nav-item">
                <a class="nav-link${adminActive("admindashboard")}" href="../Admin/AdminDashboard.html">
                    <i class="bi bi-bar-chart-line-fill"></i>
                    Painel
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link${adminActive("adminusuarios")}" href="../Admin/AdminUsuarios.html">
                    <i class="bi bi-people-fill"></i>
                    Usuários
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link${adminActive("admindenuncias")}" href="../Admin/AdminDenuncias.html">
                    <i class="bi bi-flag-fill"></i>
                    Denúncias
                </a>
            </li>
            <li class="nav-item">
                <button id="btnSair" class="btn btn-entrar btn-sm" type="button">Sair</button>
            </li>
        `;
        return;
    }

    // Links principais ficam visíveis; páginas secundárias entram no menu "Mais".
    nav.className = "navbar-nav ms-auto align-items-lg-center gap-lg-2 text-center app-main-nav";
    nav.innerHTML = `
        <li class="nav-item">
            <a class="nav-link${active("home")}" href="../home/Homeusuario.html">
                <i class="bi bi-house-heart"></i>
                Início
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="../home/Homeusuario.html#descobrir">
                <i class="bi bi-compass"></i>
                Descobrir
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link${active("Conversas")}" href="../Conversas/Conversas.html">
                <i class="bi bi-chat-heart"></i>
                Conversas
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link${active("Eventos") || active("EventoDia")}" href="../Eventos/Eventos.html">
                <i class="bi bi-calendar-heart"></i>
                Eventos
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link${active("Perfil")}" href="../Perfil/Perfil.html">
                <i class="bi bi-person-heart"></i>
                Perfil
            </a>
        </li>
        <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle" type="button" id="menuMais" data-bs-toggle="dropdown" data-bs-display="static" data-bs-offset="0,12" aria-expanded="false">
                <i class="bi bi-three-dots"></i>
                Mais
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item${active("Matches")}" href="../Matches/Matches.html"><i class="bi bi-heart-fill"></i> Matches</a></li>
                <li><a class="dropdown-item${active("Favoritos")}" href="../Favoritos/Favoritos.html"><i class="bi bi-bookmark-heart"></i> Favoritos</a></li>
                <li><a class="dropdown-item${active("SalaJogos")}" href="../SalaJogos/SalaJogos.html"><i class="bi bi-controller"></i> Sala de Jogos</a></li>
                <li><a class="dropdown-item${active("EROS")}" href="../EROS/EROS.html"><i class="bi bi-robot"></i> EROS</a></li>
                <li><a class="dropdown-item${active("EventoDia")}" href="../EventoDia/EventoDia.html"><i class="bi bi-calendar-event"></i> Modo Evento</a></li>
                <li><a class="dropdown-item${active("Experiencias")}" href="../Experiencias/Experiencias.html"><i class="bi bi-stars"></i> Experiências</a></li>
                <li><a class="dropdown-item${active("Playlists")}" href="../Playlists/Playlists.html"><i class="bi bi-music-note-list"></i> Playlists</a></li>
                <li><a class="dropdown-item" href="../Experiencias/Experiencias.html"><i class="bi bi-book"></i> Livros</a></li>
                <li><a class="dropdown-item${active("Onboarding")}" href="../Onboarding/Onboarding.html"><i class="bi bi-sliders"></i> Preferências</a></li>
                <li><a class="dropdown-item" href="../Sobre/Sobre.html"><i class="bi bi-question-circle"></i> Ajuda</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item${active("Seguranca") || active("PrimeiroEncontro")}" href="../Seguranca/Seguranca.html"><i class="bi bi-shield-check"></i> Segurança</a></li>
                <li><a class="dropdown-item${active("Notificacoes")}" href="../Notificacoes/Notificacoes.html"><i class="bi bi-bell"></i> Notificações</a></li>
                <li><a class="dropdown-item${active("Configuracoes")}" href="../Configuracoes/Configuracoes.html"><i class="bi bi-gear"></i> Configurações</a></li>
                <li><a class="dropdown-item${active("Planos")}" href="../Planos/Planos.html"><i class="bi bi-gem"></i> Planos</a></li>
                <li><a class="dropdown-item" href="../Login/login.html"><i class="bi bi-box-arrow-right"></i> Sair</a></li>
            </ul>
        </li>
        <li class="nav-item">
            <a href="../Perfil/Perfil.html" class="avatar-topo d-inline-flex align-items-center justify-content-center text-decoration-none" aria-label="Abrir perfil">
                <img id="fotoPerfilNavbar" class="foto-perfil-navbar" src="" alt="Foto do perfil">
            </a>
        </li>
        <li class="nav-item nav-actions-group d-flex align-items-center gap-2">
            <button id="darkModeToggle" class="dark-mode-toggle" type="button" aria-label="Alternar modo escuro" title="Alternar modo escuro">
                <i class="bi bi-moon-fill"></i>
                <i class="bi bi-sun-fill"></i>
            </button>
            <button id="btnSair" class="btn btn-entrar" type="button">Sair</button>
        </li>
    `;

    var toggle = document.getElementById("darkModeToggle");
    if (toggle) {
        if (window.MatchConnectTheme) {
            window.MatchConnectTheme.bind(toggle);
        } else if (toggle.dataset.themeBound !== "true") {
            toggle.dataset.themeBound = "true";
            var temaSalvo = localStorage.getItem("matchConnectTheme");
            if (temaSalvo) {
                document.documentElement.setAttribute("data-theme", temaSalvo);
                toggle.setAttribute("aria-label",
                    temaSalvo === "dark" ? "Alternar modo claro" : "Alternar modo escuro");
            }
            toggle.addEventListener("click", function () {
                var html = document.documentElement;
                var tema = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
                html.setAttribute("data-theme", tema);
                localStorage.setItem("matchConnectTheme", tema);
                toggle.setAttribute("aria-label",
                    tema === "dark" ? "Alternar modo claro" : "Alternar modo escuro");
            });
        }
    }

    const menuMais = document.getElementById("menuMais");
    const menuMaisLista = menuMais?.nextElementSibling;

    if (menuMais && menuMaisLista) {
        menuMais.addEventListener("click", function (event) {
            if (window.bootstrap?.Dropdown) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            const aberto = menuMaisLista.classList.toggle("show");
            menuMais.setAttribute("aria-expanded", String(aberto));
        });

        document.addEventListener("click", function (event) {
            if (!menuMais.closest(".dropdown")?.contains(event.target)) {
                menuMaisLista.classList.remove("show");
                menuMais.setAttribute("aria-expanded", "false");
            }
        });
    }

    const fotoPerfil = document.getElementById("fotoPerfilNavbar");

    function totalNaoLidas() {
        try {
            const naoLidas = JSON.parse(localStorage.getItem("mensagensNaoLidas")) || {};
            return Object.values(naoLidas).reduce(function (total, valor) {
                return total + Number(valor || 0);
            }, 0);
        } catch (error) {
            return 0;
        }
    }

    function aplicarIndicadorMensagem() {
        const total = totalNaoLidas();
        const linkConversas = nav.querySelector('a[href="../Conversas/Conversas.html"]');

        if (!linkConversas || total <= 0) {
            return;
        }

        linkConversas.classList.add("has-unread-message");
        linkConversas.insertAdjacentHTML("beforeend", `<span class="nav-unread-badge">${total}</span>`);
        document.body.classList.add("has-new-message");
    }

    aplicarIndicadorMensagem();

    if (fotoPerfil) {
        let dadosInteresses = {};

        // A foto do usuário é salva no localStorage durante o cadastro de interesses.
        try {
            dadosInteresses = JSON.parse(localStorage.getItem("interessesUsuario")) || {};
        } catch (error) {
            dadosInteresses = {};
        }

        // Se o usuário ainda não tiver foto, usamos a logo como fallback visual.
        const fotoPrincipal = dadosInteresses.fotos && dadosInteresses.fotos.length > 0
            ? dadosInteresses.fotos[0]
            : "../../assets/img/MatchConnectLOGO.PNG";

        fotoPerfil.src = fotoPrincipal;
        fotoPerfil.onerror = function () {
            fotoPerfil.src = "../../assets/img/MatchConnectLOGO.PNG";
        };
    }
})();

(function () {
    if (!document.querySelector(".navbar-match")) {
        return;
    }

    if (document.getElementById("erosPet") || document.getElementById("globalEROS")) {
        return;
    }

    const path = window.location.pathname.toLowerCase();
    const contextos = [
        {
            pagina: "eventos",
            skin: "evento",
            fala: "EROS analisou os eventos. Escolha um tema e eu transformo em convite com contexto."
        },
        {
            pagina: "experiencias",
            skin: "experiencia",
            fala: "Experiências abertas. Posso converter qualquer card em um convite mais elegante."
        },
        {
            pagina: "eventoaovivo",
            skin: "live",
            fala: "Sala ao vivo detectada. EROS vai observar bons ganchos para você entrar no papo."
        },
        {
            pagina: "salajogos",
            skin: "esportista",
            fala: "Sala de jogos ligada. Se ganhar, foi estratégia. Se perder, foi charme calibrado."
        }
    ];

    const contextoAtual = contextos.find(function (contexto) {
        return path.includes(`/pages/${contexto.pagina}/`);
    }) || {
        skin: "padrao",
        fala: "EROS ativo. Eu observo afinidade, contexto e oportunidades de conversa."
    };

    const falasPorTema = {
        cinema: [
            "Eros encontrou alguém que também ama cinema cult. Convite leve, referência boa e zero pressa.",
            "Sessão comentada? Perfeito. Filme, pipoca e uma desculpa elegante para continuar a conversa."
        ],
        esportista: [
            "Esse tema pede movimento. Parque público, conversa leve e intenção bem dosada.",
            "EROS percebeu energia de convite ao ar livre. Caminhada curta, química longa."
        ],
        musica: [
            "EROS percebeu alta compatibilidade musical. Uma playlist pode ser o flerte mais honesto.",
            "Esse convite tem ritmo: mande uma música e pergunte qual faixa combina com hoje."
        ],
        games: [
            "Chama para um jogo cooperativo. Se perderem juntos, já é compatibilidade.",
            "Ideia boa: partida rápida, chamada leve e zero pressão de primeiro encontro formal."
        ],
        livros: [
            "Pergunta qual história a pessoa defenderia numa conversa de madrugada.",
            "Livro é atalho para assunto bom. Chama para trocar indicação e escolher um café tranquilo."
        ],
        gastronomia: [
            "Convite simples: lugar movimentado, tempo curto e sobremesa como plano B.",
            "Esse card combina com café. Chama para algo leve antes que eu peça um combo emocional."
        ],
        live: [
            "Entra com uma resposta curta e pergunta algo para alguém continuar.",
            "Sala ao vivo pede presença. Manda uma frase simples e deixa o papo respirar."
        ],
        evento: [
            "Esse tema vira convite se você mencionar o ponto em comum. Simples, preciso, eficiente.",
            "Boa escolha. EROS montaria um convite com local público, duração curta e assunto pronto."
        ],
        experiencia: [
            "Isso pode virar convite, presente ou desculpa elegante para puxar assunto.",
            "Esse card tem potencial. Manda como sugestão leve e vê se a pessoa entra na ideia."
        ],
        padrao: [
            "EROS em ação: Engine for Relationship Optimization & Synergy.",
            "EROS percebeu um sinal social interessante. Quer transformar isso em convite?"
        ]
    };

    const skins = ["padrao", "evento", "experiencia", "live", "cinema", "esportista", "musica", "games", "livros", "gastronomia"];
    let falaAtual = 0;

    function temaPorTexto(texto) {
        const base = texto.toLowerCase();

        if (base.includes("cinema") || base.includes("filme") || base.includes("sessão") || base.includes("series") || base.includes("séries")) return "cinema";
        if (base.includes("corrida") || base.includes("passeio") || base.includes("parque") || base.includes("ar livre") || base.includes("academia") || base.includes("esporte")) return "esportista";
        if (base.includes("música") || base.includes("playlist") || base.includes("show") || base.includes("spotify")) return "musica";
        if (base.includes("game") || base.includes("jogo") || base.includes("gamer")) return "games";
        if (base.includes("livro") || base.includes("leitura") || base.includes("clube do livro")) return "livros";
        if (base.includes("café") || base.includes("gastronomia") || base.includes("restaurante") || base.includes("sabores")) return "gastronomia";
        if (base.includes("ao vivo") || base.includes("sala")) return "live";
        if (base.includes("experiência") || base.includes("parceiro") || base.includes("promoção")) return "experiencia";
        if (base.includes("evento") || base.includes("convite")) return "evento";

        return "padrao";
    }

    function criarEROS() {
        const wrapper = document.createElement("div");
        wrapper.id = "globalEROS";
        wrapper.className = `global-eros global-eros-skin-${contextoAtual.skin}`;
        wrapper.innerHTML = `
            <button class="global-eros-orb" type="button" aria-label="Abrir dica do EROS">
                <span class="global-eros-robot" aria-hidden="true">
                    <span class="global-eros-aura"></span>
                    <span class="global-eros-particle global-eros-particle-one"></span>
                    <span class="global-eros-particle global-eros-particle-two"></span>
                    <span class="global-eros-particle global-eros-particle-three"></span>
                    <span class="global-eros-wing global-eros-wing-left"></span>
                    <span class="global-eros-wing global-eros-wing-right"></span>
                    <span class="global-eros-face">
                        <span class="global-eros-eye"></span>
                        <span class="global-eros-eye"></span>
                        <span class="global-eros-mouth"></span>
                    </span>
                </span>
            </button>
            <div class="global-eros-bubble show">${contextoAtual.fala}</div>
        `;
        document.body.appendChild(wrapper);
        return wrapper;
    }

    const eros = criarEROS();
    const bubble = eros.querySelector(".global-eros-bubble");

    function falar(tema, texto) {
        const falas = falasPorTema[tema] || falasPorTema.padrao;
        const mensagem = texto || falas[falaAtual % falas.length];
        falaAtual += 1;

        eros.classList.add("is-switching");

        window.setTimeout(function () {
            skins.forEach(function (skin) {
                eros.classList.remove(`global-eros-skin-${skin}`);
            });
            eros.classList.add(`global-eros-skin-${tema}`);
            bubble.textContent = mensagem;
            bubble.classList.add("show");
            eros.classList.remove("is-switching");
            eros.classList.add("is-speaking");

            window.setTimeout(function () {
                eros.classList.remove("is-speaking");
            }, 850);
        }, 240);
    }

    window.MatchConnectEROS = {
        react: function (config) {
            const tema = config && config.tema ? temaPorTexto(config.tema) : "padrao";
            falar(tema, config && config.fala);
        }
    };

    eros.querySelector(".global-eros-orb").addEventListener("click", function () {
        bubble.classList.toggle("show");
        if (bubble.classList.contains("show")) {
            falar(contextoAtual.skin);
        }
    });

    document.addEventListener("click", function (event) {
        const alvo = event.target.closest(".feature-card, .commercial-card, .daily-event-card, .live-topic-card, .live-side-card, .live-message, .quick-replies button, .game-score-card, .app-card, .action-card");
        if (!alvo || alvo.closest(".navbar-match") || alvo.closest("#globalEROS")) return;

        const texto = alvo.textContent.trim();
        const tema = temaPorTexto(texto);
        falar(tema);
    });
})();
