import React from "react";
import { useNavigate } from "react-router-dom";
import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { sendPostRequest } from "../../helpers/sendPostRequest";
import "./UsernamePasswordForm.css";

interface RegisterPageProps {
  onLogin: (token: string | null) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleRegisterSubmit = async ({ username, password }: { username: string; password: string; }): Promise<string | null> => {
    console.log("Registering:", username, password);
    try {
      const response = await sendPostRequest("/auth/register", { username, password });
      console.log(response.status);
      if (response.status === 201) {
        navigate("/");
        return null;
      } else if (response.status === 400) {
        return "Username already taken";
      } else {
        return "Unexpected error, please try again.";
      }
    } catch (error) {
      console.error("Registration error:", error);
      return "Server error, please try again later.";
    }
  };

  return (
    <div className="form">
      <h2>Register a New Account</h2>
      <UsernamePasswordForm onSubmit={handleRegisterSubmit} />
    </div>
  );
};
