import Dexie from 'dexie';

export const db = new Dexie('InserSaludDB');

db.version(1).stores({
    // User Profile (Offline cache)
    profile: 'id, email',

    // Sync Queue (for offline actions)
    syncQueue: '++id, table, action, data, timestamp',

    // Setup / Content
    treatments: 'id, type',
    apnea_setup: 'user_id',
    oxygen_setup: 'user_id',
    rehab_setup: 'user_id',

    // Logs & Interactive
    exercise_logs: 'id, completed_at',
    maintenance_logs: 'id, category, performed_at',
    reminders: '++id, type, date',

    // Read-only / Content
    promotions: 'id, active, priority',
    admin_settings: 'id'
});

// Helper for offline detection
export const isOnline = () => navigator.onLine;

window.addEventListener('online', () => {
    // Trigger sync logic here later
    console.log('Online restored - Syncing...');
});
