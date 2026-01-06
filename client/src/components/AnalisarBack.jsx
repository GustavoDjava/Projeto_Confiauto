import React, { useEffect, useState } from "react";

function AnalisarData() {
  const [resultados, setResultados] = useState(null);

  // Busca os dados do backend ao carregar o componente
  useEffect(() => {
  async function fetchResultados() {
    try {
      const res = await fetch("http://localhost:5000/api/analisar-resultados"); 
      const data = await res.json();
      setResultados(data.resultados);
    } catch (err) {
      console.error("Erro ao buscar resultados:", err);
    }
  }

  fetchResultados();
}, []);


  if (!resultados) {
    return <p style={{ padding: "2rem" }}>Carregando resultados...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Resultados da Análise</h2>

      {/* Extratos */}
      {resultados.extrato && (
        <>
          <h3>Extratos</h3>
          <table border="1" cellPadding="8" style={{ marginBottom: "2rem", width: "100%" }}>
            <thead>
              <tr>
                <th>Arquivo</th>
                <th>Data</th>
                <th>Valor</th>
                <th>CPF</th>
                <th>Pagante</th>
              </tr>
            </thead>
            <tbody>
              {resultados.extrato.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.arquivo}</td>
                  <td>{item.data}</td>
                  <td>{item.valor}</td>
                  <td>{item.cpf}</td>
                  <td>{item.pagante}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Comprovantes */}
      {resultados.comprovante && (
        <>
          <h3>Comprovantes</h3>
          <table border="1" cellPadding="8" style={{ marginBottom: "2rem", width: "100%" }}>
            <thead>
              <tr>
                <th>Arquivo</th>
                <th>Data Pagamento</th>
                <th>Valor Pago</th>
                <th>CPF</th>
                <th>Nome</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {resultados.comprovante.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.arquivo}</td>
                  <td>{item.data_pagamento}</td>
                  <td>{item.valor_pago}</td>
                  <td>{item.cpf}</td>
                  <td>{item.nome}</td>
                  <td>{item.bateu ? "✅ Bateu" : "❌ Não bateu"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Consultores */}
      {resultados.consultor && (
        <>
          <h3>Consultores</h3>
          <table border="1" cellPadding="8" style={{ marginBottom: "2rem", width: "100%" }}>
            <thead>
              <tr>
                <th>Arquivo</th>
                <th>Associado</th>
                <th>Data</th>
                <th>Valor Adesão</th>
                <th>Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {resultados.consultor.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.arquivo}</td>
                  <td>{item.associado}</td>
                  <td>{item.data}</td>
                  <td>{item.valor_adesao}</td>
                  <td>{item.detalhes ? item.detalhes.join(", ") : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default AnalisarData;
