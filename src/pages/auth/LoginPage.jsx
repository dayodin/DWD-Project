import React from "react";
import { Link, useNavigate } from "react-router";
import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { sendPostRequest } from "../../helpers/sendPostRequest";

import "./UsernamePasswordForm.css"

export default function LoginPage({ onLogin, setUser }) {
    const navigate = useNavigate();

    const handleLoginSubmit = async ({ username, password }) => {
        console.log("Logging in:", username, password);
        try {
            const response = await sendPostRequest("/auth/login", { username, password });
            
            if (response.status === 200) {
                const data = await response.json();
                const token = data.token;

                console.log("Authentication token:", token);
                
                setUser(username)
                onLogin(token);
                navigate("/");
                return null;
            } else if (response.status === 401) {
                return "Incorrect username or password";
            } else if (response.status === 500) {
                return "Server error, please try again later.";
            } else {
                return "Unexpected error, please try again.";
            }
        } catch (error) {
            console.error("Login error:", error);
            return "Server error, please try again later.";
        }
    };
    
    
    return (
        <div className="form">
            <h2>Login</h2>
            <UsernamePasswordForm onSubmit={handleLoginSubmit} />
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
}