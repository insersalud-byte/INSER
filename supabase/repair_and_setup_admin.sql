DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -------------------------------------------------------------
  -- 1. REPARACIÓN DE TABLA PROFILES
  -------------------------------------------------------------
  -- Intentamos agregar la columna onboarding_completed si falta
  BEGIN
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;
  EXCEPTION
    WHEN OTHERS THEN NULL; -- Ignorar errores si ya existe o hay conflicto
  END;
  
  -- Intentamos agregar la columna full_name si falta
  BEGIN
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
  EXCEPTION
    WHEN OTHERS THEN NULL;
  END;

  -- Intentamos agregar la columna marketing_opt_in si falta
  BEGIN
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS marketing_opt_in BOOLEAN DEFAULT false;
  EXCEPTION
    WHEN OTHERS THEN NULL;
  END;

  -------------------------------------------------------------
  -- 2. CONFIGURACIÓN DEL ADMIN
  -------------------------------------------------------------
  -- Buscamos el ID del usuario que creaste manualmente
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'admin@insersalud.app' LIMIT 1;
  
  IF v_user_id IS NOT NULL THEN
    -- Asignamos rol ADMIN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (v_user_id, 'ADMIN')
    ON CONFLICT (user_id) DO UPDATE SET role = 'ADMIN';

    -- Insertamos/Actualizamos perfil Admin solo con las columnas que estamos seguros que existen
    INSERT INTO public.profiles (id, email, full_name, onboarding_completed, marketing_opt_in)
    VALUES (v_user_id, 'admin@insersalud.app', 'Administrador', true, true)
    ON CONFLICT (id) DO UPDATE SET 
      onboarding_completed = true,
      full_name = 'Administrador',
      marketing_opt_in = true;
    
    RAISE NOTICE '¡ÉXITO! Base de datos reparada y admin configurado.';
  ELSE
    RAISE EXCEPTION 'ERROR: No se encontró el usuario admin@insersalud.app. Créalo primero en Auth > Users.';
  END IF;
  
END $$;
