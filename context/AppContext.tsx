import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Student, Room, Complaint, AttendanceRecord, Message, ChatMessage, ComplaintReply, WardenProfile } from '../types';
import { MOCK_STUDENTS, MOCK_ROOMS, MOCK_COMPLAINTS, MOCK_ATTENDANCE, MOCK_MESSAGES, MOCK_WARDEN_PROFILE } from '../services/mockData';

interface AppContextType {
  isAdminLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  students: Student[];
  rooms: Room[];
  complaints: Complaint[];
  attendance: AttendanceRecord[];
  messages: Message[];
  wardenProfile: WardenProfile;
  syncStatus: { status: 'Synced' | 'Syncing...' | 'Error'; timestamp: string };
  assignRoom: (studentId: string, roomNumber: number) => void;
  updateAttendance: (studentId: string, date: string, status: 'Present' | 'Absent') => void;
  markBulkAttendance: (records: AttendanceRecord[]) => Promise<void>;
  markFeeAsPaid: (studentId: string) => void;
  toggleFeeStatus: (studentId: string) => void;
  updateStudentContact: (studentId: string, newContact: string, newEmail: string, newParentContact: string) => void;
  sendMessageToAdmin: (studentId: string, subject: string, message: string) => void;
  markMessageAsRead: (messageId: string) => void;
  submitApplication: (applicationData: {
    name: string;
    fatherName: string;
    course: string;
    collegeName: string;
    year: number;
    contact: string;
    email: string;
    aadharNumber: string;
    address: string;
    parentContact: string;
  }, type: 'Online' | 'Offline') => void;
  confirmApplication: (studentId: string) => void;
  adminReplyToMessage: (threadId: string, text: string) => void;
  adminReplyToComplaint: (complaintId: string, text: string) => void;
  resolveComplaint: (complaintId: string) => void;
  updateWardenProfile: (newProfileData: Partial<WardenProfile>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [rooms, setRooms] = useState<Room[]>(MOCK_ROOMS);
  const [complaints, setComplaints] = useState<Complaint[]>(MOCK_COMPLAINTS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [wardenProfile, setWardenProfile] = useState<WardenProfile>(MOCK_WARDEN_PROFILE);
  // FIX: Explicitly type the syncStatus state to match AppContextType, preventing type inference widening to `string`.
  const [syncStatus, setSyncStatus] = useState<{ status: 'Synced' | 'Syncing...' | 'Error', timestamp: string }>({ status: 'Synced', timestamp: new Date().toLocaleTimeString() });

  const login = () => setIsAdminLoggedIn(true);
  const logout = () => setIsAdminLoggedIn(false);

  const withSync = async (action: () => void | Promise<void>) => {
    setSyncStatus({ status: 'Syncing...', timestamp: new Date().toLocaleTimeString() });
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate network latency to "Google Sheets"
    try {
      await action();
      setSyncStatus({ status: 'Synced', timestamp: new Date().toLocaleTimeString() });
    } catch (error) {
      console.error("Sync failed", error);
      setSyncStatus({ status: 'Error', timestamp: new Date().toLocaleTimeString() });
    }
  };

  const submitApplication = (applicationData: {
    name: string;
    fatherName: string;
    course: string;
    collegeName: string;
    year: number;
    contact: string;
    email: string;
    aadharNumber: string;
    address: string;
    parentContact: string;
  }, type: 'Online' | 'Offline') => {
    withSync(() => {
        const newStudent: Student = {
        ...applicationData,
        id: `S${Date.now()}`,
        photoUrl: `https://i.pravatar.cc/150?u=S${Date.now()}`,
        registrationDate: new Date().toISOString().split('T')[0],
        roomNumber: null,
        feeStatus: 'Pending',
        admissionStatus: 'Pending',
        applicationType: type,
        };
        setStudents(prevStudents => [newStudent, ...prevStudents]);
    });
  };

  const confirmApplication = (studentId: string) => {
    withSync(() => {
        setStudents(prev => prev.map(s => s.id === studentId ? { ...s, admissionStatus: 'Confirmed' } : s));
    });
  };

  const assignRoom = (studentId: string, roomNumber: number) => {
    withSync(() => {
        const studentToMove = students.find(s => s.id === studentId);
        if (!studentToMove) {
        alert("Error: Student not found.");
        return;
        }

        const targetRoom = rooms.find(r => r.number === roomNumber);
        if (!targetRoom || targetRoom.occupantIds.length >= targetRoom.capacity) {
        alert("Cannot assign: Room is full or does not exist.");
        return;
        }

        const currentRoomNumber = studentToMove.roomNumber;

        if (currentRoomNumber === roomNumber) {
            return;
        }

        setStudents(prevStudents =>
        prevStudents.map(student =>
            student.id === studentId ? { ...student, roomNumber: roomNumber } : student
        )
        );

        setRooms(prevRooms =>
        prevRooms.map(room => {
            if (room.number === roomNumber) {
            return { ...room, occupantIds: [...room.occupantIds, studentId] };
            }
            if (room.number === currentRoomNumber) {
            return { ...room, occupantIds: room.occupantIds.filter(id => id !== studentId) };
            }
            return room;
        })
        );
        
        // alert(`Room successfully updated by Admin for ${studentToMove.name}.`); // Alert removed for smoother UX
    });
  };

  const updateAttendance = (studentId: string, date: string, newStatus: 'Present' | 'Absent') => {
    withSync(() => {
        setAttendance(prevAttendance => {
        const recordExists = prevAttendance.some(record => record.studentId === studentId && record.date === date);
        if (recordExists) {
            return prevAttendance.map(record =>
            (record.studentId === studentId && record.date === date)
                ? { ...record, status: newStatus }
                : record
            );
        } else {
            const student = students.find(s => s.id === studentId);
            const newRecord: AttendanceRecord = {
            studentId,
            studentName: student?.name || 'Unknown Student',
            date,
            status: newStatus,
            };
            return [...prevAttendance, newRecord];
        }
        });
    });
  };

  const markBulkAttendance = (records: AttendanceRecord[]) => {
      // Return the promise so components can await the sync
      return withSync(() => {
          setAttendance(prev => {
              const updated = [...prev];
              // Create a map for faster O(1) lookups instead of O(N) inside the loop
              const indexMap = new Map();
              updated.forEach((rec, idx) => {
                  indexMap.set(`${rec.studentId}-${rec.date}`, idx);
              });

              records.forEach(rec => {
                  const key = `${rec.studentId}-${rec.date}`;
                  if (indexMap.has(key)) {
                      updated[indexMap.get(key)] = rec;
                  } else {
                      updated.push(rec);
                  }
              });
              return updated;
          });
      });
  };

  const markFeeAsPaid = (studentId: string) => {
    withSync(() => {
        setStudents(prevStudents =>
        prevStudents.map(student =>
            student.id === studentId && student.feeStatus === 'Pending'
            ? { ...student, feeStatus: 'Paid' }
            : student
        )
        );
    });
  };

  const toggleFeeStatus = (studentId: string) => {
    withSync(() => {
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.id === studentId
            ? { ...student, feeStatus: student.feeStatus === 'Paid' ? 'Pending' : 'Paid' }
            : student
        )
      );
    });
  };

