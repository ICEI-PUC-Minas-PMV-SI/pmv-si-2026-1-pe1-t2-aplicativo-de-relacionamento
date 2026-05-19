MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const usuarioAtual = MatchConnectApp.usuario();
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

document.getElementById("btnExcluirConta").addEventListener("click", function () {
    const confirmou = window.confirm("Deseja excluir sua conta e remover os dados salvos neste navegador?");

    if (!confirmou) return;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuariosAtualizados = usuarios.filter(function (usuario) {
        return usuario.email !== usuarioAtual.email;
    });

    localStorage.setItem("usuarios", JSON.stringify(usuariosAtualizados));
    [
        "usuarioLogado",
        "interessesUsuario",
        "filtrosMatchConnect",
        "preferenciasDescoberta",
        "matchesUsuario",
        "mensagensUsuario",
        "conversaAberta",
        "notificacoesUsuario",
        "denunciasUsuario",
        "ultimaDenuncia",
        "contatoConfianca",
        "perfilVerificado",
        "assinaturaUsuario",
        "preferenciasUsuario",
        "planoEncontro",
        "conviteEvento",
        "conversasEncerradas",
        "perfisBloqueados",
        "midiasChatUsuario",
        "ultimoLoginVerificado"
    ].forEach(function (chave) {
        localStorage.removeItem(chave);
    });

    window.location.href = "../Cadastro/Cadastro.html";
});
