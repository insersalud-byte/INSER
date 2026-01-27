-- ================================================
-- INSER SALUD APP - COMPLETE DATABASE SCHEMA
-- ================================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    city TEXT,
    marketing_opt_in BOOLEAN DEFAULT false,
    onboarding_completed BOOLEAN DEFAULT false,
    onboarding_completed_at TIMESTAMPTZ,
    onboarding_step INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_phone ON profiles(phone);
CREATE INDEX IF NOT EXISTS idx_profiles_onboarding ON profiles(onboarding_completed);

-- 2. USER ROLES TABLE
CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('ADMIN', 'USER')) DEFAULT 'USER',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TREATMENTS TABLE
CREATE TABLE IF NOT EXISTS treatments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    has_apnea BOOLEAN DEFAULT false,
    has_oxygen BOOLEAN DEFAULT false,
    has_rehab BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- 4. APNEA SETUP TABLE
CREATE TABLE IF NOT EXISTS apnea_setup (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    device_type TEXT CHECK (device_type IN ('CPAP', 'AUTOCPAP', 'BIPAP')),
    mask_type TEXT CHECK (mask_type IN ('NASAL', 'NASOBUCAL', 'ALMOHADILLAS')),
    acquired_as TEXT CHECK (acquired_as IN ('ALQUILER', 'COMPRA')),
    difficulty_main TEXT,
    pressure_text TEXT,
    bipap_ipap_text TEXT,
    bipap_epap_text TEXT,
    mask_start_date DATE,
    pillows_start_date DATE,
    filter_last_change_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. OXYGEN SETUP TABLE
CREATE TABLE IF NOT EXISTS oxygen_setup (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    equipment_type TEXT CHECK (equipment_type IN ('ESTACIONARIO', 'PORTATIL', 'CILINDRO')),
    interface_type TEXT CHECK (interface_type IN ('BIGOTERA', 'MASCARA')),
    liters_text TEXT,
    hours_per_day_text TEXT,
    acquired_as TEXT CHECK (acquired_as IN ('ALQUILER', 'COMPRA')),
    interface_start_date DATE,
    equipment_start_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. REHAB SETUP TABLE
CREATE TABLE IF NOT EXISTS rehab_setup (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    diagnosis TEXT CHECK (diagnosis IN ('EPOC', 'FIBROSIS', 'ASMA', 'POSTCOVID', 'OTRO')),
    fatigue_level TEXT CHECK (fatigue_level IN ('LEVE', 'MODERADO', 'ALTO')),
    uses_oxygen_during_exercise TEXT CHECK (uses_oxygen_during_exercise IN ('SI', 'NO', 'AVECES')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. EXERCISE CATALOG TABLE
CREATE TABLE IF NOT EXISTS exercise_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT CHECK (category IN ('RESPIRATORIO', 'MOVILIDAD', 'FUERZA', 'RESISTENCIA')),
    difficulty TEXT CHECK (difficulty IN ('BAJO', 'MODERADO', 'ALTO')),
    duration_minutes INT,
    video_url TEXT,
    image_url TEXT,
    instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. EXERCISE LOGS TABLE
CREATE TABLE IF NOT EXISTS exercise_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    exercise_id UUID REFERENCES exercise_catalog(id) ON DELETE CASCADE,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    duration_minutes INT,
    notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_exercise_logs_user ON exercise_logs(user_id, completed_at DESC);

-- 9. MAINTENANCE LOGS TABLE
CREATE TABLE IF NOT EXISTS maintenance_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    maintenance_type TEXT NOT NULL,
    performed_at TIMESTAMPTZ DEFAULT NOW(),
    notes TEXT
);

-- 10. REMINDERS TABLE
CREATE TABLE IF NOT EXISTS reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    reminder_type TEXT,
    due_date TIMESTAMPTZ,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. ADMIN SETTINGS TABLE (SINGLETON)
CREATE TABLE IF NOT EXISTS admin_settings (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    store_url TEXT DEFAULT 'https://insersalud.com/tienda',
    -- APNEA settings
    cpap_mask_replace_months INT DEFAULT 6,
    cpap_mask_critical_months INT DEFAULT 12,
    cpap_pillows_replace_months INT DEFAULT 6,
    cpap_filter_replace_days INT DEFAULT 60,
    cpap_velcro_check_days INT DEFAULT 14,
    cpap_water_reminder_daily BOOLEAN DEFAULT true,
    -- OXYGEN settings
    oxygen_cannula_clean_days INT DEFAULT 7,
    oxygen_equipment_check_days INT DEFAULT 30,
    oxygen_cannula_replace_days INT DEFAULT 90,
    oxygen_cannula_critical_days INT DEFAULT 150,
    -- REHAB settings
    rehab_exercise_reminder_days INT DEFAULT 2,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO admin_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- 12. PROMOTIONS TABLE
CREATE TABLE IF NOT EXISTS promotions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    image_url TEXT,
    cta_type TEXT CHECK (cta_type IN ('STORE', 'WHATSAPP', 'INTERNAL', 'NONE')) DEFAULT 'STORE',
    cta_url TEXT,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    priority INT DEFAULT 0,
    -- Segmentation
    target_all BOOLEAN DEFAULT true,
    target_apnea BOOLEAN DEFAULT false,
    target_oxygen BOOLEAN DEFAULT false,
    target_rehab BOOLEAN DEFAULT false,
    target_alquiler BOOLEAN DEFAULT false,
    target_compra BOOLEAN DEFAULT false,
    target_mask_type TEXT,
    target_oxygen_equipment TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. PROMOTION STATS TABLE
CREATE TABLE IF NOT EXISTS promotion_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    promotion_id UUID REFERENCES promotions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    event_type TEXT CHECK (event_type IN ('VIEW', 'CLICK')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_promotion_stats ON promotion_stats(promotion_id, event_type);

-- 14. INQUIRIES TABLE (CONSULTAS)
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    status TEXT CHECK (status IN ('NEW', 'READ', 'CLOSED')) DEFAULT 'NEW',
    admin_response TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status, created_at DESC);

-- ================================================
-- FUNCTIONS
-- ================================================

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(uid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = uid AND role = 'ADMIN'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ================================================

-- PROFILES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile" ON profiles
    FOR SELECT USING (auth.uid() = id OR is_admin(auth.uid()));

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can insert profile" ON profiles
    FOR INSERT WITH CHECK (true);

-- USER_ROLES
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read all roles" ON user_roles
    FOR SELECT USING (is_admin(auth.uid()));

-- TREATMENTS
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own treatments" ON treatments
    FOR SELECT USING (auth.uid() = user_id OR is_admin(auth.uid()));

CREATE POLICY "Users can insert own treatments" ON treatments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own treatments" ON treatments
    FOR UPDATE USING (auth.uid() = user_id);

-- APNEA_SETUP
ALTER TABLE apnea_setup ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own apnea setup" ON apnea_setup
    FOR ALL USING (auth.uid() = user_id OR is_admin(auth.uid()));

-- OXYGEN_SETUP
ALTER TABLE oxygen_setup ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own oxygen setup" ON oxygen_setup
    FOR ALL USING (auth.uid() = user_id OR is_admin(auth.uid()));

-- REHAB_SETUP
ALTER TABLE rehab_setup ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own rehab setup" ON rehab_setup
    FOR ALL USING (auth.uid() = user_id OR is_admin(auth.uid()));

-- EXERCISE_CATALOG
ALTER TABLE exercise_catalog ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read exercises" ON exercise_catalog
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage exercises" ON exercise_catalog
    FOR ALL USING (is_admin(auth.uid()));

-- EXERCISE_LOGS
ALTER TABLE exercise_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own exercise logs" ON exercise_logs
    FOR ALL USING (auth.uid() = user_id OR is_admin(auth.uid()));

-- MAINTENANCE_LOGS
ALTER TABLE maintenance_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own maintenance logs" ON maintenance_logs
    FOR ALL USING (auth.uid() = user_id OR is_admin(auth.uid()));

-- REMINDERS
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own reminders" ON reminders
    FOR ALL USING (auth.uid() = user_id OR is_admin(auth.uid()));

-- ADMIN_SETTINGS
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read settings" ON admin_settings
    FOR SELECT USING (true);

CREATE POLICY "Only admins can update settings" ON admin_settings
    FOR UPDATE USING (is_admin(auth.uid()));

-- PROMOTIONS
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read active promotions" ON promotions
    FOR SELECT USING (
        auth.uid() IS NOT NULL 
        AND active = true 
        AND start_date <= NOW() 
        AND end_date >= NOW()
    );

CREATE POLICY "Admins can manage promotions" ON promotions
    FOR ALL USING (is_admin(auth.uid()));

-- PROMOTION_STATS
ALTER TABLE promotion_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own stats" ON promotion_stats
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can read all stats" ON promotion_stats
    FOR SELECT USING (is_admin(auth.uid()));

-- INQUIRIES
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own inquiries" ON inquiries
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all inquiries" ON inquiries
    FOR SELECT USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update inquiries" ON inquiries
    FOR UPDATE USING (is_admin(auth.uid()));
