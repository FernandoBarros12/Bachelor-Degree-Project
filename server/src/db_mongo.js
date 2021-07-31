const mongoose=require('mongoose')

const uri = process.env.MONGODB_URI;

const db=mongoose.connection;

mongoose.connect(uri,{

    useNewUrlParser:true,

    useUnifiedTopology:true

});



db.on('open',__dirname => {

    console.log('Database is connect to');

})



db.on('error',err=>{

    console.log(err)

})

