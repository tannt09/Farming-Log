import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LogFormScreen from '../src/screens/LogFormScreen';

// ===== MOCK =====

// redux
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

// navigation
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
  useRoute: jest.fn(),
}));

// i18n
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// uuid
jest.mock('react-native-uuid', () => ({
  v4: () => 'mock-uuid',
}));

import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';

describe('LogFormScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  // ===== ADD MODE =====
  test('add new log', () => {
    (useRoute as jest.Mock).mockReturnValue({ params: {} });

    (useSelector as unknown as jest.Mock).mockImplementation(cb =>
      cb({ logs: { logs: [] } }),
    );

    const { getByPlaceholderText, getByTestId } = render(
      <LogFormScreen />,
    );

    fireEvent.changeText(
      getByPlaceholderText('Seeding...'),
      'New Log',
    );
    fireEvent.changeText(
      getByPlaceholderText('YYYY-MM-DD'),
      '2026-04-14',
    );

    fireEvent.press(getByTestId('save-button'));

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockGoBack).toHaveBeenCalled();
  });

  // ===== EDIT MODE =====
  test('update existing log', () => {
    const mockLog = {
      id: '1',
      name: 'Old',
      date: '2026-04-14',
      notes: 'Note',
      status: 'PENDING',
      synced: false,
    };

    (useRoute as jest.Mock).mockReturnValue({
      params: { id: '1' },
    });

    (useSelector as unknown as jest.Mock).mockImplementation(cb =>
      cb({ logs: { logs: [mockLog] } }),
    );

    const { getByDisplayValue, getByTestId } = render(
      <LogFormScreen />,
    );

    fireEvent.changeText(getByDisplayValue('Old'), 'Updated');

    fireEvent.press(getByTestId('save-button'));

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockGoBack).toHaveBeenCalled();
  });

  // ===== VALIDATION =====
  test('show error when name empty', () => {
    (useRoute as jest.Mock).mockReturnValue({ params: {} });

    (useSelector as unknown as jest.Mock).mockImplementation(cb =>
      cb({ logs: { logs: [] } }),
    );

    const { getByTestId } = render(<LogFormScreen />);

    fireEvent.press(getByTestId('save-button'));

    expect(Alert.alert).toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  // ===== SWITCH STATUS =====
  test('toggle status', () => {
    (useRoute as jest.Mock).mockReturnValue({ params: {} });

    (useSelector as unknown as jest.Mock).mockImplementation(cb =>
      cb({ logs: { logs: [] } }),
    );

    const { getByRole } = render(<LogFormScreen />);

    const switchEl = getByRole('switch');

    fireEvent(switchEl, 'valueChange', true);

    expect(switchEl).toBeTruthy();
  });
});