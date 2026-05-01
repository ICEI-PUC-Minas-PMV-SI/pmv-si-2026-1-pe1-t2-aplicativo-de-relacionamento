const formCadastro = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

formCadastro.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (senha !== confirmarSenha) {
        mensagem.textContent = "As senhas não são iguais.";
        mensagem.className = "text-danger fw-bold";
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioJaExiste = usuarios.some(function (usuario) {
        return usuario.email === email;
    });

    if (usuarioJaExiste) {
        mensagem.textContent = "Este e-mail já está cadastrado no sistema.";
        mensagem.className = "text-danger fw-bold";
        return;
    }

    const novoUsuario = {
        nome: nome,
        email: email,
        senha: senha
    };

    usuarios.push(novoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensagem.textContent = "Usuário cadastrado com sucesso!";
    mensagem.className = "text-success fw-bold";

    formCadastro.reset();
});