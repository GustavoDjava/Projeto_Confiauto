import React, { useState } from 'react';
import styles from './Upload.module.css';
import NavBar from './NavBar';

function Upload_Extrato() {
  // 🗂️ Estado para armazenar arquivos por campo
  const [filesByField, setFilesByField] = useState({
    extrato: [],
    comprovante: [],
    consultor: [],
  });

  // 📥 Função para lidar com seleção de arquivos
  const handleFileChange = (event, fieldName) => {
    const selectedFiles = Array.from(event.target.files);
    setFilesByField(prev => ({
      ...prev,
      [fieldName]: selectedFiles,
    }));
    console.log(`Arquivos anexados em ${fieldName}:`, selectedFiles.map(f => f.name));
  };

  // 🚀 Função para enviar os arquivos
  const uploadImg = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(filesByField).forEach(([field, files]) => {
      files.forEach((file, index) => {
        formData.append(`${field}[${index}]`, file);
      });
    });

    try {
      const response = await fetch("colocar rota", {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log("Upload bem-sucedido");
      } else {
        console.error("Erro no upload");
      }
    } catch (error) {
      console.error("Erro ao enviar arquivo:", error);
    }
  };

  // 🧱 Função para renderizar campos de upload com cor verde e ícone de check
  const renderUploadField = (label, fieldName) => {
    const hasFiles = filesByField[fieldName].length > 0;

    return (
      <div className={styles.uploadContainer}>
        <label htmlFor={fieldName} className={styles.label}>{label}</label>

        <label
          htmlFor={fieldName}
          className={`${styles.customUpload} ${hasFiles ? styles.uploaded : ''}`}
        >
          <img src="/upload_arquivo.png" alt="ícone de upload" />
          <span className={styles.fileNames}>
            {hasFiles ? (
              <>
                {/* Ícone de check verde */}
                <svg className={styles.checkIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#28a745">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.586l7.879-7.879a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {filesByField[fieldName].map(f => f.name).join(', ')}
              </>
            ) : "Escolher arquivo..."}
          </span>
        </label>

        <input
          type="file"
          id={fieldName}
          name={fieldName}
          multiple
          onChange={(e) => handleFileChange(e, fieldName)}
          className={styles.hiddenInput}
        />
      </div>
    );
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className={styles.uploadWrapper}>
          <form onSubmit={uploadImg}>
            {renderUploadField("Extrato", "extrato")}
            {renderUploadField("Comprovante Pagamento", "comprovante")}
            {renderUploadField("Associados Consultor", "consultor")}

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.button}>Salvar</button>
              <button
                type="button"
                className={`${styles.button} ${styles.cancelButton}`}
                onClick={() => setFilesByField({
                  extrato: [],
                  comprovante: [],
                  consultor: [],
                })}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Upload_Extrato;
