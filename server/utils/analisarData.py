import json

def comparar_pdf_com_extrato(comprovantes_pdf, extratos):
    """
    Compara lista de comprovantes extraídos de PDFs com dados do extrato.
    Retorna quais comprovantes batem com o extrato.
    """
    resultados = []

    for comp in comprovantes_pdf:
        # Se comp for string JSON, converte para dict
        if isinstance(comp, str):
            try:
                comp = json.loads(comp)  # tenta converter
            except Exception:
                print("⚠️ Comprovante inválido (não é dict nem JSON):", comp)
                continue

        bateu = False
        detalhes = []

        for linha in extratos:
            if isinstance(linha, str):
                try:
                    linha = json.loads(linha)
                except Exception:
                    print("⚠️ Linha inválida (não é dict nem JSON):", linha)
                    continue

            cond_data = comp.get("data_pagamento") and linha.get("data") and comp["data_pagamento"] == linha["data"]
            cond_valor = comp.get("valor_pago") and linha.get("valor") and comp["valor_pago"] == linha["valor"]
            cond_cpf = comp.get("cpf") and linha.get("cpf") and comp["cpf"] == linha["cpf"]
            cond_nome = comp.get("nome") and linha.get("pagante") and comp["nome"].lower() in linha["pagante"].lower()

            # Critério principal: data + valor
            if cond_data and cond_valor:
                bateu = True
                detalhes.append("Data e valor coincidem")
            elif cond_valor and cond_cpf:
                bateu = True
                detalhes.append("Valor e CPF coincidem")
            elif cond_valor and cond_nome:
                bateu = True
                detalhes.append("Valor e nome coincidem")

        # Exibe no console
        print("📄 Comprovante:", comp)
        print("✅ Bateu:", bateu)
        print("ℹ️ Detalhes:", detalhes if detalhes else ["Não encontrado no extrato"])
        print("----")

        resultados.append({
            "comprovante": comp,
            "bateu": bateu,
            "detalhes": detalhes if detalhes else ["Não encontrado no extrato"]
        })

    return resultados
