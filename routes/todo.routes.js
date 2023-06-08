const express = require('express');
const toDoController = require('../controllers/todo.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = express.Router();

router.use(authMiddleware)

router
    .route('/')
    .post(toDoController.getAll);

router
    .route('/create')
    .post(toDoController.createOne)

router
    .route('/:id')
    .get(toDoController.getOne)
    .patch(toDoController.updateOne)
    .delete(toDoController.deleteOne)


module.exports = router;