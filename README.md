# Projeto de Caixa Eletrônico Simples - Desafio Técnico
O desafio consiste na implementação de uma API que simula o funcionamento de um caixa eletrônico. Ela recebe um valor de saque fornecido por uma requisição e retorna a quantidade de cédulas de cada valor necessárias para compor esse saque, utilizando a menor quantidade de cédulas possível. As cédulas consideradas são: 100, 50, 20, 10, 5 e 2.

Para isso, a API deve ser capaz de identificar determinados casos de erro, como:
* Valores negativos;
* Valores decimais;
* Valores que não podem ser compostos com as notas disponíveis;
* JSON mal formatado.

## Tecnologias Utilizadas

### Linguagem de Programação JavaScript
JavaScript foi selecionada devido à implementação da API com NodeJS, facilitando o processo de construção do servidor.

### NodeJS & Express
Para implementação da API, foi utilizado o framework Express disponível para NodeJS. Ele facilita a implementação do servidor, fornecendo ferramentas que tornam a sua manutenção mais dinâmica e eficiente.

### Jest
O JEST foi utilizado para execução de testes de requisição para API, garantindo seu funcionamento e correta identificação de erros.

## Endpoints
A API possui um único endpoint para realizar a simulação de saque em um caixa eletrônico.

```
/api/saque
Método: POST
```

Este endpoint recebe um valor inteiro positivo de saque e retorna a quantidade mínima de cédulas de cada valor necessário para completar o saque.

Exemplo de requisição JSON no bash:
```
curl -X POST http://localhost:5000/api/saque -H "Content-Type: application/json" -d '{"valor": 380}'
```
Exemplo de resposta esperada:
```
{
  "100": 3,
  "50": 1,
  "20": 1,
  "10": 1,
  "5": 0,
  "2": 0
}
```
Status de resposta:

* 200 OK: Retorna as cédulas necessárias para o saque especificado.
* 400 Bad Request: Caso o corpo da requisição esteja mal formatado ou o valor seja inválido.

## Desafios

### API e testes
O desafio, a princípio, se mostrou bastante intuitivo e direto. A implementação da API foi tranquila, dado que ela deve receber apenas uma requisição de único método (POST). Assim, sua implementação não requer ferramentas mais sofisticadas de roteamento e autenticações.

Além disso, durante os testes da API com o comando ```curl```, foram retornados erros relacionados ao terminal. Para solucioná-los, foi necessário recorrer à auxílio externo a fim de identificar o que estava provocando esses erros, os quais foram resolvidos (tipos de caracteres especiais aceitos em cada terminal).


### Lógica da contagem de cédulas
Em relação à lógica desenvolvida para o desafio de contagem de cédulas, a solução inicial encontrada era bastante simples e direta. No entanto, ela apresentava condicionais para cada intervalo de valores de cédulas disponíveis (ex.: ```valor >= 100```, ```valor >= 50```...) até a condicional com o intervalo adequado.
Logo, se, por exemplo, o valor fosse maior que R$100, o código executava o bloco a partir da condição ```valor >= 100```, dividia o valor por 100 e acrescentava o resultado (arredondado) na quantidade de cédulas de 100. Valor, em seguida, recebia o resto dessa mesma divisão. Se o valor restante agora estivesse entre 99 e 50, por exemplo, o código sob a condição ```valor >= 50``` seria executado, dividindo o valor por 50 e acrescentando o resultado (arredondado) na quantidade de cédulas de 50.
Essa lógica se repetia até que valor fosse igual 0.

Embora fosse funcional e bastante legível, o código até então se mostrava pouco elegante e com uma quantidade desnecessária de estruturas de ```if``` e ```else```. Além disso, foram reservadas sete variáveis referentes às cédulas disponíveis.

Para corrigir isso, ao invés de designar sete variáveis referentes às cédulas disponíveis, os tipos de notas foram armazenados em um array (```notas```) para ser percorrido. O resultado também era armazenado num novo array, em que as posições (índices) correspondiam aos índices do tipo de cédula no array que as continha.

Com isso, se solucionou o problema de muitas condicionais e o código se tornou mais enxuto e elegante.

### Formatação do JSON
A ordenação dos campos no JSON pode variar dependendo do interpretador de JSON usado pelo cliente que realiza a requisição. Portanto, a resposta da API pode não manter a ordem das cédulas conforme especificada no enunciado.

Por exemplo, a resposta abaixo é uma representação válida do JSON, mesmo que a ordem das cédulas seja diferente:

```
{
  "2": 0,
  "5": 1,
  "10": 1,
  "20": 1,
  "50": 1,
  "100": 3
}
```


## Como executar o projeto
Para execução do projeto, primeiro clone o repositório:

```
git clone https://github.com/victoralva08/desafioEstagio.git
```

Instale as dependências necessárias:
``` 
npm install
```

Para iniciar a API:
```
npm start
``` 

Para executar os testes:
```
npm test
```

## Testando a API com curl
* Unix/Linux/MacOS:
```
curl -X POST http://localhost:5000/api/saque -H "Content-Type: application/json" -d '{"valor": 380}'
```
* CMD do Windows:
```
curl -X POST http://localhost:5000/api/saque -H "Content-Type: application/json" -d "{\"valor\": 380}"
```
* No PowerShell:
```
curl -X POST http://localhost:5000/api/saque -H "Content-Type: application/json" -d '{\"valor\": 380}'
```
