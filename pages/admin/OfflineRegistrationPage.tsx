
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const FileInput: React.FC<{ label: string; name: string; }> = ({ label, name }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <input type="file" name={name} id={name} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-primary hover:file:bg-blue-100"/>
    </div>
)

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
    parentContact: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Format Aadhar number with spaces for readability (XXXX XXXX XXXX)
  const formatAadhar = (value: string) => {
    const clean = value.replace(/\D/g, '');
    const limited = clean.slice(0, 12);
    return limited.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'aadharNumber') {
        setFormData(prev => ({ ...prev, [name]: formatAadhar(value) }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateAadhar = (aadhar: string) => {
      const clean = aadhar.replace(/\s/g, '');
      return /^\d{12}$/.test(clean);
  };

  const validatePhone = (phone: string) => /^\d{10}$/.test(phone);

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
    if (!validatePhone(formData.contact) || !validatePhone(formData.parentContact)) {
        setError('Invalid phone number. It must be 10 digits.');
        return;
    }

    const studentData = { 
        ...formData, 
        year: parseInt(formData.year, 10),
        aadharNumber: formData.aadharNumber.replace(/\s/g, '') 
    };
    
    submitApplication(studentData, 'Offline');
    setIsSubmitted(true);
    setFormData({ name: '', fatherName: '', course: '', collegeName: '', year: '', contact: '', email: '', aadharNumber: '', address: '', parentContact: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Offline Student Application Entry</h1>
        <p className="text-gray-500 mb-6">Use this form to manually enter details for students applying in person.</p>
        
        {isSubmitted ? (
          <div className="text-center p-8 bg-green-100 text-green-800 rounded-lg border border-green-200">
            <h3 className="text-2xl font-bold">Application Submitted!</h3>
            <p className="mt-2">The application is now in the system and pending final confirmation in the "Applications" tab.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {error && <p className="md:col-span-2 text-center text-red-600 bg-red-50 p-2 rounded border border-red-200">{error}</p>}
            
            <div className="md:col-span-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Student's Full Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">Father's Name</label>
              <input type="text" name="fatherName" id="fatherName" value={formData.fatherName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Student Contact (10 digits)</label>
              <input type="tel" name="contact" id="contact" value={formData.contact} onChange={handleChange} required maxLength={10} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="parentContact" className="block text-sm font-medium text-gray-700">Parent's Contact (10 digits)</label>
              <input type="tel" name="parentContact" id="parentContact" value={formData.parentContact} onChange={handleChange} required maxLength={10} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
             <div className="md:col-span-1">
              <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">College Name</label>
              <input type="text" name="collegeName" id="collegeName" value={formData.collegeName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course / Branch</label>
              <input type="text" name="course" id="course" value={formData.course} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year of Study</label>
              <input type="number" name="year" id="year" value={formData.year} onChange={handleChange} min="1" max="5" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
            </div>
             <div className="md:col-span-1">
              <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700">Aadhar Number (12 digits)</label>
              <input type="text" name="aadharNumber" id="aadharNumber" value={formData.aadharNumber} onChange={handleChange} required maxLength={14} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" placeholder="XXXX XXXX XXXX"/>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Permanent Address</label>
              <textarea name="address" id="address" value={formData.address} onChange={handleChange} rows={3} required className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"></textarea>
            </div>

            <div className="md:col-span-2 border-t pt-4 mt-2">
                <h3 className="text-lg font-semibold text-gray-800">Document Uploads</h3>
                <p className="text-xs text-gray-500 mb-4">(Note: File uploads are for demonstration only and are not stored in this demo)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FileInput label="Aadhar Card" name="aadharFile" />
                    <FileInput label="SSC Certificate" name="sscFile" />
                    <FileInput label="Income Certificate" name="incomeFile" />
                    <FileInput label="Caste Certificate" name="casteFile" />
                </div>
            </div>

            <div className="md:col-span-2 text-center mt-4">
              <button type="submit" className="w-1/2 bg-brand-primary text-white font-bold py-3 px-4 rounded-md hover:bg-brand-primary-dark transition-colors duration-300">
                Submit Application
              </button>
            </div>
          </form>
        )}
    </div>
  );
};

export default OfflineRegistrationPage;
