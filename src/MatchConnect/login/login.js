const formLogin = document.getElementById("formLogin");
const mensagemLogin = document.getElementById("mensagemLogin");

formLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailLogin = document.getElementById("emailLogin").value.trim().toLowerCase();
    const senhaLogin = document.getElementById("senhaLogin").value;

    if (!emailLogin || !senhaLogin) {
        mensagemLogin.textContent = "Preencha e-mail e senha.";
        mensagemLogin.style.color = "red";
        return;
    }

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

    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    mensagemLogin.textContent = "Login realizado com sucesso!";
    mensagemLogin.style.color = "green";

    setTimeout(function () {
        window.location.href = "../home/homeUsuario.html";
    }, 20);
});