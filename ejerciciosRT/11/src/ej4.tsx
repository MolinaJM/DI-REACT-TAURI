/**
 * ej4.tsx - Bloque 11, Ejercicio 4: Hermanos con useContext
 */
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ContadorContextType {
  contador: number;
  incrementar: () => void;
}

const ContadorContext = createContext<ContadorContextType | undefined>(undefined);

function ContadorProvider({ children }: { children: ReactNode }) {
  const [contador, setContador] = useState(0);
  const incrementar = () => setContador((c) => c + 1);

  return (
    <ContadorContext.Provider value={{ contador, incrementar }}>
      {children}
    </ContadorContext.Provider>
  );
}

function useContador() {
  const ctx = useContext(ContadorContext);
  if (ctx === undefined) {
    throw new Error("useContador debe usarse dentro de ContadorProvider");
  }
  return ctx;
}

export function ContadorMostrar() {
  const { contador } = useContador();
  return <p>Contador: {contador}</p>;
}

export function ContadorBoton() {
  const { incrementar } = useContador();
  return <button onClick={incrementar}>+1</button>;
}

export function ContadorHermanos() {
  return (
    <ContadorProvider>
      <ContadorMostrar />
      <ContadorBoton />
    </ContadorProvider>
  );
}
