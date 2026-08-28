export {};

/**
 * Fichero 19: keyof, typeof y satisfies
 * -------------------------------------------
 * Operadores avanzados de tipos para extraer y validar
 * tipos a partir de valores existentes.
 *
 * Ejemplos extraidos de Sesion 3 (concepto 23):
 * - keyof: extrae las claves de un tipo
 * - typeof: obtiene el tipo de una variable en tiempo de tipo
 * - satisfies (TS 4.9+): valida sin perder tipo inferido
 */

// ========================================
// KEYOF
// ========================================

interface Producto {
    id: number;
    nombre: string;
    precio: number;
}

// keyof extrae las claves de un tipo como union de strings
type ClaveProducto = keyof Producto;
// Equivalente a: "id" | "nombre" | "precio"

// Uso practico: funcion generica que accede a cualquier propiedad
function obtenerValor<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const laptop: Producto = { id: 1, nombre: "Laptop", precio: 999 };
console.log("=== keyof ===");
console.log(obtenerValor(laptop, "nombre"));  // "Laptop"
console.log(obtenerValor(laptop, "precio"));  // 999
// obtenerValor(laptop, "telefono");  // Error: "telefono" no es clave de Producto

// keyof con types
type Estado = "idle" | "loading" | "error" | "success";
type ClavesEstado = keyof Record<Estado, string>;
// Equivalente a: Estado (ya que Record<Estado, string> tiene esas claves)

// ========================================
// TYPEOF (en contexto de tipo)
// ========================================

// typeof en tiempo de ejecucion: devuelve el tipo como string
console.log("\n=== typeof (runtime) ===");
console.log(typeof 42);           // "number"
console.log(typeof "hola");       // "string"
console.log(typeof true);         // "boolean"
console.log(typeof null);         // "object" (bug historico de JS)
console.log(typeof undefined);    // "undefined"

// typeof en contexto de tipo: extrae el tipo de una variable
const configuracion = {
    url: "http://localhost",
    puerto: 3000,
    timeout: 5000
};

type TipoConfig = typeof configuracion;
// Equivalente a: { url: string; puerto: number; timeout: number; }

const configCopy: TipoConfig = {
    url: "http://produccion",
    puerto: 8080,
    timeout: 10000
};
console.log("\n=== typeof (tipo) ===");
console.log("configCopy:", configCopy);

// typeof con as const
const colores = ["rojo", "verde", "azul"] as const;
type Color = typeof colores[number];  // "rojo" | "verde" | "azul"

const colorFavorito: Color = "azul";
console.log("Color favorito:", colorFavorito);

// typeof con funciones
function crearUsuario(nombre: string, edad: number) {
    return { nombre, edad, activo: true };
}

type UsuarioReturn = ReturnType<typeof crearUsuario>;
// Equivalente a: { nombre: string; edad: number; activo: boolean }

// ========================================
// SATISFIES (TS 4.9+)
// ========================================

type ColoresValidos = "rojo" | "verde" | "azul";

// Sin satisfies: pierde informacion de tipo (se infiere como Record<string, string>)
const paleta1: Record<string, ColoresValidos> = {
    primary: "azul"
};
// paleta1.primary.toUpperCase();  // Error: Property 'toUpperCase' does not exist

// Con satisfies: mantiene el tipo inferido y valida la estructura
const paleta2 = {
    primary: "azul",
    secondary: "verde"
} satisfies Record<string, ColoresValidos>;

console.log("\n=== satisfies ===");
console.log(paleta2.primary.toUpperCase());  // "AZUL" (tipado correcto)
console.log(paleta2.secondary.toUpperCase());  // "VERDE"

// Diferencia clave:
// - "as Type" sobreescribe el tipo (pierde informacion)
// - "satisfies Type" valida el tipo (mantiene inferencia)

// Ejemplo con tipos mas complejos
type Tema = {
    nombre: string;
    colores: {
        primario: string;
        secundario: string;
    };
    fontSizes: [number, number, number];
};

const temaOscuro = {
    nombre: "Oscuro",
    colores: {
        primario: "#1e1e1e",
        secundario: "#252526"
    },
    fontSizes: [12, 14, 16]
} satisfies Tema;

// temaOscuro.nombre es string (inferido, no "string" generico)
console.log("Tema:", temaOscuro.nombre);
// temaOscuro.fontSizes es [number, number, number] (tuple, no number[])
console.log("Font sizes:", temaOscuro.fontSizes);

// ========================================
// RESUMEN
// ========================================

console.log("\n=== Resumen ===");
console.log("keyof T      → extrae las claves de T como union de strings");
console.log("typeof x     → (tipo) obtiene el tipo de la variable x");
console.log("x satisfies T → (valor) valida que x cumple T sin perder inferencia");
