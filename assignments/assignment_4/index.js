const express = require("express");
var methodOverride = require('method-override');
const Users = require("./model/mongo");
const faker = require("faker");
const bodyparser = require("body-parser");
const { seedValue } = require("faker");
const app = express();

const path = require('path')
app.use(methodOverride('_method'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static("public"));


app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');



app.get("/", async(req, res) =>{
    //write the code to fetch the data
    var data = await Users.find();
    res.render("form" , {data});
})




app.put("/User/:id/update", async (req, res) =>{
    const value = await Users.find({_id : req.params.id});
    await Users.updateOne({_id: req.params.id}, { $set: { isPromoted: !value[0].isPromoted }})
    res.redirect("/");
})
// // DELETE
app.delete("/User/:id/delete", async (req, res) =>{
    await Users.deleteOne({_id: req.params.id})
    res.redirect("/");
})

app.listen(3000, ()=> console.log("Server is listening"));

