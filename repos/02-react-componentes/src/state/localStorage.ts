/**
 * localStorage.ts - Persistencia en el navegador
 * Fuente: Sesión 05 - localStorage
 * Operaciones básicas, objetos JSON tipados, sessionStorage
 */

// --- Operaciones básicas ---
// localStorage.setItem("nombre", "Ana");
// const nombre = localStorage.getItem("nombre"); // string | null
// localStorage.removeItem("nombre");
// localStorage.clear();
// console.log(localStorage.length);

// --- Guardar y recuperar objetos (JSON) ---

interface UsuarioPersistente {
  id: string;
  nombre: string;
  ultimoAcceso: string;
}

function guardarUsuario(usuario: UsuarioPersistente): void {
  localStorage.setItem(`usuario:${usuario.id}`, JSON.stringify(usuario));
}

function obtenerUsuario(id: string): UsuarioPersistente | null {
  const raw = localStorage.getItem(`usuario:${id}`);
  if (!raw) return null;
  return JSON.parse(raw) as UsuarioPersistente;
}

// --- sessionStorage ---

function demoSessionStorage(): void {
  sessionStorage.setItem("temporal", "dato efímero");
  console.log(sessionStorage.getItem("temporal"));
}

// --- Gestión de estado con localStorage ---

type FiltroApp = "todas" | "pendientes" | "completadas";

interface TareaPersistente {
  id: string;
  texto: string;
  completada: boolean;
}

interface EstadoApp {
  tareas: TareaPersistente[];
  filtro: FiltroApp;
}

function cargarEstado(): EstadoApp {
  const raw = localStorage.getItem("estado-app");
  if (!raw) return { tareas: [], filtro: "todas" };
  return JSON.parse(raw) as EstadoApp;
}

function guardarEstado(estado: EstadoApp): void {
  localStorage.setItem("estado-app", JSON.stringify(estado));
}

// --- Seguridad: no almacenar tokens sensibles ---
// ❌ Inseguro: localStorage.setItem("token", jwtToken);
// ✅ Seguro: cookie HttpOnly (solo el servidor la lee)

export {
  guardarUsuario,
  obtenerUsuario,
  demoSessionStorage,
  cargarEstado,
  guardarEstado,
};

export type { UsuarioPersistente, EstadoApp, TareaPersistente, FiltroApp };
