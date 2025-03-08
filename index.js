const express = require('express')
const bcrypt = require('bcrypt')
const PORT = process.env.PORT || 3000
const db = require('./db')
const app = express()

app.use(express.urlencoded({extended: false}))

app.use(express.static('public'))

app.get('/user', async (req, res) => {
  try {
    const [users] = await db.query(`SELECT * FROM users`)
    res.json(users)
  } catch(err) {
    res.status(500).send("error retrieving users:" + err.message || err.sqlMessage)
  }
})

app.post('/user', async (req, res) => {
  try {
    const { username, password } = req.body
    if (!(username && password))
      return res.status(400).send('must include username and password')

    // TODO: Hash password and insert user

    res.redirect('/user')
  } catch(err) {
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(409).send('User already exists')
    res.status(500).send('Error Creating User: ' + err.message || err.sqlMessage)
  }
})

app.post('/login', async(req, res) => {
  try {
    const { username, password } = req.body
    if (!(username && password))
      return res.status(400).send('must include username and password')

    // TODO: Retrieve User, compare hash

    res.json({...user, isCorrectPassword})
  } catch(err) {
    res.status(500).send('Error Creating User: ' + err.message || err.sqlMessage)
  }
})

app.listen(PORT, () => {
  console.log('listening on http://localhost:' + PORT)
})