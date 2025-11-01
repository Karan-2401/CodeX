const express = require('express');
const ENV = require('./libs/ENV')
const app = express();

app.get('/',(req,res)=>{
    res.status(200).json({msg:"hello"})
})

app.listen(ENV.Port,()=>{console.log('run run bhago 3001')})