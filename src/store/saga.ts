// src/store/saga.ts
import { takeEvery, call, put, takeLatest, select } from 'redux-saga/effects';
import {
  addLog,
  initLogs,
  setLogs,
  setOnline,
  updateLog,
  updateSyncedLogs,
} from './logSlice';
import { getLogs, saveLogs } from '../services/storage';
import { syncLogsApi } from '../services/api';
import { Log } from '../types/log';
import mockLogs from '../data/logs.json';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

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

function* handleNetworkChange(action: PayloadAction<boolean>) {
  const isOnline = action.payload;

  if (!isOnline) return;

  // lấy logs chưa sync
  const logs: Log[] = yield select((state: RootState) => state.logs.logs);

  const unsyncedLogs = logs.filter(l => !l.synced);

  if (unsyncedLogs.length === 0) return;

  try {
    yield call(syncLogsApi, unsyncedLogs);

    const ids = unsyncedLogs.map(l => l.id);
    yield put(updateSyncedLogs(ids));

    console.log('✅ Sync success');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log('❌ Sync failed');
  }
}

export default function* rootSaga() {
  yield takeEvery(addLog.type, handleSave);
  yield takeEvery(updateLog.type, handleSave);
  yield takeLatest(initLogs.type, handleInitLogs);
  yield takeLatest(setOnline.type, handleNetworkChange);
}
