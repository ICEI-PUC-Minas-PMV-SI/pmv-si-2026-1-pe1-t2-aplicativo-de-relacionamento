MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const perfis = MatchConnectApp.perfisOrdenados();
let perfilAtual = perfis[0];

document.getElementById("matchCentral").innerHTML = perfis.map(function (perfil) {
    return `<option value="${perfil.nome}">${perfil.nome} • ${perfil.percentual}%</option>`;
}).join("");

function renderizarCentral() {
    const detalhes = MatchConnectApp.explicarCompatibilidade(perfilAtual);
    const comum = detalhes.emComum.length > 0 ? detalhes.emComum : perfilAtual.interesses.slice(0, 2);

    document.getElementById("cartaoMatchCentral").innerHTML = `
        <div class="text-center">
            <div class="d-flex justify-content-center mb-3">${MatchConnectApp.avatarHtml(perfilAtual.inicial, "", "avatar-xl")}</div>
            <h2 class="h4 fw-bold mb-1">${perfilAtual.nome}, ${perfilAtual.idade}</h2>
            <p class="text-muted">${perfilAtual.distanciaKm} km de distância • ${perfilAtual.objetivo}</p>
            <p>${perfilAtual.bio}</p>
            <div class="d-flex flex-wrap justify-content-center gap-2">
                ${comum.map(function (item) { return `<span class="tag-match">${item}</span>`; }).join("")}
            </div>
        </div>
    `;

    document.getElementById("tituloCompatibilidade").textContent = `Por que ${perfilAtual.nome} combina`;
    document.getElementById("percentualCompatibilidade").textContent = `${detalhes.percentual}%`;
    document.getElementById("motivosCompatibilidade").innerHTML = detalhes.motivos.map(function (motivo) {
        return `<span class="tag-match">${motivo}</span>`;
    }).join("");
    document.getElementById("categoriasCompatibilidade").innerHTML = `
        <div class="compat-category-panel">
            <div class="compat-category-head">
                <span>Compatibilidade por categoria</span>
                <small>Leitura detalhada</small>
            </div>
            ${detalhes.categorias.map(function (categoria) {
        return `
                <div class="compat-category-row">
                    <div><strong>${categoria.rotulo}</strong><span>${categoria.valor}%</span></div>
                    <em><b style="width:${categoria.valor}%"></b></em>
                </div>
            `;
    }).join("")}
        </div>
    `;
}

function salvarNotificacao(titulo, texto) {
    const notificacoes = JSON.parse(localStorage.getItem("notificacoesUsuario")) || [];
    notificacoes.unshift({ icone: "bi-stars", titulo: titulo, texto: texto, lida: false });
    localStorage.setItem("notificacoesUsuario", JSON.stringify(notificacoes));
}

document.getElementById("matchCentral").addEventListener("change", function (event) {
    perfilAtual = perfis.find(function (perfil) {
        return perfil.nome === event.target.value;
    }) || perfis[0];
    renderizarCentral();
});

document.querySelector(".action-grid").addEventListener("click", function (event) {
    const botao = event.target.closest("[data-action]");
    if (!botao) return;

    const comum = perfilAtual.interessesEmComum[0] || perfilAtual.interesses[0];
    let mensagem = "";

    if (botao.dataset.action === "mensagem") {
        mensagem = `${perfilAtual.nome}, vi ${comum} no seu perfil e fiquei curioso: qual parte disso mais combina com sua rotina hoje?`;
        localStorage.setItem("mensagemCentralMatch", mensagem);
    }

    if (botao.dataset.action === "evento") {
        mensagem = `Plano salvo: convidar ${perfilAtual.nome} para ${perfilAtual.programaIdeal}, em local público e com tempo combinado.`;
        MatchConnectApp.addSalvo("eventosSalvosUsuario", { titulo: perfilAtual.programaIdeal, pessoa: perfilAtual.nome, tipo: "Evento compatível" });
    }

    if (botao.dataset.action === "experiencia") {
        mensagem = `Ideia salva: enviar uma experiência ligada a ${comum} para ${perfilAtual.nome}.`;
        MatchConnectApp.addSalvo("experienciasSalvasUsuario", { titulo: `Experiência de ${comum}`, pessoa: perfilAtual.nome, tipo: "Experiência" });
    }

    if (botao.dataset.action === "seguranca") {
        mensagem = `Checklist preparado para ${perfilAtual.nome}: local público, horário claro e contato de confiança avisado.`;
        localStorage.setItem("checklistCentralMatch", JSON.stringify({ pessoa: perfilAtual.nome, pronto: true }));
    }

    document.getElementById("resultadoCentral").textContent = mensagem;
    salvarNotificacao("Central do Match atualizada", mensagem);
});

renderizarCentral();
