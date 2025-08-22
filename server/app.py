from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from PIL import Image
import fitz #PyMuPDF
import os

app = Flask(__name__)
CORS(app)

#pasta onde está armazenado as imagens
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok =True)

#função para extrair texto de PDFs
def extrair_texto_pdf(caminho_pdf):
    #try para lidar com erro
    try:
        doc =fitz.open(caminho_pdf)
        texto = ""
        for pagina in doc:
            texto += pagina.get_text()
            doc.close
            return texto.stip() or "Nenhum texto encontrado"
    except Exception as e: 
        return f"Erro ao ler PDF: {str(e)}"
    
#função para extrat metadados de imagens
def extrair_info_imagem(caminho_imagem):
    try:
        imagem = Imagem.open(caminho_imagem)
        return {
            "formato": imagem.format,
            "tamanho": imagem.size,
            "modo": imagem.mode
        }
    except Exception as e:
        return {"erro": f"Erro ao ler imagem: {str(e)}"}
    
#rota principal para upload e análise
@app.route('/analisar', methods=['POST'])
def analisar():
    resultados ={}
    
    for campo in ['extrato', 'comprovante', 'consultor']:
        i = 0
        resultados[campo] = []
        
        while f"{campo}[{i}]" in request.files:
            file = request.files[f"{campo}[{i}]"]
            filename = secure_filename(file.filename)
            caminho = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(caminho)
            
            #análise por tipo de arquivo
            if filename.lower().endswith('.pdf'):
                texto = extrair_texto_pdf(caminho)
                resultados[campo].append({
                    "arquivo": filename,
                    "tipo":"PDF",
                    "conteudo":texto
                })
            elif filename.lower().endswith(('.png','jpg','jpe')):
                info = extrair_info_imagem(caminho)
                resultados[campo].append({
                   "arquivo": filename,
                   "tipo": "Imagem",
                   "metadados" : info
                })
            else:
                resultados[campo].append({
                    "arquivo": filename,
                    "tipo": "Desconhecido",
                    "messagem":"Formato não suportado"
                })
                
            i += 1 
        return jsonify ({
            "mensagem": "Arquivos analisados com sucesso!",
            "resultados": resultados
        }),200
        
        
#inicialização do servidor
if __name__ == '__main__':
    app.run(port=5000, debug=True)