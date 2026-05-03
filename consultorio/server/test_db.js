const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = 'https://xkpjcurlkhvbykzffnbr.supabase.co';
const supabaseKey = 'sb_publishable_A_hVaveGKukW1lRk9uxFRg_Vr5jDv4N';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    console.log('Testing connection to:', supabaseUrl);
    try {
        const { data, error } = await supabase.from('rawson_pacientes').select('count');
        if (error) {
            console.error('Connection error:', error);
        } else {
            console.log('Connection successful! Data:', data);
        }
    } catch (err) {
        console.error('Crash error:', err);
    }
}

test();
