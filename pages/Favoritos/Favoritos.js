MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const perfis = MatchConnectApp.perfisOrdenados();
let abaAtual = "perfis";
let favoritos = JSON.parse(localStorage.getItem("favoritosUsuario")) || perfis.slice(0, 2).map(function (perfil) {
    return perfil.nome;
});

function salvar() {
    localStorage.setItem("favoritosUsuario", JSON.stringify(favoritos));
}

function renderizar() {
    const lista = document.getElementById("listaFavoritos");

    if (abaAtual !== "perfis") {
        const mapa = {
            eventos: "eventosSalvosUsuario",
            experiencias: "experienciasSalvasUsuario",
            mensagens: "mensagensSalvasUsuario"
        };
        const salvos = MatchConnectApp.getSalvos(mapa[abaAtual]);

        lista.innerHTML = salvos.map(function (item) {
            return `
                <article class="feature-card">
                    <span class="section-kicker">${item.tipo || abaAtual}</span>
                    <h2 class="h5 fw-bold">${item.titulo || "Item salvo"}</h2>
                    <p class="text-muted">${item.pessoa ? `Para ${item.pessoa}` : "Salvo para usar depois."}</p>
                    <a class="btn btn-match-outline" href="../CentralMatch/CentralMatch.html">Usar na central</a>
                </article>
            `;
        }).join("") || '<p class="empty-state">Nada salvo nessa categoria ainda.</p>';
        return;
    }

    const salvos = perfis.filter(function (perfil) {
        return favoritos.includes(perfil.nome);
    });

    lista.innerHTML = salvos.map(function (perfil) {
        const comum = perfil.interessesEmComum.length ? perfil.interessesEmComum : perfil.interesses.slice(0, 2);
        return `
            <article class="feature-card">
                <div class="d-flex align-items-center gap-3 mb-3">
                    ${MatchConnectApp.avatarHtml(perfil.inicial)}
                    <div>
                        <h2 class="h5 mb-0">${perfil.nome}, ${perfil.idade}</h2>
                        <span class="text-muted">${perfil.percentual}% compatível</span>
                    </div>
                </div>
                <p>${perfil.bio}</p>
                <div class="d-flex flex-wrap gap-2 mb-3">
                    ${comum.map(function (item) { return `<span class="tag-match">${item}</span>`; }).join("")}
                </div>
                <div class="page-actions">
                    <a class="btn btn-match-primary" href="../Conversas/Conversas.html">Conversar</a>
                    <button class="btn btn-match-outline remover-favorito" type="button" data-nome="${perfil.nome}">Remover</button>
                </div>
            </article>
        `;
    }).join("") || '<p class="empty-state">Nenhum favorito salvo ainda.</p>';
}

document.getElementById("listaFavoritos").addEventListener("click", function (event) {
    const botao = event.target.closest(".remover-favorito");
    if (!botao) return;
    favoritos = favoritos.filter(function (nome) {
        return nome !== botao.dataset.nome;
    });
    salvar();
    renderizar();
});

document.getElementById("abasFavoritos").addEventListener("click", function (event) {
    const botao = event.target.closest("button");
    if (!botao) return;

    abaAtual = botao.dataset.tipo;
    document.querySelectorAll("#abasFavoritos button").forEach(function (item) {
        item.classList.toggle("active", item === botao);
    });
    renderizar();
});

salvar();
renderizar();
