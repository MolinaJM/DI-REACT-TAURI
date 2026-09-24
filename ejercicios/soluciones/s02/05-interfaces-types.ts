// ============================================================
// S02 · Ejercicio 5 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

// 1) Interfaz básica
interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

// 2) Propiedad opcional
interface Configuracion {
  url: string;
  puerto?: number;
}

// 3) Extensión
interface Admin extends Usuario {
  rol: "admin" | "editor";
}

// 4) Type aliases
type Punto2D = { x: number; y: number };
type Callback = (error: Error | null) => void;

// 5) Alias de primitivo
type Email = string;

// 6) Objeto tipado
const profe: Usuario = { id: 1, nombre: "Profe", email: "profe@ieshlanz.es" };

// ---- Comprobaciones ----
const admin: Admin = { id: 1, nombre: "Profe", email: "profe@ieshlanz.es", rol: "admin" };
const punto: Punto2D = { x: 1, y: 2 };
const emailOk: Email = "a@b.com";
const conf: Configuracion = { url: "http://localhost" };
assert.equal(profe.nombre, "Profe");
assert.equal(admin.rol, "admin");
assert.deepEqual(punto, { x: 1, y: 2 });
assert.equal(typeof emailOk, "string");
assert.equal(conf.puerto, undefined);
console.log("S02 · Ejercicio 5 · ¡OK!");