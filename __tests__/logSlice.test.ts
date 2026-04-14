import reducer, {
  setLogs,
  setOnline,
  updateSyncedLogs,
} from '../src/store/logSlice';

import { Log } from '../src/types/log';

describe('logSlice', () => {
  const mockLogs: Log[] = [
    {
      id: '1',
      name: 'Watering',
      date: '2026-04-10',
      notes: 'Watered plants',
      status: 'PENDING',
      synced: false,
    },
    {
      id: '2',
      name: 'Fertilizing',
      date: '2026-04-11',
      notes: 'Added organic fertilizer',
      status: 'PENDING',
      synced: false,
    },
  ];

  const initialState = {
    logs: [],
    isOnline: true,
  };

  it('should return initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setLogs', () => {
    const state = reducer(initialState, setLogs(mockLogs));
    expect(state.logs).toEqual(mockLogs);
  });

  it('should handle setOnline', () => {
    const state = reducer(initialState, setOnline(false));
    expect(state.isOnline).toBe(false);
  });

  it('should handle updateSyncedLogs', () => {
    const stateWithLogs = {
      ...initialState,
      logs: mockLogs,
    };

    const newState = reducer(stateWithLogs, updateSyncedLogs(['2']));

    expect(newState.logs).toEqual([
      {
        id: '1',
        name: 'Watering',
        date: '2026-04-10',
        notes: 'Watered plants',
        status: 'PENDING',
        synced: false,
      },
      {
        id: '2',
        name: 'Fertilizing',
        date: '2026-04-11',
        notes: 'Added organic fertilizer',
        status: 'PENDING',
        synced: true, // ✅ updated
      },
    ]);
  });
});
