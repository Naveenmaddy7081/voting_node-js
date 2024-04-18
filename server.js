const express =require('express');
const app = express();
const db =require('./db');
require('dotenv').config();



const bodyParser =require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const {jwtAuthMiddleware} = require('./jwt');


// import the router dat
const userRoutes =require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

// use the rotus
app.use('/user',userRoutes);
app.use('/candidate', candidateRoutes);



app.listen(3000 , ()=>{
    console.log('listening on port 3000');
})
