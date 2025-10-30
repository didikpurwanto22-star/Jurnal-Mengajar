
import React, { useState } from 'react';
import { JournalEntry } from '../types';
import { exportToCSV } from '../utils/csvExporter';

interface ReportsProps {
  journalEntries: JournalEntry[];
  teacherName: string;
}

const Reports: React.FC<ReportsProps> = ({ journalEntries, teacherName }) => {
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  };

  const getWeekEnd = (date: Date) => {
    const d = new Date(getWeekStart(date));
    return new Date(d.setDate(d.getDate() + 4)); // Monday to Friday
  };

  const formatDateForInput = (date: Date) => date.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(formatDateForInput(getWeekStart(new Date())));
  const [endDate, setEndDate] = useState(formatDateForInput(getWeekEnd(new Date())));

  const handleExport = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include the whole end day

    const filteredEntries = journalEntries.filter(entry => {
      const entryDate = new Date(entry.learningDate);
      return entryDate >= start && entryDate <= end;
    });

    if (filteredEntries.length === 0) {
      alert('Tidak ada data jurnal untuk rentang tanggal yang dipilih.');
      return;
    }

    exportToCSV(filteredEntries, teacherName, { start: startDate, end: endDate });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Laporan & Ekspor Data</h2>
      <div className="space-y-4 max-w-xl">
        <p className="text-slate-600">Pilih rentang tanggal untuk membuat laporan mingguan dalam format spreadsheet (.csv).</p>
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-slate-700">Tanggal Mulai</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-slate-700">Tanggal Selesai</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            />
          </div>
          <button
            onClick={handleExport}
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-colors"
          >
            Buat Laporan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
