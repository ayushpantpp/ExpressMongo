const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')
const userSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type:String,
    unique:true,
    required: true,
    trim: true,
    lowercase:true,
    validate(value) {
      if(!validator.isEmail(value)) {
          throw new Error('Age is must')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if(value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "Password"')
      }
    }
  },
  age: {
    type: Number,
    validate(value) {
      if(value < 0) {
        throw new Error('Age must be a +ve number')
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  avatar: {
    type: Buffer
  }
}, {
  timestamps: true
})

userSchema.virtual('tasks', {
  ref: 'Task',
  localField:'_id',
  foreignField:'owner'
})

userSchema.methods.genrerateAuthToken = async function () {
  const user = this
  const token = jwt.sign({
    _id: user.id.toString()},'thisismytestcode')
  user.tokens = user.tokens.concat({ token })
  user.save()
  return token

}

userSchema.methods.toJSON = function (){
  const user = this
  const userObject = user.toObject()
  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar
  return userObject

}

userSchema.statics.findByCredential = async (email, password) => {
  const isValiduser = await User.findOne({ email })
  if(!isValiduser) {
    throw new Error('Unable to login')
  }
  console.log(isValiduser.password);
  console.log(password);
  const isPasswordValid = await bcrypt.compare(password , isValiduser.password)
  if(!isPasswordValid) {
    throw new Error('Unable to login')
  } 
  return isValiduser
}

userSchema.pre('save', async function(next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password,8)
  }
  next()
})

userSchema.pre('remove', async function (next) {
  const user = this
  await Task.deleteMany({ owner: user._id })
  next()
})

const User = mongoose.model('User', userSchema)


module.exports = User