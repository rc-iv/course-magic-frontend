import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './Dashboard';

const test_user = {
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com"
}
test('renders Dashboard', () => {
  const { getByText } = render(<Dashboard user={test_user} isLoggedIn/>);
  const element = getByText(/Dashboard Component/i);
  expect(element).toBeInTheDocument();
});
