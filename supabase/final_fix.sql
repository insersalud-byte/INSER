-- 1. REPARAR TABLA PROFILES (Asegurar que las columnas existan)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS marketing_opt_in BOOLEAN DEFAULT false;

-- 2. CONFIGURAR ROL DE ADMIN
-- Buscamos al usuario admin@insersalud.app que creaste y lo hacemos ADMIN
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'ADMIN' 
FROM auth.users 
WHERE email = 'admin@insersalud.app'
ON CONFLICT (user_id) DO UPDATE SET role = 'ADMIN';

-- 3. CREAR/ACTUALIZAR PERFIL DE ADMIN
-- Importante: El perfil necesita un teléfono porque lo definimos como NOT NULL
INSERT INTO public.profiles (id, email, full_name, phone, onboarding_completed, marketing_opt_in)
SELECT id, email, 'Administrador', '00000000', true, true
FROM auth.users 
WHERE email = 'admin@insersalud.app'
ON CONFLICT (id) DO UPDATE SET 
    onboarding_completed = true,
    full_name = 'Administrador',
    marketing_opt_in = true;
