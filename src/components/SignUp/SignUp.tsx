import React, { useState } from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

interface SignUpProps {
  onLogin: (userInfo: {
    firstName: string;
    lastName: string;
    email: string;
  }) => void;
}

const registerUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const response = await fetch(
    "https://n2v4kawif7.execute-api.us-east-1.amazonaws.com/dev/users/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      }),
    }
  );

  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.message || "An error occurred");
  }

  return data;
};

const SignUp: React.FC<SignUpProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setValidationMessage("Passwords do not match");
      return;
    }
    try {
      const { message } = await registerUser(email, password, firstName, lastName);
      console.log(`Registration successful: ${message}, for email: ${email}`);
      const userInfo = {
        firstName: firstName,
        lastName: lastName,
        email: email,
      };
      onLogin(userInfo);
      navigate("/dashboard"); // Navigate to dashboard
    } catch (error: any) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      reportError({ message });
    }
  };

  return (
    <div className="container mx-auto my-16 p-4 w-1/3 text-white">
      <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="first-name">
          First Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
          id="first-name"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="last-name">
          Last Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
          id="last-name"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-bold mb-2"
          htmlFor="confirm-password"
        >
          Confirm Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
          id="confirm-password"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {validationMessage && (
        <p className="text-red-500 mb-4">{validationMessage}</p>
      )}
      <div className="mb-4">
        <Button
          text="Sign Up"
          bgColor="bg-yellow-300"
          textColor="text-indigo-900"
          onClick={handleSignUp}
        />
      </div>
      <div>
        <p>
          Already Registered?{" "}
          <a href="/login" className="text-indigo-500 hover:text-indigo-700">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
