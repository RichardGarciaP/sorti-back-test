const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const {Users} = require('../models/conection')
const {comparePassword, signToken, encryptPassword} = require('../utils/authUtils')
const { JWT_SECRET } = require('../config/config.env')

exports.signIn = catchAsync(async (req, res, next) => {
    const {username, password} = req.body;

    if(!username || !password){
        return next(new AppError('Please provide email and password', 400))
    }

    const user = await Users.findOne({where:{username}})



    if(!user || !( await comparePassword(password, user?.password))){
        return next(new AppError('Incorrect username or password', 401))
    }

    const token = signToken(user.id);

    user.password = undefined;


    res.status(200).json({
        status: 'success',
        token, 
        data:{
            user
        }
    })
})


exports.signUp = catchAsync(async (req, res, next)=>{
    const user = req.body;

    const userExist = await Users.findOne({where:{username: user.username}})
    if(userExist){
        return next(new AppError('El usuario ya existe!', 400))
    }

    const newUser = await Users.create(
        {
            ...user, 
            password: (await encryptPassword(user.password)),
            lastIpAddres: req.connection.remoteAddress.toString() ?? '192.168.0.1'

        })

    res.status(200).send({
        status: 200, 
        data:{
            newUser
        }
    })
})  

exports.validateToken = catchAsync(async (req, res, next)=>{
    if(!req.body.token){
        return next(new AppError('El token es necesario', 401));
    }

    const decodedToken = await promisify(jwt.verify)(
        req.body.token,
        JWT_SECRET     
    );

    const currentUser = Users.findOne({where:{id: decodedToken.user.id}})

    if (!currentUser) {
        return next(
          new AppError(
            'El usuario no tiene el token asociado',
            401
          )
        );
    }

    return res.status(200).json({
        status: 'success',
        message: 'Token no valido',
    });
})