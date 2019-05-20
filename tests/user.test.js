const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const user1ID = new mongoose.Types.ObjectId()
const User1 = {
  _id: user1ID,
  name:"Ayush Pant",
  email:"ayushpant@gmail.com",
  password: "ilovenode",
  tokens: [{
    token: jwt.sign({ _id: user1ID }, process.env.JWT_SCERET)
  }]
}

beforeEach(async () => {
  await User.deleteMany()
  await new User(User1).save()
})

test('Should SIgn up a new user ', async () => {
  await request(app).post('/users').send({
    name:"Ayus Pant Other",
    email:"ayushpantpp@gmail.com",
    password: "ilovenode"
  }).expect(201)
})

test('Should Login User ', async () => {
  await request(app).post('/users/login').send({
    email:User1.email,
    password: User1.password
  }).expect(200)
})

test('Should not Login User for wrong credential ', async () => {
  await request(app).post('/users/login').send({
    email:User1.emailnode,
    password: User1.password
  }).expect(400)
})

test('Should get user profile ', async () => {
  await request(app).get('/users/me').
    set('Authorization', `Bearer ${User1.tokens[0].token}`).
    send().
    expect(200)
})

test('Should not get get user profile for unauthorized', async () => {
  await request(app).get('/users/me').
    send().
    expect(401)
})

test('Should get to delete user ', async () => {
  await request(app).delete('/users/me').
    set('Authorization', `Bearer ${User1.tokens[0].token}`).
    send().
    expect(200)
})

test('Should not delete user if not authorized', async () => {
  await request(app).delete('/users/me').
    send().
    expect(401)
})

test('Upload avatar', async () => {
    await request(app)
    .post('/users/me/avatar').
    set('Authorization', `Bearer ${User1.tokens[0].token}`)
    .attach('avatar','tests/fixtures/profile-pic.jpg').
    expect(200)
  })