from PIL import Image
import pytesseract
from utils.extractors import extrair_info_texto

def process_image(caminho, filename):
    try:
        imagem = Image.open(caminho)
        texto = pytesseract.image_to_string(imagem)
        info = extrair_info_texto(texto)
        return {
            "arquivo": filename,
            "tipo":"Imagem",
            "conteudo":texto.strip(),
            "informacoes": info
        }
    except Exception as e:
        return {"arquivo": filename, "erro": str(e)}