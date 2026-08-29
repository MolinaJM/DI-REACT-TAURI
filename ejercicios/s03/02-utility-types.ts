// ============================================================
// S03 · Ejercicio 2 · Utility Types
// ============================================================
// Completa. Solución: soluciones/s03/02-utility-types.ts

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

// 1) `actualizarConfig` recibe SOLO un subconjunto y lo mezcla con la base
export function actualizarConfig(base: ConfiguracionApp, cambios: Partial<ConfiguracionApp>): ConfiguracionApp {
  return { ...base, ...cambios };
}

// 2) Usuario inmutable: define `UsuarioSoloLectura`
export type UsuarioSoloLectura = unknown; // TODO: Readonly<Usuario>
export const usuarioFijo: UsuarioSoloLectura = { id: 1, nombre: "Ana", email: "a@x.es", password: "1234" };

// 3) Subconjuntos: `UsuarioBase` (sin password) y `Identidad` (solo id y nombre)
export type UsuarioBase = unknown; // TODO: Omit<Usuario, "password">
export type Identidad = unknown; // TODO: Pick<Usuario, "id" | "nombre">

// 4) Registro de puntuaciones: Record<equipo(string), puntos(number)>
export const puntuaciones: Record<string, number> = {};

// 5) Required: haz que una config con campos opcionales sea obligatoria
export interface ConfigParcial {
  host?: string;
  puerto?: number;
}
export type ConfigCompleta = unknown; // TODO: Required<ConfigParcial>
export function ping(c: ConfigCompleta): string {
  return `${c.host}:${c.puerto}`;
}
// 6) Parameters y ReturnType: deriva tipos de una función existente
export function construirMensaje(nombre: string, anios: number): string {
  return `${nombre} tiene ${anios}`;
}
export type ArgsMensaje = unknown; // TODO: Parameters<typeof construirMensaje>
export type TipoRetorno = unknown; // TODO: ReturnType<typeof construirMensaje>

// 7) NonNullable: elimina null | undefined de un tipo unión
export type EntradaTalVez = string | number | null | undefined;
export type EntradaSegura = unknown; // TODO: NonNullable<EntradaTalVez>
export function mostrar(e: EntradaSegura): string {
  return String(e);
}
