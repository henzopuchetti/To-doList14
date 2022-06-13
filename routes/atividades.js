const { request } = require("express")

module.exports = (app)=>{
    app.post("/atividades",async(req,res)=>{
        var dados = req.body
        //console.log(dados)
        //conectar com o database
        const database = require("../config/database")()
        //importar o model atividades
        const atividades = require("../models/atividades")
        //gravar as informações do formulario no database
        var gravar = await new atividades({
            data:dados.data,
            tipo:dados.tipo,
            entrega:dados.entrega,
            disciplina:dados.disciplina,
            instrucoes:dados.orientacoes,
            usuario:dados.id,
            titulo:dados.titulo,
        }).save()
        //buscar as atividades do usuario
        var buscar = await atividades.find({usuario:dados.id})
        //recarregar a página atividades
        res.redirect("/atividades?id="+dados.id)
    })
    app.get("/atividades", async(req,res)=>{
        //listar todas as atividades do usuario logado
        var user = req.query.id
        if(!user){
            res.redirect("/login")
        }
        var usuarios = require("../models/usuarios")
        var atividades = require("../models/atividades")

        var dadosUser = await usuarios.findOne({_id:user})
        var dadosAbertos = await atividades.find({usuario:user,status:"0"}).sort({data:1})

        var dadosEntregues = await atividades.find({usuario:user,status:"1"}).sort({data:1})


        var dadosExcluidos = await atividades.find({usuario:user,status:"2"}).sort({data:1})



        res.render("atividades.ejs",{nome:dadosUser.nome,id:dadosUser._id,dadosAbertos,dadosEntregues,dadosExcluidos})

         //res.render("atividades.ejs",{nome:dadosUser.nome,id:dadosUser._id,lista:dadosAtividades})
    })
    app.get("/excluir", async(req,res)=>{
        
        //qual o documento será excluido da collection atividades?
        var doc = req.query.id
        //excluir o documento
        var atividades = require("../models/atividades")

        var excluir = await atividades.findOneAndUpdate(
            {_id:doc},
            {status:"2"}
        )
        //voltar para a lista de atividades
        res.redirect("/atividades?id="+excluir.usuario)
    })
    
    //rota entregue
    app.get("/entregue", async(req,res)=>{
        
        //qual o documento será excluido da collection atividades?
        var doc = req.query.id
        //excluir o documento
        var atividades = require("../models/atividades")

        var entregue = await atividades.findOneAndUpdate(
            {_id:doc},
            {status:"1"}
        )
        //voltar para a lista de atividades
        res.redirect("/atividades?id="+entregue.usuario)
    })
}