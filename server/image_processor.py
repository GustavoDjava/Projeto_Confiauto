import os
import shutil

def process_images(upload_folder):
    # Aqui você pode adicionar sua lógica de análise de imagem
    for filename in os.listdir(upload_folder):
        filepath = os.path.join(upload_folder, filename)
        print(f"Processando: {filepath}")
        # analyze_image(filepath)  # Sua função de análise aqui

    # Apaga a pasta após o processamento
    shutil.rmtree(upload_folder, ignore_errors=True)
