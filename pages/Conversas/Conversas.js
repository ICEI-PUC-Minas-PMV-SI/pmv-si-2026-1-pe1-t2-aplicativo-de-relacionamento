MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const bloqueados = JSON.parse(localStorage.getItem("perfisBloqueados")) || [];
let encerradas = JSON.parse(localStorage.getItem("conversasEncerradas")) || [];
let perfis = MatchConnectApp.getMatchedProfiles().filter(function (perfil) {
    return !bloqueados.includes(perfil.nome) && !encerradas.includes(perfil.nome);
});
const conversaSalva = localStorage.getItem("conversaAberta");
let conversaAtual = perfis.find(function (perfil) {
    return perfil.nome === conversaSalva;
}) || perfis[0];
let mensagens = MatchConnectApp.getMensagens();
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
    MatchConnectApp.setMensagens(mensagens);
}

function statusMensagem(mensagem) {
    if (mensagem.autor !== "Você") return "";
    return mensagem.status || "lida";
}

function textoStatusMensagem(status) {
    if (status === "enviada") return "Mensagem enviada";
    if (status === "entregue") return "Mensagem entregue";
    return "Mensagem lida";
}

function statusMensagemHtml(mensagem) {
    if (mensagem.autor !== "Você") return "";

    const status = statusMensagem(mensagem);
    const icone = status === "enviada" ? "bi-check" : "bi-check-all";
    const texto = textoStatusMensagem(status);

    return `
        <small class="message-meta">
            <span class="message-status status-${status}" title="${texto}" aria-label="${texto}">
                <i class="bi ${icone}" aria-hidden="true"></i>
            </span>
        </small>
    `;
}

function atualizarStatusMensagem(nome, id, status) {
    const lista = mensagens[nome] || [];
    const mensagem = lista.find(function (item) {
        return item.id === id;
    });

    if (!mensagem || mensagem.autor !== "Você") return;
    if (mensagem.status === "lida") return;

    mensagem.status = status;
    salvarMensagens();

    if (conversaAtual && conversaAtual.nome === nome) {
        renderizarChat();
        return;
    }

    renderizarLista(document.getElementById("buscaConversas").value);
}

function simularStatusMensagem(nome, id) {
    window.setTimeout(function () {
        atualizarStatusMensagem(nome, id, "entregue");
    }, 450);

    window.setTimeout(function () {
        atualizarStatusMensagem(nome, id, "lida");
    }, 1000);
}

function naoLidasDoPerfil(nome) {
    return MatchConnectApp.getNaoLidas()[nome] || 0;
}

function prioridadeConversa(perfil) {
    const mensagensPerfil = mensagens[perfil.nome] || [];
    const ultima = mensagensPerfil[mensagensPerfil.length - 1];
    const precisaResposta = ultima && ultima.autor !== "Você";

    return {
        naoLidas: naoLidasDoPerfil(perfil.nome),
        precisaResposta: precisaResposta ? 1 : 0,
        percentual: perfil.percentual || 0
    };
}

function perfisPriorizados(lista) {
    return lista.slice().sort(function (a, b) {
        const pa = prioridadeConversa(a);
        const pb = prioridadeConversa(b);
        return pb.naoLidas - pa.naoLidas
            || pb.precisaResposta - pa.precisaResposta
            || pb.percentual - pa.percentual;
    });
}

function temasDoMatch(perfil) {
    const emComum = perfil.interessesEmComum && perfil.interessesEmComum.length > 0
        ? perfil.interessesEmComum
        : perfil.interesses.slice(0, 3);
    return emComum.length > 0 ? emComum : ["conversa leve"];
}

function sugestoesMensagemEROS(perfil) {
    const temas = temasDoMatch(perfil);
    const temaA = temas[0] || "um assunto em comum";
    const temaB = temas[1] || perfil.programaIdeal || "um programa simples";
    const temaC = temas[2] || perfil.programaIdeal || temas[0] || "uma conversa leve";

    return [
        {
            titulo: `${temaA}`,
            texto: `${perfil.nome}, vi que ${temaA} combina com a gente. Qual indicação desse assunto você acha imperdível?`
        },
        {
            titulo: "Convite leve",
            texto: `${perfil.nome}, ${temaB} parece render um programa tranquilo. Você prefere conversar mais sobre isso primeiro?`
        },
        {
            titulo: `${temaC}`,
            texto: `${perfil.nome}, fiquei curioso sobre ${temaC}. O que você mais curte nesse assunto?`
        }
    ];
}

