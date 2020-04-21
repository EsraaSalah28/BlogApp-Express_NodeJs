const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')
const postRouter = require('./routes/posts')
const log = require('./middlewares/log')
const logRequestBody = require('./middlewares/logRequestBody')

mongoose.connect('mongodb://localhost:27017/blog-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) return console.log("started connection on mongod");

  console.log(err);


})
const app = express()

app.listen(5000, (err) => {
  if (!err) return console.log('start sever on port 5000');
  console.log(err);
})
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('public'))
app.use(log)
app.use(logRequestBody)
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use((err, req, res, next) => {
  debugger
  res.status(500).send(err)
})