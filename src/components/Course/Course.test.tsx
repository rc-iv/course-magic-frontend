import React from 'react';
import { render } from '@testing-library/react';
import Course from './Course';


const testUser = {
  firstName: "test",
  lastName: "test",
  email: ""
}
test('renders Course', () => {
  const { getByText } = render(<Course user={testUser} isLoggedIn/>);
  const element = getByText(/Course Component/i);
  expect(element).toBeInTheDocument();
});
