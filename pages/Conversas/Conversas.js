MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const perfis = MatchConnectApp.perfisOrdenados();
let conversaAtual = perfis[0];
const mensagens = JSON.parse(localStorage.getItem("mensagensUsuario")) || {};

function mensagensDoPerfil(nome) {
    if (!mensagens[nome]) {
        mensagens[nome] = [
            { autor: nome, texto: "Oi! Vi que a gente tem alguns interesses em comum." }
        ];
    }

    return mensagens[nome];
}

function salvarMensagens() {
    localStorage.setItem("mensagensUsuario", JSON.stringify(mensagens));
}

function renderizarLista(filtro = "") {
    const termo = filtro.trim().toLowerCase();
    const lista = document.getElementById("listaConversas");
    const filtradas = perfis.filter(function (perfil) {
        return perfil.nome.toLowerCase().includes(termo)
            || perfil.interesses.join(" ").toLowerCase().includes(termo);
    });

    lista.innerHTML = filtradas.map(function (perfil) {
        return `
            <button class="list-row w-100 text-start bg-transparent border-0" type="button" data-nome="${perfil.nome}">
                ${MatchConnectApp.avatarHtml(perfil.inicial)}
                <span class="row-main">
                    <strong>${perfil.nome}</strong>
                    <small>${perfil.percentual}% compatível • ${perfil.interesses.slice(0, 2).join(", ")}</small>
                </span>
            </button>
        `;
    }).join("") || '<p class="empty-state">Nenhuma conversa encontrada.</p>';
}

function renderizarChat() {
    document.getElementById("chatCabecalho").innerHTML = `
        ${MatchConnectApp.avatarHtml(conversaAtual.inicial)}
        <div>
            <h2 class="h4 fw-bold mb-0">${conversaAtual.nome}</h2>
            <span class="text-muted">${conversaAtual.percentual}% compatível</span>
        </div>
    `;

    document.getElementById("sugestaoCupido").textContent = conversaAtual.mensagem;

    document.getElementById("chatMensagens").innerHTML = mensagensDoPerfil(conversaAtual.nome).map(function (mensagem) {
        const minha = mensagem.autor === "Você";
        return `
            <div class="d-flex ${minha ? "justify-content-end" : "justify-content-start"} mb-2">
                <span class="app-card ${minha ? "text-white" : ""}" style="${minha ? "background:#8652f5;border-color:#8652f5;" : ""}">
                    ${mensagem.texto}
                </span>
            </div>
        `;
    }).join("");
}

document.getElementById("listaConversas").addEventListener("click", function (event) {
    const botao = event.target.closest("[data-nome]");
    if (!botao) return;
    conversaAtual = perfis.find(function (perfil) {
        return perfil.nome === botao.dataset.nome;
    });
    renderizarChat();
});

document.getElementById("buscaConversas").addEventListener("input", function (event) {
    renderizarLista(event.target.value);
});

document.getElementById("btnUsarSugestao").addEventListener("click", function () {
    document.getElementById("campoMensagem").value = conversaAtual.mensagem;
});

document.getElementById("formMensagem").addEventListener("submit", function (event) {
    event.preventDefault();
    const campo = document.getElementById("campoMensagem");
    const texto = campo.value.trim();

    if (!texto) return;

    mensagensDoPerfil(conversaAtual.nome).push({ autor: "Você", texto: texto });
    campo.value = "";
    salvarMensagens();
    renderizarChat();
});

renderizarLista();
renderizarChat();
