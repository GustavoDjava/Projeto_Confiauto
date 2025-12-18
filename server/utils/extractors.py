from collections import defaultdict

def comparar_pdf_com_extrato(comprovantes_pdf, extratos):
    """
    Compara lista de comprovantes extraídos de PDFs com dados do extrato.
    Retorna quais comprovantes batem com o extrato.
    """
    resultados = []

    for comp in comprovantes_pdf:
        bateu = False
        detalhes = []

        for linha in extratos:
            cond_data = comp.get("data_pagamento") and linha.get("data") and comp["data_pagamento"] == linha["data"]
            cond_valor = comp.get("valor_pago") and linha.get("valor") and comp["valor_pago"] == linha["valor"]
            cond_cpf = comp.get("cpf") and linha.get("cpf") and comp["cpf"] == linha["cpf"]

            # garantir que são strings antes de usar lower()
            nome_comp = comp.get("nome")
            nome_linha = linha.get("pagante")
            cond_nome = nome_comp and nome_linha and isinstance(nome_linha, str) and nome_comp.lower() in nome_linha.lower()

            if cond_data and cond_valor:
                bateu = True
                detalhes.append("Data e valor coincidem")
            if cond_valor and cond_cpf:
                bateu = True
                detalhes.append("Valor e CPF coincidem")
            if cond_valor and cond_nome:
                bateu = True
                detalhes.append("Valor e nome coincidem")

        resultados.append({
            "comprovante": comp,
            "bateu": bateu,
            "detalhes": detalhes if detalhes else ["Não encontrado no extrato"]
        })

    return resultados


def agrupar_por_consultor_associado(resultados):
    """
    Agrupa os dados do comparar_pdf_com_extrato por consultor e associado.
    Retorna um dicionário pronto para exibição.
    """
    agrupado = defaultdict(list)

    for r in resultados:
        comp = r["comprovante"]
        if r["bateu"]:
            consultor = comp.get("consultor", "N/A")
            associado = comp.get("nome") or comp.get("cpf") or "Desconhecido"

            agrupado[consultor].append({
                "associado": associado,
                "data": comp.get("data_pagamento", "N/A"),
                "valor_adesao": comp.get("valor_pago", "N/A"),
                "detalhes": r["detalhes"]
            })

    return agrupado


def mostrar_no_console(dados_agrupados):
    """
    Exibe os dados agrupados por consultor e associado no console.
    """
    for consultor, associados in dados_agrupados.items():
        print(f"\n👩‍💼 Consultor: {consultor}")
        for assoc in associados:
            print(f"   - Associado: {assoc['associado']}")
            print(f"     Data: {assoc['data']}")
            print(f"     Valor de adesão: {assoc['valor_adesao']}")
            print(f"     Detalhes: {', '.join(assoc['detalhes'])}")
