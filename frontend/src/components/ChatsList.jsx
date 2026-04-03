import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import UsersLoadingSkeleton from './UsersLoadingSkeleton.jsx'
import NoChatsFound from './NoChatsFound.jsx'


const ChatsList = () => {

    const { getMyChatPartners, chats, isUserLoading, setSelectedUser } = useChatStore()

    useEffect(
        () => {
            getMyChatPartners()
        }
        , [])

    if (isUserLoading) {
        return <UsersLoadingSkeleton />
    }

    if (chats.length === 0) {
        return <NoChatsFound />
    }
    console.log("This is my chat: ", chats)
    return (


        <>

            {chats.map((chat) => {
                return <div key={chat._id}
                    className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
                    onClick={() => setSelectedUser(chat)}>

                    <div className="flex items-center gap-3">
                        <div className={`avatar online `}>
                            <div className="size-12 rounded-full">
                                <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
                            </div>
                        </div>
                        <h4 className="text-slate-200 font-medium truncate">{chat.fullname}</h4>
                    </div>
                </div>
            })}
        </>
    )
}

export default ChatsList