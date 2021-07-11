const {Router} = require('express');
const router = Router();



const {getMeasurments, createMeasurment, getMeasurment}=require('../controllers/mysqlmeasurements.controllers');

router.route('/')
    .get(getMeasurments)
    .post(createMeasurment)

router.route('/:id')
    .get(getMeasurment)

module.exports = router;