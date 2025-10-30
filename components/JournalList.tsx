
import React from 'react';
import { JournalEntry } from '../types';

interface JournalListProps {
  journalEntries: JournalEntry[];
}

const JournalList: React.FC<JournalListProps> = ({ journalEntries }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Riwayat Jurnal</h2>
      <div className="overflow-x-auto">
        {journalEntries.length === 0 ? (
          <p className="text-slate-500 text-center py-4">Belum ada jurnal yang diinput.</p>
        ) : (
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tanggal</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Jam</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Kelas & Mapel</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Materi</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Kehadiran</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {journalEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{formatDate(entry.learningDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{entry.timePeriod}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="font-medium text-slate-900">{entry.className}</div>
                    <div className="text-slate-500">{entry.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-slate-500 max-w-xs">{entry.material}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <div className="font-medium text-slate-900">{entry.presentCount} Hadir</div>
                    {entry.absentNotes && <div className="text-slate-500 text-xs">{entry.absentNotes}</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default JournalList;
