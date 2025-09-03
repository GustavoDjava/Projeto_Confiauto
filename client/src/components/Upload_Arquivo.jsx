import React, { useState } from 'react';
import styles from './Upload.module.css'
import NavBar from './NavBar';
import { validarArquivos } from './fileValidation';
import ResultadoTabela from './ResultadoTabela.css';

function Upload_Arqivo() {
  // 🗂️Estado para armazenar arquivos por campo
  const [filesByField, setFilesByField] = useState({
    extrato: [],
    comprovante: [],
    consultor: [],
  });

  //📁 const para armazenar Json do backend
  const [resultados, setResultados] = useState(null);
  // const para alerta
  const [uploadMessage, setUplaodMessage] = useState('');


  const handleFileChange = (event, fileName) => {
    const selectedFiles = Array.from(event.target.files);
    const { arquivosValidos, mensagensErro } = validarArquivos(selectedFiles);

    if (mensagensErro.length > 0) {
      setUplaodMessage(mensagensErro.join("\n"));
      alert(mensagensErro.join("\n"))

    } else {
      setUplaodMessage(""); //limpa a mensagem se não houver erro
    }

    setFilesByField(prev => ({
      ...prev,
      [fileName]: arquivosValidos,
    }));

    console.log(`Arquivos válidos em ${fileName}:`, arquivosValidos.map(f => f.name));
  }


  //  Função para enviar os arquivos
  const uploadImg = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(filesByField).forEach(([field, files]) => {
      files.forEach((file, index) => {
        formData.append(`${field}[${index}]`, file);
      });
    });

    try {
      const response = await fetch("http://localhost:5000/api/analisar", {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResultados(data.resultados); // 👈 Atualiza os dados extraídos
        setUplaodMessage('Arquivos enviados com sucesso');
        console.log("Resposta do backend:", data);
      } else {
        setUplaodMessage('Erro ao enviar os arquivos.');
        console.error("Erro no upload");
      }
    } catch (error) {
      setUplaodMessage('Falha na conexão com o servidor');
      console.error("Erro ao enviar arquivo:", error);
    }
  };


  //  Função para renderizar campos de upload com cor verde e ícone de check
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
          {...(fieldName === "comprovante" && { webkitdirectory: "true" })}
        />

      </div>
    );
  };

  return (
    <>
      <NavBar />
      <div className='container'>
        {/* 👇 Só exibe o formulário se ainda não houver resultados */}
        {!resultados && (
          <div className={styles.uploadWrapper}>
            <form onSubmit={uploadImg}>
              {renderUploadField("Extrato", "extrato")}
              {renderUploadField("Comprovante Pagamento", "comprovante")}
              {renderUploadField("Associados Consultor", "consultor")}

              <div className={styles.buttonGroup}>
                <button type='submit' className={styles.button}>Salvar</button>
                <button
                  type='button'
                  className={`${styles.button} ${styles.cancelButton}`}
                  onClick={() => setFilesByField({
                    extrato: [],
                    comprovante: [],
                    consultor: [],
                  })}
                >
                  Cancelar
                </button>

                {uploadMessage && (
                  <div className={styles.uploadMessage}>{uploadMessage}
                  </div>
                )}
              </div>
            </form>
          </div>
        )}

        {/* 👇 Exibe os resultados quando disponíveis */}
        {resultados && (
          <>
            <ResultadoTabela resultados={resultados} />
            <button
              className={styles.button}
              onClick={() => {
                setResultados(null); // limpa os resultados
                setFilesByField({
                  extrato: [],
                  comprovante: [],
                  consultor: [],
                }); // limpa os arquivos
                setUplaodMessage(''); // limpa a mensagem
              }}
            >
              Novo envio
            </button>
          </>
        )}

      </div>
    </>
  );
}

export default Upload_Arqivo;
