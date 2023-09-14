// src/components/FeatureSection/FeatureSection.tsx

import React from "react";
import Button from "../Button/Button";

const FeatureSection: React.FC = () => {
  return (
    <div className="container mx-auto my-16">
      {/* Search Bar and Button */}
      <div className="flex justify-center items-center mb-16">
        <input
          aria-label="Course Generator"
          type="text"
          placeholder="Generate your course now!"
          className="border p-2 rounded mr-4 w-1/2 md:w-1/6"
        />
        <Button
          text="Generate"
          bgColor="bg-yellow-300"
          textColor="text-indigo-900"
          onClick={() => (window.location.href = "/signup")}
        />
      </div>

      {/* First Row: Docs */}
      <div className="flex-row space-y-4 md:flex md:justify-between md:space-x-4 md:space-y-0">
        {/* Syllabus Text Embed */}
        <div className="flex w-3/4 m-auto md:h-full md:w-1/3">
          <iframe
            loading="lazy"
            title="Syllabus embed"
            className="h-[500px] w-full"
            src="https://docs.google.com/document/d/e/2PACX-1vR7nePwaKodzS-7I1_Jxt4QfHKb-TQ16rqd02W2v0bbRw0_z682dTU0z7v7s5P7HA/pub?embedded=true"
          ></iframe>
        </div>
        {/* Lesson Plan Embed */}
        <div className="flex w-3/4 m-auto md:h-full md:w-1/3">
          <iframe
            loading="lazy"
            title="Lesson Plan embed"
            className="h-[500px] w-full"
            src="https://docs.google.com/document/d/e/2PACX-1vTzEBlWCN5VpvIO2I7_F5ywzadFja8G2LgvgVoh83KfkmfoojkNWsSyAzMoM8plhQ/pub?embedded=true"
          ></iframe>
        </div>
        {/* Problem Set Embed */}
        <div className="flex w-3/4 m-auto md:h-full md:w-1/3">
          <iframe
            loading="lazy"
            title="Problem Set embed"
            className="h-[500px] w-full"
            src="https://docs.google.com/document/d/e/2PACX-1vSVPfGHfdTun7CwvUb1V21myptICQjqmCJWToAbWp2hh8S3bxh_GxdapNLzge1N8w/pub?embedded=true"
          >
            {" "}
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
