const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const dbService = require('./services/dbService');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

// --- INICIALIZACIÓN ---
async function startServer() {
    try {
        await dbService.init();
        app.listen(PORT, () => {
            console.log(`🚀 Hospital Rawson Backend profesional funcionando en puerto ${PORT}`);
            console.log(`✅ Conectado a Supabase para persistencia en la nube.`);
        });
    } catch (err) {
        console.error("Fallo crítico en el inicio del servidor:", err);
    }
}

// --- PROFESIONALES ---
app.get('/api/professionals', async (req, res) => {
    try {
        const data = await dbService.getProfessionals();
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/professionals', async (req, res) => {
    try {
        await dbService.upsertProfessional(req.body);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- PATOLOGIAS ---
app.get('/api/pathologies', async (req, res) => {
    try {
        const data = await dbService.getPathologies();
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/pathologies', async (req, res) => {
    try {
        await dbService.upsertPathology(req.body);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- TRATAMIENTOS ---
app.get('/api/treatments', async (req, res) => {
    try {
        const data = await dbService.getTreatments();
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/treatments', async (req, res) => {
    try {
        await dbService.upsertTreatment(req.body);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- PACIENTES ---
app.get('/api/patients', async (req, res) => {
    try {
        const data = await dbService.getPatients();
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/patients', async (req, res) => {
    try {
        const patient = req.body;
        await dbService.upsertPatient(patient);
        res.json({ success: true, id: patient.id });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- SESIONES ---
// Historial de sesiones de un paciente
app.get('/api/sessions/patient/:id', async (req, res) => {
    try {
        const data = await dbService.getSessionsByPatient(req.params.id);
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/sessions', async (req, res) => {
    try {
        const data = await dbService.getAllSessions();
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/sessions', async (req, res) => {
    try {
        await dbService.createSession(req.body);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Crear múltiples sesiones de una vez (batch para calendario multi-fecha)
app.post('/api/sessions/batch', async (req, res) => {
    try {
        const { sesiones } = req.body; 
        if (!Array.isArray(sesiones) || sesiones.length === 0) {
            return res.status(400).json({ error: 'Se requiere un array de sesiones' });
        }
        await dbService.createSessionsBatch(sesiones);
        res.json({ success: true, created: sesiones.length });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/sessions/:id', async (req, res) => {
    try {
        await dbService.updateSession(req.params.id, req.body);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/sessions/:id', async (req, res) => {
    try {
        await dbService.deleteSession(req.params.id);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- ESTADÍSTICAS ---
app.get('/api/stats/summary', async (req, res) => {
    try {
        const { start, end } = req.query;
        const { sesiones, pacientes } = await dbService.getStats(start, end);

        const stats = {
            asistencias: { asistio: 0, no_asistio: 0, total: 0 },
            patologias: {},
            tratamientos: {},
            medicos: {},
            instituciones: {},
            kinesiologos: {}
        };

        sesiones.forEach(s => {
            if (s.estado === 'asistió') stats.asistencias.asistio++;
            if (s.estado === 'no asistió') stats.asistencias.no_asistio++;
            stats.asistencias.total++;

            if (s.estado === 'asistió' && s.kinesiologo_nombre_snapshot) {
                stats.kinesiologos[s.kinesiologo_nombre_snapshot] = (stats.kinesiologos[s.kinesiologo_nombre_snapshot] || 0) + 1;
            }

            if (s.estado === 'asistió' && s.tratamiento?.nombre) {
                stats.tratamientos[s.tratamiento.nombre] = (stats.tratamientos[s.tratamiento.nombre] || 0) + 1;
            }
        });

        pacientes.forEach(p => {
            if (p.patologia) stats.patologias[p.patologia] = (stats.patologias[p.patologia] || 0) + 1;
            if (p.medico_derivante_nombre) stats.medicos[p.medico_derivante_nombre] = (stats.medicos[p.medico_derivante_nombre] || 0) + 1;
            if (p.medico_derivante_institucion) stats.instituciones[p.medico_derivante_institucion] = (stats.instituciones[p.medico_derivante_institucion] || 0) + 1;
        });

        res.json(stats);
    } catch (err) {
        console.error("Stats Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// --- SERVIR FRONTEND ---
app.use('/consultorio', express.static(path.join(__dirname, '../client/dist')));

// Fallback para React Router en el subdominio/subruta
app.get(/^\/consultorio(\/.*)?$/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Redirigir la raiz si caen ahí por error
app.get('/', (req, res) => {
    res.redirect('/consultorio');
});

if (process.env.NODE_ENV !== 'production') {
    startServer();
}

module.exports = app;
