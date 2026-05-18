MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

// Perfis usados pelo assistente, já ordenados por compatibilidade.
const perfis = MatchConnectApp.perfisOrdenados();
const perfilEROS = document.getElementById("perfilEROS");
const tomEROS = document.getElementById("tomEROS");
let rodada = 0;

// Preenche o select com todos os matches disponíveis.
perfilEROS.innerHTML = perfis.map(function (perfil) {
    return `<option value="${perfil.nome}">${perfil.nome} • ${perfil.percentual}%</option>`;
}).join("");

// Recupera o perfil atualmente escolhido no select.
function perfilSelecionado() {
    return perfis.find(function (perfil) {
        return perfil.nome === perfilEROS.value;
    }) || perfis[0];
}

// Gera mensagem, pergunta e ideia de encontro com base no perfil e no tom escolhido.
function gerar() {
    const perfil = perfilSelecionado();
    const comum = perfil.interessesEmComum.length ? perfil.interessesEmComum : perfil.interesses.slice(0, 2);
    const assunto = comum[rodada % comum.length] || perfil.interesses[0];
    const tom = tomEROS.value;

    document.getElementById("resumoPerfilEROS").innerHTML = `
        <div class="d-flex align-items-center gap-3">
            ${MatchConnectApp.avatarHtml(perfil.inicial)}
            <div>
                <h2 class="h4 fw-bold mb-0">${perfil.nome}, ${perfil.idade}</h2>
                <span class="text-muted">${perfil.percentual}% compatível • ${comum.join(", ")}</span>
            </div>
        </div>
    `;
    document.getElementById("mensagemEROS").textContent = `Tom ${tom}: vi que ${assunto} aparece no seu perfil e achei um bom começo. O que mais te prende nesse assunto hoje?`;
    document.getElementById("perguntaEROS").textContent = `Se você pudesse me indicar uma coisa ligada a ${assunto}, qual seria?`;
    document.getElementById("encontroEROS").textContent = `Um programa com cara de vocês: ${perfil.programaIdeal}. Convite curto, em local público e com tempo definido.`;
}

// Cada clique muda a rodada para variar o assunto sugerido.
document.getElementById("btnGerarEROS").addEventListener("click", function () {
    rodada += 1;
    gerar();
});

perfilEROS.addEventListener("change", gerar);
tomEROS.addEventListener("change", gerar);
gerar();
