from flask import Flask, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)  # Permite requisições de qualquer origem (ideal para desenvolvimento)

# Pasta onde os arquivos serão salvos
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

#  Rota para receber os arquivos
@app.route('/analisar', methods=['POST'])
def analisar():
    arquivos_recebidos = []

    for field in ['extrato', 'comprovante', 'consultor']:
        i = 0
        while f"{field}[{i}]" in request.files:
            file = request.files[f"{field}[{i}]"]
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            arquivos_recebidos.append(filename)
            i += 1

    print("Arquivos recebidos:", arquivos_recebidos)
    return {"mensagem": "Arquivos enviados com sucesso!", "arquivos": arquivos_recebidos}, 200

#  Inicializa o servidor Flask na porta 5000
if __name__ == '__main__':
    app.run(port=5000, debug=True)