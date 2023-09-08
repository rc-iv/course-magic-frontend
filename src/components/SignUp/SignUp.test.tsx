import React from 'react';
import { render } from '@testing-library/react';
import SignUp from './SignUp';

test('renders SignUp', () => {
  const { getByText } = render(<SignUp onLogin={ ()=>{}} />);
  const element = getByText(/SignUp Component/i);
  expect(element).toBeInTheDocument();
});
