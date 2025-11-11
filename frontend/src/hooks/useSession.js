import {useMutation, useQuery} from "@tanstack/react-query"
import toast from "react-hot-toast"
import { sessionApi } from "../api/session"

export const useCreateSession = ()=>{
    const result = useMutation({
        mutationKey:['createSession'],
        mutationFn:sessionApi.createSession,
        onSuccess: ()=> toast.success("Session created successfully!"),
        onError:(error)=>toast.error(error.response?.data?.message || 'Failed to create room.')
    })
    return result;
}

export const useActiveSession = ()=>{
    const result = useQuery({
        queryKey:['activeSessions'],
        queryFn: sessionApi.getActiveSessions,
    })

    return result;
}

export const useMyRecentSession = ()=>{
    const result = useQuery({
        queryKey:['recentSessions'],
        queryFn: sessionApi.getMyRecentSessions,
    })

    return result;
}

export const useSessionById = (id)=>{
    const result = useQuery({
        queryKey:['Session',id],
        queryFn:()=> sessionApi.getSessionById(id),
        enabled : !!id,
        refetchInterval: 5000
    })

    return result;
}

export const useJoinSession = (id)=>{
    const result = useMutation({
        mutationKey:['joinSession',id],
        mutationFn: ()=> sessionApi.joinSession(id),
        onSuccess : ()=> toast.success('Joined session successfully'),
        onError: ()=> toast.error(error.response?.data?.message || 'Failed to join session')
    })

    return result;
}

export const useEndSession = (id)=>{
    const result = useMutation({
        mutationKey:['endSession',id],
        mutationFn: ()=> sessionApi.endSession(id),
        onSuccess : ()=> toast.success('Session successfully ended'),
        onError: ()=> toast.error(error.response?.data?.message || 'Failed to join session')
    })

    return result;
}