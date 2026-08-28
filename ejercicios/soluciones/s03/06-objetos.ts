// ============================================================
// S03 · Ejercicio 6 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

export interface Usuario {
  id: number;
  nombre: string;
  perfil?: {
    bio?: string;
    ciudad?: string;
  };
}

// 1) Copias superficial y profunda
export function copiaSuperficial(u: Usuario): Usuario {
  return { ...u };
}
export function copiaProfunda(u: Usuario): Usuario {
  return structuredClone(u);
}

// 2) Opcionales seguros
export function bioCompleta(u: Usuario): string {
  return u.perfil?.bio ?? "Sin bio";
}

// 3) Actualización inmutable
export function actualizarCiudad(u: Usuario, ciudad: string): Usuario {
  return { ...u, perfil: { ...u.perfil, ciudad } };
}

// 4) Enumeración
export function listarPerfil(u: Usuario): string[] {
  return Object.entries(u.perfil ?? {}).map(([clave, valor]) => `${clave}: ${valor}`);
}

// 5) Update inmutable de array
export interface Pedido {
  id: number;
  estado: "pendiente" | "entregado";
}
export function marcarEntregado(pedidos: Pedido[], id: number): Pedido[] {
  return pedidos.map((p) => (p.id === id ? { ...p, estado: "entregado" } : p));
}

// 6) Bio plana
export function bioPlana(u: Usuario): string {
  return u.perfil?.bio ?? "";
}

// ---- Comprobaciones ----
const u: Usuario = { id: 1, nombre: "Ana", perfil: { bio: "Hola", ciudad: "Granada" } };
assert.deepEqual(copiaSuperficial(u), u);
assert.deepEqual(copiaProfunda(u), u);
assert.equal(bioCompleta(u), "Hola");
assert.equal(bioCompleta({ id: 2, nombre: "Lu" }), "Sin bio");

const cambiada = actualizarCiudad(u, "Almería");
assert.equal(cambiada.perfil?.ciudad, "Almería");
assert.equal(u.perfil?.ciudad, "Granada"); // el original no cambió

assert.deepEqual(listarPerfil(u), ["bio: Hola", "ciudad: Granada"]);

const pedidos: Pedido[] = [{ id: 1, estado: "pendiente" }, { id: 2, estado: "pendiente" }];
const nuevos = marcarEntregado(pedidos, 2);
assert.equal(nuevos[1]?.estado, "entregado");
assert.equal(pedidos[1]?.estado, "pendiente");

assert.equal(bioPlana(u), "Hola");
assert.equal(bioPlana({ id: 2, nombre: "Lu" }), "");
console.log("S03 · Ejercicio 6 · ¡OK!");