
import { FileItem, Transaction, Device } from './types';

export const MOCK_DEVICES: Device[] = [
  { id: '1', name: 'MacBook Pro - Office', status: 'online', ip: '192.168.1.15' },
  { id: '2', name: 'iPhone 15 Pro', status: 'online', ip: '192.168.1.22' },
  { id: '3', name: 'Windows Studio', status: 'offline', ip: '192.168.1.40' },
  { id: '4', name: 'iPad Air', status: 'online', ip: '192.168.1.18' }
];

export const MOCK_FILE_SYSTEM: FileItem[] = [
  {
    id: 'f1',
    name: 'Documents',
    type: 'folder',
    modified: '2023-10-24 10:22',
    children: [
      { id: 'f1-1', name: 'Project_Alpha.pdf', type: 'file', size: '2.4 MB', modified: '2023-10-24 09:15' },
      { id: 'f1-2', name: 'Invoice_Q3.xlsx', type: 'file', size: '1.1 MB', modified: '2023-10-23 16:45' },
    ]
  },
  {
    id: 'f2',
    name: 'Images',
    type: 'folder',
    modified: '2023-10-22 14:10',
    children: [
      { id: 'f2-1', name: 'Vacation.jpg', type: 'file', size: '4.8 MB', modified: '2023-10-21 11:30' },
      { id: 'f2-2', name: 'Screenshot_01.png', type: 'file', size: '890 KB', modified: '2023-10-24 08:20' },
    ]
  },
  { id: 'f3', name: 'config.sys', type: 'file', size: '12 KB', modified: '2023-10-24 12:00' },
  { id: 'f4', name: 'System_Logs.log', type: 'file', size: '512 KB', modified: '2023-10-24 11:55' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', sender: 'Local Node', receiver: 'MacBook Pro', fileName: 'Final_Report.docx', fileSize: '4.5MB', status: 'Success', timestamp: '2023-10-24 14:20' },
  { id: 't2', sender: 'iPhone 15', receiver: 'Local Node', fileName: 'IMG_2023.jpg', fileSize: '3.2MB', status: 'Success', timestamp: '2023-10-24 13:45' },
  { id: 't3', sender: 'Local Node', receiver: 'iPad Air', fileName: 'Tutorial.mp4', fileSize: '128MB', status: 'Pending', timestamp: '2023-10-24 15:10' },
];
