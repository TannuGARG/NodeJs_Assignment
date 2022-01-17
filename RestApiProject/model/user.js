const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// we have defined how r schema must look like
userSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String ,unique:true},
    Phone:{type:Number},
    Password: {type: String, required: true},
    ConfirmPassword:{type: String, required: true}

})
userSchema.pre("save",async function(next){
    console.log(`current password is ${this.Password}`)
    this.Password = await bcrypt.hash(this.Password,10);
    this.ConfirmPassword=undefined;
    next();
})

//created a collection named User
const Register = mongoose.model("Register", userSchema);

module.exports = Register;