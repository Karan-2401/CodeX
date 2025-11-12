
// ✅ Imports (ESM or CommonJS compatible)
const { StreamClient } = require('@stream-io/node-sdk');
const { StreamChat } = require('stream-chat');
const env = require('./ENV');

// ✅ Load API credentials
const apiKey = env.STREAM_API_KEY;
const apiSecret = env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error('STREAM_API_KEY or STREAM_API_SECRET is missing');
  process.exit(1);
}

// ✅ Initialize Chat and Video clients (server-side)
const chatClient = StreamChat.getInstance(apiKey, apiSecret);
const streamClient =new StreamClient(apiKey, apiSecret);

// ✅ Function: Create or update Stream user
const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log(`User upserted successfully: ${userData.id}`);
    return userData;
  } catch (error) {
    console.error('Error upserting user:', error);
    throw error;
  }
};

// ✅ Function: Delete Stream user
const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUsers([userId], { hard_delete: true });
    console.log(`Stream user deleted successfully: ${userId}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

module.exports = {
  chatClient,
  streamClient,
  upsertStreamUser,
  deleteStreamUser,
};
