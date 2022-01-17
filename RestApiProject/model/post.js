const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema({
    title: { type: String, required: true },
    body : { type: String, required: true },
    img:   [{
        type: String
    }],
 
    user : {type: Schema.Types.ObjectId, ref: "Register"}
})

const Post = mongoose.model("Post", postSchema);

module.exports = Post;