const localStrategy = require('passport-local').Strategy
const User = require('../model/user')
const bcrypt = require('bcrypt')

exports.initializePassport = (passport)=>{

    const authenticateUser = async (email, password, done)=>{
        const user = await User.findOne({email:email})
        if(!user){
            console.log("User not found");
            return done(null, false, {message:"User not found"})
        }
        try {
            const isValidPwd = await bcrypt.compare(password, user.password)
            if(isValidPwd){
                console.log("Password is valid")
                return done(null, user)
            }else{
                console.log("Wrong Password")
                return done(null, false, {message:"Wrong Password"})
            }
        } catch (error) {
            return done(error)
        }

    }
    passport.use(new localStrategy({usernameField:"email", passwordField:"password"}, authenticateUser))

    passport.serializeUser((user, done)=>{done(null, user.id)})
    
    passport.deserializeUser(async(id, done)=>{
        const user = await User.findById(id)
        done(null, user) 
    })

};