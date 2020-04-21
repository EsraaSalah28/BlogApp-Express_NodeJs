const mongoose=require('mongoose')
const PostSchema=new mongoose.Schema({
title:{type:String,required: true,maxlength:20,minlength:3},
body:{type:String,required: true},
author:{type:String,required: true}

})

const PostModel=mongoose.model('Post',PostSchema)
module.exports=PostModel