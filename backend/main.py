from datetime import date, datetime
from typing import List, Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


app = FastAPI(title="MatchConnect API")

# Permite que o front-end local consuma a API durante o desenvolvimento.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "null",
    ],
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1):\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Usuario(BaseModel):
    nome: Optional[str] = None
    idade: Optional[int] = None
    data_nascimento: Optional[str] = None
    interesses: List[str] = Field(default_factory=list)
    objetivo: Optional[str] = None
    descricao: Optional[str] = None


class PedidoCompatibilidade(BaseModel):
    usuario1: Usuario
    usuario2: Usuario


def texto_normalizado(texto: Optional[str]) -> str:
    return (texto or "").strip().lower()


def calcular_idade(usuario: Usuario) -> Optional[int]:
    if usuario.idade:
        return usuario.idade

    if not usuario.data_nascimento:
        return None

    try:
        nascimento = datetime.fromisoformat(usuario.data_nascimento).date()
    except ValueError:
        return None

    hoje = date.today()
    idade = hoje.year - nascimento.year

    if (hoje.month, hoje.day) < (nascimento.month, nascimento.day):
        idade -= 1

    return idade


def interesses_em_comum(usuario1: Usuario, usuario2: Usuario) -> List[str]:
    interesses_usuario1 = {
        texto_normalizado(interesse): interesse.strip()
        for interesse in usuario1.interesses
        if interesse.strip()
    }
    interesses_usuario2 = {
        texto_normalizado(interesse)
        for interesse in usuario2.interesses
        if interesse.strip()
    }

    return [
        interesse_original
        for interesse_normalizado, interesse_original in interesses_usuario1.items()
        if interesse_normalizado in interesses_usuario2
    ]


def calcular_score(usuario1: Usuario, usuario2: Usuario) -> dict:
    comuns = interesses_em_comum(usuario1, usuario2)
    objetivo_igual = (
        texto_normalizado(usuario1.objetivo)
        and texto_normalizado(usuario1.objetivo) == texto_normalizado(usuario2.objetivo)
    )

    idade1 = calcular_idade(usuario1)
    idade2 = calcular_idade(usuario2)
    diferenca_idade = abs(idade1 - idade2) if idade1 is not None and idade2 is not None else None

    pontos_interesses = min(len(comuns) * 18, 54)
    pontos_objetivo = 26 if objetivo_igual else 0

    if diferenca_idade is None:
        pontos_idade = 10
    elif diferenca_idade <= 3:
        pontos_idade = 20
    elif diferenca_idade <= 7:
        pontos_idade = 14
    elif diferenca_idade <= 12:
        pontos_idade = 8
    else:
        pontos_idade = 2

    porcentagem = min(100, pontos_interesses + pontos_objetivo + pontos_idade)

    explicacoes = []
    if comuns:
        explicacoes.append(f"Vocês têm {len(comuns)} interesse(s) em comum: {', '.join(comuns)}.")
    else:
        explicacoes.append("Não encontramos interesses em comum no momento.")

    if objetivo_igual:
        explicacoes.append("Os dois informaram o mesmo objetivo.")
    else:
        explicacoes.append("Os objetivos informados são diferentes ou estão incompletos.")

    if diferenca_idade is None:
        explicacoes.append("A idade não foi informada para os dois usuários.")
    else:
        explicacoes.append(f"A diferença de idade é de {diferenca_idade} ano(s).")

    return {
        "porcentagem": porcentagem,
        "interesses_em_comum": comuns,
        "explicacao": " ".join(explicacoes),
    }


@app.get("/")
def status_api():
    return {"status": "online", "mensagem": "API MatchConnect funcionando"}


@app.post("/compatibilidade")
def compatibilidade(pedido: PedidoCompatibilidade):
    return calcular_score(pedido.usuario1, pedido.usuario2)
