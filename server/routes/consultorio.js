const express = require('express');
const router = express.Router();
const path = require('path');
const dbService = require('../../consultorio/server/services/dbService');

// --- PROFESIONALES ---
router.get('/professionals', async (req, res) => {
    try {
        const data = await dbService.all('SELECT * FROM profesionales');
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/professionals', async (req, res) => {
    try {
        const { id, nombre, matricula, especialidad } = req.body;
        await dbService.run('INSERT OR REPLACE INTO profesionales (id, nombre, matricula, especialidad) VALUES (?, ?, ?, ?)',
            [id, nombre, matricula, especialidad]);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- PATOLOGIAS ---
router.get('/pathologies', async (req, res) => {
    try {
        const data = await dbService.all('SELECT * FROM patologias');
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/pathologies', async (req, res) => {
    try {
        const { id, nombre } = req.body;
        await dbService.run('INSERT OR REPLACE INTO patologias (id, nombre) VALUES (?, ?)', [id, nombre]);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- TRATAMIENTOS ---
router.get('/treatments', async (req, res) => {
    try {
        const data = await dbService.all('SELECT * FROM tratamientos');
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/treatments', async (req, res) => {
    try {
        const { id, nombre } = req.body;
        await dbService.run('INSERT OR REPLACE INTO tratamientos (id, nombre) VALUES (?, ?)', [id, nombre]);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- PACIENTES ---
router.get('/patients', async (req, res) => {
    try {
        const data = await dbService.all('SELECT * FROM pacientes');
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/patients', async (req, res) => {
    try {
        const { id, nombre, apellido, historia_clinica, telefono, whatsapp, email, created_at, estado_paciente, observaciones, medico_derivante_nombre, medico_derivante_telefono, medico_derivante_institucion, patologia } = req.body;
        try { await dbService.run('ALTER TABLE pacientes ADD COLUMN whatsapp TEXT'); } catch (e) { }
        try { await dbService.run('ALTER TABLE pacientes ADD COLUMN patologia TEXT'); } catch (e) { }
        await dbService.run(`INSERT OR REPLACE INTO pacientes (id, nombre, apellido, historia_clinica, telefono, whatsapp, email, created_at, estado_paciente, observaciones, medico_derivante_nombre, medico_derivante_telefono, medico_derivante_institucion, patologia) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, nombre, apellido, historia_clinica, telefono, whatsapp || null, email, created_at || new Date().toISOString(), estado_paciente || 'activo', observaciones, medico_derivante_nombre, medico_derivante_telefono, medico_derivante_institucion, patologia || null]);
        res.json({ success: true, id });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- SESIONES ---
router.get('/sessions/patient/:id', async (req, res) => {
    try {
        const data = await dbService.all(`
            SELECT s.*, t.nombre as tratamiento_nombre
            FROM sesiones s
            LEFT JOIN tratamientos t ON s.tratamiento_id = t.id
            WHERE s.paciente_id = ?
            ORDER BY s.fecha DESC, s.hora DESC`,
            [req.params.id]
        );
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/sessions', async (req, res) => {
    try {
        const data = await dbService.all(`
            SELECT s.*, p.nombre, p.apellido 
            FROM sesiones s 
            LEFT JOIN pacientes p ON s.paciente_id = p.id
        `);
        res.json(data);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/sessions', async (req, res) => {
    try {
        const { paciente_id, fecha, hora, kinesiologo_id, kinesiologo_nombre_snapshot, estado, tratamiento_id, patologia_id, observaciones } = req.body;
        await dbService.run(`
            INSERT INTO sesiones (paciente_id, fecha, hora, kinesiologo_id, kinesiologo_nombre_snapshot, estado, tratamiento_id, patologia_id, observaciones, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [paciente_id, fecha, hora, kinesiologo_id, kinesiologo_nombre_snapshot, estado || 'programado', tratamiento_id, patologia_id, observaciones, new Date().toISOString()]
        );
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/sessions/batch', async (req, res) => {
    try {
        const { sesiones } = req.body;
        if (!Array.isArray(sesiones) || sesiones.length === 0) {
            return res.status(400).json({ error: 'Se requiere un array de sesiones' });
        }
        for (const s of sesiones) {
            await dbService.run(`
                INSERT INTO sesiones (paciente_id, fecha, hora, estado, created_at)
                VALUES (?, ?, ?, ?, ?)`,
                [s.paciente_id, s.fecha, s.hora, s.estado || 'programado', new Date().toISOString()]
            );
        }
        res.json({ success: true, created: sesiones.length });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/sessions/:id', async (req, res) => {
    try {
        const { estado, tratamiento_id, observaciones, kinesiologo_nombre_snapshot } = req.body;
        await dbService.run(`
            UPDATE sesiones SET estado = ?, tratamiento_id = ?, observaciones = ?, 
            kinesiologo_nombre_snapshot = ?, updated_at = ?
            WHERE id = ?`,
            [estado, tratamiento_id || null, observaciones || null, kinesiologo_nombre_snapshot || null, new Date().toISOString(), req.params.id]
        );
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/sessions/:id', async (req, res) => {
    try {
        await dbService.run('DELETE FROM sesiones WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/stats/summary', async (req, res) => {
    try {
        const { start, end } = req.query;
        let dateFilter = '';
        let params = [];
        if (start && end) {
            dateFilter = ' AND fecha BETWEEN ? AND ? ';
            params = [start, end];
        }
        const stats = {
            asistencias: { asistio: 0, no_asistio: 0, total: 0 },
            patologias: {},
            tratamientos: {},
            medicos: {},
            instituciones: {},
            kinesiologos: {}
        };
        const sesiones = await dbService.all(`
            SELECT estado, kinesiologo_nombre_snapshot, tratamiento_id, t.nombre as tr_nombre
            FROM sesiones s
            LEFT JOIN tratamientos t ON s.tratamiento_id = t.id
            WHERE 1=1 ${dateFilter}
        `, params);
        sesiones.forEach(s => {
            if (s.estado === 'asistió') stats.asistencias.asistio++;
            if (s.estado === 'no asistió') stats.asistencias.no_asistio++;
            stats.asistencias.total++;
            if (s.estado === 'asistió' && s.kinesiologo_nombre_snapshot) {
                stats.kinesiologos[s.kinesiologo_nombre_snapshot] = (stats.kinesiologos[s.kinesiologo_nombre_snapshot] || 0) + 1;
            }
            if (s.estado === 'asistió' && s.tr_nombre) {
                stats.tratamientos[s.tr_nombre] = (stats.tratamientos[s.tr_nombre] || 0) + 1;
            }
        });
        const pacientesObj = await dbService.all(`
            SELECT DISTINCT p.id, p.patologia, p.medico_derivante_nombre, p.medico_derivante_institucion
            FROM pacientes p
            ${start && end ? `JOIN sesiones s ON s.paciente_id = p.id WHERE s.fecha BETWEEN ? AND ?` : ''}
        `, params);
        pacientesObj.forEach(p => {
            if (p.patologia) stats.patologias[p.patologia] = (stats.patologias[p.patologia] || 0) + 1;
            if (p.medico_derivante_nombre) stats.medicos[p.medico_derivante_nombre] = (stats.medicos[p.medico_derivante_nombre] || 0) + 1;
            if (p.medico_derivante_institucion) stats.instituciones[p.medico_derivante_institucion] = (stats.instituciones[p.medico_derivante_institucion] || 0) + 1;
        });
        res.json(stats);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
