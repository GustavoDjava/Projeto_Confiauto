from flask import Flask, render_template

#Iniciar o aplicativo Flask 

app = Flask(__name__)


def home ():
    return "<hi>Home Page</h1>"

if __name__ =="__main__":
    app.run(debug=True)

