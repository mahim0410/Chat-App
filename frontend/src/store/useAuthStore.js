import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL = "http://localhost:3000";


export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isSigningIn: false,
    socket: null,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check", { withCredentials: true });
            set({ authUser: res.data });
            get().connectSocket();

        } catch (error) {
            console.log("Error in the authCheck", error)
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axios.post("http://localhost:3000/api/auth/signup", data, { withCredentials: true })
            set({ authUser: res.data });
            get().connectSocket()
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response.data.message)

        } finally {
            set({ isSigningUp: false })
        }


    },

    signin: async (data) => {
        try {
            set({ isSigningIn: true })
            const res = await axios.post("http://localhost:3000/api/auth/login", data, { withCredentials: true })
            set({ authUser: res.data });
            get().connectSocket()
            toast.success("Log in Successful")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isSigningIn: false })
        }

    },

    logout: async () => {
        try {
            await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true })
            set({ authUser: null });
            get().disconnectSocket()
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Error logging out");
            console.log("Logout error:", error);
        }
    },

    updateProfile: async (data) => {
        try {
            await axios.put(
                "http://localhost:3000/api/auth/update-profile",
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true
                }

            );
            set({ authUser: res.data })
            toast.success("Profile pic updated successfully")
        } catch (error) {
            console.log("Error in update profile", error)
        }
    },


    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            withCredentials: true, // this ensures cookies are sent with the connection
        });

        // socket.connect();

        set({ socket });

        // listen for online users event
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },

}));