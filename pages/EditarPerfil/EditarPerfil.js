MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const usuario = MatchConnectApp.usuario();
const dados = MatchConnectApp.interesses();

document.getElementById("nome").value = usuario.nome || "";
document.getElementById("email").value = usuario.email || "";
document.getElementById("objetivo").value = dados.objetivo || "";
document.getElementById("personalidade").value = dados.personalidade || "";
document.getElementById("programaIdeal").value = dados.programaIdeal || "";
document.getElementById("descricao").value = dados.descricao || "";
document.getElementById("interesses").value = Array.isArray(dados.interesses) ? dados.interesses.join(", ") : "";

document.getElementById("formEditarPerfil").addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const mensagem = document.getElementById("mensagemEditar");

    if (!nome || !email) {
        mensagem.textContent = "Informe nome e e-mail.";
        mensagem.style.color = "red";
        return;
    }

    const usuarioAtualizado = {
        ...usuario,
        nome: nome,
        email: email
    };

    const interesses = document.getElementById("interesses").value
        .split(",")
        .map(function (item) { return item.trim(); })
        .filter(Boolean);

    const dadosAtualizados = {
        ...dados,
        objetivo: document.getElementById("objetivo").value,
        personalidade: document.getElementById("personalidade").value,
        programaIdeal: document.getElementById("programaIdeal").value,
        descricao: document.getElementById("descricao").value.trim(),
        interesses: interesses
    };

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const listaAtualizada = usuarios.map(function (item) {
        return item.email === usuario.email ? usuarioAtualizado : item;
    });

    localStorage.setItem("usuarios", JSON.stringify(listaAtualizada));
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));
    localStorage.setItem("interessesUsuario", JSON.stringify(dadosAtualizados));

    mensagem.textContent = "Perfil atualizado com sucesso.";
    mensagem.style.color = "#5a45c8";
});
