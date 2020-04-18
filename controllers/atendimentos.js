const Atendimentos = require('../models/atendimentos')

module.exports = app => {

    app.get('/atendimentos', (req,res) => { 

        Atendimentos.lista(res)
        

    } )

    app.get('/atendimentos/:id', (req,res) => {
        console.log(req.params)
        const id = parseInt(req.params.id)

        Atendimentos.buscaPorId(id, res)
        
    })

    app.post('/atendimentos', (req, res) => {
        console.log("recebendo o body: ")
        console.log(req.body)
        
        const atendimento = req.body
        
        //o proprio metodo de adicona monta a resposta com o parametro res
        Atendimentos.adiciona(atendimento,res)
   })

   app.patch('/atendimentos/:id', (req, res) =>{
       const id = parseInt(req.params.id)
       const valores = req.body

       Atendimentos.altera(id,valores,res)
   })

   app.delete('/atendimentos/:id' , (req,res) =>{
       const id = parseInt(req.params.id)

       Atendimentos.delete(id, res)
   })

}


