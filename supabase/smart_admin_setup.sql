DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- 1. Buscamos el ID del usuario que creaste manualmente
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'admin@insersalud.app' LIMIT 1;
  
  -- 2. Verificamos si existe
  IF v_user_id IS NOT NULL THEN
    
    -- 3. Le asignamos el rol de ADMIN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (v_user_id, 'ADMIN')
    ON CONFLICT (user_id) DO UPDATE SET role = 'ADMIN';

    -- 4. Creamos su perfil para que pueda entrar al dashboard sin errores
    INSERT INTO public.profiles (id, email, full_name, onboarding_completed, marketing_opt_in)
    VALUES (v_user_id, 'admin@insersalud.app', 'Administrador Sistema', true, true)
    ON CONFLICT (id) DO NOTHING;
    
    RAISE NOTICE '¡ÉXITO! Admin configurado correctamente.';
  ELSE
    RAISE EXCEPTION 'ERROR: No se encontró el usuario admin@insersalud.app. Por favor ve a Authentication > Users y créalo primero.';
  END IF;
END $$;
