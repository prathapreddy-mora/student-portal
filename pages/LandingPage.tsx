import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAppContext();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'prathapreddymora8@gmail.com' && password === '1234') {
      setError('');
      login();
      navigate('/admin/dashboard');
    } else {
      setError('Invalid Admin ID or Password.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-4">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary">
          REDDY JANABHUDAYA SANGAM
        </h1>
        <p className="text-xl text-brand-text-secondary mt-2">(REDDY HOSTEL)</p>
        <p className="text-lg text-brand-text mt-4 max-w-2xl">
          A home for students from the Reddy community, providing support for academic success.
        </p>
      </header>
      
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Admin Login Section */}
        <div className="bg-brand-surface rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-brand-primary mb-6">Admin Login</h2>
          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Admin ID</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                placeholder="Enter Admin ID"
              />
            </div>
            <div>
              <label htmlFor="password"className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                placeholder="Enter Password"
              />
            </div>
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            <button type="submit" className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-md hover:bg-brand-primary-dark transition-colors duration-300">
              Login to Dashboard
            </button>
          </form>
        </div>

        {/* Student Portal Section */}
        <div className="bg-brand-surface rounded-xl shadow-lg p-8 border border-gray-200 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-brand-primary mb-6">Student Portal</h2>
            <p className="text-brand-text-secondary mb-6">
                New to Reddy Hostel? Register here to begin your journey with us. Existing students can access portal information.
            </p>
            <div className="w-full space-y-4">
                 <Link to="/student/registration" className="block w-full bg-brand-secondary text-white font-bold py-3 px-4 rounded-md hover:bg-brand-secondary-dark transition-colors duration-300">
                    New Student Registration
                </Link>
                <Link to="/student/about" className="block w-full bg-gray-200 text-brand-text-secondary font-bold py-3 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300">
                    Explore Hostel Info
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;