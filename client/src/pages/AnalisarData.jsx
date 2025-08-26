import React, { useState } from 'react';
import axios from 'axios';

function AnalisarData() {
  const [resultados, setResultados] = useState(null);

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("extrato[0]", e.target.files[0]); // você pode adaptar para outros campos

    try {
      const res = await axios.post("http://localhost:5000/api/analisar", formData);
      setResultados(res.data.resultados);
    } catch (err) {
      console.error("Erro ao enviar arquivo:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Upload de Arquivo</h2>
      <input type="file" onChange={handleUpload} />

      {resultados && (
        <div style={{ marginTop: "2rem" }}>
          {Object.entries(resultados).map(([categoria, arquivos]) => (
            <div key={categoria}>
              <h3>{categoria.toUpperCase()}</h3>
              {arquivos.map((arquivo, idx) => (
                <div key={idx} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
                  <p><strong>Arquivo:</strong> {arquivo.arquivo}</p>
                  <p><strong>Tipo:</strong> {arquivo.tipo}</p>
                  {arquivo.conteudo && <p><strong>Conteúdo:</strong> {arquivo.conteudo}</p>}
                  {arquivo.informacoes && (
                    <div>
                      <h4>Informações extraídas:</h4>
                      <ul>
                        {Object.entries(arquivo.informacoes).map(([chave, valores]) => (
                          <li key={chave}>
                            <strong>{chave}:</strong> {valores.length > 0 ? valores.join(", ") : "Nenhum encontrado"}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {arquivo.metadados && (
                    <div>
                      <h4>Metadados da imagem:</h4>
                      <ul>
                        {Object.entries(arquivo.metadados).map(([k, v]) => (
                          <li key={k}><strong>{k}:</strong> {v}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AnalisarData;
