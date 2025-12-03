import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Mail, Bell, Building2, Trash2, RefreshCcw, Lock, ArrowRight, AlertCircle, Search, Download, X, Eye, UserPlus } from 'lucide-react';
import { STORAGE_KEYS, getSubmissions, clearSubmissions, deleteSubmission } from '../services/storageService';

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('users');
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Stats state
  const [stats, setStats] = useState({
      users: 0,
      drivers: 0,
      business: 0,
      contact: 0,
      waitlist: 0
  });

  // Check session storage on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem('sastaload_admin_auth');
    if (isAuth === 'true') {
        setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (passwordInput === 'Kamran786') {
          setIsAuthenticated(true);
          setAuthError('');
          sessionStorage.setItem('sastaload_admin_auth', 'true');
      } else {
          setAuthError('Incorrect password');
      }
  };

  const loadData = () => {
    // Load all stats for the top cards
    setStats({
        users: getSubmissions(STORAGE_KEYS.USERS).length,
        drivers: getSubmissions(STORAGE_KEYS.DRIVERS).length,
        business: getSubmissions(STORAGE_KEYS.BUSINESS).length,
        contact: getSubmissions(STORAGE_KEYS.CONTACT).length,
        waitlist: getSubmissions(STORAGE_KEYS.WAITLIST).length
    });

    // Load active tab data
    let currentData = [];
    switch (activeTab) {
        case 'users': currentData = getSubmissions(STORAGE_KEYS.USERS); break;
        case 'drivers': currentData = getSubmissions(STORAGE_KEYS.DRIVERS); break;
        case 'business': currentData = getSubmissions(STORAGE_KEYS.BUSINESS); break;
        case 'contact': currentData = getSubmissions(STORAGE_KEYS.CONTACT); break;
        case 'waitlist': currentData = getSubmissions(STORAGE_KEYS.WAITLIST); break;
    }
    setData(currentData);
  };

  useEffect(() => {
    if (isAuthenticated) {
        loadData();
    }
  }, [activeTab, isAuthenticated]);

  const handleDelete = (id: string) => {
      if (window.confirm("Delete this record?")) {
          let key = '';
          switch (activeTab) {
              case 'users': key = STORAGE_KEYS.USERS; break;
              case 'drivers': key = STORAGE_KEYS.DRIVERS; break;
              case 'business': key = STORAGE_KEYS.BUSINESS; break;
              case 'contact': key = STORAGE_KEYS.CONTACT; break;
              case 'waitlist': key = STORAGE_KEYS.WAITLIST; break;
          }
          deleteSubmission(key, id);
          loadData();
      }
  };

  const handleExportCSV = () => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).map(val => `"${val}"`).join(','));
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sastaload_${activeTab}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
      sessionStorage.removeItem('sastaload_admin_auth');
      setPasswordInput('');
  };

  // Filter data based on search
  const filteredData = data.filter(item => 
      Object.values(item).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const StatCard = ({ title, count, icon: Icon, active, onClick }: any) => (
      <button 
        onClick={onClick}
        className={`p-6 rounded-2xl border transition-all text-left flex flex-col justify-between h-32 relative overflow-hidden group ${
            active 
            ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20' 
            : 'bg-white border-slate-200 text-slate-600 hover:border-brand hover:shadow-md'
        }`}
      >
          <div className="flex justify-between items-start z-10">
              <span className={`text-sm font-bold uppercase tracking-wider ${active ? 'text-slate-400' : 'text-slate-500'}`}>{title}</span>
              <div className={`p-2 rounded-lg ${active ? 'bg-white/10 text-brand' : 'bg-slate-100 text-slate-900'}`}>
                  <Icon size={20} />
              </div>
          </div>
          <div className="z-10">
              <span className={`text-3xl font-extrabold ${active ? 'text-white' : 'text-slate-900'}`}>{count}</span>
          </div>
          {/* Decorative Circle */}
          <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full transition-all duration-500 ${
              active ? 'bg-brand/10 group-hover:bg-brand/20' : 'bg-slate-100 group-hover:bg-brand/10'
          }`}></div>
      </button>
  );

  const renderContent = () => {
    if (filteredData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Search size={32} className="text-slate-300" />
                </div>
                <p className="font-medium">No records found matching your search.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto pb-4">
            <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase sticky left-0 bg-slate-50">Date</th>
                        {activeTab === 'users' && (
                            <>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Full Name</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Role</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Contact</th>
                            </>
                        )}
                        {activeTab === 'drivers' && (
                            <>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Driver Name</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Contact</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Details</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Vehicle Info</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Location</th>
                            </>
                        )}
                        {activeTab === 'business' && (
                            <>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Company</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Contact</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Address</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Scale</th>
                            </>
                        )}
                        {activeTab === 'contact' && (
                            <>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">User</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Subject</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Message</th>
                            </>
                        )}
                        {activeTab === 'waitlist' && (
                            <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase">Email Address</th>
                        )}
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item: any) => (
                        <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors group">
                            <td className="py-4 px-6 text-sm text-slate-500 sticky left-0 bg-white group-hover:bg-slate-50/80 font-mono">
                                {new Date(item.timestamp).toLocaleDateString()}
                                <div className="text-[10px] text-slate-400">{new Date(item.timestamp).toLocaleTimeString()}</div>
                            </td>

                            {activeTab === 'users' && (
                                <>
                                    <td className="py-4 px-6 font-bold text-slate-900">{item.name}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                            item.role === 'driver' ? 'bg-orange-50 text-orange-700' : 'bg-blue-50 text-blue-700'
                                        }`}>
                                            {item.role.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-sm font-medium text-slate-700">{item.email}</div>
                                        <div className="text-xs text-slate-500">{item.phone}</div>
                                    </td>
                                </>
                            )}

                            {activeTab === 'drivers' && (
                                <>
                                    <td className="py-4 px-6">
                                        <div className="font-bold text-slate-900">{item.fullName}</div>
                                        <div className="text-xs text-slate-500">CNIC: {item.cnic}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-sm font-medium text-slate-700">{item.phone}</div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-600">
                                        <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold">Lic: {item.licenseNo}</span>
                                        <span className="ml-2 text-xs text-slate-500">{item.experience} Yrs Exp</span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-600">
                                        <div className="font-bold text-slate-900">{item.vehicleType}</div>
                                        <div className="text-xs font-mono text-slate-500">{item.vehicleReg}</div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-600 max-w-[200px] truncate" title={item.address}>{item.address}</td>
                                </>
                            )}

                            {activeTab === 'business' && (
                                <>
                                    <td className="py-4 px-6 font-bold text-slate-900">
                                        {item.companyName}
                                        {item.website && <a href={item.website} target="_blank" rel="noreferrer" className="block text-[10px] text-brand-dark hover:underline font-normal truncate max-w-[150px]">{item.website}</a>}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-sm font-medium text-slate-900">{item.email}</div>
                                        <div className="text-xs text-slate-500">{item.phone}</div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-600 max-w-[200px] truncate" title={item.address}>{item.address}</td>
                                    <td className="py-4 px-6">
                                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-bold">{item.volume}</span>
                                    </td>
                                </>
                            )}

                            {activeTab === 'contact' && (
                                <>
                                    <td className="py-4 px-6">
                                        <div className="font-bold text-slate-900">{item.name}</div>
                                        <div className="text-xs text-slate-500">{item.email}</div>
                                    </td>
                                    <td className="py-4 px-6 text-sm">
                                        <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-600">{item.subject}</span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-600 max-w-md truncate" title={item.message}>{item.message}</td>
                                </>
                            )}

                            {activeTab === 'waitlist' && (
                                <td className="py-4 px-6 font-bold text-slate-900">{item.email}</td>
                            )}

                            <td className="py-4 px-6 text-right">
                                <button 
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete Record"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
  };

  if (!isAuthenticated) {
      return (
          <div className="min-h-screen bg-slate-50 pt-32 pb-20 flex items-center justify-center px-4">
              <div className="bg-white p-8 rounded-[32px] shadow-xl border border-slate-100 w-full max-w-md text-center">
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Lock className="text-white" size={32} />
                  </div>
                  <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Admin Portal</h1>
                  <p className="text-slate-500 font-medium mb-8">Secured Access Area</p>
                  
                  <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                          <input 
                              type="password" 
                              value={passwordInput}
                              onChange={(e) => setPasswordInput(e.target.value)}
                              placeholder="Enter Access Key" 
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-400 text-center"
                              autoFocus
                          />
                      </div>
                      
                      {authError && (
                          <div className="flex items-center justify-center gap-2 text-red-500 font-bold text-sm bg-red-50 p-3 rounded-xl">
                              <AlertCircle size={16} /> {authError}
                          </div>
                      )}

                      <button 
                          type="submit" 
                          className="w-full bg-brand hover:bg-brand-hover text-slate-900 font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand/20 flex items-center justify-center gap-2"
                      >
                          Unlock Dashboard <ArrowRight size={20} />
                      </button>
                  </form>
              </div>
          </div>
      );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20 font-sans">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
                    <div className="bg-brand p-2 rounded-lg text-slate-900">
                        <LayoutDashboard size={24} />
                    </div>
                    SastaLoad Admin
                </h1>
                <p className="text-slate-500 font-medium mt-1 ml-14">Overview of all platform activity</p>
            </div>
            
            <button onClick={handleLogout} className="bg-slate-900 text-white hover:bg-slate-800 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all">
                Logout <ArrowRight size={18} />
            </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard 
                title="Signups" 
                count={stats.users} 
                icon={UserPlus} 
                active={activeTab === 'users'} 
                onClick={() => setActiveTab('users')} 
            />
            <StatCard 
                title="Drivers" 
                count={stats.drivers} 
                icon={Users} 
                active={activeTab === 'drivers'} 
                onClick={() => setActiveTab('drivers')} 
            />
            <StatCard 
                title="Business Leads" 
                count={stats.business} 
                icon={Building2} 
                active={activeTab === 'business'} 
                onClick={() => setActiveTab('business')} 
            />
            <StatCard 
                title="Inquiries" 
                count={stats.contact} 
                icon={Mail} 
                active={activeTab === 'contact'} 
                onClick={() => setActiveTab('contact')} 
            />
            <StatCard 
                title="Waitlist" 
                count={stats.waitlist} 
                icon={Bell} 
                active={activeTab === 'waitlist'} 
                onClick={() => setActiveTab('waitlist')} 
            />
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 overflow-hidden">
            
            {/* Toolbar */}
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="text" 
                        placeholder={`Search ${activeTab}...`} 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 font-bold focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all placeholder:font-medium"
                    />
                </div>
                
                <div className="flex gap-2 w-full md:w-auto">
                    <button onClick={loadData} className="flex-1 md:flex-none bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all" title="Refresh Data">
                        <RefreshCcw size={18} /> <span className="hidden sm:inline">Refresh</span>
                    </button>
                    <button onClick={handleExportCSV} className="flex-1 md:flex-none bg-slate-50 border border-slate-200 text-slate-600 hover:text-brand-dark hover:border-brand hover:bg-brand/10 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all" title="Export CSV">
                        <Download size={18} /> <span className="hidden sm:inline">Export</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="min-h-[400px]">
                {renderContent()}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-400 font-medium">
                Data stored locally in browser storage. Clearing browser cache will remove this data.
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;