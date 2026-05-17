const formLogin = document.getElementById("formLogin");
const mensagemLogin = document.getElementById("mensagemLogin");

// Valida os campos, procura o usuário no localStorage e cria a sessão local.
formLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailLogin = document.getElementById("emailLogin").value.trim().toLowerCase();
    const senhaLogin = document.getElementById("senhaLogin").value;

    if (!emailLogin || !senhaLogin) {
        mensagemLogin.textContent = "Preencha e-mail e senha.";
        mensagemLogin.style.color = "red";
        return;
    }

    // Usuários cadastrados ficam salvos localmente nesta versão do projeto.
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(function (usuario) {
        return usuario.email === emailLogin;
    });

    if (!usuario) {
        mensagemLogin.textContent = "Usuário não encontrado.";
        mensagemLogin.style.color = "red";
        return;
    }

    if (usuario.senha !== senhaLogin) {
        mensagemLogin.textContent = "Senha incorreta.";
        mensagemLogin.style.color = "red";
        return;
    }

    // Mantém o usuário logado para as páginas internas validarem o acesso.
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    mensagemLogin.textContent = "Login realizado com sucesso!";
    mensagemLogin.style.color = "green";

    setTimeout(function () {
        window.location.href = "../home/Homeusuario.html";
    }, 20);
});
