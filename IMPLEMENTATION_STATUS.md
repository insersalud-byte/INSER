# INSER SALUD APP - Estado de Implementación

## ✅ Completado

### 1. Base de Datos
- **Schema SQL completo** en `supabase/schema.sql`
- Todas las tablas necesarias creadas
- Políticas RLS configuradas
- Función `is_admin()` implementada

### 2. Flujo de Autenticación
- **Welcome Page** (`/welcome`) - Primera pantalla con opciones
- **Login con Email OTP** (`/login`) - Autenticación con Supabase
- **Triage** (`/triage`) - Cuestionario de 5 pasos para ubicar al usuario
- **Onboarding** (`/onboarding`) - Configuración ramificada según tratamiento

### 3. Componentes Creados
- `WelcomePage.jsx` - Pantalla de bienvenida
- `LoginPage.jsx` - Login con OTP
- `TriagePage.jsx` - Cuestionario de triage
- `OnboardingWizard.jsx` - Configuración de tratamiento
- Botón WhatsApp fijo en todas las pantallas

## 📋 Próximos Pasos

### Paso 1: Configurar Supabase

1. Ve a [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **SQL Editor**
4. Copia y pega el contenido completo de `supabase/schema.sql`
5. Ejecuta el SQL (Run o Ctrl+Enter)

### Paso 2: Crear Usuario Admin

Ejecuta este SQL en Supabase para crear tu usuario admin:

```sql
-- Primero, crea el usuario en Auth (usa el dashboard de Supabase: Authentication > Users > Add User)
-- Luego, asigna el rol de admin:
INSERT INTO user_roles (user_id, role)
VALUES ('TU_USER_ID_AQUI', 'ADMIN');
```

### Paso 3: Probar el Flujo

1. Abre `http://localhost:5173` (debería redirigir a `/welcome`)
2. Haz clic en "Inscribirme" o "Ingresar"
3. Ingresa tu email
4. Verifica el código OTP en tu correo
5. Completa el Triage (5 preguntas)
6. Completa el Onboarding según tu tratamiento
7. Serás redirigido al Dashboard

## 🚧 Pendiente de Implementación

### Alta Prioridad
1. **Dashboard funcional** con módulos dinámicos
2. **Motor de sugerencias** (CRITICAL/WARNING/MOTIVACIONAL)
3. **Sistema de banners** administrables
4. **Panel Admin** completo

### Media Prioridad
5. Catálogo de ejercicios
6. Sistema de recordatorios
7. Logs de mantenimiento
8. Sistema de consultas

### Baja Prioridad
9. Métricas y analytics
10. Export CSV
11. Templates WhatsApp
12. PWA manifest y service worker

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── features/
│   ├── auth/
│   │   ├── WelcomePage.jsx ✅
│   │   ├── LoginPage.jsx ✅
│   │   └── AuthContext.jsx ✅
│   ├── onboarding/
│   │   ├── TriagePage.jsx ✅
│   │   └── OnboardingWizard.jsx ✅
│   ├── dashboard/
│   │   └── HomePage.jsx (pendiente actualizar)
│   └── admin/
│       └── AdminPanel.jsx (pendiente crear)
├── components/
│   └── ui/
│       ├── Button.jsx
│       └── Input.jsx
└── services/
    ├── supabase.js
    └── db.js
```

## 🐛 Troubleshooting

### Error: "could not find the table"
- Asegúrate de haber ejecutado el SQL en Supabase

### Error: "invalid API key"
- Verifica que tu `.env` tenga las credenciales correctas de Supabase

### Página en blanco
- Abre la consola del navegador (F12) para ver errores
- Verifica que `npm run dev` esté corriendo

## 📞 Contacto

WhatsApp: +54 9 351 206-5320
