(function () {
    function temaAtual() {
        return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    }

    function atualizarBotao(botao) {
        if (!botao) return;

        const tema = temaAtual();
        botao.setAttribute("aria-label", tema === "dark" ? "Alternar modo claro" : "Alternar modo escuro");
        botao.setAttribute("title", tema === "dark" ? "Alternar modo claro" : "Alternar modo escuro");
    }

    function atualizarTodosBotoes() {
        document.querySelectorAll("#darkModeToggle, [data-theme-toggle]").forEach(atualizarBotao);
    }

    function aplicarTemaSalvo() {
        const temaSalvo = localStorage.getItem("matchConnectTheme");

        if (temaSalvo) {
            document.documentElement.setAttribute("data-theme", temaSalvo);
        }
    }

    function alternarTema() {
        const novoTema = temaAtual() === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", novoTema);
        localStorage.setItem("matchConnectTheme", novoTema);
        atualizarTodosBotoes();
    }

    function vincularBotao(botao) {
        if (!botao || botao.dataset.themeBound === "true") return;

        botao.dataset.themeBound = "true";
        atualizarBotao(botao);
        botao.addEventListener("click", alternarTema);
    }

    function criarBotaoFlutuante() {
        if (document.getElementById("darkModeToggle") || document.querySelector("[data-theme-toggle]")) {
            return;
        }

        const botao = document.createElement("button");
        botao.id = "darkModeToggle";
        botao.className = "dark-mode-toggle dark-mode-floating-toggle";
        botao.type = "button";
        botao.innerHTML = '<i class="bi bi-moon-fill"></i><i class="bi bi-sun-fill"></i>';
        document.body.appendChild(botao);
        vincularBotao(botao);
    }

    function iniciar() {
        document.querySelectorAll("#darkModeToggle, [data-theme-toggle]").forEach(vincularBotao);
        criarBotaoFlutuante();
        atualizarTodosBotoes();
    }

    aplicarTemaSalvo();

    window.MatchConnectTheme = {
        bind: vincularBotao,
        toggle: alternarTema,
        refresh: atualizarTodosBotoes
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar);
    } else {
        iniciar();
    }
})();
