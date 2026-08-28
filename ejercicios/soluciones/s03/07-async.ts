// ============================================================
// S03 · Ejercicio 7 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

// 1) Delay
export function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 2) Datos simulados
export async function cargarDatos(ms: number = 50): Promise<string[]> {
  await esperar(ms);
  return ["type", "react", "tauri"];
}

// 3) En paralelo
export async function cargarParalelo(): Promise<[number, number]> {
  const a = () => new Promise<number>((res) => res(1));
  const b = () => new Promise<number>((res) => res(2));
  return Promise.all([a(), b()]);
}

// 4) Carrera
export async function laMasRapida(): Promise<string> {
  const lenta = esperar(100).then(() => "lenta");
  const rapida = esperar(20).then(() => "rapida");
  return Promise.race([lenta, rapida]);
}

// 5) Reintentos
export async function conReintentos(
  fn: () => Promise<string>,
  intentos: number = 3
): Promise<string> {
  let ultimoError: unknown;
  for (let i = 0; i < intentos; i++) {
    try {
      return await fn();
    } catch (error) {
      ultimoError = error;
    }
  }
  throw new Error(`Fallo tras ${intentos} intentos: ${String(ultimoError)}`);
}

// 6) try/catch
export async function procesarSeguro(): Promise<{ ok: boolean; datos?: string[]; error?: string }> {
  try {
    const datos = await cargarDatos();
    return { ok: true, datos };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "error desconocido" };
  }
}

// ---- Comprobaciones ----
const inicio = Date.now();
await esperar(30);
assert.ok(Date.now() - inicio >= 25);

assert.deepEqual(await cargarDatos(10), ["type", "react", "tauri"]);
assert.deepEqual(await cargarParalelo(), [1, 2]);
assert.equal(await laMasRapida(), "rapida");

let llamadas = 0;
const fallon = async () => {
  llamadas += 1;
  if (llamadas < 3) throw new Error("aún no");
  return "listo";
};
assert.equal(await conReintentos(fallon), "listo");
assert.equal(llamadas, 3);

const resultado = await procesarSeguro();
assert.equal(resultado.ok, true);
assert.deepEqual(resultado.datos, ["type", "react", "tauri"]);
console.log("S03 · Ejercicio 7 · ¡OK!");