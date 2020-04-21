const mongoose =require('mongoose')

const userSchema =new mongoose.Schema({
 FirstName: {type:String,required: true,maxlength:20,minlength:3},
 LastName: {type:String,required: true,maxlength:20,minlength:3},
 password: {type:String,required: true,maxlength:20,minlength:3},
 dob: {type:Date,required: true},
 gender:{type:String,enum:['m','f']},
 email:{type:String,match:/.+@.+\..+/},
 phoneNo: {type:String,required: true,maxlength:20,minlength:3},
 posts: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Post'
}]

})
userSchema.methods.getFullname =function getFullname()
{
  return this.FirstName+" "+this.LastName

}
userSchema.statics.getUsersByGender=function getUsersByGender(gender)
{  
 this.find({gender: gender},cb)

}

const userModel =mongoose.model('User',userSchema)
module.exports=userModel