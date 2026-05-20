MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

if (!MatchConnectApp.isAdmin()) {
    window.location.href = "../Login/login.html";
}

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const corpoTabela = document.getElementById("corpoTabelaUsuarios");
const buscaUsuarios = document.getElementById("buscaUsuarios");

function salvarUsuarios() {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function formatarData(data) {
    if (!data) return "-";
    return new Date(data).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function criarLinha(usuario) {
    const status = usuario.blocked ? "Bloqueado" : "Ativo";
    const botaoBloquear = usuario.blocked ? "Desbloquear" : "Bloquear";
    const botaoVerificar = usuario.perfilVerificado ? "Reverter" : "Verificar";

    return `
        <tr>
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${formatarData(usuario.createdAt)}</td>
            <td>${status}</td>
            <td>${usuario.perfilVerificado ? "Sim" : "Não"}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-match-outline me-2" data-acao="toggleBloqueio" data-email="${usuario.email}">${botaoBloquear}</button>
                <button class="btn btn-sm btn-match-outline me-2" data-acao="toggleVerificacao" data-email="${usuario.email}">${botaoVerificar}</button>
                <button class="btn btn-sm btn-danger" data-acao="excluir" data-email="${usuario.email}">Excluir</button>
            </td>
        </tr>
    `;
}

function renderizarUsuarios() {
    const filtro = buscaUsuarios.value.trim().toLowerCase();
    const listaFiltrada = usuarios.filter(function (usuario) {
        const texto = `${usuario.nome} ${usuario.email} ${usuario.role || "user"}`.toLowerCase();
        return texto.includes(filtro);
    });

    if (listaFiltrada.length === 0) {
        corpoTabela.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted py-4">Nenhum usuário encontrado.</td>
            </tr>
        `;
        return;
    }

    corpoTabela.innerHTML = listaFiltrada.map(criarLinha).join("");
}

function atualizarUsuario(email, acao) {
    const usuario = usuarios.find(function (item) {
        return item.email === email;
    });

    if (!usuario) return;

    if (acao === "toggleBloqueio") {
        usuario.blocked = !usuario.blocked;
    }

    if (acao === "toggleVerificacao") {
        usuario.perfilVerificado = !usuario.perfilVerificado;
    }

    if (acao === "excluir") {
        const usuarioAtual = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
        if (usuario.email === usuarioAtual.email) {
            window.alert("Não é possível excluir seu próprio usuário enquanto estiver logado.");
            return;
        }

        if (!window.confirm(`Deseja remover ${usuario.nome} (${usuario.email}) do sistema?`)) {
            return;
        }

        usuarios = usuarios.filter(function (item) {
            return item.email !== email;
        });
    }

    salvarUsuarios();
    renderizarUsuarios();
}

document.getElementById("corpoTabelaUsuarios").addEventListener("click", function (event) {
    const botao = event.target.closest("button[data-acao]");
    if (!botao) return;
    atualizarUsuario(botao.dataset.email, botao.dataset.acao);
});

buscaUsuarios.addEventListener("input", renderizarUsuarios);
renderizarUsuarios();
