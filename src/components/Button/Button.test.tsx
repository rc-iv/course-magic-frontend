import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

test('renders Button', () => {
  const { getByText } = render(<Button text="Click Me" bgColor="bg-red-500" textColor="text-white" onClick={()=>{}} disabled/>);
  const element = getByText(/Click Me/i);
  expect(element).toBeInTheDocument();
});
