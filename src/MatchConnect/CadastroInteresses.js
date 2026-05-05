const formInteresses = document.getElementById("formInteresses");
const mensagem = document.getElementById("mensagemInteresses");

formInteresses.addEventListener("submit", function (event) {
    event.preventDefault();

    const interessesSelecionados = [];

    const checkboxes = document.querySelectorAll(".btn-check:checked");

    checkboxes.forEach(function (checkbox) {
        interessesSelecionados.push(checkbox.value);
    });

    const objetivo = document.getElementById("objetivo").value;
    const descricao = document.getElementById("descricao").value.trim();

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

    if (descricao === "") {
        mensagem.textContent = "Escreva uma breve descrição sobre você.";
        mensagem.style.color = "red";
        return;
    }

    const dadosInteresses = {
        interesses: interessesSelecionados,
        objetivo: objetivo,
        descricao: descricao,
    };

    localStorage.setItem("interessesUsuario", JSON.stringify(dadosInteresses));

    mensagem.textContent = "Interesses salvos com sucesso!";
    mensagem.style.color = "green";

    setTimeout(function () {
        window.location.href = "Homeusuario.html";
    }, 12);
});