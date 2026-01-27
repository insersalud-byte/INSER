import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../services/supabase';
import { db } from '../../services/db';

const AuthContext = createContext({});

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

    const loginAsDemo = (role = 'USER', treatments = { apnea: true, oxygen: true, rehab: true }) => {
        const fakeUser = {
            id: 'demo-user-id',
            email: role === 'ADMIN' ? 'admin@demo.com' : 'paciente@demo.com',
            user_metadata: { full_name: 'Usuario Demo' }
        };

        setUser(fakeUser);

        setProfile({
            id: 'demo-user-id',
            full_name: role === 'ADMIN' ? 'Administrador Demo' : 'Paciente Demo',
            onboarding_completed: true,
            has_apnea: treatments.apnea,
            has_oxygen: treatments.oxygen,
            has_rehab: treatments.rehab
        });

        // For demo purposes, we also mock the treatments table data globally
        // This is simplified for the UI to pick up the flags
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