function renderizarPainelEROS(perfil, detalhes) {
    const temas = temasDoMatch(perfil);
    const sugestoes = sugestoesMensagemEROS(perfil);

    return `
        <div class="eros-chat-panel">
            <div class="eros-chat-summary">
                <div>
                    <strong>Vocês combinam em ${temas.slice(0, 3).join(", ")}</strong>
                    <p>${detalhes.percentual}% de compatibilidade. Use uma das sugestões abaixo.</p>
                </div>
                <span>${detalhes.percentual}%</span>
            </div>
            <div class="eros-suggestion-grid">
                ${sugestoes.map(function (sugestao, index) {
        return `
                    <button class="eros-suggestion-card" type="button" data-sugestao-index="${index}">
                        <strong>${sugestao.titulo}</strong>
                        <span>${sugestao.texto}</span>
                    </button>
                `;
    }).join("")}
            </div>
            <details class="eros-match-details">
                <summary>Ver compatibilidade por área</summary>
                <div class="eros-match-bars" aria-label="Compatibilidade por categoria">
                    ${detalhes.categorias.map(function (categoria) {
        return `
                        <div class="eros-match-bar">
                            <div><strong>${categoria.rotulo}</strong><span>${categoria.valor}%</span></div>
                            <em><b style="width:${categoria.valor}%"></b></em>
                        </div>
                    `;
    }).join("")}
                </div>
            </details>
        </div>
    `;
}

function renderizarLista(filtro = "") {
    const termo = filtro.trim().toLowerCase();
    const lista = document.getElementById("listaConversas");
    const filtradas = perfisPriorizados(perfis).filter(function (perfil) {
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
        const detalhesPrioridade = prioridadeConversa(perfil);
        const mensagensPerfil = mensagens[perfil.nome] || [];
        const ultima = mensagensPerfil[mensagensPerfil.length - 1];
        const classe = detalhesPrioridade.naoLidas > 0 ? " is-unread" : "";
        return `
            <button class="list-row priority-row w-100 text-start bg-transparent border-0${classe}" type="button" data-nome="${perfil.nome}">
                ${MatchConnectApp.avatarHtml(perfil.inicial)}
                <span class="row-main">
                    <strong>${perfil.nome}</strong>
                    <small>${detalhesPrioridade.naoLidas ? `${detalhesPrioridade.naoLidas} nova • ` : ""}${perfil.percentual}% compatível • ${perfil.interesses.slice(0, 2).join(", ")}</small>
                    <em>${ultima ? ultima.texto : "Match pronto para começar"}</em>
                </span>
                <span class="priority-chip">${detalhesPrioridade.precisaResposta ? "Responder" : "OK"}</span>
            </button>
        `;
    }).join("");
}

function renderizarChat() {
    if (!conversaAtual) {
        document.getElementById("chatCabecalho").innerHTML = "<strong>Nenhuma conversa ativa</strong>";
        document.getElementById("chatMensagens").innerHTML = '<p class="empty-state">Abra novos matches para conversar.</p>';
        document.getElementById("sugestaoEROS").innerHTML = "";
        document.getElementById("alertaConversa").classList.add("d-none");
        document.getElementById("chatQuickActions").classList.add("d-none");
        document.getElementById("painelEROSChat").classList.add("d-none");
        document.getElementById("formMensagem").classList.add("d-none");
        return;
    }

    document.getElementById("chatQuickActions").classList.remove("d-none");
    document.getElementById("formMensagem").classList.remove("d-none");
    const detalhes = MatchConnectApp.explicarCompatibilidade(conversaAtual);
    document.getElementById("chatCabecalho").innerHTML = `
        ${MatchConnectApp.avatarHtml(conversaAtual.inicial)}
        <div>
            <h2 class="h4 fw-bold mb-0">${conversaAtual.nome}</h2>
            <span class="text-muted">${detalhes.percentual}% compatível • ${detalhes.motivos.slice(0, 2).join(" • ")}</span>
        </div>
    `;

    document.getElementById("sugestaoEROS").innerHTML = renderizarPainelEROS(conversaAtual, detalhes);
    atualizarAlertasConversa();
    atualizarBotaoLigacao();

    MatchConnectApp.marcarConversaLida(conversaAtual.nome);
    document.body.classList.remove("has-new-message");

    const mensagensPerfilAtual = mensagensDoPerfil(conversaAtual.nome);
    document.getElementById("chatMensagens").innerHTML = mensagensPerfilAtual.map(function (mensagem) {
        const minha = mensagem.autor === "Você";
        const sinalizada = mensagem.sinalizada ? " border border-danger" : "";
        const nova = mensagem.nova ? " incoming-new" : "";
        const texto = mensagem.texto || "";

        if (minha && !mensagem.status) {
            mensagem.status = "lida";
        }

        return `
            <div class="d-flex ${minha ? "justify-content-end" : "justify-content-start"} mb-2">
                <span class="chat-message ${minha ? "outgoing" : "incoming"}${sinalizada}${nova}">
                    <span class="message-text">${texto}</span>
                    ${statusMensagemHtml(mensagem)}
                    ${mensagem.sinalizada ? '<small class="d-block mt-1 text-danger">Mensagem sinalizada pela moderação.</small>' : ""}
                </span>
            </div>
        `;
    }).join("");

    mensagensPerfilAtual.forEach(function (mensagem) {
        mensagem.nova = false;
    });

    const chatMensagens = document.getElementById("chatMensagens");
    chatMensagens.scrollTo({
        top: chatMensagens.scrollHeight,
        behavior: "smooth"
    });
    salvarMensagens();
    renderizarLista(document.getElementById("buscaConversas").value);
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
    if (!conversaAtual) return;
    alternarPainelEROSChat();
});

