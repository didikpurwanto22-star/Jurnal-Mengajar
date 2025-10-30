import React, { useState, useCallback, useMemo } from 'react';
import { User, JournalEntry } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import Admin from './components/Admin';
import Chatbot from './components/Chatbot';
import { LogoutIcon, BookOpenIcon, DocumentReportIcon, UserGroupIcon } from './components/icons';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
      { username: 'budi.s', fullName: 'Budi Santoso', password: 'password123', role: 'teacher' },
      { username: 'admin', fullName: 'Administrator', password: 'adminpass', role: 'admin' },
  ]);
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'dashboard' | 'reports' | 'admin'>('dashboard');

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    return [
      {
        id: '1',
        username: 'budi.s',
        teacherName: 'Budi Santoso',
        academicYear: '2024/2025',
        semester: 'Ganjil',
        className: 'X-A',
        subject: 'Matematika Wajib',
        learningDate: yesterday.toISOString().split('T')[0],
        timePeriod: '1-2',
        material: 'Pengenalan Aljabar',
        notes: 'Siswa antusias, beberapa masih bingung dengan variabel.',
        presentCount: 30,
        absentNotes: 'Rina (Sakit)',
        timestamp: yesterday.getTime(),
      },
      {
        id: '2',
        username: 'budi.s',
        teacherName: 'Budi Santoso',
        academicYear: '2024/2025',
        semester: 'Ganjil',
        className: 'XI-IPA-2',
        subject: 'Fisika',
        learningDate: today.toISOString().split('T')[0],
        timePeriod: '3-4',
        material: 'Hukum Newton II',
        presentCount: 34,
        absentNotes: 'Andi (Izin)',
        timestamp: today.getTime(),
      },
    ];
  });

  const handleLogin = useCallback((username: string, password: string): boolean => {
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
        const { password: _password, ...userToSet } = foundUser;
        setUser(userToSet);
        setView('dashboard');
        return true;
    }
    return false;
  }, [users]);

  const handleLogout = useCallback(() => {
    setUser(null);
    setView('dashboard');
  }, []);
  
  const addUser = useCallback((newUser: Omit<User, 'role'>) => {
    if (users.some(u => u.username === newUser.username)) {
        alert('Username sudah ada. Harap gunakan username lain.');
        return;
    }
    const userToAdd: User = { ...newUser, role: 'teacher' };
    setUsers(prev => [...prev, userToAdd]);
  }, [users]);

  const addJournalEntry = useCallback((entry: Omit<JournalEntry, 'id' | 'username' | 'teacherName' | 'timestamp'>) => {
    if (!user) return;
    const newEntry: JournalEntry = {
      ...entry,
      id: new Date().toISOString(),
      username: user.username,
      teacherName: user.fullName,
      timestamp: Date.now(),
    };
    setJournalEntries(prev => [newEntry, ...prev]);
  }, [user]);

  const userJournalEntries = useMemo(() => {
    if (!user) return [];
    return journalEntries.filter(entry => entry.username === user.username).sort((a, b) => b.timestamp - a.timestamp);
  }, [journalEntries, user]);

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const NavButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode; isMobile?: boolean }> = ({ active, onClick, children, isMobile }) => (
    <button
      onClick={onClick}
      className={`flex ${isMobile ? 'flex-col items-center justify-center flex-1 py-2' : 'items-center gap-2 px-4 py-2'} text-sm font-medium rounded-md transition-colors ${
        active
          ? 'bg-sky-600 text-white'
          : 'text-slate-100 hover:bg-sky-800 hover:text-white'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-20 md:pb-0">
      <header className="bg-sky-700 text-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">SI-JUGU</h1>
              <nav className="ml-10 hidden md:flex items-center space-x-4">
                <NavButton active={view === 'dashboard'} onClick={() => setView('dashboard')}>
                  <BookOpenIcon /> Dashboard
                </NavButton>
                <NavButton active={view === 'reports'} onClick={() => setView('reports')}>
                  <DocumentReportIcon /> Laporan
                </NavButton>
                {user.role === 'admin' && (
                    <NavButton active={view === 'admin'} onClick={() => setView('admin')}>
                        <UserGroupIcon /> Kelola Pengguna
                    </NavButton>
                )}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-sm">Selamat datang, {user.fullName}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 p-2 text-sm font-medium rounded-md text-slate-100 hover:bg-sky-800 hover:text-white transition-colors"
                aria-label="Logout"
              >
                <LogoutIcon />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {view === 'dashboard' && user.role === 'teacher' && <Dashboard addJournalEntry={addJournalEntry} journalEntries={userJournalEntries} />}
        {view === 'reports' && user.role === 'teacher' && <Reports journalEntries={userJournalEntries} teacherName={user.fullName} />}
        {view === 'admin' && user.role === 'admin' && <Admin users={users} addUser={addUser} />}
        {user.role === 'admin' && view !== 'admin' && (
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-slate-800">Panel Administrator</h2>
                <p className="mt-2 text-slate-600">Pilih "Kelola Pengguna" dari menu navigasi untuk memulai.</p>
            </div>
        )}
      </main>

      <footer className="fixed bottom-0 w-full md:hidden bg-sky-700 border-t border-slate-200">
          <div className="flex justify-around">
            <NavButton isMobile active={view === 'dashboard'} onClick={() => setView('dashboard')}>
                <BookOpenIcon /> 
                <span className="text-xs">Dashboard</span>
            </NavButton>
            <NavButton isMobile active={view === 'reports'} onClick={() => setView('reports')}>
                <DocumentReportIcon /> 
                <span className="text-xs">Laporan</span>
            </NavButton>
            {user.role === 'admin' && (
                <NavButton isMobile active={view === 'admin'} onClick={() => setView('admin')}>
                    <UserGroupIcon />
                    <span className="text-xs">Admin</span>
                </NavButton>
            )}
          </div>
      </footer>

      <Chatbot />
    </div>
  );
};

export default App;