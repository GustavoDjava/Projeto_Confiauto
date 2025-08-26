import pandas as pd

def process_excel(caminho, filename):
    try:
        df = pd.read_excel(caminho)
        return {
            "arquivo": filename,
            "tipo": "Excel",
            "linhas": df.to_dict(orient="records")
        }
    except Exception as e:
        return {"arquivo": filename, "erro": str(e)}