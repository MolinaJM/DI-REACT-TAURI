# 13. TypeScript aplicado a React: props, eventos y generics 📝 🖥️

- [13. TypeScript aplicado a React: props, eventos y generics 📝 🖥️](#13-typescript-aplicado-a-react-props-eventos-y-generics-️)
  - [1. El modelo de datos con interfaces](#1-el-modelo-de-datos-con-interfaces)
  - [2. Tipado de props: una interfaz por componente](#2-tipado-de-props-una-interfaz-por-componente)
  - [3. Propiedades opcionales (`?`) y obligatorias](#3-propiedades-opcionales--y-obligatorias)
  - [4. Generics en React: `useState<T>` y `useRef<T>`](#4-generics-en-react-usestatet-y-usereft)
    - [4.1 `useState<Pelicula[]>`](#41-usestatepelicula)
    - [4.2 `useRef<ReturnType<typeof setTimeout>>`](#42-userefreturntypeof-settimeout)
    - [4.3 Componentes genéricos `<T>`](#43-componentes-genéricos-t)
  - [5. Utility types](#5-utility-types)
    - [5.1 `Record<string, string>`: colores por género](#51-recordstring-string-colores-por-género)
    - [5.2 `Partial`, `Pick` y `Omit`](#52-partial-pick-y-omit)
  - [6. Type assertions y conversiones](#6-type-assertions-y-conversiones)
    - [6.1 `as HTMLElement`](#61-as-htmlelement)
    - [6.2 `parseInt` y `parseFloat`](#62-parseint-y-parsefloat)
  - [7. Tipado de eventos de React](#7-tipado-de-eventos-de-react)
    - [7.1 `React.FormEvent`](#71-reactformevent)
    - [7.2 `React.ChangeEvent`](#72-reactchangeevent)
    - [7.3 `React.MouseEvent`](#73-reactmouseevent)
  - [8. `strict` mode: tu red de seguridad](#8-strict-mode-tu-red-de-seguridad)
  - [9. Bibliografía](#9-bibliografía)

Esta unidad completa los conocimientos de TypeScript que faltan para llegar a React con seguridad: tipar las **props** de cada componente, usar **genéricos** con los hooks, aprovechar los **utility types** y tipar los **eventos** de React.

> [!NOTE]
> Todo el ejemplo gira alrededor del proyecto **AppCine**: la interfaz `Pelicula` y sus listados, tablas y formularios.

---

## 1. El modelo de datos con interfaces

En React los datos que fluyen entre componentes se describen con `interface`. Para AppCine definimos la entidad central una sola vez:

```typescript
export interface Pelicula {
  id?: number;            // opcional: en "crear" todavía no existe
  titulo: string;
  genero: string;
  anio: number;
  director: string;
  puntuacion: number;     // 0-10
}
```

> [!IMPORTANT]
> `id?` es opcional porque el id lo asigna la base de datos. En modo **crear** se usa `Omit<Pelicula, "id">`; en modo **editar** todas las propiedades son obligatorias.

---

## 2. Tipado de props: una interfaz por componente

Cada componente declara su propio contrato de entrada. Es un patrón estándar en React + TypeScript que se escribe con `interface` + `Props`:

```tsx
import type { Pelicula } from "./peliculas";

interface PeliculaRowProps {
  pelicula: Pelicula;
  indice: number;
}

export function PeliculaRow({ pelicula, indice }: PeliculaRowProps) {
  return (
    <tr>
      <td>{indice + 1}</td>
      <td>{pelicula.titulo}</td>
      <td>{pelicula.genero}</td>
      <td>{pelicula.anio}</td>
      <td>{pelicula.director}</td>
      <td>{pelicula.puntuacion}</td>
    </tr>
  );
}
```

Regla práctica del curso:

- `interface XProps` para las props de entrada de un componente.
- `interface XState` (o el tipo de `useState`) para su estado.
- `export` el tipo cuando el componente se usa desde otros módulos.

---

## 3. Propiedades opcionales (`?`) y obligatorias

En los formularios tipados, las props opcionales son habituales:

```tsx
interface PeliculaFormProps {
  inicial?: Partial<Pelicula>; // formulario de edición: datos pre-cargados
  modo: "crear" | "editar";
  onGuardar: (datos: Omit<Pelicula, "id">) => void;
  onCancelar: () => void;
}
```

Trucos útiles que vienen de TypeScript:

- `inicial?: Partial<Pelicula>` — permite pasar solo algunos campos.
- `modo: "crear" | "editar"` — unión de literales para decidir el comportamiento del formulario.
- `onGuardar: (datos: Omit<Pelicula, "id">) => void` — funciones como props.

---

## 4. Generics en React: `useState<T>` y `useRef<T>`

Los generics que ya viste en arrays y funciones son la base de los hooks tipados.

### 4.1 `useState<Pelicula[]>`

```tsx
import { useState } from "react";
import type { Pelicula } from "./peliculas";

export function usePeliculas() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [cargando, setCargando] = useState(true);

  return { peliculas, setPeliculas, cargando, setCargando };
}
```

> [!NOTE]
> `useState<Pelicula[]>([])` fija el tipo genérico del estado. Si luego haces `setPeliculas(5)`, TypeScript te lo impide en tiempo de compilación.

### 4.2 `useRef<ReturnType<typeof setTimeout>>`

`setTimeout` devuelve un id. Lo mismo ocurre con `clearTimeout`. El tipo compuesto se escribe con `ReturnType<typeof setTimeout>`:

```tsx
const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

function buscar(texto: string) {
  if (timeoutRef.current !== null) {
    clearTimeout(timeoutRef.current);
  }
  timeoutRef.current = setTimeout(() => {
    // lanzar la búsqueda real
  }, 300);
}
```

Otro clásico: una referencia a un elemento del DOM.

```tsx
const overlayRef = useRef<HTMLDivElement | null>(null);
```

### 4.3 Componentes genéricos `<T>`

Un componente puede ser genérico cuando sirve para varios tipos de entidad:

```tsx
interface Fila<T> {
  item: T;
}

export function Fila<T extends { id?: number; titulo: string }>({ item }: Fila<T>) {
  return <li>{item.titulo}</li>;
}
```

---

## 5. Utility types

TypeScript trae tipos genéricos listos que React usa a diario.

### 5.1 `Record<string, string>`: colores por género

AppCine pinta un badge del color según el género. La tabla de correspondencias se tipa con `Record<string, string>`:

```typescript
export const COLORES_GENERO: Record<string, string> = {
  accion: "#d9534f",
  comedia: "#f0ad4e",
  drama: "#5bc0de",
  terror: "#6f42c1",
  cienciaficcion: "#20c997",
  romantica: "#e83e8c",
};

export function colorDeGenero(genero: string): string {
  return COLORES_GENERO[genero] ?? "#6c757d";
}
```

> [!NOTE]
> `Record<string, string>` garantiza que la clave sea `string` y el valor también. Si accedes con una clave que no existe devuelve `undefined`; por eso el `?? "#6c757d"` (color neutro por defecto).

### 5.2 `Partial`, `Pick` y `Omit`

| Utility type | ¿Qué hace? | Ejemplo |
| --- | --- | --- |
| `Partial<T>` | Todas las props opcionales | `Partial<Pelicula>` para el formulario de edición |
| `Omit<T, K>` | Quita campos | `Omit<Pelicula, "id">` al crear |
| `Pick<T, K>` | Solo los campos indicados | `Pick<Pelicula, "titulo" | "anio">` en un listado |
| `Readonly<T>` | Impide mutación | `Readonly<Pelicula[]>` para no mutar la lista |

---

## 6. Type assertions y conversiones

### 6.1 `as HTMLElement`

Cuando TypeScript no puede deducir el tipo de un valor que tú sí conoces, se usa una *type assertion*:

```typescript
const entrada = document.querySelector("#buscar") as HTMLInputElement;
entrada.value;
```

> [!IMPORTANT]
> Prefiere los genéricos de las APIs del DOM (`querySelector<HTMLInputElement>("#buscar")`) antes que el `as`, porque el genérico también valida el selector en compilación. Usa `as` solo cuando no haya alternativa (o cuando haya que refinarlo en runtime con un *type guard*).

### 6.2 `parseInt` y `parseFloat`

Vienen de **entradas de formulario** (todo texto) y hay que convertirlas antes de guardarlas en una `Pelicula`:

```typescript
const anio = Number.parseInt(cadena, 10);   // base decimal siempre
const puntuacion = Number.parseFloat(cadena);
```

> [!NOTE]
> `Number.parseInt("12", 10)` devuelve `number`. Con `Number.parseInt` (ojo: `Number` delante) en vez del antiguo `parseInt` global se evita que el valor sea tratado como octal en viejos motores.

---

## 7. Tipado de eventos de React

React usa **Synthetic Events**: en TS se tipan con genéricos que indican sobre qué elemento se disparan.

### 7.1 `React.FormEvent`

En el envío de un formulario:

```tsx
import type { FormEvent } from "react";

function guardar(e: FormEvent<HTMLFormElement>) {
  e.preventDefault(); // evita recargar la SPA
  // e.target.value ya está tipado como string
}
```

### 7.2 `React.ChangeEvent`

En inputs controlados:

```tsx
import type { ChangeEvent } from "react";

function onTitulo(e: ChangeEvent<HTMLInputElement>) {
  setTitulo(e.target.value); // string
}
```

### 7.3 `React.MouseEvent`

En botones:

```tsx
import type { MouseEvent } from "react";

function onEditar(e: MouseEvent<HTMLButtonElement>) {
  e.stopPropagation(); // evita que llegue a la fila
  abrirModal(pelicula);
}
```

Tabla resumen típica en un CRUD:

| Evento | Tipo | Uso en AppCine |
| --- | --- | --- |
| submit formulario | `React.FormEvent<HTMLFormElement>` | `guardar()` |
| escribir en input | `React.ChangeEvent<HTMLInputElement>` | `Buscador`, `PeliculaForm` |
| elegir select | `React.ChangeEvent<HTMLSelectElement>` | género, orden |
| click botón | `React.MouseEvent<HTMLButtonElement>` | editar / borrar |

---

## 8. `strict` mode: tu red de seguridad

Todo el repo usa `strict: true`. En React esto significa que:

- `useState(null)` da `null` concreto, no `any`.
- `e.target.value` sobre un elemento tipado es `string` garantizado.
- `RefObject` sin inicializar es `T | null` y hay que comprobarlo con `if (ref.current)`.

```bash
npx tsc --noEmit   # validar tipos sin emitir JS
npm run build      # validar + compilar en Vite
```

---

## 9. Bibliografía

- [TypeScript Handbook: Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [React: Types of events](https://react.dev/reference/react-dom/components/common)
- [TypeScript Handbook: Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

---

[Volver al índice general](../../index.md)