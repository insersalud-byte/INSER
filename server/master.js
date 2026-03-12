const whatsapp = require('./services/whatsapp');
const reporting = require('./services/reporting');
const infra = require('./setup_master_infra');

/**
 * SANTI MASTER ORCHESTRATOR - CENTRAL CONTROLLER
 * LEVEL 5 TOTAL CONTROL
 */

async function startMasterOrchestration() {
    console.log('🧉 INICIANDO SANTI MASTER ORCHESTRATOR - NIVEL 5...');

    // 1. Sync Infrastructure
    console.log('🛠️ Sincronizando infraestructura...');
    // autoRepairNetwork ya se autoejecuta en el require de infra

    // 2. Start Services
    console.log('📡 Activando servicios estratégicos...');
    setInterval(async () => {
        const report = await reporting.generateDailyReport();
        // Enviar reporte a canal de monitoreo (Telegram/Admin)
    }, 24 * 60 * 60 * 1000); // Diario

    console.log('✅ Sistema Master en línea. Esperando interacciones...');
}

startMasterOrchestration().catch(err => {
    console.error('❌ Error crítico en Master Orchestrator:', err);
});
