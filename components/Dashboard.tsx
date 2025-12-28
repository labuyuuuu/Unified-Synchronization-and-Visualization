
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { Cpu, MemoryStick, HardDrive, Network, TrendingUp, MoreVertical, Plus } from 'lucide-react';
import { SystemMetric } from '../types';

interface DashboardProps {
  metrics: SystemMetric[];
}

const Dashboard: React.FC<DashboardProps> = ({ metrics }) => {
  const current = metrics[metrics.length - 1] || { cpu: 0, ram: 0, diskRead: 0, networkDown: 0 };

  const summaryCards = [
    { label: 'CPU Usage', value: `${current.cpu}%`, icon: Cpu, color: 'text-blue-500', bg: 'bg-blue-50', trend: '+2.4%' },
    { label: 'RAM Usage', value: `${current.ram}%`, icon: MemoryStick, color: 'text-purple-500', bg: 'bg-purple-50', trend: '-0.8%' },
    { label: 'Disk IO', value: `${current.diskRead} MB/s`, icon: HardDrive, color: 'text-amber-500', bg: 'bg-amber-50', trend: '+12 MB' },
    { label: 'Network', value: `${current.networkDown} KB/s`, icon: Network, color: 'text-emerald-500', bg: 'bg-emerald-50', trend: 'Active' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-100">
        <div className="relative z-10 space-y-4 max-w-2xl">
          <p className="text-indigo-100 font-medium tracking-wide">SYSTEM OVERVIEW</p>
          <h2 className="text-4xl font-bold leading-tight">Unified Sync & Performance Visualization Dashboard</h2>
          <p className="text-indigo-100/80 leading-relaxed">
            All systems are operational. You have 3 active file transfers and your local node is synchronized with 4 devices.
          </p>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-50 transition-all active:scale-95">
            Sync Now <TrendingUp size={18} />
          </button>
        </div>
        {/* Background blobs for aesthetics */}
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`${card.bg} ${card.color} p-3 rounded-2xl`}>
                <card.icon size={24} />
              </div>
              <button className="text-slate-300 hover:text-slate-500 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">{card.label}</p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-bold text-slate-800">{card.value}</h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${card.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
                  {card.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CPU Performance History */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-800">System Activity</h3>
              <p className="text-sm text-slate-400">Real-time CPU and Memory performance load</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                <span className="text-xs font-medium text-slate-500">CPU</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-300"></span>
                <span className="text-xs font-medium text-slate-500">RAM</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="timestamp" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} hide />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="cpu" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCpu)" />
                <Area type="monotone" dataKey="ram" stroke="#c084fc" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status / Devices */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">Linked Devices</h3>
            <button className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors">
              <Plus size={18} />
            </button>
          </div>
          
          <div className="space-y-6 flex-1">
            {[
              { name: 'MacBook Pro', status: 'Online', ip: '192.168.1.15', battery: '84%' },
              { name: 'iPhone 15', status: 'Online', ip: '192.168.1.22', battery: '92%' },
              { name: 'Server Rack 01', status: 'Processing', ip: '192.168.1.4', battery: 'N/A' },
              { name: 'iPad Studio', status: 'Standby', ip: '192.168.1.18', battery: '45%' },
            ].map((device, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-all">
                  <Cpu size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{device.name}</p>
                  <p className="text-xs text-slate-400">{device.ip}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-bold ${device.status === 'Online' ? 'text-emerald-500' : 'text-slate-400'}`}>{device.status}</p>
                  <p className="text-[10px] text-slate-400 font-medium">Batt: {device.battery}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-colors">
            Manage All Connections
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
