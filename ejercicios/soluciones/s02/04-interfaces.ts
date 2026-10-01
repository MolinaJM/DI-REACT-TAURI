// ============================================================
// S02 · Ejercicio 2 · Interfaces — SOLUCIÓN
// ============================================================
// Catálogo: sesiones/EjerciciosPropuestos/ejerciciosTS.md · Bloque 4 · Interfaces
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


// 4) Objeto tipado
const profe: Usuario = { id: 1, nombre: "Profe", email: "profe@ieshlanz.es" };


// ---- Comprobaciones ----
const admin: Admin = { id: 1, nombre: "Profe", email: "profe@ieshlanz.es", rol: "admin" };
const conf: Configuracion = { url: "http://localhost" };
assert.equal(profe.nombre, "Profe");
assert.equal(admin.rol, "admin");
assert.equal(conf.puerto, undefined);
console.log("S02 · Ejercicio 4 · ¡OK!");
