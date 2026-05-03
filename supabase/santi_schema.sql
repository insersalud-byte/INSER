-- ============================================================
-- SANTI AGENT — SCHEMA EXTENSION
-- Ejecutar en Supabase SQL Editor (después del schema.sql base)
-- ============================================================

-- 1. PRODUCTOS — Base de conocimiento de Santi
--    Permite actualizar precios desde el admin sin tocar código
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS santi_products (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL,
    category    TEXT NOT NULL CHECK (category IN (
                    'CPAP','AUTOCPAP','BIPAP','CONCENTRADOR',
                    'MASCARA','ACCESORIO','DIAGNOSTICO','OTRO')),
    price_ars   TEXT,        -- ej. "$499.000"
    price_usd   TEXT,        -- ej. "U$S 1.880"
    url         TEXT,        -- link ficha técnica insersalud.com
    note        TEXT,        -- nota extra para Santi
    active      BOOLEAN DEFAULT true,
    sort_order  INT DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para consultas rápidas por categoría
CREATE INDEX IF NOT EXISTS idx_santi_products_category
    ON santi_products(category) WHERE active = true;

-- Seed inicial con los productos actuales
INSERT INTO santi_products (name, category, price_ars, price_usd, url, note, sort_order) VALUES
('CPAP BMC G2S con Humidificador','CPAP','$499.000','U$S 416','https://insersalud.com/cpap-bmc-g2s','El más vendido. CPAP fijo con humidificador.',1),
('AUTOCPAP BMC G2S Mini con Almohadillas','AUTOCPAP',NULL,'U$S 1.400',NULL,'Con humidificador p2H incluido.',2),
('AUTOCPAP BMC G2s','AUTOCPAP',NULL,'U$S 415',NULL,'AutoCPAP estándar.',3),
('AUTOCPAP PHILIPS DREAMSTATION','AUTOCPAP',NULL,'U$S 758',NULL,'Con conectividad WiFi.',4),
('AUTOCPAP RESMED AIRSENSE 10','AUTOCPAP',NULL,'U$S 907',NULL,'Con conectividad AirView.',5),
('CPAP PHILIPS DREAMSTATION','CPAP',NULL,'U$S 579',NULL,'Con conectividad.',6),
('CPAP RESMED AIRSENSE 10','CPAP',NULL,'U$S 616',NULL,'Con conectividad.',7),
('CPAP YUWELL YH-360 con Humidificador','CPAP',NULL,'U$S 416',NULL,'Opción económica.',8),
('CPAP YAMIND con Humidificador Activo','CPAP',NULL,'U$S 330',NULL,'El más accesible del catálogo.',9),
('BiPAP BMC G3 con FR y Humidificador','BIPAP','$1.300.000','U$S 907','https://insersalud.com/bipap-bmc-g3-con-frecuencia-respiratoria-y-humidificador','Con frecuencia respiratoria de respaldo. Ideal ENM.',10),
('BIPAP YUWELL con FR y Humidificador','BIPAP',NULL,'U$S 1.014',NULL,'Alternativa accesible al BMC G3.',11),
('STELLAR 150 RESMED','BIPAP',NULL,'U$S 7.342',NULL,'Ventilador de alta gama para ELA/AME.',12),
('Concentrador Portátil KINGON P2-S3','CONCENTRADOR','$2.735.400','U$S 1.880','https://insersalud.com/concentrador-de-oxigeno-portatil-kingon-p2-s3-el-mas-liviano-y-economico','El más liviano y económico. 2,3 kg.',13),
('Concentrador Portátil KINGON P2-TOC','CONCENTRADOR',NULL,'U$S 3.458',NULL,'Máxima autonomía 9,5 hs.',14),
('Concentrador Portátil KINGON P2-E7','CONCENTRADOR',NULL,'U$S 3.099',NULL,'Autonomía 7 hs.',15),
('Concentrador Portátil KINGON P2-E6','CONCENTRADOR',NULL,'U$S 2.695',NULL,'Autonomía 6 hs.',16),
('Concentrador Portátil KINGON P2-E','CONCENTRADOR',NULL,'U$S 2.379',NULL,'Entrada de gama KINGON.',17),
('Concentrador Portátil GCE Zen-O (2 Bat + Carro)','CONCENTRADOR','$5.451.885','U$S 3.747',NULL,'Homologado vuelos. 3 años garantía.',18),
('Concentrador Portátil PHILIPS SIMPLYGO','CONCENTRADOR',NULL,'U$S 3.887',NULL,'Flujo continuo + pulso.',19),
('Concentrador YUWELL Estacionario','CONCENTRADOR',NULL,'U$S 713',NULL,'5 L/min domiciliario.',20),
('Concentrador Estacionario (genérico)','CONCENTRADOR',NULL,'U$S 756',NULL,'Para uso domiciliario 24 hs.',21),
('Mascarilla Nasal DreamWear Philips','MASCARA','$223.000','U$S 153',NULL,'Mínimo contacto. CPAP/BiPAP.',30),
('Máscara Nasal BMC N4','MASCARA',NULL,'U$S 36',NULL,'Opción económica con apoya frente.',31),
('Máscara Nasal RESCOMF','MASCARA','$50.000','U$S 35',NULL,'La más económica del mercado.',32),
('Máscara Nasal BMC N5a sin Apoya Frente','MASCARA',NULL,'U$S 60',NULL,'Mayor campo visual. Talles SW/S/M.',33),
('Máscara Nasal AirFit Mínimo Contacto RESMED','MASCARA',NULL,'U$S 157',NULL,'Talles SW/S/M.',34),
('Máscara Nasal BMC Multitalle','MASCARA',NULL,'U$S 89.50',NULL,'Se adapta a distintas morfologías.',35),
('Máscara Nasal Pillow YUWELL YP-01','MASCARA',NULL,'U$S 42',NULL,'Almohadillas nasales L/M.',36),
('Mascarilla Nasobucal DreamWear Philips','MASCARA','$229.000','U$S 157',NULL,'Mínimo contacto nasobucal.',37),
('Máscara BMC F2 Nasobucal','MASCARA',NULL,'U$S 52',NULL,'Con apoya frontal.',38),
('Buconasal YUWELL','MASCARA',NULL,'U$S 52',NULL,'Con apoya frente.',39),
('Buconasal YUWELL YF02 sin Apoya Frente','MASCARA',NULL,'U$S 55',NULL,'Mayor campo visual.',40),
('Buconasal BMC F5A sin Apoya Frente','MASCARA',NULL,'U$S 52',NULL,'Talles S/M/L.',41),
('Nasobucal AirFit F30 RESMED','MASCARA',NULL,'U$S 212',NULL,'Sub-nasal mínimo contacto.',42),
('Nasobucal AirFit F20 RESMED','MASCARA',NULL,'U$S 189.50',NULL,'Full face clásica.',43),
('Máscara Nasal Pediátrica NeoQ Infant','MASCARA',NULL,'U$S 144',NULL,'Pediátrica XS/S/M/L.',44),
('Máscara Pediátrica HSINER Cirri Mini','MASCARA',NULL,'U$S 105',NULL,'Pediátrica XS/S/M/L.',45),
('Máscara Pediátrica JIRAFA Philips','MASCARA',NULL,'U$S 220',NULL,'Diseño ergonómico para niños.',46),
('Infant CPAP Kit Pediátrico','MASCARA',NULL,'U$S 97',NULL,'Tallas 00 al 5 neonatales.',47),
('Cough Assist — Asistente de Tos','OTRO',NULL,'U$S 9.084',NULL,'Insuflador-exsuflador. ELA/AME/DMD.',50),
('Polígrafo BMC YH-600B PRO','DIAGNOSTICO',NULL,'U$S 1.570',NULL,'Estudio del sueño domiciliario.',51),
('Mochila de Oxígeno (tubo 0,415 + regulador)','ACCESORIO',NULL,'U$S 270',NULL,'Para salidas cortas. Incluye recarga.',52)
ON CONFLICT DO NOTHING;

-- RLS para santi_products
ALTER TABLE santi_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active products" ON santi_products
    FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage products" ON santi_products
    FOR ALL USING (is_admin(auth.uid()));

-- ============================================================
-- 2. EXTENDER chat_conversations para canales sociales
-- ============================================================
ALTER TABLE chat_conversations
    ADD COLUMN IF NOT EXISTS channel          TEXT DEFAULT 'web'
                                             CHECK (channel IN ('web','messenger','instagram','whatsapp')),
    ADD COLUMN IF NOT EXISTS platform_sender_id TEXT,   -- PSID de Facebook / IG user id
    ADD COLUMN IF NOT EXISTS page_id          TEXT,     -- Facebook Page ID
    ADD COLUMN IF NOT EXISTS sender_name      TEXT,     -- Nombre del usuario social
    ADD COLUMN IF NOT EXISTS is_paused        BOOLEAN DEFAULT false,  -- admin intervino
    ADD COLUMN IF NOT EXISTS last_message_at  TIMESTAMPTZ DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS status           TEXT DEFAULT 'open'
                                             CHECK (status IN ('open','closed','spam'));

-- Índices para dashboard
CREATE INDEX IF NOT EXISTS idx_chat_conv_channel
    ON chat_conversations(channel, last_message_at DESC);

CREATE INDEX IF NOT EXISTS idx_chat_conv_platform_sender
    ON chat_conversations(platform_sender_id) WHERE platform_sender_id IS NOT NULL;

-- ============================================================
-- 3. EXTENDER chat_messages para admin/intervención
-- ============================================================
ALTER TABLE chat_messages
    ADD COLUMN IF NOT EXISTS channel TEXT DEFAULT 'web',
    ADD COLUMN IF NOT EXISTS is_admin_reply BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS platform_msg_id TEXT;  -- mid de Facebook

-- ============================================================
-- 4. FUNCIÓN — Obtener o crear conversación por platform_sender_id
-- ============================================================
CREATE OR REPLACE FUNCTION get_or_create_social_conversation(
    p_sender_id     TEXT,
    p_page_id       TEXT,
    p_channel       TEXT,
    p_sender_name   TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_conv_id UUID;
BEGIN
    SELECT id INTO v_conv_id
    FROM chat_conversations
    WHERE platform_sender_id = p_sender_id
      AND page_id = p_page_id
      AND channel = p_channel
      AND status = 'open'
    ORDER BY started_at DESC
    LIMIT 1;

    IF v_conv_id IS NULL THEN
        INSERT INTO chat_conversations
            (channel, platform_sender_id, page_id, sender_name, last_message_at)
        VALUES
            (p_channel, p_sender_id, p_page_id, p_sender_name, NOW())
        RETURNING id INTO v_conv_id;
    END IF;

    RETURN v_conv_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- 5. VISTA — Resumen para el dashboard
-- ============================================================
CREATE OR REPLACE VIEW santi_dashboard_stats AS
SELECT
    channel,
    COUNT(DISTINCT id)                                          AS total_conversations,
    COUNT(DISTINCT CASE WHEN status = 'open' THEN id END)      AS open_conversations,
    COUNT(DISTINCT CASE WHEN is_paused THEN id END)            AS paused_conversations,
    COUNT(DISTINCT CASE
        WHEN last_message_at >= NOW() - INTERVAL '24 hours'
        THEN id END)                                            AS conversations_today,
    MAX(last_message_at)                                        AS last_activity
FROM chat_conversations
GROUP BY channel;
