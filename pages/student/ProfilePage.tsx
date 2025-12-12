import React from 'react';
import { useAppContext } from '../../context/AppContext';

const ProfileInfoRow: React.FC<{ label: string; value: string | number | null | undefined; isBadge?: boolean }> = ({ label, value, isBadge = false }) => {
    if (!value) return null;
    return (
        <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="font-medium text-brand-text-secondary">{label}</span>
            {isBadge ? (
                 <span className={`px-3 py-1 text-sm font-semibold rounded-full ${value === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {value}
                </span>
            ) : (
                <span className="text-brand-text">{value}</span>
            )}
        </div>
    );
};

const ProfilePage: React.FC = () => {
    const { students } = useAppContext();

    // As there's no student login, we'll display a mock profile of the first student.
    const currentStudent = students[0];

    if (!currentStudent) {
        return (
            <div className="container mx-auto p-6 md:p-12 text-center">
                <h2 className="text-2xl font-bold text-brand-primary">No Student Data Available</h2>
                <p className="text-brand-text-secondary mt-2">Please register a student first.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 md:p-12">
            <div className="bg-brand-surface rounded-lg shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                    <img
                        src={currentStudent.photoUrl || `https://i.pravatar.cc/150?u=${currentStudent.id}`}
                        alt="Student Profile"
                        className="w-32 h-32 rounded-full border-4 border-brand-primary shadow-md object-cover"
                    />
                    <div className="md:ml-8 mt-6 md:mt-0">
                        <h2 className="text-4xl font-extrabold text-brand-primary">{currentStudent.name}</h2>
                        <p className="text-xl text-brand-text-secondary mt-1">{currentStudent.course} - Year {currentStudent.year}</p>
                         <p className="text-lg text-brand-text-secondary">{currentStudent.collegeName}</p>
                    </div>
                </div>

                <div className="mt-10">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-brand-primary">Personal & Hostel Details</h3>
                    <div className="space-y-2 text-lg">
                        <ProfileInfoRow label="Student ID" value={currentStudent.id} />
                        <ProfileInfoRow label="Father's Name" value={currentStudent.fatherName} />
                        <ProfileInfoRow label="Aadhar Number" value={currentStudent.aadharNumber} />
                        <ProfileInfoRow label="Contact Number" value={currentStudent.contact} />
                        <ProfileInfoRow label="Email Address" value={currentStudent.email} />
                        <ProfileInfoRow label="Permanent Address" value={currentStudent.address} />
                        <ProfileInfoRow label="Registration Date" value={currentStudent.registrationDate} />
                        <ProfileInfoRow label="Assigned Room" value={currentStudent.roomNumber || 'Not Assigned'} />
                        <ProfileInfoRow label="Fee Status" value={currentStudent.feeStatus} isBadge />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;