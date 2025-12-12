
export interface Student {
  id: string;
  name: string;
  fatherName: string;
  course: string;
  collegeName: string;
  year: number | null;
  contact: string | null;
  email: string | null;
  address: string | null;
  aadharNumber: string | null;
  parentContact: string | null;
  photoUrl?: string;
  registrationDate: string;
  roomNumber: number | null;
  feeStatus: 'Paid' | 'Pending';
  applicationType: 'Online' | 'Offline' | 'Google Sheet';
  admissionStatus: 'Pending' | 'Confirmed';
}

export interface Room {
  number: number;
  floor: number;
  capacity: number;
  occupantIds: string[];
}

export interface ComplaintReply {
  text: string;
  timestamp: string;
}

export interface Complaint {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: number;
  complaint: string;
  date: string;
  status: 'Open' | 'Resolved';
  replies: ComplaintReply[];
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  date: string;
  status: 'Present' | 'Absent';
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'student' | 'admin';
  timestamp: string;
}

export interface Message { // Represents a conversation thread
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  conversation: ChatMessage[];
  status: 'Unread' | 'Read';
}

export interface WardenProfile {
  name: string;
  title: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  officeHours: string;
  bio: string;
  imageUrl: string;
}