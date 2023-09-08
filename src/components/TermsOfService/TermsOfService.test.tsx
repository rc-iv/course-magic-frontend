import React from 'react';
import { render } from '@testing-library/react';
import TermsOfService from './TermsOfService';

test('renders TermsOfService', () => {
  const { getByText } = render(<TermsOfService onClose={()=>{}} />);
  const element = getByText(/TermsOfService Component/i);
  expect(element).toBeInTheDocument();
});
