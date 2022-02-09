const express = require('express');

const router = express.Router();
const { getAllUsers, createUser, createExercise, getLog } = require('../controllers/userControllers')

router.route('/').get(getAllUsers);
router.route('/').post(createUser);
router.route('/:id/exercises').post(createExercise);
router.route('/:id/logs').get(getLog)

module.exports = router