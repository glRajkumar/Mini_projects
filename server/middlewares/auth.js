const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

async function auth(req, res, next) {
    try {
        const token = req.headers.authorization.replace('Bearer ', '')
        const payload = jwt.verify(token, process.env.jwtSecretKey)
        const userId = payload.userId

        const user = await User.findOne({ _id: userId, token: { $in: token } })
            .select("-password -token -__v")
        if (!user) return res.status(400).send("User was not found")

        req.user = user
        req.token = token
        next()
    }
    catch (error) {
        res.status(401).send("Auth token invalid")
    }
}

module.exports = auth