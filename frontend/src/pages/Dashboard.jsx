import React from "react";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import {
  useActiveSession,
  useCreateSession,
  useMyRecentSession,
} from "../hooks/useSession";
import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import ActiveSession from "../components/ActiveSession";
import StatsCard from "../components/StatsCard";
import  RecentSession  from "../components/RecentSession";
import CreateSessionModel from "../components/CreateSessionModel";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });
  const createSessionMutation = useCreateSession();
  const { data: activeSessionData, isLoading: loadingActiveSessions } =
    useActiveSession();
  const { data: recentSessionData, isLoading: loadingRecentSessions } =
    useMyRecentSession();

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;
    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          navigate(`/session/${data.session._id}`);
        },
      }
    );
  };

  const activeSession = activeSessionData?.session || [];
  const recentSession = recentSessionData?.sessions || [];
  const isUserInSession =  (session,userx)=>{
    if(!userx?.id) return false;
    return session.host?.clerkId === userx.id || session.participant?.clerkId === userx.id
  }

  return (
    <>
      <div className="min-h-screen bg-base-300">
        <Navbar />
        <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />
        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatsCard activeSessionCount={activeSession.length} recentSessionCount={recentSession.length}/>
            <ActiveSession 
            sessions={activeSession}
            isLoading={loadingActiveSessions}
            isUserInSession={isUserInSession}
            />
          </div>
          <RecentSession sessions={recentSession} isLoading={loadingRecentSessions}/>
        </div>
      </div>
      <CreateSessionModel
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
};

export default Dashboard;
