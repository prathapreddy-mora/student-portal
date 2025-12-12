
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const OfflineRegistrationPage: React.FC = () => {
  const { submitApplication } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    course: '',
    collegeName: '',
    year: '',
    contact: '',
    email: '',
    aadharNumber: '',
    address: '',
    // FIX: Add parentContact to state to match submitApplication's required properties.
    parentContact: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const validateAadhar = (aadhar: string) => {
    return /^\d{12}$/.test(aadhar);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (Object.values(formData).some(val => val === '')) {
      setError('Please fill out all fields.');
      return;
    }
    if (!validateAadhar(formData.aadharNumber)) {
      setError('Invalid Aadhar Number. It must be 12 digits.');
      return;
    }
    // FIX: The studentData object now correctly includes parentContact from the form state.
    const studentData = { ...formData, year: parseInt(formData.year, 10) };
    submitApplication(studentData, 'Offline');
    setIsSubmitted(true);
    setFormData({
      name: '', fatherName: '', course: '', collegeName: '', year: '', contact: '', email: '', aadharNumber: '', address: '',
      // FIX: Reset parentContact field after submission.
      parentContact: '',
    });
  };

  return (
    <div className="container mx-auto p-6 md:p-12">
      <div className="bg-brand-surface rounded-lg shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-brand-primary mb-8 text-center">Offline Student Application</h2>
        {isSubmitted ? (
          <div className="text-center p-8 bg-green-100 text-green-800 rounded-lg">
            <h3 className="text-2xl font-bold">Application Submitted!</h3>
            <p className="mt-2">Thank you! Your application for offline admission is now pending review from the hostel administration.</p>
            <p className="mt-2 text-sm font-semibold">You will receive an SMS confirmation once your admission is approved.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Student's Full Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">Father's Name</label>
              <input type="text" name="fatherName" id="fatherName" value={formData.fatherName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            {/* FIX: Add input for Parent's Contact Number. */}
            <div className="md:col-span-2">
              <label htmlFor="parentContact" className="block text-sm font-medium text-gray-700">Parent's Contact Number</label>
              <input type="tel" name="parentContact" id="parentContact" value={formData.parentContact} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">College Name</label>
              <input type="text" name="collegeName" id="collegeName" value={formData.collegeName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
              <input type="text" name="course" id="course" value={formData.course} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year of Study</label>
              <input type="number" name="year" id="year" value={formData.year} onChange={handleChange} min="1" max="5" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input type="tel" name="contact" id="contact" value={formData.contact} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
             <div className="md:col-span-1">
              <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700">Aadhar Number (12 digits)</label>
              <input type="text" name="aadharNumber" id="aadharNumber" value={formData.aadharNumber} onChange={handleChange} required maxLength={12} pattern="\d{12}" title="Aadhar number must be 12 digits" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Permanent Address</label>
              <textarea name="address" id="address" value={formData.address} onChange={handleChange} rows={3} required className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"></textarea>
            </div>
            {error && <p className="md:col-span-2 text-center text-red-500">{error}</p>}
            <div className="md:col-span-2 text-center">
              <button type="submit" className="w-1/2 bg-brand-primary text-white font-bold py-3 px-4 rounded-md hover:bg-brand-primary-dark transition-colors duration-300">
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default OfflineRegistrationPage;
