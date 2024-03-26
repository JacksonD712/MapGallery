import React from 'react';
import {render} from '@testing-library/react-native';
import Display from '../src/component/Display';
describe('Display component', () => {
  test('renders correctly', () => {
    const {getByPlaceholderText, getByText} = render(<Display />);
    const searchInput = getByPlaceholderText('Search location...');
    const searchButton = getByText('Search');
    expect(searchInput).toBeDefined();
    expect(searchButton).toBeDefined();
  });
});
