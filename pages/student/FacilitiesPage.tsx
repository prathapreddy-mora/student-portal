
import React from 'react';

const facilities = [
  { name: 'Spacious Rooms', description: 'Well-ventilated and furnished rooms with study tables, chairs, and cupboards.', icon: '🛏️', img: 'https://picsum.photos/400/300?random=10' },
  { name: 'Hygienic Mess', description: 'Nutritious and delicious meals served three times a day in a clean dining hall.', icon: '🍽️', img: 'https://picsum.photos/400/300?random=11' },
  { name: 'High-Speed Wi-Fi', description: '24/7 high-speed internet connectivity for all academic and recreational needs.', icon: '🌐', img: 'https://picsum.photos/400/300?random=12' },
  { name: '24/7 Security', description: 'CCTV surveillance and dedicated security personnel to ensure a safe environment.', icon: '🛡️', img: 'https://picsum.photos/400/300?random=13' },
  { name: 'Recreation Area', description: 'Common room with TV, indoor games, and space for relaxation and socializing.', icon: '🎮', img: 'https://picsum.photos/400/300?random=14' },
  { name: 'Filtered Drinking Water', description: 'Purified water coolers available on every floor for safe drinking water.', icon: '💧', img: 'https://picsum.photos/400/300?random=15' },
];

const FacilitiesPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6 md:p-12">
      <div className="bg-brand-surface rounded-lg shadow-xl p-8 md:p-12">
        <h2 className="text-4xl font-extrabold text-brand-primary mb-8 text-center">Our Facilities</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <img src={facility.img} alt={facility.name} className="w-full h-40 object-cover rounded-md mb-4"/>
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">{facility.icon}</span>
                <h3 className="text-xl font-bold text-brand-primary">{facility.name}</h3>
              </div>
              <p className="text-brand-text-secondary">{facility.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacilitiesPage;
