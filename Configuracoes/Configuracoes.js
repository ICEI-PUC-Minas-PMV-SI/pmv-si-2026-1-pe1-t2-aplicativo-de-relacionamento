MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const preferencias = JSON.parse(localStorage.getItem("preferenciasUsuario")) || {
    notificacoes: true,
    perfilVisivel: true,
    tomConversa: "Leve e divertido"
};

document.getElementById("notificacoes").checked = preferencias.notificacoes;
document.getElementById("perfilVisivel").checked = preferencias.perfilVisivel;
document.getElementById("tomConversa").value = preferencias.tomConversa;

document.getElementById("formConfiguracoes").addEventListener("submit", function (event) {
    event.preventDefault();

    localStorage.setItem("preferenciasUsuario", JSON.stringify({
        notificacoes: document.getElementById("notificacoes").checked,
        perfilVisivel: document.getElementById("perfilVisivel").checked,
        tomConversa: document.getElementById("tomConversa").value
    }));

    document.getElementById("mensagemConfig").textContent = "Preferências salvas.";
});

document.getElementById("btnLimparSessao").addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "../Login/login.html";
});
