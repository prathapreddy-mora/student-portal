import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useAppContext } from '../../context/AppContext';


const AdminLayout: React.FC = () => {
  const { syncStatus } = useAppContext();

  const getStatusColor = () => {
    switch (syncStatus.status) {
      case 'Synced': return 'text-green-600 bg-green-100';
      case 'Syncing...': return 'text-yellow-600 bg-yellow-100 animate-pulse';
      case 'Error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="flex bg-brand-bg">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto" style={{ maxHeight: '100vh' }}>
        <header className="flex justify-end items-center mb-6 -mt-4">
            <div className={`flex items-center gap-2 text-sm font-semibold p-2 rounded-lg shadow-sm border ${getStatusColor()}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span>Google Sheet Status:</span>
                <span className="font-bold">{syncStatus.status}</span>
                {syncStatus.status === 'Synced' && (
                    <span className="text-gray-500 font-normal">| {syncStatus.timestamp}</span>
                )}
            </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
