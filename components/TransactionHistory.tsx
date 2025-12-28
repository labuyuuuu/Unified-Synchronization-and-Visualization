
import React, { useState } from 'react';
import { Search, Download, Trash2, Filter, MoreHorizontal, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionHistoryProps {
  history: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ history }) => {
  const [filter, setFilter] = useState('');

  const filteredHistory = history.filter(t => 
    t.fileName.toLowerCase().includes(filter.toLowerCase()) || 
    t.receiver.toLowerCase().includes(filter.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success': return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'Failed': return <AlertCircle size={16} className="text-red-500" />;
      default: return <Clock size={16} className="text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Transaction History</h2>
          <p className="text-slate-400 text-sm">Persistent log of all file transmissions across the network</p>
        </div>
        <div className="flex gap-2">
          <button className="p-3 bg-white text-slate-500 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
            <Trash2 size={18} />
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[650px]">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Filter by filename or device..." 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {['All', 'Success', 'Pending', 'Failed'].map((tab) => (
                <button 
                  key={tab}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    tab === 'All' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600"><Filter size={18} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-slate-100">
              <tr className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                <th className="px-8 py-4">Transaction ID</th>
                <th className="px-8 py-4">File Name</th>
                <th className="px-8 py-4">Participants</th>
                <th className="px-8 py-4">Size</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Timestamp</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredHistory.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 group transition-colors">
                  <td className="px-8 py-5">
                    <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">#{t.id}</span>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-slate-700">{t.fileName}</p>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-600">{t.sender}</span>
                      <span className="text-[10px] text-slate-300">→</span>
                      <span className="text-xs font-bold text-indigo-600">{t.receiver}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-medium text-slate-500">{t.fileSize}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(t.status)}
                      <span className={`text-xs font-bold ${
                        t.status === 'Success' ? 'text-emerald-600' : 
                        t.status === 'Failed' ? 'text-red-500' : 'text-amber-500'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs text-slate-400">{t.timestamp}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-white rounded-xl transition-all shadow-sm">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredHistory.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-300">
              <Search size={48} strokeWidth={1} className="mb-4" />
              <p className="text-sm font-medium">No transactions found matching your filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
