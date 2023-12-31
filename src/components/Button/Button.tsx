import React from 'react';

interface ButtonProps {
  text: string;
  bgColor: string;
  textColor: string;
  disabled?: boolean;
  onClick?: () => void;  // Add this line
}

const Button: React.FC<ButtonProps> = ({ text, bgColor, textColor, onClick, disabled=false }) => {
  return (
    <button
      className={`px-4 py-2 m-1 rounded-md shadow-sm shadow-indigo-500 ${bgColor} ${textColor} hover:bg-white hover:text-indigo-900 font-medium transition-colors duration-500`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;