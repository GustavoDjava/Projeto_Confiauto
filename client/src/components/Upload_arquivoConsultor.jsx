import React from 'react'
import { useState } from 'react';
import styles from "./Upload.module.css"

function Upload_arquivoConsultor() {

    const [uploadVenda, setUploadVenda] = useState("");

    const handleFileChange = (event) => {
        const file = event.targe.files[0];
        if (file) {
            setUploadVenda(file.name);
        }
    }


    return (
        <div className='container'>
            <div className={styles.uploadWrapper}>
                <form>
                    <div className={styles.uploadContainer}>
                        <label htmlFor="comprovante" className={styles.label}>
                            Venda dos consultores
                        </label>

                        <label htmlFor="comprovante" className={styles.customUpload}>
                            <img src="/upload_arquivo.png" alt="ícone de upload" />
                            <span>{uploadVenda || "Escolher arquivo..." }</span>
                        </label>

                        <input type="file"
                        id="comprovante"
                        name= "comprovante"
                        onChange={handleFileChange}
                        className={styles.hiddenInput}
                        />

                        <button type="submit" className={styles.button}>Salvar</button>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Upload_arquivoConsultor
