import React from 'react'
import styles from '../log/Log.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function Log() {


  return (
    <div className='container'>
      <div className={styles.formStyles}>

        <div className={styles.whiteColor}>
          <img src="/logoConfiauto.png" alt="" />
        </div>

        <div className={styles.whiteColor}>
          <form action="">
            <label htmlFor="">Email</label>
            <input type="text" placeholder='Digite o email de admistrador' />

            <label htmlFor="">Senha</label>
            <input type="password" placeholder='Digite sua senha' />

            <div>
              <button type="button" class="btn btn-danger">Cancelar</button>
              <button type="button" class="btn btn-outline-primary">Entar</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Log
