(function () {
    // Menu compartilhado das páginas internas. Ele substitui os menus escritos
    // manualmente em cada HTML e mantém a navegação consistente no site todo.
    const nav = document.querySelector(".navbar-match .navbar-nav");

    if (!nav) {
        return;
    }

    const path = window.location.pathname.toLowerCase();

    // Marca o item atual como ativo comparando a pasta da URL.
    function active(section) {
        return path.includes(`/pages/${section.toLowerCase()}/`) ? " active" : "";
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
            <button class="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Mais
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item${active("Matches")}" href="../Matches/Matches.html"><i class="bi bi-heart-fill"></i> Matches</a></li>
                <li><a class="dropdown-item${active("Favoritos")}" href="../Favoritos/Favoritos.html"><i class="bi bi-bookmark-heart"></i> Favoritos</a></li>
                <li><a class="dropdown-item${active("Cupido")}" href="../Cupido/Cupido.html"><i class="bi bi-robot"></i> Cupido</a></li>
                <li><a class="dropdown-item${active("EventoDia")}" href="../EventoDia/EventoDia.html"><i class="bi bi-book"></i> Evento do dia</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item${active("Seguranca") || active("PrimeiroEncontro")}" href="../Seguranca/Seguranca.html"><i class="bi bi-shield-check"></i> Segurança</a></li>
                <li><a class="dropdown-item${active("Notificacoes")}" href="../Notificacoes/Notificacoes.html"><i class="bi bi-bell"></i> Notificações</a></li>
                <li><a class="dropdown-item${active("Configuracoes")}" href="../Configuracoes/Configuracoes.html"><i class="bi bi-gear"></i> Configurações</a></li>
                <li><a class="dropdown-item${active("Planos")}" href="../Planos/Planos.html"><i class="bi bi-gem"></i> Planos</a></li>
            </ul>
        </li>
        <li class="nav-item">
            <a href="../Perfil/Perfil.html" class="avatar-topo d-inline-flex align-items-center justify-content-center text-decoration-none" aria-label="Abrir perfil">
                <img id="fotoPerfilNavbar" class="foto-perfil-navbar" src="" alt="Foto do perfil">
            </a>
        </li>
        <li class="nav-item">
            <button id="btnSair" class="btn btn-entrar btn-sm" type="button">Sair</button>
        </li>
    `;

    const fotoPerfil = document.getElementById("fotoPerfilNavbar");

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
