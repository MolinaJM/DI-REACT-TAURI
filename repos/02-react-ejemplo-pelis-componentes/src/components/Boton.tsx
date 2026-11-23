//JMM - Inicio Nuevo con respecto a 15
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

type Variante = "primary" | "secondary" | "danger" | "exito" | "ghost";
type Tamano = "sm" | "md" | "lg";

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variante?: Variante;
  tamano?: Tamano;
  icono?: ReactNode;
  cargando?: boolean;
}

const VARIANTES: Record<Variante, CSSProperties> = {
  primary: { background: "#2563eb", color: "white", border: "1px solid #2563eb" },
  secondary: { background: "#e5e7eb", color: "#1f2937", border: "1px solid #d1d5db" },
  danger: { background: "#dc2626", color: "white", border: "1px solid #dc2626" },
  exito: { background: "#16a34a", color: "white", border: "1px solid #16a34a" },
  ghost: { background: "transparent", color: "#4b5563", border: "1px solid transparent" },
};

const TAMANOS: Record<Tamano, CSSProperties> = {
  sm: { padding: "0.25rem 0.5rem", fontSize: "0.8rem" },
  md: { padding: "0.4rem 0.8rem", fontSize: "0.95rem" },
  lg: { padding: "0.6rem 1.2rem", fontSize: "1.1rem" },
};

// Botón personalizado: extends ButtonHTMLAttributes — §16.3
export function Boton({children, variante = "primary", tamano = "md", icono, cargando = false, disabled, type = "button", style, ...props}: BotonProps) {
  return (
    <button
      type={type}
      disabled={disabled || cargando}
      style={{
        ...VARIANTES[variante],
        ...TAMANOS[tamano],
        borderRadius: "0.375rem",
        cursor: disabled || cargando ? "not-allowed" : "pointer",
        opacity: disabled || cargando ? 0.6 : 1,
        ...style,
      }}
      {...props}
    >
      {cargando ? "Cargando…" : icono}
      {children}
    </button>
  );
}

//JMM - Fin Nuevo con respecto a 15
