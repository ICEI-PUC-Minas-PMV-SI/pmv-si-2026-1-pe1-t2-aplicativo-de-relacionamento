MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const perfis = MatchConnectApp.perfisOrdenados();

function renderizar(perfisFiltrados) {
    document.getElementById("totalResultados").textContent = `${perfisFiltrados.length} perfil${perfisFiltrados.length === 1 ? "" : "s"}`;

    document.getElementById("resultadosFiltros").innerHTML = perfisFiltrados.map(function (perfil) {
        return `
            <article class="list-row">
                ${MatchConnectApp.avatarHtml(perfil.inicial)}
                <div class="row-main">
                    <strong>${perfil.nome}, ${perfil.idade}</strong>
                    <small>${perfil.percentual}% compatível • ${perfil.objetivo}</small>
                    <div class="d-flex flex-wrap gap-2 mt-2">
                        ${perfil.interesses.slice(0, 4).map(function (interesse) { return `<span class="tag-match">${interesse}</span>`; }).join("")}
                    </div>
                </div>
            </article>
        `;
    }).join("") || '<p class="empty-state">Nenhum perfil encontrado com esses filtros.</p>';
}

document.getElementById("formFiltros").addEventListener("submit", function (event) {
    event.preventDefault();

    const idadeMinima = Number(document.getElementById("idadeMinima").value) || 18;
    const idadeMaxima = Number(document.getElementById("idadeMaxima").value) || 99;
    const interesse = document.getElementById("interesseFiltro").value.trim().toLowerCase();
    const objetivo = document.getElementById("objetivoFiltro").value;

    const filtros = { idadeMinima, idadeMaxima, interesse, objetivo };
    localStorage.setItem("filtrosMatchConnect", JSON.stringify(filtros));

    const filtrados = perfis.filter(function (perfil) {
        const atendeIdade = perfil.idade >= idadeMinima && perfil.idade <= idadeMaxima;
        const atendeInteresse = !interesse || perfil.interesses.join(" ").toLowerCase().includes(interesse);
        const atendeObjetivo = !objetivo || perfil.objetivo === objetivo;
        return atendeIdade && atendeInteresse && atendeObjetivo;
    });

    renderizar(filtrados);
});

document.getElementById("btnLimparFiltros").addEventListener("click", function () {
    localStorage.removeItem("filtrosMatchConnect");
    document.getElementById("formFiltros").reset();
    document.getElementById("idadeMinima").value = 18;
    document.getElementById("idadeMaxima").value = 35;
    renderizar(perfis);
});

renderizar(perfis);
