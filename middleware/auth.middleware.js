const {promisify} = require('util');
const jwt = require('jsonwebtoken');

const AppError = require("../utils/appError");
const {JWT_SECRET} = require('../config/config.env');
const {Users} = require('../models/conection')
const catchAsync = require('../utils/catchAsync');

module.exports = catchAsync(async ( req, res, next) => {
    let token;
    if(
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')    
    ){
        token = req.headers.authorization && req.headers.authorization.split(' ')[1]
    }


    if(!token){
        return next(new AppError('You are not logged in! Please log in', 401))
    }

    const decodedToken = await promisify(jwt.verify)(token, JWT_SECRET )

    const currentUser = await Users.findOne({where:{id: decodedToken.id}})

    if(!currentUser){
        return next(new Error('The user belonging to this token no longer exists.', 401))
    }

    req.user = decodedToken.id;
    next();
})