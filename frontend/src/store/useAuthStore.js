import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"
import { io } from "socket.io-client"

const BASE_URL = import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : window.location.origin  // ✅ works on Render

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isSigningIn: false,
    socket: null,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({ authUser: res.data })
            get().connectSocket()
        } catch (error) {
            console.log("Error in the authCheck", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data)  // ✅
            set({ authUser: res.data })
            get().connectSocket()
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed")
        } finally {
            set({ isSigningUp: false })
        }
    },

    signin: async (data) => {
        set({ isSigningIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data)  // ✅
            set({ authUser: res.data })
            get().connectSocket()
            toast.success("Log in Successful")
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed")
        } finally {
            set({ isSigningIn: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")  // ✅
            set({ authUser: null })
            get().disconnectSocket()
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error("Error logging out")
            console.log("Logout error:", error)
        }
    },

    updateProfile: async (data) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile", data, {  // ✅
                headers: { "Content-Type": "multipart/form-data" }
            })
            set({ authUser: res.data })
            toast.success("Profile pic updated successfully")
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed")
            console.log("Error in update profile", error)
        }
    },

    connectSocket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return

        const socket = io(BASE_URL, {  // ✅ uses correct URL per environment
            withCredentials: true,
            transports: ["websocket", "polling"]
        })

        set({ socket })

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds })
        })
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect()
    },
}))