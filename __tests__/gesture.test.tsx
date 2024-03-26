import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Display from '../src/component/Display';

describe('Display component', () => {
  test('should delete an image when swiped', async () => {
    const {getByText, findByText, queryByText} = render(<Display />);
    await findByText('Swipe to Delete');
    const deleteButton = getByText('Swipe to Delete');
    fireEvent(deleteButton, 'onSwipeableRightOpen');
    fireEvent.press(getByText('Delete'));
    await waitFor(() => {
      expect(queryByText('Swipe to Delete')).toBeNull();
    });
  });
});
