const jwt = require('jsonwebtoken');
const bycript = require('bcryptjs')

const {JWT_SECRET, JWT_TOKEN_DURATION} = require('../config/config.env')


exports.encryptPassword = async (password) => {
    salt = await bycript.genSalt(10)
    return await bycript.hash(password, salt)
}

exports.comparePassword = async(passsword, savedPassword) =>  {
    return await bycript.compare(passsword, savedPassword)
}


exports.signToken = (id) => {
    return jwt.sign({id}, JWT_SECRET, {expiresIn: JWT_TOKEN_DURATION })
}