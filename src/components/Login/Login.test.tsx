import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';

test('renders Login', () => {
  const { getByText } = render(<Login onLogin={()=>{}}/>);
  const element = getByText(/Login Component/i);
  expect(element).toBeInTheDocument();
});
