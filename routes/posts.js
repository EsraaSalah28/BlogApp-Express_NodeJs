const express = require('express')
const PostModel = require('../models/pots')

const router = express.Router()

router.use((req, res, next) => {
    console.log("posts routes");

    next()

})

router.get('/', (req, res) => {

    PostModel.find({},(err,posts)=>{

        if(!err){
            return res.json(posts)
        }
        next(err)

    })

    // res.send('list posts')

})
router.get('/:id', (req, res) => {
    const routeParams = req.params
    const {
        id
    } = routeParams
    PostModel.findById(id,(err,post)=>{
        if (!err) {
         return   res.json(post)

        }

        next(err)

    })

    // res.send(`listing  posts with id=${id}`)

})
router.post('/', (req, res) => {
const {title,body,author}=req.body
const PostInstance= new PostModel({
    title,
    body,
    author,



})



PostInstance.save((err,post)=>{
    if(!err) return res.json(post)
       next(err)
})

})
router.patch('/:id', (req, res) => {

    PostModel.findByIdAndUpdate(req.params.id,{$set:req.body},(err,post)=>{
        if (!err) {
            return   res.json(post)
    
           }
    
           next(err)
        
    
      })

})
router.delete('/:id', (req, res) => {
    PostModel.findByIdAndDelete(req.params.id,(err,post)=>{
        if (!err) {
            return   res.json(post)
    
           }
    
           next(err)

    })

})

module.exports = router