MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const perfis = MatchConnectApp.perfisOrdenados();
const salvos = MatchConnectApp.getMatches();
const matches = perfis.filter(function (perfil) {
    return salvos.includes(perfil.nome);
});

const listaMatches = document.getElementById("listaMatches");

function barrasCategorias(perfil) {
    return `
        <div class="compat-category-panel">
            <div class="compat-category-head">
                <span>Compatibilidade por categoria</span>
                <small>${perfil.percentual}% geral</small>
            </div>
            ${MatchConnectApp.compatibilidadeCategorias(perfil).map(function (categoria) {
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

function camadasResumo(perfil) {
    const camadas = MatchConnectApp.camadasInteresses();
    const gostoMuito = camadas.gostoMuito.filter(function (interesse) {
        return perfil.interesses.includes(interesse);
    });
    const explorar = camadas.queroExplorar.filter(function (interesse) {
        return perfil.interesses.includes(interesse);
    });

    return `
        <div class="interest-layer-panel compact">
            <span>Interesses em camadas</span>
            <div class="interest-layer-row"><small>Gosto muito</small><strong>${gostoMuito.join(", ") || camadas.gostoMuito.join(", ") || "Não informado"}</strong></div>
            <div class="interest-layer-row"><small>Quero explorar</small><strong>${explorar.join(", ") || camadas.queroExplorar.join(", ") || "Não informado"}</strong></div>
            <div class="interest-layer-row"><small>Assunto favorito</small><strong>${camadas.assuntoFavorito || "Não informado"}</strong></div>
        </div>
    `;
}

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
                ${barrasCategorias(perfil)}
                ${camadasResumo(perfil)}
                <div class="match-profile-actions">
                    <a class="btn btn-match-primary" href="../Conversas/Conversas.html">Abrir conversa</a>
                    <a class="btn btn-match-outline" href="../EROS/EROS.html">EROS</a>
                </div>
            </div>
        </article>
    `;
    }).join("");
}
