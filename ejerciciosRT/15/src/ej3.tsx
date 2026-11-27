/**
 * ej3.tsx - Bloque 15, Ejercicio 3: favoritos de motos persistentes con localStorage.
 *
 * Lo nuevo: localStorage como patrón de persistencia (§15.8) — JSON.parse/stringify,
 * inicializar el estado de forma perezosa (lazy) y guardar en cada cambio.
 */
import { useState } from "react";
import type { Moto } from "./tipos";
import datos from "./datos/motos.json";

const CLAVE = "motos-favoritos";

function cargarFavoritos(): number[] {
  const bruto = localStorage.getItem(CLAVE);
  if (!bruto) return [];
  return JSON.parse(bruto) as number[];
}

function guardarFavoritos(ids: number[]): void {
  localStorage.setItem(CLAVE, JSON.stringify(ids));
}

export function FavoritosMotos() {
  const [favoritos, setFavoritos] = useState<number[]>(cargarFavoritos);

  function alternar(id: number): void {
    const nuevos = favoritos.includes(id)
      ? favoritos.filter(f => f !== id)
      : [...favoritos, id];
    setFavoritos(nuevos);
    guardarFavoritos(nuevos);
  }

  return (
    <div>
      <h2>Mis motos favoritas</h2>
      <ul>
        {datos.motos.map((m: Moto) => (
          <li key={m.id}>
            <button onClick={() => alternar(m.id)}>
              {favoritos.includes(m.id) ? "❤" : "♡"} {m.marca} {m.modelo}
            </button>
          </li>
        ))}
      </ul>
      <p>{favoritos.length} favoritas (recarga la página: se conservan)</p>
    </div>
  );
}
