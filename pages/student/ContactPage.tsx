import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const InfoRow: React.FC<{ label: string; value: string; link?: string }> = ({ label, value, link }) => (
    <div className="flex flex-col sm:flex-row py-3 border-b border-gray-200">
        <span className="font-medium text-brand-text-secondary w-full sm:w-1/3">{label}</span>
        {link ? (
            <a href={link} className="text-brand-primary font-semibold hover:underline transition-colors duration-200">
                {value}
            </a>
        ) : (
            <span className="text-brand-text">{value}</span>
        )}
    </div>
);

const ContactPage: React.FC = () => {
    const { wardenProfile, sendMessageToAdmin, students } = useAppContext();
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState('');
    
    // As there's no student login, we'll use a mock student for sending messages.
    const mockStudent = students.find(s => s.admissionStatus === 'Confirmed');

    const handleMessageSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject.trim() || !message.trim()) {
            setFeedback('Please fill out both subject and message fields.');
            return;
        }
        if (!mockStudent) {
            setFeedback('Error: Cannot send message. No student data available.');
            return;
        }

        sendMessageToAdmin(mockStudent.id, subject, message);
        setFeedback('Your message has been sent successfully!');
        setSubject('');
        setMessage('');
        setTimeout(() => setFeedback(''), 5000);
    };


    return (
        <div className="container mx-auto p-6 md:p-12">
            <div className="bg-brand-surface rounded-lg shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
                <h2 className="text-4xl font-extrabold text-brand-primary mb-8 text-center">Contact the Warden</h2>

                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                    <img
                        src={wardenProfile.imageUrl}
                        alt="Hostel Warden"
                        className="w-40 h-40 rounded-full border-4 border-brand-primary shadow-lg object-cover"
                    />
                    <div className="md:ml-8 mt-6 md:mt-0">
                        <h3 className="text-3xl font-bold text-gray-800">{wardenProfile.name}</h3>
                        <p className="text-xl text-brand-text-secondary mt-1">{wardenProfile.title}</p>
                        <p className="text-md text-brand-text mt-4">{wardenProfile.bio}</p>
                    </div>
                </div>

                <div className="mt-10">
                    <h4 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-brand-primary">Contact & Availability</h4>
                    <div className="space-y-2 text-lg">
                        <InfoRow label="Email Address" value={wardenProfile.email} />
                        <InfoRow label="Phone Number" value={wardenProfile.phoneDisplay} link={`tel:${wardenProfile.phone}`} />
                        <InfoRow label="Office Hours" value={wardenProfile.officeHours} />
                    </div>
                </div>
                
                <div className="mt-10 border-t pt-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">Send a Message</h3>
                    <p className="text-sm text-gray-500 mb-4 text-center">For non-urgent matters, please use the form below. Your message will be sent to the admin portal.</p>
                    <form onSubmit={handleMessageSubmit} className="space-y-4 max-w-2xl mx-auto">
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                            <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea id="message" rows={5} value={message} onChange={e => setMessage(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"></textarea>
                        </div>
                        {feedback && <p className={`text-center text-sm font-semibold ${feedback.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{feedback}</p>}
                        <div className="text-center">
                            <button type="submit" className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-md hover:bg-brand-primary-dark transition-colors duration-300">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ContactPage;