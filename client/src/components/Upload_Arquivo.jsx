import React, { useState } from 'react';
import styles from './Upload.module.css';
import NavBar from './NavBar';
import { validarArquivos } from './fileValidation';
import ResultadoTabela from './ResultadosTabela';

function Upload_Arquivo() {
  // Armazena os arquivos selecionados para cada tipo
  const [filesByField, setFilesByField] = useState({
    extrato: [],
    comprovante: [],
    consultor: [],
  });

  const [resultados, setResultados] = useState(null); //Guarda os dados retornados pelo backend após o upload
  const [uploadMessage, setUplaodMessage] = useState(''); // Exibi a mensagem de erro ou sucesso
  const [abaAtiva, setAbaAtiva] = useState("extrato"); // Control qual aba de resultado está visível


  const handleFileChange = (event, fileName) => { 
    const selectedFiles = Array.from(event.target.files); // converter objeto interável em um array
    const { arquivosValidos, mensagensErro } = validarArquivos(selectedFiles);

    if (Array.isArray(mensagensErro) && mensagensErro.length > 0) {
      setUplaodMessage(mensagensErro.join("\n"));
      alert(mensagensErro.join("\n"));
    }else{
      setUplaodMessage("");
    }
    // if (mensagensErro.length > 0) {
    //   setUplaodMessage(mensagensErro.join("\n"));
    //   alert(mensagensErro.join("\n"));
    // } else {
    //   setUplaodMessage("");
    // }

    setFilesByField(prev => ({
      ...prev,
      [fileName]: arquivosValidos,
    }));

    console.log(`Arquivos válidos em ${fileName}:`, arquivosValidos.map(f => f.name));
  };

  //API para enviar arquivos para o banckend
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
        setResultados(data.resultados);
        setUplaodMessage('Arquivos enviados com sucesso');
        console.log("Resposta do backend:", data.resultados);
      } else {
        setUplaodMessage('Erro ao enviar os arquivos.');
        console.error("Erro no upload");
      }
    } catch (error) {
      setUplaodMessage('Falha na conexão com o servidor');
      console.error("Erro ao enviar arquivo:", error);
    }
  };

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

// Renderização do componente 
  return (
    <>
      <NavBar />
      <div className='container'>
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
                  <div className={styles.uploadMessage}>{uploadMessage}</div>
                )}
              </div>
            </form>
          </div>
        )}

        {resultados && (
          <>
            <div className={styles.tabBar}>
              {["extrato", "pendente", "consultor"].map((tipo) => (
                <button
                  key={tipo}
                  className={`${styles.tabButton} ${abaAtiva === tipo ? styles.active : ""}`}
                  onClick={() => setAbaAtiva(tipo)}
                >
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </button>
              ))}
            </div>

            <div className={styles.tabContent}>
              {resultados[abaAtiva]?.map((res, idx) => (
                <ResultadoTabela key={`${abaAtiva}-${idx}`} resultados={res} />
              ))}
            </div>

            <button
              className={styles.button}
              onClick={() => {
                setResultados(null);
                setFilesByField({
                  extrato: [],
                  comprovante: [],
                  consultor: [],
                });
                setUplaodMessage('');
                setAbaAtiva("extrato");
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

export default Upload_Arquivo;
