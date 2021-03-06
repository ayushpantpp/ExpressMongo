/* eslint-disable no-mixed-spaces-and-tabs */
const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp');
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/accounts')


router.post('/users', async (req, res)=> {
  const user = new User(req.body)
  try {
    await user.save()
    sendWelcomeEmail(user.email, user.name)
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

// router.patch('/users/:id', async(req, res) => {
// 	const updates = Object.keys(req.body)
// 	const allowedUpdates = ['name','email','password','age']
// 	const isValid = updates.every((update) => allowedUpdates.includes(update))
// 	if(!isValid) {
// 			return res.status(404).send()	
// 	}
// 	try{
//     const user = await User.findById(req.params.id)
//     updates.forEach(update => {
//       user[update] = req.body[update]
//     })
//     await user.save()
//     if(!user) {
// 			return res.status(404).send()	
// 		}
// 		res.send(user)
// 		} catch(e) {
// 			console.log(e)	
// 			res.status(400).send(e)	
// 		}
// })

router.patch('/users/me', auth ,async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name','email','password','age']
  const isValid = updates.every((update) => allowedUpdates.includes(update))
  if(!isValid) {
    return res.status(404).send()	
  }
  
  try {
    updates.forEach(update => {
      req.user[update] = req.body[update]
    })
    await req.user.save()
   	// eslint-disable-next-line no-mixed-spaces-and-tabs
   	res.send(req.user)
  } catch(e) {
    return res.status(404).send()	
  }
})

router.delete('/users/me', auth, async (req, res)=> {
  try{
    await req.user.remove()
    sendCancelEmail(req.user.email, req.user.name)
    res.status(200).send(req.user)
  } catch(e) {
    res.status(400).send(e)	
  }
})

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error('Wrong file type'))
    }
    cb(undefined, true)
    
  }
})

router.post('/users/me/avatar',auth, upload.single('avatar') ,upload.single('avatar') , async(req,res)=> {
  const buffer = await sharp(req.file.buffer).resize( {width: 250, height:250 }).png().toBuffer()
  req.user.avatar = buffer
  await req.user.save()
  res.send()
// eslint-disable-next-line no-unused-vars
}, (error, req, res, next)=> {
  res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth ,upload.single('avatar') , async(req,res)=> {
  req.user.avatar = undefined
  await req.user.save()
  res.send()
})

router.get('/users/:id/avatar', async(req,res)=> {
  try {
    const user = await User.findById(req.params.id)
    if(!user || !user.avatar) {
      throw new Error()
    }
    res.set('Content-Type', 'image/png')
    res.send(user.avatar)
  } catch(e) {
    res.status(400).send()
  }
})

module.exports = router
