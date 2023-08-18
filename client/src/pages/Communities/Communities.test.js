import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Communities from './Communities';

describe('<Communities />', () => {
  test('it should mount', () => {
    render(<Communities />);
    
    const communities = screen.getByTestId('Communities');

    expect(communities).toBeInTheDocument();
  });
});