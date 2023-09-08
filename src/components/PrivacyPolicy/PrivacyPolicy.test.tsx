import React from 'react';
import { render } from '@testing-library/react';
import PrivacyPolicy from './PrivacyPolicy';

test('renders PrivacyPolicy', () => {
  const { getByText } = render(<PrivacyPolicy onClose={()=>{}} />);
  const element = getByText(/PrivacyPolicy Component/i);
  expect(element).toBeInTheDocument();
});
