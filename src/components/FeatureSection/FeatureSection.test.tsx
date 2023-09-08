import React from 'react';
import { render } from '@testing-library/react';
import FeatureSection from './FeatureSection';

test('renders FeatureSection', () => {
  const { getByText } = render(<FeatureSection />);
  const element = getByText(/FeatureSection Component/i);
  expect(element).toBeInTheDocument();
});
