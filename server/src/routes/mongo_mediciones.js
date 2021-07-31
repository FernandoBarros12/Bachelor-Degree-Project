const {Router} =require('express');

const router = Router();



const {getmeasurements, postmeasurements, putmeasurements, getmeasurement} = require('../controllers/mongo.controller')



router.route('/')

    .get(getmeasurements)

    .post(postmeasurements)

    .put(putmeasurements)



router.route('/:id')

    .get(getmeasurement)



module.exports = router