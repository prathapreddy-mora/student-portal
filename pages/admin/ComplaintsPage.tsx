
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const ComplaintsPage: React.FC = () => {
  const { complaints, adminReplyToComplaint, resolveComplaint } = useAppContext();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = (complaintId: string) => {
    if (!replyText.trim()) return;
    adminReplyToComplaint(complaintId, replyText);
    setReplyText('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Complaints</h1>
      <div className="space-y-4">
        {complaints.map(complaint => (
          <div key={complaint.id} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedId(expandedId === complaint.id ? null : complaint.id)}
              className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">{complaint.studentName} (Room {complaint.roomNumber})</p>
                  <p className="text-gray-600 truncate">{complaint.complaint}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${complaint.status === 'Open' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                    {complaint.status}
                  </span>
                   <span className="text-gray-500 transform transition-transform duration-200" style={{ transform: expandedId === complaint.id ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </div>
              </div>
            </button>
            {expandedId === complaint.id && (
              <div className="p-4 border-t bg-white">
                <p className="text-gray-800 mb-4 whitespace-pre-wrap"><strong>Complaint Details:</strong><br/>{complaint.complaint}</p>
                <p className="text-sm text-gray-500 mb-4">Submitted on: {new Date(complaint.date).toLocaleDateString()}</p>
                
                <div className="space-y-2 mb-4">
                  <h4 className="font-semibold text-gray-700">Reply History:</h4>
                  {complaint.replies.length > 0 ? (
                    complaint.replies.map((reply, index) => (
                      <div key={index} className="bg-blue-50 p-3 rounded-md border border-blue-200">
                        <p className="text-sm text-gray-800">{reply.text}</p>
                        <p className="text-xs text-gray-500 text-right mt-1">{new Date(reply.timestamp).toLocaleString()}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">No replies yet.</p>
                  )}
                </div>

                {complaint.status === 'Open' && (
                  <div className="mt-4">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={3}
                      className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      placeholder="Type your reply..."
                    />
                    <div className="flex justify-end gap-2 mt-2">
                       <button
                        onClick={() => handleReplySubmit(complaint.id)}
                        className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-brand-primary-dark transition-colors"
                      >
                        Send Reply
                      </button>
                      <button
                        onClick={() => resolveComplaint(complaint.id)}
                        className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                      >
                        Mark as Resolved
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintsPage;
