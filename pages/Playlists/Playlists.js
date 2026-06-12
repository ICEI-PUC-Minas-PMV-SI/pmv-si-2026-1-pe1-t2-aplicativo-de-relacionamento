MatchConnectApp.protegerPagina();
MatchConnectApp.configurarSair();

const perfis = MatchConnectApp.perfisOrdenados();
const interessesUsuario = MatchConnectApp.interesses();
const meusInteresses = Array.isArray(interessesUsuario.interesses) ? interessesUsuario.interesses : [];

const sugestoesPorClima = {
    leve: [
        "Sabrina Carpenter - Espresso",
        "Vance Joy - Riptide",
        "Melim - Meu Abrigo",
        "Jão - Idiota",
        "Corinne Bailey Rae - Put Your Records On",
        "Lagum - Hoje Eu Quero Me Perder"
    ],
    romantica: [
        "Laufey - From The Start",
        "ANAVITÓRIA - Trevo",
        "Ed Sheeran - Thinking Out Loud",
        "Liniker - Baby 95",
        "John Mayer - XO",
        "Djavan - Oceano"
    ],
    energia: [
        "Dua Lipa - Levitating",
        "The Weeknd - Blinding Lights",
        "Karol G - Provenza",
        "Calvin Harris - Feel So Close",
        "IZA - Fé",
        "Imagine Dragons - On Top Of The World"
    ],
    indie: [
        "Arctic Monkeys - Fluorescent Adolescent",
        "Clairo - Sofia",
        "The Strokes - Reptilia",
        "Terno Rei - Dia Lindo",
        "Rex Orange County - Sunflower",
        "Cage The Elephant - Cigarette Daydreams"
    ],
    calma: [
        "Norah Jones - Come Away With Me",
        "Rubel - Quando Bate Aquela Saudade",
        "Billie Eilish - ocean eyes",
        "Tiago Iorc - Amei Te Ver",
        "Sade - By Your Side",
        "Cícero - Tempo de Pipa"
    ]
};

const extrasPorInteresse = {
    Música: ["Coldplay - Yellow", "Gilsons - Várias Queixas"],
    Academia: ["Beyoncé - CUFF IT", "Daft Punk - One More Time"],
    Corrida: ["Avicii - The Nights", "Black Eyed Peas - Pump It"],
    Cinema: ["The Smiths - There Is a Light That Never Goes Out", "Queen - Somebody To Love"],
    Livros: ["Hozier - Like Real People Do", "Taylor Swift - cardigan"],
    Séries: ["Kate Bush - Running Up That Hill", "The Rembrandts - I'll Be There for You"],
    Viagens: ["Milky Chance - Stolen Dance", "Natiruts - Quero Ser Feliz Também"],
    Gastronomia: ["Jack Johnson - Banana Pancakes", "Marisa Monte - Ainda Bem"],
    Games: ["Porter Robinson - Shelter", "TheFatRat - Unity"],
    Tecnologia: ["M83 - Midnight City", "Kavinsky - Nightcall"],
    Praia: ["Vitor Kley - O Sol", "Bob Marley - Is This Love"],
    Pets: ["Harry Styles - Sweet Creature", "Jason Mraz - I'm Yours"]
};

