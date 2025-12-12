
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const WardenProfileSettingsPage: React.FC = () => {
    const { wardenProfile, updateWardenProfile } = useAppContext();
    const [formData, setFormData] = useState(wardenProfile);
    const [feedback, setFeedback] = useState('');

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
        setFeedback('Profile updated successfully!');
        setTimeout(() => setFeedback(''), 3000);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Warden Profile Settings</h1>

            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                <div className="relative">
                    <img
                        src={formData.imageUrl}
                        alt="Hostel Warden"
                        className="w-40 h-40 rounded-full border-4 border-brand-primary shadow-lg object-cover"
                    />
                    <button onClick={handlePhotoChange} className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100" title="Change Photo">
                        ✏️
                    </button>
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Warden Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="text-2xl font-bold text-gray-800 bg-gray-50 border-b-2 border-gray-300 focus:outline-none focus:border-brand-primary w-full p-2"/>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} className="text-md text-brand-text mt-1 bg-white border rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-brand-primary"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 p-2 rounded-md border border-gray-300 mt-1"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number (e.g., +919876543210)</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-50 p-2 rounded-md border border-gray-300 mt-1"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Office Hours</label>
                    <input type="text" name="officeHours" value={formData.officeHours} onChange={handleChange} className="w-full bg-gray-50 p-2 rounded-md border border-gray-300 mt-1"/>
                </div>
            </div>

            <div className="mt-8 border-t pt-6 text-right">
                {feedback && <p className="text-green-600 text-sm mb-4 text-center">{feedback}</p>}
                <button onClick={handleSave} className="bg-green-500 text-white font-bold py-2 px-6 rounded-md hover:bg-green-600 transition-colors">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default WardenProfileSettingsPage;
