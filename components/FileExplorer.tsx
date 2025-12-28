
import React, { useState } from 'react';
// Added Activity to the imports below to fix the "Cannot find name 'Activity'" error.
import { 
  Folder, File, Search, ChevronRight, MoreHorizontal, 
  Share2, Trash2, ExternalLink, Filter, Grid, List as ListIcon,
  Download, CheckCircle2, Clock, X, Activity
} from 'lucide-react';
import { FileItem, Transaction, Device } from '../types';
import { MOCK_DEVICES } from '../constants';

interface FileExplorerProps {
  files: FileItem[];
  onShare: (t: Transaction) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ files, onShare }) => {
  const [selectedFolder, setSelectedFolder] = useState<FileItem | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, file: FileItem } | null>(null);
  const [shareModal, setShareModal] = useState<FileItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleContextMenu = (e: React.MouseEvent, file: FileItem) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, file });
  };

  const closeContextMenu = () => setContextMenu(null);

  const handleShare = (device: Device) => {
    if (!shareModal) return;
    
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      sender: 'Local Node',
      receiver: device.name,
      fileName: shareModal.name,
      fileSize: shareModal.size || 'Unknown',
      status: 'Pending',
      timestamp: new Date().toLocaleString()
    };

    onShare(newTransaction);
    setShareModal(null);
    alert(`Initiating transfer of "${shareModal.name}" to ${device.name}...`);
  };

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6" onClick={closeContextMenu}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">File Explorer</h2>
          <p className="text-slate-400 text-sm">Manage and synchronize your assets across nodes</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white rounded-xl border border-slate-100 p-1">
            <button className="p-2 bg-slate-50 text-indigo-600 rounded-lg"><Grid size={18} /></button>
            <button className="p-2 text-slate-400 hover:text-slate-600"><ListIcon size={18} /></button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all">
            <Download size={18} /> Import
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation / Folders */}
        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col h-[600px]">
          <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Storage</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 bg-indigo-50 text-indigo-600 rounded-xl group transition-all">
                <div className="flex items-center gap-3">
                  <Folder size={18} fill="currentColor" fillOpacity={0.1} />
                  <span className="font-bold text-sm">Local Storage</span>
                </div>
                <ChevronRight size={14} className="text-indigo-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
                <div className="flex items-center gap-3">
                  <Share2 size={18} />
                  <span className="font-medium text-sm">Shared Items</span>
                </div>
                <ChevronRight size={14} className="text-slate-300" />
              </button>
              <button className="w-full flex items-center justify-between p-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
                <div className="flex items-center gap-3">
                  <Clock size={18} />
                  <span className="font-medium text-sm">Recent</span>
                </div>
                <ChevronRight size={14} className="text-slate-300" />
              </button>
            </div>
          </div>

          <div className="mt-auto p-4 bg-slate-50 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-bold text-slate-500">Storage Used</p>
              <p className="text-xs font-bold text-indigo-600">82%</p>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full" style={{ width: '82%' }}></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">18.4 GB of 25 GB free</p>
          </div>
        </div>

        {/* File Browser Area */}
        <div className="lg:col-span-3 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[600px]">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search files..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-indigo-100 outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600"><Filter size={18} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-slate-100">
                <tr className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Last Modified</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredFiles.map((file) => (
                  <tr 
                    key={file.id} 
                    className="hover:bg-slate-50 group cursor-pointer transition-colors"
                    onContextMenu={(e) => handleContextMenu(e, file)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${file.type === 'folder' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                          {file.type === 'folder' ? <Folder size={18} fill="currentColor" fillOpacity={0.2} /> : <File size={18} />}
                        </div>
                        <span className="text-sm font-bold text-slate-700">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500 capitalize">{file.type}</td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">{file.size || '-'}</td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-400">{file.modified}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleContextMenu(e, file); }}
                        className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div 
          className="fixed bg-white border border-slate-100 shadow-2xl rounded-2xl py-2 w-48 z-[100] animate-in zoom-in-95 duration-100"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
            <ExternalLink size={16} /> Open
          </button>
          <button 
            onClick={() => { setShareModal(contextMenu.file); closeContextMenu(); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          >
            <Share2 size={16} /> Share
          </button>
          <div className="h-[1px] bg-slate-100 my-1 mx-2"></div>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
            <Trash2 size={16} /> Delete
          </button>
        </div>
      )}

      {/* Share Modal */}
      {shareModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Share File</h3>
                <p className="text-slate-400 text-sm mt-1">Select device to transmit "{shareModal.name}"</p>
              </div>
              <button 
                onClick={() => setShareModal(null)}
                className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar pr-2 mb-8">
              {MOCK_DEVICES.map(device => (
                <button
                  key={device.id}
                  onClick={() => handleShare(device)}
                  disabled={device.status === 'offline'}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                    device.status === 'offline' 
                      ? 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed' 
                      : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-md active:scale-95'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${device.status === 'online' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    <Activity size={18} />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-bold text-slate-800">{device.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{device.ip}</p>
                  </div>
                  {device.status === 'online' ? <CheckCircle2 size={18} className="text-emerald-500" /> : <X size={18} className="text-slate-300" />}
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setShareModal(null)}
                className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
