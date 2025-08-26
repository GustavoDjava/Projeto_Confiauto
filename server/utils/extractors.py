import re
import spacy

nlp = spacy.load("pt_core_news_sm")

def extrair_info_texto(texto):
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
