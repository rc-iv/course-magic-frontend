// src/components/CreateCourseModal/CreateCourseModal.tsx
import React, { useState } from "react";
import Button from "../Button/Button";

interface CreateCourseModalProps {
  onClose: () => void;
  grade: string;
  subject: string;
  aptitude: string;
  additionalInstructions: string;
  name: string;
  mode: "create" | "edit";
  courseID?: string;
  userEmail: string;
}

const courseSubjects = [
  "Mathematics",
  "Language Arts",
  "Social Studies",
  "Science",
  "Foreign Languages",
  "Physical Education",
  "Arts",
  "Technology and Computer Science",
  "Life Skills/Health",
  "Vocational and Technical Education",
];
const gradeLevels = [
  "K",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "Bachelors",
  "Masters",
  "Doctorate",
];
const aptitudeLevels = ["","Remedial", "Beginner", "Intermediate", "Advanced"];

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({
  onClose,
  grade,
  subject,
  aptitude,
  name,
  additionalInstructions,
  mode,
  courseID,
  userEmail,
}) => {
  const [courseName, setCourseName] = useState(name);
  const [courseSubject, setCourseSubject] = useState(subject);
  const [gradeLevel, setGradeLevel] = useState(grade);
  const [aptitudeLevel, setAptitudeLevel] = useState(aptitude);
  const [additionalInfo, setAdditionalInfo] = useState(additionalInstructions);


  // Handle the okay click
  // Based on the passed in mode prop, will either create or edit a course
  const handleOkayClick = async () => {    
    const method = mode === "create" ? "POST" : "PUT";
    try {
      const response = await fetch("https://n2v4kawif7.execute-api.us-east-1.amazonaws.com/dev/courses", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserEmail: userEmail,
          CourseName: courseName,
          GradeLevel: gradeLevel,
          AptitudeLevel: aptitudeLevel,
          AdditionalInfo: additionalInfo,
          CourseSubject: courseSubject,
          CourseID: courseID
        }),
      });
  
      if (response.ok) {
        onClose();
      } else {
        console.error("Failed to save course");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-black">
      <div className="bg-white p-8 rounded-lg w-1/2 relative border-4 border-indigo-500">
        <button onClick={onClose} className="absolute top-0 left-0 p-4">
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">Create Course</h2>
        <form className="grid grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="col-span-1 space-y-4">
            <div className="flex items-center">
              <label htmlFor="courseName" className="w-1/3 text-right mr-4">
                Course Name
              </label>
              <input
                type="text"
                id="courseName"
                className="w-2/3 border"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="courseSubject" className="w-1/3 text-right mr-4">
                Course Subject
              </label>
              <select
                id="courseSubject"
                className="w-2/3 border"
                value={courseSubject}
                onChange={(e) => setCourseSubject(e.target.value)}
                required
              >
                {courseSubjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <label htmlFor="gradeLevel" className="w-1/3 text-right mr-4">
                Grade Level
              </label>
              <select
                id="gradeLevel"
                className="w-2/3 border"
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                required
              >
                {gradeLevels.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <label htmlFor="aptitudeLevel" className="w-1/3 text-right mr-4">
                Aptitude Level
              </label>
              <select
                id="aptitudeLevel"
                className="w-2/3 border"
                value={aptitudeLevel}
                onChange={(e) => setAptitudeLevel(e.target.value)}
              >
                {aptitudeLevels.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-span-1">
            <label htmlFor="additionalInstructions" className="block mb-2">
              Additional Instructions
            </label>
            <textarea
              id="additionalInstructions"
              className="w-full h-3/4 border"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            ></textarea>
          </div>
          <div className="col-span-2 flex justify-end space-x-4">
            <Button
              text="Cancel"
              bgColor="bg-red-500"
              textColor="text-white"
              onClick={onClose}
            />
            <Button text="Okay" bgColor="bg-green-500" textColor="text-white" onClick={handleOkayClick}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseModal;
