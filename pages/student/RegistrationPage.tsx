import React from 'react';

const RegistrationPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-brand-surface rounded-lg shadow-xl overflow-hidden">
        <div className="bg-brand-primary p-4 md:p-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Student Registration</h2>
            <p className="text-blue-100 mt-2">Please fill out the details below to register.</p>
        </div>
        <div className="w-full bg-white flex justify-center">
            <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSc1BDMV65orvsHJdCy3NjSDJt0T3OVzdtXqzi4dHufX4mPTPQ/viewform?embedded=true" 
                width="100%" 
                height="1600" 
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0} 
                title="Student Registration Google Form"
                className="w-full max-w-5xl"
            >
                Loading…
            </iframe>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;