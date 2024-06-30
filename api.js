const express = require("express")
const api = express()
// inicializacao da api com express

const bodyParser = require("body-parser")
const caixaPath = require("./caixaEletronico")
// Importacao do bodyParser para tratamento de requisicoes JSON e da rota onde esta a implementacao da funcao que fara o calculo da quantidade de cedulas

api.use(bodyParser.json()) // Middleware para interpretar o corpo (body) da requisicao como um JSON

api.use((error, req, res, next) => {
    if(error) {
        console.log(error)
        return res.status(400).json({ "Erro": "A API não foi capaz de processar a requisição. Verifique se o JSON fornecido está no formato adequado." })
    }
}) // Este Middleware verifica qualquer erro imprevisto no formato da requisicao

api.post('/api/saque', caixaPath) // Requisicao do metodo POST para o path especificado, realizando a chamada da funcao em caixaPath

const port = 5000
api.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}/api/saque`)
})