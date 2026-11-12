/**
 * ej4.tsx - Bloque 11, Ejercicio 4: Selector de tema con useContext (3 hermanos, 1 variable)
 */
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type Tema = "claro"|"oscuro";

interface TemaContextType {
  tema: Tema;
  alternar: () => void;
  reset: () => void;
}

const TemaContext = createContext<TemaContextType | undefined>(undefined);

function TemaProvider({ children }: { children: ReactNode }) {
  //Instanciación del contexto
  const [tema, setTema] = useState<Tema>("claro");
  const alternar = () => setTema((t) => (t === "claro" ? "oscuro" : "claro"));
  const reset = () => setTema("claro");

  return (
    //Devolución del Provider
    <TemaContext.Provider value={{ tema, alternar, reset }}>
      {children}
    </TemaContext.Provider>
  );
}

//Esto podríamos haberlo llamado useContext() de forma genérica.
function useTema() {
  const ctx = useContext(TemaContext);
  if (ctx === undefined) {
    throw new Error("useTema debe usarse dentro de TemaProvider");
  }
  return ctx;
}

export function TemaMostrar() {
  const { tema } = useTema();
  return <p>Tema actual: {tema}</p>;
}

export function TemaAlternar() {
  const { alternar } = useTema();
  return <button onClick={alternar}>Cambiar tema</button>;
}

export function TemaReset() {
  const { reset } = useTema();
  return <button onClick={reset}>Restablecer</button>;
}

export function TemaHermanos() {
  return (
    <TemaProvider>
      <TemaMostrar />
      <TemaAlternar />
      <TemaReset />
    </TemaProvider>
  );
}
