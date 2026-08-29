// ============================================================
// S03 · Ejercicio 7 · Programación asíncrona
// ============================================================
// Completa. Solución: soluciones/s03/07-async.ts

// 1) `esperar(ms)` devuelve una Promise que se resuelve tras ms milisegundos
export function esperar(ms: number): Promise<void> {
  return Promise.resolve();
}

// 2) `cargarDatos` simula una petición y devuelve tras 50ms una lista
export async function cargarDatos(ms: number = 50): Promise<string[]> {
  return [];
}

// 3) `cargarParalelo` lanza dos promesas a la vez con Promise.all
export async function cargarParalelo(): Promise<[number, number]> {
  const a = () => new Promise<number>((res) => res(1));
  const b = () => new Promise<number>((res) => res(2));
  return [0, 0]; // TODO: Promise.all([a(), b()])
}

// 4) `laMasRapida` devuelve cuál de las dos se resuelve antes (Promise.race)
export async function laMasRapida(): Promise<string> {
  return "pendiente";
}

// 5) `conReintentos`: llama a la función `fn` hasta 3 veces si falla
export async function conReintentos(fn: () => Promise<string>, intentos: number = 3): Promise<string> {
  return fn();
}

// 6) `procesarSeguro`: usa try/catch para nunca propagar errores.
//    Devuelve { ok: boolean; datos?: string[]; error?: string }
export async function procesarSeguro(): Promise<{ ok: boolean; datos?: string[]; error?: string }> {
  return { ok: false };
}

// 7) `resultadosParciales`: con Promise.allSettled no rompe aunque alguna falle
export interface TareaSegura {
  id: number;
  estado: "ok" | "error";
}
export async function resultadosParciales(promesas: Promise<string | number>[]): Promise<TareaSegura[]> {
  return []; // TODO: Promise.allSettled y mapear `status`
}

// 8) `primeraQueResuelve`: la primera promesa que se cumpla (Promise.any)
export async function primeraQueResuelve(promesas: Promise<string>[]): Promise<string> {
  return "pendiente"; // TODO: Promise.any
}

// 9) `cargarConTimeout`: cancela con AbortController si tarda demasiado
export async function cargarConTimeout(ms: number, timeoutMs: number): Promise<string> {
  return ""; // TODO: AbortController + setTimeout(abort) + DOMException("AbortError")
}
// 10) S3·10.2 `obtenerUsuario(id)` con fetch contra una API pública y respuesta tipada
export interface UsuarioAPI {
  id: number;
  name: string;
  email: string;
}
export async function obtenerUsuario(id: number): Promise<UsuarioAPI> {
  return { id: 0, name: "", email: "" }; // TODO: fetch(`https://jsonplaceholder.typicode.com/users/${id}`) + await res.json()
}

// 11) S3·10.4 Recrea el orden del Event Loop: sincrónico → microtareas → macrotareas.
//    No cambies las dos primeras líneas. El resultado debe ser ["sincrono", "micro", "macro"].
export async function ordenEventLoop(): Promise<string[]> {
  const orden: string[] = [];
  orden.push("sincrono");
  Promise.resolve().then(() => orden.push("micro")); // microtarea (ya encolada)
  // TODO: encola una macrotarea: setTimeout(() => orden.push("macro"), 0)
  // TODO: await de la macrotarea; después `return orden`
  return orden;
}
