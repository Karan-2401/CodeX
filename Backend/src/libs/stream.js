const { StreamChat } = require('stream-chat');  // Import the StreamChat SDK
const env = require('./ENV');

// Load API Key and Secret from environment variables
const apiKey = env.STREAM_API_KEY;
const apiSecret = env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    console.error('STREAM_API_KEY or STREAM_API_SECRET is missing');
    process.exit(1);  // Exit if API key/secret is missing
}

// Use StreamChat.getInstance() to initialize the client with both API key and secret
const chatClient = StreamChat.getInstance(apiKey, apiSecret);  // Correct for v9+ SDK

const upsertStreamUser = async (userData) => {
    try {
        // Create or update a user
        await chatClient.upsertUser(userData);
        return userData;
    } catch (error) {
        console.error('Error upserting user:', error);
    }
};

const deleteStreamUser = async (userId) => {
    try {
        // Delete a user
        await chatClient.deleteUsers(userId);
        console.log('Stream user deleted successfully:', userId);
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

module.exports = { chatClient, upsertStreamUser, deleteStreamUser };
