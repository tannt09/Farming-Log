// src/store/saga.ts
import { takeEvery, call, put, takeLatest, select } from 'redux-saga/effects';
import { addLog, initLogs, setLogs, updateLog } from './logSlice';
import { getLogs, saveLogs } from '../services/storage';
import { syncLogsApi } from '../services/api';
import { Log } from '../types/log';
import mockLogs from '../data/logs.json';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleSave(action: PayloadAction<Log>) {
  const logs: Log[] = yield select((state: any) => state.logs.logs);
  const updatedLogs = [...logs, action.payload];
  yield call(saveLogs, updatedLogs);

  // giả lập online
  yield call(syncLogsApi, updatedLogs);
}

function* handleInitLogs() {
  try {
    const localLogs: Log[] = yield call(getLogs);

    if (localLogs.length > 0) {
      yield put(setLogs(localLogs));
    } else {
      yield put(setLogs(mockLogs as Log[]));
      yield call(saveLogs, mockLogs as Log[]);
    }
  } catch (error) {
    console.log('Init logs error:', error);
  }
}

export default function* rootSaga() {
  yield takeEvery(addLog.type, handleSave);
  yield takeEvery(updateLog.type, handleSave);
  yield takeLatest(initLogs.type, handleInitLogs);
}
