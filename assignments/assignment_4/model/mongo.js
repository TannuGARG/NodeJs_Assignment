const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/assignment_4');
const schema = mongoose.Schema;

// async function main() {
const UsersSchema = new schema ({
    name:String,
    email: {
        type: String,
        unique: true // `email` must be unique
        },
    isPromoted: {
        type:Boolean,
        default:null
    }
});

let Users= mongoose.model("Users", UsersSchema);
module.exports=Users;
