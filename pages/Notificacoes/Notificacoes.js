MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

let notificacoes = JSON.parse(localStorage.getItem("notificacoesUsuario")) || [
    { icone: "bi-heart-fill", titulo: "Novo match disponível", texto: "Ana apareceu com alta compatibilidade no seu perfil.", lida: false },
    { icone: "bi-chat-dots", titulo: "Mensagem sugerida", texto: "O EROS preparou uma nova abertura para sua conversa.", lida: false },
    { icone: "bi-shield-check", titulo: "Dica de segurança", texto: "Configure um contato de confiança antes do primeiro encontro.", lida: false },
    { icone: "bi-calendar-heart", titulo: "Evento recomendado", texto: "Café compatível combina com seus interesses cadastrados.", lida: true }
];

const experienciasSalvas = MatchConnectApp.getSalvos("experienciasSalvasUsuario");
const eventosSalvos = MatchConnectApp.getSalvos("eventosSalvosUsuario");
const ultimaDenuncia = JSON.parse(localStorage.getItem("ultimaDenuncia")) || null;

function adicionarSeNaoExiste(icone, titulo, texto) {
    const existe = notificacoes.some(function (item) {
        return item.titulo === titulo && item.texto === texto;
    });

    if (!existe) {
        notificacoes.unshift({ icone: icone, titulo: titulo, texto: texto, lida: false });
    }
}

if (experienciasSalvas.length > 0) {
    adicionarSeNaoExiste("bi-bag-heart", "Experiência salva", `${experienciasSalvas[0].titulo} está pronta para virar convite.`);
}

if (eventosSalvos.length > 0) {
    adicionarSeNaoExiste("bi-calendar-heart", "Evento salvo", `${eventosSalvos[0].titulo} foi guardado para usar na Central do Match.`);
}

if (ultimaDenuncia) {
    adicionarSeNaoExiste("bi-shield-exclamation", "Denúncia em rascunho", `Finalize a análise de ${ultimaDenuncia.pessoa} na Central de segurança.`);
}

function salvar() {
    localStorage.setItem("notificacoesUsuario", JSON.stringify(notificacoes));
}

function renderizar() {
    const lista = document.getElementById("listaNotificacoes");

    if (notificacoes.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-bell-slash"></i>
                <strong>Nada novo por aqui</strong>
                <p>Quando surgirem matches, mensagens, eventos ou alertas de segurança, eles aparecem nesta central.</p>
                <a class="btn btn-match-primary" href="../home/Homeusuario.html#descobrir">Voltar para o início</a>
            </div>
        `;
        return;
    }

    lista.innerHTML = notificacoes.map(function (item) {
        return `
            <article class="notification-item ${item.lida ? "" : "is-new"}">
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
