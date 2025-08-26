import fitz
from utils.extractors import extrair_info_texto

def process_pdf(caminho, filename):
    try:
        doc = fitz.open(caminho)
        texto = ""
        for pagina in doc:
            texto += pagina.get_text()
        doc.close()
        info = extrair_info_texto(texto)
        return {
            "arquivo": filename,
            "tipo": "PDF",
            "conteudo": texto.strip(),
            "informacoes": info
        }
    except Exception as e:
        return {"arquivo": filename, "erro": str(e)}