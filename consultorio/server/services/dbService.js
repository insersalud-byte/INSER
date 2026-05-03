const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://gvharyztavhugqiaihjq.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_wTO5X4JfeoHP0zg7qq4azQ_OJ3jxfwL';

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY no configurados.');
}

console.log('🔌 Intentando conectar a Supabase URL:', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

class DatabaseService {
    async init() {
        console.log("🚀 Sistema de Supabase listo para el Consultorio Rawson.");
        return true;
    }

    // --- PROFESIONALES ---
    async getProfessionals() {
        const { data, error } = await supabase
            .from('rawson_profesionales')
            .select('*')
            .order('nombre');
        if (error) throw error;
        return data;
    }

    async upsertProfessional(prof) {
        const { data, error } = await supabase
            .from('rawson_profesionales')
            .upsert({
                id: prof.id,
                nombre: prof.nombre,
                matricula: prof.matricula,
                especialidad: prof.especialidad
            });
        if (error) throw error;
        return data;
    }

    // --- PATOLOGIAS ---
    async getPathologies() {
        const { data, error } = await supabase
            .from('rawson_patologias')
            .select('*')
            .order('nombre');
        if (error) throw error;
        return data;
    }

    async upsertPathology(patho) {
        const { data, error } = await supabase
            .from('rawson_patologias')
            .upsert({ id: patho.id, nombre: patho.nombre });
        if (error) throw error;
        return data;
    }

    // --- TRATAMIENTOS ---
    async getTreatments() {
        const { data, error } = await supabase
            .from('rawson_tratamientos')
            .select('*')
            .order('nombre');
        if (error) throw error;
        return data;
    }

    async upsertTreatment(treat) {
        const { data, error } = await supabase
            .from('rawson_tratamientos')
            .upsert({ id: treat.id, nombre: treat.nombre });
        if (error) throw error;
        return data;
    }

    // --- PACIENTES ---
    async getPatients() {
        const { data, error } = await supabase
            .from('rawson_pacientes')
            .select('*')
            .order('apellido');
        if (error) throw error;
        return data;
    }

    async upsertPatient(patient) {
        const { id, ...rest } = patient;
        const { data, error } = await supabase
            .from('rawson_pacientes')
            .upsert({ id, ...rest });
        if (error) throw error;
        return data;
    }

    // --- SESIONES ---
    async getSessionsByPatient(patientId) {
        const { data, error } = await supabase
            .from('rawson_sesiones')
            .select(`
                *,
                tratamiento:rawson_tratamientos(nombre)
            `)
            .eq('paciente_id', patientId)
            .order('fecha', { ascending: false })
            .order('hora', { ascending: false });
        
        if (error) throw error;
        
        // Formatear para compatibilidad con el frontend (tratamiento_nombre)
        return data.map(s => ({
            ...s,
            tratamiento_nombre: s.tratamiento?.nombre
        }));
    }

    async getAllSessions() {
        const { data, error } = await supabase
            .from('rawson_sesiones')
            .select(`
                *,
                paciente:rawson_pacientes(nombre, apellido)
            `);
        if (error) throw error;
        
        return data.map(s => ({
            ...s,
            nombre: s.paciente?.nombre,
            apellido: s.paciente?.apellido
        }));
    }

    async createSession(session) {
        const { data, error } = await supabase
            .from('rawson_sesiones')
            .insert(session);
        if (error) throw error;
        return data;
    }

    async createSessionsBatch(sessions) {
        const { data, error } = await supabase
            .from('rawson_sesiones')
            .insert(sessions);
        if (error) throw error;
        return data;
    }

    async updateSession(id, updates) {
        const { data, error } = await supabase
            .from('rawson_sesiones')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', id);
        if (error) throw error;
        return data;
    }

    async deleteSession(id) {
        const { error } = await supabase
            .from('rawson_sesiones')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    }

    // --- ESTADÍSTICAS ---
    async getStats(start, end) {
        let query = supabase.from('rawson_sesiones').select(`
            *,
            tratamiento:rawson_tratamientos(nombre)
        `);
        
        if (start && end) {
            query = query.gte('fecha', start).lte('fecha', end);
        }

        const { data: sesiones, error: sError } = await query;
        if (sError) throw sError;

        let pQuery = supabase.from('rawson_pacientes').select('*');
        const { data: pacientes, error: pError } = await pQuery;
        if (pError) throw pError;

        return { sesiones, pacientes };
    }
}

module.exports = new DatabaseService();
