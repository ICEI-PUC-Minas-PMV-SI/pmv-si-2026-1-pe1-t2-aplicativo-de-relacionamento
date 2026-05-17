MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const perfis = MatchConnectApp.perfisOrdenados();
const salvos = MatchConnectApp.getMatches();
const matches = salvos.length > 0
    ? perfis.filter(function (perfil) { return salvos.includes(perfil.nome); })
    : perfis.slice(0, 4);

document.getElementById("listaMatches").innerHTML = matches.map(function (perfil) {
    const comum = perfil.interessesEmComum.length > 0 ? perfil.interessesEmComum : perfil.interesses.slice(0, 2);

    return `
        <article class="col-md-6">
            <div class="app-card h-100">
                <div class="d-flex align-items-center gap-3 mb-3">
                    ${MatchConnectApp.avatarHtml(perfil.inicial)}
                    <div>
                        <h2 class="h5 fw-bold mb-0">${perfil.nome}, ${perfil.idade}</h2>
                        <span class="text-muted">${perfil.percentual}% compatível</span>
                    </div>
                </div>
                <p class="text-muted">${perfil.bio}</p>
                <div class="d-flex flex-wrap gap-2 mb-3">
                    ${comum.map(function (interesse) { return `<span class="tag-match">${interesse}</span>`; }).join("")}
                </div>
                <div class="page-actions">
                    <a class="btn btn-match-primary" href="../Conversas/Conversas.html">Abrir conversa</a>
                    <a class="btn btn-match-outline" href="../Cupido/Cupido.html">Cupido</a>
                </div>
            </div>
        </article>
    `;
}).join("");
