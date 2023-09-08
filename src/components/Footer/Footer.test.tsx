import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

test('renders Footer', () => {
  const { getByText } = render(<Footer />);
  const element = getByText(/Footer Component/i);
  expect(element).toBeInTheDocument();
});
