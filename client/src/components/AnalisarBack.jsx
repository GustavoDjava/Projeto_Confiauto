import React, { useEffect, useState } from "react";

function DadosAnalise() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/analise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comprovantes_pdf: [
          { nome: "João", cpf: "123.456.789-00", data_pagamento: "01/12/2025", valor_pago: "R$ 200,00" }
        ],
        extratos: [
          { pagante: "João", cpf: "123.456.789-00", data: "01/12/2025", valor: "R$ 200,00" }
        ]
      })
    })
      .then(res => res.json())
      .then(data => setDados(data))
      .catch(err => console.error("Erro:", err));
  }, []);

  return (
    <div>
      <h2>Resultados da Análise</h2>
      {dados.map((item, idx) => (
        <div key={idx}>
          <p>Comprovante: {JSON.stringify(item.comprovante)}</p>
          <p>Bateu: {item.bateu ? "Sim" : "Não"}</p>
          <p>Detalhes: {item.detalhes.join(", ")}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default DadosAnalise;
