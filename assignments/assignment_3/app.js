const express = require("express");
const faker = require("faker");
var bodyParser = require('body-parser');
const app = express();
const path=require("path")

app.use(express.static("public")); //middleware
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

var users = [];

for(let i = 0; i<5; i++){
    users.push({
        name:faker.name.findName(),
        email: faker.internet.email()
    })
}


// console.log(users)

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.get('/',(req, res)=>{
    //console.log(users);
    res.render('index', {users}) 
});

app.get('/form',(req, res)=>{
    res.render('form') 
});

app.post("/user/add", (req, res)=>{
    // console.log(req.body);
    users.push({
        email: req.body.email,
        name:req.body.NAME,
        

    })
    res.redirect('/');
    // console.log(users)
})

app.listen(3000, ()=>console.log("Server is listening"));