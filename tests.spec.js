const request = require("supertest")
const express = require('express')
const api = express()

const bodyParser = require('body-parser')
const caixaPath = require('./caixaEletronico')

api.use(bodyParser.json())
api.post('/api/saque', caixaPath)

test('Deve retornar 400 se o valor não for um número inteiro positivo', async () => {
    const res = await request(api)
        .post('/api/saque')
        .send({ "valor": -100 }) 

    expect(res.status).toBe(400)
    expect(res.body).toEqual({"Erro": "Valor deve ser um número inteiro positivo."})
})

test('Deve retornar 400 se o valor não for um número inteiro positivo', async () => {
    const res = await request(api)
        .post('/api/saque')
        .send({ "valor": 18.75 }) 

    expect(res.status).toBe(400)
    expect(res.body).toEqual({"Erro": "Valor deve ser um número inteiro positivo."})
})

test('Deve retornar 400 se não for possível compor o valor com as cédulas disponíveis', async () => {
    const res = await request(api)
        .post('/api/saque')
        .send({ "valor": 11 }) 

    expect(res.status).toBe(400)
    expect(res.body).toEqual({"Erro": "Não é possível gerar cédulas para este valor."})
})

test('Deve retornar 400 se não for possível compor o valor com as cédulas disponíveis', async () => {
    const res = await request(api)
        .post('/api/saque')
        .send({ "valor": 1 }) 

    expect(res.status).toBe(400)
    expect(res.body).toEqual({"Erro": "Não é possível gerar cédulas para este valor."})
})

test('Deve retornar a quantidade correta de cédulas para um valor válido', async () => {
    const res = await request(api)
        .post('/api/saque')
        .send({ "valor": 150 })

    expect(res.status).toBe(200)
    expect(res.body).toEqual({
        "100": 1,
        "50": 1,
        "20": 0,
        "10": 0,
        "5": 0,
        "2": 0
    })
})

