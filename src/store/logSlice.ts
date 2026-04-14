import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Log } from '../types/log';

interface State {
  logs: Log[];
  isOnline: boolean;
}

const initialState: State = {
  logs: [],
  isOnline: true,
};

const logSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    setLogs(state, action: PayloadAction<Log[]>) {
      state.logs = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addLogToStore(state, action: PayloadAction<Log>) {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateLogToStore(state, action: PayloadAction<Log>) {},
    setOnline(state, action: PayloadAction<boolean>) {
      state.isOnline = action.payload;
    },
    updateSyncedLogs(state, action: PayloadAction<string[]>) {
      state.logs = state.logs.map(log =>
        action.payload.includes(log.id) ? { ...log, synced: true } : log,
      );
    },
    initLogs() {},
  },
});

export const {
  setLogs,
  addLogToStore,
  updateLogToStore,
  setOnline,
  updateSyncedLogs,
  initLogs,
} = logSlice.actions;
export default logSlice.reducer;
