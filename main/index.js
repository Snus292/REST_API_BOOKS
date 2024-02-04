const db =require("../config/database")

let Person =require("./penson")
let Category =require("./category")

Person.sync({force:true})
Category.sync({force:true})