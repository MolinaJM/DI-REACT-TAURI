export {};

/**
 * Fichero 05: Interfaces y Type Aliases
 * -------------------------------------------
 * - Interfaces (basica, opcionales, readonly, index, extends, merging)
 * - Type Aliases (primitivos, objetos, funciones, tuplas, genericos)
 * - Comparacion Interface vs Type
 */

// ============================================================================
// INTERFACES
// ============================================================================

// Interface basica
interface Usuario {
    id: number;
    nombre: string;
    email: string;
}

// Propiedades opcionales (?)
interface Configuracion {
    url: string;
    puerto?: number;
}

// Propiedades de solo lectura (readonly)
interface Punto {
    readonly x: number;
    readonly y: number;
}

// Index signature
interface Diccionario {
    [clave: string]: string;
}

// Interface con metodos
interface Reproducible {
    titulo: string;
    reproducir(): void;
    obtenerInfo(): string;
}

// Extension de interfaces (extends)
interface Animal { nombre: string; }
interface Perro extends Animal {
    raza: string;
    ladrar(): void;
}

// Herencia multiple
interface Volador { volar(): void; }
interface Nadador { nadar(): void; }
interface Pato extends Volador, Nadador {
    nombre: string;
}

// Declaration merging
interface Documento { titulo: string; }
interface Documento { contenido: string; }
// Se fusionan: { titulo: string; contenido: string; }

// ============================================================================
// TYPE ALIASES
// ============================================================================

// Type para primitivos
type ID = string | number;
type Email = string;

// Type para objetos
type Punto2D = { x: number; y: number };

// Type para funciones
type Callback = (error: Error | null, resultado?: string) => void;

// Type para tuplas
type Par = [string, number];

// Type con genericos
type RespuestaAPI<T> = {
    datos: T;
    status: number;
    mensaje: string;
};

// ============================================================================
// COMPARACION: Interface vs Type
// ============================================================================
// Interface: extends, declaration merging, mejor rendimiento
// Type: uniones, primitivos, tuplas, mapped types
//
// | Caracteristica       | Interface | Type |
// |---------------------|-----------|------|
// | Extension           | extends   | &    |
// | Declaration merging | Si        | No   |
// | Uniones / Primitivos| No        | Si   |
// | Tuplas / Mapped     | No        | Si   |

// Ejemplo de uso
const punto: Punto = { x: 10, y: 20 };
console.log(punto.x, punto.y);

const config: Configuracion = { url: "http://localhost" };
console.log(config.url, config.puerto);

type UsuarioResp = RespuestaAPI<{ id: number; nombre: string }>;
const resp: UsuarioResp = {
    datos: { id: 1, nombre: "Ana" },
    status: 200,
    mensaje: "OK"
};
console.log(resp);
