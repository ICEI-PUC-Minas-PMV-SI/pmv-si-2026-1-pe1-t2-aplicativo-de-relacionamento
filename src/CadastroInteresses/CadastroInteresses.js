const formInteresses = document.getElementById("formInteresses");
const mensagem = document.getElementById("mensagemInteresses");

const inputFotos = document.getElementById("fotos");
const previewFotos = document.getElementById("previewFotos");

const barraProgressoPerfil = document.getElementById("barraProgressoPerfil");
const textoProgressoPerfil = document.getElementById("textoProgressoPerfil");

let fotosBase64 = [];

function atualizarProgressoPerfil() {
    let pontos = 0;
    const total = 6;

    const interessesSelecionados = document.querySelectorAll(".btn-check:checked");
    const objetivo = document.getElementById("objetivo").value;
    const personalidade = document.getElementById("personalidade").value;
    const programaIdeal = document.getElementById("programaIdeal").value;
    const descricao = document.getElementById("descricao").value.trim();

    if (fotosBase64.length > 0) pontos++;
    if (interessesSelecionados.length >= 3) pontos++;
    if (objetivo !== "") pontos++;
    if (personalidade !== "") pontos++;
    if (programaIdeal !== "") pontos++;
    if (descricao !== "") pontos++;

    const progresso = Math.round((pontos / total) * 100);

    barraProgressoPerfil.style.width = progresso + "%";
    textoProgressoPerfil.textContent = `Perfil ${progresso}% completo`;
}

// Preview das fotos
inputFotos.addEventListener("change", function () {
    fotosBase64 = [];
    previewFotos.innerHTML = "";

    const arquivos = Array.from(inputFotos.files);

    arquivos.forEach(function (foto) {
        const reader = new FileReader();

        reader.onload = function (event) {
            fotosBase64.push(event.target.result);

            const img = document.createElement("img");
            img.src = event.target.result;
            img.classList.add("preview-img");

            previewFotos.appendChild(img);

            atualizarProgressoPerfil();
        };

        reader.readAsDataURL(foto);
    });
});

document.querySelectorAll("input, select, textarea").forEach(function (campo) {
    campo.addEventListener("input", atualizarProgressoPerfil);
    campo.addEventListener("change", atualizarProgressoPerfil);
});

formInteresses.addEventListener("submit", function (event) {
    event.preventDefault();

    const interessesSelecionados = [];

    const checkboxes = document.querySelectorAll(".btn-check:checked");

    checkboxes.forEach(function (checkbox) {
        interessesSelecionados.push(checkbox.value);
    });

    const objetivo = document.getElementById("objetivo").value;
    const personalidade = document.getElementById("personalidade").value;
    const programaIdeal = document.getElementById("programaIdeal").value;
    const descricao = document.getElementById("descricao").value.trim();
    const qualidades = document.getElementById("qualidades").value.trim();
    const curiosidade = document.getElementById("curiosidade").value.trim();

    if (fotosBase64.length === 0) {
        mensagem.textContent = "Adicione pelo menos uma foto.";
        mensagem.style.color = "red";
        return;
    }

    if (interessesSelecionados.length < 3) {
        mensagem.textContent = "Escolha pelo menos 3 interesses.";
        mensagem.style.color = "red";
        return;
    }

    if (objetivo === "") {
        mensagem.textContent = "Selecione o que você busca no MatchConnect.";
        mensagem.style.color = "red";
        return;
    }

    if (personalidade === "") {
        mensagem.textContent = "Selecione como você se define.";
        mensagem.style.color = "red";
        return;
    }

    if (programaIdeal === "") {
        mensagem.textContent = "Selecione seu programa ideal.";
        mensagem.style.color = "red";
        return;
    }

    if (descricao === "") {
        mensagem.textContent = "Escreva uma breve descrição sobre você.";
        mensagem.style.color = "red";
        return;
    }

    const dadosInteresses = {
        fotos: fotosBase64,
        interesses: interessesSelecionados,
        objetivo: objetivo,
        personalidade: personalidade,
        programaIdeal: programaIdeal,
        descricao: descricao,
        qualidades: qualidades,
        curiosidade: curiosidade
    };

    localStorage.setItem("interessesUsuario", JSON.stringify(dadosInteresses));

    mensagem.textContent = "Cadastro finalizado com sucesso!";
    mensagem.style.color = "green";

    setTimeout(function () {
        window.location.href = "../home/Homeusuario.html";
    }, 200);
});

atualizarProgressoPerfil();