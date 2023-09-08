// src/components/Login/Login.tsx
import React from "react";
import Button from "../Button/Button";
import { useState } from "react";



const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const handleForgotPasswordSubmit = (event?: React.MouseEvent) => {
    event?.preventDefault();  // Prevent default form submission
    // TODO Perform validation
    if (email) {
      // TODO Perform forgot password
      setValidationMessage('Password reset email sent');
    }

  };
  return (
    <div className="container mx-auto my-16 p-4 w-1/3 text-white">
      <h1 className="text-4xl font-bold mb-8">Reset Password</h1>
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
      {validationMessage && <p className="text-red-500 mb-4">{validationMessage}</p>}
      <Button
        text="Login"
        bgColor="bg-yellow-300"
        textColor="text-indigo-900"
        onClick={handleForgotPasswordSubmit}
      />
    </div>
  );
};

export default ForgotPassword;
