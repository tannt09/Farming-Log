// src/store/saga.ts
import { takeEvery, call, put, takeLatest, select } from 'redux-saga/effects';
import {
  addLogToStore,
  initLogs,
  setLogs,
  setOnline,
  updateLogToStore,
  updateSyncedLogs,
} from './logSlice';
import { getLogs, saveLogs } from '../services/storage';
import { syncLogsApi } from '../services/api';
import { Log } from '../types/log';
import mockLogs from '../data/logs.json';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

function* handleAddLog(action: PayloadAction<Log>) {
  const logs: Log[] = yield select((state: RootState) => state.logs.logs);
  const newLogs = [...logs, action.payload];
  yield put(setLogs(newLogs));
  yield call(saveLogs, newLogs);

  // giả lập online
  yield call(syncLogsApi, newLogs);
}

function* handleUpdateLog(action: PayloadAction<Log>) {
  const logs: Log[] = yield select((state: RootState) => state.logs.logs);

  const newLogs = [...logs]; // clone
  const index = newLogs.findIndex(l => l.id === action.payload.id);

  if (index !== -1) {
    newLogs[index] = action.payload; // ✅ OK vì đã clone
  }

  yield put(setLogs(newLogs));
  yield call(saveLogs, newLogs);
  yield call(syncLogsApi, newLogs);
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
  yield takeEvery(addLogToStore.type, handleAddLog);
  yield takeEvery(updateLogToStore.type, handleUpdateLog);
  yield takeLatest(initLogs.type, handleInitLogs);
  yield takeLatest(setOnline.type, handleNetworkChange);
}
