import React from 'react'
import { useState } from 'react';
import styles from './Upload.module.css'


function Upload_CompovantePagamento() {

  const [uploadComprovante, setUploadCompovante] = useState("");

  const handleFileChange_Comprovante = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadCompovante(file.name);
      console.log("Comprovante de pagamento anexado")
    }
  };

  //Executar a função quando o usuário clicar no botão do from
  const upload_Img_Comprovante = async (e) => {

    e.preventDefault();

    console.log("Upload funcionando")
  }

  return (
    <div>
      <div className='container'>
        <div className={styles.uploadWrapper}>
          <form onSubmit={upload_Img_Comprovante}>
            <div className={styles.uploadContainer}>
              <label htmlFor='comprovante' className={styles.label}>
                Upload comprovante de pagamento
              </label>

              <label htmlFor="comprovante" className={styles.customUpload}>
                <img src="/upload_arquivo.png" alt="ícone de upload" />
                <span>{uploadComprovante || "Escolher arquivo..."}</span>
              </label>

              <input type="file"
                id='comprovante'
                name="comprovante"
                onChange={handleFileChange_Comprovante}
                className={styles.hiddenInput}
              />

              <button type="submit" className={styles.button}>Salvar</button>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Upload_CompovantePagamento
