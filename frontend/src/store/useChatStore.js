import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useChatStore = create((set) => ({
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
            const res = await axios.get("http://localhost:3000/api/message/contacts")
            set({ allContacts: res.data })
        } catch (error) {
            toast.error(error.res.data.message)

        } finally {
            set({ isUserLoading: false })
        }
    },

    getMyChatPartners: async () => {
        set({ isUserLoading: true, })
        try {
            const res = await axios.get("http://localhost:3000/api/message/chats", { withCredentials: true })
            set({ chats: res.data })
        } catch (error) {
            toast.error(error.response.data.message)

        } finally {
            set({ isUserLoading: false })
        }
    },
}))