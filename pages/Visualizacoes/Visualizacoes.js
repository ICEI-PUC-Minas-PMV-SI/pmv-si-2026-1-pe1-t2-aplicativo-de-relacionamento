MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const visitantes = MatchConnectApp.perfisOrdenados().slice(0, 5).map(function (perfil, index) {
    return {
        ...perfil,
        tempo: ["agora", "12 min", "1 h", "ontem", "2 dias"][index]
    };
});

document.getElementById("listaVisualizacoes").innerHTML = visitantes.map(function (perfil) {
    const detalhes = MatchConnectApp.explicarCompatibilidade(perfil);
    return `
        <article class="match-profile-card">
            <div class="match-profile-head">
                ${MatchConnectApp.avatarHtml(perfil.inicial)}
                <div>
                    <h2 class="h5 mb-0">${perfil.nome}</h2>
                    <span class="match-profile-meta">Viu seu perfil ${perfil.tempo}</span>
                </div>
            </div>
            <p>${detalhes.percentual}% compatível • ${perfil.distanciaKm} km de distância</p>
            <div class="d-flex flex-wrap gap-2 mb-3">
                ${detalhes.motivos.slice(0, 3).map(function (motivo) { return `<span class="tag-match">${motivo}</span>`; }).join("")}
            </div>
            <div class="match-profile-actions">
                <a class="btn btn-match-primary" href="../Conversas/Conversas.html">Conversar</a>
                <a class="btn btn-match-outline" href="../CentralMatch/CentralMatch.html">Ver central</a>
            </div>
        </article>
    `;
}).join("");
