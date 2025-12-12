import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const AdminPortalLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAppContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      setError('');
      login();
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-auto text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4a1 1 0 001 1h1a1 1 0 000-2H5a1 1 0 00-1 1zm11 0a1 1 0 001 1h1a1 1 0 100-2h-1a1 1 0 00-1 1zM4 10a1 1 0 001 1h1a1 1 0 100-2H5a1 1 0 00-1 1zm11 0a1 1 0 001 1h1a1 1 0 100-2h-1a1 1 0 00-1 1zM10 16a1 1 0 001 1h1a1 1 0 100-2h-1a1 1 0 00-1 1zM4 16a1 1 0 001 1h1a1 1 0 100-2H5a1 1 0 00-1 1zm11 0a1 1 0 001 1h1a1 1 0 100-2h-1a1 1 0 00-1 1zM10 6a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
        </svg>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Portal Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Access to Reddy Hostel Management System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                />
              </div>
            </div>
            
            {error && (
              <div>
                <p className="text-xs text-red-600 text-center">{error}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-light"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPortalLogin;