const mongoose = require("mongoose")

const conn = async()=>{
    //mongoAtlas
    const atlas = await mongoose.connect("mongodb+srv://userNovo:henzo123@fiaptecnico.jioi3.mongodb.net/todo_list")
}

module.exports = conn