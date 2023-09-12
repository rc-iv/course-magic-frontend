// src/App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import FeatureSection from "./components/FeatureSection/FeatureSection";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login"; // <-- Import the Login component
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Dashboard from "./components/Dashboard/Dashboard";
import Course from "./components/Course/Course";
import Document from "./components/Document/Document";

const App: React.FC = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState({ firstName: "", lastName: "", email: "" });

  const handleLogin = (userInfo: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    setUser(userInfo);
    setUserLoggedIn(true);
  };

  const handleLogout = () => {
    setUserLoggedIn(false);
    setUser({ firstName: "", lastName: "", email: "" });
  };

  return (
    <Router>
      <div className="App flex flex-col min-h-screen m-auto">
        <Header userLoggedIn={userLoggedIn} onLogout={handleLogout} />
        <main className="flex-grow bg-gradient-to-r from-indigo-950 to-indigo-800">
          <Routes>
            <Route path="/" element={<FeatureSection />} />
            <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/dashboard"
              element={<Dashboard user={user} isLoggedIn={userLoggedIn} />}
            />
            <Route
              path="/course"
              element={<Course user={user} isLoggedIn={userLoggedIn} />}
            />
            <Route
              path="/document"
              element={<Document isLoggedIn={userLoggedIn} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
