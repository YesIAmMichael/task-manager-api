const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Tad',
    email: 'tad@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

 beforeEach( async () => {
     await User.deleteMany()
     await new User(userOne).save()
 })

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Michael',
        email: 'michael@example.com',
        password: 'MyPass777!'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/user/login').send({
        email: userOne.email,
        password: 'thisisnotmypass'
    }).expect(404)
})

test('Should get profile for user', async () => {
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/user/me')
        .send()
        .expect(404)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})