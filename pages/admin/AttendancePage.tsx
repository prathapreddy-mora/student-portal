import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { AttendanceRecord } from '../../types';

const StatCard: React.FC<{ title: string; value: string;}> = ({ title, value }) => (
  <div className="bg-gray-100 p-4 rounded-lg text-center shadow">
    <p className="text-sm font-medium text-gray-600">{title}</p>
    <p className="text-2xl font-bold text-brand-primary">{value}</p>
  </div>
);

const AttendancePage: React.FC = () => {
  const { students, attendance, updateAttendance, markBulkAttendance } = useAppContext();
  
  const todayISO = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayISO);
  // Persist submitted dates to localStorage so "Finalized" status remains after refresh
  const [submittedDates, setSubmittedDates] = useState<Record<string, boolean>>(() => {
      try {
          const saved = localStorage.getItem('submittedDates');
          return saved ? JSON.parse(saved) : {};
      } catch (e) {
          return {};
      }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
      localStorage.setItem('submittedDates', JSON.stringify(submittedDates));
  }, [submittedDates]);

  const confirmedStudents = useMemo(() => students.filter(s => s.admissionStatus === 'Confirmed'), [students]);

  const attendanceForDate = useMemo(() => {
    const records = new Map<string, 'Present' | 'Absent'>();
    attendance.forEach(record => {
      if (record.date === selectedDate) {
        records.set(record.studentId, record.status);
      }
    });
    return records;
  }, [attendance, selectedDate]);

  const analytics = useMemo(() => {
    const dailyPresent = Array.from(attendanceForDate.values()).filter(s => s === 'Present').length;
    const dailyTotal = confirmedStudents.length;
    const dailyPercent = dailyTotal > 0 ? Math.round((dailyPresent / dailyTotal) * 100) : 0;
    return {
      daily: { present: dailyPresent, absent: dailyTotal - dailyPresent, total: dailyTotal, percent: dailyPercent },
    }
  }, [attendanceForDate, confirmedStudents]);

  const handleStatusChange = (studentId: string, newStatus: 'Present' | 'Absent') => {
    updateAttendance(studentId, selectedDate, newStatus);
  };

  const handleMarkAllPresent = async () => {
      if (window.confirm("Are you sure you want to mark ALL students as 'Present'?")) {
          setIsSubmitting(true);
          try {
            const recordsToUpdate: AttendanceRecord[] = confirmedStudents.map(s => ({
                studentId: s.id,
                studentName: s.name,
                date: selectedDate,
                status: 'Present'
            }));
            await markBulkAttendance(recordsToUpdate);
          } finally {
            setIsSubmitting(false);
          }
      }
  };

  const handleFinalSubmit = async () => {
    const unmarkedStudents = confirmedStudents.filter(s => !attendanceForDate.has(s.id));
    
    setIsSubmitting(true);
    try {
        if (unmarkedStudents.length > 0) {
            const confirmMsg = `You have ${unmarkedStudents.length} unmarked students. They will be marked as 'Absent'.\n\nDo you want to proceed and finalize?`;
            if (window.confirm(confirmMsg)) {
                // Mark remaining as Absent
                const recordsToUpdate: AttendanceRecord[] = unmarkedStudents.map(s => ({
                    studentId: s.id,
                    studentName: s.name,
                    date: selectedDate,
                    status: 'Absent'
                }));
                await markBulkAttendance(recordsToUpdate);
                setSubmittedDates(prev => ({ ...prev, [selectedDate]: true }));
            }
        } else {
            if (window.confirm(`Are you sure you want to finalize attendance for ${selectedDate}? This action cannot be undone.`)) {
                setSubmittedDates(prev => ({ ...prev, [selectedDate]: true }));
            }
        }
    } finally {
        setIsSubmitting(false);
    }
  };

  const isDateSubmitted = submittedDates[selectedDate];

  const isEditable = useMemo(() => {
    if (isDateSubmitted) return false;
    const now = new Date();
    const dateToEdit = new Date(selectedDate);
    // Add 23 hours 59 mins to selectedDate to get end of day
    dateToEdit.setHours(23, 59, 59, 999);
    // Lock time is 24 hours after the end of the selected day
    const lockTime = new Date(dateToEdit.getTime() + (24 * 60 * 60 * 1000));
    return now < lockTime;
  }, [selectedDate, isDateSubmitted]);
  
  const unmarkedCount = confirmedStudents.length - attendanceForDate.size;


  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Daily Attendance</h1>
           <p className="text-gray-500 mt-1">Mark attendance for each student. You can edit entries for up to 24 hours.</p>
        </div>
        <div className="flex items-center gap-2">
            <label htmlFor="attendance-date" className="font-semibold text-gray-600">Select Date:</label>
            <input 
                type="date" 
                id="attendance-date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                max={todayISO} // Can't select future dates
                className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
        </div>
      </div>

       <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Daily Percentage" value={`${analytics.daily.percent}%`} />
        <StatCard title="Present" value={`${analytics.daily.present}`} />
        <StatCard title="Absent" value={`${analytics.daily.absent}`} />
        <StatCard title="Total Students" value={`${analytics.daily.total}`} />
       </div>
       
      <div className="mb-4 p-4 text-center bg-blue-50 text-brand-text border border-blue-200 rounded-md flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-left">
            {!isEditable && !isDateSubmitted && <span className="text-yellow-700 font-semibold block">Editing locked (24-hour window passed).</span>}
            {isDateSubmitted && <span className="text-green-700 font-semibold block">Attendance for {selectedDate} has been finalized.</span>}
            {isEditable && (
                <div className="text-sm">
                    {unmarkedCount > 0 ? (
                        <span className="text-orange-600 font-semibold">⚠️ {unmarkedCount} students remaining to mark.</span>
                    ) : (
                        <span className="text-green-600 font-semibold">✅ All students marked.</span>
                    )}
                </div>
            )}
          </div>
          
          <div className="flex gap-3">
             {isEditable && unmarkedCount > 0 && (
                 <button 
                    onClick={handleMarkAllPresent}
                    disabled={isSubmitting}
                    className="bg-brand-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-brand-secondary-dark transition-colors disabled:opacity-50 disabled:cursor-wait"
                 >
                     {isSubmitting ? 'Processing...' : 'Mark All Present'}
                 </button>
             )}
            
            <button 
                onClick={handleFinalSubmit}
                disabled={!isEditable || isSubmitting}
                className="bg-brand-primary text-white font-bold py-2 px-5 rounded-md hover:bg-brand-primary-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                 {isSubmitting ? 'Submitting...' : 'Finalize & Submit'}
            </button>
          </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Name</th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-600">Status</th>
              <th className="text-center py-3 px-4 uppercase font-semibold text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {confirmedStudents.map((student) => {
              const status = attendanceForDate.get(student.id);
              return (
              <tr key={student.id} className="hover:bg-yellow-50 border-b">
                <td className="text-left py-3 px-4">{student.name}</td>
                <td className="text-center py-3 px-4">
                   <span className={`px-2 py-1 text-xs font-semibold rounded-full ${!status ? 'bg-gray-200 text-gray-800' : status === 'Present' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {status || 'Not Marked'}
                  </span>
                </td>
                <td className="text-center py-3 px-4">
                  {isEditable ? (
                    <div className="flex gap-2 justify-center">
                       <button
                         onClick={() => handleStatusChange(student.id, 'Present')}
                         className="bg-green-500 text-white text-xs font-bold py-1 px-3 rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                         disabled={status === 'Present'}
                       >
                         Present
                       </button>
                       <button
                         onClick={() => handleStatusChange(student.id, 'Absent')}
                         className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={status === 'Absent'}
                       >
                         Absent
                       </button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500">Locked</span>
                  )}
                </td>
              </tr>
            )})}
             {confirmedStudents.length === 0 && (
                 <tr>
                     <td colSpan={3} className="text-center py-8 text-gray-500">
                         No confirmed students found. Check the "Applications" or "Student List" to add students.
                     </td>
                 </tr>
             )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendancePage;