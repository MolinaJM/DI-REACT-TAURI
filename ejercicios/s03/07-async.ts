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