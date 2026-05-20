MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

if (!MatchConnectApp.isAdmin()) {
    window.location.href = "../Login/login.html";
}

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const denuncias = JSON.parse(localStorage.getItem("denunciasUsuario")) || [];

function formatarData(data) {
    if (!data) return "-";
    return new Date(data).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function calcularNovosUsuarios() {
    return usuarios.filter(function (usuario) {
        if (!usuario.createdAt) return false;
        const diferenca = Date.now() - new Date(usuario.createdAt).getTime();
        return diferenca <= 7 * 24 * 60 * 60 * 1000;
    }).length;
}

function renderizarDashboard() {
    const totalUsuarios = usuarios.length;
    const bloqueados = usuarios.filter(function (usuario) {
        return usuario.blocked === true;
    }).length;
    const verificacoes = usuarios.filter(function (usuario) {
        return usuario.perfilVerificado === true;
    }).length;
    const novosUsuarios = calcularNovosUsuarios();
    const pendentes = denuncias.filter(function (item) {
        return !item.status || item.status === "pendente";
    }).length;

    document.getElementById("totalUsuarios").textContent = totalUsuarios;
    document.getElementById("usuariosAtivos").textContent = Math.max(0, totalUsuarios - bloqueados);
    document.getElementById("denunciasPendentes").textContent = pendentes;
    document.getElementById("novosUsuarios").textContent = novosUsuarios;

    const listaDenuncias = document.getElementById("listaDenuncias");
    if (denuncias.length === 0) {
        listaDenuncias.innerHTML = "<div class='text-muted'>Nenhuma denúncia registrada no momento.</div>";
        return;
    }

    listaDenuncias.innerHTML = denuncias.slice(0, 6).map(function (denuncia) {
        const status = denuncia.status || "pendente";
        const cor = status === "resolvido" ? "success" : status === "rejeitado" ? "danger" : "warning";
        return `
            <div class="list-group-item rounded-4 border mb-3">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <strong>${denuncia.pessoa}</strong>
                        <p class="mb-1 text-muted">${denuncia.motivo}</p>
                        <small class="text-muted">${formatarData(denuncia.data)}</small>
                    </div>
                    <span class="badge bg-${cor} text-uppercase">${status.replace("pendente", "Pendente").replace("em_analise", "Em análise").replace("resolvido", "Resolvido").replace("rejeitado", "Rejeitado")}</span>
                </div>
            </div>
        `;
    }).join("");
}

renderizarDashboard();
