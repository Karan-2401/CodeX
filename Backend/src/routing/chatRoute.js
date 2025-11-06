const express = require('express');
const route = express.Router();
const getToken = require('../controllers/getToken')
const protectRoute = require('../middleware/protectRoute')

route.get("/token",protectRoute, getToken)

module.exports = route