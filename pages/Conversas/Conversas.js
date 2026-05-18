MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const perfis = MatchConnectApp.perfisOrdenados();
const conversaSalva = localStorage.getItem("conversaAberta");
let conversaAtual = perfis.find(function (perfil) {
    return perfil.nome === conversaSalva;
}) || perfis[0];
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

    if (filtradas.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-search-heart"></i>
                <strong>Nenhuma conversa encontrada</strong>
                <p>Tente buscar por outro interesse ou volte para Descobrir para criar novas conexões.</p>
                <a class="btn btn-match-primary" href="../home/Homeusuario.html#descobrir">Descobrir</a>
            </div>
        `;
        return;
    }

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
    }).join("");
}

function renderizarChat() {
    const detalhes = MatchConnectApp.explicarCompatibilidade(conversaAtual);
    document.getElementById("chatCabecalho").innerHTML = `
        ${MatchConnectApp.avatarHtml(conversaAtual.inicial)}
        <div>
            <h2 class="h4 fw-bold mb-0">${conversaAtual.nome}</h2>
            <span class="text-muted">${detalhes.percentual}% compatível • ${detalhes.motivos.slice(0, 2).join(" • ")}</span>
        </div>
    `;

    document.getElementById("sugestaoEROS").textContent = conversaAtual.mensagem;

    document.getElementById("chatMensagens").innerHTML = mensagensDoPerfil(conversaAtual.nome).map(function (mensagem) {
        const minha = mensagem.autor === "Você";
        return `
            <div class="d-flex ${minha ? "justify-content-end" : "justify-content-start"} mb-2">
                <span class="chat-message ${minha ? "outgoing" : "incoming"}">
                    ${mensagem.texto}
                </span>
            </div>
        `;
    }).join("");

    document.getElementById("chatMensagens").scrollIntoView({ behavior: "smooth", block: "end" });
}

document.getElementById("listaConversas").addEventListener("click", function (event) {
    const botao = event.target.closest("[data-nome]");
    if (!botao) return;
    conversaAtual = perfis.find(function (perfil) {
        return perfil.nome === botao.dataset.nome;
    });
    localStorage.setItem("conversaAberta", conversaAtual.nome);
    renderizarChat();
});

document.getElementById("buscaConversas").addEventListener("input", function (event) {
    renderizarLista(event.target.value);
});

document.getElementById("btnUsarSugestao").addEventListener("click", function () {
    document.getElementById("campoMensagem").value = conversaAtual.mensagem;
});

document.querySelectorAll(".acao-chat").forEach(function (botao) {
    botao.addEventListener("click", function () {
        const comum = conversaAtual.interessesEmComum[0] || conversaAtual.interesses[0];

        if (botao.dataset.acao === "evento") {
            document.getElementById("campoMensagem").value = `${conversaAtual.nome}, pensei em um programa simples ligado a ${comum}. Topa combinar algo em local público?`;
        }

        if (botao.dataset.acao === "experiencia") {
            document.getElementById("campoMensagem").value = `${conversaAtual.nome}, vi uma experiência de ${comum} que parece combinar com a gente. Quer que eu te mande?`;
            MatchConnectApp.addSalvo("experienciasSalvasUsuario", { titulo: `Experiência de ${comum}`, pessoa: conversaAtual.nome, tipo: "Chat" });
        }

        if (botao.dataset.acao === "denuncia") {
            localStorage.setItem("ultimaDenuncia", JSON.stringify({ pessoa: conversaAtual.nome, origem: "Conversas" }));
            document.getElementById("sugestaoEROS").textContent = `Denúncia preparada para ${conversaAtual.nome}. Você pode finalizar na Central de segurança.`;
        }
    });
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
