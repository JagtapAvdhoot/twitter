import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Tweet from './Tweet';

describe('<Tweet />', () => {
  test('it should mount', () => {
    render(<Tweet />);
    
    const tweet = screen.getByTestId('Tweet');

    expect(tweet).toBeInTheDocument();
  });
});