const express = require('express')
const app = express();
const mongoose = require('mongoose')

const bodyParser = require('body-parser');
const path = require('path')
const errorController = require('./controllers/error.js')

const passport = require('passport')
const session = require('express-session')
const {initializePassport} = require('./controllers/passport');

initializePassport(passport)

app.use(session({
    secret:"sesame",
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'public')))

app.set('view engine','ejs')
app.set('views','views')

const adminData = require('./routes/admin')
const movieRoutes = require('./routes/movie')
const userRoutes = require('./routes/user')

app.use('/admin', adminData)
app.use(movieRoutes)
app.use(userRoutes)

app.use(errorController.error404)

mongoose.connect("mongodb+srv://akhila:california@cluster0.dnne2.mongodb.net/myMoviesDB?retryWrites=true&w=majority")
.then(result => {
    app.listen(3000,()=>{console.log('listening on port 3000')});
}).catch(err=>{console.err(err)})

