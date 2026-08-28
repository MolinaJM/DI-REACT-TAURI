// ============================================================
// S03 · Ejercicio 2 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

export interface ConfiguracionApp {
  url: string;
  tema: "claro" | "oscuro";
  puerto: number;
  debug: boolean;
}
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
}

// 1) Partial: actualización parcial
export function actualizarConfig(
  base: ConfiguracionApp,
  cambios: Partial<ConfiguracionApp>
): ConfiguracionApp {
  return { ...base, ...cambios };
}

// 2) Readonly
export type UsuarioSoloLectura = Readonly<Usuario>;
export const usuarioFijo: UsuarioSoloLectura = { id: 1, nombre: "Ana", email: "a@x.es", password: "1234" };

// 3) Omit y Pick
export type UsuarioBase = Omit<Usuario, "password">;
export type Identidad = Pick<Usuario, "id" | "nombre">;

// 4) Record
export const puntuaciones: Record<string, number> = { "equipo-a": 10, "equipo-b": 7 };

// 5) Required
export interface ConfigParcial {
  host?: string;
  puerto?: number;
}
export type ConfigCompleta = Required<ConfigParcial>;
export function ping(c: ConfigCompleta): string {
  return `${c.host}:${c.puerto}`;
}

// ---- Comprobaciones ----
const base: ConfiguracionApp = { url: "http://x", tema: "claro", puerto: 8080, debug: false };
assert.deepEqual(actualizarConfig(base, { debug: true }), { ...base, debug: true });
assert.equal(usuarioFijo.nombre, "Ana"); // readonly: solo compila, protege en tiempo de compilación
const identidad: Identidad = { id: 1, nombre: "Ana" };
assert.equal(identidad.nombre, "Ana");
puntuaciones["equipo-c"] = 5;
assert.equal(puntuaciones["equipo-c"], 5);
assert.equal(ping({ host: "localhost", puerto: 3000 }), "localhost:3000");
console.log("S03 · Ejercicio 2 · ¡OK!");