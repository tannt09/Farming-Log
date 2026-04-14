import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LogListScreen from '../src/screens/LogListScreen';

// ===== MOCK REDUX =====
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

// ===== MOCK NAVIGATION =====
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// ===== MOCK I18N =====
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'en' },
  }),
}));

// ===== MOCK COMPONENT CON =====

jest.mock('../src/components/LogItem', () => {
  return ({ item, onEdit }: { item: Log; onEdit: (log: Log) => void }) => {
    const { View, Text, TouchableOpacity } = require('react-native');

    return (
      <View>
        <Text>{item.name}</Text>
        <Text>{item.date}</Text>
        <Text>{item.status}</Text>
        <Text>{item.notes}</Text>

        <TouchableOpacity testID="edit-button" onPress={() => onEdit(item)}>
          <Text>edit</Text>
        </TouchableOpacity>
      </View>
    );
  };
});

// AddButton
jest.mock('../src/components/AddButton', () => {
  return ({ handleSubmit }: { handleSubmit: () => void }) => {
    const { TouchableOpacity, Text } = require('react-native');

    return (
      <TouchableOpacity testID="add-button" onPress={handleSubmit}>
        <Text>Add</Text>
      </TouchableOpacity>
    );
  };
});

import { useSelector } from 'react-redux';
import { Log } from '../src/types/log';

const mockedUseSelector = useSelector as jest.MockedFunction<
  typeof useSelector
>;

describe('LogListScreen', () => {
  const mockLogs = [
    {
      id: '1',
      name: 'Log 1',
      date: '2026-04-14',
      notes: 'Note 1',
      status: 'PENDING',
      synced: false,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseSelector.mockImplementation(cb =>
      cb({
        logs: { logs: mockLogs },
      }),
    );
  });

  // ===== TEST =====

  test('dispatch initLogs when mount', () => {
    render(<LogListScreen />);

    expect(mockDispatch).toHaveBeenCalled();
  });

  test('render list of logs', () => {
    const { getByText } = render(<LogListScreen />);

    expect(getByText('Log 1')).toBeTruthy();
    expect(getByText('2026-04-14')).toBeTruthy();
    expect(getByText('PENDING')).toBeTruthy();
    expect(getByText('Note 1')).toBeTruthy();
  });

  test('navigate to Form when press edit button', () => {
    const { getByTestId } = render(<LogListScreen />);

    fireEvent.press(getByTestId('edit-button'));

    expect(mockNavigate).toHaveBeenCalledWith('Form', { id: '1' });
  });

  test('navigate to Form when press AddButton', () => {
    const { getByTestId } = render(<LogListScreen />);

    fireEvent.press(getByTestId('add-button'));

    expect(mockNavigate).toHaveBeenCalledWith('Form', {});
  });

  test('render empty list', () => {
    mockedUseSelector.mockImplementation(cb =>
      cb({
        logs: { logs: [] },
      }),
    );

    const { queryByText } = render(<LogListScreen />);

    expect(queryByText('Log 1')).toBeNull();
  });
});
