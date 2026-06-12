MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const usuario = MatchConnectApp.usuario();
const dados = MatchConnectApp.interesses();
const interesses = Array.isArray(dados.interesses) ? dados.interesses : [];
const camadas = MatchConnectApp.camadasInteresses();
const foto = MatchConnectApp.fotoPrincipal();
const idade = MatchConnectApp.idade(usuario.dataNascimento);
const verificacao = localStorage.getItem("perfilVerificado") === "true";
const matches = MatchConnectApp.getMatches();
const historicoAfinidade = MatchConnectApp.getJson("historicoAfinidade", []);
const quebraGelos = [
    { titulo: "Música ou silêncio?", texto: dados.personalidade ? `Meu tom de conversa é ${dados.personalidade}.` : "Prefiro conversas leves no começo." },
    { titulo: "Programa ideal", texto: dados.programaIdeal || "Um encontro curto em lugar público." },
    { titulo: "Assunto fácil", texto: interesses[0] ? `Pode começar por ${interesses[0]}.` : "Ainda estou completando meus interesses." },
    { titulo: "Conversa que vale", texto: dados.conversaValePena || "Atenção, leveza e curiosidade real." },
    { titulo: "Ritmo de conexão", texto: dados.ritmoConexao || "Construir sem pressa." }
];

function calcularForcaPerfil() {
    const campos = [
        Boolean(foto),
        interesses.length >= 3,
        Boolean(dados.objetivo),
        Boolean(dados.personalidade),
        Boolean(dados.programaIdeal),
        Boolean(dados.descricao)
    ];

    return Math.round((campos.filter(Boolean).length / campos.length) * 100);
}

document.getElementById("nomePerfil").textContent = `Perfil de ${usuario.nome.split(" ")[0]}`;
document.getElementById("nomeCompleto").textContent = usuario.nome;
document.getElementById("idadePerfil").textContent = idade ? `${idade} anos` : "Idade não informada";
document.getElementById("avatarPerfil").innerHTML = MatchConnectApp.avatarHtml(usuario.nome.charAt(0), foto, "avatar-xl");
document.getElementById("descricaoPerfil").textContent = dados.descricao || "Complete sua descrição para deixar seus matches mais naturais.";
document.getElementById("objetivoPerfil").textContent = dados.objetivo || "Não informado";
document.getElementById("personalidadePerfil").textContent = dados.personalidade || "Não informado";
document.getElementById("programaPerfil").textContent = dados.programaIdeal || "Não informado";
document.getElementById("seloVerificacao").textContent = verificacao ? "Perfil verificado" : "Perfil em análise";

const forca = calcularForcaPerfil();
document.getElementById("barraPerfil").style.width = `${forca}%`;
document.getElementById("forcaPerfil").textContent = `${forca}% completo`;

const selos = [
    forca >= 80 ? "Perfil completo" : "Perfil em construção",
    verificacao ? "Verificado" : "Verificação pendente",
    matches.length > 0 ? `${matches.length} match${matches.length === 1 ? "" : "es"}` : "Sem matches ainda",
    interesses.length >= 3 ? "Interesses confirmados" : "Interesses básicos"
];

document.getElementById("selosPerfil").innerHTML = selos.map(function (selo) {
    return `<span class="trust-badge"><i class="bi bi-patch-check"></i>${selo}</span>`;
}).join("");

const lista = document.getElementById("interessesPerfil");

if (interesses.length === 0) {
    lista.innerHTML = '<p class="empty-state">Nenhum interesse cadastrado.</p>';
} else {
    lista.innerHTML = interesses.map(function (interesse) {
        return `<span class="tag-match">${interesse}</span>`;
    }).join("");
}

document.getElementById("quebraGelosPerfil").innerHTML = quebraGelos.map(function (item) {
    return `
        <article class="timeline-item">
            <i class="bi bi-chat-heart"></i>
            <div>
                <strong>${item.titulo}</strong>
                <p class="text-muted mb-0">${item.texto}</p>
            </div>
        </article>
    `;
}).join("");

document.getElementById("camadasPerfil").innerHTML = `
    <span>Como seus interesses entram no match</span>
    <div class="interest-layer-row"><small>Gosto muito</small><strong>${camadas.gostoMuito.join(", ") || "Não informado"}</strong></div>
    <div class="interest-layer-row"><small>Quero explorar</small><strong>${camadas.queroExplorar.join(", ") || "Não informado"}</strong></div>
    <div class="interest-layer-row"><small>Não curto</small><strong>${camadas.naoCurto.join(", ") || "Não informado"}</strong></div>
    <div class="interest-layer-row"><small>Assunto favorito</small><strong>${camadas.assuntoFavorito || "Não informado"}</strong></div>
`;

const historicoResumo = historicoAfinidade.slice(0, 4);
const assuntoForte = historicoAfinidade.flatMap(function (item) {
    return item.interesses || [];
})[0] || camadas.assuntoFavorito || interesses[0] || "seus interesses principais";

document.getElementById("historicoAfinidadePerfil").innerHTML = historicoResumo.length > 0
    ? `
        <strong>EROS está aprendendo com suas ações</strong>
        <p>Seu padrão recente aponta para ${assuntoForte}. O histórico considera matches, mensagens recebidas e convites enviados.</p>
        <small>${historicoResumo.map(function (item) {
            return `${item.tipo} com ${item.pessoa || "perfil"}`;
        }).join(" • ")}</small>
    `
    : `
        <strong>Ainda sem histórico suficiente</strong>
        <p>Curta perfis, responda mensagens e envie convites para o MatchConnect melhorar suas recomendações.</p>
        <small>O aprendizado fica salvo apenas nesta simulação local.</small>
    `;
