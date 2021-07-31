const measurementCtrl = {

};



const Measumerent = require('../models/Measurement')



measurementCtrl.getmeasurements = async (req, res) => {

    const meas = await Measumerent.find();

    res.json(meas);

}



measurementCtrl.getmeasurement = async (req, res) => {

    const oneMea = await Measumerent.findById(req.params.id);

    res.json(oneMea);

}



measurementCtrl.postmeasurements = (req,res) => res.json({message: "Creado"});



measurementCtrl.putmeasurements = (req, res) => res.json({update:"actualizado"})



measurementCtrl.deletemeasurents = (req,res) => res.json({delete:"measurement"});



module.exports = measurementCtrl