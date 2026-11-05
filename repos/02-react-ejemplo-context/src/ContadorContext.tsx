import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { ContadorContextType } from "./tipos";

//Se crea el contexto con valor inicial undefined (el Provider lo rellenará)
const ContadorContext = createContext<ContadorContextType | undefined>(undefined);

// El Provider vive en un ancestro común, construye y expone el contexto --> { contador, incrementar }
// children representa a todos los elementos o componentes hijos que están dentro de este proveedor al llamarlo
// ReactNode: un tipo genérico de React que acepta cualquier elemento válido en JSX: texto, etiquetas HTML, otros componentes, etc etc
export function ContadorProvider({ children }: { children: ReactNode }) {
  const [contador, setContador] = useState(0);
  const incrementar = () => setContador((c) => c + 1);

  return (
    <ContadorContext.Provider value={{ contador, incrementar }}>
      {children}
    </ContadorContext.Provider>
  );
}

//Custom Hook: lee el contexto y lanza error si se usa fuera del Provider
export function useContador() {
  const ctx = useContext(ContadorContext);
  if (ctx === undefined) {
    throw new Error("useContador debe usarse dentro de ContadorProvider");
  }
  return ctx;
}
