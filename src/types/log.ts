export type LogStatus = 'COMPLETED' | 'PENDING';

export interface Log {
  id: string;
  name: string;
  date: string;
  notes: string;
  status: LogStatus;
  synced?: boolean;
}