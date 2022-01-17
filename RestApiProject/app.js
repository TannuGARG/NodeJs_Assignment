const express=require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose=require("mongoose");
const Posts=require("./model/post");
var jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const path = require('path');
const Registers = require("./model/user");
mongoose.connect("mongodb://localhost:27017/adduser");

const app=express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
const port=process.env.PORT||3002;
// parse application/json
app.use(bodyParser.json())
app.use(express.static('public'))
const static_path= path.join(__dirname,'views');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(static_path));
app.set('view engine', 'ejs');




app.get("/",(req,res)=>{
    res.render("login")

})

app.post("/register",async(req,res)=>{
        try{  
            const password=req.body.password;
            const cpassword=req.body.confirm;
            if(password===cpassword){
                const registerUser=new Registers({
                    Name:req.body.fname,
                    Email:req.body.email,
                    Phone:req.body.phone,
                    Password:req.body.password,
                    ConfirmPassword:req.body.confirm
                })
                await registerUser.save();
                res.render("select",{Name:req.body.fname , Email:req.body.email })
                

            }else{
                res.send("password is incorrect")
            }
            

            
        }catch(e){
            console.log(e)
        }     
});
app.post("/login",async(req,res)=>{

    try{
        const email=req.body.email;
        const password=req.body.password;

        const userEmail=await Register.findOne({Email:email});
        const post= await Posts.findOne({user:userEmail._id})
        // await console.log("gfd",post)
        const isMatch= await bcrypt.compare(password,userEmail.Password)
        if (isMatch){
            res.status(201).render("home",{userEmail:userEmail , post:post });
        }else{
            res.send("Wrong Password")
        }

    }catch(e){
        res.render("form")
    }
})

const post= await Posts.find()

app.listen(port,()=>{
    console.log(`server running at port ${port}`)

})

