
import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentNavbar from '../../components/student/StudentNavbar';

const StudentLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-bg">
      <StudentNavbar />
      <main>
        <Outlet />
      </main>
      <footer className="bg-brand-surface mt-12 py-6 border-t">
          <div className="container mx-auto text-center text-brand-text-secondary">
              <p>&copy; {new Date().getFullYear()} Reddy Hostel. All Rights Reserved.</p>
              <p className="text-sm mt-1">Dedicated to supporting Reddy community students.</p>
          </div>
      </footer>
    </div>
  );
};

export default StudentLayout;
