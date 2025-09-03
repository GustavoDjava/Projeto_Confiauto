import pandas as pd
import re
import spacy
from collections import defaultdict

# Carrega o modelo de linguagem do spaCy para português
nlp = spacy.load("pt_core_news_sm")

# ✅ Função para processar um arquivo Excel e retornar os dados como dicionário
def process_excel(caminho, filename):
    print("📂 abriu arquivo:", filename)
    try:
        df = pd.read_excel(caminho)
        df = df.where(pd.notnull(df), None)  # Substitui NaN por None
        print("📊 Colunas do Excel:", df.columns.tolist())

        # Tenta agrupar por consultor, se possível
        try:
            agrupado = processar_por_consultor(df)
        except Exception as e:
            print(" Erro ao agrupar por consultor:", e)
            agrupado = {"erro": f"Falha ao agrupar por consultor: {str(e)}"}

        return {
            "arquivo": filename,
            "tipo": "Excel",
            "linhas": df.to_dict(orient="records"), #retornar as linhas que o front vai receber
            "agrupado_por_consultor": agrupado
        }
    except Exception as e:
        print(" Erro ao analisar arquivo Excel:", filename)
        return {"arquivo": filename, "erro": str(e)}

# ✅ Função para extrair informações de texto usando regex e NLP
def extrair_info_texto(texto):
    print("🔍 extraindo informações do texto")
    regex_info = {
        "cpf": re.findall(r'\d{3}\.\d{3}\.\d{3}-\d{2}', texto),
        "cnpj": re.findall(r'\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}', texto),
        "datas": re.findall(r'\d{2}/\d{2}/\d{4}', texto),
        "valores": re.findall(r'R?\$?\s?\d{1,3}(?:\.\d{3})*,\d{2}', texto)
    }

    doc = nlp(texto)
    entidades = {
        "nomes": [],
        "empresas": [],
        "locais": [],
    }

    for ent in doc.ents:
        if ent.label_ == "PER":
            entidades["nomes"].append(ent.text)
        elif ent.label_ == "ORG":
            entidades["empresas"].append(ent.text)
        elif ent.label_ == "LOC":
            entidades["locais"].append(ent.text)

    return {**regex_info, **entidades}

# ✅ Função para agrupar informações extraídas por consultor
def processar_por_consultor(df, coluna_consultor="Consultor", coluna_associado="Nome do associado"):
    print("Analisando consultores")
    if coluna_consultor not in df.columns or coluna_associado not in df.columns:
        raise ValueError("Colunas especificadas não existem no arquivo.")

    agrupado = defaultdict(list)

    for _, linha in df.iterrows():
        consultor = linha.get(coluna_consultor) or "Desconhecido"
        texto = linha.get(coluna_associado) or ""
        try:
            info_extraida = extrair_info_texto(str(texto))
        except Exception as e:
            info_extraida = {"erro": f"Falha ao extrair texto: {str(e)}"}
        agrupado[consultor].append(info_extraida)

    return agrupado
