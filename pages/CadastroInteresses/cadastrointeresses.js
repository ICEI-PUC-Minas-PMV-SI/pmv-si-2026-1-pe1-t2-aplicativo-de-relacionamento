const formInteresses = document.getElementById("formInteresses");
const mensagem = document.getElementById("mensagemInteresses");
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {
    window.location.href = "../Login/login.html";
}

const inputFotos = document.getElementById("fotos");
const previewFotos = document.getElementById("previewFotos");
const barraProgressoPerfil = document.getElementById("barraProgressoPerfil");
const textoProgressoPerfil = document.getElementById("textoProgressoPerfil");
const textoEtapaAtual = document.getElementById("textoEtapaAtual");
const btnVoltarEtapa = document.getElementById("btnVoltarEtapa");
const btnProximaEtapa = document.getElementById("btnProximaEtapa");
const btnFinalizarCadastro = document.getElementById("btnFinalizarCadastro");
const distanciaMaxima = document.getElementById("distanciaMaxima");
const distanciaResumo = document.getElementById("distanciaResumo");

let fotosBase64 = [];
let etapaAtual = 0;
const totalEtapas = 4;

function interessesSelecionados() {
    return Array.from(document.querySelectorAll(".btn-check:checked")).map(function (checkbox) {
        return checkbox.value;
    });
}

function textoEmLista(valor) {
    return valor.split(",")
        .map(function (item) {
            return item.trim();
        })
        .filter(Boolean);
}

function camadasInteresses() {
    return {
        gostoMuito: textoEmLista(document.getElementById("gostaMuito").value),
        queroExplorar: textoEmLista(document.getElementById("queroExplorar").value),
        naoCurto: textoEmLista(document.getElementById("naoCurto").value),
        assuntoFavorito: document.getElementById("assuntoFavorito").value.trim()
    };
}

function atualizarEtapa() {
    document.querySelectorAll(".wizard-step").forEach(function (step, index) {
        step.classList.toggle("active", index === etapaAtual);
    });

    document.querySelectorAll(".step-tab").forEach(function (tab, index) {
        tab.classList.toggle("active", index <= etapaAtual);
    });

    textoEtapaAtual.textContent = `Etapa ${etapaAtual + 1} de ${totalEtapas}`;
    btnVoltarEtapa.disabled = etapaAtual === 0;
    btnProximaEtapa.classList.toggle("d-none", etapaAtual === totalEtapas - 1);
    btnFinalizarCadastro.classList.toggle("d-none", etapaAtual !== totalEtapas - 1);
    mensagem.textContent = "";
}

function calcularProgressoPerfil() {
    const campos = [
        fotosBase64.length > 0,
        interessesSelecionados().length >= 3,
        Boolean(camadasInteresses().assuntoFavorito),
        Boolean(document.getElementById("objetivo").value),
        Boolean(document.getElementById("personalidade").value),
        Boolean(document.getElementById("programaIdeal").value),
        Boolean(document.getElementById("descricao").value.trim())
    ];

    return Math.round((campos.filter(Boolean).length / campos.length) * 100);
}

function atualizarProgressoPerfil() {
    const progresso = calcularProgressoPerfil();
    barraProgressoPerfil.style.width = `${progresso}%`;
    textoProgressoPerfil.textContent = `Perfil ${progresso}% completo`;
}

function atualizarPreview() {
    const interesses = interessesSelecionados();
    const foto = fotosBase64[0];
    const nome = usuarioLogado ? usuarioLogado.nome.split(" ")[0] : "Seu perfil";
    const inicial = nome.charAt(0).toUpperCase();
    const objetivo = document.getElementById("objetivo").value || "Objetivo não informado";
    const descricao = document.getElementById("descricao").value.trim() || "Sua descrição aparece aqui conforme você preenche.";
    const idadeMinima = document.getElementById("idadeMinima").value || 18;
    const idadeMaxima = document.getElementById("idadeMaxima").value || 35;

    document.getElementById("previewNome").textContent = nome;
    document.getElementById("previewObjetivo").textContent = objetivo;
    document.getElementById("previewDescricao").textContent = descricao;
    document.getElementById("previewFiltros").textContent = `${idadeMinima} a ${idadeMaxima} anos, até ${distanciaMaxima.value} km`;
    distanciaResumo.textContent = `Até ${distanciaMaxima.value} km`;

    document.getElementById("previewAvatar").innerHTML = foto ? `<img src="${foto}" alt="Foto principal">` : inicial;
    document.getElementById("previewTags").innerHTML = interesses.slice(0, 6).map(function (interesse) {
        return `<span>${interesse}</span>`;
    }).join("") || "<span>Escolha seus interesses</span>";

    const camadas = camadasInteresses();
    document.getElementById("previewLayers").innerHTML = `
        <div class="preview-layer-row"><small>Gosto muito</small><strong>${camadas.gostoMuito.join(", ") || interesses.slice(0, 2).join(", ") || "Não informado"}</strong></div>
        <div class="preview-layer-row"><small>Quero explorar</small><strong>${camadas.queroExplorar.join(", ") || "Não informado"}</strong></div>
        <div class="preview-layer-row"><small>Não curto</small><strong>${camadas.naoCurto.join(", ") || "Não informado"}</strong></div>
        <div class="preview-layer-row"><small>Assunto favorito</small><strong>${camadas.assuntoFavorito || "Não informado"}</strong></div>
    `;

    atualizarProgressoPerfil();
}

