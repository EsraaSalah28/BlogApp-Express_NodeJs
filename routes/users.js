const express = require('express')
const UserModel = require('../models/users')

const router = express.Router()

router.use((req, res, next) => {
    console.log("user routes");

    next()

})

router.get('/', (req, res) => {

    UserModel.find({}, (err, users) => {

        if (!err) {
          return  res.json(users)

        }

        next(err)

    })

    // res.send('list users')

})
router.get('/:id', (req, res) => {
    const routeParams = req.params
    const {
        id
    } = routeParams

    UserModel.findById(id,(err,user)=>{
        if (!err) {
         return   res.json(user)

        }

        next(err)

    })
    // res.send(`listing users with id=${id}`)

})
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
       userInstance.save((err,user)=>{
       if(!err) return res.json(user)
       next(err)

       })
    // res.send(" creating instance ")
})
router.patch('/:id', (req, res) => {
   
  UserModel.findByIdAndUpdate(req.params.id,{$set:req.body},(err,user)=>{
    if (!err) {
        return   res.json(user)

       }

       next(err)
    

  })
   
    // res.send(`updating user with useId =${req.params.id}`)

})
router.delete('/:id', (req, res) => {
    UserModel.findByIdAndDelete(req.params.id,(err,user)=>{
        if (!err) {
            return   res.json(user)
    
           }
    
           next(err)

    })
    
    // res.send(`deleting user with useId =${req.params.id}`)


})

module.exports = router