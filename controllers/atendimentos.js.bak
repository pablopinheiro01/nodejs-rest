const Atendimentos = require('../models/atendimentos')

module.exports = app => {

    app.get('/atendimentos', (req,res) => { res.send('você está na rota de atendimentos') } )

    app.post('/atendimentos', (req, res) => {
        console.log("recebendo o body: ")
        console.log(req.body)
        
        const atendimento = req.body
        
        //o proprio metodo de adicona monta a resposta com o parametro res
        Atendimentos.adiciona(atendimento,res)
   })


}


