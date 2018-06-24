## Minerador de eventos

Esse projeto é um minerador de eventos que pega eventos do site (http://agendanatal.com.br/eventos) e disponibiliza em forma de uma API. 

## Pré-requisitos
- Node.js >= 8.9.4

## Executando o projeto
- Se for a primeira vez que estiver executando o projeto, roda primeiramente npm install na pasta do projeto para instalar as dependencias utilizadas no projeto.
- Execute npm start para iniciar o servidor da api. Após isso, estará em execução um servidor local na porta 3000.
- Quando o servidor é iniciado ele já vai no site, minera todos os eventos e armazena em memoria para consulta via api.

## Utilizando a API.
- O endpoint para obter os eventos é /eventos.
- Há alguns filtros que podem ser utilizados, passando parametros na url, para que se possa pesquisar por eventos na lista.
    - dataInicial e dataFinal: Filtro de data.
    - name: Filtro de nome. Verifica se o nome do evento contem a expressão passada.
    - dia_semana: Deve ser um dos valores: (SEG, TER, QUA, QUI, SEX, SAB, DOM).
    - local: Funciona da mesma maneira que o nome, buscando no local do evento.