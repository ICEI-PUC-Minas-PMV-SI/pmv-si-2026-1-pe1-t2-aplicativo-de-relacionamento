MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const usuario = MatchConnectApp.usuario();
const dados = MatchConnectApp.interesses();
const interesses = Array.isArray(dados.interesses) ? dados.interesses : [];
const foto = MatchConnectApp.fotoPrincipal();
const idade = MatchConnectApp.idade(usuario.dataNascimento);

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

const forca = calcularForcaPerfil();
document.getElementById("barraPerfil").style.width = `${forca}%`;
document.getElementById("forcaPerfil").textContent = `${forca}% completo`;

const lista = document.getElementById("interessesPerfil");

if (interesses.length === 0) {
    lista.innerHTML = '<p class="empty-state">Nenhum interesse cadastrado.</p>';
} else {
    lista.innerHTML = interesses.map(function (interesse) {
        return `<span class="tag-match">${interesse}</span>`;
    }).join("");
}
