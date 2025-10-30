export interface User {
  username: string;
  fullName: string;
  password?: string; // For auth checking, not stored in active user state
  role: 'admin' | 'teacher';
}

export interface JournalEntry {
  id: string;
  username: string;
  teacherName: string;
  academicYear: string;
  semester: 'Ganjil' | 'Genap';
  className: string;
  subject: string;
  learningDate: string; // YYYY-MM-DD
  timePeriod: string;
  material: string;
  notes?: string;
  presentCount: number;
  absentNotes?: string;
  timestamp: number;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}