  const updateStudentContact = (studentId: string, newContact: string, newEmail: string, newParentContact: string) => {
    withSync(() => {
        setStudents(prevStudents =>
        prevStudents.map(student => {
            if (student.id === studentId) {
                return { ...student, contact: newContact, email: newEmail, parentContact: newParentContact };
            }
            return student;
        })
        );
    });
  };

  const sendMessageToAdmin = (studentId: string, subject: string, messageText: string) => {
    // This is a student action, less critical to sync status but wrapping for consistency
    withSync(() => {
        const student = students.find(s => s.id === studentId);
        if (!student) return;

        const threadId = `M${Date.now()}`;
        const newThread: Message = {
        id: threadId,
        studentId,
        studentName: student.name,
        subject: subject,
        status: 'Unread',
        conversation: [
            {
            id: `CM-${threadId}-1`,
            sender: 'student',
            text: messageText,
            timestamp: new Date().toISOString(),
            },
        ],
        };
        setMessages(prevMessages => [newThread, ...prevMessages]);
    });
  };

  const adminReplyToMessage = (threadId: string, text: string) => {
    withSync(() => {
        setMessages(prev => prev.map(thread => {
            if (thread.id === threadId) {
                const newReply: ChatMessage = {
                    id: `CM${Date.now()}`,
                    text,
                    sender: 'admin',
                    timestamp: new Date().toISOString()
                };
                return {
                    ...thread,
                    conversation: [...thread.conversation, newReply],
                    status: 'Read',
                };
            }
            return thread;
        }));
    });
  };

  const adminReplyToComplaint = (complaintId: string, text: string) => {
    withSync(() => {
        setComplaints(prev => prev.map(c => {
            if (c.id === complaintId) {
                const newReply: ComplaintReply = {
                    text,
                    timestamp: new Date().toISOString()
                };
                return {
                    ...c,
                    replies: [...c.replies, newReply]
                };
            }
            return c;
        }));
    });
  };

  const resolveComplaint = (complaintId: string) => {
    withSync(() => {
        setComplaints(prev => prev.map(c => c.id === complaintId ? { ...c, status: 'Resolved' } : c));
    });
  };


  const markMessageAsRead = (messageId: string) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId ? { ...msg, status: 'Read' } : msg
      )
    );
  };

  const updateWardenProfile = (newProfileData: Partial<WardenProfile>) => {
    withSync(() => {
        setWardenProfile(prev => ({ ...prev, ...newProfileData }));
    });
  };

  const value = {
    isAdminLoggedIn,
    login,
    logout,
    students,
    rooms,
    complaints,
    attendance,
    messages,
    wardenProfile,
    syncStatus,
    assignRoom,
    updateAttendance,
    markBulkAttendance,
    markFeeAsPaid,
    toggleFeeStatus,
    updateStudentContact,
    sendMessageToAdmin,
    markMessageAsRead,
    submitApplication,
    confirmApplication,
    adminReplyToMessage,
    adminReplyToComplaint,
    resolveComplaint,
    updateWardenProfile,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};