document.getElementById("btnFecharEROSChat").addEventListener("click", function () {
    document.getElementById("painelEROSChat").classList.add("d-none");
});

function abrirPainelEROSChat() {
    if (!conversaAtual) return;

    document.getElementById("painelEROSChat").classList.remove("d-none");
    document.getElementById("statusChat").textContent = "EROS abriu sugestões rápidas para esta conversa.";
}

function alternarPainelEROSChat() {
    if (!conversaAtual) return;

    const painel = document.getElementById("painelEROSChat");
    const vaiAbrir = painel.classList.contains("d-none");
    painel.classList.toggle("d-none", !vaiAbrir);
    document.getElementById("statusChat").textContent = vaiAbrir
        ? "EROS abriu sugestões rápidas para esta conversa."
        : "EROS fechado.";
}

function ligarEROSFlutuanteAoChat() {
    const botaoEROS = document.querySelector("#globalEROS .global-eros-orb");
    if (!botaoEROS) return;

    botaoEROS.addEventListener("click", function () {
        window.setTimeout(alternarPainelEROSChat, 0);
    });
}

document.getElementById("sugestaoEROS").addEventListener("click", function (event) {
    const botao = event.target.closest("[data-sugestao-index]");
    if (!botao || !conversaAtual) return;

    const sugestoes = sugestoesMensagemEROS(conversaAtual);
    const sugestao = sugestoes[Number(botao.dataset.sugestaoIndex)];
    if (!sugestao) return;

    document.getElementById("campoMensagem").value = sugestao.texto;
    document.getElementById("campoMensagem").focus();
    document.getElementById("statusChat").textContent = `Sugestão "${sugestao.titulo}" pronta para enviar.`;
});

document.querySelectorAll(".acao-chat").forEach(function (botao) {
    botao.addEventListener("click", function () {
        if (!conversaAtual) return;
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
            document.getElementById("statusChat").textContent = `Denúncia preparada para ${conversaAtual.nome}. Você pode finalizar na Central de segurança.`;
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
    const texto = campo.value.trim();

    if (!texto) return;

    const sinalizada = contemOfensa(texto);
    const idMensagem = `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    mensagensDoPerfil(conversaAtual.nome).push({
        id: idMensagem,
        autor: "Você",
        texto: texto,
        data: new Date().toISOString(),
        status: "enviada",
        sinalizada: sinalizada
    });

    if (sinalizada) {
        registrarModeracao(texto);
    }

    campo.value = "";
    salvarMensagens();
    renderizarChat();
    simularStatusMensagem(conversaAtual.nome, idMensagem);
    simularRespostaDoMatch();
});

function simularRespostaDoMatch() {
    if (!conversaAtual) return;

    const perfilResposta = conversaAtual;
    document.getElementById("statusChat").textContent = `${perfilResposta.nome} está digitando...`;

    window.setTimeout(function () {
        mensagensDoPerfil(perfilResposta.nome).push({
            autor: perfilResposta.nome,
            texto: MatchConnectApp.criarMensagemSimulada(perfilResposta, "resposta"),
            data: new Date().toISOString(),
            nova: true
        });
        MatchConnectApp.registrarHistorico("resposta-simulada", perfilResposta, "Resposta automática no chat");
        salvarMensagens();

        if (conversaAtual && conversaAtual.nome === perfilResposta.nome) {
            document.getElementById("statusChat").textContent = `${perfilResposta.nome} respondeu nesta simulação.`;
            renderizarChat();
            return;
        }

        MatchConnectApp.incrementarNaoLida(perfilResposta.nome);
        renderizarLista(document.getElementById("buscaConversas").value);
    }, 1100);
}

document.getElementById("btnEncerrarConversa").addEventListener("click", function () {
    if (!conversaAtual) return;
    const lista = JSON.parse(localStorage.getItem("conversasEncerradas")) || [];
    if (!lista.includes(conversaAtual.nome)) {
        lista.push(conversaAtual.nome);
    }
    encerradas = lista;
    salvarLista("conversasEncerradas", lista);
    salvarLista("conversasAtivas", conversasAtivas().filter(function (nome) {
        return nome !== conversaAtual.nome;
    }));
    MatchConnectApp.marcarConversaLida(conversaAtual.nome);
    localStorage.removeItem("conversaAberta");
    perfis = perfis.filter(function (perfil) {
        return perfil.nome !== conversaAtual.nome;
    });
    document.getElementById("statusChat").textContent = `Conversa com ${conversaAtual.nome} encerrada.`;
    conversaAtual = perfisPriorizados(perfis)[0] || null;
    renderizarLista(document.getElementById("buscaConversas").value);
    renderizarChat();
});

document.getElementById("btnLigarChat").addEventListener("click", function () {
    if (!conversaAtual) return;
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
ligarEROSFlutuanteAoChat();
