const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res)=> {
  const user = new User(req.body)
  try {
    await user.save()
    res.status(201).send(user)
  } catch (error) {
    res.status(400).send(error)
  } 

  // user.save().then(() => {
  //   res.status(201).send(user)
  // }).catch((error)=> {
  //   res.status(400).send(error)
  // })
})

app.get('/users', async (req, res)=> {
  try {
    await User.find({ })
    res.status(200).send(users)

  } catch (e) {
    res.status(400).send(e)
  }
})

app.get('/users/:id', (req, res)=> {
  const _id = req.params.id
  
  User.findById(_id).then((user)=> {
    if(!user) {
      return res.status(404).send()
    }

    res.send(user)
  }).catch((error)=> {
    res.status(400).send(error)
  })
})

app.post('/tasks', (req, res)=> {
  const task = new Task(req.body)
  task.save().then(() => {
    res.status(201).send(user)
  }).catch((error)=> {
    res.status(400).send(error)
  })
})

app.get('/tasks', (req, res)=> {

  Task.find({}).then((tasks) => {
    res.status(201).send(tasks)
  }).catch((error)=> {
    res.status(400).send(error)
  })
})

app.get('/tasks/:id', (req, res)=> {
  _id = req.params.id
  Task.findById(_id).then((task) => {
    res.status(201).send(task)
  }).catch((error)=> {
    res.status(400).send(error)
  })
})

app.listen(port, ()=> {
  console.log('Server is running')
})