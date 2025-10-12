🚗 Projeto Confiauto

Sistema de controle e verificação de pagamentos automotivos, desenvolvido com Flask (backend) e React (frontend).

📖 Sobre o Projeto

O Confiauto é um sistema web voltado para o gerenciamento financeiro de associações automotivas.
Ele permite que o administrador/gerente visualize os pagamentos realizados pelos associados, verifique se os valores realmente caíram no extrato da empresa e identifique quais associados estão pendentes em relação aos consultores responsáveis.

O projeto foi desenvolvido com fins acadêmicos e para demonstração prática de integração entre backend Flask e frontend React.

🧠 Objetivo Principal

Centralizar a análise de pagamentos de associados e facilitar a verificação de repasses entre empresa, consultores e clientes.

⚙️ Tecnologias Utilizadas

Frontend (Interface do Usuário)

⚛️ React

HTML5

CSS3

JavaScript (ES6+)

Backend (Servidor / API)

🐍 Python 3

Flask

Flask-CORS (para comunicação com o frontend)

Outros

Git & GitHub

JSON (para troca de dados entre as camadas)

🚀 Funcionalidades Principais

✅ Verificar se o pagamento realizado por um associado caiu no extrato da empresa

✅ Exibir associados pendentes de pagamento

✅ Visualizar a relação de associados por consultor

✅ Acesso administrativo (perfil de gerente)

🧩 Estrutura de Pastas
Projeto_Confiauto/
│
├── client/                  # Frontend React
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── App.js
│
├── server/                  # Backend Flask
│   ├── app.py
│   ├── routes/
│   └── controllers/
│
├── README.md
└── requirements.txt          # Dependências do backend

🧰 Como Executar o Projeto
🔹 1. Clonar o repositório
git clone https://github.com/GustavoDjava/Projeto_Confiauto.git
cd Projeto_Confiauto

🔹 2. Executar o Backend (Flask)

Acesse a pasta do servidor:

cd server


Crie um ambiente virtual:

python -m venv venv
source venv/bin/activate  # Linux / Mac
venv\Scripts\activate     # Windows


Instale as dependências:

pip install -r requirements.txt


Inicie o servidor:

python app.py


O backend rodará por padrão em:
📡 http://localhost:5000

🔹 3. Executar o Frontend (React)

Vá para a pasta client:

cd client


Instale as dependências:

npm install


Inicie o servidor React:

npm start


Acesse o app em:
🌐 http://localhost:3000

🧮 Fluxo do Sistema

O administrador acessa o sistema via painel React.

O frontend consome dados do backend Flask por meio de endpoints REST.

O Flask processa as requisições e retorna as informações de pagamentos, status de associados e pendências financeiras.

💡 Melhorias Futuras

 Implementar banco de dados (ex: MySQL ou PostgreSQL)

 Adicionar login com autenticação JWT

 Criar relatórios e dashboards financeiros

 Permitir múltiplos perfis (consultor, gerente, administrador)

 Hospedar aplicação completa (frontend e backend integrados)

📸 Demonstração

(Adicione aqui prints de tela ou um link de vídeo mostrando o sistema funcionando)

Exemplo:

![Tela inicial do painel administrativo](docs/tela_inicial.png)

👨‍💻 Autor

Gustavo Dias
📧 gustavodjava@gmail.com

💼 LinkedIn

🐙 GitHub

🏷️ Licença

Este projeto é de uso educacional e livre para fins de aprendizado.

⭐ Dica Extra

Você pode adicionar badges no topo do README para deixá-lo mais atrativo:

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Python](https://img.shields.io/badge/python-3.10-blue)
![React](https://img.shields.io/badge/react-18.2.0-61DAFB)
