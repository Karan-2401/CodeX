const express = require('express');
const ENV = require('./libs/ENV');
const path = require('path')
const app = express();
const databaseConnection = require('./libs/db-connection')
const cors = require('cors')
const {serve} = require('inngest/express')
const {inngest, functions} = require('./libs/inngest')
const {clerkMiddleware}= require('@clerk/express')
const protectRoute = require('./middleware/protectRoute')
const chatRoute = require('./routing/chatRoute')


// database connection
databaseConnection()
// database connection
app.use(express.json())
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use(clerkMiddleware())
app.use("/api/inngest",serve({client:inngest, functions }))

app.use("/api/chat",chatRoute)

const dirname = path.resolve()

// make our app ready for deployment
if(ENV.NODE == 'production'){
    app.use(express.static(path.join(__dirname,"../../frontend/dist")))
    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../../frontend","dist","index.html"))
    })
}

app.listen(ENV.PORT,()=>{console.log('run run bhago 3001')})