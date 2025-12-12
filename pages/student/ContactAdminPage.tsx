
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const ContactAdminPage: React.FC = () => {
  const { students, updateStudentContact, sendMessageToAdmin } = useAppContext();
  
  // Using the first student as the mock logged-in user
  const currentStudent = students[0];

  const [contact, setContact] = useState(currentStudent?.contact || '');
  const [email, setEmail] = useState(currentStudent?.email || '');
  // FIX: Add state for parent's contact to match the updateStudentContact function signature.
  const [parentContact, setParentContact] = useState(currentStudent?.parentContact || '');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (currentStudent) {
      setContact(currentStudent.contact || '');
      setEmail(currentStudent.email || '');
      // FIX: Initialize parentContact state and handle potential null values.
      setParentContact(currentStudent.parentContact || '');
    }
  }, [currentStudent]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentStudent) {
        setFeedback('Error: No student data found.');
        return;
    }

    // Update contact info
    // FIX: Pass parentContact to satisfy the function signature of updateStudentContact.
    updateStudentContact(currentStudent.id, contact, email, parentContact);

    // Send message if it's not empty
    if (message.trim()) {
      sendMessageToAdmin(currentStudent.id, "Contact Form Query", message.trim());
    }
    
    setFeedback('Your information has been updated and your message has been sent!');
    setIsSubmitted(true);
    setMessage('');

    setTimeout(() => {
        setIsSubmitted(false);
        setFeedback('');
    }, 5000);
  };

  return (
    <div className="container mx-auto p-6 md:p-12">
      <div className="bg-brand-surface rounded-lg shadow-xl p-8 md:p-12 max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-brand-primary mb-8 text-center">Contact Administration</h2>
        
        {isSubmitted ? (
            <div className="text-center p-8 bg-green-100 text-green-800 rounded-lg">
                <h3 className="text-2xl font-bold">Success!</h3>
                <p className="mt-2">{feedback}</p>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Update Your Contact Information</h3>
                    <p className="text-sm text-gray-500 mb-4">Keep your details up-to-date to receive important notifications.</p>
                    <div className="space-y-4">
                         <div>
                            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input type="tel" name="contact" id="contact" value={contact} onChange={e => setContact(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                         <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                        {/* FIX: Add input for parent's contact number. */}
                        <div>
                            <label htmlFor="parentContact" className="block text-sm font-medium text-gray-700">Parent's Phone Number</label>
                            <input type="tel" name="parentContact" id="parentContact" value={parentContact} onChange={e => setParentContact(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Send a Message or Query</h3>
                    <p className="text-sm text-gray-500 mb-4">Have a question or a problem? Let the admin know.</p>
                     <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
                        <textarea name="message" id="message" value={message} onChange={e => setMessage(e.target.value)} rows={5} className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" placeholder="Type your message here... (Optional)"></textarea>
                    </div>
                </div>

                <div className="text-center">
                  <button type="submit" className="w-1/2 bg-brand-primary text-white font-bold py-3 px-4 rounded-md hover:bg-brand-primary-dark transition-colors duration-300">
                    Submit
                  </button>
                </div>
            </form>
        )}
      </div>
    </div>
  );
};

export default ContactAdminPage;
