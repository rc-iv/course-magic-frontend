import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { on } from "events";

interface HeaderProps {
  userLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userLoggedIn, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Add this line

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogoout = () => {
    onLogout();
    handleNavigation("/login");
  }

  return (
    <header className="p-4 bg-yellow-500">
      <div className="flex justify-between items-center">
        <div className="flex-grow flex items-center">
          <Link to="/">
            <div className="text-4xl font-bold text-indigo-900">
              <img
                src={logo}
                alt="CourseMagic Logo"
                className="w-16 h-16 mr-2"
              />
              CourseMagic
            </div>
          </Link>
        </div>
        <div className="flex space-x-2">
          <div className="px-2">
            {userLoggedIn ? (
              <Button
                text="Logout"
                bgColor="bg-red-500"
                textColor="text-white"
                onClick={onLogout}
              />
            ) : (
              <Button
                text="Login"
                bgColor="bg-indigo-900"
                textColor="text-white"
                onClick={() => handleNavigation("/login")}
              />
            )}
          </div>
          <div className="px-2">
            {userLoggedIn ? (
              <Button
                text="Dashboard"
                bgColor="bg-red-500"
                textColor="text-white"
                onClick={() => handleNavigation("/dashboard")}
              />
            ) : (
              <Button
                text="Sign Up Free"
                bgColor="bg-indigo-900"
                textColor="text-white"
                onClick={() => handleNavigation("/signup")}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
