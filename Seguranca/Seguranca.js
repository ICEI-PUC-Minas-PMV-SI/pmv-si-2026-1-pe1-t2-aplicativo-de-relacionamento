MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const contato = JSON.parse(localStorage.getItem("contatoConfianca")) || {};
document.getElementById("nomeContato").value = contato.nome || "";
document.getElementById("telefoneContato").value = contato.telefone || "";

document.getElementById("formContato").addEventListener("submit", function (event) {
    event.preventDefault();
    const nome = document.getElementById("nomeContato").value.trim();
    const telefone = document.getElementById("telefoneContato").value.trim();

    localStorage.setItem("contatoConfianca", JSON.stringify({ nome: nome, telefone: telefone }));
    document.getElementById("mensagemSeguranca").textContent = "Contato de confiança salvo.";
});

document.querySelectorAll(".acao-seguranca").forEach(function (botao) {
    botao.addEventListener("click", function () {
        document.getElementById("mensagemSeguranca").textContent = botao.dataset.msg;
    });
});
