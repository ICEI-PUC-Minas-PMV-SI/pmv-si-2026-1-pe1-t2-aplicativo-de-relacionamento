MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const contato = JSON.parse(localStorage.getItem("contatoConfianca")) || {};
const perfis = MatchConnectApp.perfisOrdenados();
let denuncias = JSON.parse(localStorage.getItem("denunciasUsuario")) || [];
document.getElementById("nomeContato").value = contato.nome || "";
document.getElementById("telefoneContato").value = contato.telefone || "";
document.getElementById("perfilDenuncia").innerHTML = perfis.map(function (perfil) {
    return `<option>${perfil.nome}</option>`;
}).join("");

function atualizarStatus() {
    document.getElementById("statusVerificacao").textContent = localStorage.getItem("perfilVerificado") === "true" ? "Verificado" : "Em análise";
    document.getElementById("statusContato").textContent = contato.nome ? contato.nome : "Não configurado";
    document.getElementById("statusDenuncia").textContent = denuncias.length === 0 ? "Nenhuma" : `${denuncias.length} registro${denuncias.length === 1 ? "" : "s"}`;
}

document.getElementById("formContato").addEventListener("submit", function (event) {
    event.preventDefault();
    const nome = document.getElementById("nomeContato").value.trim();
    const telefone = document.getElementById("telefoneContato").value.trim();

    localStorage.setItem("contatoConfianca", JSON.stringify({ nome: nome, telefone: telefone }));
    document.getElementById("mensagemSeguranca").textContent = "Contato de confiança salvo.";
    document.getElementById("statusContato").textContent = nome || "Não configurado";
});

document.querySelectorAll(".acao-seguranca").forEach(function (botao) {
    botao.addEventListener("click", function () {
        if (botao.dataset.msg.includes("verificação")) {
            localStorage.setItem("perfilVerificado", "true");
            atualizarStatus();
        }
        document.getElementById("mensagemSeguranca").textContent = botao.dataset.msg;
    });
});

document.getElementById("btnRegistrarDenuncia").addEventListener("click", function () {
    const denuncia = {
        pessoa: document.getElementById("perfilDenuncia").value,
        motivo: document.getElementById("motivoDenuncia").value,
        data: new Date().toISOString()
    };

    denuncias.unshift(denuncia);
    localStorage.setItem("denunciasUsuario", JSON.stringify(denuncias));
    localStorage.setItem("ultimaDenuncia", JSON.stringify(denuncia));
    document.getElementById("mensagemSeguranca").textContent = `Denúncia registrada para ${denuncia.pessoa}.`;
    atualizarStatus();
});

atualizarStatus();
