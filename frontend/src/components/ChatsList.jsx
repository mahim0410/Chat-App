import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import UsersLoadingSkeleton from './UsersLoadingSkeleton.jsx'
import NoChatsFound from './NoChatsFound.jsx'

const ChatsList = () => {

    const { getMyChatPartners, chats, isUserLoading } = useChatStore()

    useEffect(
        getMyChatPartners
        , [])

    if (isUserLoading) {
        return <UsersLoadingSkeleton />
    }

    if (chats.length === 0) {
        return <NoChatsFound />
    }

    return (


        <div>


        </div>
    )
}

export default ChatsList