import React, { useState } from 'react';
import { User } from '../types';

interface AdminProps {
    users: User[];
    addUser: (newUser: Omit<User, 'role'>) => void;
}

const Admin: React.FC<AdminProps> = ({ users, addUser }) => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName || !username || !password) {
            alert('Harap isi semua kolom.');
            return;
        }
        addUser({ fullName, username, password });
        // Reset form
        setFullName('');
        setUsername('');
        setPassword('');
    };
    
    const teacherUsers = users.filter(u => u.role === 'teacher');

    const inputStyle = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm";

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-slate-800">Tambah Pengguna Guru Baru</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
                        <input id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required className={inputStyle} />
                    </div>
                    <div>
                        <label htmlFor="username-admin" className="block text-sm font-medium text-slate-700">Username</label>
                        <input id="username-admin" value={username} onChange={e => setUsername(e.target.value)} required className={inputStyle} />
                    </div>
                    <div>
                        <label htmlFor="password-admin" className="block text-sm font-medium text-slate-700">Password</label>
                        <input type="password" id="password-admin" value={password} onChange={e => setPassword(e.target.value)} required className={inputStyle} />
                    </div>
                    <div className="md:col-span-3 flex justify-end">
                         <button type="submit" className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 transition-colors">
                            Tambah Pengguna
                         </button>
                    </div>
                </form>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-slate-800">Daftar Pengguna Guru</h2>
                <div className="overflow-x-auto">
                   {teacherUsers.length === 0 ? (
                      <p className="text-slate-500 text-center py-4">Belum ada pengguna guru yang ditambahkan.</p>
                   ) : (
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nama Lengkap</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Username</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {teacherUsers.map(user => (
                                <tr key={user.username} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{user.fullName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{user.username}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   )}
                </div>
            </div>
        </div>
    );
};

export default Admin;