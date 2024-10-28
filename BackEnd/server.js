import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { corsOptions } from './constants/constants.js';
import todoRoute from './Routes/todoRoute.js'
const PORT = process.env.PORT || 5000

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors(corsOptions));
app.use('/api/todos', todoRoute)
const __dirname = path.resolve()
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/FrontEnd/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'FrontEnd','build','index.html'))
    })
}

app.listen(PORT,()=>{
try{
    mongoose.connect(process.env.MONGODB_URI)
    console.log('server started and Connected with mongo db....')
}catch(err){
console.log(err)
}

})
