import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Button from "../Button/Button";
import CreateCourseModal from "../CreateCourseModal/CreateCourseModal";
import CreateDocumentModal from "../CreateDocumentModal/CreateDocumentModal";
import { useNavigate } from "react-router-dom";
import DeleteCourseModal from "../DeleteCourseModal/DeleteCourseModal";

interface CourseProps {
  isLoggedIn: boolean;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface CourseData {
  CourseID: string;
  AdditionalInfo: string;
  AptitudeLevel: string;
  CourseName: string;
  CreatedAt: string;
  Documents: Document[];
  GradeLevel: string;
  LastModified: string;
  UserEmail: string;
  CourseSubject: string;
}

interface DocumentData {
  DocumentId: string;
  DocumentName: string;
  DocumentCategory: string;
  DocumentType: string;
  GradeLevel: string;
  AptitudeLevel: string;
  TopicAdditionalInfo: string;
  AI_Prompt: string;
  DocumentURL: string;
  CourseId: string;
  UserEmail: string;
  CreatedAt: string;
  LastModified: string;
  CourseName: string;
}

interface LocationState {
  courses: CourseData[];
  selectedCourseID: string;
}

const Course: React.FC<CourseProps> = ({ user, isLoggedIn }) => {
  // Get the courses and selectedCourseID from the location state
  const location = useLocation();
  const { courses, selectedCourseID } = (location.state as LocationState) || {
    courses: [],
    selectedCourseID: "",
  };
  const course = useMemo(() => {
    return (
      courses.find((course) => course.CourseID === selectedCourseID) || {
        CourseID: "",
        AdditionalInfo: "",
        AptitudeLevel: "",
        CourseName: "",
        CreatedAt: "",
        Documents: [],
        GradeLevel: "",
        LastModified: "",
        UserEmail: "",
        CourseSubject: "",
      }
    );
  }, [courses, selectedCourseID]);

  // State to control the modals
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // State to control the documents
  const [documents, setDocuments] = useState([] as DocumentData[]);
  const [refreshDocuments, setRefreshDocuments] = useState(false);

  // State to control the course
  const [currentCourse, setCurrentCourse] = useState(course);
  const [refreshCourse, setRefreshCourse] = useState(false);

  // State to control the document to delete
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);

  // State to control the creation of a new document, works with useEffect hook to refresh page
  const [isCreatingNewDocument, setIsCreatingNewDocument] = useState(false);

  // Hook to navigate to the document page
  const navigate = useNavigate();
  const handleNavigation = (path: string, documentId: string) => {
    navigate(path, {
      state: { documents, selectedDocumentID: documentId },
    });
  };

