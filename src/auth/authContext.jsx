

import React, {
    createContext,
    useContext,
    useMemo,
    useState
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: !!user,
            login: async (payload = {}) => {
                setUser({ id: "local-user", ...payload });
                return { ok: true };
            },
            logout: async () => {
                setUser(null);
                return { ok: true };
            }
        }),
        [user]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return ctx;

