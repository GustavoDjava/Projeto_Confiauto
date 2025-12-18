from PIL import Image
import pytesseract
from utils.extractors import comparar_pdf_com_extrato

def process_image(caminho, filename):
    try:
        imagem = Image.open(caminho)
        texto = pytesseract.image_to_string(imagem)
        info = comparar_pdf_com_extrato(texto)
        return {
            "arquivo": filename,
            "tipo":"Imagem",
            "conteudo":texto.strip(),
            "informacoes": info
        }
    except Exception as e:
        return {"arquivo": filename, "erro": str(e)}