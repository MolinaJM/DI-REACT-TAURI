// ============================================================
// S03 · Ejercicio 6 · Objetos: clonado, opcionalidad y copias inmutables
// ============================================================
// Completa. Solución: soluciones/s03/06-objetos.ts

export interface Usuario {
  id: number;
  nombre: string;
  perfil?: {
    bio?: string;
    ciudad?: string;
  };
}

// 1) Crea una copia superficial con spread y otra profunda con structuredClone
export function copiaSuperficial(u: Usuario): Usuario {
  return u; // TODO: { ...u }
}
export function copiaProfunda(u: Usuario): Usuario {
  return u; // TODO: structuredClone(u)
}

// 2) Merge con escalera de opcionales (sin errores, usa ?. y ??)
export function bioCompleta(u: Usuario): string {
  return ""; // TODO: u.perfil?.bio ?? "Sin bio"
}

// 3) actualizarCiudad devuelve un usuario NUEVO con la ciudad cambiada (sin mutar)
export function actualizarCiudad(u: Usuario, ciudad: string): Usuario {
  return u; // TODO: { ...u, perfil: { ...u.perfil, ciudad } }
}

// 4) Enumerate: Object.keys/values/entries para listar el perfil
export function listarPerfil(u: Usuario): string[] {
  return [];
}

// 5) Inmutable update de arrays de objetos:
//    `marcarEntregado(pedidos, id)` devuelve copia con ese pedido `estado: "entregado"`
export interface Pedido {
  id: number;
  estado: "pendiente" | "entregado";
}
export function marcarEntregado(pedidos: Pedido[], id: number): Pedido[] {
  return [];
}

// 6) Opcionalidad estricta: escribe una versión `sinUndefined` que aplana
//    perfil?.bio ?? "" (sin que `undefined` manche los tipos)
export function bioPlana(u: Usuario): string {
  return "";
}