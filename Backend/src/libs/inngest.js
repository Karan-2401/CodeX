const {Inngest} = require('inngest');
const databaseConnection = require('./db-connection')
const User = require('../models/User');
const { upsertStreamUser, deleteStreamUser } = require('./stream');

const inngest = new Inngest({ id: "codex" });
const syncUser = inngest.createFunction({
    id:"sync-user"
},
{event:"clerk/user.created"},
async ({event})=>{
    await databaseConnection()
    const {id,email_addresses,first_name,last_name,image_url} = event.data
    const newUser = {
        clerkId:id,
        email:email_addresses[0].email_address,
        name:`${first_name || ""}${last_name || ""}`,
        profileImage : image_url,
    }
    await User.create(newUser)
    await upsertStreamUser({
        id: newUser.clerkId.toString(),
        name:newUser.name,
        image:newUser.profileImage
    })
})


const DeleteUser = inngest.createFunction({
    id:"deleteuserfromdatabase"
},
{event:"clerk/user.delete"},
async ({event})=>{
    await databaseConnection()
    const {id} = event.data
    
    await User.deleteOne({clerkId:id})
    await deleteStreamUser(id.toString())
})

module.exports = {
  inngest,
  functions: [syncUser, DeleteUser],
};