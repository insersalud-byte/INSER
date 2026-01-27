import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase URL or Key missing. Check .env');
}

// Prevent crash if keys are missing (common in local dev without env)
export const supabase = (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http'))
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: true,
            detectSessionInUrl: true,
        },
    })
    : {
        // Mock supabase interface
        ...(() => { console.log('Initializing Mock Supabase'); return {}; })(),
        auth: {
            getSession: async () => ({ data: { session: null } }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
        },
        from: () => ({
            select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }), order: () => ({ data: [], error: null }) }) }),
        })
    };
