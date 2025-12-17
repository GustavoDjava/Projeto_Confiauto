import fitz  # PyMuPDF
import re

# Função principal para processar o PDF
def process_pdf(caminho, filename):
    try:
        # Abrir PDF
        doc = fitz.open(caminho)
        texto = ""
        for pagina in doc:
            texto += pagina.get_text()
        doc.close()

        # Extrair informações relevantes
        info = extrair_info_texto(texto)

        return {
            "arquivo": filename,
            "tipo": "PDF",
            "conteudo": texto.strip(),
            "informacoes": info
        }
    except Exception as e:
        return {"arquivo": filename, "erro": str(e)}

# Função para extrair informações do texto
def extrair_info_texto(texto, banco =None):
    # Regex genéricos
    cpf_pattern = r"\d{3}\.\d{3}\.\d{3}-\d{2}"
    data_pattern = r"\d{2}[/-]\d{2}[/-]\d{4}"
    valor_pattern = r"R?\$?\s?\d{1,3}(?:\.\d{3})*,\d{2}"

    cpf = re.search(cpf_pattern, texto)
    data = re.search(data_pattern, texto)
    valor = re.search(valor_pattern, texto)

    # Nome: tenta localizar após palavras-chave
    nome = None
    keywords = ["Nome", "Pagante", "Cliente", "Beneficiário", "Pagador"]
    for k in keywords:
        padrao = rf"{k}[:\s]+([A-Za-zÀ-ÿ\s]+)"
        match = re.search(padrao, texto)
        if match:
            nome = match.group(1).strip()
            break

    return {
        "nome": nome,
        "cpf": cpf.group(0) if cpf else None,
        "data_pagamento": data.group(0) if data else None,
        "valor_pago": valor.group(0) if valor else None
    }
