
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAppContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication. In a real application, this would involve a backend API call.
    if (username === 'admin' && password === 'password') {
      setError('');
      login();
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg p-4">
      <div className="w-full max-w-lg p-8 space-y-6 bg-brand-surface rounded-xl shadow-2xl border border-gray-200">
        <div className="text-center">
            <img src="https://picsum.photos/seed/logo/100/100" alt="Hostel Logo" className="mx-auto h-20 w-20 rounded-full" />
            <h2 className="mt-4 text-2xl font-bold text-brand-primary">
                REDDY JANABHUDAYA SANGAM
            </h2>
            <p className="text-brand-text-secondary">(REDDY HOSTEL)</p>
            <h3 className="mt-6 text-xl font-semibold text-brand-text">Admin Login</h3>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                    placeholder="Enter your username"
                />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                placeholder="Enter your password"
              />
            </div>
          </div>
          
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-light transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;