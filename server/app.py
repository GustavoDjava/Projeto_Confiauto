from flask import Flask
from flask_cors import CORS #bibioteca para comunicação entre aplicações
from routes.analisar import analisar_bp
import os # OS é para o py interir com o sistema operacional

#habilitar os programas
app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.register_blueprint(analisar_bp, url_prefix='/api')


#  iniciar o servidor Flask na porta 5000
if __name__ == '__main__':
    app.run(port=5000, debug=True)