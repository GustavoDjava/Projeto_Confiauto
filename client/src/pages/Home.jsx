import React from 'react'
import NavBar from '../components/NavBar'
import Upload_Extrato from '../components/Upload_Extrato'
import Upload_CompovantePagamento from '../components/Upload_CompovantePagamento'
import Upload_arquivoConsultor from '../components/Upload_arquivoConsultor'


function Home() {
  return (
    <>
      <NavBar/>
     {/* div para colocar os botaoes da pagina */}
      <div>
      <Upload_Extrato/> 
      <Upload_CompovantePagamento/>
      <Upload_arquivoConsultor/>
      </div>
    </>
  )
}

export default Home
