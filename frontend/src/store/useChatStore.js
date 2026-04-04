import axios from "axios";
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
    setSelectedUser: (selectedUser) => set({ selectedUser: selectedUser }),


    getAllContacts: async () => {
        set({ isUserLoading: true, })
        try {
            const res = await axios.get("http://localhost:3000/api/message/contacts", { withCredentials: true })
            set({ allContacts: res.data.message })
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            set({ isUserLoading: false })
        }
    },

    getMyChatPartners: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axios.get("http://localhost:3000/api/message/chats", { withCredentials: true })
            set({ chats: res.data })
        } catch (error) {
            toast.error(error.response.data.message)

        } finally {
            set({ isUserLoading: false })
        }
    },


    getMessagesByUserId: async (userId) => {
        set({ isMessagesLoading: true })
        try {
            const res = await axios.get(`http://localhost:3000/api/message/${userId}`, { withCredentials: true })
            set({ messages: res.data.message })

        } catch (error) {
            toast.error(error.response.data.message)


        } finally {
            set({ isMessagesLoading: false })
        }
    },


    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        const { authUser } = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true, // flag to identify optimistic messages (optional)
        };
        // immidetaly update the ui by adding the message
        set({ messages: [...messages, optimisticMessage] });



        try {
            const res = await axios.post(`http://localhost:3000/api/message/send/${selectedUser._id}`, messageData, { withCredentials: true });
            set({ messages: messages.concat(res.data.message) });
        } catch (error) {
            // remove optimistic message on failure
            set({ messages: messages });
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    },

}))




