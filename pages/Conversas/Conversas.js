MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const bloqueados = JSON.parse(localStorage.getItem("perfisBloqueados")) || [];
const encerradas = JSON.parse(localStorage.getItem("conversasEncerradas")) || [];
const perfis = MatchConnectApp.perfisOrdenados().filter(function (perfil) {
    return !bloqueados.includes(perfil.nome) && !encerradas.includes(perfil.nome);
});
const conversaSalva = localStorage.getItem("conversaAberta");
let conversaAtual = perfis.find(function (perfil) {
    return perfil.nome === conversaSalva;
}) || perfis[0];
const mensagens = JSON.parse(localStorage.getItem("mensagensUsuario")) || {};
const limiteConversasAtivas = 3;
const palavrasOfensivas = ["ofensa", "idiota", "burro", "odio", "ódio", "xingamento"];

function salvarLista(chave, lista) {
    localStorage.setItem(chave, JSON.stringify(lista));
}

function mensagensDoPerfil(nome) {
    if (!mensagens[nome]) {
        mensagens[nome] = [
            { autor: nome, texto: "Oi! Vi que a gente tem alguns interesses em comum.", data: new Date(Date.now() - 86400000).toISOString() }
        ];
    }

    return mensagens[nome];
}

function salvarMensagens() {
    localStorage.setItem("mensagensUsuario", JSON.stringify(mensagens));
}

