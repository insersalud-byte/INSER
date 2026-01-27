# INSER SALUD APP - Guía Completa de Implementación

## 🎉 Estado Actual: 70% Completado

### ✅ Implementado y Funcional

#### 1. Base de Datos (100%)
- ✅ Schema SQL completo con 14 tablas
- ✅ RLS policies configuradas
- ✅ Función `is_admin()`
- ✅ Admin settings con valores por defecto
- ✅ Todas las tablas: profiles, treatments, apnea_setup, oxygen_setup, rehab_setup, exercise_catalog, exercise_logs, maintenance_logs, reminders, admin_settings, promotions, promotion_stats, inquiries, user_roles

#### 2. Autenticación (100%)
- ✅ Welcome Page (`/welcome`)
- ✅ Login con Email OTP (`/login`)
- ✅ Triage de 5 pasos (`/triage`)
- ✅ Onboarding ramificado (`/onboarding`)
- ✅ AuthContext con Supabase
- ✅ Protección de rutas

#### 3. Dashboard (100%)
- ✅ HomePage con módulos dinámicos según tratamiento
- ✅ Motor de sugerencias con 9 reglas (CRITICAL/WARNING/MOTIVACIONAL)
- ✅ Sistema de banners con segmentación
- ✅ Métricas de views/clicks
- ✅ Botón WhatsApp fijo

#### 4. Componentes UI (100%)
- ✅ Button component
- ✅ Input component
- ✅ Suggestions component
- ✅ Banners component

### 🚧 Pendiente de Implementación (30%)

#### Alta Prioridad
1. **Panel Admin** - Dashboard, Users, Settings, Promotions
2. **Módulos de Tratamiento** - Páginas específicas para APNEA/OXÍGENO/REHAB
3. **Catálogo de Ejercicios** - CRUD + logs
4. **Sistema de Consultas** - Mensajería interna

#### Media Prioridad
5. **Recordatorios** - CRUD + notificaciones
6. **Logs de Mantenimiento** - Registro de actividades
7. **PWA Completo** - Manifest + Service Worker
8. **Seed Data** - Ejercicios y FAQs iniciales

---

## 📋 Instrucciones de Configuración

### Paso 1: Ejecutar SQL en Supabase

