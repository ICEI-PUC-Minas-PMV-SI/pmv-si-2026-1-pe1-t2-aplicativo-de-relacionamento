const formLogin = document.getElementById("formLogin");
const mensagemLogin = document.getElementById("mensagemLogin");
const etapa2FA = document.getElementById("etapa2FA");
const codigo2FAInput = document.getElementById("codigo2FA");
const codigo2FASimulado = document.getElementById("codigo2FASimulado");
const btnLoginAdmin = document.getElementById("btnLoginAdmin");
let usuarioPendente = null;
let codigoPendente = "";

const ADMIN_TESTE = {
    nome: "Admin MatchConnect",
    email: "admin@matchconnect.com",
    dataNascimento: "1995-06-15",
    senha: "admin123",
    role: "admin",
    perfil: "admin",
    createdAt: new Date().toISOString(),
    blocked: false,
    perfilVerificado: true,
    teste: true
};

const INTERESSES_ADMIN = {
    interesses: ["Cinema", "Livros", "Gastronomia", "Viagens", "Games", "Tecnologia"],
    objetivo: "Testar a experiência completa",
    personalidade: "Curioso(a), direto(a) e aberto(a) a conexões com contexto",
    programaIdeal: "Café, cinema ou partida online com conversa leve",
    descricao: "Conta administrativa para testar matches, conversas, eventos, EROS e mini games sem refazer cadastro.",
    filtros: {
        idadeMinima: 21,
        idadeMaxima: 35,
        distanciaMaxima: 40
    },
    camadas: {
        gostoMuito: ["Cinema", "Games", "Gastronomia"],
        queroExplorar: ["Viagens", "Tecnologia", "Livros"],
        naoCurto: ["Balada"],
        assuntoFavorito: "Cinema"
    },
    fotos: []
};

const MATCHES_ADMIN = [
    {
        nome: "Ana",
        idade: 24,
        distanciaKm: 4,
        inicial: "A",
        interesses: ["Cinema", "Livros", "Gastronomia", "Viagens"],
        objetivo: "Relacionamento sério",
        personalidade: "Calma e curiosa",
        energia: "Calma e curiosa",
        programaIdeal: "Cinema seguido de jantar",
        bio: "Gosta de roteiros tranquilos, bons filmes e conversas que continuam depois do primeiro assunto.",
        mensagem: "Vi que a gente combina em cinema e gastronomia. Qual foi o último lugar que te surpreendeu?",
        percentual: 94,
        emComum: ["Cinema", "Livros", "Gastronomia", "Viagens"],
        matchEm: new Date().toISOString()
    },
    {
        nome: "Luiza",
        idade: 25,
        distanciaKm: 28,
        inicial: "L",
        interesses: ["Games", "Tecnologia", "Séries", "Pets"],
        objetivo: "Amizade",
        personalidade: "Criativa e tranquila",
        energia: "Criativa e tranquila",
        programaIdeal: "Game cooperativo e comida em casa",
        bio: "Mistura tecnologia, jogos cooperativos e conversas sinceras sem pressa.",
        mensagem: "Qual jogo ou série você recomenda para alguém que quer entrar no seu universo?",
        percentual: 88,
        emComum: ["Games", "Tecnologia"],
        matchEm: new Date().toISOString()
    }
];

function setJson(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
}

function garantirAdminNosUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const jaExiste = usuarios.some(function (usuario) {
        return usuario.email === ADMIN_TESTE.email;
    });

    if (!jaExiste) {
        usuarios.push(ADMIN_TESTE);
    }

    setJson("usuarios", usuarios.map(function (usuario) {
        return usuario.email === ADMIN_TESTE.email ? ADMIN_TESTE : usuario;
    }));
}

function prepararDadosAdmin() {
    garantirAdminNosUsuarios();
    setJson("usuarioLogado", ADMIN_TESTE);
    setJson("interessesUsuario", INTERESSES_ADMIN);
    setJson("matchesUsuario", MATCHES_ADMIN);
    setJson("mensagensUsuario", {
        Ana: [
            {
                autor: "Ana",
                texto: "Vi seu perfil de teste por aqui. Cinema e gastronomia parecem render assunto bom.",
                data: new Date(Date.now() - 1000 * 60 * 18).toISOString()
            },
            {
                autor: "Você",
                texto: "Total. Qual foi o último filme que te deixou com vontade de conversar depois?",
                data: new Date(Date.now() - 1000 * 60 * 12).toISOString()
            }
        ],
        Luiza: [
            {
                autor: "Luiza",
                texto: "Se quiser testar a sala de jogos, eu topo uma partida cooperativa.",
                data: new Date(Date.now() - 1000 * 60 * 8).toISOString()
            }
        ]
    });
    setJson("mensagensNaoLidas", { Luiza: 1 });
    setJson("historicoAfinidade", [
        {
            tipo: "match",
            nome: "Ana",
            detalhe: "Match administrativo criado para testes",
            data: new Date().toISOString()
        },
        {
            tipo: "mensagem-recebida",
            nome: "Luiza",
            detalhe: "Mensagem simulada para validar notificações",
            data: new Date().toISOString()
        }
    ]);
    setJson("preferenciasPlayMatchConnect", {
        plataforma: "PC",
        estilo: "Cooperativo",
        comunicacao: "Chat primeiro",
        horario: "Noite",
        jogos: "Minecraft, It Takes Two, Valorant, Overcooked"
    });
    localStorage.setItem("conversaAberta", "Luiza");
    localStorage.setItem("mostrarTourEROSHome", "true");
    localStorage.setItem("mostrarTourCupidoHome", "true");
    localStorage.removeItem("conversasEncerradas");
    localStorage.removeItem("perfisBloqueados");
}

function entrarComoAdmin() {
    prepararDadosAdmin();
    mensagemLogin.textContent = "Admin de teste carregado. Entrando...";
    mensagemLogin.style.color = "green";

    setTimeout(function () {
        window.location.href = "../home/Homeusuario.html";
    }, 100);
}

garantirAdminNosUsuarios();

if (btnLoginAdmin) {
    btnLoginAdmin.addEventListener("click", entrarComoAdmin);
}

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
            if (usuarioPendente.role === "admin") {
                localStorage.setItem("mostrarTourEROSHome", "true");
                localStorage.setItem("mostrarTourCupidoHome", "true");
            }

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

    if (usuario.email === ADMIN_TESTE.email) {
        entrarComoAdmin();
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
