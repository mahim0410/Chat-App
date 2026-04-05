import { axiosInstance } from "../lib/axios.js";  // ✅ use axiosInstance, not raw axios
import toast from "react-hot-toast";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    setActiveTab: (tab) => set({ activeTab: tab }),
    setSelectedUser: (selectedUser) => set({ selectedUser }),

    getAllContacts: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axiosInstance.get("/message/contacts")  // ✅
            set({ allContacts: Array.isArray(res.data) ? res.data : [] })  // ✅ don't use .message
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            set({ isUserLoading: false })
        }
    },

    getMyChatPartners: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axiosInstance.get("/message/chats")  // ✅
            set({ chats: Array.isArray(res.data) ? res.data : [] })  // ✅ safe array check
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")  // ✅ optional chaining
        } finally {
            set({ isUserLoading: false })
        }
    },

    getMessagesByUserId: async (userId) => {
        set({ isMessagesLoading: true })
        try {
            const res = await axiosInstance.get(`/message/${userId}`)  // ✅
            set({ messages: Array.isArray(res.data) ? res.data : [] })  // ✅ don't use .message
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")  // ✅
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get()
        const { authUser } = useAuthStore.getState()

        // optimistic update
        const optimisticMessage = {
            _id: `temp-${Date.now()}`,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            img: messageData.img,          // ✅ use "img" to match your schema
            createdAt: new Date().toISOString(),
            isOptimistic: true,
        }

        set({ messages: [...messages, optimisticMessage] })

        try {
            const res = await axiosInstance.post(  // ✅
                `/message/send/${selectedUser._id}`,
                messageData
            )
            // ✅ replace optimistic message with real one from server
            set({
                messages: messages
                    .filter(m => m._id !== optimisticMessage._id)
                    .concat(res.data)   // ✅ res.data directly, not res.data.message
            })
        } catch (error) {
            set({ messages })  // revert optimistic update
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get()
        if (!selectedUser) return

        const socket = useAuthStore.getState().socket
        if (!socket) return  // ✅ guard against null socket

        socket.on("newMessage", (message) => {  // ✅ check your backend event name
            if (message.senderId !== selectedUser._id.toString()) return
            set({ messages: [...get().messages, message] })
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket
        if (!socket) return  // ✅ guard against null socket
        socket.off("newMessage")  // ✅ must match event name in subscribeToMessages
    },
}))