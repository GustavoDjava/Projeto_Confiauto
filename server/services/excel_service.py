import pandas as pd
import re
import spacy

# Carrega o modelo de linguagem do spaCy para português
nlp = spacy.load("pt_core_news_sm")

# Estrutura global para armazenar todos os extratos processados
extratos_processados = []

# Função para extrair informações principais do texto
def extrair_campos(texto):
    """
    Extrai nome do pagante, data, valor, CPF e CNPJ (mesmo cortados).
    """
    regex_info = {
        "cpf": re.findall(r'\d{3}\.\d{3}\.\d{3}-\d{2}|\d{3}\.\d{3}\.\d{3}-\*{2}', texto),
        "cnpj": re.findall(r'\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}|\d{2}\.\d{3}\.\d{3}/\*{4}-\*{2}', texto),
        "datas": re.findall(r'\d{2}/\d{2}/\d{4}', texto),
        "valores": re.findall(r'R?\$?\s?\d{1,3}(?:\.\d{3})*,\d{2}', texto)
    }

    # NLP para tentar identificar nomes de pessoas/empresas
    doc = nlp(texto)
    nomes = [ent.text for ent in doc.ents if ent.label_ == "PER"]
    empresas = [ent.text for ent in doc.ents if ent.label_ == "ORG"]

    pagante = nomes[0] if nomes else (empresas[0] if empresas else None)

    return {
        "pagante": pagante,
        "data": regex_info["datas"][0] if regex_info["datas"] else None,
        "valor": regex_info["valores"][0] if regex_info["valores"] else None,
        "cpf": regex_info["cpf"][0] if regex_info["cpf"] else None,
        "cnpj": regex_info["cnpj"][0] if regex_info["cnpj"] else None
    }

# Função para processar um arquivo Excel e armazenar os dados extraídos
def process_excel(caminho, filename):
    print("📂 abriu arquivo:", filename)
    try:
        df = pd.read_excel(caminho)
        df = df.where(pd.notnull(df), None)  # Substitui NaN por None
        df.columns = df.columns.str.strip().str.lower()  # Normaliza colunas

        resultados = []
        for _, linha in df.iterrows():
            # Concatena todos os valores da linha em um texto único
            texto = " ".join([str(v) for v in linha.values if v])
            dados_extraidos = extrair_campos(texto)
            resultados.append(dados_extraidos)

        # Armazena globalmente para uso futuro
        extratos_processados.append({
            "arquivo": filename,
            "dados_extraidos": resultados
        })

        return resultados
    except Exception as e:
        print("❌ Erro ao analisar arquivo Excel:", filename)
        return {"arquivo": filename, "erro": str(e)}
