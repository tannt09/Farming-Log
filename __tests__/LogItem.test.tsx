import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LogItem from '../src/components/LogItem';
import { Log } from '../src/types/log';

// mock i18n
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('LogItem', () => {
  const mockItem: Log = {
    id: '1',
    name: 'Test',
    date: '2026-04-14',
    notes: 'Note test',
    status: 'PENDING',
    synced: false,
  };

  test('render correctly', () => {
    const { getByText } = render(
      <LogItem item={mockItem} onEdit={jest.fn()} />
    );

    // kiểm tra hiển thị
    expect(getByText('Test')).toBeTruthy();
    expect(getByText('2026-04-14')).toBeTruthy();
    expect(getByText('Note test')).toBeTruthy();
    expect(getByText('PENDING')).toBeTruthy();
  });

  test('call onEdit when press edit button', () => {
    const mockOnEdit = jest.fn();

    const { getByTestId } = render(
      <LogItem item={mockItem} onEdit={mockOnEdit} />
    );

    fireEvent.press(getByTestId('edit-button'));

    expect(mockOnEdit).toHaveBeenCalledWith(mockItem);
  });
});