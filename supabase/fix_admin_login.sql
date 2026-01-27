-- INSTRUCCIONES PARA ARREGLAR LOGIN DE ADMIN
------------------------------------------------

-- 1. Primero, crea el usuario manualmente si no existe:
-- Ve al Dashboard de Supabase -> Authentication -> Users -> Add User
-- Email: admin@insersalud.app
-- Password: 2123
-- (Asegúrate de marcar "Auto Confirm User" si aparece la opción)

-- 2. Una vez creado el usuario, necesitas su UUID (User ID).
-- Cópialo desde la tabla de usuarios en Authentication.

-- 3. Ejecuta este script SQL reemplazando 'TU_UUID_AQUI' con el ID que copiaste:

-- Reemplazar TU_UUID_AQUI con el ID real, ej: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
INSERT INTO public.user_roles (user_id, role)
VALUES ('TU_UUID_AQUI', 'ADMIN')
ON CONFLICT (user_id) DO UPDATE SET role = 'ADMIN';

-- 4. Opcional: Crear perfil en tabla profiles si no existe (para evitar errores en dashboard)
INSERT INTO public.profiles (id, email, full_name, onboarding_completed)
VALUES ('TU_UUID_AQUI', 'admin@insersalud.app', 'Administrador', true)
ON CONFLICT (id) DO NOTHING;

------------------------------------------------
-- PARA SOLUCIONAR EL LOGIN DE PACIENTES (WhatsApp)
------------------------------------------------
-- 1. Ve a Authentication -> Providers -> Email
-- 2. DESACTIVA "Confirm email" (Secure email change también si quieres)
-- 3. Guarda los cambios.
-- Esto es necesario porque estamos generando emails falsos (telefono@insersalud.app)
-- que no se pueden confirmar realmente.
