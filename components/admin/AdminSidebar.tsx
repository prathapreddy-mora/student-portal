import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: '🏠' },
  { name: 'Applications', path: '/admin/applications', icon: '📥' },
  { name: 'Student Details', path: '/admin/students', icon: '👥' },
  { name: 'Fee Pending', path: '/admin/fees', icon: '💰' },
  { name: 'Rooms', path: '/admin/rooms', icon: '🚪' },
  { name: 'Messages', path: '/admin/messages', icon: '✉️' },
  { name: 'Attendance', path: '/admin/attendance', icon: '✅' },
  { name: 'Complaints', path: '/admin/complaints', icon: '📝' },
  { name: 'Offline Entry', path: '/admin/offline-registration', icon: '✍️' },
  { name: 'Warden Settings', path: '/admin/warden-settings', icon: '⚙️' },
];

const AdminSidebar: React.FC = () => {
    const { logout } = useAppContext();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logout();
        navigate('/');
    };

  return (
    <div className="w-64 bg-brand-surface text-brand-text flex flex-col min-h-screen border-r border-gray-200">
      <div className="p-6 text-center border-b border-gray-200">
        <h1 className="text-2xl font-bold text-brand-primary">Admin Panel</h1>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-3 rounded-md text-lg font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-50 text-brand-primary font-semibold'
                  : 'text-brand-text-secondary hover:bg-gray-100 hover:text-brand-primary'
              }`
            }
          >
            <div className="flex items-center">
                <span className="mr-3">{item.icon}</span>
                {item.name}
            </div>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-3 rounded-md text-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
        >
          <span className="mr-2">🔒</span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;