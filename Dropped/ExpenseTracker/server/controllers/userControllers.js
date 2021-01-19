const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')
require('dotenv').config()

router.post('/register', async (req,res) => {
    const {name, email, password} = req.body

    try {
        const userExist = await User.findOne({email})
        if(userExist) return res.status(400).json({ msg: "Email is already exists" })
        
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const user = new User({email , name, password: hash})
        await user.save()
        res.json({ msg: "User Saved successfully" })
        
    } catch (error) {
        res.status(400).json({ error, msg:"User Creation failed" })
    }
})

router.post('/login', async (req, res)=>{
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user) return res.status(401).json({ msg: "cannot find user in db" })
        
        const result = await bcrypt.compare(password, user.password)
        if(!result) return res.status(400).json({ msg: "password not matched" })
        
        const payload = {userId : user._id}
        const token = jwt.sign(payload, process.env.jwtSecretKey , { expiresIn: '18h' })
        user.token = user.token.concat(token)
        await user.save()            
        res.json({token, user})        

    } catch (error) {
        res.status(400).json({ error, msg:"User LogIn failed" })
    }
})

router.get('/me', auth, (req,res)=> res.send(req.user))

router.post("/logout", auth, async (req, res)=>{
    const {user, token} = req
    
    try {
        user.token =  user.token.filter(t => t!=token)
        await user.save()
        res.json({ msg: "User Logged Out successfully" })
    } catch (error) {
        res.status(400).json({ error, msg:"User LogOut failed" })
    }
})

module.exports = router