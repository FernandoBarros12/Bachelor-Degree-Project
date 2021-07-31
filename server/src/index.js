require('dotenv').config();
require('./db_mongo.js');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { get } = require('./app');
const multer = require('multer');
const path = require('path');

//Intializations
const app = express();

const diskstore = multer.diskStorage({
    destination: path.join(__dirname, 'images'),
    filename : (req, file, cb) =>{
        cb(null, Date.now() + '-' +file.originalname)
    }
})

//Settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(multer({
    storage: diskstore
}).single('image'))
app.use(express.static(path.join(__dirname, './dbimages')))
console.log(path.join(__dirname,'dbimages'))

//Global Variables
app.use((req,res,next)=>{
    next();
})

//Routes
app.use('/api/measurement',require('./routes/measurement'));
app.use('/api/mongo-mediciones',require('./routes/mongo_mediciones'));

//Starting the server
app.listen(app.get('port'),() =>{
    console.log('Server listening on port', app.get('port'));
});