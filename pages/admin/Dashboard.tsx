import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const DashboardCard: React.FC<{ title: string; value: string | number; icon: string; link: string; color: string }> = ({ title, value, icon, link, color }) => (
    <Link to={link} className={`block p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${color}`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-xl font-semibold text-white">{title}</p>
                <p className="text-4xl font-bold text-white">{value}</p>
            </div>
            <div className="text-5xl opacity-75">{icon}</div>
        </div>
    </Link>
);


const StudentRealtimeDataTable: React.FC = () => {
    const { students, attendance, rooms, markFeeAsPaid, assignRoom } = useAppContext();
    
    const confirmedStudents = students.filter(s => s.admissionStatus === 'Confirmed');

    const calculateAttendance = (studentId: string) => {
        const studentAttendance = attendance.filter(a => a.studentId === studentId);
        if (studentAttendance.length === 0) return { percent: 0, text: 'N/A' };
        const presentCount = studentAttendance.filter(a => a.status === 'Present').length;
        const percentage = Math.round((presentCount / studentAttendance.length) * 100);
        return { percent: percentage, text: `${percentage}%` };
    };

    const availableRooms = rooms.filter(room => room.occupantIds.length < room.capacity);

    const handleRoomAssignment = (studentId: string, roomNumber: string) => {
        if (roomNumber) {
            assignRoom(studentId, parseInt(roomNumber, 10));
        }
    };
    
    return (
         <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Real-time Student Data Overview</h2>
          <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                  <thead className="bg-gray-100">
                      <tr>
                          <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Student Name</th>
                          <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Room</th>
                          <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Fee Status</th>
                          <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Attendance</th>
                          <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Admission</th>
                      </tr>
                  </thead>
                  <tbody>
                      {confirmedStudents.slice(0, 5).map(student => {
                        const attendanceInfo = calculateAttendance(student.id);
                        return (
                          <tr key={student.id} className="hover:bg-gray-50">
                              <td className="py-3 px-4 border-b text-left">{student.name}</td>
                              <td className="py-3 px-4 border-b text-left">
                                 <select
                                    onChange={(e) => handleRoomAssignment(student.id, e.target.value)}
                                    value={student.roomNumber || ""}
                                    className="text-xs bg-white border border-gray-300 rounded p-1 focus:outline-none focus:ring-1 focus:ring-brand-primary w-full max-w-[120px]"
                                    >
                                    <option value="" disabled>{student.roomNumber ? `Room ${student.roomNumber}` : 'Assign'}</option>
                                    {student.roomNumber && <option value={student.roomNumber}>Room {student.roomNumber}</option>}
                                    {availableRooms.map(room => (
                                        <option key={room.number} value={room.number}>
                                        Room {room.number} ({room.occupantIds.length}/{room.capacity})
                                        </option>
                                    ))}
                                </select>
                              </td>
                               <td className="py-3 px-4 border-b text-left">
                                {student.feeStatus === 'Paid' ? (
                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-200 text-green-800">Paid</span>
                                ) : (
                                    <button onClick={() => markFeeAsPaid(student.id)} 
                                        className="w-full max-w-[90px] text-center px-2 py-1 text-xs font-semibold rounded-full transition-colors bg-red-200 text-red-800 hover:bg-red-300">
                                        Mark as Paid
                                    </button>
                                )}
                              </td>
                               <td className="py-3 px-4 border-b text-left">
                                    <div className="flex items-center gap-2">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${attendanceInfo.percent}%` }}></div>
                                        </div>
                                        <span className="text-xs text-gray-600 font-semibold w-10 text-right">{attendanceInfo.text}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 border-b text-left">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${student.admissionStatus === 'Confirmed' ? 'bg-indigo-100 text-indigo-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {student.admissionStatus}
                                    </span>
                                </td>
                          </tr>
                      )})}
                  </tbody>
              </table>
              {confirmedStudents.length > 5 && (
                  <div className="text-right mt-4">
                      <Link to="/admin/students" className="text-sm font-semibold text-brand-primary hover:underline">
                          View All Students &rarr;
                      </Link>
                  </div>
              )}
              {confirmedStudents.length === 0 && (
                 <div className="text-center py-8 text-gray-500">
                    No confirmed students to display.
                </div>
              )}
          </div>
      </div>
    );
};

const Dashboard: React.FC = () => {
  const { students, rooms, complaints, attendance } = useAppContext();
  const [showWelcome, setShowWelcome] = useState(true);

  // Hide the message after a few seconds for a better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000); // Message disappears after 5 seconds
    return () => clearTimeout(timer);
  }, []);
  
  const confirmedStudents = students.filter(s => s.admissionStatus === 'Confirmed');
  const pendingApplications = students.filter(s => s.admissionStatus === 'Pending').length;

  const totalStudents = confirmedStudents.length;
  const feePendingCount = confirmedStudents.filter(s => s.feeStatus === 'Pending').length;
  const occupiedRooms = rooms.filter(r => r.occupantIds.length > 0).length;
  const vacantRooms = rooms.filter(r => r.occupantIds.length === 0).length;
  const openComplaints = complaints.filter(c => c.status === 'Open').length;
  
  // Calculate today's attendance
  const today = new Date().toISOString().split('T')[0];
  const presentToday = attendance.filter(a => a.date === today && a.status === 'Present').length;
  
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
       {showWelcome && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 px-4 py-3 rounded-md relative mb-6" role="alert">
          <strong className="font-bold">Welcome, REDDY HOSTEL ADMIN PORTAL !</strong>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <DashboardCard title="Total Students" value={totalStudents} icon="👥" link="/admin/students" color="bg-blue-500" />
        <DashboardCard title="Pending Applications" value={pendingApplications} icon="📥" link="/admin/applications" color="bg-orange-500" />
        <DashboardCard title="Fee Pending" value={feePendingCount} icon="💰" link="/admin/fees" color="bg-red-500" />
        <DashboardCard title="Occupied Rooms" value={occupiedRooms} icon="🚪" link="/admin/rooms" color="bg-yellow-500" />
        <DashboardCard title="Vacant Rooms" value={vacantRooms} icon="🛋️" link="/admin/rooms" color="bg-green-500" />
        <DashboardCard title="Open Complaints" value={openComplaints} icon="📝" link="/admin/complaints" color="bg-purple-500" />
        <DashboardCard title="Present Today" value={`${presentToday}/${totalStudents}`} icon="✅" link="/admin/attendance" color="bg-indigo-500" />
      </div>
      
      <StudentRealtimeDataTable />
    </div>
  );
};

export default Dashboard;