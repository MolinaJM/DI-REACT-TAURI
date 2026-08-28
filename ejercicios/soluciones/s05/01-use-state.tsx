// ============================================================
// S05 · Ejercicio 1 · SOLUCIÓN
// ============================================================
import { useState } from "react";

// 1) Contador con updater (imprescindible para +2 del estado actual)
export function Contador() {
  const [contador, setContador] = useState(0);
  return (
    <div>
      <p>{contador}</p>
      <button onClick={() => setContador((c) => c + 1)}>+1</button>
      <button onClick={() => setContador((c) => c - 1)}>−1</button>
      <button onClick={() => setContador((c) => c + 2)}>doble</button>
      <button onClick={() => setContador(0)}>reiniciar</button>
    </div>
  );
}

// 2) Input controlado
export function TextoEnVivo() {
  const [texto, setTexto] = useState("");
  return (
    <div>
      <input value={texto} onChange={(e) => setTexto(e.target.value)} />
      <p>En vivo: {texto}</p>
    </div>
  );
}

// 3) Alternar
export function Alternar() {
  const [encendido, setEncendido] = useState(false);
  return (
    <label>
      <input type="checkbox" checked={encendido} onChange={() => setEncendido(!encendido)} />
      {encendido ? "ON" : "OFF"}
    </label>
  );
}

// 4) Select controlado
export function Seleccion() {
  const [bebida, setBebida] = useState("cafe");
  return (
    <div>
      <select value={bebida} onChange={(e) => setBebida(e.target.value)}>
        {["cafe", "te", "te-chai"].map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <p>Has elegido: {bebida}</p>
    </div>
  );
}