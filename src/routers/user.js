const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')


router.post('/users', async (req, res)=> {
  const user = new User(req.body)
  try {
    await user.save()
    const token = await user.genrerateAuthToken()
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  } 
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredential( req.body.email, req.body.password)
    const token = await user.genrerateAuthToken()
    res.send({user, token})
  } catch(e) {
    res.status(400).send()
  }

})

//single Screen logout
 router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
 })

//All screen logout

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
 })

router.get('/users/me', auth , async(req, res)=> {
  res.send(req.user)
})

router.patch('/users/:id', async(req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name','email','password','age']
	const isValid = updates.every((update) => allowedUpdates.includes(update))
	if(!isValid) {
			return res.status(404).send()	
	}
	try{
    const user = await User.findById(req.params.id)
    updates.forEach(update => {
      user[update] = req.body[update]
    })
    await user.save()
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
