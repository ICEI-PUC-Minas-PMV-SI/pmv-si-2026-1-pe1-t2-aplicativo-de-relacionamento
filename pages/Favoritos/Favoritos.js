MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const perfis = MatchConnectApp.perfisOrdenados();
let abaAtual = "perfis";
let favoritos = JSON.parse(localStorage.getItem("favoritosUsuario")) || [];

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

        if (salvos.length === 0) {
            lista.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-collection-heart"></i>
                    <strong>Nada salvo nessa categoria ainda</strong>
                    <p>Salve eventos, experiências ou mensagens pela Central do Match para montar convites com mais contexto.</p>
                    <a class="btn btn-match-primary" href="../CentralMatch/CentralMatch.html">Abrir central</a>
                </div>
            `;
            return;
        }

        lista.innerHTML = salvos.map(function (item) {
            return `
                <article class="feature-card visual-card">
                    <span class="section-kicker">${item.tipo || abaAtual}</span>
                    <h2 class="h5 fw-bold">${item.titulo || "Item salvo"}</h2>
                    <p class="text-muted">${item.pessoa ? `Para ${item.pessoa}` : "Salvo para usar depois."}</p>
                    <a class="btn btn-match-outline" href="../CentralMatch/CentralMatch.html">Usar na central</a>
                </article>
            `;
        }).join("");
        return;
    }

    const salvos = perfis.filter(function (perfil) {
        return favoritos.includes(perfil.nome);
    });

    if (salvos.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-bookmark-heart"></i>
                <strong>Nenhum favorito salvo ainda</strong>
                <p>Quando encontrar um perfil interessante, salve para comparar afinidade e voltar à conversa com calma.</p>
                <a class="btn btn-match-primary" href="../home/Homeusuario.html#descobrir">Descobrir perfis</a>
            </div>
        `;
        return;
    }

    lista.innerHTML = salvos.map(function (perfil) {
        const comum = perfil.interessesEmComum.length ? perfil.interessesEmComum : perfil.interesses.slice(0, 2);
        return `
            <article class="match-profile-card">
                <div class="match-profile-head">
                    ${MatchConnectApp.avatarHtml(perfil.inicial)}
                    <div>
                        <h2 class="h5 mb-0">${perfil.nome}, ${perfil.idade}</h2>
                        <span class="match-profile-meta">${perfil.percentual}% compatível • ${perfil.distanciaKm} km</span>
                    </div>
                </div>
                <p>${perfil.bio}</p>
                <div class="d-flex flex-wrap gap-2 mb-3">
                    ${comum.map(function (item) { return `<span class="tag-match">${item}</span>`; }).join("")}
                </div>
                <div class="match-profile-actions">
                    <a class="btn btn-match-primary" href="../Conversas/Conversas.html">Conversar</a>
                    <button class="btn btn-match-outline remover-favorito" type="button" data-nome="${perfil.nome}">Remover</button>
                </div>
            </article>
        `;
    }).join("");
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
