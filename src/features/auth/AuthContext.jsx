import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../services/supabase';
import { db } from '../../services/db';

const AuthContext = createContext({});

const DEMO_TREATMENTS = { apnea: true, oxygen: true, rehab: true };

// Sesion ficticia del modo demo. Vive fuera del provider para que el bypass y la
// rehidratacion tras un reload construyan exactamente el mismo usuario y perfil.
const buildDemoSession = (role, treatments) => ({
    user: {
        id: 'demo-user-id',
        email: role === 'ADMIN' ? 'admin@demo.com' : 'paciente@demo.com',
        user_metadata: { full_name: 'Usuario Demo' }
    },
    profile: {
        id: 'demo-user-id',
        full_name: role === 'ADMIN' ? 'Administrador Demo' : 'Paciente Demo',
        onboarding_completed: true,
        has_apnea: treatments.apnea,
        has_oxygen: treatments.oxygen,
        has_rehab: treatments.rehab
    }
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async (userId) => {
        try {
            // 1. Try Supabase first (if online)
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (data) {
                setProfile(data);
                // Sync to Dexie
                await db.profile.put(data);
            } else if (error) {
                console.warn('Profile fetch error:', error);
                // Fallback to Dexie
                const localProfile = await db.profile.get(userId);
                if (localProfile) setProfile(localProfile);
            }
        } catch (err) {
            console.error('Auth Profile Error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // El bypass de demo navega a /admin con un reload completo, asi que el estado de
        // React se pierde y lo unico que sobrevive es la marca en localStorage. Rehidratamos
        // aca la sesion ficticia; sin esto /admin quedaba con user=null y el panel reventaba
        // al leer user.email. No hay sesion real de Supabase que escuchar en este modo.
        if (localStorage.getItem('demo_admin') === 'true') {
            const demo = buildDemoSession('ADMIN', DEMO_TREATMENTS);
            setUser(demo.user);
            setProfile(demo.profile);
            setLoading(false);
            return;
        }

        // Safety timeout: Ensure loading is cleared even if Supabase hangs
        const safetyTimeout = setTimeout(() => {
            if (loading) {
                console.warn('Auth loading safety timeout reached. Forcing loading to false.');
                setLoading(false);
            }
        }, 5000);

        // Check active Supabase session
        supabase.auth.getSession()
            .then(({ data: { session } }) => {
                setUser(session?.user ?? null);
                if (session?.user) {
                    fetchProfile(session.user.id);
                } else {
                    setLoading(false);
                }
            })
            .catch(err => {
                console.error('Get Session Error:', err);
                setLoading(false);
            });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            console.log('Auth state changed:', _event);
            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchProfile(session.user.id);
            } else {
                setProfile(null);
                setLoading(false);
            }
        });

        return () => {
            subscription.unsubscribe();
            clearTimeout(safetyTimeout);
        };
    }, []);

    const loginAsDemo = (role = 'USER', treatments = DEMO_TREATMENTS) => {
        const demo = buildDemoSession(role, treatments);

        setUser(demo.user);

        // For demo purposes, we also mock the treatments table data globally
        // This is simplified for the UI to pick up the flags
        setProfile(demo.profile);

        setLoading(false);

        if (role === 'ADMIN') {
            localStorage.setItem('demo_admin', 'true');
        } else {
            localStorage.removeItem('demo_admin');
        }
    };

    const isAdmin = async () => {
        if (localStorage.getItem('demo_admin') === 'true') return true;
        if (!user) return false;
        const { data } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .single();
        return data?.role === 'ADMIN' || data?.role === 'admin';
    };

    return (
        <AuthContext.Provider value={{ user, profile, loading, isAdmin, loginAsDemo }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
