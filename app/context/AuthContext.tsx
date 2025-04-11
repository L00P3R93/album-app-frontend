"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, User } from "@firebase/auth";
import { auth, provider } from "@/app/lib/firebase";

interface AuthContextType {
    user: User | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => {},
    logout: async () => {},
    loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const login = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    };
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}