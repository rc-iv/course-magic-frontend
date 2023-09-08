import React from 'react';
import { render } from '@testing-library/react';
import Document from './Document';

test('renders Document', () => {
  const { getByText } = render(<Document isLoggedIn />);
  const element = getByText(/Document Component/i);
  expect(element).toBeInTheDocument();
});
