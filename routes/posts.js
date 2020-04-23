const express = require('express')
const PostModel = require('../models/pots')

const router = express.Router()

router.use((req, res, next) => {
    console.log("posts routes");

    next()

})

router.get('/',async (req, res,next) => {
    try{

    constposts=await PostModel.find({}).populate('author')

       
    }   
    catch(err){
    next(err)
    }
  

    // res.send('list posts')

})
router.get('/:id', async (req, res,next) => {
 try{
 const post = await PostModel.findById(req.params.id)
 return res.json(post)

 }
 catch(err){
        next(err)
 }


    // res.send(`listing  posts with id=${id}`)

})
router.post('/', async(req, res,next) => {
const {title,body,author}=req.body
const PostInstance= new PostModel({
    title,
    body,
    author,



})


 try{
  const post = await PostInstance.save()
     return res.json(post)
    
}
catch(err)
{ next(err)}

})
router.patch('/:id', async (req, res,next) => {

    try{  const post= await PostModel.findByIdAndUpdate(req.params.id,{$set:req.body})
        
            return   res.json(post)
    
           
        }
        catch(err)
        {
            next(err)
        }
    
      })


router.delete('/:id',async (req, res) => {
    try{
     const post = await PostModel.findByIdAndDelete(req.params.id)
    
            return   res.json(post)
    
       }   
  catch(err){    
           next(err)
  }


})

module.exports = router