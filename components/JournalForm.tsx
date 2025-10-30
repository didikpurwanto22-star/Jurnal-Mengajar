
import React, { useState } from 'react';
import { JournalEntry } from '../types';

interface JournalFormProps {
    addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'username' | 'teacherName' | 'timestamp'>) => void;
}

const JournalForm: React.FC<JournalFormProps> = ({ addJournalEntry }) => {
    const [academicYear, setAcademicYear] = useState('2024/2025');
    const [semester, setSemester] = useState<'Ganjil' | 'Genap'>('Ganjil');
    const [className, setClassName] = useState('');
    const [subject, setSubject] = useState('');
    const [learningDate, setLearningDate] = useState(new Date().toISOString().split('T')[0]);
    const [timePeriod, setTimePeriod] = useState('');
    const [material, setMaterial] = useState('');
    const [notes, setNotes] = useState('');
    const [presentCount, setPresentCount] = useState(0);
    const [absentNotes, setAbsentNotes] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!className || !subject || !material || !timePeriod) {
            alert('Harap isi semua kolom yang wajib diisi.');
            return;
        }
        addJournalEntry({
            academicYear,
            semester,
            className,
            subject,
            learningDate,
            timePeriod,
            material,
            notes,
            presentCount,
            absentNotes,
        });
        // Reset form fields
        setClassName('');
        setSubject('');
        setTimePeriod('');
        setMaterial('');
        setNotes('');
        setPresentCount(0);
        setAbsentNotes('');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Input Jurnal Mengajar</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Column 1 */}
                <div className="space-y-4">
                    <InputField label="Tahun Pelajaran" id="academicYear" value={academicYear} onChange={setAcademicYear} required />
                    <div>
                        <label htmlFor="semester" className="block text-sm font-medium text-slate-700">Semester</label>
                        <select id="semester" value={semester} onChange={(e) => setSemester(e.target.value as 'Ganjil' | 'Genap')} className="mt-1 input-style">
                            <option value="Ganjil">Ganjil</option>
                            <option value="Genap">Genap</option>
                        </select>
                    </div>
                    <InputField label="Kelas" id="className" value={className} onChange={setClassName} placeholder="Contoh: X-A, XI-IPA-2" required />
                    <InputField label="Mata Pelajaran" id="subject" value={subject} onChange={setSubject} placeholder="Contoh: Matematika Wajib" required />
                    <InputField label="Tanggal Pembelajaran" id="learningDate" type="date" value={learningDate} onChange={setLearningDate} required />
                    <InputField label="Periode Jam ke-" id="timePeriod" value={timePeriod} onChange={setTimePeriod} placeholder="Contoh: 1-2, 3-4" required />
                </div>
                
                {/* Column 2 */}
                <div className="space-y-4">
                     <div>
                        <label htmlFor="material" className="block text-sm font-medium text-slate-700">Materi yang Diajarkan</label>
                        <textarea id="material" value={material} onChange={(e) => setMaterial(e.target.value)} required rows={3} className="mt-1 input-style" placeholder="Deskripsi singkat materi atau CP/TP"></textarea>
                    </div>
                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Catatan Selama Pembelajaran (Opsional)</label>
                        <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="mt-1 input-style" placeholder="Catatan penting..."></textarea>
                    </div>
                     <InputField label="Jumlah Siswa Hadir" id="presentCount" type="number" value={String(presentCount)} onChange={(val) => setPresentCount(Number(val))} required />
                    <div>
                        <label htmlFor="absentNotes" className="block text-sm font-medium text-slate-700">Catatan Siswa Tidak Hadir (S/I/A)</label>
                        <textarea id="absentNotes" value={absentNotes} onChange={(e) => setAbsentNotes(e.target.value)} rows={2} className="mt-1 input-style" placeholder="Contoh: Budi (Sakit), Citra (Izin)"></textarea>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 flex justify-end">
                    <button type="submit" className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 transition-colors">
                        Simpan Jurnal
                    </button>
                </div>
            </form>
        </div>
    );
};

// Helper component for form inputs
const InputField: React.FC<{label: string, id: string, type?: string, value: string, onChange: (value: string) => void, placeholder?: string, required?: boolean}> = 
({ label, id, type = "text", value, onChange, placeholder, required = false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        <input 
            type={type} 
            id={id} 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            placeholder={placeholder}
            required={required}
            className="mt-1 input-style" 
        />
    </div>
);

// Add a style tag to avoid repeating classes
const styles = `
.input-style {
    display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    background-color: white;
    border: 1px solid #cbd5e1;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
.input-style:focus {
    outline: none;
    --tw-ring-color: #0ea5e9;
    border-color: #0ea5e9;
    box-shadow: 0 0 0 1px #0ea5e9;
}
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


export default JournalForm;
