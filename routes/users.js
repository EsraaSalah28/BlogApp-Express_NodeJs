const express = require('express')
const UserModel = require('../models/users')
const PostModel =require('../models/pots')
const router = express.Router()

router.use((req, res, next) => {
    console.log("user routes");

    next()

})

router.get('/',  async(req, res,next) => {
 try{
     const users = await UserModel.find({})
     return  res.json(users)
    }
       
catch (err)
{
        next(err)
}
    })

    // res.send('list users')


router.get('/:id',async (req, res, next) => {
    const routeParams = req.params
    const {
        id
    } = routeParams
 try{
     const user = await UserModel.findById(id)
        
         return   res.json(user)
 }
        catch (err)
        {

        next(err)
        }
    })
    // res.send(`listing users with id=${id}`)


router.post('/', (req, res) => {
    debugger
    // get request body ==> req.body
    const {FirstName,LastName,password,dob,gender,email,phoneNo} = req.body

    // construct user instance from usermodel
    const userInstance = new UserModel({
     FirstName,
     LastName,
     password,
     dob,
     gender,
     email,
     phoneNo,
     

    })
    // save user instance in db
    try { 
     const user = await userInstance.save()
        return res.json(user)

        
    }
    catch(err)
    {
    next(err)
    
    }// res.send(" creating instance ")
})
router.patch('/:id',async (req, res,next) => {
   try{ 
 const user = await  UserModel.findByIdAndUpdate(req.params.id,{$set:req.body})

        return   res.json(user)


       }
       catch(err)
       {

       next(err)
       }

  })
   
    // res.send(`updating user with useId =${req.params.id}`)


router.delete('/:id',  async(req, res, next) => {
    try {
    const user = await UserModel.findByIdAndDelete(req.params.id)
    
            return   res.json(user)
    
           }
     catch (err)
     {
           next(err)
     }
    
    
    // res.send(`deleting user with useId =${req.params.id}`)


})
router.get('/users/:id/posts', async(req,res,next)=>{

try{

    const posts= PostModel.find({'author':req.params.id})
     return res.json(posts)
}
catch(err)
{
  next(err)

}



})

module.exports = router