const catalogoMusical = {
    "Sabrina Carpenter - Espresso": { genero: "pop", artista: "Sabrina Carpenter", clima: "leve" },
    "Vance Joy - Riptide": { genero: "indie", artista: "Vance Joy", clima: "leve" },
    "Melim - Meu Abrigo": { genero: "mpb", artista: "Melim", clima: "romântico" },
    "Jão - Idiota": { genero: "pop", artista: "Jão", clima: "romântico" },
    "Corinne Bailey Rae - Put Your Records On": { genero: "soul", artista: "Corinne Bailey Rae", clima: "leve" },
    "Lagum - Hoje Eu Quero Me Perder": { genero: "pop", artista: "Lagum", clima: "leve" },
    "Laufey - From The Start": { genero: "jazz pop", artista: "Laufey", clima: "romântico" },
    "ANAVITÓRIA - Trevo": { genero: "mpb", artista: "ANAVITÓRIA", clima: "romântico" },
    "Ed Sheeran - Thinking Out Loud": { genero: "pop", artista: "Ed Sheeran", clima: "romântico" },
    "Liniker - Baby 95": { genero: "soul", artista: "Liniker", clima: "romântico" },
    "John Mayer - XO": { genero: "pop", artista: "John Mayer", clima: "romântico" },
    "Djavan - Oceano": { genero: "mpb", artista: "Djavan", clima: "romântico" },
    "Dua Lipa - Levitating": { genero: "pop", artista: "Dua Lipa", clima: "energia" },
    "The Weeknd - Blinding Lights": { genero: "pop", artista: "The Weeknd", clima: "energia" },
    "Karol G - Provenza": { genero: "reggaeton", artista: "Karol G", clima: "energia" },
    "Calvin Harris - Feel So Close": { genero: "eletrônica", artista: "Calvin Harris", clima: "energia" },
    "IZA - Fé": { genero: "pop", artista: "IZA", clima: "energia" },
    "Imagine Dragons - On Top Of The World": { genero: "pop rock", artista: "Imagine Dragons", clima: "energia" },
    "Arctic Monkeys - Fluorescent Adolescent": { genero: "indie", artista: "Arctic Monkeys", clima: "indie" },
    "Clairo - Sofia": { genero: "indie", artista: "Clairo", clima: "indie" },
    "The Strokes - Reptilia": { genero: "indie", artista: "The Strokes", clima: "indie" },
    "Terno Rei - Dia Lindo": { genero: "indie", artista: "Terno Rei", clima: "indie" },
    "Rex Orange County - Sunflower": { genero: "indie", artista: "Rex Orange County", clima: "leve" },
    "Cage The Elephant - Cigarette Daydreams": { genero: "indie", artista: "Cage The Elephant", clima: "calma" },
    "Norah Jones - Come Away With Me": { genero: "jazz", artista: "Norah Jones", clima: "calma" },
    "Rubel - Quando Bate Aquela Saudade": { genero: "mpb", artista: "Rubel", clima: "calma" },
    "Billie Eilish - ocean eyes": { genero: "pop", artista: "Billie Eilish", clima: "calma" },
    "Tiago Iorc - Amei Te Ver": { genero: "mpb", artista: "Tiago Iorc", clima: "romântico" },
    "Sade - By Your Side": { genero: "soul", artista: "Sade", clima: "calma" },
    "Cícero - Tempo de Pipa": { genero: "mpb", artista: "Cícero", clima: "calma" },
    "Coldplay - Yellow": { genero: "pop rock", artista: "Coldplay", clima: "romântico" },
    "Gilsons - Várias Queixas": { genero: "mpb", artista: "Gilsons", clima: "leve" },
    "Beyoncé - CUFF IT": { genero: "pop", artista: "Beyoncé", clima: "energia" },
    "Daft Punk - One More Time": { genero: "eletrônica", artista: "Daft Punk", clima: "energia" },
    "Avicii - The Nights": { genero: "eletrônica", artista: "Avicii", clima: "energia" },
    "Black Eyed Peas - Pump It": { genero: "pop", artista: "Black Eyed Peas", clima: "energia" },
    "The Smiths - There Is a Light That Never Goes Out": { genero: "indie", artista: "The Smiths", clima: "indie" },
    "Queen - Somebody To Love": { genero: "rock", artista: "Queen", clima: "energia" },
    "Hozier - Like Real People Do": { genero: "indie", artista: "Hozier", clima: "calma" },
    "Taylor Swift - cardigan": { genero: "pop", artista: "Taylor Swift", clima: "calma" },
    "Kate Bush - Running Up That Hill": { genero: "synth pop", artista: "Kate Bush", clima: "energia" },
    "The Rembrandts - I'll Be There for You": { genero: "pop rock", artista: "The Rembrandts", clima: "leve" },
    "Milky Chance - Stolen Dance": { genero: "indie", artista: "Milky Chance", clima: "leve" },
    "Natiruts - Quero Ser Feliz Também": { genero: "reggae", artista: "Natiruts", clima: "leve" },
    "Jack Johnson - Banana Pancakes": { genero: "folk", artista: "Jack Johnson", clima: "leve" },
    "Marisa Monte - Ainda Bem": { genero: "mpb", artista: "Marisa Monte", clima: "romântico" },
    "Porter Robinson - Shelter": { genero: "eletrônica", artista: "Porter Robinson", clima: "energia" },
    "TheFatRat - Unity": { genero: "eletrônica", artista: "TheFatRat", clima: "energia" },
    "M83 - Midnight City": { genero: "synthwave", artista: "M83", clima: "indie" },
    "Kavinsky - Nightcall": { genero: "synthwave", artista: "Kavinsky", clima: "indie" },
    "Vitor Kley - O Sol": { genero: "pop", artista: "Vitor Kley", clima: "leve" },
    "Bob Marley - Is This Love": { genero: "reggae", artista: "Bob Marley", clima: "romântico" },
    "Harry Styles - Sweet Creature": { genero: "pop", artista: "Harry Styles", clima: "romântico" },
    "Jason Mraz - I'm Yours": { genero: "pop", artista: "Jason Mraz", clima: "leve" }
};

