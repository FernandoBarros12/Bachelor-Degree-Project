const mysqlmeasurmentCtrl = {};
const pool = require('../database');
const fs = require('fs');
const path = require('path');



mysqlmeasurmentCtrl.getMeasurments =  async (req,res) =>{
    const rows = await pool.query('select nombre,person_email,valor_co2,comentario,categoria,lugar,type,data,ID_medicion from persona left join medicion on persona.email = medicion.person_email order by medicion.ID_medicion desc;');
    const data = rows.map(img =>{
        let extension = img.type.split('/')[1]
        fs.writeFileSync(path.join(__dirname,'../dbimages/' + img.ID_medicion +'.'+extension),img.data)
        const namefile =  img.ID_medicion +'.'+extension
        const {nombre,ID_medicion,valor_co2,comentario,categoria,lugar} = img
        const id = img.ID_medicion
        const newData = {
            id,
            nombre,
            valor_co2,
            comentario,
            categoria,
            lugar,
            namefile
        }
        return newData;
    })
     //const imageDir = fs.readdirSync(path.join(__dirname,'../dbimages/'))
     console.log(data)
    res.json(data)
} 

mysqlmeasurmentCtrl.createMeasurment = async (req,res) =>{
    const type = req.file.mimetype
    const filename = req.file.originalname
    const data = fs.readFileSync(path.join(__dirname,'../images/') + req.file.filename)

    const {comentario ,categoria ,lugar} = req.body;
    const valor_co2 = parseFloat(req.body.valor_co2);
    const person_email = req.body.email;
    const {nombre, email} = req.body;
    const measuring = {person_email,valor_co2,comentario,categoria,lugar,type,filename,data}
    const user = {email,nombre}
    const registrado = await pool.query('SELECT * FROM persona where email = ?',[email])
    if (registrado.length===0){
        console.log("Estas dentro")
         await pool.query('INSERT INTO persona set ?',[user]);
    }
    await pool.query('INSERT INTO medicion set ?',[measuring]);

    res.json({mesage:"Nota guardada"})
    console.log(req.body)
    
};

mysqlmeasurmentCtrl.getMeasurment = async (req, res) => {
    if(req.params.id){
        const data = await pool.query(`select nombre,person_email,valor_co2,comentario,categoria,lugar,type,ID_medicion from persona left join medicion on persona.email = medicion.person_email where medicion.ID_medicion = ${req.params.id} order by medicion.ID_medicion desc;`)
        const newData = data.map(newdata=>{
            let extension = newdata.type.split('/')[1]
            let namefile = newdata.ID_medicion + '.'+ extension
            const {nombre,valor_co2,comentario,categoria,lugar}= newdata
            const sendData = {
                nombre,
                valor_co2,
                comentario,
                categoria,
                lugar,
                namefile
    
            }
            return sendData
        })
        console.log(newData)
        res.json(newData)   
    }
}

module.exports = mysqlmeasurmentCtrl;