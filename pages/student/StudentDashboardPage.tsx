import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const InfoRow: React.FC<{ label: string; value: string | number | null | undefined; isBadge?: boolean }> = ({ label, value, isBadge = false }) => {
    if (value === null || value === undefined) return null;
    return (
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="font-medium text-brand-text-secondary">{label}</span>
            {isBadge ? (
                 <span className={`px-3 py-1 text-sm font-semibold rounded-full ${value === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {value}
                </span>
            ) : (
                <span className="text-brand-text text-right">{value}</span>
            )}
        </div>
    );
};


const StudentDashboardPage: React.FC = () => {
    const { students, attendance } = useAppContext();

    // As there's no student login, we'll display a mock profile of the first student.
    const currentStudent = students[0];

    const getMonthlyAttendance = () => {
        if (!currentStudent) return { present: 0, total: 0, percentage: 0 };
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();

        const studentAttendance = attendance.filter(a => {
            const recordDate = new Date(a.date);
            return a.studentId === currentStudent.id && recordDate.getMonth() === month && recordDate.getFullYear() === year;
        });

        const presentCount = studentAttendance.filter(a => a.status === 'Present').length;
        const totalDaysMarked = studentAttendance.length;
        const percentage = totalDaysMarked > 0 ? Math.round((presentCount / totalDaysMarked) * 100) : 0;
        
        return { present: presentCount, total: totalDaysMarked, percentage };
    };

    const attendanceSummary = getMonthlyAttendance();

    if (!currentStudent) {
        return (
            <div className="container mx-auto p-6 md:p-12 text-center">
                <h2 className="text-2xl font-bold text-brand-primary">No Student Data Available</h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 md:p-12">
            <div className="bg-brand-surface rounded-lg shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                    <img
                        src={currentStudent.photoUrl || `https://i.pravatar.cc/150?u=${currentStudent.id}`}
                        alt="Student Profile"
                        className="w-32 h-32 rounded-full border-4 border-brand-primary shadow-md object-cover"
                    />
                    <div className="md:ml-8 mt-6 md:mt-0">
                        <h2 className="text-4xl font-extrabold text-brand-primary">{currentStudent.name}</h2>
                        <p className="text-xl text-brand-text-secondary mt-1">{currentStudent.course} - Year {currentStudent.year}</p>
                    </div>
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-brand-primary">My Details</h3>
                        <div className="space-y-2 text-lg">
                            <InfoRow label="Student ID" value={currentStudent.id} />
                            <InfoRow label="Contact" value={currentStudent.contact} />
                            <InfoRow label="Email" value={currentStudent.email} />
                            <InfoRow label="Room Number" value={currentStudent.roomNumber || 'Not Assigned'} />
                            <InfoRow label="Fee Status" value={currentStudent.feeStatus} isBadge />
                        </div>
                         <Link to="/student/contact-admin" className="mt-6 inline-block w-full text-center bg-brand-gold text-brand-text font-bold py-2 px-4 rounded-md hover:bg-amber-400 transition-colors duration-300">
                           Update Contact / Send Message
                        </Link>
                    </div>
                     <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-brand-primary">This Month's Attendance</h3>
                         <div className="text-center p-6 bg-gray-50 rounded-lg">
                             <p className="text-6xl font-bold text-brand-primary">{attendanceSummary.percentage}%</p>
                             <p className="text-brand-text-secondary mt-2">({attendanceSummary.present} / {attendanceSummary.total} Days Present)</p>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboardPage;