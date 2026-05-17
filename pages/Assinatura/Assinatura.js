const planos = {
    gratuito: {
        nome: "Gratuito",
        preco: "R$ 0/mês",
        descricao: "Para começar com perfil, descoberta e conversas com matches.",
        beneficios: ["Criar perfil completo", "Receber sugestões", "Curtir perfis diariamente"]
    },
    premium: {
        nome: "Premium",
        preco: "R$ 29,90/mês",
        descricao: "Mais visibilidade e recursos para encontrar conexões compatíveis.",
        beneficios: ["Ver quem curtiu você", "Sugestões inteligentes", "Filtros avançados"]
    },
    gold: {
        nome: "Gold",
        preco: "R$ 49,90/mês",
        descricao: "Experiência completa com prioridade, insights e segurança avançada.",
        beneficios: ["Prioridade nas recomendações", "Compatibilidade aprofundada", "Atendimento prioritário"]
    }
};

const params = new URLSearchParams(window.location.search);
const planoId = params.get("plano") || "gratuito";
const plano = planos[planoId] || planos.gratuito;
const usuario = MatchConnectApp.usuario();

document.getElementById("tituloPlano").textContent = `Assinar plano ${plano.nome}`;
document.getElementById("nomePlano").textContent = plano.nome;
document.getElementById("precoPlano").textContent = plano.preco;
document.getElementById("descricaoPlano").textContent = plano.descricao;
document.getElementById("beneficiosPlano").innerHTML = plano.beneficios.map(function (beneficio) {
    return `<span><i class="bi bi-check-circle-fill text-primary"></i> ${beneficio}</span>`;
}).join("");

if (usuario) {
    document.getElementById("nomeAssinante").value = usuario.nome || "";
    document.getElementById("emailAssinante").value = usuario.email || "";
}

document.getElementById("formAssinatura").addEventListener("submit", function (event) {
    event.preventDefault();

    const assinatura = {
        plano: plano.nome,
        preco: plano.preco,
        formaPagamento: document.getElementById("formaPagamento").value,
        cupom: document.getElementById("cupom").value.trim(),
        data: new Date().toISOString()
    };

    localStorage.setItem("assinaturaUsuario", JSON.stringify(assinatura));
    document.getElementById("mensagemAssinatura").textContent = `Plano ${plano.nome} confirmado nesta simulação.`;
});
