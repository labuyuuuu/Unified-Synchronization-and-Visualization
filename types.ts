
export enum View {
  DASHBOARD = 'dashboard',
  FILES = 'files',
  MONITORING = 'monitoring',
  HISTORY = 'history',
  SETTINGS = 'settings'
}

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified: string;
  children?: FileItem[];
  icon?: string;
}

export interface SystemMetric {
  timestamp: string;
  cpu: number;
  ram: number;
  diskRead: number;
  diskWrite: number;
  networkUp: number;
  networkDown: number;
}

export interface Transaction {
  id: string;
  sender: string;
  receiver: string;
  fileName: string;
  fileSize: string;
  status: 'Success' | 'Failed' | 'Pending';
  timestamp: string;
}

export interface Device {
  id: string;
  name: string;
  status: 'online' | 'offline';
  ip: string;
}
