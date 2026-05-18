MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const perfis = MatchConnectApp.perfisOrdenados();
const plano = JSON.parse(localStorage.getItem("planoEncontro")) || {};
const contato = JSON.parse(localStorage.getItem("contatoConfianca")) || {};

document.getElementById("matchEncontro").innerHTML = perfis.map(function (perfil) {
    return `<option value="${perfil.nome}">${perfil.nome}</option>`;
}).join("");
document.getElementById("matchEncontro").value = plano.match || perfis[0].nome;
document.getElementById("localEncontro").value = plano.local || "";
document.getElementById("horarioEncontro").value = plano.horario || "";

function renderizarChecklist() {
    const itens = [
        { icone: "bi-geo-alt", titulo: "Local público", texto: document.getElementById("localEncontro").value || "Escolha um lugar movimentado." },
        { icone: "bi-clock", titulo: "Horário claro", texto: document.getElementById("horarioEncontro").value || "Combine início e limite de tempo." },
        { icone: "bi-telephone", titulo: "Contato de confiança", texto: contato.nome ? `${contato.nome} está salvo na Central de Segurança.` : "Cadastre um contato de confiança." },
        { icone: "bi-chat-heart", titulo: "Assunto inicial", texto: "Use o EROS para chegar com uma pergunta simples." }
    ];

    document.getElementById("checklistEncontro").innerHTML = itens.map(function (item) {
        return `<article class="timeline-item"><i class="bi ${item.icone}"></i><div><strong>${item.titulo}</strong><p class="text-muted mb-0">${item.texto}</p></div></article>`;
    }).join("");
}

document.getElementById("formEncontro").addEventListener("submit", function (event) {
    event.preventDefault();
    const novoPlano = {
        match: document.getElementById("matchEncontro").value,
        local: document.getElementById("localEncontro").value.trim(),
        horario: document.getElementById("horarioEncontro").value.trim()
    };
    localStorage.setItem("planoEncontro", JSON.stringify(novoPlano));
    document.getElementById("statusEncontro").textContent = "Plano salvo. Revise o checklist antes de confirmar.";
    renderizarChecklist();
});

renderizarChecklist();
