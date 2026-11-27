/**
 * ej2.tsx - Bloque 15, Ejercicio 2: buscador de motos con debounce + filtro derivado
 * + persistencia en localStorage.
 *
 * Lo nuevo: useRef para el timer del debounce (§15.7), filtro derivado con useMemo
 * y localStorage como patrón de persistencia (§15.8): init perezoso + setItem en cada cambio.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { Moto } from "./tipos";
import datos from "./datos/motos.json";

const CLAVE = "busquedaMotos";

// §15.8: init perezoso — la búsqueda persiste entre sesiones
function leerBusqueda(): string {
  return localStorage.getItem(CLAVE) ?? "";
}

export function BuscadorMotos() {
  const [motos] = useState<Moto[]>(datos.motos);
  const [busqueda, setBusqueda] = useState("");
  const [busquedaDebounced, setBusquedaDebounced] = useState<string>(leerBusqueda);
  const timerRef = useRef<number | null>(null);

  // §15.7: debounce con useRef + setTimeout — solo filtra 300 ms tras la última pulsación
  useEffect(() => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setBusquedaDebounced(busqueda), 300);
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [busqueda]);

  // §15.8: persistir en cada cambio
  useEffect(() => {
    localStorage.setItem(CLAVE, busquedaDebounced);
  }, [busquedaDebounced]);

  // Estado derivado: nunca se guarda en useState
  const visibles = useMemo(
    () =>
      motos.filter((m) => {
        const texto = busquedaDebounced.toLowerCase();
        return m.marca.toLowerCase().includes(texto) || m.modelo.toLowerCase().includes(texto);
      }),
    [motos, busquedaDebounced]
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setBusqueda(e.target.value);
  }

  return (
    <div>
      <h2>Buscador de motos</h2>
      <input
        value={busqueda}
        onChange={handleChange}
        placeholder="Buscar por marca o modelo…"
      />
      <p>
        Mostrando {visibles.length} de {motos.length} motos
        {busquedaDebounced !== "" && <> — filtradas por «{busquedaDebounced}»</>}
      </p>
      <ul>
        {visibles.map(m => (
          <li key={m.id}>
            {m.marca} {m.modelo} — {m.anio}
          </li>
        ))}
      </ul>
      {visibles.length === 0 && <p>No hay motos que coincidan con «{busquedaDebounced}».</p>}
    </div>
  );
}
