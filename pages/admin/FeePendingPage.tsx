import React from 'react';
import { useAppContext } from '../../context/AppContext';

const FeePendingPage: React.FC = () => {
  const { students, markFeeAsPaid } = useAppContext();
  
  const confirmedStudents = students.filter(s => s.admissionStatus === 'Confirmed');
  const pendingStudents = confirmedStudents.filter(s => s.feeStatus === 'Pending');

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Fee Pending List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">ID</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Name</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Course & Year</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Contact</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Room No.</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {pendingStudents.map((student, index) => (
              <tr key={student.id} className={`${index % 2 === 0 ? 'bg-red-50' : 'bg-white'} hover:bg-red-100`}>
                <td className="text-left py-3 px-4">{student.id}</td>
                <td className="text-left py-3 px-4">{student.name}</td>
                <td className="text-left py-3 px-4">{student.course} - Year {student.year}</td>
                <td className="text-left py-3 px-4">{student.contact}</td>
                <td className="text-left py-3 px-4">{student.roomNumber || 'N/A'}</td>
                <td className="text-left py-3 px-4">
                  <button
                    onClick={() => markFeeAsPaid(student.id)}
                    className="bg-green-500 text-white text-xs font-bold py-1 px-3 rounded hover:bg-green-600 transition-colors"
                  >
                    Mark as Paid
                  </button>
                </td>
              </tr>
            ))}
             {pendingStudents.length === 0 && (
                <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                        No students with pending fees.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeePendingPage;