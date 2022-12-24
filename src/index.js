const express = require('express')
const mongoose = require('mongoose')
const route = require('../src/router/route')

const app = express()

app.use(express.json());
mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://ashishingle:root@assignment.rkryykd.mongodb.net/Backend-Project')
.then(() => console.log("MongoDB is Connected"))
.catch((error) => console.log(error))


app.use('/', route)

app.listen( 3000, function(){
    console.log("Express App is Running on 3000 Port")
})

