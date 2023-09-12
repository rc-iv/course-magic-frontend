// src/components/Login/Login.tsx
import React from "react";
import Button from "../Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: (userInfo: {
    firstName: string;
    lastName: string;
    email: string;}) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleLoginClick = async (event?: React.MouseEvent) => {
    event?.preventDefault(); // Prevent default form submission

    // Perform validation
    if (!email || !password) {
      setValidationMessage("Both email and password are required.");
      return;
    }

    try {
      const response = await fetch(
        "https://n2v4kawif7.execute-api.us-east-1.amazonaws.com/dev/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        // Store the token in local storage
        localStorage.setItem("token", data.token);
        // replace this stub info with the new return from the login endpoint
        const userInfo = {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
        };
        onLogin(userInfo);
        navigate("/dashboard"); // Navigate to dashboard
      } else {
        setValidationMessage(data.message || "An error occurred.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setValidationMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="mx-auto my-16 p-4 md:w-1/3 text-white">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-bold mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-bold mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {validationMessage && (
        <p className="text-red-500 mb-4">{validationMessage}</p>
      )}
      <div className="mb4">
        <Button
          text="Login"
          bgColor="bg-yellow-300"
          textColor="text-indigo-900"
          onClick={handleLoginClick}
        />
      </div>
      <div className="mt-4">
        <span className="text-sm">Don't have an account? </span>
        <a href="/signup" className="text-indigo-500 hover:text-indigo-700">
          Sign Up
        </a>
        <div>
          <span className="text-sm">Forgot Password? </span>
          <a
            href="/forgot-password"
            className="text-indigo-500 hover:text-indigo-700"
          >
            Reset
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
