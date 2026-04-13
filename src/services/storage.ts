import AsyncStorage from '@react-native-async-storage/async-storage';
import { Log } from '../types/log';

const KEY = 'LOGS';

export const saveLogs = async (logs: Log[]) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(logs));
};

export const getLogs = async (): Promise<Log[]> => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};