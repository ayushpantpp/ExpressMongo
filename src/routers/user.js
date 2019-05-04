const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/users', async (req, res)=> {
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

router.get('/users', async(req, res)=> {
  try {
    const users = await User.find({ })
	console.log(users)
    res.status(200).send(users)

  } catch (e) {
    res.status(400).send(e)
  }
})

router.patch('/users/:id', async(req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name','email','password','age']
	const isValid = updates.every((update) => allowedUpdates.includes(update))
	if(!isValid) {
			return res.status(404).send()	
	}
	try{
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidator:true })
		if(!user) {
			return res.status(404).send()	
		}
		res.send(user)
		} catch(e) {
			console.log(e)	
			res.status(400).send(e)	
		}
})


router.get('/users/:id', (req, res)=> {
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

router.delete('/users/:id', async (req, res)=> {
	try{
		const deleteUser = await User.findByIdAndDelete(req.params.id)
		if(!deleteUser) {
			 return res.status(400).send()		
		}
		res.status(200).send(deleteUser)
	} catch(e) {
		res.status(400).send(e)	
	}
	
})


module.exports = router
