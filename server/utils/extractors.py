# ler extrato
import re
import spacy
import pandas as pd

nlp = spacy.load("pt_core_news_sm")

def extrair_info_texto(caminho_arquivo: str, filename: str = None):
    """
    Lê o conteúdo de um arquivo Excel ou CSV e extrai informações
    como CPF, CNPJ, datas, valores e entidades nomeadas.
    """

    # Detecta se é Excel ou CSV
    if caminho_arquivo.endswith(".xlsx") or caminho_arquivo.endswith(".xls"):
        df = pd.read_excel(caminho_arquivo)
    elif caminho_arquivo.endswith(".csv"):
        df = pd.read_csv(caminho_arquivo)
    else:
        raise ValueError("Formato de arquivo não suportado. Use .xlsx ou .csv")

    # Normaliza colunas para minúsculas
    df.columns = [str(c).strip().lower() for c in df.columns]

    # Concatena todo conteúdo em texto para regex/NLP
    texto = " ".join(df.astype(str).apply(lambda x: " ".join(x), axis=1))

    # Expressões regulares
    regex_info = {
        "cpf": re.findall(r'\d{3}\.\d{3}\.\d{3}-\d{2}', texto),
        "cnpj": re.findall(r'\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}', texto),
        "datas": re.findall(r'\d{2}/\d{2}/\d{4}', texto),
        "valores": re.findall(r'R?\$?\s?\d{1,3}(?:\.\d{3})*,\d{2}', texto)
    }

    # NLP com spaCy
    doc = nlp(texto)
    entidades = {
        "nomes": [ent.text for ent in doc.ents if ent.label_ == "PER"],
        "empresas": [ent.text for ent in doc.ents if ent.label_ == "ORG"],
        "locais": [ent.text for ent in doc.ents if ent.label_ == "LOC"],
    }

    resultado = {**regex_info, **entidades}

    if filename:
        resultado["arquivo"] = filename

    return resultado
