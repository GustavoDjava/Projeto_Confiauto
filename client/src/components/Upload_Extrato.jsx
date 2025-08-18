import React from 'react'
import { useState } from 'react';
import styles from './Upload.module.css'

function Upload_Extrato() {

    //Declarar variáveis para receber o form
    const [upload, setUpload] = useState("");
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUpload(file.name);
            console.log("Extrato anexado")
        }
    }
    
    //Executar a função quando o usuário clicar no botão do form
    const uploadImg = async (e) => {

        e.preventDefault();

        console.log("Upload funcionando")

    }

    return (
        <div className='container'>
            <div className={styles.uploadWrapper}>
                <form onSubmit={uploadImg}>
                    <div className={styles.uploadContainer}>
                        <label htmlFor="extrato" className={styles.label}>
                            Extrato
                        </label>

                        <label htmlFor="extrato" className={styles.customUpload}>
                            <img src="/upload_arquivo.png" alt="ícone de upload" />
                            <span>{upload || "Escolher arquivo..."}</span>
                        </label>

                        <input type="file"
                            id="extrato"
                            name="extrato_banco"
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

export default Upload_Extrato
