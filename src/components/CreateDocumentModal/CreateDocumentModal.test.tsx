import React from 'react';
import { render } from '@testing-library/react';
import CreateDocumentModal from './CreateDocumentModal';

test('renders CreateDocumentModal', () => {
  const { getByText } = render(<CreateDocumentModal 
    courseName='algebra' 
    gradeLevel='9'
    documentName='syllabus'
    documentType='syllabus'
    topicAdditional='syllabus' 
    aptitudeLevel='syllabus'
    courseID='syllabus'
    userEmail='syllabus'
    embedURL='syllabus'
    mode='edit'
    documentId='syllabus'
    categoryName='syllabus'
    onClose={()=>{}} />   
    );
  const element = getByText(/CreateDocumentModal Component/i);
  expect(element).toBeInTheDocument();
});
