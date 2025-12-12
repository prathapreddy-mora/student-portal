import React from 'react';

const adminData = {
  name: 'Mr. K. Sudarshan Reddy',
  title: 'Hostel Warden',
  email: 'warden@reddyhostel.org',
  phone: '+91 91234 56789',
  officeHours: 'Mon - Fri, 9:00 AM - 5:00 PM',
  bio: 'With over 15 years of experience in student management, Mr. Reddy is dedicated to ensuring a safe, disciplined, and supportive environment for all our students. He is always available to address concerns and provide guidance.',
  imageUrl: 'https://i.pravatar.cc/150?u=warden-admin'
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row py-3 border-b border-gray-200">
        <span className="font-medium text-brand-text-secondary w-full sm:w-1/3">{label}</span>
        <span className="text-brand-text">{value}</span>
    </div>
);

const AdminProfilePage: React.FC = () => {
    return (
        <div className="container mx-auto p-6 md:p-12">
            <div className="bg-brand-surface rounded-lg shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
                <h2 className="text-4xl font-extrabold text-brand-primary mb-8 text-center">Meet Our Administration</h2>

                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                    <img
                        src={adminData.imageUrl}
                        alt="Hostel Warden"
                        className="w-40 h-40 rounded-full border-4 border-brand-primary shadow-lg object-cover"
                    />
                    <div className="md:ml-8 mt-6 md:mt-0">
                        <h3 className="text-3xl font-bold text-gray-800">{adminData.name}</h3>
                        <p className="text-xl text-brand-text-secondary mt-1">{adminData.title}</p>
                        <p className="text-md text-brand-text mt-4">{adminData.bio}</p>
                    </div>
                </div>

                <div className="mt-10">
                    <h4 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-brand-primary">Contact & Availability</h4>
                    <div className="space-y-2 text-lg">
                        <InfoRow label="Email Address" value={adminData.email} />
                        <InfoRow label="Phone Number" value={adminData.phone} />
                        <InfoRow label="Office Hours" value={adminData.officeHours} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfilePage;