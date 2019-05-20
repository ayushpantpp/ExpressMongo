const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, (req, res)=> {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  }) 
  task.save().then((user) => {
    res.status(201).send(user)
  }).catch((error)=> {
    res.status(400).send(error)
  })
})

router.get('/tasks', auth, async (req, res)=> {
  const match = {} 
  if(req.query.completed) {
    match.completed = req.query.completed === 'true'
  }
  try {
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort: {
          createdAt: -1
        }
      }
    }).execPopulate()
    res.send(req.user.tasks)
  } catch(e) {
    res.status(500).send()
  }
})

router.get('/tasks/:id', auth, async (req, res)=> {
  const _id = req.params.id
  try {
    const task = await Task.findOne({ _id , owner: req.user._id })
    if(!task){
      return res.status(404).send()
    }
    res.send(task)
  } catch(e) {
    res.status(500).send()				
  }
})

router.patch('/tasks/:id', auth, async(req, res) => {
  const updates = Object.keys(req.body)
  // const allowedUpdates = ['description','completed']
  try{
    const taskUpdate = await Task.findOne({ _id: req.params.id, owner: req.user._id})
    if(!taskUpdate) {
      return res.status(400).send()		
    }
    updates.forEach((update) => taskUpdate[update] = req.body[update])

    await taskUpdate.save()
    res.status(200).send(taskUpdate)

  } catch(e) {
    res.status(400).send(e)	
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  try{
    const deleteTask = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    if(!deleteTask) {
      return res.status(400).send()				
    }
    res.status(200).send(deleteTask)
  } catch(e) {
    res.status(400).send(e)		
  }
})

module.exports = router

