const { requireAuth } = require('@clerk/express');
const User = require('../models/User')

const protectRoute = [
    requireAuth(),
    async (req,res,next)=>{
        try {
            const clerkId = req.auth().userId;
            if(!clerkId) return res.status(401).json({msg:"Unauthorized - invalid token"})
            const user = await User.findOne({clerkId})
            if(!user){
                return res.status(404).json({"msg":"User not found"})
            }

            req.user =user;
            next()
        } catch (error) {
            console.error('error in protect',error)
            res.status(500).json({"msg":"Internal server error"})
        }
    }
]

module.exports = protectRoute