  // useEffect hook that runs when the component mounts, and when refreshCourses changes
  // populates documents from api to display on the page
  useEffect(() => {
    let intervalId: any;
    console.log("useEffect hook triggered to fetch documents");
    const fetchDocuments = async () => {
      console.log("fetch documetns called");
      try {
        const response = await fetch(
          `https://n2v4kawif7.execute-api.us-east-1.amazonaws.com/dev/documents?courseId=${course.CourseID}`
        );
        if (response.ok) {
          const documents = await response.json();
          setDocuments(documents);
        } else {
          console.error("Failed to fetch documents:", response.status);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    if (isCreatingNewDocument) {
      console.log("starting interval");
      // Start the interval
      intervalId = setInterval(() => {
        fetchDocuments();
      }, 5000); // Fetch every 5 seconds
    } else {
      console.log("fetching immediately");
      // Fetch immediately if not in the "creating new document" state
      fetchDocuments();
    }
    // Cleanup
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [
    course.CourseID,
    isCreatingNewDocument,
    documents.length,
    refreshDocuments,
  ]);

  // useEffect hook that runs when the component mounts, and when refreshCourses changes
  useEffect(() => {
    setCurrentCourse(course);
  }, [course]);

  // use effect hook that refreshes the course when the refreshCourse state changes
  // this is triggered when the course is edited
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `https://n2v4kawif7.execute-api.us-east-1.amazonaws.com/dev/courses/${selectedCourseID}`
        );
        if (response.ok) {
          const updatedCourse = await response.json();
          console.log(`Updated course:`, updatedCourse);
          setCurrentCourse(updatedCourse); // Update the current course
        } else {
          console.error("Failed to fetch updated course:", response.status);
        }
      } catch (error) {
        console.error("Error fetching updated course:", error);
      }
    };

    if (refreshCourse) {
      fetchCourse();
      setRefreshCourse(false); // Reset the refresh trigger
    }
  }, [refreshCourse, selectedCourseID]);

  // Handle the course being deleted
  const handleDocumentDeleted = async () => {
    if (documentToDelete) {
      try {
        const response = await fetch(
          `https://n2v4kawif7.execute-api.us-east-1.amazonaws.com/dev/documents/${documentToDelete}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setRefreshDocuments(!refreshDocuments);
          setShowDeleteModal(false);
        } else {
          console.error("Failed to delete course");
        }
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  // Handle the delete button being clicked
  const handleDeleteClick = (documentID: string) => {
    setDocumentToDelete(documentID);
    setShowDeleteModal(true);
  };

  return (
    <div className="mx-auto my-8 text-center text-white">
      <div className="md:w-1/4 mx-1 my-8 p-4 border rounded">
        <h2 className="text-2xl font-bold mb-4">{currentCourse.CourseName}</h2>
        <div className="flex">
          {/* Course Details */}

          <div className="course-details text-left">
            <p>
              Subject:<strong> {currentCourse.CourseSubject}</strong>
            </p>
            <p>
              Grade:<strong> {currentCourse.GradeLevel}</strong>
            </p>
            <p>
              Aptitude:
              <strong> {currentCourse.AptitudeLevel}</strong>
            </p>
            <Button
              text="Edit"
              bgColor="bg-yellow-300"
              textColor="text-indigo-900"
              onClick={() => setShowCourseModal(true)}
            />
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="flex justify-between items-center mb-4  ">
        <h2 className="text-2xl font-bold">Documents</h2>
        <div className="">
          <Button
            text="Refresh"
            bgColor="bg-green-300"
            textColor="text-indigo-900"
            onClick={() => setRefreshDocuments(!refreshDocuments)}
          />
          <Button
            text="Create Document"
            bgColor="bg-yellow-300"
            textColor="text-indigo-900"
            onClick={() => setShowDocumentModal(true)}
          />
        </div>
      </div>
      <table className="mx-auto text-left  md:w-full mx-1">
        <thead>
          <tr>
            <th className="border px-1 py-2">Name</th>
            <th className="border px-1 py-2">Type</th>
            <th className="border px-1 py-2">Options</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{doc.DocumentName}</td>
              <td className="border px-4 py-2">{doc.DocumentType}</td>
              <td className="border px-4 py-2">
                <Button
                  text="View"
                  bgColor="bg-yellow-300"
                  textColor="text-indigo-900"
                  onClick={() => handleNavigation("/document", doc.DocumentId)}
                />
                <Button
                  text="Delete"
                  bgColor="bg-red-300"
                  textColor="text-indigo-900"
                  onClick={() => handleDeleteClick(doc.DocumentId)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showCourseModal && (
        <CreateCourseModal
          name={currentCourse.CourseName}
          grade={currentCourse.GradeLevel}
          subject={currentCourse.CourseSubject}
          aptitude={currentCourse.AptitudeLevel}
          additionalInstructions={currentCourse.AdditionalInfo}
          onClose={() => {
            setShowCourseModal(false);
            setRefreshCourse(true);
          }}
          mode="edit"
          courseID={currentCourse.CourseID}
          userEmail={user.email}
        />
      )}
      {showDocumentModal && (
        <CreateDocumentModal
          documentName=""
          categoryName=""
          documentType=""
          courseName={currentCourse.CourseName}
          gradeLevel={currentCourse.GradeLevel}
          topicAdditional=""
          aptitudeLevel=""
          courseID={currentCourse.CourseID}
          userEmail={user.email}
          embedURL=""
          documentId=""
          mode="create"
          onClose={() => {
            setRefreshDocuments(!refreshDocuments);
            setIsCreatingNewDocument(true);
            setShowDocumentModal(false);
          }}
        />
      )}
      {showDeleteModal && (
        <DeleteCourseModal
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDocumentDeleted}
        />
      )}
    </div>
  );
};

export default Course;
