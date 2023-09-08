import React from 'react';
import { render } from '@testing-library/react';
import DeleteCourseModal from './DeleteCourseModal';

test('renders DeleteCourseModal', () => {
  const { getByText } = render(<DeleteCourseModal onClose={() => {}} onDelete={() => {}} />);
  const element = getByText(/DeleteCourseModal Component/i);
  expect(element).toBeInTheDocument();
});
