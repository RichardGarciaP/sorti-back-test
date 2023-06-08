
const factory = require('./factory');
const {ToDos} = require('../models/conection');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { Op } = require('sequelize');

exports.getAll =  catchAsync(async (req, res, next) => {
    if(!req.user){
        return next(new AppError('Necesitas iniciar sesion', 401))
    }

    const doc = await ToDos.findAll({where:{userId: req.user}})
    
    res.status(200).json({
        status: 'success',
        data:doc            
    })
});

exports.createOne = catchAsync(async (req, res, next) => {
    const {title, description}  = req.body;
    if(!title || !description){
        return next(new AppError('Informacion no enviada', 400))
    }


    const doc = await ToDos.create({title, description,  status:'pending', userId: req.user})

    if(!doc){
        return next(new AppError('Elemento no guardado', 400))
    }

    const data = await ToDos.findAll({where:{userId: req.user}})


    res.status(200).json({
        status: 'success',
        data            
    })
});


exports.getOne = factory.getOne(ToDos);
exports.updateOne = factory.updateOne(ToDos);
exports.deleteOne = factory.deleteOne(ToDos);
