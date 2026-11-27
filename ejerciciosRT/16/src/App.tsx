/**
 * App.tsx - Bloque 16: monta los tres ejercicios (dominio: motos)
 */
import { useState } from "react";
import datos from "./datos/motos.json";
import type { Moto } from "./tipos";
import { BarraBotones } from "./ej1";
import { TablaMotos } from "./ej2";
import { MotoDetalle } from "./ej3";

const motos: Moto[] = datos.motos;

export default function App() {
  const [seleccionada, setSeleccionada] = useState<Moto | null>(null);

  return (
    <main>
      <h1>Gestor de motos — Bloque 16</h1>

      <section>
        <BarraBotones />
      </section>

      <section>
        <h2>Tabla de motos</h2>
        <TablaMotos />
      </section>

      <section>
        <h2>Detalle de moto</h2>
        <ul>
          {motos.map(m => (
            <li key={m.id}>
              {m.marca} {m.modelo}{" "}
              <button onClick={() => setSeleccionada(m)}>Ver detalle</button>
            </li>
          ))}
        </ul>
        {seleccionada && (
          <MotoDetalle moto={seleccionada} onCerrar={() => setSeleccionada(null)} />
        )}
      </section>
    </main>
  );
}
