// Exemplo simples para consumir a API FastAPI do MatchConnect.
// Rode o backend antes com: uvicorn main:app --reload

fetch("http://127.0.0.1:8000/compatibilidade", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        usuario1: {
            nome: "Joao",
            idade: 24,
            interesses: ["Cinema", "Musica", "Viagens"],
            objetivo: "Relacionamento serio",
            descricao: "Gosto de conversar e conhecer lugares novos."
        },
        usuario2: {
            nome: "Ana",
            idade: 22,
            interesses: ["Cinema", "Livros", "Viagens"],
            objetivo: "Relacionamento serio",
            descricao: "Gosto de filmes, livros e viagens."
        }
    })
})
    .then(function (resposta) {
        return resposta.json();
    })
    .then(function (dados) {
        console.log("Compatibilidade:", dados.porcentagem + "%");
        console.log("Interesses em comum:", dados.interesses_em_comum);
        console.log("Explicacao:", dados.explicacao);
    })
    .catch(function (erro) {
        console.error("Erro ao chamar a API:", erro);
    });
