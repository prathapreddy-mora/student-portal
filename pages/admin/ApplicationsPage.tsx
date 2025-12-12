import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';

const ApplicationsPage: React.FC = () => {
  const { students, confirmApplication } = useAppContext();
  const [successMessage, setSuccessMessage] = useState('');

  const pendingStudents = useMemo(() => {
    return students.filter(s => s.admissionStatus === 'Pending');
  }, [students]);

  const handleConfirm = (studentId: string, studentName: string) => {
    confirmApplication(studentId);
    setSuccessMessage(`Application for ${studentName} confirmed successfully and added to Student List.`);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Pending Student Applications</h1>
      <p className="text-gray-600 mb-6">
        Review new applications submitted offline. Click "Confirm" to approve their admission.
      </p>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {successMessage}</span>
        </div>
      )}

      <div className="overflow-x-auto">
        {pendingStudents.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Name</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Father's Name</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Course & Year</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Contact</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Application Type</th>
                <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {pendingStudents.map((student, index) => (
                <tr key={student.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-yellow-100`}>
                  <td className="text-left py-3 px-4">{student.name}</td>
                  <td className="text-left py-3 px-4">{student.fatherName}</td>
                  <td className="text-left py-3 px-4">{student.course} - Year {student.year}</td>
                  <td className="text-left py-3 px-4">{student.contact}</td>
                  <td className="text-left py-3 px-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {student.applicationType}
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <button
                      onClick={() => handleConfirm(student.id, student.name)}
                      className="bg-green-500 text-white text-xs font-bold py-1 px-3 rounded hover:bg-green-600 transition-colors"
                    >
                      Confirm Admission
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-xl">No pending applications found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsPage;