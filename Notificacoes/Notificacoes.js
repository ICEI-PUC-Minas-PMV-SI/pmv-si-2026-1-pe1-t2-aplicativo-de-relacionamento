MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

let notificacoes = JSON.parse(localStorage.getItem("notificacoesUsuario")) || [
    { icone: "bi-heart-fill", titulo: "Novo match disponível", texto: "Ana apareceu com alta compatibilidade no seu perfil.", lida: false },
    { icone: "bi-chat-dots", titulo: "Mensagem sugerida", texto: "O Cupido preparou uma nova abertura para sua conversa.", lida: false },
    { icone: "bi-shield-check", titulo: "Dica de segurança", texto: "Configure um contato de confiança antes do primeiro encontro.", lida: false },
    { icone: "bi-calendar-heart", titulo: "Evento recomendado", texto: "Café compatível combina com seus interesses cadastrados.", lida: true }
];

function salvar() {
    localStorage.setItem("notificacoesUsuario", JSON.stringify(notificacoes));
}

function renderizar() {
    document.getElementById("listaNotificacoes").innerHTML = notificacoes.map(function (item) {
        return `
            <article class="timeline-item">
                <i class="bi ${item.icone}"></i>
                <div>
                    <strong>${item.titulo}${item.lida ? "" : " • novo"}</strong>
                    <p class="text-muted mb-0">${item.texto}</p>
                </div>
            </article>
        `;
    }).join("");
}

document.getElementById("btnMarcarLidas").addEventListener("click", function () {
    notificacoes = notificacoes.map(function (item) {
        return { ...item, lida: true };
    });
    salvar();
    renderizar();
});

salvar();
renderizar();
