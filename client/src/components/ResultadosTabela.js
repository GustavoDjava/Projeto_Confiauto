import React from 'react';
import styles from './ResultadoTabela.modulo.css';

function ResultadoTabela({ resultados }) {
  if (!resultados) return null;

  return (
    <div className={styles.resultadosWrapper}>
      {Object.entries(resultados).map(([categoria, arquivos]) => (
        <div key={categoria} className={styles.categoriaSection}>
          <h3>{categoria.toUpperCase()}</h3>
          {arquivos.map((arquivo, idx) => (
            <div key={idx} className={styles.resultCard}>
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
  );
}

export default ResultadoTabela;
