const {chatClient} = require('../libs/stream')
async function getToken(req,res) {
    try {
        const token = chatClient.createToken(req.user.clerkId)
        res.status(200).json({
            token,
            userId:req.user.clerkId,
            userName:req.user.name,
            userImage:req.user.image,
        })
    } catch (error) {
        
    }
}

module.exports = getToken