const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
    window.location.href = "Login.html";
}

const nomeUsuario = document.getElementById("nomeUsuario");
const inicialUsuario = document.getElementById("inicialUsuario");
const btnSair = document.getElementById("btnSair");

if (usuarioLogado) {
    nomeUsuario.textContent = usuarioLogado.nome;
    inicialUsuario.textContent = usuarioLogado.nome.charAt(0).toUpperCase();
}

btnSair.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "Login.html";
});