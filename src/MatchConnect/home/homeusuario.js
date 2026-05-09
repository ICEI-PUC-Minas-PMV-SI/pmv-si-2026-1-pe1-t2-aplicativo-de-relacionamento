const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
const dadosInteresses = JSON.parse(localStorage.getItem("interessesUsuario"));

if (!usuarioLogado) {
    window.location.href = "../login/login.html";
}

const nomeUsuario = document.getElementById("nomeUsuario");
const fotoPerfilNavbar = document.getElementById("fotoPerfilNavbar");
const btnSair = document.getElementById("btnSair");

if (usuarioLogado) {
    nomeUsuario.textContent = usuarioLogado.nome;
}

if (dadosInteresses && dadosInteresses.fotos && dadosInteresses.fotos.length > 0) {
    fotoPerfilNavbar.src = dadosInteresses.fotos[0];
} else {
    fotoPerfilNavbar.src = "../../img/usuarioPadrao.png";
}

btnSair.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "../login/login.html";
});