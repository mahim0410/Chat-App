import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'

const LogInForm = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signin, isSigningIn } = useAuthStore()


    const handleSignin = () => {

        try {
            let data = {
                email: email,
                password: password
            }
            signin(data)

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <div className="hero  min-h-screen ">
                <div className="hero-content flex-col lg:flex-row-reverse ">
                    <div className="text-center lg:text-left w-1/2">
                        <h1 className="text-5xl font-bold">Log in Now!</h1>
                        <p className="py-6">
                            Create your account today and get instant access to a faster, smarter, and more personalized platform built to help you achieve more. Don’t wait—your journey starts the moment you hit “Sign Up.”
                        </p>
                    </div>
                    <div className="card  w-1/2 shadow-2xl ">
                        <div className="card-body">
                            <fieldset className="fieldset">

                                <label className="label">Email</label>
                                <input type="email" className="input w-3/4" placeholder="skippermark03@gmail.com" value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                                <label className="label">Password</label>
                                <input type="password" className="input w-3/4" placeholder="Enter your password" value={password} onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                                <div><Link className="link link-hover" to={"/login"}>Don't have an account? Sign up</Link></div>
                                <button className="btn btn-neutral mt-5 font-semibold" onClick={handleSignin}>Sign in</button>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div></div>
    )
}

export default LogInForm