var request = require('request')
var cheerio = require('cheerio')
var express = require('express')

var eventos = [];

request.get('http://agendanatal.com.br/eventos', function(error, response, body) {
    if(error || response.statusCode != 200) {
        console.log(error);
        return;
    }

    $ = cheerio.load(body);
    $('.top-event-title').each(function(key, value) {
        eventos.push({
            name: value.children[0].data
        });
    })

    $('.top-event .img-h-responsive').each(function(key, value) {
      eventos[key]['image'] = 'http://agendanatal.com.br' + value.attribs.src;
    })

    $('div[class=day]').each(function(key, value) {
        var mes = value.children[0].data;
        var mapMes = {
            'JAN' : "01",
            'FEV' : "02",
            'MAR' : "03",
            'ABR' : "04",
            'MAI' : "05",
            'JUN' : "06",
            'JUL' : "07",
            'AGO' : "08",
            'SET' : "09",
            'OUT' : "10",
            'NOV' : "11",
            'DEZ' : "12"
        }
        eventos[key]['data'] = mapMes[mes];
    })
    $('div[class=month]').each(function(key, value) {
        var dia = value.children[0].data;
        if(dia.length < 2) {
            dia = "0" + string(dia);
        }
        eventos[key]['data'] =  '2018' + '-' + eventos[key]['data'] + '-' + dia;
    })
    $('div[class=week-day]').each(function(key, value) {
        var dia_semana = value.children[0].data;
        eventos[key]['dia_semana'] = dia_semana;
    })
    $('div[class=top-event-place]').each(function(key, value) {
        var categoria = value.children[0].data;
        eventos[key]['categoria'] = categoria;
    })

    $('div[class=right-evt-inner] div p:first-child').each(function(key, value) {
        var local = value.children[2].data;
        eventos[key]['local'] = local; 
    })
})

var app = express();

app.use(express.json())

app.get('/eventos', (req, res) => {
    var eventosReturn = eventos;
    if(req.query.dataInicial) {
        eventosReturn = eventosReturn.filter(e => e.data > req.query.dataInicial);
    }
    if(req.query.dataFinal) {
        eventosReturn = eventosReturn.filter(e => e.data <= req.query.dataFinal);
    }
    if(req.query.name) {
        eventosReturn = eventosReturn.filter(e => e.name.toLowerCase().includes(req.query.name.toLowerCase()));
    }
    if(req.query.dia_semana) {
        eventosReturn = eventosReturn.filter(e => e.dia_semana === req.query.dia_semana);
    }
    if(req.query.local) {
        eventosReturn = eventosReturn.filter(e => e.local.toLowerCase().includes(req.query.local.toLowerCase()));
    }
    res.json(eventosReturn);
 })

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));