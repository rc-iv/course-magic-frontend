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
    navigate("/");
    onLogout();
  }

  return (
    <header className="p-4 bg-gradient-to-r from-yellow-500 to-yellow-400">
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
        <div className="flex">
          <div className="">
            {userLoggedIn ? (
              <Button
                text="Logout"
                bgColor="bg-red-500"
                textColor="text-white"
                onClick={handleLogoout}
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
          <div className="">
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