let playlistAtual = [];
const erosAfinidadeAvisada = new Set();

const playlistMatch = document.getElementById("playlistMatch");
const playlistMood = document.getElementById("playlistMood");
const playlistName = document.getElementById("playlistName");
const playlistStatus = document.getElementById("playlistStatus");
const playlistAffinitySummary = document.getElementById("playlistAffinitySummary");
const playlistAffinityList = document.getElementById("playlistAffinityList");
const playlistResumo = document.getElementById("playlistResumo");
const playlistTracks = document.getElementById("playlistTracks");
const playlistCount = document.getElementById("playlistCount");
const novaMusica = document.getElementById("novaMusica");
const manualTrackHint = document.getElementById("manualTrackHint");
const manualTrackSuggestions = document.getElementById("manualTrackSuggestions");
const btnBuscarMusicaSpotify = document.getElementById("btnBuscarMusicaSpotify");
const btnAdicionarMusica = document.getElementById("btnAdicionarMusica");
const btnAbrirSpotify = document.getElementById("btnAbrirSpotify");

function spotifySearchUrl(termo) {
    return `https://open.spotify.com/search/${encodeURIComponent(termo)}`;
}

function matchAtual() {
    return MatchConnectApp.perfilPorNome(playlistMatch.value) || perfis[0];
}

function nomeClima() {
    return playlistMood.options[playlistMood.selectedIndex]?.textContent || "playlist";
}

function faixasUnicas(faixas) {
    return [...new Set(faixas)].slice(0, 12);
}

