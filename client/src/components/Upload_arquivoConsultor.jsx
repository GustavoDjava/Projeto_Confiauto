import React from 'react'
import { useState } from 'react';
import styles from "./Upload.module.css"

function Upload_arquivoConsultor() {

    const [uploadVenda, setUploadVenda] = useState("");

    return (
        <div className='container'>
            <form>
                <div>
                    <label>Venda dos consultores </label>
                    <div className={styles.styleUpload}>  
                        <img src="/upload_arquivo.png" alt="" />
                    </div>
                    <input type="file" name="image" />
                    <div>
                        <button type='submit'>Salvar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Upload_arquivoConsultor
