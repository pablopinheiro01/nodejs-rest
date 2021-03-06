const moment = require('moment')
const conexao = require('../infraestrutura/conexao')


class Atendimento{

    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD-MM-YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome:'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome:'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres'
            }
        ]

        //so preencho os erros se o meu campo ehvalido não for valido
        const erros = validacoes.filter( campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }else{
            //evitar side efect
            const atendimentoDatado = {...atendimento, dataCriacao, data}

            const sql = 'INSERT INTO Atendimentos SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultados) =>{
                if(erro){
                    console.log(erro)
                    res.status(400).json(erro)
                }else{
                    console.log("Gravando...")
                    console.log(resultados)
                    res.status(201).json({atendimento})
                }
            })
        }
    }

    lista(res){

        const sql = 'SELECT * FROM atendimentos'

        conexao.query(sql, (erro,resultados) => {
            if(erro){
                console.log("GET error listas.")
                res.status(400).json(erro)
            }else{
                console.log("Deu bom GET listas")
                console.log(resultados)
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultados) =>{
            const atendimento = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res) {
        const sql = "update atendimentos SET ? WHERE id=?"

        if(valores.data){
         valores.data = moment(valores.data, 'DD-MM-YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        conexao.query(sql, [valores, id], (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({...valores, id})
            }
        })


    }

    delete(id, res){
        const sql = "delete from atendimentos where id = ?"

        conexao.query(sql, id, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({id})
            }
        })
    }

}

module.exports = new Atendimento()