import React, { useState } from "react";
import Button from "../Button/Button";

interface CreateDocumentModalProps {
  onClose: () => void;
  courseName: string;
  gradeLevel: string;
  documentName: string;
  categoryId: string;
  documentType: string;
  topicAdditional: string;
  aptitudeLevel: string;
  embedURL: string;
  courseID: string;
  userEmail: string;
  documentId: string;
  mode: "create" | "edit";
}

const docCategories = [
  {
    id: "admin",
    label: "Planning and Administration",
    docTypes: [
      "Course Outline/Syllabus",
      "Lesson Plans",
      "Gradebook Template",
      "Class Roster",
      "Attendance Sheet",
      "Seating Chart",
    ],
  },
  {
    id: "teaching",
    label: "Teaching Materials",
    docTypes: [
      "Lecture Slides",
      "Handouts",
      "Homework Assignments",
      "Quizzers",
      "Exams",
      "Project Guidelines",
      "Study Guides",
    ],
  },
  {
    id: "communication",
    label: "Communication",
    docTypes: ["Parent/Guardian Letter", "Newsletter", "Permission Slip"],
  },
  {
    id: "evaluation",
    label: "Evaluation and Feedback",
    docTypes: [
      "Rubric",
      "Student Self-Assessment",
      "Peer Review Form",
      "Course Feedback Form",
    ],
  },
  {
    id: "misc",
    label: "Miscellaneous",
    docTypes: [
      "Emergency Procedure",
      "Substitute Teacher Instruction",
      "Extra Credit Opportunity",
      "Resource List",
      "Classroom Rules and Policies",
    ],
  },
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

const CreateDocumentModal: React.FC<CreateDocumentModalProps> = ({
  onClose,
  documentName,
  categoryId,
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
  const [selectedCategory, setSelectedCategory] = useState(categoryId);

  const [docName, setDocName] = useState(documentName);
  const [docType, setDocType] = useState(documentType);
  const [docCourse, setDocCourse] = useState(courseName);
  const [docGradeLevel, setDocGradeLevel] = useState(gradeLevel);
  const [docTopicAdditional, setDocTopicAdditional] = useState(topicAdditional);
  const [docAptitudeLevel, setDocAptitudeLevel] = useState(aptitudeLevel);

  const getDocTypes = () => {
    const category = docCategories.find((cat) => cat.id === selectedCategory);
    return category ? category.docTypes : [];
  };

  const createDocument = async () => {
    const url = mode === "create" ?
      "https://n2v4kawif7.execute-api.us-east-1.amazonaws.com/dev/documents" :
      "https://n2v4kawif7.execute-api.us-east-1.amazonaws.com/dev/documents/";
    
    const method = mode === "create" ? "POST" : "PUT";

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
      };

      const response = await fetch(
        url,
        {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        onClose();
      } else {
        console.log('Failed to save document:', response.status);
      }
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-black">
      <div className="bg-white p-8 rounded-lg w-2/3 relative border-4 border-indigo-500">
        <button onClick={onClose} className="absolute top-0 left-0 p-4">
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">Create Document</h2>
        <form className="grid grid-cols-2 gap-4" onSubmit={(e)=>{e.preventDefault()}}>
          <div className="col-span-1 space-y-4">
            <div className="flex items-center">
              <label htmlFor="documentName" className="w-1/3 text-right mr-4">
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
                className="w-1/3 text-right mr-4"
              >
                Category
              </label>
              <select
                id="documentCategory"
                className="w-2/3 border"
                required
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {docCategories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <label htmlFor="documentType" className="w-1/3 text-right mr-4">
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
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <label htmlFor="course" className="w-1/3 text-right mr-4">
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
              <label htmlFor="gradeLevel" className="w-1/3 text-right mr-4">
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
              <label htmlFor="gradeLevel" className="w-1/3 text-right mr-4">
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
            <label htmlFor="additionalInfo" className="block mb-2">
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
          <div className="col-span-2 flex justify-end space-x-4">
            <Button
              text="Cancel"
              bgColor="bg-red-500"
              textColor="text-white"
              onClick={onClose}
            />
            <Button text="Okay" bgColor="bg-green-500" textColor="text-white" onClick={createDocument} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDocumentModal;
