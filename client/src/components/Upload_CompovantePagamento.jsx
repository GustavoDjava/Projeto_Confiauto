import React from 'react'
import { useState } from 'react';
import styles from './Upload.module.css'


function Upload_CompovantePagamento() {

const [uploadCompovante, setUploadCompovante] = useState("");



  return (
    <div>
      <div className='container'>
        <form>
          <div>
            <label> Upload comprovante de pagamento</label>
            <img src="/upload_arquivo.png" alt="" />
            <input type="file" />

            <div>
                <button type='submit'>Salvar</button>
            </div>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Upload_CompovantePagamento
