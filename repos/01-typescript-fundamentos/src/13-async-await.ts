export {};

/**
 * Fichero 13: Programacion Asincrona
 * -------------------------------------------
 * Ejemplos extraidos de Sesion 3 (concepto 15):
 * - Callbacks tipados
 * - Promesas (Promise)
 * - Combinadores: Promise.all, allSettled, race, any
 * - Event Loop: microtareas vs macrotareas
 * - Fetch API con tipos
 * - AbortController para cancelar peticiones
 */

// ============================================================================
// CALLBACKS
// ============================================================================

type Callback = (error: Error | null, resultado?: string) => void;

function operacionAsincrona(exito: boolean, cb: Callback): void {
    setTimeout(() => {
        if (exito) {
            cb(null, "Operacion completada");
        } else {
            cb(new Error("Fallo la operacion"));
        }
    }, 1000);
}

operacionAsincrona(true, (error, resultado) => {
    if (error) {
        console.error(error.message);
    } else {
        console.log(resultado);
    }
});

// ============================================================================
// PROMESAS
// ============================================================================

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ejemplo(): Promise<string> {
    await delay(1000);
    return "Hecho tras 1s";
}

// Combinadores de promesas
const promesas: Promise<number>[] = [Promise.resolve(1), Promise.resolve(2)];

Promise.all(promesas).then((resultados) => console.log(resultados));

Promise.allSettled(promesas).then((resultados) => {
    resultados.forEach((r) => {
        if (r.status === "fulfilled") console.log(r.value);
    });
});

Promise.race(promesas).then((primero) => console.log(primero));

Promise.any(promesas).then((primeroExitoso) => console.log(primeroExitoso));

// ============================================================================
// EVENT LOOP: microtareas vs. macrotareas
// ============================================================================

console.log("1: sincrono");

setTimeout(() => console.log("2: macrotarea (setTimeout)"), 0);

Promise.resolve().then(() => console.log("3: microtarea (Promise)"));

queueMicrotask(() => console.log("4: microtarea (queueMicrotask)"));

console.log("5: sincrono");

// Orden: 1, 5, 3, 4, 2

// ============================================================================
// FETCH API CON TIPOS
// ============================================================================

interface UsuarioAPI {
    id: number;
    name: string;
    email: string;
}

async function obtenerUsuario(id: number): Promise<UsuarioAPI> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    return (await response.json()) as UsuarioAPI;
}

// POST
async function crearUsuario(datos: Omit<UsuarioAPI, "id">): Promise<UsuarioAPI> {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });
    return (await response.json()) as UsuarioAPI;
}

// AbortController para cancelar peticiones
function fetchConTimeout(url: string, ms: number = 5000): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ms);

    return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timeout));
}

// Ejemplo de uso
ejemplo().then((msg) => console.log(msg));