function mostrarErro(texto) {
    mensagem.textContent = texto;
    mensagem.style.color = "red";
}

function etapaValida() {
    if (etapaAtual === 0 && interessesSelecionados().length < 3) {
        mostrarErro("Escolha pelo menos 3 interesses para continuar.");
        return false;
    }

    if (etapaAtual === 1) {
        if (!document.getElementById("objetivo").value) {
            mostrarErro("Selecione o que você busca no MatchConnect.");
            return false;
        }

        if (!document.getElementById("personalidade").value) {
            mostrarErro("Selecione como você se define.");
            return false;
        }

        if (!document.getElementById("programaIdeal").value) {
            mostrarErro("Selecione seu programa ideal.");
            return false;
        }
    }

    if (etapaAtual === 2 && !document.getElementById("descricao").value.trim()) {
        mostrarErro("Escreva uma breve descrição sobre você.");
        return false;
    }

    return true;
}

inputFotos.addEventListener("change", function () {
    fotosBase64 = [];
    previewFotos.innerHTML = "";

    Array.from(inputFotos.files).forEach(function (foto) {
        const reader = new FileReader();

        reader.onload = function (event) {
            fotosBase64.push(event.target.result);

            const img = document.createElement("img");
            img.src = event.target.result;
            img.classList.add("preview-img");
            previewFotos.appendChild(img);
            atualizarPreview();
        };

        reader.readAsDataURL(foto);
    });
});

document.querySelectorAll("input, select, textarea").forEach(function (campo) {
    campo.addEventListener("input", atualizarPreview);
    campo.addEventListener("change", atualizarPreview);
});

document.querySelectorAll(".bio-suggestion").forEach(function (botao) {
    botao.addEventListener("click", function () {
        document.getElementById("descricao").value = botao.textContent.trim();
        atualizarPreview();
    });
});

btnProximaEtapa.addEventListener("click", function () {
    if (!etapaValida()) return;
    etapaAtual = Math.min(totalEtapas - 1, etapaAtual + 1);
    atualizarEtapa();
    atualizarPreview();
});

btnVoltarEtapa.addEventListener("click", function () {
    etapaAtual = Math.max(0, etapaAtual - 1);
    atualizarEtapa();
});

formInteresses.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!etapaValida()) return;

    const interesses = interessesSelecionados();
    const objetivo = document.getElementById("objetivo").value;
    const personalidade = document.getElementById("personalidade").value;
    const programaIdeal = document.getElementById("programaIdeal").value;
    const descricao = document.getElementById("descricao").value.trim();
    const qualidades = document.getElementById("qualidades").value.trim();
    const curiosidade = document.getElementById("curiosidade").value.trim();
    const interessePrioritario = document.getElementById("interessePrioritario").value.trim().toLowerCase();
    const camadas = camadasInteresses();

    const dadosInteresses = {
        fotos: fotosBase64,
        interesses: interesses,
        camadas: camadas,
        objetivo: objetivo,
        personalidade: personalidade,
        programaIdeal: programaIdeal,
        descricao: descricao,
        qualidades: qualidades,
        curiosidade: curiosidade
    };

    const preferenciasDescoberta = {
        idadeMinima: Number(document.getElementById("idadeMinima").value) || 18,
        idadeMaxima: Number(document.getElementById("idadeMaxima").value) || 35,
        distanciaMaxima: Number(distanciaMaxima.value) || 30,
        interesse: interessePrioritario,
        objetivo: objetivo === "Ainda não sei" ? "" : objetivo,
        estiloEncontro: programaIdeal
    };

    localStorage.setItem("interessesUsuario", JSON.stringify(dadosInteresses));
    localStorage.setItem("filtrosMatchConnect", JSON.stringify(preferenciasDescoberta));
    localStorage.setItem("preferenciasDescoberta", JSON.stringify(preferenciasDescoberta));
    localStorage.setItem("mostrarTourEROSHome", "true");
    localStorage.removeItem("guiaEROSHomeVisto");

    mensagem.textContent = "Cadastro finalizado com sucesso!";
    mensagem.style.color = "green";

    setTimeout(function () {
        window.location.href = "../home/Homeusuario.html";
    }, 250);
});

atualizarEtapa();
atualizarPreview();
