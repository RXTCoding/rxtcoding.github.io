// I've set up a skeleton index.js here with all the basic
// info I would include in my index.js. We have not brought
// in any controllers yet or set up any endpoints. Everything
// else you'll notice is very similar to previous warmups and
// lectures.

// IMPORTS
require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env

// CONTROLLERS
const authCtrl= require ('./controllers/authCtrl')
const productCtrl= require ('./controllers/productCtrl')
const cartCtrl= require('./controllers/cartCtrl')

// APP INSTANCE CREATED
const app = express()

// TOP LEVEL MIDDLEWARE
app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000 *60 *60 *24}
}))

// DATABASE CONNECTION
massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
})
.then(db =>{
  app.set('db', db)
  console.log("Database Connected")
  app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`))
}).catch(err => console.log(err))


// ENDPOINTS
//Authentication
app.post ('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.get('/api/logout', authCtrl.logout)
app.get('/api/me', authCtrl.getUser)

//Products
app.get('/api/products', productCtrl.getProducts)

//Cart
app.get('/api/mycart', cartCtrl.getCart)
app.put('/api/additem/:product_id', cartCtrl.addToCart)//<--param must match req.params in controller "product_id" instead of "id"
app.delete('/api/delete/:product_id', cartCtrl.deleteItemFromCart)
app.put('/api/newquantity/:product_id', cartCtrl.changeItemQty)