const express = require("express")
const protectRoute = require('../middleware/protectRoute')
const route = express.Router()
const {createSession,getActiveSession,getMyRecentSession,joinSession,endSession,getSessionById} = require('../controllers/sessionControler')

route.post('/',protectRoute,createSession)
route.get('/active',protectRoute,getActiveSession)
route.get('/my-recent',protectRoute,getMyRecentSession)
route.get('/:id',protectRoute,getSessionById)
route.post('/:id/join',protectRoute,joinSession)
route.post('/:id/end',protectRoute,endSession)
module.exports = route