/**
 * CleanCode.ts - Principios de Clean Code en TypeScript
 * Fuente: Sesión 04 - Patrones de Clean Code
 * Nombres significativos, única responsabilidad, inmutabilidad
 */

// --- Nombres significativos ---
// ❌ Malo
export function proc(d: number[]): number {
  return d.filter((x) => x > 0).reduce((a, b) => a + b, 0) / d.length;
}

// ✅ Bueno
function calcularPromedioPositivos(numeros: number[]): number {
  const positivos = numeros.filter((n) => n > 0);
  if (positivos.length === 0) return 0;
  return positivos.reduce((suma, n) => suma + n, 0) / positivos.length;
}

// --- Funciones de una sola responsabilidad ---
// ❌ Malo: hace demasiadas cosas
export function procesarUsuario(datos: unknown): void {
  const usuario = datos as { nombre: string; email: string };
  if (!usuario.nombre || !usuario.email) throw new Error("Datos inválidos");
  fetch("/api/usuarios", { method: "POST", body: JSON.stringify(usuario) });
  localStorage.setItem("ultimoUsuario", JSON.stringify(usuario));
}

// ✅ Bueno: cada función hace una cosa
export function validarUsuario(datos: unknown): asserts datos is { nombre: string; email: string } {
  if (typeof datos !== "object" || !datos) throw new Error("Datos inválidos");
  if (!("nombre" in datos) || !("email" in datos)) throw new Error("Faltan campos");
}

export async function guardarUsuario(usuario: { nombre: string; email: string }): Promise<Response> {
  return fetch("/api/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
}

export function persistirLocalmente(usuario: Record<string, unknown>): void {
  localStorage.setItem("ultimoUsuario", JSON.stringify(usuario));
}

// --- Inmutabilidad ---
// ❌ Mutación
export function agregarTarea(tareas: string[], nueva: string): string[] {
  tareas.push(nueva);
  return tareas;
}

// ✅ Inmutabilidad con spread
function agregarTareaInmutable(tareas: readonly string[], nueva: string): string[] {
  return [...tareas, nueva];
}

// ✅ Inmutabilidad con map/filter/reduce
function actualizarEstado(
  tareas: ReadonlyArray<{ id: number; done: boolean }>,
  id: number
): ReadonlyArray<{ id: number; done: boolean }> {
  return tareas.map((t) => (t.id === id ? { ...t, done: true } : t));
}

// --- Separación de datos, UI y lógica ---
// 📁 datos.ts
type Estado = "pendiente" | "completada";

interface Tarea {
  id: string;
  texto: string;
  estado: Estado;
}

// 📁 logica.ts
function crearTarea(texto: string): Tarea {
  return { id: crypto.randomUUID(), texto: texto.trim(), estado: "pendiente" };
}

function filtrarPorEstado(tareas: Tarea[], estado: Estado): Tarea[] {
  return tareas.filter((t) => t.estado === estado);
}

// 📁 ui.ts
function renderizarTarea(tarea: Tarea): HTMLElement {
  const div = document.createElement("div");
  div.textContent = tarea.texto;
  div.dataset.id = tarea.id;
  return div;
}

export {
  calcularPromedioPositivos,
  agregarTareaInmutable,
  actualizarEstado,
  crearTarea,
  filtrarPorEstado,
  renderizarTarea,
};

export type { Estado, Tarea };
