import React from 'react';
import { render } from '@testing-library/react';
import ForgotPassword from './ForgotPassword';

test('renders ForgotPassword', () => {
  const { getByText } = render(<ForgotPassword />);
  const element = getByText(/ForgotPassword Component/i);
  expect(element).toBeInTheDocument();
});
