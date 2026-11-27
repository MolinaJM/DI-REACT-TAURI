/**
 * ej1.tsx - Bloque 16, Ejercicio 1: Boton que extiende ButtonHTMLAttributes
 */
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

type Variante = "primary" | "secondary" | "danger" | "exito" | "ghost";
type Tamano = "sm" | "md" | "lg";

//JMM Este ejercicio se trata de instanciar el botón personalizado en el dominio de motos
//No cambia nada, salvo el diseño. Los botones no son funcionales (no están asociados a nada)

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variante?: Variante;
  tamano?: Tamano;
  icono?: ReactNode;
  cargando?: boolean;
}

const VARIANTES: Record<Variante, CSSProperties> = {
  primary: { background: "#2563eb", color: "white", border: "1px solid #1d4ed8" },
  secondary: { background: "#e5e7eb", color: "#1f2937", border: "1px solid #d1d5db" },
  danger: { background: "#dc2626", color: "white", border: "1px solid #b91c1c" },
  exito: { background: "#16a34a", color: "white", border: "1px solid #15803d" },
  ghost: { background: "transparent", color: "#4b5563", border: "1px solid transparent" },
};

const TAMANOS: Record<Tamano, CSSProperties> = {
  sm: { padding: "0.375rem 0.75rem", fontSize: "0.875rem" },
  md: { padding: "0.5rem 1rem", fontSize: "1rem" },
  lg: { padding: "0.75rem 1.5rem", fontSize: "1.125rem" },
};

export function Boton({children,variante = "primary",tamano = "md",icono,cargando,disabled,type = "button",style,...props}: BotonProps) {
  return (
    <button
      type={type}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        borderRadius: "0.5rem",
        fontWeight: 500,
        cursor: disabled || cargando ? "not-allowed" : "pointer",
        opacity: disabled || cargando ? 0.5 : 1,
        ...VARIANTES[variante],
        ...TAMANOS[tamano],
        ...style,
      }}
      disabled={disabled || cargando}
      {...props}
    >
      {cargando ? (
        <span
          style={{
            width: "1rem",
            height: "1rem",
            border: "2px solid currentColor",
            borderTopColor: "transparent",
            borderRadius: "50%",
            display: "inline-block",
          }}
        ></span>
      ) : (
        icono
      )}
      {children}
    </button>
  );
}

export function BarraBotones() {
  return (
    <div>
      <h2>Barra de Botones: Botón corporativo</h2>
      <p> 
        <Boton variante="primary">Guardar</Boton>{" "}
        <Boton variante="secondary">Cancelar</Boton>{" "}
        <Boton variante="danger">Borrar</Boton>{" "}
        <Boton variante="ghost">Volver</Boton>
      </p>
      <p>
        <Boton tamano="sm">Pequeño</Boton>{" "}
        <Boton tamano="md">Mediano</Boton>{" "}
        <Boton tamano="lg">Grande</Boton>{" "}
        <Boton cargando={true}>Guardando…(Deshabilitado mediante 'cargando')</Boton>{" "} 
        <Boton disabled>Deshabilitado directamente</Boton>
      </p>
    </div>
  );
}
