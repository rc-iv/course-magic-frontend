import React from "react";
import { render } from "@testing-library/react";
import CreateCourseModal from "./CreateCourseModal";

test("renders CreateCourseModal", () => {
  const { getByText } = render(
    <CreateCourseModal
      name="Algebra"
      grade="9"
      subject="Math"
      additionalInstructions="additional"
      aptitude="Beginner"
      onClose={() => {}}
      courseID="12345"
      mode="edit"
      userEmail="1@2.com"
    />
  );
  const element = getByText(/CreateCourseModal Component/i);
  expect(element).toBeInTheDocument();
});
