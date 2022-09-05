const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");


dotenv.config({path: './config.env'})

const PORT = process.env.PORT;


//mongoDB Atlas connection
// const DB = process.env.DATABASE;
// mongoose.connect(DB).then(()=>{
//     console.log(`connection successfull`);
// }).catch((err)=>console.log(`no connection`));
require('./db/conn');
app.use (express.json()) // FOR GEETING JSON IN CONSOLE
const User = require ('./models/userSchema');
const router = require('./routers/auth');
app.use (require('./routers/auth'));



//middleware
// const middleware = (req, res, next)=>{
//     console.log(`hi`);
//     next();

// }

// middleware(); 


app.get('/', (req, res)=>{
    res.send('Hello World From Server')
});
app.get('/about', (req, res)=>{
    res.send('Hello World From About Server')
});
app.get('/contact', (req, res)=>{
    res.send('Hello World From Contact Server')
});

app.listen(PORT,()=>{
    console.log(`server is running at port no ${PORT}`);
});