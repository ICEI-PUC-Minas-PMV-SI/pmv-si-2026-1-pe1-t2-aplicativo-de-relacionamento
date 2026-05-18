MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const perfis = MatchConnectApp.perfisOrdenados();
const salvos = MatchConnectApp.getMatches();
const matches = perfis.filter(function (perfil) {
    return salvos.includes(perfil.nome);
});

const listaMatches = document.getElementById("listaMatches");

if (matches.length === 0) {
    listaMatches.innerHTML = `
        <div class="col-12">
            <div class="empty-state">
                <i class="bi bi-hearts"></i>
                <strong>Nenhum match confirmado ainda</strong>
                <p>Curta perfis em Descobrir para criar conexões reais e abrir conversas com ajuda do EROS.</p>
                <a class="btn btn-match-primary" href="../home/Homeusuario.html#descobrir">Descobrir perfis</a>
            </div>
        </div>
    `;
} else {
    listaMatches.innerHTML = matches.map(function (perfil) {
    const comum = perfil.interessesEmComum.length > 0 ? perfil.interessesEmComum : perfil.interesses.slice(0, 2);

    return `
        <article class="col-md-6">
            <div class="match-profile-card h-100">
                <div class="match-profile-head">
                    ${MatchConnectApp.avatarHtml(perfil.inicial)}
                    <div>
                        <h2 class="h5 fw-bold mb-0">${perfil.nome}, ${perfil.idade}</h2>
                        <span class="match-profile-meta">${perfil.percentual}% compatível • ${perfil.distanciaKm} km</span>
                    </div>
                </div>
                <p class="text-muted">${perfil.bio}</p>
                <div class="d-flex flex-wrap gap-2 mb-3">
                    ${comum.map(function (interesse) { return `<span class="tag-match">${interesse}</span>`; }).join("")}
                </div>
                <div class="match-profile-actions">
                    <a class="btn btn-match-primary" href="../Conversas/Conversas.html">Abrir conversa</a>
                    <a class="btn btn-match-outline" href="../EROS/EROS.html">EROS</a>
                </div>
            </div>
        </article>
    `;
    }).join("");
}
