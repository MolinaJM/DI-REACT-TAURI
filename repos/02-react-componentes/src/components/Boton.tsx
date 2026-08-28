/**
 * Boton.tsx - Componente Botón personalizado
 * Fuente: Sesión 07 - Creación de Componentes Personalizados
 * BotonProps extendiendo ButtonHTMLAttributes, variantes, tamaños, loading
 */
import { ButtonHTMLAttributes, ReactNode } from 'react';

type Variante = "primary" | "secondary" | "danger" | "ghost";
type Tamano = "sm" | "md" | "lg";

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variante?: Variante;
    tamano?: Tamano;
    icono?: ReactNode;
    cargando?: boolean;
}

const VARIANTES: Record<Variante, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
};

const TAMANOS: Record<Tamano, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
};

function Boton({ children, variante = "primary", tamano = "md",
    icono, cargando, disabled, className = "", ...props }: BotonProps) {
    return (
        <button
            className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors
                ${VARIANTES[variante]} ${TAMANOS[tamano]}
                ${(disabled || cargando) ? "opacity-50 cursor-not-allowed" : ""}
                ${className}`}
            disabled={disabled || cargando} {...props}>
            {cargando ? (
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            ) : icono}
            {children}
        </button>
    );
}

export default Boton;
