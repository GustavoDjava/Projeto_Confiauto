from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from services.pdf_service import process_pdf
from services.image_service import process_image
from services.excel_service import process_excel

analisar_bp = Blueprint('analisar', __name__)

@analisar_bp.route('/analisar', methods=['POST'])
def analisar():
    resultados = {}

    for campo in ['extrato', 'comprovante', 'consultor']:
        i = 0
        resultados[campo] = []

        while f"{campo}[{i}]" in request.files:
            file = request.files[f"{campo}[{i}]"]
            filename = secure_filename(file.filename)
            caminho = f"{current_app.config['UPLOAD_FOLDER']}/{filename}"
            file.save(caminho)

            if filename.lower().endswith('.pdf'):
                resultado = process_pdf(caminho, filename)
            elif filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                resultado = process_image(caminho, filename)
            elif filename.lower().endswith(('.xls', '.xlsx')):
                resultado = process_excel(caminho, filename)
            else:
                resultado = {
                    "arquivo": filename,
                    "tipo": "Desconhecido",
                    "mensagem": "Formato não suportado"
                }

            resultados[campo].append(resultado)
            i += 1

    # Adicionando a linha para imprimir a mensagem no console
    print("Arquivos analisados com sucesso!")
    
    return jsonify({
        "mensagem": "Arquivos analisados com sucesso!",
        "resultados": resultados
    }), 200