const contaQuantidadeCelulas = (req, res) => {

    let { valor } = req.body // O valor contido no corpo da requisicao eh armazenado
    
    console.log(typeof(valor))
    
    // Caso o valor nao seja valido (eh negativo, nao inteiro ou nao eh do tipo "number") a API retorna um status de bad request
    if (isNaN(valor) || !Number.isInteger(valor) || valor < 0)  {
        return res.status(400).json({"Erro": "Valor deve ser um número inteiro positivo."})
    } 
    
    if (valor == 1)
        return res.status(400).json({"Erro": "Não é possível gerar cédulas para este valor."}) // se valor for igual a 1, eh impossivel compor o valor total a partir das celulas disponiveis, pois nao ha um cedula com o valor 1.
    
    const notas = [100, 50, 20, 10, 5, 2] // array que contem as cedulas disponiveis
    const qntdNotas = [0, 0, 0, 0, 0, 0] // array para armezanar a quantidade respectiva de cada cedula para reunir o valor total requisitado
    

    // o loop percorre por cada tipo de cedula disponivel
    for (let i = 0; i < notas.length; i++) { 


        /* verifica se o valor atual eh maior ou igual ao valor da nota correspondente durante a iteracao. Se o valor for menor que a nota atual, a quantidade de notas do tipo correspondente permanece 0 no array qntdNotas (pois nao eh preciso nenhuma cedula do tipo atual)  */   
        if (valor >= notas[i]) {

            // se a condicao for verdadeira, calcula quantas notas do tipo atual cabem no valor restante e armazena esse valor ao array qntdNotas. Para isso, utiliza-se a funcao Math.floor para se obter o valor inteiro referente a quantidade
            qntdNotas[i] = Math.floor(valor / notas[i])
            // atualiza o valor para ser o restante apos retirar as notas do tipo atual
            valor %= notas[i]

            if (valor == 1)
                return res.status(400).json({"Erro": "Não é possível gerar cédulas para este valor."}) // checa-se novamente se o valor restante resulta em 1, a fim de verificar se sera possivel compor o valor com as cedulas disponiveis
        }    

    }

    // a quantidade respectiva de cada cedula eh retornada em formato JSON a partir do array qntdNotas

    console.log(qntdNotas)

    return res.status(200).json({
        "100": qntdNotas[0],
        "50": qntdNotas[1],
        "20": qntdNotas[2],
        "10": qntdNotas[3],
        "5": qntdNotas[4],
        "2": qntdNotas[5]
    })

}

module.exports = contaQuantidadeCelulas 
