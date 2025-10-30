
import { JournalEntry } from '../types';

const escapeCSV = (str: string | undefined): string => {
  if (str === undefined || str === null) return '';
  let result = str.toString();
  if (result.includes(',') || result.includes('"') || result.includes('\n')) {
    result = '"' + result.replace(/"/g, '""') + '"';
  }
  return result;
};

export const exportToCSV = (
  entries: JournalEntry[], 
  teacherName: string, 
  dateRange: { start: string, end: string }
) => {
  const sortedEntries = [...entries].sort((a, b) => {
    const dateA = new Date(a.learningDate).getTime();
    const dateB = new Date(b.learningDate).getTime();
    if (dateA !== dateB) {
      return dateA - dateB;
    }
    return a.timePeriod.localeCompare(b.timePeriod);
  });

  const headers = [
    'Hari, Tanggal',
    'Jam ke-',
    'Kelas',
    'Mata Pelajaran',
    'Materi yang Diajarkan',
    'Catatan Pembelajaran',
    'Presensi (Hadir/S/I/A)'
  ];

  const rows = sortedEntries.map(entry => {
    const formattedDate = new Date(entry.learningDate).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const presensi = `${entry.presentCount} Hadir. ${entry.absentNotes || ''}`.trim();

    return [
      escapeCSV(formattedDate),
      escapeCSV(entry.timePeriod),
      escapeCSV(entry.className),
      escapeCSV(entry.subject),
      escapeCSV(entry.material),
      escapeCSV(entry.notes),
      escapeCSV(presensi)
    ].join(',');
  });

  const title = "Laporan Jurnal Mengajar Mingguan";
  const teacherInfo = `Nama Guru: ${teacherName}`;
  const periodInfo = `Periode: ${dateRange.start} - ${dateRange.end}`;
  
  const csvContent = [
    title,
    teacherInfo,
    periodInfo,
    '', // blank line
    headers.join(','),
    ...rows
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Laporan_Jurnal_${teacherName}_${dateRange.start}_${dateRange.end}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
