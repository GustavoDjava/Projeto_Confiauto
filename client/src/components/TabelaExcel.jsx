import React from 'react';
import styles from './ResultadoTabela.modules.css'

function TabelaExcel({ linhas }) {
  if (!linhas || linhas.length === 0) return null;

  const colunas = Object.keys(linhas[0]);

  return (
    <div className={styles.resultCard}>
      <h3>📊 Dados da planilha</h3>
      <table className={styles.tabelaExcel}>
        <thead>
          <tr>
            {colunas.map((coluna) => (
              <th key={coluna}>{coluna}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, idx) => (
            <tr key={idx}>
              {colunas.map((coluna) => (
                <td key={coluna}>{linha[coluna] ?? "—"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaExcel;
