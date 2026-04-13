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
    addLog(state, action: PayloadAction<Log>) {
      state.logs.push(action.payload);
    },
    updateLog(state, action: PayloadAction<Log>) {
      const index = state.logs.findIndex(l => l.id === action.payload.id);
      if (index !== -1) state.logs[index] = action.payload;
    },
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
  addLog,
  updateLog,
  setOnline,
  updateSyncedLogs,
  initLogs,
} = logSlice.actions;
export default logSlice.reducer;