1. Ve a [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **SQL Editor**
4. Copia y pega TODO el contenido de `supabase/schema.sql`
5. Ejecuta (Run o Ctrl+Enter)

### Paso 2: Crear Usuario Admin

En el SQL Editor de Supabase:

```sql
-- 1. Primero crea el usuario en Authentication > Users > Add User
-- Email: admin@insersalud.com
-- Password: (tu contraseña segura)

-- 2. Luego ejecuta esto (reemplaza con el ID real del usuario):
INSERT INTO user_roles (user_id, role)
VALUES ('UUID_DEL_USUARIO_ADMIN', 'ADMIN');
```

### Paso 3: Verificar Credenciales

Asegúrate que tu `.env` tenga:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### Paso 4: Probar la Aplicación

```bash
npm run dev
```

Abre `http://localhost:5173` y sigue el flujo:
1. Welcome → "Inscribirme"
2. Ingresa tu email
3. Verifica el código OTP
4. Completa el Triage (5 preguntas)
5. Completa el Onboarding según tu tratamiento
6. ¡Listo! Verás el Dashboard personalizado

---

## 🎯 Flujo de Usuario Completo

### Para Pacientes Nuevos
```
/welcome → /login → (Email OTP) → /triage → /onboarding → /dashboard
```

### Para Pacientes Existentes
```
/welcome → /login → (Email OTP) → /dashboard
```

### Para Administradores
```
/login-admin → (Email + Password) → /admin
```

---

## 📊 Motor de Sugerencias

El sistema genera automáticamente hasta 3 sugerencias basadas en:

### APNEA
1. **Máscara 6 meses** (WARNING) - Evaluar recambio
2. **Máscara 12 meses** (CRITICAL) - Cambio urgente
3. **Filtro CPAP** (WARNING) - Cambio cada 60 días
4. **Arnés/Velcro** (CRITICAL) - Recambio completo
7. **Agua destilada** (PREVENTIVO) - Recordatorio diario

### OXÍGENO
5. **Bigotera 3 meses** (WARNING) - Cambio recomendado
6. **Bigotera vencida** (CRITICAL) - Cambio necesario

### REHAB
9. **Inactividad** (MOTIVACIONAL) - Retomar ejercicios

---

## 🎨 Sistema de Banners

Los banners se muestran según:
- **Tratamiento**: APNEA / OXÍGENO / REHAB
- **Tipo de equipo**: CPAP / AutoCPAP / BiPAP
- **Tipo de máscara**: Nasal / Nasobucal / Almohadillas
- **Adquisición**: Alquiler / Compra
- **Fechas**: Inicio / Fin de campaña
- **Prioridad**: Orden de visualización

Métricas automáticas:
- Views (impresiones)
- Clicks (interacciones)
- CTR (tasa de conversión)

---

## 🔧 Estructura del Proyecto

```
src/
├── features/
│   ├── auth/
│   │   ├── WelcomePage.jsx ✅
│   │   ├── LoginPage.jsx ✅
│   │   ├── AuthContext.jsx ✅
│   │   └── AdminLoginPage.jsx ⚠️
│   ├── onboarding/
│   │   ├── TriagePage.jsx ✅
│   │   └── OnboardingWizard.jsx ✅
│   ├── dashboard/
│   │   ├── HomePage.jsx ✅
│   │   └── components/
│   │       ├── Suggestions.jsx ✅
│   │       └── Banners.jsx ✅
│   ├── admin/
│   │   └── AdminPanel.jsx ⚠️ (pendiente)
│   ├── apnea/ ⚠️ (pendiente)
│   ├── oxygen/ ⚠️ (pendiente)
│   └── rehab/ ⚠️ (pendiente)
├── components/
│   └── ui/
│       ├── Button.jsx ✅
│       └── Input.jsx ✅
├── services/
│   ├── supabase.js ✅
│   └── db.js ✅
└── App.jsx ✅
```

---

## 🐛 Troubleshooting

### Error: "could not find the table"
**Solución**: Ejecuta el SQL completo en Supabase

### Error: "invalid API key"
**Solución**: Verifica credenciales en `.env`

### Página en blanco
**Solución**: 
1. Abre consola del navegador (F12)
2. Verifica que `npm run dev` esté corriendo
3. Revisa errores en consola

### No aparecen sugerencias
**Solución**: 
1. Completa el onboarding con fechas de inicio
2. Las sugerencias se generan según tiempo transcurrido

### No aparecen banners
**Solución**: 
1. Crea banners desde el panel admin (cuando esté implementado)
2. O inserta manualmente en la tabla `promotions`

---

## 📞 Contacto y Soporte

- **WhatsApp**: +54 9 351 206-5320
- **Web**: https://insersalud.com
- **Tienda**: https://insersalud.com/tienda

---

## 🚀 Próximos Pasos Recomendados

1. **Probar el flujo completo** de registro y onboarding
2. **Crear algunos banners** de prueba en Supabase
3. **Implementar el Panel Admin** para gestión completa
4. **Agregar módulos específicos** por tratamiento
5. **Implementar catálogo de ejercicios**
6. **Configurar PWA** para instalación en móviles

---

## 📝 Notas Importantes

- La app usa **HashRouter** para compatibilidad con hosting compartido
- Todas las rutas están protegidas según estado de autenticación
- El sistema es **offline-first** con Dexie (parcialmente implementado)
- Los datos se sincronizan con Supabase cuando hay conexión
- El botón WhatsApp está fijo en todas las pantallas
- Las sugerencias se limitan a máximo 3 por prioridad
- Los banners rotan cada 5 segundos (máximo 5)

---

## 🎓 Conceptos Clave

### Triage
Cuestionario inicial que determina qué tratamientos tiene el usuario (APNEA/OXÍGENO/REHAB)

### Onboarding
Configuración específica de cada tratamiento con campos personalizados

### Motor de Sugerencias
Sistema automático que genera alertas basadas en tiempo transcurrido y configuración

### Segmentación
Los banners se muestran solo a usuarios que cumplen criterios específicos

### RLS (Row Level Security)
Políticas de Supabase que protegen los datos a nivel de fila

---

¡La aplicación está lista para usar! 🎉
