import React from 'react'
import { useState } from 'react';
import styles from "./Upload.module.css"

function Upload_arquivoConsultor() {

    const [uploadVenda, setUploadVenda] = useState("");

    const handleFileChange_Consultor = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadVenda(file.name);
            console.log("Arquivo com associado do consultor anexado")
        }
    }
    // colocar trycatch 
        


    return (
        <div className='container'>
            <div className={styles.uploadWrapper}>
                <form>
                    <div className={styles.uploadContainer}>
                        <label htmlFor="arquivo_consultor" className={styles.label}>
                            Venda dos consultores
                        </label>

                        <label htmlFor="arquivo_consultor" className={styles.customUpload}>
                            <img src="/upload_arquivo.png" alt="ícone de upload" />
                            <span>{uploadVenda || "Escolher arquivo..." }</span>
                        </label>

                        <input type="file"
                        id="arquivo_consultor"
                        name= "arquivo_consultor"
                        onChange={handleFileChange_Consultor}
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
