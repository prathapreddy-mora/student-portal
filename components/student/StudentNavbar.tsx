import React from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { name: 'About', path: '/student/about' },
  { name: 'Facilities', path: '/student/facilities' },
  { name: 'Photo Gallery', path: '/student/gallery' },
  { name: 'Location', path: '/student/location' },
  { name: 'Registration', path: '/student/registration' },
  { name: 'Contact Warden', path: '/student/contact' },
];


const StudentNavbar: React.FC = () => {

  return (
    <>
      <nav className="bg-brand-surface shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4a1 1 0 001 1h1a1 1 0 000-2H5a1 1 0 00-1 1zm11 0a1 1 0 001 1h1a1 1 0 100-2h-1a1 1 0 00-1 1zM4 10a1 1 0 001 1h1a1 1 0 100-2H5a1 1 0 00-1 1zm11 0a1 1 0 001 1h1a1 1 0 100-2h-1a1 1 0 00-1 1zM10 16a1 1 0 001 1h1a1 1 0 100-2h-1a1 1 0 00-1 1zM4 16a1 1 0 001 1h1a1 1 0 100-2H5a1 1 0 00-1 1zm11 0a1 1 0 001 1h1a1 1 0 100-2h-1a1 1 0 00-1 1zM10 6a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
            </svg>
            <h1 className="text-2xl font-bold text-brand-primary ml-2">Reddy Hostel</h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `text-lg font-medium transition-colors duration-300 ${isActive ? 'text-brand-primary' : 'text-brand-text-secondary hover:text-brand-primary'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          {/* Mobile menu button could be added here */}
        </div>
      </nav>
    </>
  );
};

export default StudentNavbar;