const express = require("express")
const api = express()
// Inicialização da API com Express

const bodyParser = require("body-parser");
const caixaPath = require("./caixaEletronico")
// Importação do bodyParser para tratamento de requisições JSON e da rota onde está a implementação da função que fará o cálculo da quantidade de cédulas

api.use(bodyParser.json()) // Middleware para interpretar o corpo (body) da requisição como um JSON

api.use((error, req, res, next) => {
    if(error) {
        console.log(error)
        return res.status(400).json({ "Erro": "A API não foi capaz de processar a requisição. Verifique se o JSON fornecido está no formato adequado." });
    }
}) // Este Middleware verifica qualquer erro imprevisto no formato da requisição

api.post('/api/saque', caixaPath) // Requisição do método POST para o path especificado, realizando a chamada da função em caixaPath

const port = 5000
api.listen(port, () => {
    console.log(`Servidor inciado em http://localhost:${port}/api/saque`)
})