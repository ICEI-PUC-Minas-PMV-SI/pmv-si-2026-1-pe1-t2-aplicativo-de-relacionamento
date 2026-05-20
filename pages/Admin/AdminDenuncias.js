MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

if (!MatchConnectApp.isAdmin()) {
    window.location.href = "../Login/login.html";
}

let denuncias = JSON.parse(localStorage.getItem("denunciasUsuario")) || [];
const listaDenuncias = document.getElementById("listaDenuncias");

function salvarDenuncias() {
    localStorage.setItem("denunciasUsuario", JSON.stringify(denuncias));
}

function formatarData(data) {
    if (!data) return "-";
    return new Date(data).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function statusLabel(status) {
    if (!status || status === "pendente") return "Pendente";
    if (status === "em_analise") return "Em análise";
    if (status === "resolvido") return "Resolvido";
    if (status === "rejeitado") return "Rejeitado";
    return status;
}

function statusClass(status) {
    if (!status || status === "pendente") return "warning";
    if (status === "em_analise") return "primary";
    if (status === "resolvido") return "success";
    if (status === "rejeitado") return "danger";
    return "secondary";
}

function renderizarDenuncias() {
    if (denuncias.length === 0) {
        listaDenuncias.innerHTML = "<div class='text-muted'>Nenhuma denúncia registrada.</div>";
        return;
    }

    listaDenuncias.innerHTML = denuncias.map(function (denuncia, index) {
        const status = denuncia.status || "pendente";
        return `
            <div class="app-panel p-4 mb-3">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <h3 class="h5 mb-1">${denuncia.pessoa}</h3>
                        <small class="text-muted">${formatarData(denuncia.data)}</small>
                    </div>
                    <span class="badge bg-${statusClass(status)} text-uppercase">${statusLabel(status)}</span>
                </div>
                <p>${denuncia.motivo}</p>
                <div class="d-flex flex-wrap gap-2">
                    <button class="btn btn-sm btn-match-outline" data-index="${index}" data-status="em_analise">Em análise</button>
                    <button class="btn btn-sm btn-match-outline" data-index="${index}" data-status="resolvido">Resolvido</button>
                    <button class="btn btn-sm btn-danger" data-index="${index}" data-status="rejeitado">Rejeitado</button>
                </div>
            </div>
        `;
    }).join("");
}

listaDenuncias.addEventListener("click", function (event) {
    const botao = event.target.closest("button[data-index]");
    if (!botao) return;

    const index = Number(botao.dataset.index);
    const status = botao.dataset.status;

    if (index < 0 || index >= denuncias.length) return;

    denuncias[index].status = status;
    denuncias[index].atualizadoEm = new Date().toISOString();
    salvarDenuncias();
    renderizarDenuncias();
});

renderizarDenuncias();
