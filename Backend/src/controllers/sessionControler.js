const Session = require("../models/Session");
const {chatClient, streamClient} = require('../libs/stream')
async function createSession(req, res) {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;
    if (!problem || !difficulty) {
      return res
        .status(400)
        .json({ message: "problem and difficulty both fields are required" });
    }

    const callId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`;
    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });
    const call = streamClient.video.call('default', callId);
    await call.getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: { problem, difficulty, sessionId: session._id.toString() },
      },
    });

    const channel = chatClient.channel('messaging', callId, {
      name: `${problem} Session`,
      created_by_id: clerkId,
      members: [clerkId],
    });

    await channel.create();
    res.status(201).json({ session });
  } catch (error) {
    console.log("error in session controler", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getActiveSession(req, res) {
  try {
    const session = await Session.find({ status: "active" })
      .populate("host", "name profileImage")
      .populate("participant", "name profileImage")
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({ session });
  } catch (error) {
    console.log("error in getActiveSession controler", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getMyRecentSession(req, res) {
  try {
    const userId = req.user._id;
    const session = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({ session });
  } catch (error) {
    console.log("error in getMyRecentSession controler", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getSessionById(req, res) {
  try {
    const { id } = req.params;
    const session = Session.findById(id)
      .populate("host", "name email profileImage clerkId")
      .populate("participant", "name email profileImage clerkId");

    if (!session) res.status(404).json({ message: "Session not found" });
    res.status(200).json({ session });
  } catch (error) {
    console.log("error in getSessionById controler", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function joinSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findById(id);
    if (!session) res.status(404).json({ message: "Session not found" });
    if (session.participant)
      res.status(404).json({ message: "Session is full" });
    session.participant = userId;
    await session.save();

    const channel = chatClient.channel("messaging", session.callId);
    channel.addMembers([clerkId]);
    res.status(200).json({ session });
  } catch (error) {
    console.log("error in joinSession controler", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function endSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const session = await Session.findById(id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    // check if user is the host
    if (session.host.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Only the host can end the session" });
    }

    // check if session is already completed
    if (session.status === "completed") {
      return res.status(400).json({ message: "Session is already completed" });
    }

    // delete stream video call
    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    // delete stream chat channel
    const channel = chatClient.channel("messaging", session.callId);
    await channel.delete();

    session.status = "completed";
    await session.save();

    res.status(200).json({ session, message: "Session ended successfully" });
  } catch (error) {
    console.log("Error in endSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  joinSession,
  endSession,
  getActiveSession,
  getMyRecentSession,
  getSessionById,
  createSession,
};
