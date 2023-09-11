import React from "react";
import { useState } from "react";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../TermsOfService/TermsOfService";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Get the current year
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);

  const handlePrivacyPolicyClick = () => {
    setShowPrivacyPolicy(true);
  };

  const handleTermsOfServiceClick = () => {
    setShowTermsOfService(true);
  };

  return (
    <footer className=" bg-gradient-to-r from-yellow-500 to-yellow-400 text-indigo-900 py-4">
      <div className="container mx-auto text-center">
        <a
          href="#"
          className="px-4 hover:underline"
          onClick={(e) => {
            e.preventDefault();
            handlePrivacyPolicyClick();
          }}
        >
          Privacy Policy
        </a>
        <a
          href=""
          className="px-4 hover:underline"
          onClick={(e) => {
            e.preventDefault();
            handleTermsOfServiceClick();
          }}
        >
          Terms of Service
        </a>
        <div className="mt-4">
          <p>&copy; {currentYear} Ray Cook. All rights reserved. 2023</p>
        </div>
      </div>
      {showPrivacyPolicy && (
        <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />
      )}
      {showTermsOfService && (
        <TermsOfService onClose={() => setShowTermsOfService(false)} />
      )}
    </footer>
  );
};

export default Footer;
