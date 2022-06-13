const atividades = require("./atividades")

module.exports=(app)=>{
    //abrir arquivo login.ejs
    app.get("/login",(req,res)=>{
        res.render("login.ejs")
    })
    //validar o usuario e senha
    app.post("/login",async(req,res)=>{
        //recuperar as infromações digitadas no formulario
        var dados = req.body
        //conectar com o banco de dados
        var database = require("../config/database")()
        //selecionar a model usuarios
        var usuarios = require("../models/usuarios")
        //verificar se o email esta cadastrado
        var verificar = await usuarios.findOne({email:dados.email})
        if(!verificar){
            return res.send("email nao cadastrado!")
        }
        var cript = require("bcryptjs")
        var comparar = await cript.compare(dados.senha,verificar.senha)
        if(!comparar){
            return res.send("senha invalida!")
        }
        //redirecionar para a rota atividades (precisa enviar o id)
        res.redirect("/atividades?id="+verificar._id)
    })
}
