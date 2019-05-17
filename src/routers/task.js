const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.post('/tasks', (req, res)=> {
  const task = new Task(req.body)
  task.save().then((user) => {
    res.status(201).send(user)
  }).catch((error)=> {
    res.status(400).send(error)
  })
})

router.get('/tasks', (req, res)=> {

  Task.find({}).then((tasks) => {
    res.status(201).send(tasks)
  }).catch((error)=> {
    res.status(400).send(error)
  })
})

router.get('/tasks/:id', (req, res)=> {
  _id = req.params.id
  Task.findById(_id).then((task) => {
    res.status(201).send(task)
  }).catch((error)=> {
    res.status(400).send(error)
  })
})

router.patch('/tasks/:id', async(req, res) => {
	try{
		//const taskUpdate = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidator:true })
		const taskUpdate = await Task.findById(req.params.id)

		updates.forEach((update) => taskUpdate[update] = req.body[update])

		await taskUpdate.save()
		if(!taskUpdate) {
			return res.status(400).send()		
		}
		res.status(200).send(taskUpdate)

	} catch(e) {
		res.status(400).send(e)	
	}
})

router.delete('/tasks/:id', async (req, res) => {
	try{
		const deleteTask = await Task.findByIdAndDelete(req.params.id)
		if(!deleteTask) {
			return res.status(400).send()				
		}
		res.status(200).send(deleteTask)
	} catch(e) {
		res.status(400).send(e)		
	}
})

module.exports = router

