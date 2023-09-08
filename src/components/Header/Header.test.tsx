// src/components/Header/Header.test.tsx

import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

test('renders Header', () => {
  const { getByText } = render(<Header userLoggedIn={false} onLogout={()=>{}} />);  // Pass the userLoggedIn prop here
  const element = getByText(/CourseMagic/i);  // Adjust this to match the text you expect
  expect(element).toBeInTheDocument();
});