function normalizarAfinidade(valor) {
    return String(valor || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function listaNormalizada(lista) {
    return (Array.isArray(lista) ? lista : []).map(normalizarAfinidade);
}

function combinaTag(valor, preferencias) {
    if (!valor) return false;

    return preferencias.some(function (preferencia) {
        return valor === preferencia
            || valor.includes(preferencia)
            || preferencia.includes(valor);
    });
}

function perfilMusical(perfil) {
    return perfil.musical || {
        generos: ["pop", "indie"],
        artistas: ["Melim", "Vance Joy"],
        climas: ["leve", "romântico"]
    };
}

function tagsDaFaixa(faixa) {
    if (catalogoMusical[faixa]) return catalogoMusical[faixa];

    const artistaDigitado = faixa.split(" - ")[0]?.trim();
    return {
        genero: "",
        artista: artistaDigitado || "",
        clima: playlistMood.value
    };
}

function calcularAfinidade(playlist, match) {
    if (!playlist.length || !match) return 0;

    const musical = perfilMusical(match);
    const generos = listaNormalizada(musical.generos);
    const artistas = listaNormalizada(musical.artistas);
    const climas = listaNormalizada(musical.climas);

    const pontos = playlist.reduce(function (total, faixa) {
        const tags = tagsDaFaixa(faixa);
        const artista = normalizarAfinidade(tags.artista);
        const genero = normalizarAfinidade(tags.genero);
        const clima = normalizarAfinidade(tags.clima);

        return total
            + (combinaTag(artista, artistas) ? 3 : 0)
            + (combinaTag(genero, generos) ? 2 : 0)
            + (combinaTag(clima, climas) ? 1 : 0);
    }, 0);

    return Math.round((pontos / (playlist.length * 6)) * 100);
}

function bancoDeFaixas() {
    return [...new Set([
        ...Object.values(sugestoesPorClima).flat(),
        ...Object.values(extrasPorInteresse).flat()
    ])];
}

function montarNomePadrao() {
    const perfil = matchAtual();
    const clima = nomeClima().split(" ")[0].toLowerCase();
    return `MatchConnect: ${perfil.nome} + você - ${clima}`;
}

function gerarSugestoes() {
    const perfil = matchAtual();
    const clima = playlistMood.value;
    const base = sugestoesPorClima[clima] || sugestoesPorClima.leve;
    const interessesComuns = perfil.interesses.filter(function (interesse) {
        return meusInteresses.includes(interesse);
    });
    const extras = [...interessesComuns, ...perfil.interesses].flatMap(function (interesse) {
        return extrasPorInteresse[interesse] || [];
    });

    playlistAtual = faixasUnicas([...extras, ...base]);
    playlistName.value = playlistName.value.trim() || montarNomePadrao();
    playlistStatus.textContent = `Playlist para ${perfil.nome}`;
    atualizarTela();

    window.MatchConnectEROS?.react({
        tema: `playlist spotify ${perfil.nome} ${perfil.interesses.join(" ")}`,
        fala: `Boa. A playlist para ${perfil.nome} pode começar por ${playlistAtual[0] || "uma faixa leve"} e virar convite.`
    });
}

function textoPlaylist() {
    const perfil = matchAtual();
    const nome = playlistName.value.trim() || montarNomePadrao();
    const linhas = playlistAtual.map(function (faixa, index) {
        return `${index + 1}. ${faixa}`;
    }).join("\n");

    return `${perfil.nome}, montei uma playlist para a gente no MatchConnect: ${nome}\n\n${linhas}\n\nQuer escolher a próxima música?`;
}

function atualizarSpotifyLink() {
    const termo = playlistAtual[0] || playlistName.value || "playlist para encontro";
    btnAbrirSpotify.href = spotifySearchUrl(termo);
}

function atualizarBuscaManual() {
    const termo = novaMusica.value.trim();
    btnBuscarMusicaSpotify.href = spotifySearchUrl(termo || "playlist para encontro");
    btnAdicionarMusica.disabled = termo.length === 0;

    const sugestoes = bancoDeFaixas()
        .filter(function (faixa) {
            return !playlistAtual.includes(faixa);
        })
        .filter(function (faixa) {
            return !termo || faixa.toLowerCase().includes(termo.toLowerCase());
        })
        .slice(0, 6);

    manualTrackSuggestions.innerHTML = sugestoes.map(function (faixa) {
        return `<button type="button" data-sugestao-faixa="${faixa}"><i class="bi bi-plus-circle"></i>${faixa}</button>`;
    }).join("");

    if (!termo) {
        manualTrackHint.textContent = "Use Enter para adicionar rápido ou escolha uma sugestão.";
    } else if (sugestoes.length === 0) {
        manualTrackHint.textContent = "Nenhuma sugestão local. Você ainda pode adicionar ou buscar no Spotify.";
    } else {
        manualTrackHint.textContent = `${sugestoes.length} sugestão${sugestoes.length === 1 ? "" : "ões"} encontrada${sugestoes.length === 1 ? "" : "s"}.`;
    }
}

function atualizarResumo() {
    const perfil = matchAtual();
    const comuns = perfil.interesses.filter(function (interesse) {
        return meusInteresses.includes(interesse);
    });
    const base = comuns.length ? comuns.join(", ") : perfil.interesses.slice(0, 3).join(", ");

    if (playlistAtual.length === 0) {
        playlistResumo.textContent = `Comece uma playlist para ${perfil.nome}. Clique em "Gerar sugestão" ou adicione uma faixa manualmente. Base de afinidade: ${base}.`;
        return;
    }

    playlistResumo.textContent = `${playlistAtual.length} faixas para ${perfil.nome}. Base de afinidade: ${base}. Use "Abrir no Spotify" para pesquisar a primeira faixa e criar a playlist na sua conta.`;
}

function renderizarFaixas() {
    playlistCount.textContent = `${playlistAtual.length} ${playlistAtual.length === 1 ? "faixa" : "faixas"}`;

    playlistTracks.innerHTML = playlistAtual.map(function (faixa, index) {
        return `
            <article class="track-item">
                <span class="track-index">${index + 1}</span>
                <div>
                    <strong>${faixa}</strong>
                    <span>Pronta para buscar e adicionar no Spotify</span>
                </div>
                <div class="track-actions">
                    <a class="btn btn-match-outline btn-sm" href="${spotifySearchUrl(faixa)}" target="_blank" rel="noopener">
                        <i class="bi bi-spotify"></i> Buscar
                    </a>
                    <button class="btn btn-match-outline btn-sm" type="button" data-remover-faixa="${index}">
                        Remover
                    </button>
                </div>
            </article>
        `;
    }).join("") || '<p class="empty-state">Gere uma sugestão ou adicione faixas manualmente.</p>';
}

function renderizarAfinidade() {
    const selecionado = matchAtual();
    const afinidadeSelecionado = calcularAfinidade(playlistAtual, selecionado);
    const matchesOrdenados = [
        selecionado,
        ...perfis.filter(function (perfil) {
            return perfil.nome !== selecionado.nome;
        })
    ];

    playlistAffinitySummary.innerHTML = `
        <span>Afinidade com ${selecionado.nome}: <strong>${afinidadeSelecionado}%</strong></span>
        <div class="summary-affinity-progress" aria-label="Afinidade com ${selecionado.nome}: ${afinidadeSelecionado}%">
            <span data-affinity-bar="${afinidadeSelecionado}" style="width: 0%"></span>
        </div>
    `;

    playlistAffinityList.innerHTML = matchesOrdenados.map(function (perfil) {
        const porcentagem = calcularAfinidade(playlistAtual, perfil);
        const selecionadoAtual = perfil.nome === selecionado.nome;

        return `
            <article class="affinity-row${selecionadoAtual ? " is-selected" : ""}">
                <span class="affinity-avatar" aria-hidden="true">${perfil.inicial}</span>
                <strong class="affinity-name">${perfil.nome}</strong>
                <div class="affinity-progress" aria-label="Afinidade de ${perfil.nome}: ${porcentagem}%">
                    <span data-affinity-bar="${porcentagem}" style="width: 0%"></span>
                </div>
                <span class="affinity-percent">${porcentagem}%</span>
            </article>
        `;
    }).join("");

    window.requestAnimationFrame(function () {
        document.querySelectorAll("[data-affinity-bar]").forEach(function (barra) {
            barra.style.width = `${barra.dataset.affinityBar}%`;
        });
    });
}

function avisarAfinidadeAlta() {
    const perfil = matchAtual();
    const afinidade = calcularAfinidade(playlistAtual, perfil);

    if (afinidade <= 85 || erosAfinidadeAvisada.has(perfil.nome)) return;

    erosAfinidadeAvisada.add(perfil.nome);
    window.MatchConnectEROS?.react({
        tema: `playlist afinidade alta ${perfil.nome}`,
        fala: `Essa playlist tem a cara da ${perfil.nome}.`
    });
}

function atualizarTela() {
    atualizarResumo();
    atualizarSpotifyLink();
    renderizarFaixas();
    renderizarAfinidade();
    atualizarBuscaManual();
    avisarAfinidadeAlta();
}

function adicionarFaixaManual(faixa) {
    const normalizada = faixa.trim();
    if (!normalizada) return;

    if (playlistAtual.includes(normalizada)) {
        playlistStatus.textContent = "Essa faixa já está na playlist";
        manualTrackHint.textContent = "Ela já faz parte do rascunho.";
        return;
    }

    playlistAtual = [...playlistAtual, normalizada].slice(0, 12);
    novaMusica.value = "";
    playlistStatus.textContent = "Faixa adicionada";
    manualTrackHint.textContent = `"${normalizada}" entrou no rascunho.`;
    atualizarTela();
}

function salvarPlaylist() {
    if (playlistAtual.length === 0) {
        playlistStatus.textContent = "Gere uma playlist primeiro";
        return;
    }

    MatchConnectApp.addSalvo("playlistsSpotifyMatchConnect", {
        nome: playlistName.value.trim() || montarNomePadrao(),
        match: playlistMatch.value,
        clima: nomeClima(),
        faixas: playlistAtual
    });
    playlistStatus.textContent = "Playlist salva";
}

function copiarPlaylist() {
    if (playlistAtual.length === 0) {
        playlistStatus.textContent = "Nada para copiar";
        return;
    }

    navigator.clipboard?.writeText(textoPlaylist());
    playlistStatus.textContent = "Lista copiada";
}

function enviarPlaylist() {
    if (playlistAtual.length === 0) {
        playlistStatus.textContent = "Gere uma playlist primeiro";
        return;
    }

    const perfil = matchAtual();
    const mensagens = MatchConnectApp.getMensagens();

    if (!mensagens[perfil.nome]) {
        mensagens[perfil.nome] = [
            { autor: perfil.nome, texto: perfil.mensagem || "Oi! Vi que a gente combina em alguns interesses." }
        ];
    }

    mensagens[perfil.nome].push({
        autor: "Você",
        texto: textoPlaylist(),
        origem: "playlist-spotify",
        data: new Date().toISOString()
    });

    MatchConnectApp.addMatch(perfil);
    MatchConnectApp.setMensagens(mensagens);
    MatchConnectApp.registrarHistorico("playlist-spotify", perfil, playlistName.value.trim() || montarNomePadrao());
    localStorage.setItem("conversaAberta", perfil.nome);
    playlistStatus.textContent = `Enviada para ${perfil.nome}`;

    window.setTimeout(function () {
        window.location.href = "../Conversas/Conversas.html";
    }, 500);
}

playlistMatch.innerHTML = perfis.map(function (perfil) {
    return `<option value="${perfil.nome}">${perfil.nome} - ${perfil.percentual}% compatível</option>`;
}).join("");

playlistName.value = montarNomePadrao();
atualizarTela();

document.getElementById("btnGerarPlaylist").addEventListener("click", gerarSugestoes);
document.getElementById("btnSalvarPlaylist").addEventListener("click", salvarPlaylist);
document.getElementById("btnCopiarPlaylist").addEventListener("click", copiarPlaylist);
document.getElementById("btnEnviarPlaylist").addEventListener("click", enviarPlaylist);

btnAdicionarMusica.addEventListener("click", function () {
    adicionarFaixaManual(novaMusica.value);
});

novaMusica.addEventListener("input", atualizarBuscaManual);

novaMusica.addEventListener("keydown", function (event) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    adicionarFaixaManual(novaMusica.value);
});

manualTrackSuggestions.addEventListener("click", function (event) {
    const botao = event.target.closest("[data-sugestao-faixa]");
    if (!botao) return;
    adicionarFaixaManual(botao.dataset.sugestaoFaixa);
});

playlistMood.addEventListener("change", function () {
    playlistName.value = montarNomePadrao();
    gerarSugestoes();
});

playlistMatch.addEventListener("change", function () {
    playlistName.value = montarNomePadrao();
    gerarSugestoes();
});

playlistName.addEventListener("input", atualizarSpotifyLink);

playlistTracks.addEventListener("click", function (event) {
    const remover = event.target.closest("[data-remover-faixa]");
    if (!remover) return;
    playlistAtual.splice(Number(remover.dataset.removerFaixa), 1);
    playlistStatus.textContent = "Faixa removida";
    atualizarTela();
});
