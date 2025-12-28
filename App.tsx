
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Files, 
  Activity, 
  History as HistoryIcon, 
  Settings, 
  LogOut,
  Search,
  Bell,
  User,
  ChevronRight
} from 'lucide-react';
import { View, SystemMetric, FileItem, Transaction } from './types';
import Dashboard from './components/Dashboard';
import FileExplorer from './components/FileExplorer';
import Monitoring from './components/Monitoring';
import TransactionHistory from './components/TransactionHistory';
import { MOCK_FILE_SYSTEM, MOCK_TRANSACTIONS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [files] = useState<FileItem[]>(MOCK_FILE_SYSTEM);
  const [history, setHistory] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Simulate real-time metrics collection
  useEffect(() => {
    const generateMetric = (): SystemMetric => ({
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      cpu: Math.floor(Math.random() * 40) + 10,
      ram: Math.floor(Math.random() * 20) + 60,
      diskRead: Math.floor(Math.random() * 50),
      diskWrite: Math.floor(Math.random() * 30),
      networkUp: Math.floor(Math.random() * 100),
      networkDown: Math.floor(Math.random() * 200),
    });

    // Initialize with some data
    const initialMetrics = Array.from({ length: 20 }, generateMetric);
    setMetrics(initialMetrics);

    const interval = setInterval(() => {
      setMetrics(prev => {
        const next = [...prev, generateMetric()];
        return next.length > 30 ? next.slice(1) : next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: View.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: View.FILES, label: 'Files', icon: Files },
    { id: View.MONITORING, label: 'Monitoring', icon: Activity },
    { id: View.HISTORY, label: 'History', icon: HistoryIcon },
    { id: View.SETTINGS, label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard metrics={metrics} />;
      case View.FILES:
        return <FileExplorer files={files} onShare={(t) => setHistory([t, ...history])} />;
      case View.MONITORING:
        return <Monitoring metrics={metrics} />;
      case View.HISTORY:
        return <TransactionHistory history={history} />;
      default:
        return <Dashboard metrics={metrics} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f9fc] text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-slate-100 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#6366f1] rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Activity size={24} />
          </div>
          {!isSidebarCollapsed && <h1 className="font-bold text-xl tracking-tight text-slate-800">USVS</h1>}
        </div>

        <nav className="flex-1 px-3 mt-4 space-y-1">
          <p className={`px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider ${isSidebarCollapsed ? 'text-center' : ''}`}>Overview</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                currentView === item.id 
                  ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <item.icon size={20} className={currentView === item.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'} />
              {!isSidebarCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors group">
            <LogOut size={20} className="text-slate-400 group-hover:text-red-500" />
            {!isSidebarCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search metrics or files..." 
                className="w-full bg-slate-100/50 border-none rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-6">
            <button className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-500 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-100 mx-2"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 leading-tight">Jason Ranti</p>
                <p className="text-xs text-slate-400">System Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
                <img src="https://picsum.photos/seed/jason/100/100" alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
