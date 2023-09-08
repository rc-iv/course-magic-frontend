import React from 'react';

interface ButtonProps {
  text: string;
  bgColor: string;
  textColor: string;
  onClick?: () => void;  // Add this line
}

const Button: React.FC<ButtonProps> = ({ text, bgColor, textColor, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md ${bgColor} ${textColor} hover:bg-white hover:text-indigo-900`}
      onClick={onClick}  // Add this line
    >
      {text}
    </button>
  );
};

export default Button;