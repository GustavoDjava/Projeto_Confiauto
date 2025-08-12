import React from 'react'
import { useState } from 'react';

function Upload_Extrato() {

    //Declarar variáveis para receber o form
    const [upload, setUpload] = useState("");

    //Executar a função quando o usuário cliclar no botão do form
    const uploadImg = async (e) => {

        e.preventDefault();

        console.log("Upload funcionando")

    }

    return (
        <div className='container'>
            <form onSubmit={uploadImg}>
                <label>Upload extrato</label>
                <input type="file" name="image" onChange={(e) => setUpload(e.target.files[0])} />

                <div>
                    <button type='submit'>Salvar</button>
                </div>
            </form>

        </div>
    )
}

export default Upload_Extrato
