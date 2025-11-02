const express = require('express');
const ENV = require('./libs/ENV');
const path = require('path')
const app = express();
const databaseConnection = require('./libs/db-connection')

// database connection
databaseConnection()
// database connection





const dirname = path.resolve()

// make our app ready for deployment
if(ENV.NODE == 'production'){
    app.use(express.static(path.join(__dirname,"../../frontend/dist")))
    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../../frontend","dist","index.html"))
    })
}

app.listen(ENV.PORT,()=>{console.log('run run bhago 3001')})