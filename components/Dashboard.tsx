
import React from 'react';
import { JournalEntry } from '../types';
import JournalForm from './JournalForm';
import JournalList from './JournalList';

interface DashboardProps {
    addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'username' | 'teacherName' | 'timestamp'>) => void;
    journalEntries: JournalEntry[];
}

const Dashboard: React.FC<DashboardProps> = ({ addJournalEntry, journalEntries }) => {
    return (
        <div className="space-y-8">
            <JournalForm addJournalEntry={addJournalEntry} />
            <JournalList journalEntries={journalEntries} />
        </div>
    );
};

export default Dashboard;
