const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
  name : {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type:String,
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
  }
})

module.exports = User