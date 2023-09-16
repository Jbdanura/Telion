const usersRouter = require("express").Router()
const User = require("../models/user.js")
const bcrypt = require("bcrypt")
require('dotenv').config({ path: './secret/.env' })
const jwt = require("jsonwebtoken")

usersRouter.get("/",async(req,res)=>{
    return res.status(200).send("e")
})

usersRouter.post("/register",async(req,res)=>{
    try {
        const {username,email,password} = req.body
        if(username.length < 3 || username.length > 10) return res.status(400).send("Username length must be between 3 and 10 characters")
        if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) return res.status(400).send("Invalid email")
        if(password.length < 5 || password.length > 20) return res.status(400).send("Password must be between 5 and 20 characters long")
        let user = await User.findOne({where:{username}})
        if(user) return res.status(400).send("Username has already been taken")
        user = await User.findOne({where:{email}})
        if(user) return res.status(400).send("Email has already been taken")
        const passwordHash = await bcrypt.hash(password,10)
        const newUser = await User.create({username,email,password:passwordHash})
        await newUser.save()
        return res.status(200).send(newUser)
    } catch (error) {
        console.log(error)
        return res.status(400).send("Error in user creation")
    }
})

usersRouter.post("/login",async(req,res)=>{
    try {
        const {username,password} = req.body
        if(username.length < 3 || username.length > 10) return res.status(400).send("Username length must be between 3 and 10 characters")
        if(password.length < 5 || password.length > 20) return res.status(400).send("Password must be between 5 and 20 characters long")
        let user = await User.findOne({where:{username}})
        if(!user) return res.status(400).send("Invalid user/password combination") /*not sending 404 to avoid user enumeration*/
        const samePassword = await bcrypt.compare(password,user.password)
        if(!samePassword) return res.status(400).send("Invalid user/password combination")
        const token = jwt.sign({ id: user.id },process.env.SECRET,{expiresIn: 86400});
        return res.status(200).send({
            id:user.id,
            username:user.username,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send("Error in user log in")
    }
})

module.exports = usersRouter