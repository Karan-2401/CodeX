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

export const useJoinSession = ()=>{
    const result = useMutation({
        mutationKey:['joinSession'],
        mutationFn: sessionApi.joinSession,
        onSuccess : ()=> toast.success('Joined session successfully'),
        onError: ()=> toast.error(error.response?.data?.message || 'Failed to join session')
    })

    return result;
}

export const useEndSession = ()=>{
    const result = useMutation({
        mutationKey:['endSession'],
        mutationFn:  sessionApi.endSession,
        onSuccess : ()=> toast.success('Session successfully ended'),
        onError: ()=> toast.error(error.response?.data?.message || 'Failed to join session')
    })

    return result;
}