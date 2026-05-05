const formCadastro = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

formCadastro.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const dataNascimento = document.getElementById("dataNascimento").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const termos = document.getElementById("termos").checked;

    if (!nome || !email || !dataNascimento || !senha || !confirmarSenha) {
        mensagem.textContent = "Preencha todos os campos.";
        mensagem.style.color = "red";
        return;
    }

    const nascimento = new Date(dataNascimento);
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    if (idade < 18) {
        mensagem.textContent = "Você precisa ter pelo menos 18 anos para criar uma conta.";
        mensagem.style.color = "red";
        return;
    }

    if (senha.length < 6) {
        mensagem.textContent = "A senha deve ter pelo menos 6 caracteres.";
        mensagem.style.color = "red";
        return;
    }

    if (senha !== confirmarSenha) {
        mensagem.textContent = "As senhas não coincidem.";
        mensagem.style.color = "red";
        return;
    }

    if (!termos) {
        mensagem.textContent = "Você precisa aceitar os termos.";
        mensagem.style.color = "red";
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const emailJaExiste = usuarios.some(function (usuario) {
        return usuario.email === email;
    });

    if (emailJaExiste) {
        mensagem.textContent = "Este e-mail já está cadastrado.";
        mensagem.style.color = "red";
        return;
    }

    const novoUsuario = {
        nome: nome,
        email: email,
        dataNascimento: dataNascimento,
        senha: senha
    };

    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensagem.textContent = "Usuário cadastrado com sucesso!";
    mensagem.style.color = "green";

    formCadastro.reset();

    setTimeout(function () {
        window.location.href = "cadastro-interesses.html";
    }, 12);
});