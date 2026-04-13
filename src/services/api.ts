import { Log } from "../types/log";

export const syncLogsApi = async (logs: Log[]) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('✅ Synced to server:', logs);
      resolve(true);
    }, 2000);
  });
};