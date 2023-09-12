import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import CreateCourseModal from "../CreateCourseModal/CreateCourseModal";
import { useState } from "react";
import DeleteCourseModal from "../DeleteCourseModal/DeleteCourseModal";

interface DashboardProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  isLoggedIn: boolean;
}
interface Course {
  CourseID: string;
  AdditionalInfo: string;
  AptitudeLevel: string;
  CourseName: string;
  CreatedAt: string;
  Documents: string[];
  GradeLevel: string;
  LastModified: string;
  UserEmail: string;
  CourseSubject: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user, isLoggedIn }) => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([] as Course[]);

  const [showModal, setShowModal] = useState(false);
  const [refreshCourses, setRefreshCourses] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  const handleDeleteClick = (courseID: string) => {
    setCourseToDelete(courseID);
    setShowDeleteModal(true);
  };

  const handleViewClick = (courseID: string) => {
    navigate("/course", { state: { courses, selectedCourseID: courseID } });
  };

  const handleCourseCreated = () => {
    setRefreshCourses(!refreshCourses); // Toggle refreshCourses to trigger useEffect
    setShowModal(false); // Close the modal
  };

  const handleCourseDeleted = async () => {
    if (courseToDelete) {
      try {
        const response = await fetch(
          `https://n2v4kawif7.execute-api.us-east-1.amazonaws.com/dev/courses/${courseToDelete}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setRefreshCourses(!refreshCourses);
          setShowDeleteModal(false);
        } else {
          console.error("Failed to delete course");
        }
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    // Fetch courses for the user
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `https://n2v4kawif7.execute-api.us-east-1.amazonaws.com/dev/courses?userEmail=${user.email}`
        );
        if (response.ok) {
          const data = await response.json();
          setCourses(data.courses);
        } else {
          console.error(`Failed to fetch courses: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, [user.email, refreshCourses]);

  return (
    <div className="container mx-auto my-16 text-center text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome {user.firstName}</h1>
      <div className="flex justify-center items-center mb-4 relative">
        <h2 className="text-2xl font-bold">Courses</h2>
        <div className="absolute right-0">
          <Button
            text="Create Course"
            bgColor="bg-yellow-300"
            textColor="text-indigo-900"
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>
      <div className="w-1/2 m-auto border-4">
        <div className="flex border-4 border-green-800">
          <div>
            <h2 className="text-2xl font-medium border-4">Courses</h2>
          </div>
          <div className="border-4">
            <Button
              text="Create Course"
              bgColor="bg-yellow-300"
              textColor="text-indigo-900"
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>
        <table className="mx-auto text-left border-collapse w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Grade</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{course.CourseName}</td>
                <td className="border px-4 py-2">{course.GradeLevel}</td>
                <td className="border px-4 py-2">{course.CourseSubject}</td>
                <td className="border px-4 py-2">
                  <Button
                    text="View"
                    bgColor="bg-yellow-300"
                    textColor="text-indigo-900"
                    onClick={() => handleViewClick(course.CourseID)}
                  />
                  <Button
                    text="Delete"
                    bgColor="bg-red-500"
                    textColor="text-white"
                    onClick={() => handleDeleteClick(course.CourseID)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <CreateCourseModal
          name=""
          grade=""
          additionalInstructions=""
          aptitude=""
          subject=""
          onClose={handleCourseCreated}
          mode="create"
          userEmail={user.email}
        />
      )}
      {showDeleteModal && (
        <DeleteCourseModal
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleCourseDeleted}
        />
      )}
    </div>
  );
};

export default Dashboard;
