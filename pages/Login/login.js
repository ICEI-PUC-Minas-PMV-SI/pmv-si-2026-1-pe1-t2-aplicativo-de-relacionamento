const formLogin = document.getElementById("formLogin");
const mensagemLogin = document.getElementById("mensagemLogin");
const etapa2FA = document.getElementById("etapa2FA");
const codigo2FAInput = document.getElementById("codigo2FA");
const codigo2FASimulado = document.getElementById("codigo2FASimulado");
let usuarioPendente = null;
let codigoPendente = "";

function garantirAdminPadrao() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existeAdmin = usuarios.some(function (usuario) {
        return usuario.role === "admin";
    });

    if (!existeAdmin) {
        usuarios.unshift({
            nome: "Administrador",
            email: "admin@matchconnect.com",
            dataNascimento: "1990-01-01",
            senha: "admin123",
            role: "admin",
            createdAt: new Date().toISOString(),
            blocked: false,
            perfilVerificado: true
        });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
}

garantirAdminPadrao();

// Valida os campos, procura o usuário no localStorage e cria a sessão local.
formLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    if (usuarioPendente) {
        if (codigo2FAInput.value.trim() !== codigoPendente) {
            mensagemLogin.textContent = "Código de verificação inválido.";
            mensagemLogin.style.color = "red";
            return;
        }

        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioPendente));
        localStorage.setItem("ultimoLoginVerificado", new Date().toISOString());
        mensagemLogin.textContent = "Login realizado com sucesso!";
        mensagemLogin.style.color = "green";

        setTimeout(function () {
            const destino = usuarioPendente.role === "admin"
                ? "../Admin/AdminDashboard.html"
                : "../home/Homeusuario.html";
            window.location.href = destino;
        }, 20);
        return;
    }

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

    usuarioPendente = usuario;
    codigoPendente = String(Math.floor(100000 + Math.random() * 900000));
    etapa2FA.classList.remove("d-none");
    codigo2FAInput.focus();
    codigo2FASimulado.textContent = `Simulação acadêmica: código enviado ${codigoPendente}.`;
    mensagemLogin.textContent = "Credenciais validadas. Informe o código de duas etapas.";
    mensagemLogin.style.color = "#5a45c8";
});
