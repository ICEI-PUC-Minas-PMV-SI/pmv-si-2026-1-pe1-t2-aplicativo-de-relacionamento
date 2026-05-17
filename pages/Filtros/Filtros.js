MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const perfis = MatchConnectApp.perfisOrdenados();
const filtrosSalvos = JSON.parse(localStorage.getItem("filtrosMatchConnect")) || {};
const idadeMinimaInput = document.getElementById("idadeMinima");
const idadeMaximaInput = document.getElementById("idadeMaxima");
const distanciaMaximaInput = document.getElementById("distanciaMaxima");
const interesseFiltroInput = document.getElementById("interesseFiltro");
const objetivoFiltroInput = document.getElementById("objetivoFiltro");
const idadeResumo = document.getElementById("idadeResumo");
const distanciaResumo = document.getElementById("distanciaResumo");
const resumoFiltros = document.getElementById("resumoFiltros");

function obterFiltrosDoFormulario() {
    return {
        idadeMinima: Number(idadeMinimaInput.value) || 18,
        idadeMaxima: Number(idadeMaximaInput.value) || 99,
        distanciaMaxima: Number(distanciaMaximaInput.value) || 100,
        interesse: interesseFiltroInput.value.trim().toLowerCase(),
        objetivo: objetivoFiltroInput.value
    };
}

function aplicarFiltros(filtros) {
    const idadeMenor = Math.min(filtros.idadeMinima, filtros.idadeMaxima);
    const idadeMaior = Math.max(filtros.idadeMinima, filtros.idadeMaxima);

    return perfis.filter(function (perfil) {
        const atendeIdade = perfil.idade >= idadeMenor && perfil.idade <= idadeMaior;
        const atendeDistancia = !perfil.distanciaKm || perfil.distanciaKm <= filtros.distanciaMaxima;
        const atendeInteresse = !filtros.interesse || perfil.interesses.join(" ").toLowerCase().includes(filtros.interesse);
        const atendeObjetivo = !filtros.objetivo || perfil.objetivo === filtros.objetivo;
        return atendeIdade && atendeDistancia && atendeInteresse && atendeObjetivo;
    });
}

function preencherFormularioComFiltrosSalvos() {
    idadeMinimaInput.value = filtrosSalvos.idadeMinima || 18;
    idadeMaximaInput.value = filtrosSalvos.idadeMaxima || 35;
    distanciaMaximaInput.value = filtrosSalvos.distanciaMaxima || 30;
    interesseFiltroInput.value = filtrosSalvos.interesse || "";
    objetivoFiltroInput.value = filtrosSalvos.objetivo || "";
}

function atualizarResumoVisual() {
    const filtros = obterFiltrosDoFormulario();
    const idadeMenor = Math.min(filtros.idadeMinima, filtros.idadeMaxima);
    const idadeMaior = Math.max(filtros.idadeMinima, filtros.idadeMaxima);
    const chips = [
        `${idadeMenor} a ${idadeMaior} anos`,
        `até ${filtros.distanciaMaxima} km`,
        filtros.interesse ? `interesse: ${filtros.interesse}` : "qualquer interesse",
        filtros.objetivo || "qualquer objetivo"
    ];

    idadeResumo.textContent = `${idadeMenor} a ${idadeMaior} anos`;
    distanciaResumo.textContent = `Até ${filtros.distanciaMaxima} km`;
    resumoFiltros.innerHTML = chips.map(function (chip) {
        return `<span>${chip}</span>`;
    }).join("");
}

function renderizar(perfisFiltrados) {
    document.getElementById("totalResultados").textContent = `${perfisFiltrados.length} perfil${perfisFiltrados.length === 1 ? "" : "s"}`;

    document.getElementById("resultadosFiltros").innerHTML = perfisFiltrados.map(function (perfil) {
        return `
            <article class="filter-result-card">
                ${MatchConnectApp.avatarHtml(perfil.inicial, "", "avatar-md")}
                <div class="filter-result-main">
                    <div class="filter-result-top">
                        <div>
                            <strong>${perfil.nome}, ${perfil.idade}</strong>
                            <small>${perfil.objetivo}</small>
                        </div>
                        <span>${perfil.percentual}%</span>
                    </div>
                    <div class="filter-result-metrics">
                        <span><i class="bi bi-geo-alt"></i>${perfil.distanciaKm} km</span>
                        <span><i class="bi bi-heart-pulse"></i>${perfil.interessesEmComum.length} em comum</span>
                    </div>
                    <div class="d-flex flex-wrap gap-2">
                        ${perfil.interesses.slice(0, 4).map(function (interesse) { return `<span class="tag-match">${interesse}</span>`; }).join("")}
                    </div>
                </div>
            </article>
        `;
    }).join("") || '<p class="empty-state">Nenhum perfil encontrado com esses filtros.</p>';
}

document.getElementById("formFiltros").addEventListener("submit", function (event) {
    event.preventDefault();

    const filtros = obterFiltrosDoFormulario();
    localStorage.setItem("filtrosMatchConnect", JSON.stringify(filtros));

    renderizar(aplicarFiltros(filtros));
});

document.getElementById("btnLimparFiltros").addEventListener("click", function () {
    localStorage.removeItem("filtrosMatchConnect");
    document.getElementById("formFiltros").reset();
    idadeMinimaInput.value = 18;
    idadeMaximaInput.value = 35;
    distanciaMaximaInput.value = 30;
    atualizarResumoVisual();
    renderizar(perfis);
});

[idadeMinimaInput, idadeMaximaInput, distanciaMaximaInput, interesseFiltroInput, objetivoFiltroInput].forEach(function (campo) {
    campo.addEventListener("input", atualizarResumoVisual);
    campo.addEventListener("change", atualizarResumoVisual);
});

preencherFormularioComFiltrosSalvos();
atualizarResumoVisual();
renderizar(Object.keys(filtrosSalvos).length > 0 ? aplicarFiltros(obterFiltrosDoFormulario()) : perfis);
