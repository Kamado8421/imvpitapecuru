'use client';

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserType } from "@/app/api/server/types/database-tables.type";


type FetchOptions = {
    force?: boolean;
};


type AuthContextType = {
    user: UserType | null;
    fetchUserData: (options?: FetchOptions) => Promise<boolean>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<UserType | null>(null);
    const router = useRouter();

    async function fetchUserData(options?: FetchOptions) {

        if (user && !options?.force) {
            return true;
        }

        try {

            const res = await fetch("/api/auth/me", {
                method: 'POST',
                credentials: "include"
            });

            if (res.status === 401) {

                toast.warning("Sua sessão expirou. Faça login novamente.");

                await logout();
                return false
            }

            if (!res.ok) {
                throw new Error("Erro ao buscar usuário");
            }

            const data = await res.json();

            setUser(data.user);

            return true

        } catch (error) {
            console.error("Erro ao buscar usuário", error);
            return false

        }

    }

    async function logout() {
        await fetch("/api/auth/logout", {
            method: "POST",
        });

        setUser(null);
        router.push("/login");
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                fetchUserData,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }

    return context;
}