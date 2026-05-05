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

    //  valida só pelo email primeiro (melhor prática)
    const usuario = usuarios.find(u => u.email === emailLogin);

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

    //  salva sessão
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    mensagemLogin.textContent = "Login realizado com sucesso!";
    mensagemLogin.style.color = "green";

    setTimeout(() => {
        window.location.href = "home-usuario.html";
    }, 800);
});