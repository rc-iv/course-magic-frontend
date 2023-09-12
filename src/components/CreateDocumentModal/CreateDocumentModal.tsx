import React, { Fragment, useState } from "react";
import Button from "../Button/Button";

interface CreateDocumentModalProps {
  onClose: () => void;
  courseName: string;
  gradeLevel: string;
  documentName: string;
  categoryName: string;
  documentType: string;
  topicAdditional: string;
  aptitudeLevel: string;
  embedURL: string;
  courseID: string;
  userEmail: string;
  documentId: string;
  mode: "create" | "edit";
}

const docCategories: { [key: string]: string[] } = {
  "Planning and Administration": [
    "Course Outline/Syllabus",
    "Lesson Plans",
    "Gradebook Template",
    "Class Roster",
    "Attendance Sheet",
    "Seating Chart",
  ],
  "Teaching Materials": [
    "Lecture Slides",
    "Handouts",
    "Homework Assignments",
    "Quizzers",
    "Exams",
    "Project Guidelines",
    "Study Guides",
  ],
  Communication: ["Parent/Guardian Letter", "Newsletter", "Permission Slip"],
  "Evaluation and Feedback": [
    "Rubric",
    "Student Self-Assessment",
    "Peer Review Form",
    "Course Feedback Form",
  ],
  Miscellaneous: [
    "Emergency Procedure",
    "Substitute Teacher Instruction",
    "Extra Credit Opportunity",
    "Resource List",
    "Classroom Rules and Policies",
  ],
};

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

const aptitudeLevels = ["", "Remedial", "Beginner", "Intermediate", "Advanced"];

const CreateDocumentModal: React.FC<CreateDocumentModalProps> = ({
  onClose,
  documentName,
  categoryName,
  documentType,
  courseName,
  gradeLevel,
  aptitudeLevel,
  topicAdditional,
  courseID,
  userEmail,
  mode,
  documentId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(
    categoryName || "Planning and Administration"
  );
  const [docType, setDocType] = useState(
    documentType || docCategories[selectedCategory][0]
  );
  const [docName, setDocName] = useState(documentName);
  const [docGradeLevel, setDocGradeLevel] = useState(gradeLevel);
  const [docTopicAdditional, setDocTopicAdditional] = useState(topicAdditional);
  const [docAptitudeLevel, setDocAptitudeLevel] = useState(aptitudeLevel);

  const getDocTypes = () => {
    return docCategories[selectedCategory];
  };

  const createDocument = async () => {
    const method = mode === "create" ? "POST" : "PUT";
    setIsLoading(true);
    try {
      const payload = {
        DocumentName: docName,
        DocumentCategory: selectedCategory,
        DocumentType: docType,
        GradeLevel: docGradeLevel,
        AptitudeLevel: docAptitudeLevel,
        TopicAdditionalInfo: docTopicAdditional,
        AI_Prompt: "",
        CourseId: courseID,
        UserEmail: userEmail,
        DocumentURL: "",
        DocumentId: documentId,
        CourseName: courseName,
      };

      const response = await fetch(
        "https://n2v4kawif7.execute-api.us-east-1.amazonaws.com/dev/documents/",
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setIsLoading(false);
        onClose();
      } else {
        console.log("Failed to save document:", response.status);
      }
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setDocType(docCategories[e.target.value][0]);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-indigo-800">
      <div className="bg-gradient-to-r from-indigo-200 to-indigo-100 p-8 rounded-lg md:w-1/2 relative border-4 border-indigo-200">
        <button onClick={onClose} className="absolute top-0 left-0 p-4">
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">Create Document</h2>
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {isLoading ? (
            <div className="col-span-2 text-center">
              <div>
                Document is being generated, this may take a few minutes.
              </div>
            </div>
          ) : (
            <Fragment>
              <div className="col-span-1 space-y-4">
                <div className="flex items-center">
                  <label
                    htmlFor="documentName"
                    className="w-1/2 text-right mr-4 font-bold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="documentName"
                    className="w-2/3 border"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center">
                  <label
                    htmlFor="documentCategory"
                    className="w-1/2 text-right mr-4 font-bold"
                  >
                    Category
                  </label>
                  <select
                    id="documentCategory"
                    className="w-2/3 border"
                    required
                    value={selectedCategory}
                    onChange={(e)=>{handleCategoryChange(e)}}
                  >
                    {Object.keys(docCategories).map((category, index) => (
                      <option
                        key={index}
                        value={category}
                        selected={category === selectedCategory}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <label
                    htmlFor="documentType"
                    className="w-1/2 text-right mr-4 font-bold"
                  >
                    Type
                  </label>
                  <select
                    id="documentType"
                    className="w-2/3 border"
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    required
                  >
                    {getDocTypes().map((type, index) => (
                      <option
                        key={index}
                        value={type}
                        selected={type === docType}
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <label htmlFor="course" className="w-1/2 text-right mr-4 font-bold">
                    Course
                  </label>
                  <input
                    type="text"
                    id="course"
                    className="w-2/3 border"
                    value={courseName}
                    readOnly
                    required
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="gradeLevel" className="w-1/2 text-right mr-4 font-bold">
                    Grade Level
                  </label>
                  <select
                    id="gradeLevel"
                    className="w-2/3 border"
                    value={docGradeLevel}
                    onChange={(e) => setDocGradeLevel(e.target.value)}
                    required
                  >
                    {gradeLevels.map((level, index) => (
                      <option
                        key={index}
                        value={level}
                        selected={level === gradeLevel}
                      >
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <label htmlFor="gradeLevel" className="w-1/2 text-right mr-4 font-bold">
                    Aptitude Level
                  </label>
                  <select
                    id="aptitudeLevel"
                    className="w-2/3 border"
                    value={docAptitudeLevel}
                    onChange={(e) => setDocAptitudeLevel(e.target.value)}
                    required
                  >
                    {aptitudeLevels.map((level, index) => (
                      <option
                        key={index}
                        value={level}
                        selected={level === aptitudeLevel}
                      >
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-span-1">
                <label htmlFor="additionalInfo" className="block mb-2 font-bold">
                  Topic/Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  className="w-full h-3/4 border"
                  value={docTopicAdditional}
                  onChange={(e) => setDocTopicAdditional(e.target.value)}
                  required
                ></textarea>
              </div>
            </Fragment>
          )}
          <div className="col-span-2 flex justify-end space-x-4">
            <Button
              text={isLoading ? "Close" : "Cancel"}
              bgColor="bg-red-500"
              textColor="text-white"
              onClick={onClose}
            />
            <Button
              text="Okay"
              bgColor="bg-green-500"
              textColor="text-white"
              onClick={createDocument}
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDocumentModal;
