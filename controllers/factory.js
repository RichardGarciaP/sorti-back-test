const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getOne = (Model) => 
    catchAsync(async (req, res, next) => {
        const doc = await Model.findOne({where:{id: req.params.id}})
        
        if(!doc){
            return next(new AppError('Recurso no encontrado', 404))
        }
        
        return res.status(200).json({
            status: 'success',
            data:doc            
        })
    });

exports.getAll = (Model) => 
    catchAsync(async (req, res, next) => {
        // const doc = await Model.findAll({where:{userId: req.user.id}})
        const doc = await Model.findAll()

        
        res.status(200).json({
            status: 'success',
            data:doc            
        })
    });

exports.createOne = (Model) => 
    catchAsync(async (req, res, next) => {
        const doc = await Model.create(req.body)
            
        res.send(200).json({
            status: 'success',
            data:doc            
        })
    });

exports.updateOne = (Model) => 
    catchAsync(async (req, res, next) => {
        const doc = await Model.update(req.body, {where:{id: req.params.id}})
        
        if(!doc){
            return next(new AppError('Recurso no encontrado', 404))
        }
            
        res.status(200).json({
            status: 'success',
            data:doc            
        })
    });

exports.deleteOne = (Model) => 
    catchAsync(async (req, res, next) => {
        const doc = await Model.destroy({where:{id: req.params.id}})
        
        if(!doc){
            return next(new AppError('Recurso no encontrado', 404))
        }
            
        res.status(200).json({
            status: 'success',
            data:doc            
        })
    });