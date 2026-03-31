import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import axios from "axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isSigningIn: false,


    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check", { withCredentials: true });
            set({ authUser: res.data });
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
            toast.success("Log in Successful")
        } catch (error) {
            toast.error(error.res.data.message)
        } finally {
            set({ isSigningIn: false })
        }

    },

    logout: async () => {
        try {
            await axios.get("http://localhost:3000/api/auth/logout")
            set({ authUser: null });
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
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true
                }

            );
            toast.success("Profile pic updated successfully")
        } catch (error) {
            console.log("Error in update profile", error)
        }
    }
}));