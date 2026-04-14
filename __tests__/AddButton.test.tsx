import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddButton from '../src/components/AddButton';

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

test('press add button', () => {
  const mockFn = jest.fn();

  const { getByTestId } = render(<AddButton handleSubmit={mockFn} />);

  const button = getByTestId('add-button');

  fireEvent.press(button);

  expect(mockFn).toHaveBeenCalled();
});
