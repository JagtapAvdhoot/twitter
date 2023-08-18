import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Bookmark from './Bookmark';

describe('<Bookmark />', () => {
  test('it should mount', () => {
    render(<Bookmark />);
    
    const bookmark = screen.getByTestId('Bookmark');

    expect(bookmark).toBeInTheDocument();
  });
});