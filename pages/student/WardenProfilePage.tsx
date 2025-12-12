
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row py-3 border-b border-gray-200">
        <span className="font-medium text-brand-text-secondary w-full sm:w-1/3">{label}</span>
        <span className="text-brand-text">{value}</span>
    </div>
);

const WardenProfilePage: React.FC = () => {
    const { wardenProfile, updateWardenProfile, isAdminLoggedIn } = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(wardenProfile);

    useEffect(() => {
        setFormData(wardenProfile);
    }, [wardenProfile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = () => {
        // Mock photo change by assigning a new random pravatar URL
        const newImageUrl = `https://i.pravatar.cc/150?u=warden-admin-${Date.now()}`;
        setFormData(prev => ({ ...prev, imageUrl: newImageUrl }));
    };
    
    const handleSave = () => {
        const updatedData = { ...formData };
        if (formData.phone.match(/^\+91\d{10}$/)) {
            updatedData.phoneDisplay = formData.phone.replace(/(\+91)(\d{5})(\d{5})/, '$1 $2 $3');
        } else {
            updatedData.phoneDisplay = formData.phone;
        }

        updateWardenProfile(updatedData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData(wardenProfile);
        setIsEditing(false);
    };

    return (
        <div className="container mx-auto p-6 md:p-12">
            <div className="bg-brand-surface rounded-lg shadow-xl p-8 md:p-12 max-w-4xl mx-auto relative">
                <h2 className="text-4xl font-extrabold text-brand-primary mb-8 text-center">Warden Profile</h2>
                
                {isAdminLoggedIn && !isEditing && (
                    <button onClick={() => setIsEditing(true)} className="absolute top-8 right-8 bg-brand-secondary text-brand-text font-bold py-2 px-4 rounded-md hover:bg-amber-400 transition-colors">
                        Edit Profile
                    </button>
                )}

                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                    <div className="relative">
                        <img
                            src={isEditing ? formData.imageUrl : wardenProfile.imageUrl}
                            alt="Hostel Warden"
                            className="w-40 h-40 rounded-full border-4 border-brand-primary shadow-lg object-cover"
                        />
                         {isEditing && (
                            <button onClick={handlePhotoChange} className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100" title="Change Photo">
                                ✏️
                            </button>
                        )}
                    </div>
                    <div className="md:ml-8 mt-6 md:mt-0 flex-1">
                        {isEditing ? (
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="text-3xl font-bold text-gray-800 bg-gray-100 border-b-2 border-gray-300 focus:outline-none focus:border-brand-primary w-full"/>
                        ) : (
                            <h3 className="text-3xl font-bold text-gray-800">{wardenProfile.name}</h3>
                        )}
                        <p className="text-xl text-brand-text-secondary mt-1">{wardenProfile.title}</p>
                        {isEditing ? (
                            <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} className="text-md text-brand-text mt-4 bg-white border rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-brand-primary"/>
                        ) : (
                            <p className="text-md text-brand-text mt-4">{wardenProfile.bio}</p>
                        )}
                    </div>
                </div>

                <div className="mt-10">
                    <h4 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-brand-primary">Contact & Availability</h4>
                    {isEditing ? (
                        <div className="space-y-4 text-lg">
                            <div>
                                <label className="font-medium text-brand-text-secondary text-sm">Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-100 p-2 rounded-md border border-gray-300"/>
                            </div>
                            <div>
                                <label className="font-medium text-brand-text-secondary text-sm">Phone Number (e.g., +919876543210)</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-100 p-2 rounded-md border border-gray-300"/>
                            </div>
                             <div>
                                <label className="font-medium text-brand-text-secondary text-sm">Office Hours</label>
                                <input type="text" name="officeHours" value={formData.officeHours} onChange={handleChange} className="w-full bg-gray-100 p-2 rounded-md border border-gray-300"/>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2 text-lg">
                            <InfoRow label="Email Address" value={wardenProfile.email} />
                            <InfoRow label="Phone Number" value={wardenProfile.phoneDisplay} />
                            <InfoRow label="Office Hours" value={wardenProfile.officeHours} />
                        </div>
                    )}
                </div>

                {isEditing ? (
                    <div className="mt-10 border-t pt-8 text-center flex justify-center gap-4">
                        <button onClick={handleSave} className="bg-green-500 text-white font-bold py-2 px-6 rounded-md hover:bg-green-600 transition-colors">Save</button>
                        <button onClick={handleCancel} className="bg-gray-500 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-600 transition-colors">Cancel</button>
                    </div>
                ) : (
                    <div className="mt-10 border-t pt-8 text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Contact the Warden</h3>
                        <p className="text-sm text-gray-500 mb-4">Click the button below to call the warden directly for any urgent matters.</p>
                        <a 
                            href={`tel:${wardenProfile.phone}`}
                            className="inline-block w-full md:w-1/2 bg-brand-primary text-white font-bold py-3 px-4 rounded-md hover:bg-brand-primary-dark transition-colors duration-300"
                        >
                            Call the Warden
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WardenProfilePage;
