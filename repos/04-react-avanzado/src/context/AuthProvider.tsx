// store/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface Usuario {
    id: number;
    nombre: string;
    email: string;
    rol: "admin" | "usuario";
}

interface AuthContextType {
    usuario: Usuario | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    esAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const login = async (email: string, _password: string) => {
        const user: Usuario = {
            id: 1, nombre: "Admin", email,
            rol: email.includes("admin") ? "admin" : "usuario"
        };
        setUsuario(user);
        localStorage.setItem("usuario", JSON.stringify(user));
    };

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem("usuario");
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout, esAdmin: usuario?.rol === "admin" }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
