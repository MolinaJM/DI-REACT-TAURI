<a id="generics-apuntes-opativos"></a>
# 10. Genéricos (apuntes optativos) 📝 🖥️

> [!IMPORTANT]
> Este capítulo es **opativo**. El temario oficial de S02 termina en el capítulo 5 (Control de flujo) y el temario de S03 sigue con los capítulos 7-11. Los genéricos se imparten **como refuerzo**: no entran en los exámenes ni son requisito para React o Tauri, pero quien quiera usar `useState<T>`, `invoke<T>` o componentes genéricos con soltura necesita entenderlos.

- [1. ¿Qué son los genéricos?](#1-qué-son-los-genéricos)
- [2. Conexión con React y Tauri](#2-conexión-con-react-y-tauri)
- [3. keyof, typeof y satisfies](#3-keyof-typeof-y-satisfies)
- [4. Mapped types: `[K in keyof T]`](#4-mapped-types-k-in-keyof-t)
    - [4.1 · Tauri: el dato puede no venir](#41--tauri-el-dato-puede-no-venir)
    - [4.2 · React: el mapa de errores de un formulario](#42--react-el-mapa-de-errores-de-un-formulario)
    - [4.3 · Variantes frecuentes](#43--variantes-frecuentes)
- [5. 📦 Ejemplo completo: `generics-utility-types.ts`](#5--ejemplo-completo-generics-utility-types)
- 🧪 **Ejercicios:** [Utility Types](../../../ejerciciosTS/ejerciciosTS.md#22-utility-types)

---

<a id="1-qué-son-los-genéricos"></a>
## 1. ¿Qué son los genéricos?

Los **genéricos** (`<T>`) permiten escribir funciones y estructuras que funcionan con **cualquier tipo** sin perder la seguridad de tipos. En lugar de fijar un tipo concreto (como `number` o `string`), usamos un **parámetro de tipo** (`T`) que se "despega" en la llamada.

**Analogía:** Piensa en un molde de galletas. El molde es la función genérica: funciona con cualquier masa (tipo), pero cada galleta mantiene su forma (tipo). Sin genéricos, tendrías que escribir un molde distinto para cada tipo de masa.

**Ejemplo básico:**

```typescript
// Sin genéricos: tendrías que escribir una función por cada tipo (number y string)
function primeroNumero(lista: number[]): number | undefined {
  return lista[0];
}
function primeroString(lista: string[]): string | undefined {
  return lista[0];
}

// Con genéricos: una sola función para cualquier tipo
function primero<T>(lista: T[]): T | undefined {
  return lista[0];
}

// TypeScript infiere el tipo automáticamente:
const n = primero([10, 20, 30]);      // T = number, tipo de n: number | undefined
const s = primero(["a", "b"]);        // T = string, tipo de s: string | undefined
const b = primero([true, false]);     // T = boolean, tipo de b: boolean | undefined
```

**¿Por qué son importantes?** Los genéricos son la base de:

- `useState<T>` en React — el tipo del estado se deduce del valor inicial.
- `invoke<T>` en Tauri — el tipo de retorno del comando Rust.
- Componentes reutilizables — `<Tabla<Producto> datos={productos} />`.
- `Array.map<T, U>`, `Array.filter<T>`, `Promise<T>`, etc.







<a id="2-conexión-con-react-y-tauri"></a>
## 2. Conexión con React y Tauri

Los genéricos son el puente entre TypeScript y los patrones de React/Tauri:

```typescript
// React: useState<T> — el tipo se deduce del valor inicial
// const [count, setCount] = useState(0);  // T = number
// const [name, setName] = useState("");  // T = string

// Tauri: invoke<T> — el tipo es el retorno del comando Rust
// interface Post { id: number; titulo: string; }
// const post = await invoke<Post>("obtener_post", { id: 1 });
// post.titulo // TypeScript sabe que es string

// Componentes genéricos en React
// function Tabla<T>(props: { datos: T[]; columnas: Columna<T>[] }) { ... }
// <Tabla<Producto> datos={productos} columnas={columnas} />
```

> [!NOTE]
> En React, cada renderizado de un componente es una llamada a una función. Los closures son la razón por la que Hooks como useState, useEffect o useCallback recuerdan la información entre renderizados. Los genéricos son la razón por la que `useState<T>` mantiene el tipo correcto.

> 🧪 **Ejercicios:** [Funciones en Profundidad](../../../ejerciciosTS/ejerciciosTS.md#9-funciones-en-profundidad) · [Utility Types](../../../ejerciciosTS/ejerciciosTS.md#22-utility-types)

---
<a id="3-keyof-typeof-y-satisfies"></a>
## 3. keyof, typeof y satisfies

Tres operadores de tipos que aparecen en formularios tipados y configuraciones:

- **`keyof`**: obtiene como tipo **la unión de las claves** de un objeto. Sirve para verificar en compilación que una clave es una propiedad real, en vez de escribir un `as` que se lo cree TypeScript:

```typescript
// Las props de un componente no son más que un objeto: "keyof" da sus nombres exactos
interface PeliculaProps {
  titulo: string
  anio: number
  puntuacion: number
}

type ClaveDeProp = keyof PeliculaProps   // "titulo" | "anio" | "puntuacion"

// K extends keyof T obliga a que la clave exista; T[K] conserva el tipo del valor
function valorDeProp<T, K extends keyof T>(props: T, prop: K): T[K] {
  return props[prop];
}

const props: PeliculaProps = { titulo: "Alien", anio: 1979, puntuacion: 9 }
valorDeProp(props, "titulo");     // string
valorDeProp(props, "puntuacion"); // number
// valorDeProp(props, "director"); → error de compilación: no existe en PeliculaProps
```

> 🔜 **Dónde se usa esto.** Esta misma línea `K extends keyof T` es la que sostiene los dos patrones que verás en React:
> - La **tabla genérica** `TablaGenerica<T>`, donde cada columna declara a qué campo apunta: `interface Columna<T> { key: keyof T | string; … }` (`sesion06.md`, S04 · `repos/02-react-componentes/src/components/TablaGenerica.tsx`).
> - El **hook de formulario** `useForm<T>`, cuyo mapa de errores es `Partial<Record<keyof T, string>>`: una clave por cada campo del formulario, todas opcionales (S04 · `repos/02-react-componentes/src/hooks/useForm.ts`, y los utility types en `s04/13_Tipado_en_React_TS.md` §13.5.2).
>
> En ambos casos la clave no se escribe a mano, la **hereda** de `keyof T`. Por eso `keyof` no es un Keyword de adorno: es lo que impide que una columna apunte a un campo inexistente o que un error de validación se registre bajo una clave que no existe en el formulario.

- **`typeof`** (sobre variables, no confundir con el *narrowing* de valores): deduce el tipo de una constante u objeto existente:

```typescript
const configDefecto = { url: "http://localhost", port: 5173, timeout: 5000 };
type Config = typeof configDefecto; // { url: string; port: number; timeout: number }
```

- **`satisfies`**: comprueba que un objeto **cumple** un tipo sin perder la inferencia exacta (a diferencia de anotar con `:`):

```typescript
type Colores = Record<string, [string, string]>;
const paleta = {
  primario: ["#3b82f6", "#1d4ed8"],
  error: ["#ef4444", "#b91c1c"],
} satisfies Colores; // cumple Colores y además el editor sabe cada valor exacto
paleta.primario[0];  // string (no la unión de todos los valores)
```


---
<a id="4-mapped-types-k-in-keyof-t"></a>
## 4. Mapped types: `[K in keyof T]`

`keyof` te da las claves de un tipo; un **mapped type** te deja usarlas para construir otro tipo. La sintaxis `[K in keyof T]` significa: *"para cada clave `K` de `T`, declara una propiedad con este tipo"*. El tipo resultante tiene **exactamente las mismas claves**, solo que con los valores transformados.

Es la pieza que hay detrás de `Partial`, `Required`, `Pick` y `Omit`, y de los mapas de errores de los formularios tipados.

<a id="41--tauri-el-dato-puede-no-venir"></a>
#### 4.1 · Tauri: el dato puede no venir

En Tauri el dato lo produce un comando Rust, y **el compilador no puede saber** si vendrá o no. Si declaras `invoke<Pelicula | null>`, todas las propiedades quedan obligatoriamente `| null` y te curarás en cada uso:

```typescript
import { invoke } from "@tauri-apps/api/core";

// La misma interface que usaremos en S04 con React (s04/13, §13.1)
interface Pelicula {
  id?: number           // en "crear" todavía no existe
  titulo: string
  genero: string
  anio: number
  director: string
  puntuacion: number    // 0-10
}

// Dentro de un useEffect de React (o de cualquier función async):
async function cargar(id: number) {
  const p = await invoke<Pelicula | null>("obtener_pelicula", { id });
  p.titulo;   // error: 'p' puede ser null. TypeScript te obliga a comprobarlo
}
```

Para no repetir la comprobación en cada propiedad, se declara un mapped type que quita el `null` de golpe:

```typescript
// Aplica NonNullable a TODAS las propiedades de una vez.
// OJO: sin `-?` a propósito. NonNullable quita el null, pero deja la
// opcionalidad como estaba (`id?` sigue siendo `id?`); si añadieras `-?`
// estarías exigiendo `id` y Pelicula dejaría de ser asignable a este tipo.
type RespuestaLimpia<T> = {
  [K in keyof T]: NonNullable<T[K]>
};

const POR_DEFECTO: RespuestaLimpia<Pelicula> = {
  id: 0, titulo: "(sin datos)", genero: "", anio: 0, director: "", puntuacion: 0,
};

// `??` es lo que de verdad convierte null en un valor; el mapped type
// solo DOCUMENTA el resultado, no lo produce
async function cargarConDefecto(id: number) {
  const pelicula: RespuestaLimpia<Pelicula> =
    (await invoke<Pelicula | null>("obtener_pelicula", { id })) ?? POR_DEFECTO;

  pelicula.titulo;   // string, sin "!" ni ifs
  return pelicula;
}
```

> ⚠️ **El error clásico:** un mapped type **no convierte nada en runtime**. Si solo anotas `const x: RespuestaLimpia<Pelicula> = valorCrudo` y el valor era `null`, el type checker te cree pero en memoria sigue `null`. El orden correcto es **primero resolver con `??`, después tipar**; al revés, TypeScript te está mintiendo.

<a id="42--react-el-mapa-de-errores-de-un-formulario"></a>
#### 4.2 · React: el mapa de errores de un formulario

Este es el caso que verás en S04, en el hook `useForm<T>`. Cada campo del formulario es una clave, y el error de ese campo es su valor:

```typescript
// reutiliza la interface Pelicula del Caso 1
type Errores<T> = Partial<Record<keyof T, string>>;
// Partial<Record<keyof T, string>> ≡ { [K in keyof T]?: string }

const errores: Errores<Pelicula> = { titulo: "El título es obligatorio" };
errores.titulo;   // string | undefined  -> se puede pintar en el <input>
errores.anio;     // undefined           -> este campo no tiene error
errores.país;     // error de compilación: Pelicula no tiene campo "país"
```

Fíjate en lo que aporta `keyof` aquí: cada error de la validación tiene que estar bajo una **clave real del formulario**. Si el backend devuelve `{"titulo": "...", "campo_inventado": "..."}`, TypeScript ya marca el error en la línea de la validación, sin need de comprobarlo en runtime.

Y como el mapa se indexa con `keyof T`, un `<form>` genérico puede recorrer sus campos con `Object.keys` (s03/09 §9.5) y, si el objeto viene tipado, el compilador sabe que cada `key` es una clave válida.

<a id="43--variantes-frecuentes"></a>
#### 4.3 · Variantes frecuentes

| Sintaxis | Equivale a | Qué hace |
|---|---|---|
| `[K in keyof T]?: T[K]` | `Partial<T>` | todas opcionales |
| `[K in keyof T]-?: T[K]` | `Required<T>` | todas obligatorias |
| `{ [K in K2]: T[K2] }` con `K2 extends keyof T` | `Pick<T, K2>` | solo un subconjunto |
| `[K in keyof T as \`form_${string & K}\`]` | — | **renombra** las claves (lo que hace `Omit` por dentro) |

El último es el más potente: `as` permite cambiar el nombre de la clave. `Omit<T, K>` está implementado exactamente así, descartando las claves de `K` y renombrando el resto a sí mismos.

> 📌 **Resumen del tripwire:** `keyof` (S02, aquí) → mapped types (S02, aquí) → `Partial<Record<keyof T, string>>` y `Columna<T>` (S04, React) → `invoke<T>` (Tauri). Es la misma idea en cuatro sitios: **las claves no se escriben a mano, se derivan del tipo**.

---

<a id="5--ejemplo-completo-generics-utility-types"></a>
## 5. 📦 Ejemplo completo: `generics-utility-types.ts`

Generics (identidad, filtros, constraints, factorías) y utility types (Partial, Pick, Omit, Record, ReturnType…).

```typescript

/**
 * Fichero 19: Generics y Utility Types
 * -------------------------------------------
 * - Generics: identidad, primero, filtros, constraints (extends), factorias
 * - Utility Types: Partial, Pick, Omit, Record, Parameters, ReturnType, NonNullable
 *
 * Son la base del TS aplicado a React y Tauri:
 * - `useState<T>`, `useRef<T>`, `invoke<T>`, componentes genericos `<T>`
 * - `Partial<Pelicula>` (formularios), `Omit` (crear sin id), `Record` (tablas de
 *   correspondencias), `ReturnType` (tipar hooks/resultados)
 */

// ============================================================================
// GENERICS: el tipo se decide en la llamada
// ============================================================================

// Funcion identidad: devuelve el valor con SU tipo, sin cambiarlo
function identidad<T>(valor: T): T {
    return valor;
}

const n = identidad(42);        // number
const s = identidad("hola");    // string
console.log(n, s);

// primero<T>: el primer elemento o undefined (noUncheckedIndexedAccess)
function primero<T>(arr: T[]): T | undefined {
    return arr[0];
}

const primeroN = primero([10, 20, 30]); // number | undefined
const primeroS = primero(["a", "b"]);   // string | undefined
console.log(primeroN, primeroS);

// Filtro generico con predicado tipado
function filtrarPor<T>(arr: T[], predicado: (item: T) => boolean): T[] {
    return arr.filter(predicado);
}

const pares = filtrarPor([1, 2, 3, 4, 5], (x) => x % 2 === 0);
console.log(pares); // [2, 4]

// Constraints con extends: solo tipos que tengan .length
function esLargo<T extends { length: number }>(valor: T, max: number): boolean {
    return valor.length <= max;
}

console.log(esLargo("prueba", 10));    // true (string tiene length)
console.log(esLargo([1, 2, 3], 2));    // false (array tiene length)

// Acceso indexado seguro: K queda restringido a las claves reales de T
// `keyof T` devuelve la unión de las claves del objeto; `K extends keyof T` obliga
// a que la clave indicada exista, y `T[K]` da el tipo exacto de ese valor.
function obtenerValor<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const usuario = { id: 1, nombre: "Ana", email: "ana@mail.com" };
console.log(obtenerValor(usuario, "nombre"));    // "Ana"
// obtenerValor(usuario, "telefono");             // Error: no existe en Usuario

// Factoria generica sin clases: devuelve un objeto con metodos
function crearCola<T>() {
    const items: T[] = [];

    return {
        encolar(item: T): void {
            items.push(item);
        },
        desencolar(): T | undefined {
            return items.shift();
        },
        estaVacia(): boolean {
            return items.length === 0;
        }
    };
}

const cola = crearCola<string>();
cola.encolar("primero");
cola.encolar("segundo");
console.log(cola.desencolar()); // "primero"
console.log(cola.estaVacia());  // false

// ----------------------------------------------------------------------------
// Generics en React / Tauri (patron que veras a diario)
// ----------------------------------------------------------------------------
// ⚠️ ESTOS CONCEPTOS SE DESARROLLARÁN MÁS ADELANTE:
// - `invoke<T>` (Tauri) → sesiones S03+
// - `useState<T>` (React) → sesiones S04+
// - `TablaGenerica<T>` (React) → sesiones S04+
// ----------------------------------------------------------------------------
// type RespuestaApi<T>      -> invoke<T> tipa lo que devuelve el backend Rust
// useState<Todo[]>([])      -> el estado sabe su tipo desde el inicio
// function TablaGenerica<T>(...) -> un componente sirve para cualquier entidad

// ============================================================================
// UTILITY TYPES: tipos derivados sin escribirlos a mano
// ============================================================================
// 🔁 Utility types: se usan en este ejemplo; se practican más adelante:
// - `Partial<T>` → ejerciciosTS/ejerciciosTS.md §22 (Utility Types)
// - `Pick<T, K>` → ejerciciosTS/ejerciciosTS.md §22
// - `Omit<T, K>` → ejerciciosTS/ejerciciosTS.md §22
// - `Record<K, V>` → ejerciciosTS/ejerciciosTS.md §22
// - `Parameters<T>` → ejerciciosTS/ejerciciosTS.md §22
// - `ReturnType<T>` → ejerciciosTS/ejerciciosTS.md §22
// - `NonNullable<T>` → ejerciciosTS/ejerciciosTS.md §22

interface Producto {
    id: number;
    nombre: string;
    precio: number;
    descripcion?: string;
}

const productoBase: Producto = { id: 1, nombre: "Teclado", precio: 49.9 };

// Partial<T>: todas las props opcionales (perfecto para "editar")
const edicion: Partial<Producto> = { precio: 35 }; // solo tocas lo que cambia
console.log({ ...productoBase, ...edicion });

// Pick<T, K>: solo las props indicadas
type ResumenProducto = Pick<Producto, "id" | "nombre">;
const resumen: ResumenProducto = { id: 1, nombre: "Teclado" };
console.log(resumen);

// Omit<T, K>: quita props (en React: crear una Pelicula sin el id auto)
type ProductoSinDescripcion = Omit<Producto, "descripcion">;
const sinDesc: ProductoSinDescripcion = { id: 2, nombre: "Raton", precio: 12 };
console.log(sinDesc);

// Record<K, V>: diccionario con claves conocidas (tablas de correspondencias)
type Semana = Record<"lunes" | "martes" | "miercoles", string>;
const horarios: Semana = {
    lunes: "9:00",
    martes: "10:00",
    miercoles: "11:00"
};
console.log(horarios);

// Parameters<T> y ReturnType<T>: extraer tipos de una funcion
function crearProducto(nombre: string, precio: number): Producto {
    return { id: 0, nombre, precio } as Producto;
}

type ParamsCrear = Parameters<typeof crearProducto>;      // [string, number]
type RetornoCrear = ReturnType<typeof crearProducto>;     // Producto

function usarParams(args: ParamsCrear): Producto {
    return crearProducto(...args);
}
console.log(usarParams(["Monitor", 199]));

// NonNullable<T>: elimina null | undefined de una union
type ValorPosible = string | null | undefined;
type ValorLimpio = NonNullable<ValorPosible>;  // string
const limpio: ValorLimpio = "texto seguro";
console.log(limpio);
```

> ▶ **Cómo probarlo:** copia este bloque a `bancop` como `12_Generics.ts` y ejecuta `npx tsx 12_Generics.ts` (desde `bancop/`; entorno estricto + lib ES2024 ya en su tsconfig).

---

> ▶ **Cómo probarlo:** copia el bloque de §5 a `bancop` como `12_Generics.ts` y ejecuta `npx tsx 12_Generics.ts` (desde `bancop/`; entorno estricto + lib ES2024 ya en su tsconfig).

---

[Volver al índice general](../../../README.md#5-distribución-temporal-y-contenidos-s00s13)
