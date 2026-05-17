MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const perguntas = [
    { texto: "Seu primeiro encontro ideal tem mais cara de:", opcoes: [["Tranquilo", "Café e conversa sem pressa"], ["Aventureiro", "Lugar novo para explorar"], ["Divertido", "Atividade leve para rir"]] },
    { texto: "Numa conversa, você valoriza mais:", opcoes: [["Curioso", "Perguntas que abrem histórias"], ["Direto", "Clareza sobre intenção"], ["Afetuoso", "Cuidado no jeito de falar"]] },
    { texto: "Seu ritmo de conexão costuma ser:", opcoes: [["Tranquilo", "Aos poucos"], ["Intenso", "Quando combina, flui rápido"], ["Observador", "Gosto de entender antes"]] }
];

let indice = 0;
const pontos = {};

function finalizar() {
    const vencedor = Object.keys(pontos).sort(function (a, b) {
        return pontos[b] - pontos[a];
    })[0] || "Tranquilo";
    const dados = MatchConnectApp.interesses();
    dados.personalidade = vencedor;
    MatchConnectApp.setJson("interessesUsuario", dados);

    document.getElementById("perguntaQuiz").innerHTML = '<span class="section-kicker">Resultado</span><h2 class="h4 fw-bold">Seu estilo é ' + vencedor + '</h2>';
    document.getElementById("opcoesQuiz").innerHTML = "";
    document.getElementById("resultadoQuiz").innerHTML = `
        <p class="text-muted">Atualizamos sua personalidade no cadastro de interesses. As sugestões do Cupido e os matches agora podem usar esse tom.</p>
        <a class="btn btn-match-primary" href="../home/Homeusuario.html">Voltar para Home</a>
    `;
}

function renderizar() {
    const pergunta = perguntas[indice];
    document.getElementById("perguntaQuiz").innerHTML = `<span class="section-kicker">Pergunta ${indice + 1} de ${perguntas.length}</span><h2 class="h4 fw-bold">${pergunta.texto}</h2>`;
    document.getElementById("opcoesQuiz").innerHTML = pergunta.opcoes.map(function (opcao) {
        return `<button class="choice-button" type="button" data-estilo="${opcao[0]}"><span>${opcao[1]}</span><i class="bi bi-arrow-right"></i></button>`;
    }).join("");
}

document.getElementById("opcoesQuiz").addEventListener("click", function (event) {
    const botao = event.target.closest(".choice-button");
    if (!botao) return;
    pontos[botao.dataset.estilo] = (pontos[botao.dataset.estilo] || 0) + 1;
    indice += 1;
    if (indice >= perguntas.length) {
        finalizar();
    } else {
        renderizar();
    }
});

renderizar();
