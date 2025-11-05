const StreamChat = require('stream-chat')
const env = require('./ENV')

const apiKey = env.STREAM_API_KEY
const apiSecret = env.STREAM_API_SECRET

if(!apiKey || !apiSecret){
    console.error('STREAM_API_KEY or STREAM_SECRET_KEY is missing')
}

const chatClient = StreamChat.getInstance(apiKey,apiSecret)

const upsertStreamUser = async(userData)=>{
    try {
        await chatClient.upsertUser(userData)
        return userData
    } catch (error) {
        console.error(error)
    }
}

const deleteStreamUser = async(userId)=>{
    try {
        await chatClient.deleteUsers(userId)
        console.log('stream user deleted successfully : ', userId)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {chatClient, upsertStreamUser, deleteStreamUser}