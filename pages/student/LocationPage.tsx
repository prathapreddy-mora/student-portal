
import React from 'react';

const LocationPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6 md:p-12">
      <div className="bg-brand-surface rounded-lg shadow-xl p-8 md:p-12">
        <h2 className="text-4xl font-extrabold text-brand-primary mb-8 text-center">Our Location</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Using a static image to represent a map */}
            <img src="https://picsum.photos/seed/map/1200/600" alt="Map Location" className="rounded-lg shadow-lg w-full h-full object-cover"/>
          </div>
          <div className="md:col-span-1 text-lg text-brand-text-secondary bg-gray-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-brand-primary mb-4">Hostel Address</h3>
            <p className="font-semibold">Reddy Hostel</p>
            <p>123, Knowledge Park,</p>
            <p>Near Tech University,</p>
            <p>Hyderabad, Telangana - 500001</p>
            <p className="mt-4">
              <strong>Landmark:</strong> Opposite Central Library
            </p>
            <a 
              href="https://maps.app.goo.gl/F7rKUxzdTKZBWzmC9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-6 block w-full text-center bg-brand-primary text-white font-bold py-2 px-4 rounded-md hover:bg-brand-primary-dark transition-colors duration-300"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
