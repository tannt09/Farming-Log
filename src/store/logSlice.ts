import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Log } from '../types/log';

interface State {
  logs: Log[];
}

const initialState: State = {
  logs: [],
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
    initLogs() {},
  },
});

export const { setLogs, addLog, updateLog, initLogs } = logSlice.actions;
export default logSlice.reducer;