function renderizarLista(filtro = "") {
    const termo = filtro.trim().toLowerCase();
    const lista = document.getElementById("listaConversas");
    const filtradas = perfis.filter(function (perfil) {
        return perfil.nome.toLowerCase().includes(termo)
            || perfil.interesses.join(" ").toLowerCase().includes(termo);
    });

    if (filtradas.length === 0) {
        lista.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-search-heart"></i>
                <strong>Nenhuma conversa encontrada</strong>
                <p>Tente buscar por outro interesse ou volte para Descobrir para criar novas conexões.</p>
                <a class="btn btn-match-primary" href="../home/Homeusuario.html#descobrir">Descobrir</a>
            </div>
        `;
        return;
    }

    lista.innerHTML = filtradas.map(function (perfil) {
        return `
            <button class="list-row w-100 text-start bg-transparent border-0" type="button" data-nome="${perfil.nome}">
                ${MatchConnectApp.avatarHtml(perfil.inicial)}
                <span class="row-main">
                    <strong>${perfil.nome}</strong>
                    <small>${perfil.percentual}% compatível • ${perfil.interesses.slice(0, 2).join(", ")}</small>
                </span>
            </button>
        `;
    }).join("");
}

function renderizarChat() {
    if (!conversaAtual) {
        document.getElementById("chatCabecalho").innerHTML = "<strong>Nenhuma conversa ativa</strong>";
        document.getElementById("chatMensagens").innerHTML = '<p class="empty-state">Abra novos matches para conversar.</p>';
        document.getElementById("formMensagem").classList.add("d-none");
        return;
    }

    const detalhes = MatchConnectApp.explicarCompatibilidade(conversaAtual);
    document.getElementById("chatCabecalho").innerHTML = `
        ${MatchConnectApp.avatarHtml(conversaAtual.inicial)}
        <div>
            <h2 class="h4 fw-bold mb-0">${conversaAtual.nome}</h2>
            <span class="text-muted">${detalhes.percentual}% compatível • ${detalhes.motivos.slice(0, 2).join(" • ")}</span>
        </div>
    `;

    document.getElementById("sugestaoEROS").textContent = conversaAtual.mensagem;
    const resumoCategorias = detalhes.categorias.map(function (categoria) {
        return `${categoria.rotulo}: ${categoria.valor}%`;
    }).join(" • ");
    document.getElementById("sugestaoEROS").textContent = `${conversaAtual.mensagem} ${resumoCategorias}`;
    atualizarAlertasConversa();
    atualizarBotaoLigacao();

    document.getElementById("chatMensagens").innerHTML = mensagensDoPerfil(conversaAtual.nome).map(function (mensagem) {
        const minha = mensagem.autor === "Você";
        const sinalizada = mensagem.sinalizada ? " border border-danger" : "";
        let midia = "";

        if (mensagem.tipo === "imagem" || mensagem.tipo === "gif") {
            midia = `<img src="${mensagem.url}" class="img-fluid rounded mt-2" alt="Mídia enviada no chat">`;
        }

        if (mensagem.tipo === "audio") {
            midia = `<audio controls class="mt-2 w-100" src="${mensagem.url}"></audio>`;
        }

        return `
            <div class="d-flex ${minha ? "justify-content-end" : "justify-content-start"} mb-2">
                <span class="chat-message ${minha ? "outgoing" : "incoming"}${sinalizada}">
                    ${mensagem.texto}
                    ${midia}
                    ${mensagem.sinalizada ? '<small class="d-block mt-1 text-danger">Mensagem sinalizada pela moderação.</small>' : ""}
                </span>
            </div>
        `;
    }).join("");

    document.getElementById("chatMensagens").scrollIntoView({ behavior: "smooth", block: "end" });
}

document.getElementById("listaConversas").addEventListener("click", function (event) {
    const botao = event.target.closest("[data-nome]");
    if (!botao) return;
    const selecionada = perfis.find(function (perfil) {
        return perfil.nome === botao.dataset.nome;
    });

    if (!ativarConversa(selecionada.nome)) return;

    conversaAtual = selecionada;
    localStorage.setItem("conversaAberta", conversaAtual.nome);
    renderizarChat();
});

document.getElementById("buscaConversas").addEventListener("input", function (event) {
    renderizarLista(event.target.value);
});

document.getElementById("btnUsarSugestao").addEventListener("click", function () {
    document.getElementById("campoMensagem").value = conversaAtual.mensagem;
});

document.querySelectorAll(".acao-chat").forEach(function (botao) {
    botao.addEventListener("click", function () {
        const comum = conversaAtual.interessesEmComum[0] || conversaAtual.interesses[0];

        if (botao.dataset.acao === "evento") {
            document.getElementById("campoMensagem").value = `${conversaAtual.nome}, pensei em um programa simples ligado a ${comum}. Topa combinar algo em local público?`;
        }

        if (botao.dataset.acao === "experiencia") {
            document.getElementById("campoMensagem").value = `${conversaAtual.nome}, vi uma experiência de ${comum} que parece combinar com a gente. Quer que eu te mande?`;
            MatchConnectApp.addSalvo("experienciasSalvasUsuario", { titulo: `Experiência de ${comum}`, pessoa: conversaAtual.nome, tipo: "Chat" });
        }

        if (botao.dataset.acao === "denuncia") {
            localStorage.setItem("ultimaDenuncia", JSON.stringify({ pessoa: conversaAtual.nome, origem: "Conversas" }));
            document.getElementById("sugestaoEROS").textContent = `Denúncia preparada para ${conversaAtual.nome}. Você pode finalizar na Central de segurança.`;
        }

        if (botao.dataset.acao === "bloquear") {
            const listaBloqueados = JSON.parse(localStorage.getItem("perfisBloqueados")) || [];
            if (!listaBloqueados.includes(conversaAtual.nome)) {
                listaBloqueados.push(conversaAtual.nome);
            }
            salvarLista("perfisBloqueados", listaBloqueados);
            localStorage.setItem("ultimaDenuncia", JSON.stringify({ pessoa: conversaAtual.nome, origem: "Bloqueio no chat" }));
            document.getElementById("statusChat").textContent = `${conversaAtual.nome} foi bloqueado nesta simulação.`;
            window.setTimeout(function () {
                window.location.reload();
            }, 500);
        }
    });
});

document.getElementById("formMensagem").addEventListener("submit", function (event) {
    event.preventDefault();
    const campo = document.getElementById("campoMensagem");
    const midia = document.getElementById("midiaChat");
    const gif = document.getElementById("gifChat");
    const texto = campo.value.trim();
    const arquivo = midia.files[0];
    const gifUrl = gif.value.trim();

    if (!texto && !arquivo && !gifUrl) return;

    function salvarMensagem(extra) {
        const sinalizada = contemOfensa(texto);
        mensagensDoPerfil(conversaAtual.nome).push({
            autor: "Você",
            texto: texto || extra.texto,
            data: new Date().toISOString(),
            sinalizada: sinalizada,
            ...extra
        });

        if (sinalizada) {
            registrarModeracao(texto);
        }

        campo.value = "";
        midia.value = "";
        gif.value = "";
        salvarMensagens();
        renderizarChat();
    }

    if (arquivo) {
        const reader = new FileReader();
        reader.onload = function (readerEvent) {
            salvarMensagem({
                tipo: arquivo.type.startsWith("audio") ? "audio" : "imagem",
                texto: texto || (arquivo.type.startsWith("audio") ? "Áudio enviado" : "Imagem enviada"),
                url: readerEvent.target.result
            });
        };
        reader.readAsDataURL(arquivo);
        return;
    }

    if (gifUrl) {
        salvarMensagem({ tipo: "gif", texto: texto || "GIF enviado", url: gifUrl });
        return;
    }

    salvarMensagem({});
});

document.getElementById("btnLimparMidia").addEventListener("click", function () {
    document.getElementById("midiaChat").value = "";
    document.getElementById("gifChat").value = "";
});

document.getElementById("btnEncerrarConversa").addEventListener("click", function () {
    const lista = JSON.parse(localStorage.getItem("conversasEncerradas")) || [];
    if (!lista.includes(conversaAtual.nome)) {
        lista.push(conversaAtual.nome);
    }
    salvarLista("conversasEncerradas", lista);
    document.getElementById("statusChat").textContent = `Conversa com ${conversaAtual.nome} encerrada.`;
    window.setTimeout(function () {
        window.location.reload();
    }, 500);
});

document.getElementById("btnLigarChat").addEventListener("click", function () {
    const minhasMensagens = mensagensDoPerfil(conversaAtual.nome).filter(function (mensagem) {
        return mensagem.autor === "Você";
    }).length;

    if (minhasMensagens < 3) {
        document.getElementById("statusChat").textContent = "A ligação é liberada após 3 mensagens enviadas para este match.";
        return;
    }

    document.getElementById("statusChat").textContent = `Ligação iniciada com ${conversaAtual.nome} nesta simulação.`;
});

function conversasAtivas() {
    const ativas = JSON.parse(localStorage.getItem("conversasAtivas")) || [];
    return ativas.filter(function (nome) {
        return !encerradas.includes(nome) && !bloqueados.includes(nome);
    });
}

function ativarConversa(nome) {
    const ativas = conversasAtivas();

    if (!ativas.includes(nome) && ativas.length >= limiteConversasAtivas) {
        document.getElementById("statusChat").textContent = "Limite de 3 conversas simultâneas atingido. Encerre uma conversa para abrir outra.";
        return false;
    }

    if (!ativas.includes(nome)) {
        ativas.push(nome);
    }

    salvarLista("conversasAtivas", ativas);
    return true;
}

function contemOfensa(texto) {
    const normalizado = texto.toLowerCase();
    return palavrasOfensivas.some(function (palavra) {
        return normalizado.includes(palavra);
    });
}

function registrarModeracao(texto) {
    const registros = JSON.parse(localStorage.getItem("moderacaoMensagens")) || [];
    registros.unshift({
        pessoa: conversaAtual.nome,
        texto: texto,
        data: new Date().toISOString()
    });
    salvarLista("moderacaoMensagens", registros);
    document.getElementById("statusChat").textContent = "Mensagem enviada e sinalizada pela moderação.";
}

function atualizarAlertasConversa() {
    const alerta = document.getElementById("alertaConversa");
    const mensagensPerfil = mensagensDoPerfil(conversaAtual.nome);
    const minhasMensagens = mensagensPerfil.filter(function (mensagem) {
        return mensagem.autor === "Você";
    });

    if (minhasMensagens.length === 0) {
        alerta.textContent = "Alerta: essa conversa está sem resposta sua. Use a sugestão do EROS para retomar.";
        alerta.classList.remove("d-none");
        return;
    }

    alerta.classList.add("d-none");
}

function atualizarBotaoLigacao() {
    const botao = document.getElementById("btnLigarChat");
    const minhasMensagens = mensagensDoPerfil(conversaAtual.nome).filter(function (mensagem) {
        return mensagem.autor === "Você";
    }).length;
    botao.disabled = minhasMensagens < 3;
    botao.title = minhasMensagens < 3 ? "Envie 3 mensagens para liberar ligação" : "Iniciar ligação";
}

if (conversaAtual) {
    ativarConversa(conversaAtual.nome);
}
renderizarLista();
renderizarChat();
