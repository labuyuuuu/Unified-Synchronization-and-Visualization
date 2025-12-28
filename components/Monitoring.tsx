
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';
import { Cpu, MemoryStick, HardDrive, Network } from 'lucide-react';
import { SystemMetric } from '../types';

interface MonitoringProps {
  metrics: SystemMetric[];
}

const COLORS = ['#6366f1', '#c084fc', '#fbbf24', '#10b981'];

const Monitoring: React.FC<MonitoringProps> = ({ metrics }) => {
  const lastMetric = metrics[metrics.length - 1] || { cpu: 0, ram: 0, diskRead: 0, diskWrite: 0, networkUp: 0, networkDown: 0 };

  const ramPieData = [
    { name: 'Used', value: lastMetric.ram },
    { name: 'Free', value: 100 - lastMetric.ram },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Advanced Monitoring</h2>
          <p className="text-slate-400 text-sm">Fine-grained real-time analytics of your node performance</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 text-xs font-bold text-slate-500 shadow-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          LIVE UPDATES
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CPU Detailed Trend */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-blue-50 text-blue-500 rounded-xl">
              <Cpu size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">CPU Load History</h3>
              <p className="text-xs text-slate-400">Past 60 minutes distribution</p>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics}>
                <defs>
                  <linearGradient id="colorCpuDetailed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="timestamp" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} unit="%" />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCpuDetailed)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RAM Pie + Trend */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-purple-50 text-purple-500 rounded-xl">
                <MemoryStick size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Memory Allocation</h3>
            </div>
            <div className="h-[200px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ramPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    <Cell fill="#a855f7" />
                    <Cell fill="#f3e8ff" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-slate-800">{lastMetric.ram}%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Used</span>
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-xs font-medium text-slate-500">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-100"></span>
                <span className="text-xs font-medium text-slate-500">Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disk IO */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-amber-50 text-amber-500 rounded-xl">
              <HardDrive size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Disk I/O Throughput</h3>
              <p className="text-xs text-slate-400">Real-time Read/Write speeds</p>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="timestamp" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} hide />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} unit="MB" />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px', fontWeight: 600, paddingTop: '20px'}} />
                <Bar dataKey="diskRead" name="Read" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="diskWrite" name="Write" fill="#fed7aa" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Network Traffic */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-emerald-50 text-emerald-500 rounded-xl">
              <Network size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Network Traffic</h3>
              <p className="text-xs text-slate-400">Uplink vs Downlink saturation</p>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="timestamp" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} hide />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} unit="KB" />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none'}} />
                <Area type="step" dataKey="networkDown" stroke="#10b981" fill="#d1fae5" strokeWidth={2} name="Download" />
                <Area type="step" dataKey="networkUp" stroke="#34d399" fill="transparent" strokeWidth={2} name="Upload" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
