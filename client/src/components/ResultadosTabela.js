import React from 'react';
import styles from './ResultadoTabela.module.css';
import  TabelaExcel from './TabelaExcel';
/**
 * Componente que exibe os resultados do processamento do Excel.
 * Mostra os dados originais da planilha e as informações extraídas agrupadas por consultor.
 */
function ResultadoTabela({ resultados }) {
  if (!resultados) return null;

  const { linhas, agrupado_por_consultor } = resultados;

  return (
    <div className={styles.resultadosWrapper}>
      
      {/* Tabela com os dados originais da planilha */}
      {Array.isArray(linhas) && linhas.length > 0 && (
        <div className={styles.resultCard}>
          <h3>📊 Dados da planilha Excel</h3>
          <TabelaExcel linhas={linhas} />
        </div>
      )}

      {/* Informações extraídas agrupadas por consultor */}
      {agrupado_por_consultor &&
        Object.entries(agrupado_por_consultor).map(([consultor, registros]) => (
          <div key={consultor} className={styles.categoriaSection}>
            <h3>{consultor.toUpperCase()}</h3>

            {registros.map((info, idx) => (
              <div key={idx} className={styles.resultCard}>
                {info.arquivo && <p><strong>Arquivo:</strong> {info.arquivo}</p>}
                {info.tipo && <p><strong>Tipo:</strong> {info.tipo}</p>}
                {info.conteudo && <p><strong>Conteúdo:</strong> {info.conteudo}</p>}

                {info.informacoes && (
                  <div>
                    <h4>Informações extraídas:</h4>
                    <ul>
                      {Object.entries(info.informacoes).map(([chave, valores]) => (
                        <li key={chave}>
                          <strong>{chave}:</strong>{" "}
                          {Array.isArray(valores)
                            ? valores.length > 0
                              ? valores.join(", ")
                              : "Nenhum encontrado"
                            : valores ?? "—"}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {info.metadados && (
                  <div>
                    <h4>Metadados da imagem:</h4>
                    <ul>
                      {Object.entries(info.metadados).map(([k, v]) => (
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
