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
        }
    }
    
    //Executar a função quando o usuário cliclar no botão do form
    const uploadImg = async (e) => {

        e.preventDefault();

        console.log("Upload funcionando")

    }

    return (
        <div className='container'>
            <div className={styles.uploadWrapper}>
                <form onSubmit={uploadImg}>
                    <div className={styles.uploadContainer}>
                        <label htmlFor="comprovante" className={styles.label}>
                            Vendas dos consultores
                        </label>

                        <label htmlFor="comprovante" className={styles.customUpload}>
                            <img src="/upload_arquivo.png" alt="ícone de upload" />
                            <span>{upload || "Escolher arquivo..."}</span>
                        </label>

                        <input type="file"
                            id="comprovante"
                            name="comprovante"
                            onChange={handleFileChange}
                            className={styles.hiddenInput}
                        />
                        <button type="submit" className={styles.button}>Salvar</button>

                    </div>

                    {/* <div>
                        <label>Upload extrato</label>
                        <div className={styles.styleUpload}>
                            <img src="/upload_arquivo.png" alt="" />
                        </div>
                        <input type="file" name="image" onChange={(e) => setUpload(e.target.files[0])} />
                        <div>
                            <button type='submit'>Salvar</button>
                        </div>
                    </div> */}
                </form>
            </div>
        </div>
    )
}

export default Upload_Extrato
