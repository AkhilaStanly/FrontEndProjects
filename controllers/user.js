const User = require('../model/user')
const Movie = require('../model/movie')
const bcrypt = require('bcrypt')

exports.loginUser=(req,res,next)=>{
    res.render('login', {pageTitle:"Login", path:'/login'})
}

exports.postLogin =(req,res,next)=>{
    const userdata = req.body
    User.findOne({email:userdata.email, password:userdata.password}, (err, user)=>{
        if(err)throw err

        if(!user){
            console.log("Invalid User")
            res.render('login', {pageTitle:"Login", path:'/login'})
        }else{
            console.log(user)
            Movie.find()
                .then(movies => {res.render('movie',{pageTitle:"Movie", movies:movies, path:'/'})
            })
        }
    })

}

exports.registerUser=(req,res,next)=>{
    res.render('register', {pageTitle:"Register", path:'/login'})
}

exports.postRegister = async (req,res)=>{

    const email = req.body.email
    //const password = req.body.password
    const hpassword = await bcrypt.hash(req.body.password, 10) //salt set as 10

    let user = new User({email:email, password:hpassword})
    user.save((err, registeredUser)=>{
        if(err)throw err
        console.log(registeredUser)
        res.render('login', {pageTitle:"Login", path:'/login'})
    })
}

exports.userlogout = (req, res)=>{
    req.logout()
    res.redirect('/login')
}