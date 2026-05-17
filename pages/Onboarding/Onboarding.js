MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const filtros = JSON.parse(localStorage.getItem("filtrosMatchConnect")) || {};
const distancia = document.getElementById("distanciaOnboarding");

document.getElementById("idadeMinOnboarding").value = filtros.idadeMinima || 18;
document.getElementById("idadeMaxOnboarding").value = filtros.idadeMaxima || 35;
distancia.value = filtros.distanciaMaxima || 30;
document.getElementById("objetivoOnboarding").value = filtros.objetivo || "";
document.getElementById("interesseOnboarding").value = filtros.interesse || "";
document.getElementById("distanciaOnboardingResumo").textContent = `Até ${distancia.value} km`;

distancia.addEventListener("input", function () {
    document.getElementById("distanciaOnboardingResumo").textContent = `Até ${distancia.value} km`;
});

document.getElementById("formOnboarding").addEventListener("submit", function (event) {
    event.preventDefault();

    const preferencias = {
        idadeMinima: Number(document.getElementById("idadeMinOnboarding").value) || 18,
        idadeMaxima: Number(document.getElementById("idadeMaxOnboarding").value) || 35,
        distanciaMaxima: Number(distancia.value) || 30,
        objetivo: document.getElementById("objetivoOnboarding").value === "Ainda não sei" ? "" : document.getElementById("objetivoOnboarding").value,
        interesse: document.getElementById("interesseOnboarding").value.trim().toLowerCase(),
        estiloEncontro: document.getElementById("estiloOnboarding").value
    };

    localStorage.setItem("filtrosMatchConnect", JSON.stringify(preferencias));
    localStorage.setItem("preferenciasDescoberta", JSON.stringify(preferencias));
    document.getElementById("statusOnboarding").textContent = "Preferências salvas e aplicadas na descoberta.";
});
