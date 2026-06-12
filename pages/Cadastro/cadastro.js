const formCadastro = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

// Fluxo de criação de conta: valida dados, salva no localStorage e avança para interesses.
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

    // Regra do app: apenas usuários maiores de 18 anos podem criar conta.
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

    // Evita duplicidade de e-mail no cadastro local.
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
        senha: senha,
        role: "user",
        createdAt: new Date().toISOString(),
        blocked: false,
        perfilVerificado: false
    };

    // Salva o usuário e já inicia a sessão para continuar o cadastro de interesses.
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));
    [
        "matchesUsuario",
        "mensagensUsuario",
        "mensagensNaoLidas",
        "conversaAberta",
        "conversasAtivas",
        "conversasEncerradas",
        "perfisBloqueados",
        "favoritosUsuario",
        "historicoAfinidade",
        "mensagemEnviadaRecentemente",
        "ultimaMensagemRecebida",
        "planoEncontro",
        "conviteEvento"
    ].forEach(function (chave) {
        localStorage.removeItem(chave);
    });

    mensagem.textContent = "Usuário cadastrado com sucesso!";
    mensagem.style.color = "green";

    formCadastro.reset();

    console.log("Cadastro salvo.");

    setTimeout(function () {
        window.location.href = "../CadastroInteresses/cadastrointeresses.html";
    }, 200);
});
