"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, User } from "@firebase/auth";
import { auth, provider } from "../lib/firbase";

interface AuthContextType {
    user: User | null;
    login: () => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => setUser(user));
    }, []);

    const login = () => signInWithPopup(auth, provider);
    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);