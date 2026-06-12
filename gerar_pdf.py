"""Gera o documento funcionalidades-do-site.pdf para o projeto MatchConnect."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, KeepTogether
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import datetime

# ─── Paleta ──────────────────────────────────────────────────────────────────
ROXO       = colors.HexColor("#6C47D5")
ROXO_CLARO = colors.HexColor("#8B6FE8")
ROSA       = colors.HexColor("#E84393")
FUNDO      = colors.HexColor("#F5F0FF")
CINZA_TEXTO= colors.HexColor("#4A4A68")
CINZA_SUB  = colors.HexColor("#6B6B8A")
BRANCO     = colors.white
PRETO      = colors.HexColor("#1A1A2E")

PAGE_W, PAGE_H = A4
MARGEM = 2.2 * cm

# ─── Estilos ─────────────────────────────────────────────────────────────────
base = getSampleStyleSheet()

def estilo(nome, **kw):
    return ParagraphStyle(nome, **kw)

CAPA_TITULO = estilo("CapaTitulo",
    fontName="Helvetica-Bold", fontSize=38, textColor=BRANCO,
    alignment=TA_CENTER, spaceAfter=12, leading=46)

CAPA_SUB = estilo("CapaSub",
    fontName="Helvetica", fontSize=15, textColor=colors.HexColor("#DDD6FF"),
    alignment=TA_CENTER, spaceAfter=6)

CAPA_DATA = estilo("CapaData",
    fontName="Helvetica", fontSize=11, textColor=colors.HexColor("#C4B5F4"),
    alignment=TA_CENTER)

H1 = estilo("H1MC",
    fontName="Helvetica-Bold", fontSize=18, textColor=ROXO,
    spaceBefore=20, spaceAfter=8, leading=24,
    borderPad=0)

H2 = estilo("H2MC",
    fontName="Helvetica-Bold", fontSize=13, textColor=ROXO_CLARO,
    spaceBefore=14, spaceAfter=5, leading=18)

H3 = estilo("H3MC",
    fontName="Helvetica-Bold", fontSize=11, textColor=CINZA_TEXTO,
    spaceBefore=10, spaceAfter=4, leading=15)

CORPO = estilo("CorpoMC",
    fontName="Helvetica", fontSize=10, textColor=CINZA_TEXTO,
    spaceBefore=2, spaceAfter=4, leading=15, alignment=TA_JUSTIFY)

BULLET = estilo("BulletMC",
    fontName="Helvetica", fontSize=10, textColor=CINZA_TEXTO,
    spaceBefore=1, spaceAfter=2, leading=14,
    leftIndent=16, firstLineIndent=0, bulletIndent=4)

SUMARIO_TITULO = estilo("SumarioTitulo",
    fontName="Helvetica-Bold", fontSize=11, textColor=ROXO,
    spaceBefore=2, spaceAfter=1, leading=15)

SUMARIO_ITEM = estilo("SumarioItem",
    fontName="Helvetica", fontSize=10, textColor=CINZA_TEXTO,
    spaceBefore=1, spaceAfter=1, leading=13, leftIndent=14)

DESTAQUE_LABEL = estilo("DestaqueLabel",
    fontName="Helvetica-Bold", fontSize=9, textColor=ROXO,
    spaceBefore=0, spaceAfter=0)

NOTA_RODAPE = estilo("NotaRodape",
    fontName="Helvetica-Oblique", fontSize=8, textColor=CINZA_SUB,
    alignment=TA_CENTER)

# ─── Cabeçalho / Rodapé ──────────────────────────────────────────────────────
def cabecalho_rodape(canvas, doc):
    canvas.saveState()
    w, h = A4

    # Linha decorativa no topo
    canvas.setFillColor(ROXO)
    canvas.rect(0, h - 0.7 * cm, w, 0.7 * cm, fill=1, stroke=0)

    # Nome do app no topo
    canvas.setFillColor(BRANCO)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawString(MARGEM, h - 0.45 * cm, "MatchConnect")
    canvas.setFont("Helvetica", 9)
    canvas.drawRightString(w - MARGEM, h - 0.45 * cm, "Documentação de Funcionalidades")

    # Rodapé
    canvas.setFillColor(ROXO)
    canvas.rect(0, 0, w, 0.55 * cm, fill=1, stroke=0)
    canvas.setFillColor(BRANCO)
    canvas.setFont("Helvetica", 8)
    canvas.drawCentredString(w / 2, 0.16 * cm, f"Página {doc.page}")

    canvas.restoreState()

# ─── Helpers ─────────────────────────────────────────────────────────────────
def hr():
    return HRFlowable(width="100%", thickness=1, color=colors.HexColor("#E0D6FF"),
                      spaceAfter=6, spaceBefore=4)

def sp(n=6):
    return Spacer(1, n)

def p(texto, estilo_=None):
    return Paragraph(texto, estilo_ or CORPO)

def h1(texto):
    return Paragraph(f'<font color="#6C47D5">■</font>  {texto}', H1)

def h2(texto):
    return Paragraph(f'<font color="#8B6FE8">▸</font>  {texto}', H2)

def h3(texto):
    return Paragraph(texto, H3)

def bala(texto):
    return Paragraph(f"• {texto}", BULLET)

def tabela_func(dados, col_w=None):
    """Cria uma tabela de funcionalidades com estilo padrão."""
    t = Table(dados, colWidths=col_w or [3.5*cm, 7*cm, 5*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND",   (0,0), (-1,0),  ROXO),
        ("TEXTCOLOR",    (0,0), (-1,0),  BRANCO),
        ("FONTNAME",     (0,0), (-1,0),  "Helvetica-Bold"),
        ("FONTSIZE",     (0,0), (-1,0),  9),
        ("BOTTOMPADDING",(0,0), (-1,0),  6),
        ("TOPPADDING",   (0,0), (-1,0),  6),
        ("FONTNAME",     (0,1), (-1,-1), "Helvetica"),
        ("FONTSIZE",     (0,1), (-1,-1), 9),
        ("TEXTCOLOR",    (0,1), (-1,-1), CINZA_TEXTO),
        ("ROWBACKGROUNDS",(0,1),(-1,-1), [BRANCO, FUNDO]),
        ("TOPPADDING",   (0,1), (-1,-1), 5),
        ("BOTTOMPADDING",(0,1), (-1,-1), 5),
        ("LEFTPADDING",  (0,0), (-1,-1), 8),
        ("RIGHTPADDING", (0,0), (-1,-1), 8),
        ("GRID",         (0,0), (-1,-1), 0.4, colors.HexColor("#D8CEEF")),
        ("VALIGN",       (0,0), (-1,-1), "TOP"),
        ("WORDWRAP",     (0,0), (-1,-1), True),
    ]))
    return t

def caixa_destaque(titulo, itens):
    """Bloco colorido de destaque com lista de bullets."""
    corpo = "<br/>".join(f"• {i}" for i in itens)
    data = [
        [Paragraph(titulo, estilo("CTH", fontName="Helvetica-Bold", fontSize=10,
                                  textColor=BRANCO, leading=14))],
        [Paragraph(corpo, estilo("CTB", fontName="Helvetica", fontSize=9.5,
                                 textColor=CINZA_TEXTO, leading=14, spaceBefore=2))],
    ]
    t = Table(data, colWidths=[PAGE_W - 2 * MARGEM])
    t.setStyle(TableStyle([
        ("BACKGROUND",    (0,0), (-1,0), ROXO),
        ("BACKGROUND",    (0,1), (-1,-1), FUNDO),
        ("TOPPADDING",    (0,0), (-1,-1), 8),
        ("BOTTOMPADDING", (0,0), (-1,-1), 8),
        ("LEFTPADDING",   (0,0), (-1,-1), 12),
        ("RIGHTPADDING",  (0,0), (-1,-1), 12),
        ("BOX",           (0,0), (-1,-1), 1, ROXO_CLARO),
        ("ROUNDEDCORNERS",(0,0), (-1,-1), [4,4,4,4]),
    ]))
    return t

# ─── Conteúdo ────────────────────────────────────────────────────────────────
def conteudo():
    story = []
    data_hoje = datetime.date.today().strftime("%d de %B de %Y").replace(
        "January","janeiro").replace("February","fevereiro").replace(
        "March","março").replace("April","abril").replace("May","maio").replace(
        "June","junho").replace("July","julho").replace("August","agosto").replace(
        "September","setembro").replace("October","outubro").replace(
        "November","novembro").replace("December","dezembro")

    # ── CAPA ─────────────────────────────────────────────────────────────────
    # Fundo colorido simulado via tabela
    capa_data = [
        [Paragraph("MatchConnect", CAPA_TITULO)],
        [Paragraph("Documentação de Funcionalidades do Site", CAPA_SUB)],
        [Spacer(1, 12)],
        [Paragraph("Projeto Acadêmico · Sistemas de Informação · PUC-Minas", CAPA_SUB)],
        [Spacer(1, 20)],
        [Paragraph(f"Gerado em {data_hoje}", CAPA_DATA)],
    ]
    capa_tbl = Table(capa_data, colWidths=[PAGE_W - 2 * MARGEM])
    capa_tbl.setStyle(TableStyle([
        ("BACKGROUND",    (0,0), (-1,-1), ROXO),
        ("TOPPADDING",    (0,0), (-1,-1), 20),
        ("BOTTOMPADDING", (0,0), (-1,-1), 20),
        ("LEFTPADDING",   (0,0), (-1,-1), 24),
        ("RIGHTPADDING",  (0,0), (-1,-1), 24),
    ]))
    story.append(Spacer(1, 3.5 * cm))
    story.append(capa_tbl)
    story.append(Spacer(1, 1.5 * cm))

    equipe_data = [[
        Paragraph("Equipe", estilo("EqT", fontName="Helvetica-Bold", fontSize=10, textColor=ROXO)),
        Paragraph("Ian Pedra Martins · João Vitor Simões Leal · Sarah Luiza Domingos de Mello · Rodrigo Gonçalves de Moura Ribeiro",
                  estilo("EqN", fontName="Helvetica", fontSize=9, textColor=CINZA_TEXTO)),
    ],[
        Paragraph("Orientador", estilo("EqT", fontName="Helvetica-Bold", fontSize=10, textColor=ROXO)),
        Paragraph("Clóvis Lemos Tavares",
                  estilo("EqN", fontName="Helvetica", fontSize=9, textColor=CINZA_TEXTO)),
    ]]
    eq = Table(equipe_data, colWidths=[3*cm, PAGE_W - 2*MARGEM - 3*cm])
    eq.setStyle(TableStyle([
        ("BACKGROUND",    (0,0), (-1,-1), FUNDO),
        ("TOPPADDING",    (0,0), (-1,-1), 7),
        ("BOTTOMPADDING", (0,0), (-1,-1), 7),
        ("LEFTPADDING",   (0,0), (-1,-1), 10),
        ("GRID",          (0,0), (-1,-1), 0.3, colors.HexColor("#D8CEEF")),
        ("VALIGN",        (0,0), (-1,-1), "MIDDLE"),
    ]))
    story.append(eq)
    story.append(PageBreak())

    # ── SUMÁRIO ──────────────────────────────────────────────────────────────
    story.append(h1("Sumário"))
    story.append(hr())
    sumario = [
        ("1.", "Visão Geral do Projeto"),
        ("2.", "Principais Funcionalidades"),
        ("  2.1", "Acesso e Autenticação"),
        ("  2.2", "Cadastro de Interesses (Wizard)"),
        ("  2.3", "Home / Dashboard Principal"),
        ("  2.4", "Sistema de Matching e Descoberta"),
        ("  2.5", "EROS — Assistente Virtual de Relacionamento"),
        ("  2.6", "Chat e Conversas"),
        ("  2.7", "Sala de Jogos"),
        ("  2.8", "Eventos"),
        ("  2.9", "Experiências e Favoritos"),
        ("  2.10", "Segurança e Primeiro Encontro"),
        ("  2.11", "Planos e Assinatura Premium"),
        ("  2.12", "Configurações e Notificações"),
        ("3.", "Arquitetura e Tecnologias"),
        ("4.", "Fluxos do Usuário"),
        ("5.", "Pontos de Destaque"),
        ("6.", "Sugestões de Melhoria"),
    ]
    for num, titulo in sumario:
        est = SUMARIO_TITULO if not num.startswith("  ") else SUMARIO_ITEM
        story.append(Paragraph(f"{num}&nbsp;&nbsp;&nbsp;{titulo}", est))
    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # 1. VISÃO GERAL
    # ══════════════════════════════════════════════════════════════════════════
    story.append(h1("1. Visão Geral do Projeto"))
    story.append(hr())
    story.append(p(
        "O <b>MatchConnect</b> é um aplicativo web de relacionamento desenvolvido como "
        "projeto acadêmico do curso de <b>Sistemas de Informação da PUC-Minas</b>, "
        "1º semestre, na disciplina de Aplicações Web. A aplicação foi concebida para "
        "superar as limitações dos aplicativos tradicionais do segmento, que favorecem "
        "conexões superficiais baseadas em aparência física (fenômenos de <i>Lookismo</i>, "
        "<i>Ghosting</i> e <i>Dating Burnout</i>)."
    ))
    story.append(sp())
    story.append(p(
        "A proposta central é promover conexões mais significativas utilizando um "
        "<b>sistema de match por afinidade</b>: compatibilidade calculada a partir de "
        "interesses, valores, estilo de vida e objetivos de relacionamento declarados "
        "pelo usuário durante o cadastro. Além disso, o aplicativo conta com "
        "<b>EROS</b> (<i>Engine for Relationship Optimization &amp; Synergy</i>), "
        "um assistente virtual que sugere perguntas de quebra-gelo e mensagens "
        "personalizadas para facilitar o início das conversas."
    ))
    story.append(sp(8))

    info = [
        ["Público-alvo", "Adultos (+18 anos) com familiaridade digital que buscam conexões autênticas"],
        ["Problema endereçado", "Interações superficiais, ghosting e dificuldade de manter conversas em apps tradicionais"],
        ["Diferenciais", "Match por afinidade, assistente de IA, jogos de quebra-gelo, eventos ao vivo temáticos"],
        ["Status do projeto", "Protótipo funcional — frontend completo com backend FastAPI em desenvolvimento"],
    ]
    t = Table(info, colWidths=[4.5*cm, PAGE_W - 2*MARGEM - 4.5*cm])
    t.setStyle(TableStyle([
        ("FONTNAME",      (0,0), (0,-1), "Helvetica-Bold"),
        ("FONTNAME",      (1,0), (1,-1), "Helvetica"),
        ("FONTSIZE",      (0,0), (-1,-1), 9.5),
        ("TEXTCOLOR",     (0,0), (0,-1), ROXO),
        ("TEXTCOLOR",     (1,0), (1,-1), CINZA_TEXTO),
        ("ROWBACKGROUNDS",(0,0), (-1,-1), [FUNDO, BRANCO]),
        ("TOPPADDING",    (0,0), (-1,-1), 7),
        ("BOTTOMPADDING", (0,0), (-1,-1), 7),
        ("LEFTPADDING",   (0,0), (-1,-1), 10),
        ("RIGHTPADDING",  (0,0), (-1,-1), 10),
        ("GRID",          (0,0), (-1,-1), 0.4, colors.HexColor("#D8CEEF")),
        ("VALIGN",        (0,0), (-1,-1), "MIDDLE"),
    ]))
    story.append(t)
    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # 2. FUNCIONALIDADES
    # ══════════════════════════════════════════════════════════════════════════
    story.append(h1("2. Principais Funcionalidades"))
    story.append(hr())
    story.append(p(
        "O MatchConnect é composto por <b>32 telas HTML</b> interligadas, organizadas em "
        "módulos funcionais. Cada funcionalidade é descrita abaixo do ponto de vista do "
        "usuário e com os arquivos técnicos envolvidos."
    ))
    story.append(sp(10))

    # 2.1
    story.append(h2("2.1 Acesso e Autenticação"))
    story.append(p(
        "O fluxo de entrada começa na <b>landing page pública</b> (<code>index.html</code>), "
        "que apresenta o produto com seções de hero, funcionamento, recursos e evento do dia. "
        "A partir dela, o usuário pode criar conta ou fazer login."
    ))
    story.append(sp(4))

    auth_data = [
        ["Tela", "O que faz", "Arquivo"],
        ["Landing page", "Apresentação pública do app com CTA para cadastro/login e prévia animada do produto", "index.html"],
        ["Cadastro", "Coleta nome, e-mail, data de nascimento e senha. Valida idade mínima de 18 anos, unicidade de e-mail e confirmação de senha. Redireciona para o wizard de interesses.", "Cadastro/Cadastro.html\nCadastro/cadastro.js"],
        ["Login", "Autenticação por e-mail e senha. Após validar credenciais, exibe campo de código 2FA simulado (6 dígitos gerados aleatoriamente). Conta admin pré-configurada para testes.", "Login/login.html\nLogin/login.js"],
        ["Proteção de rotas", "Todas as páginas internas verificam a presença de usuário logado no localStorage; caso ausente, redirecionam para login.", "assets/js/appData.js\n(protegerPagina)"],
    ]
    story.append(tabela_func(auth_data, col_w=[3.5*cm, 8*cm, 4*cm]))
    story.append(sp(12))

    # 2.2
    story.append(h2("2.2 Cadastro de Interesses — Wizard de 4 Etapas"))
    story.append(p(
        "Após o cadastro inicial, o usuário é guiado por um wizard progressivo para "
        "construir seu perfil de afinidade. O preenchimento dessas informações alimenta "
        "diretamente o algoritmo de compatibilidade."
    ))
    story.append(sp(4))
    etapas = [
        "Etapa 1 — Interesses: seleção de categorias (Cinema, Livros, Música, Gastronomia, Games, Viagens, etc.) via checkboxes visuais",
        "Etapa 2 — Camadas de interesse: campos de texto para 'Gosto muito', 'Quero explorar' e 'Não curto'; assunto favorito principal",
        "Etapa 3 — Personalidade e objetivos: tipo de personalidade, energia, programa ideal, objetivo de relacionamento e distância máxima (slider)",
        "Etapa 4 — Fotos e bio: upload de fotos (armazenadas como Base64 no localStorage), descrição livre e finalização",
    ]
    for e in etapas:
        story.append(bala(e))
    story.append(sp(4))
    story.append(p("Arquivos: <b>CadastroInteresses/cadastrointeresses.html</b> e <b>cadastrointeresses.js</b>"))
    story.append(sp(12))

    # 2.3
    story.append(h2("2.3 Home / Dashboard Principal"))
    story.append(p(
        "A Home (<b>home/Homeusuario.html</b>) é o núcleo da experiência logada. "
        "Ela reúne em uma única página as principais jornadas do usuário:"
    ))
    story.append(sp(4))
    home_itens = [
        "Painel do perfil — foto, nome, barra de completude, interesses, objetivo, personalidade e programa ideal",
        "Área 'Descobrir' — card de swipe com perfil atual, percentual de compatibilidade, bio, frase e sugestão do EROS",
        "Lista de conversas recentes — com contador de mensagens não lidas e busca por nome/interesse",
        "Abas rápidas — EROS (dica de conversa), Matches (lista animada), Eventos, Segurança",
        "Modos do dia — Conversar / Sair / Evento / Jogar (altera foco e dicas do EROS)",
        "Missões diárias do EROS Pet — barra de XP, 5 níveis, humor variável e recompensas desbloqueáveis",
        "Guia inicial (tour) — 5 etapas mostradas apenas no primeiro acesso para orientar o novo usuário",
        "Busca global — filtra perfis por nome, bio, interesses ou programa ideal em tempo real",
    ]
    for item in home_itens:
        story.append(bala(item))
    story.append(sp(12))

    # 2.4
    story.append(h2("2.4 Sistema de Matching e Descoberta (Swipe)"))
    story.append(p(
        "O coração do produto é o sistema de compatibilidade por afinidade. "
        "A descoberta de perfis acontece por meio de cards deslizáveis, apresentando "
        "candidatos ordenados do mais ao menos compatível."
    ))
    story.append(sp(6))
    story.append(h3("Algoritmo de compatibilidade (frontend)"))
    algo_itens = [
        "Base calculada sobre interesses em comum (lista principal do usuário vs. do perfil)",
        "Bônus por interesses favoritos ('Gosto muito') presentes no perfil",
        "Desconto por interesses bloqueados ('Não curto') no perfil",
        "Bônus adicional por objetivo de relacionamento preenchido",
        "Resultado final: percentual entre 18% e 98% (arquivo: assets/js/appData.js, função compatibilidade())",
        "Compatibilidade detalhada por 4 categorias: Conversa, Estilo de encontro, Interesses culturais e Rotina",
    ]
    for item in algo_itens:
        story.append(bala(item))
    story.append(sp(6))
    story.append(h3("Interação de descoberta"))
    swipe_itens = [
        "Drag-to-swipe com gestos via Pointer API: arrastar >80px para a direita = curtir; para a esquerda = recusar",
        "Botões Curtir / Recusar / Voltar (desfaz a última ação)",
        "Animação de celebração ao curtir ('Match!')",
        "Após curtida: mensagem simulada do match chega automaticamente (toast visual)",
        "Filtros salvos de cadastro (idade, distância, interesse, objetivo) aplicados automaticamente na listagem",
        "Painel expansível 'Por que vocês combinam' com explicação detalhada e barras por categoria",
    ]
    for item in swipe_itens:
        story.append(bala(item))
    story.append(sp(6))
    story.append(h3("API de compatibilidade (backend)"))
    story.append(p(
        "O frontend tenta consultar <b>POST /compatibilidade</b> no servidor FastAPI "
        "(<b>backend/main.py</b>). A API calcula score com base em: interesses em comum "
        "(até 54 pontos), objetivo igual (26 pontos) e diferença de idade (até 20 pontos). "
        "Em caso de falha, o cálculo local assume automaticamente."
    ))
    story.append(sp(12))

    # 2.5
    story.append(h2("2.5 EROS — Assistente Virtual de Relacionamento"))
    story.append(p(
        "EROS (<i>Engine for Relationship Optimization &amp; Synergy</i>) é o diferencial "
        "central do MatchConnect. O assistente aparece em <b>três formas</b> ao longo da "
        "aplicação:"
    ))
    story.append(sp(6))
    eros_formas = [
        ["Forma", "Onde aparece", "O que faz"],
        ["EROS na Landing", "index.html", "Mascote animado com dicas rotativas a cada 7,6s; clicável para nova frase"],
        ["EROS Flutuante (global)", "Todas as telas internas", "Orbe animado injetado pelo navigation.js; muda 'skin' conforme o contexto da página (evento, games, livros, etc.); reage ao clique em qualquer card da tela"],
        ["EROS Dedicado", "pages/EROS/EROS.html", "Interface completa: seleciona perfil, escolhe tom (leve/direto/divertido) e gera mensagem de abertura, pergunta de quebra-gelo e ideia de encontro personalizados"],
        ["EROS Pet (Home)", "home/Homeusuario.html", "Gamificado com XP, 5 níveis de humor, missões, recompensas e painel expansível; interage com ações do usuário na tela"],
    ]
    story.append(tabela_func(eros_formas, col_w=[3.5*cm, 5*cm, 7*cm]))
    story.append(sp(12))

    # 2.6
    story.append(h2("2.6 Chat e Conversas"))
    story.append(p(
        "A tela de conversas (<b>Conversas/Conversas.html</b>) permite a troca de mensagens "
        "entre usuários que realizaram match. "
    ))
    story.append(sp(4))
    chat_itens = [
        "Lista lateral de conversas priorizadas por: mensagens não lidas > aguardando resposta > percentual de compatibilidade",
        "Campo de texto para envio de mensagens com Enter ou botão",
        "Painel de sugestões do EROS: 3 opções de abertura baseadas nos interesses em comum",
        "Moderação básica: palavras ofensivas bloqueadas com aviso ao usuário",
        "Limite de 3 conversas ativas simultâneas (usuário escolhe encerrar uma para abrir nova)",
        "Ações por conversa: encerrar, bloquear perfil, denunciar",
        "Indicador de mensagens não lidas na navbar (badge com contagem)",
    ]
    for item in chat_itens:
        story.append(bala(item))
    story.append(sp(12))

    # 2.7
    story.append(h2("2.7 Sala de Jogos — Mini-Games de Quebra-Gelo"))
    story.append(p(
        "A Sala de Jogos (<b>SalaJogos/SalaJogos.html</b>) oferece mini-games para "
        "descontrair e descobrir afinidades antes de formalizar uma conversa. "
        "Cada jogo pode ser jogado individualmente ou compartilhado com um match."
    ))
    story.append(sp(6))
    jogos = [
        ["Mini-game", "Descrição"],
        ["Duas Verdades e Uma Mentira", "Cada jogador envia 3 afirmações sobre si (2 verdadeiras, 1 falsa). O oponente (bot ou match) adivinha a mentira. Banco com 6 rodadas de afirmações simuladas."],
        ["Nunca Nunca", "Lista de 5 experiências de vida. Marque as que já fez e compare com seu match para descobrir o que têm em comum."],
        ["A vs B", "7 rodadas de escolhas rápidas entre opostos (Praia/Montanha, Pizza/Hambúrguer, etc.). Revela o perfil de cada um de forma leve."],
        ["Emoji Quiz", "6 combinações de emojis que representam filmes/séries. Adivinhe a resposta e desafie o match."],
    ]
    story.append(tabela_func(jogos, col_w=[5*cm, 10.5*cm]))
    story.append(sp(12))

    # 2.8
    story.append(h2("2.8 Eventos"))
    story.append(p(
        "O módulo de eventos oferece experiências coletivas temáticas para "
        "facilitar conexões em contexto compartilhado."
    ))
    story.append(sp(4))
    eventos_itens = [
        "Eventos (listagem) — cards com eventos por tema: Cinema, Café, Livros, Jogos, Música",
        "Evento do Dia — destaque especial com botão de acesso direto; exibido também na landing e na Home",
        "Evento ao Vivo — sala interativa (Clube do Livro): perguntas guiadas geradas pelo sistema, respostas simuladas de outros participantes, chat em tempo real simulado",
        "EROS contextual na sala ao vivo — skin 'live'; sugere ganchos de conversa baseados no tema do evento",
        "Convite inteligente — cards de evento podem ser transformados em convite personalizado pelo EROS",
    ]
    for item in eventos_itens:
        story.append(bala(item))
    story.append(sp(12))

    # 2.9
    story.append(h2("2.9 Experiências e Favoritos"))
    story.append(p(
        "<b>Experiências</b> (<i>Experiencias/Experiencias.html</i>): sugestões de programas "
        "culturais e de lazer — cinema comentado, cafés, playlists, livros, rolês ao ar livre. "
        "Cada card pode ser convertido pelo EROS em um convite elegante para um match. "
        "Inclui seções de playlists e livros acessíveis pelo menu 'Mais'."
    ))
    story.append(sp(4))
    story.append(p(
        "<b>Favoritos</b> (<i>Favoritos/Favoritos.html</i>): lista de perfis salvos pelo "
        "usuário durante a descoberta, com acesso rápido para abrir conversa."
    ))
    story.append(sp(12))

    # 2.10
    story.append(h2("2.10 Segurança e Primeiro Encontro"))
    story.append(p(
        "O MatchConnect incorpora orientações explícitas de segurança para encontros "
        "presenciais, diferenciando-se dos apps tradicionais que ignoram esse aspecto."
    ))
    story.append(sp(4))
    seg_itens = [
        "Segurança (Seguranca/): checklist interativo de boas práticas antes de marcar um encontro",
        "Primeiro Encontro (PrimeiroEncontro/): guia passo a passo com dicas de local, duração, contato de confiança e sinais de alerta",
        "Denúncia rápida acessível dentro de qualquer conversa ativa",
        "Bloqueio de perfil com remoção imediata das conversas e do fluxo de descoberta",
        "Moderação de conteúdo: palavras ofensivas filtradas no chat com feedback imediato ao usuário",
    ]
    for item in seg_itens:
        story.append(bala(item))
    story.append(sp(12))

    # 2.11
    story.append(h2("2.11 Planos e Assinatura Premium"))
    story.append(p(
        "A tela de Planos (<b>Planos/Planos.html</b>) apresenta a grade de assinaturas "
        "com funcionalidades exclusivas para usuários VIP — como mais conversas ativas "
        "simultâneas, destaque nos matches e acesso antecipado a novos recursos. "
        "A tela de Assinatura (<b>Assinatura/</b>) detalha o fluxo de contratação. "
        "Ambas as telas estão implementadas como interface (sem gateway de pagamento real "
        "nesta versão)."
    ))
    story.append(sp(12))

    # 2.12
    story.append(h2("2.12 Configurações, Notificações e Demais Telas"))
    outras = [
        ["Tela", "Função"],
        ["Perfil / Editar Perfil", "Visualização e edição de foto, bio, interesses, objetivos e programa ideal"],
        ["Filtros", "Ajuste de critérios de busca: faixa etária, distância máxima, interesse-chave e objetivo de relacionamento"],
        ["Notificações", "Central de alertas de novos matches, mensagens não lidas e atualizações do sistema"],
        ["Configurações", "Preferências gerais do app (tema, privacidade, conta)"],
        ["Onboarding / Preferências", "Revisão e ajuste fino das preferências após o cadastro inicial"],
        ["Quiz de Personalidade", "Questionário adicional para refinar o perfil de afinidade"],
        ["Visualizações", "Histórico de quem visualizou o perfil do usuário"],
        ["Central Match", "Painel de gerenciamento de todos os matches ativos"],
        ["Sobre / Termos", "Informações institucionais e termos de uso da plataforma"],
    ]
    story.append(tabela_func(outras, col_w=[5*cm, 10.5*cm]))
    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # 3. ARQUITETURA E TECNOLOGIAS
    # ══════════════════════════════════════════════════════════════════════════
    story.append(h1("3. Arquitetura e Tecnologias"))
    story.append(hr())
    story.append(h2("3.1 Stack utilizada"))
    stack = [
        ["Camada", "Tecnologia / Ferramenta"],
        ["Linguagem principal", "HTML5, CSS3, JavaScript Vanilla (ES2020+)"],
        ["Framework CSS", "Bootstrap 5.3 (via CDN)"],
        ["Biblioteca de ícones", "Bootstrap Icons 1.11"],
        ["Backend (compatibilidade)", "Python 3 · FastAPI · Pydantic · Uvicorn"],
        ["Persistência de dados", "localStorage do navegador (sem banco de dados real nesta versão)"],
        ["Controle de versão", "Git · GitHub / GitLab (branch Etapa3)"],
        ["Ferramentas de desenvolvimento", "VS Code · Live Server · python-venv"],
    ]
    story.append(tabela_func(stack, col_w=[5*cm, 10.5*cm]))
    story.append(sp(12))

    story.append(h2("3.2 Estrutura de pastas"))
    pastas = [
        ("assets/css/", "Estilos globais: App.css (reset e utilitários), MatchC.css (landing), Dashboard.css, Internal.css, dark-mode.css, Planos.css"),
        ("assets/js/", "Scripts compartilhados: appData.js (módulo central), navigation.js (menu + EROS flutuante), theme.js (dark mode)"),
        ("pages/", "32 telas do app, cada uma em sua própria pasta com .html e .js"),
        ("backend/", "API FastAPI (main.py) com ambiente virtual Python"),
        ("docs/", "Documentação acadêmica do projeto em Markdown"),
        ("presentation/", "Material de apresentação (HTML + PDF)"),
        ("help/", "Materiais de apoio: APIs, persistência, citações"),
    ]
    for pasta, desc in pastas:
        story.append(KeepTogether([
            Paragraph(f"<b><font color='#6C47D5'>{pasta}</font></b>", CORPO),
            Paragraph(desc, BULLET),
            sp(2),
        ]))
    story.append(sp(10))

    story.append(h2("3.3 Padrões e organização do código"))
    padroes = [
        "Módulo IIFE: MatchConnectApp (appData.js) exportado para window — único ponto de verdade para dados, compatibilidade e mensagens",
        "Proteção de rotas via JavaScript: protegerPagina() redireciona para login se não houver sessão ativa",
        "Persistência em JSON: todas as listas (matches, mensagens, interesses, histórico) são armazenadas como JSON no localStorage",
        "Navegação centralizada: navigation.js injeta o menu completo em todas as telas internas, garantindo consistência",
        "Tema persistente: tema claro/escuro salvo em localStorage e aplicado antes do DOMContentLoaded (sem flash)",
        "Sem framework JS: toda a reatividade é feita com DOM API nativa (addEventListener, innerHTML, classList)",
        "Separação de responsabilidades: cada pasta de tela contém seu próprio .js com escopo local, consumindo o módulo global",
        "Backend desacoplado: o frontend consome a API de compatibilidade via fetch com fallback local automático",
    ]
    for item in padroes:
        story.append(bala(item))
    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # 4. FLUXOS DO USUÁRIO
    # ══════════════════════════════════════════════════════════════════════════
    story.append(h1("4. Fluxos do Usuário"))
    story.append(hr())

    fluxos = [
        ("Fluxo 1: Novo usuário — cadastro completo", [
            "Acessa index.html → clica em 'Criar conta'",
            "Preenche nome, e-mail, data de nascimento e senha → valida idade (≥18) e unicidade de e-mail",
            "Redireciona automaticamente para o wizard de interesses (4 etapas)",
            "Etapa 1: seleciona interesses; Etapa 2: define camadas; Etapa 3: personalidade e objetivos; Etapa 4: fotos e bio",
            "Ao finalizar → redireciona para Home com tour guiado de 5 etapas (EROS Guide)",
        ]),
        ("Fluxo 2: Login e acesso", [
            "Acessa index.html → clica em 'Entrar' ou 'Já tem conta'",
            "Informa e-mail e senha → sistema valida credenciais no localStorage",
            "Exibe campo de código 2FA simulado (gerado aleatoriamente, mostrado na tela em modo acadêmico)",
            "Após código correto → redireciona para Home",
            "Conta admin (admin@matchconnect.com / admin123) carrega dados pré-configurados para teste",
        ]),
        ("Fluxo 3: Descoberta e match", [
            "Na Home, seção 'Descobrir': card do perfil mais compatível é exibido",
            "Usuário vê percentual, interesses em comum, bio, frase e sugestão do EROS",
            "Pode expandir 'Por que combinam' para ver categorias detalhadas",
            "Desliza o card (ou clica Curtir) → animação de match + mensagem simulada do perfil chega",
            "Match aparece na lista de conversas da Home e na tela Matches",
            "Usuário pode usar sugestão do EROS ou abrir o chat diretamente",
        ]),
        ("Fluxo 4: Conversa com match", [
            "Abre tela Conversas → lista priorizada por não lidas e por compatibilidade",
            "Seleciona um match → histórico de mensagens exibido",
            "EROS oferece 3 sugestões de abertura baseadas nos interesses em comum",
            "Usuário escreve ou usa a sugestão → envia com Enter ou botão",
            "Em caso de palavra ofensiva → mensagem bloqueada com aviso",
            "Pode encerrar, bloquear ou denunciar a conversa a qualquer momento",
        ]),
        ("Fluxo 5: Participar de evento ao vivo", [
            "Na Home (aba Eventos) ou no menu → acessa Eventos ou Evento do Dia",
            "Seleciona um evento temático (ex: Clube do Livro)",
            "Sala ao vivo exibe perguntas guiadas; respostas simuladas de outros participantes aparecem",
            "EROS (skin 'live') sugere ganchos para o usuário entrar na conversa",
            "Ao final, pode convidar um match para participar do próximo evento",
        ]),
        ("Fluxo 6: Usar o EROS para criar uma mensagem", [
            "Acessa EROS/EROS.html pelo menu 'Mais'",
            "Seleciona o match desejado no dropdown e escolhe o tom (leve, direto ou divertido)",
            "Sistema gera: mensagem de abertura, pergunta de quebra-gelo e ideia de primeiro encontro",
            "Clica 'Gerar nova' para variar o assunto sugerido (rodada rotativa por interesses em comum)",
            "Copia a sugestão e envia diretamente na tela de Conversas",
        ]),
    ]

    for titulo_fluxo, passos in fluxos:
        story.append(KeepTogether([
            h3(titulo_fluxo),
            *[bala(f"{i+1}. {p_}" ) for i, p_ in enumerate(passos)],
            sp(8),
        ]))

    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # 5. PONTOS DE DESTAQUE
    # ══════════════════════════════════════════════════════════════════════════
    story.append(h1("5. Pontos de Destaque"))
    story.append(hr())

    destaques = [
        ("Dark Mode completo", [
            "Implementado via atributo data-theme no elemento <html>",
            "Aplicado antes do DOMContentLoaded (script inline) para eliminar flash de tema errado",
            "Toggle acessível na navbar de todas as telas internas e flutuante nas demais",
            "Preferência persistida no localStorage — mantida entre sessões e abas",
        ]),
        ("Drag-to-swipe com Pointer API", [
            "Gesto nativo implementado sem biblioteca externa usando pointerdown/pointermove/pointerup",
            "Feedback visual em tempo real: translação X + rotação proporcional ao deslocamento",
            "Limiar de 80px para confirmar ação (curtir ou recusar), cancelável",
            "Funciona tanto em telas touch quanto com mouse",
        ]),
        ("EROS contextual com múltiplas skins", [
            "9 temas visuais (cinema, esportista, música, games, livros, gastronomia, live, evento, padrão)",
            "Muda automaticamente conforme a página atual e reage ao clique em qualquer card da tela",
            "Análise semântica do texto do card via temaPorTexto() para escolher o tema correto",
            "Gamificação com 5 níveis de XP, humor variável e missões com recompensas progressivas",
        ]),
        ("Algoritmo de compatibilidade em camadas", [
            "Score multicamada: interesses gerais + interesses favoritos (gostoMuito) + interesses a evitar (naoCurto)",
            "Categorias separadas: Conversa, Estilo de encontro, Interesses culturais e Rotina",
            "API Python (FastAPI) com cálculo complementar por objetivo e diferença de idade",
            "Fallback automático para cálculo local se o backend estiver indisponível",
        ]),
        ("Segurança e moderação integradas", [
            "Filtro de palavras ofensivas no chat com bloqueio imediato da mensagem",
            "Checklist de segurança antes do primeiro encontro presencial",
            "Denúncia rápida integrada na tela de conversas",
            "Funcionalidade de bloqueio que remove o perfil de todas as filas (descoberta, conversas, matches)",
        ]),
        ("Arquitetura modular sem framework", [
            "Módulo MatchConnectApp (IIFE) como único ponto de verdade — sem Redux, sem React",
            "Navegação e EROS flutuante injetados por navigation.js em todas as páginas internas",
            "Cada tela é independente mas consome o módulo global, garantindo consistência de dados",
            "Backend totalmente desacoplado — frontend funciona 100% offline via localStorage",
        ]),
    ]

    for titulo_dest, itens_dest in destaques:
        story.append(caixa_destaque(titulo_dest, itens_dest))
        story.append(sp(10))

    story.append(PageBreak())

    # ══════════════════════════════════════════════════════════════════════════
    # 6. SUGESTÕES DE MELHORIA
    # ══════════════════════════════════════════════════════════════════════════
    story.append(h1("6. Sugestões de Melhoria"))
    story.append(hr())
    story.append(p(
        "O MatchConnect demonstra uma base sólida e coesa para um app de relacionamento "
        "por afinidade. As oportunidades de evolução listadas abaixo visam consolidar o "
        "projeto para um ambiente de produção real:"
    ))
    story.append(sp(8))

    melhorias = [
        ("Segurança de dados e autenticação real",
         "As senhas atualmente são armazenadas em texto puro no localStorage. Em produção, "
         "é essencial substituir por autenticação via backend com hash seguro (bcrypt/argon2), "
         "tokens JWT e armazenamento em banco de dados (PostgreSQL ou similar). O 2FA deve "
         "ser integrado a um provedor real de SMS/e-mail."),
        ("Banco de dados e API completa",
         "O backend FastAPI já existe mas cobre apenas o cálculo de compatibilidade. "
         "A evolução natural é expandir para um CRUD completo de usuários, matches e "
         "mensagens, eliminando a dependência do localStorage e permitindo sincronização "
         "entre dispositivos."),
        ("Chat em tempo real",
         "O sistema de mensagens atual é simulado (sem WebSocket). A integração com "
         "WebSocket (FastAPI já suporta) ou Socket.IO tornaria o chat verdadeiramente "
         "bidirecional, com indicadores de 'digitando...' e confirmação de leitura."),
        ("Acessibilidade (WCAG 2.1)",
         "Ampliar o uso de aria-live para anúncios de novas mensagens e matches, "
         "gerenciar foco em modais e toasts, garantir contraste mínimo 4.5:1 em todos "
         "os estados e adicionar navegação completa por teclado nas interações de swipe."),
        ("Progressive Web App (PWA)",
         "Adicionar Service Worker e manifest.json para habilitar instalação na tela "
         "inicial, funcionamento offline básico e notificações push — "
         "comportamento essencial para um app de relacionamento."),
        ("Testes automatizados",
         "Implementar testes unitários para o algoritmo de compatibilidade (Jest no "
         "frontend, pytest no backend) e testes de integração end-to-end com Playwright "
         "ou Cypress, cobrindo os fluxos críticos de cadastro, login e match."),
        ("IA generativa no EROS",
         "O EROS atual usa mensagens pré-definidas rotativas. A integração com um modelo "
         "de linguagem (API Claude ou similar) tornaria as sugestões genuinamente "
         "personalizadas e contextualmente ricas, aumentando a proposta de valor central."),
        ("Internacionalização (i18n)",
         "Estruturar os textos em arquivos de tradução para suportar múltiplos idiomas, "
         "expandindo o alcance do produto além do mercado brasileiro."),
    ]

    for titulo_m, desc_m in melhorias:
        story.append(KeepTogether([
            Paragraph(f"<b><font color='#6C47D5'>▸  {titulo_m}</font></b>", H3),
            Paragraph(desc_m, CORPO),
            sp(8),
        ]))

    # ── Rodapé do documento ──────────────────────────────────────────────────
    story.append(sp(20))
    story.append(hr())
    story.append(Paragraph(
        "Documento gerado automaticamente a partir da análise do código-fonte do "
        f"repositório MatchConnect · {data_hoje}",
        NOTA_RODAPE
    ))

    return story


# ─── Montagem do PDF ─────────────────────────────────────────────────────────
def gerar():
    caminho = "/Users/rodrigoribeiro/Downloads/MatchConnect/funcionalidades-do-site.pdf"
    doc = SimpleDocTemplate(
        caminho,
        pagesize=A4,
        leftMargin=MARGEM,
        rightMargin=MARGEM,
        topMargin=1.8 * cm,
        bottomMargin=1.5 * cm,
        title="MatchConnect — Documentação de Funcionalidades",
        author="MatchConnect · PUC-Minas",
        subject="Funcionalidades do site MatchConnect",
        creator="reportlab / Python",
    )

    doc.build(
        conteudo(),
        onFirstPage=cabecalho_rodape,
        onLaterPages=cabecalho_rodape,
    )
    print(f"PDF gerado: {caminho}")


if __name__ == "__main__":
    gerar()
