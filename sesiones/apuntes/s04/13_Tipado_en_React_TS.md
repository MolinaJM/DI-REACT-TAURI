<a id="13-typescript-aplicado-a-react-props-eventos-y-generics"></a>
# 13. TypeScript aplicado a React: props, eventos y generics 📝 🖥️

- [13. TypeScript aplicado a React: props, eventos y generics 📝 🖥️](#13-typescript-aplicado-a-react-props-eventos-y-generics)
  - [13.1. El modelo de datos con interfaces](#131-el-modelo-de-datos-con-interfaces)
  - [13.2. Tipado de props: una interfaz por componente](#132-tipado-de-props-una-interfaz-por-componente)
  - [13.3. Utility types](#133-utility-types)
    - [13.3.1 `Record<string, string>`: colores por género](#1331-recordstring-string-colores-por-género)
    - [13.3.2 `Partial`, `Pick` y `Omit`](#1332-partial-pick-y-omit)
  - [13.4. Propiedades opcionales (`?`) y obligatorias](#134-propiedades-opcionales-y-obligatorias)
  - [13.5. Generics en React: `useState<T>`](#135-generics-en-react-usestate)
    - [13.5.1 `useState<Pelicula[]>`](#1351-usestatepelicula)
    - [13.5.2 Componentes genéricos `<T>`](#1352-componentes-genéricos)
  - [13.6. Type assertions y conversiones](#136-type-assertions-y-conversiones)
    - [13.6.1 `as HTMLElement`](#1361-as-htmlelement)
    - [13.6.2 `parseInt` y `parseFloat`](#1362-parseint-y-parsefloat)
  - [13.7. Tipado de eventos de React](#137-tipado-de-eventos-de-react)
    - [13.7.1 `SubmitEvent` (y `FormEvent`, deprecated)](#1371-submitevent-y-formevent-deprecated)
    - [13.7.2 `React.ChangeEvent`](#1372-reactchangeevent)
    - [13.7.3 `React.MouseEvent`](#1373-reactmouseevent)
  - [13.8. La app de películas completa](#138-la-app-de-películas-completa)
  - [13.9. `strict` mode: tu red de seguridad](#139-strict-mode-tu-red-de-seguridad)
  - [13.10. Tipos de elemento DOM más comunes](#1310-tipos-de-elemento-dom-más-comunes)
  - [13.11. Hoja de patrones: reconstruir un CRUD en cualquier dominio](#1311-hoja-de-patrones-reconstruir-un-crud-en-cualquier-dominio)

Esta unidad completa los conocimientos de TypeScript que faltan para llegar a React con seguridad: tipar las **props** de cada componente, usar **genéricos** con los hooks, aprovechar los **utility types** (sobre todo para derivar tipos en formularios y mapeos) y tipar los **eventos** de React.

El objetivo final, que se complementa con los apuntes 15 y 16 será aprender un **PATRÓN DE DISEÑO**: Una SPA con un CRUD básico.

 🧱 Todo el ejemplo gira alrededor de un hipotético proyecto **AppCine**: la interfaz `Pelicula` y sus listados, tablas y formularios.
 Estos apuntes no son una colección de ejemplos sueltos. Partimos de la tabla de películas, apartado a apartado, le vamos añadiendo capas (colores, formulario, estado, eventos…) hasta terminar con una app de películas completa en §13.8. Cada apartado incluye un bloque **🔧 Lo añadimos al ejemplo** con el trozo exacto que hay que copiar y pegar.
>
> ℹ️ **Versión básica, luego ampliable.** La app que se construye aquí es la versión **básica** del CRUD con formulario: funciona **en memoria** (sin servidor, sin `useEffect`, sin modal y sin buscador). La progresión continúa en los apuntes siguientes: en el **apunte 15** se amplía con **backend real** — cliente `api` con `fetch`, carga con `useEffect` y estados de carga/error, formulario dentro de un `Modal` y debounce en la búsqueda — y en el **apunte 16** se lleva hasta la **versión final** reconstruyéndola con **componentes personalizados**: `Buscador`, `PeliculaTable`, `Boton`, `Modal`, `Spinner` y `TablaGenerica<T>`. En el arranque de cada uno de esos apuntes hay una tabla que detalla exactamente qué se añade, qué se sustituye y qué se mantiene.
>
> 📝 **El examen usará otro dominio** (libros, tareas, alumnos…): no copies el código de `Pelicula`, aplica los **patrones** de §13.11 al nuevo dominio.

| Sesión | Versión de la app | Repo |
|---|---|---|
| 13 | Básica: CRUD + formulario **en memoria** (sin búsqueda). Sin Buscador (por simplificar, aunque en ejercicios anteriores ya se haya resuelto). No se comprueban campos. | [`repos/02-react-ejemplo-pelis`](../../../repos/02-react-ejemplo-pelis/) |
| 15 | Ampliada: backend real (`fetch`, `useEffect`, `Modal`, debounce) | [`repos/02-react-ejemplo-pelis-api`](../../../repos/02-react-ejemplo-pelis-api/) |
| 16 | Final: componentes personalizados (`Buscador`, `PeliculaTable`, `Boton`, `Modal`, `Spinner`, `TablaGenerica<T>`) | [`repos/02-react-ejemplo-pelis-componentes`](../../../repos/02-react-ejemplo-pelis-componentes/) |

Lanzamos `proyecto 02-react-ejemplo-pelis` con `npm run dev` y vamos referenciando partes aquí:

Para no perdernos, vamos a seguir un guión:
- Definimos Tipo "Película"
- "Proto Fila" (Cómo se plantearía una fila "Película")
- "Proto Padre"
- Fila definitiva (PeliculaRow.tsx)
- Funciones Auxiliares (Utility Types )
- "Proto Formulario"
- Aserciones y conversiones (texto-->núm)
- Tipado de Eventos
--> APP COMPLETA (se ha de ver desde el componente más interno (Fila/Form) hacia arriba(App)) 
(NOTA:cualquier etiqueta HTML 5 la podemos consultar en Zeal)

PRIMERO VEMOS LOS APUNTES Y LUEGO, VEMOS EL PROYECTO FUNCIONANDO (y ya, analizamos todo junto)

---

## 13.1. El modelo de datos con interfaces

Modelamos Pelicula para usarla en toda la APP:

```typescript
//tipos.ts
export interface Pelicula {
  id: number; // lo asigna la app (Date.now()) o la base de datos
  titulo: string;
  genero: string;
  anio: number;
  director: string;
  puntuacion: number;// 0-10
}
```

> [!IMPORTANT]
> `id` es obligatorio: toda película guardada lo tiene, asignado por la app (`Date.now()`) o por la base de datos. Lo que todavía no existe es el id **al crear**: para eso, como veremos más adelante, se usa `Omit<Pelicula, "id">` (`NuevaPelicula`); en modo **editar** todas las propiedades son obligatorias.

---

## 13.2. Tipado de props: una interfaz por componente

Cada componente declara su propio contrato de entrada. Es un patrón estándar en React + TypeScript que se escribe con `interface` + `Props`:

> 💡 **¿Cómo haríamos para...?** que una fila de película reciba exactamente la `Pelicula` y su índice desde la tabla que la renderiza, sin permitir que le pasen otra cosa?

```tsx
//PeliculaRow.tsx

import type { Pelicula } from "./tipos.ts";

interface PeliculaRowProps {
  pelicula: Pelicula;
  indice: number;
  //Está incompleto!!! Seguimos más abajo
}

//Componente PeliculaRow
export function PeliculaRow({ pelicula, indice }: PeliculaRowProps) {
  //map pasa los índices desde el padre, empezando por el 0.
  //El "indice+1" es importante para que la peli 0 empiece por 1 en la tabla 
  //pero no tiene NADA que ver con el id interno de cada peli
  return (
    <tr>
      <td>{indice + 1}</td>
      <td>{pelicula.titulo}</td>
      <td>{pelicula.genero}</td>
      <td>{pelicula.anio}</td>
      <td>{pelicula.director}</td>
      <td>{pelicula.puntuacion}</td>
    </tr>
    // Está incompleto!!! Seguimos más abajo
  );
}
```

Y así se llama desde `App` para renderizar la tabla:

```tsx
import { PeliculaRow } from "./components/PeliculaRow";
import type { Pelicula } from "./components/tipos.ts";

function App() {
  const pelis: Pelicula[] = [{ id: 1, titulo: "El Padrino", genero: "Drama", anio: 1972, director: "Coppola", puntuacion: 9.2, }]
  //Ponemos un estilo mínimo a la tabla en etiqueta <table>. En la nota inferior se explica el "{{}}"
  return (
    <div>
      <table style={{ width: "50%", border: "1px solid black", borderCollapse: "collapse" }}>
        {
          pelis.map((pelicula, indice) => (
            <PeliculaRow
              key={pelicula.id}
              pelicula={pelicula} indice={indice} />
          ))
        }
      </table >
    </div >
  );
}

export default App;
```
> [!NOTE]
> En React, la prop style recibe un objeto de JavaScript (escrito en formato camelCase). Se usan dobles llaves `{{ }}` porque la primera llave { indica a JSX que comienza una expresión de código JavaScript/TypeScript, y la segunda llave { define el objeto literal que contiene las propiedades de estilo: `({ color: "red" })`.

> 🔧 **Lo añadimos al ejemplo** — en `PeliculaRow.tsx`
> Además, si queremos EDITAR/BORRAR necesitamos que la fila reciba las callbacks `onEditar`/`onBorrar` (por `id`) y los botones de la última celda.
```tsx
interface PeliculaRowProps {
  pelicula: Pelicula;
  indice: number;
  onEditar: (id: number) => void;
  onBorrar: (id: number) => void;
}

export function PeliculaRow({ pelicula, indice, onEditar, onBorrar }: PeliculaRowProps) {
  // ...celdas de título, género, año...
  return (
    <tr>
      {/* ... */}
      <td>
        <button onClick={() => onEditar(pelicula.id)}>Editar</button>{" "}
        <button onClick={() => onBorrar(pelicula.id)}>Borrar</button>
      </td>
    </tr>
  );
}
```

> [!NOTE]
> Como `id` es obligatorio en `Pelicula`, no hay que estrechar nada: `pelicula.id` es directamente un `number`. El narrowing aparecerá con las propiedades **opcionales**, como la `inicial?` del formulario (§13.4).
---
## 13.3. Utility types

TypeScript trae tipos genéricos listos que React usa a diario.

### 13.3.1 `Record<string, string>`: colores por género

AppCine pinta un *badge* (insignia/distintivo/etiqueta) del color según el género. La tabla de correspondencias se tipa con `Record<string, string>`:

> 💡 **¿Cómo haríamos para...?** asignar un color distinto a cada género de película, y devolver un color neutro si el género no está en la lista?

```typescript
//colorGenero.ts
export const COLORES_GENERO: Record<string, string> = {
  acción: "#d9534f",
  comedia: "#f0ad4e",
  drama: "#5bc0de",
  terror: "#6f42c1",
  "ciencia-ficción": "#20c997",
  romántica: "#e83e8c",
};

//Un getter de colores
export function colorDeGenero(genero: string): string {
  return COLORES_GENERO[genero.toLowerCase()] ?? "#6c757d"; //Valor por defecto 
}
```

> [!NOTE]
> `Record<string, string>` garantiza que la clave sea `string` y el valor también. Si accedes con una clave que no existe devuelve `undefined`; por eso el `?? "#6c757d"` (color neutro por defecto).

> 🔧 **Lo añadimos al ejemplo** — en `PeliculaRow.tsx`, la celda de género pasa a tener color:
>
> 📦 **Código en:** [`src/components/PeliculaRow.tsx`](../../../repos/02-react-ejemplo-pelis/src/components/PeliculaRow.tsx) (celda de género con `colorDeGenero()`) y [`src/colorGenero.ts`](../../../repos/02-react-ejemplo-pelis/src/colorGenero.ts) (`Record<string, string>`).

```tsx
import { colorDeGenero } from "./colorGenero.ts";

// dentro de PeliculaRow, la celda de género:
<td style={{ color: colorDeGenero(pelicula.genero.toLowerCase()) }}>{pelicula.genero}</td>
```

> Ojo: `.toLowerCase()` es obligatorio — las claves de `COLORES_GENERO` van en minúscula (`drama`) pero el dato es `"Drama"`; sin eso siempre cae al color neutro.

### 13.3.2 `Partial`, `Pick` y `Omit`

No perder de vista algo SUPER IMPORTANTE: TypeScript solo define REGLAS para el editor, pero luego JavaScript sigue usando los datos que tiene en memoria. Ya utilizamos ampliaciones de tipos con `&`.

Los Utility Types `Partial`, `Pick` y `Omit` redefinen tipos a partir de "partes" de un tipo base. Veamos ejemplos:
| Utility type | ¿Qué hace? | Ejemplo |
| --- | --- | --- |
| `Partial<T>` | "Convierte" todas las propiedades en opcionales | `Partial<Pelicula>` para el formulario de edición |
| `Omit<T, K>` | "Quita" campos | `Omit<Pelicula, "id">` al crear |
| `Pick<T, K>` | Coge "solo" los campos indicados | `Pick<Pelicula, "titulo" \| "anio">` en un listado |
| `Readonly<T>` | "Impide" mutación | `Readonly<Pelicula[]>` para no mutar la lista |


> 🔧 **Lo añadimos al ejemplo** — en `tipos.ts`, derivamos los tipos que usará el formulario:
>
> 📦 **Código en:** [`src/tipos.ts`](../../../repos/02-react-ejemplo-pelis/src/tipos.ts) (`NuevaPelicula`, `FilaMinima` y `Cambios`).

```typescript
// tipos.ts
export type NuevaPelicula = Omit<Pelicula, "id">;                    // al crear: sin id
export type FilaMinima = Pick<Pelicula, "titulo" | "anio">;          // listado corto
export type Cambios = Partial<Pelicula>;                            // edición: solo lo que cambia

// EXPERIMENTO (en App.tsx): un tipo que "quita" la puntuación
export type PeliculaSinPuntos = Omit<Pelicula, "puntuacion">;

// Cuestión 1: si tipamos una película entera como PeliculaSinPuntos, ¿qué pasa?
const p1: PeliculaSinPuntos = pelis[0]!;
console.log(JSON.stringify(p1));
// El objeto sigue teniendo puntuacion en memoria: el tipo solo "esconde" el campo al editor.

// Cuestión 2: ¿cómo quitamos la puntuación "físicamente" del objeto?
const { puntuacion, ...p1SinPuntuacion } = pelis[0]!;
console.log(JSON.stringify(p1SinPuntuacion));

// Cuestión 3: ¿cuál es el paso correcto para comprobarlo? npx tsc --noEmit
```

> Son tipos, no código que se ejecuta: se "prueban" tipando algo y viendo que `tsc` acepta o rechaza.

---

<a id="134-propiedades-opcionales-y-obligatorias"></a>
## 13.4. Propiedades opcionales (`?`) y obligatorias. Uso en formularios
En los formularios tipados, las props opcionales son habituales por reutilización:

> 💡 **¿Cómo haríamos para...?** que un formulario sirva para dos modos a la vez (crear y editar), donde en editar los datos pueden venir pre-cargados y en crear no? Dicho de otra forma, que al editar sean OBLIGATORIOS y al crear sean OPCIONALES?

```tsx
//PeliculaForm.tsx
interface PeliculaFormProps {
  inicial?: Partial<Pelicula>; // formulario de edición: datos pre-cargados
  modo: "crear" | "editar";
  onGuardar: (datos: NuevaPelicula) => void;
  onCancelar: () => void;
}
```

Trucos útiles que vienen de TypeScript:

- `inicial?: Partial<Pelicula>` — permite pasar solo algunos campos.
- `modo: "crear" | "editar"` — unión de literales para decidir el comportamiento del formulario.
- `onGuardar: (datos: NuevaPelicula) => void` — funciones como props (`NuevaPelicula = Omit<Pelicula, "id">`, §13.3.2).

> 🔧 **Lo añadimos al ejemplo** — creamos `PeliculaForm.tsx` con esas props (esqueleto; el cuerpo se completa en §13.6 y §13.7):
>
> 📦 **Código en:** [`src/components/PeliculaForm.tsx`](../../../repos/02-react-ejemplo-pelis/src/components/PeliculaForm.tsx) (la `interface PeliculaFormProps` y la firma del componente).

```tsx
// PeliculaForm.tsx
import type { Pelicula, NuevaPelicula } from "./tipos.ts";

interface PeliculaFormProps {
  inicial?: Partial<Pelicula>;
  modo: "crear" | "editar";
  onGuardar: (datos: NuevaPelicula) => void;
  onCancelar: () => void;
}

export function PeliculaForm({ inicial, modo, onGuardar, onCancelar }: PeliculaFormProps) {
  // el formulario se completa en §13.6 (conversiones) y §13.7 (eventos)
  return <form>...</form>;
  // Ahora mismo NO HACE NADA
}
```

---

<a id="135-generics-en-react-usestate"></a>
## 13.5. Generics en React: `useState<T>`

Los generics que ya viste en arrays y funciones son la base de los hooks tipados.

<a id="1351-usestatepelicula"></a>
### 13.5.1 `useState<Pelicula[]>`

> 💡 **¿Cómo haríamos para...?** que el estado "lista de películas" sepa desde el principio que solo puede contener `Pelicula[]` y nada más?



```tsx
import { useState } from "react";
//App.tsx
import type { Pelicula } from "./tipos.ts";

const LISTA_PELICULAS: Pelicula[] = [
  { id: 1, titulo: "El Padrino", genero: "Drama", anio: 1972, director: "Coppola", puntuacion: 9.2 },
  { id: 2, titulo: "El Padrino II", genero: "Drama", anio: 1974, director: "Coppola", puntuacion: 9.0 },
  { id: 3, titulo: "Alien", genero: "Terror", anio: 1979, director: "Scott", puntuacion: 8.4 },
];

function App() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>(LISTA_PELICULAS);
  // el .map de la tabla ahora recorre `peliculas` (estado) y key={pelicula.id}
  ...
}
```
> [!NOTE]
> `useState<Pelicula[]>([])` fija el tipo genérico del estado. Si luego haces `setPeliculas(5)`, TypeScript te lo impide en tiempo de compilación (lógicamente).

> 🔧 **Lo añadimos al ejemplo** — en `App.tsx`, la lista deja de ser una constante y pasa a ser estado (añadimos `id` a los datos y la `key` pasa a ser `pelicula.id`):
>
> 📦 **Código en:** [`src/App.tsx`](../../../repos/02-react-ejemplo-pelis/src/App.tsx) (`useState<Pelicula[]>`) y [`src/components/PeliculaRow.tsx`](../../../repos/02-react-ejemplo-pelis/src/components/PeliculaRow.tsx) (`key={pelicula.id}`).

<a id="1352-componentes-genéricos"></a>
### 13.5.2 Componentes genéricos `<T>`

Un componente puede ser genérico cuando sirve para varios tipos de entidad. Esto es algo que NO se ha incluido en este repositorio, pero hay que tenerlo en cuenta.

> 💡 **¿Cómo haríamos para...?** que una misma fila funcione para CUALQUIER entidad que tenga `id` y `nombre` (película, tarea, alumno...), sin duplicar el componente?

```tsx
interface Fila<T> {
  item: T;
}

interface Producto {
  id?: number;
  nombre: string;
  precio: number; // Propiedad adicional propia de Producto
}

interface Alumno {
  id?: number;
  nombre: string;
  curso: string; // Propiedad adicional propia de Alumno
}

//acepta cualquier tipo de objeto T (siempre que tenga al menos una propiedad nombre:string y opcionalmente id numérico), 
//recibe ese objeto dentro de una propiedad llamada item, y renderiza un elemento de lista (<li>) con su nombre".
export function Fila<T extends { id?: number; nombre: string }>({ item }: Fila<T>) {
  return <li>{item.nombre}</li>;
}
```

---

## 13.6. Type assertions y conversiones

### 13.6.1 `as HTMLElement`

Como ya sabemos de sobra, cuando TypeScript no puede deducir el tipo de un valor que tú sí conoces, se usa una *type assertion*. Siguiendo la estela que llevamos desde el inicio, también se deberían tipar los elementos HTML de entrada a los *handlers*:

> 💡 **¿Cómo haríamos para...?** acceder a `.value` de un `input` que `querySelector` devuelve como un `Element` genérico?

```typescript
//Suponemos que tenemos un input type text con un id=buscar...
<input type="text" id="buscar" placeholder="Escribe algo aquí..." value="">

//QuerySelector es un método nativo de JS/TS. Le pasamos un selector y nos da primer elemento que coincida
const entrada = document.querySelector("#buscar") as HTMLInputElement; //Se tipa con aserción
entrada.value;

//MEJOR!! También valida en compilación
const entrada = document.querySelector<HTMLInputElement>("#buscar");
//Usamos optional chaining (?.) por si el elemento no existe en el DOM
entrada?.value;
```

> [!IMPORTANT]
> Es mejor utilizar los genéricos de las APIs del DOM (`querySelector<HTMLInputElement>("#buscar")`) antes que el `as`, porque el genérico también valida el selector en compilación. Usa `as` solo cuando no haya alternativa (o cuando haya que refinarlo en runtime con un *type guard*).

### 13.6.2 `parseInt` y `parseFloat`

Las **entradas de formulario**  son todo texto y hay que convertirlas antes de guardarlas, por ejemplo, en una `Pelicula`:

> 💡 **¿Cómo haríamos para...?** convertir el texto de un formulario (año, puntuación) en números reales antes de guardarlos en la película?

```typescript
const anio = Number.parseInt(cadena, 10);   // base decimal siempre
const puntuacion = Number.parseFloat(cadena);
```

> [!NOTE]
> `Number.parseInt("12", 10)` devuelve `number`. Con `Number.parseInt` (ojo: `Number` delante) en vez del antiguo `parseInt` global se evita que el valor sea tratado como octal en viejos motores.

> 🔧 **Lo añadimos al ejemplo** — en `PeliculaForm.tsx`, al construir el objeto en el `guardar`:
>
> 📦 **Código en:** [`src/components/PeliculaForm.tsx`](../../../repos/02-react-ejemplo-pelis/src/components/PeliculaForm.tsx) (función `guardar`, con `Number.parseInt`/`Number.parseFloat`).

```tsx
anio: Number.parseInt(anio, 10),
puntuacion: Number.parseFloat(puntuacion),
```

---

## 13.7. Tipado de eventos de React

Sí, aquí se tipa todo... incluso los eventos...

Vamos a suponer que le pasamos un parámetro a un *handler* de un `onClick`(por ejemplo), pero ese evento necesita que lo que se le pase, sea de un tipo determinado (acorde a la etiqueta asociada al evento).

En React, los eventos no son los eventos nativos del navegador, sino **SyntheticEvents** (eventos sintéticos adaptados por React para envolver los eventos de todo tipo de navegadores). Gracias a la inferencia de TypeScript en el JSX, rara vez necesitas indicar el tipo manualmente; pero si extraes la función fuera y omites el tipado, TypeScript recurrirá a un tipo genérico o exigirá que lo declares, garantizando que nunca trabajes a ciegas con un any»

React usa **Synthetic Events**: en TS se tipan con genéricos que indican sobre qué elemento se disparan. Vemos ejemplos más abajo.

Vemos distintos tipos de eventos utilizados:

### 13.7.1 `SubmitEvent` (y `FormEvent`, deprecated)

En el envío de un formulario:

> 💡 **¿Cómo haríamos para.. queremos cancelar el comportamiento predeterminado que el navegador ejecuta por defecto,?** que el handler del `submit` reciba el evento ya tipado y pueda llamar a `preventDefault()` sin recargar la SPA?
 es un "ya me encargo yo...". Para esto está el *preventDefault*.
```tsx 
import type { SubmitEvent } from "react";

//Es decir: llamo a guardar desde un evento Submit de un Form
// Esto evita errores del tipo: llamo a un onSubmit dentro de un <input> por ejemplo
function guardar(e: SubmitEvent<HTMLFormElement>) {
  e.preventDefault(); // evita recargar la SPA
}
```

> [!WARNING]
> **`FormEvent` está deprecated en React 19.** El tipo `React.FormEvent` (y su import `FormEvent`) sigue funcionando, pero los tipos de React lo marcan como `@deprecated` ("FormEvent doesn't actually exist"). Para un handler de `onSubmit` usaremos **`SubmitEvent<HTMLFormElement>`**.
>
> - `FormEvent<T>`: **deprecated**; se usaba como genérico para formularios. Sustitúyelo por `SubmitEvent` (submit) o `SyntheticEvent` (genérico).
> - `SubmitEvent<T>`: el tipo concreto para eventos de envío de formulario.
> - `SyntheticEvent<T>`: el tipo **base**, el "comodín" de todos los eventos sintéticos de React. Sirve como "genérico" cuando no necesitas nada específico del evento (solo `preventDefault()`, `stopPropagation()`, etc.).

```tsx
// Alternativas equivalentes para el mismo handler de submit:
import type { SyntheticEvent } from "react";

function guardar(e: SyntheticEvent<HTMLFormElement>) {
  e.preventDefault();
}
```

### 13.7.2 `React.ChangeEvent`

En 'inputs controlados' controlamos cambios en cada campo, asociando campo con una variable mediante su setter. Se podría hacer un handler por campo:

```typescript
//Tenemos esto y "Conforme vamos escribiendo se va guardando el valor del campo de texto"
<input type="text" value={valores.nombre} onChange={handleNombreChange} />

//No está tipada
function handleNombreChange(e) {
  setValores({ ...valores, nombre: e.target.value });
}

//Mejora. Ahora ya se tipa
function handleNombreChange({ target: { value } }: ChangeEvent<HTMLInputElement>) {
  setValores(v => ({ ...v, nombre: value }));
}

//También es común encontrarnos la llamada inline, con lo que no habría que tipar nada:
<input type="text" value={valores.nombre} 
  onChange={e => setValores(v => ({ ...v, nombre: e.target.value }))} 
/>
```

> 💡 **¿Cómo haríamos para...?** que al escribir en un `input` controlado, `e.target.value` esté tipado como `string` y no como `any`, y que **un solo handler** sirva para todos los campos del formulario?

```tsx
import type { ChangeEvent } from "react";

// El estado del formulario es un objeto `valores` (un `useState` de objeto)
// Se tipa solo con HTMLInputElement | HTMLSelectElement porque en HTML únicamente tres elementos nativos de formulario 
// disparan un evento onChange con las propiedades name y value, el tercero sería HTMLInputTextArea
function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
  const { name, value } = e.target; // Desestructura. `name` identifica el campo, `value` es string
  //[name]: significa "usa el valor que contiene la variable name como nombre de clave del objeto"
  setValores(v => ({ ...v, [name]: value }));
}
```

### 13.7.3 `React.MouseEvent`

Es el momento de hablar de la **propagación** y el **burbujeo**. 

Cuando ocurre un evento en React (como un clic o un cambio en un input), este no se queda aislado en el elemento donde se originó, sino que se **propaga a través del árbol de componentes**. El mecanismo principal de esta propagación es el **burbujeo** (bubbling): al igual que una burbuja sube desde el fondo hasta la superficie del agua, el evento nace en el elemento más interno (por ejemplo, un button) y va ascendiendo capa por capa por todos sus elementos padres (div, form, etc.) hasta llegar a la raíz de la aplicación. 

Durante este viaje hacia arriba, si alguno de esos contenedores padres tiene registrado un manejador para ese mismo tipo de evento (como otro onClick), también se ejecutará, a menos que detengamos el recorrido explícitamente con e.stopPropagation().

> 💡 **¿Cómo haríamos para...?** que un clic en el botón "Editar" de una fila detenga la propagación y abra el modal, sin que el evento llegue a la fila/tabla (teniendo en cuenta que fila y/o tabla tuvieran un evento onClick)?

```tsx
import type { MouseEvent } from "react";

function onEditar(e: MouseEvent<HTMLButtonElement>) {
  e.stopPropagation(); // evita que llegue a la fila
  abrirModal(pelicula); // en este repo (el 13) aún NO se usa modal
}
```

> 📌 En `PeliculaRow` la versión final no necesita el evento: la fila pasa la callback por `id` (`onEditar: (id: number) => void`, §13.2) y la fila no tiene `onClick` propio, así que no hay nada que detener.

Tabla resumen típica en un CRUD:

| Evento | Tipo | Uso en AppCine |
| --- | --- | --- |
| submit formulario | `SubmitEvent<HTMLFormElement>` (antes `FormEvent`, deprecated) | `guardar()` |
| escribir en input | `React.ChangeEvent<HTMLInputElement>` | `PeliculaForm` |
| elegir select | `React.ChangeEvent<HTMLSelectElement>` | género, orden |
| click botón | `React.MouseEvent<HTMLButtonElement>` | editar / borrar |

> 🔧 **Lo añadimos al ejemplo** — en `PeliculaForm.tsx`, los handlers tipados:
>
> 📦 **Código en:** [`src/components/PeliculaForm.tsx`](../../../repos/02-react-ejemplo-pelis/src/components/PeliculaForm.tsx) (`handleChange` por `name` con `ChangeEvent`, y `guardar` con `SubmitEvent`).

```tsx
//PeliculaForm.tsx
import type { SubmitEvent, ChangeEvent, MouseEvent } from "react";

// Un solo handler para todos los campos: el `name` del input identifica el campo
function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
  const { name, value } = e.target;
  setValores(v => ({ ...v, [name]: value }));
}

function guardar(e: SubmitEvent<HTMLFormElement>) {
  e.preventDefault();
  // ...construye NuevaPelicula (con Number.parseInt/parseFloat) y llama a onGuardar
}

//La anotación solo es necesaria cuando el handler va en una función aparte,
//En este repo va dentro inline dentro del html
// <tbody> ... onEditar={(id) => setEnEdicion(id)} ... </tbody>

//Este repo NO lo usa, pero lo dejamos aquí por didáctica
function onEditar(e: MouseEvent<HTMLButtonElement>) {
  e.stopPropagation(); // evita que el clic llegue a la fila
}
```

## 13.8. La app de películas completa

Con las capas anteriores ya casi todo está montado. Faltan los **handlers CRUD** en `App.tsx` (es decir, los que REALMENTE hacen el CRUD) y el **JSX final** que une formulario + tabla.

> 🔧 **Lo añadimos al ejemplo** — en `App.tsx`, los handlers de crear/editar/borrar:
>
> 📦 **Código en:** [`src/App.tsx`](../../../repos/02-react-ejemplo-pelis/src/App.tsx) (funciones `añadir`, `editar` y `borrar`).

```tsx
//App.tsx
const [enEdicion, setEnEdicion] = useState<number | null>(null); // id en edición (null = es porque estamos "creando")

// Estado derivado y por tanto NO se ha de crear un nuevo estado con este dato
// Guarada el id que se está editando (o undefined si no hay)
const peliculaEnEdicion =
  enEdicion !== null ? peliculas.find((p) => p.id === enEdicion) : undefined;

//Aunque el id que mostramos va del 1 en adelante, internamente tiene un timestamp (1970--> en ms)
function añadir(datos: NuevaPelicula) {
  const nueva: Pelicula = { ...datos, id: Date.now() };
  setPeliculas([...peliculas, nueva]);
}

function editar(id: number, cambios: Partial<Pelicula>) {
  setPeliculas(peliculas.map((p) => (p.id === id ? { ...p, ...cambios } : p)));
  setEnEdicion(null); // al terminar de editar, volvemos al modo "crear"
}

function borrar(id: number) {
  setPeliculas(peliculas.filter((p) => p.id !== id));
}
```

Y el JSX final (formulario + tabla). El formulario cambia de **crear** a **editar** según `enEdicion`: al pulsar "Editar" en una fila, `inicial` pre-carga esa película y `modo` pasa a `"editar"`; al guardar o cancelar, `setEnEdicion(null)` lo vuelve a poner en modo crear.

```tsx
return (
  <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
    <h1>Gestor de películas</h1>

    <PeliculaForm
      key={enEdicion ?? "nueva"} //MUY IMPORTANTE
/*    El re-renderizado del formulario no solo lo provoca esta key, sino cualquier 
      cambio de estado en el componente padre (App) que lo obligue a re-ejecutarse:
        
      - Caso A (Montaje inicial): App se ejecuta por primera vez en la pantalla.
      - Caso B (Editar/Cancelar): Cambia el estado 'enEdicion', lo que re-renderiza App 
          y además CAMBIA la 'key' (de "nueva" a un ID), provocando que React desmonte 
          y vuelva a montar el formulario desde cero para limpiar su estado interno.
      - Caso C (Insertar/Borrar): Cambia el estado 'peliculas', lo que re-renderiza App 
          y obliga al hijo a re-renderizarse, aunque en este caso la 'key' NO cambia 
          (sigue siendo "nueva"), por lo que el formulario solo se actualiza a vacío, no se destruye.
      */

      inicial={peliculaEnEdicion}
      modo={enEdicion !== null ? "editar" : "crear"}
      onGuardar={(datos) => (enEdicion !== null ? editar(enEdicion, datos) : añadir(datos))}
      onCancelar={() => setEnEdicion(null)}
    />

    <table style={{ width: "50%", border: "1px solid black", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Título</th>
          <th>Género</th>
          <th>Año</th>
          <th>Director</th>
          <th>Puntuación</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {peliculas.map((pelicula, indice) => (
          <PeliculaRow
            key={pelicula.id}
            pelicula={pelicula}
            indice={indice}
            onEditar={(id) => setEnEdicion(id)}
            onBorrar={borrar}
          />
        ))}
      </tbody>
    </table>
  </div>
);
```

> [!NOTE]
> `key={enEdicion ?? "nueva"}` fuerza a React a **montar de nuevo** el `PeliculaForm` cada vez que cambia la película en edición (o al volver a crear), de modo que el formulario se re-inicializa con los datos de `inicial`.

> [!NOTE]
> **Sobre el tipado:** el estado es `useState<Pelicula[]>` (§13.5.1), los handlers del formulario están tipados (§13.7) y las conversiones de texto a número se hacen con `Number.parseInt`/`Number.parseFloat` (§13.6.2).

**Walkthrough: por qué cada decisión**

| Decisión | Razón |
|---|---|
| `useState<Pelicula[]>(LISTA_PELICULAS)` | El genérico `<Pelicula[]>` fija que la lista solo contiene películas. Sin él, TS lo inferiría como `never[]`. |
| `NuevaPelicula = Omit<Pelicula, "id">` | Al crear todavía no hay `id`: lo asigna la app (`Date.now()`) o la base de datos. |
| `Partial<Pelicula>` en `editar` | Solo se pasan los campos que cambian, no la película entera. |
| `{ ...datos, id: Date.now() }` | Crea el objeto nuevo con un `id` único |
| `[...peliculas, nueva]` | Nuevo array con la película añadida; no mutamos el original --> React detecta el cambio. |
| `peliculas.map(...)` en `editar` | Nuevo array donde solo cambia la película con ese `id` (spread `{ ...p, ...cambios }`). |
| `peliculas.filter(...)` en `borrar` | Nuevo array sin la película eliminada. |
| `key={pelicula.id}` | Identidad estable para que React sepa qué fila cambió al editar/borrar. |
| `Number.parseInt(..., 10)` / `Number.parseFloat(...)` | Los inputs devuelven `string`; hay que convertirlos a `number` antes de guardarlos en `Pelicula`. |

> [!TIP]
> **Ejemplo corriendo:** esta app completa (CRUD sin API) está ejecutable en [`repos/02-react-ejemplo-pelis`](../../../repos/02-react-ejemplo-pelis/). El código se reparte así: `tipos.ts` (§13.1/§13.3.2) · `PeliculaRow` (§13.2/§13.3.1) · `PeliculaForm` (§13.4/§13.6.2/§13.7) · `App` con los handlers `añadir`/`editar`/`borrar` de este apartado (§13.8). Incluye el flujo de edición cableado (`enEdicion` + botones en la fila con `onEditar`/`onBorrar`, §13.2). Pruébalo con `cd repos/02-react-ejemplo-pelis && npm run dev`.

---

## 13.9. `strict` mode: tu red de seguridad

Todo el repo usa `strict: true`. En React esto significa que:

- `useState(null)` da `null` concreto, no `any`.
- `e.target.value` sobre un elemento tipado es `string` garantizado.

```bash
npx tsc --noEmit   # validar tipos sin emitir JS
npm run build      # validar + compilar en Vite
```

---

## 13.10. Tipos de elemento DOM más comunes

Cuando tipas eventos o props de bajo nivel, el genérico `<T>` es el **tipo del elemento del DOM** sobre el que actúa. Vienen de `lib.dom.d.ts` (los define TypeScript, no React). Los más usados en React:

| Tipo | Elemento | Uso típico |
|---|---|---|
| `HTMLInputElement` | `<input>` | Inputs de texto, checkboxes, radios (`onChange`) |
| `HTMLFormElement` | `<form>` | Formularios (`onSubmit`) |
| `HTMLButtonElement` | `<button>` | Botones (`onClick`) |
| `HTMLSelectElement` | `<select>` | Selects (`onChange`) |
| `HTMLTextAreaElement` | `<textarea>` | Textareas (`onChange`) |
| `HTMLDivElement` | `<div>` | Divs (estilos, contenedores) |

> [!NOTE]
> En Tauri estos tipos son "del lado web" (React): Tauri no manipula el DOM, la comunicación con Rust va por `invoke`. Los usas siempre que tipas un evento o una prop de un componente de bajo nivel.

---

<span style="color: green;">VEMOS YA SÍ, LA APP DEL REPOSITORIO FUNCIONANDO y ANALIZAMOS CÓDIGO</span>

---

<a id="1311-hoja-de-patrones-reconstruir-un-crud-en-cualquier-dominio"></a>
## 13.11. Hoja de patrones: reconstruir un CRUD en cualquier dominio

Este esqueleto se puede adaptar a **otro dominio** (libros, tareas, alumnos…). Se trata de ADAPTAR lo visto aquí aplicando estos **patrones** al nuevo dominio. Cada fila enlaza a la sección donde se explica. Si queremos LIBRO, entonce el cuerpo de `LibroForm` (lo que los apuntes 13 se enseña en piezas: §13.4 la `interface`, §13.6.2 las conversiones, §13.7 los eventos).

| # | Patrón | Esqueleto (dominio `Libro`) | § |
|---|---|---|---|
| 1 | **Modelo de datos** | `interface Libro { id: number; titulo: string; genero: string; anio: number; paginas: number }` | §13.1 |
| 2 | **Utility types** | `NuevoLibro = Omit<Libro, "id">` · `FilaMinimaLibro = Pick<Libro, "titulo" \| "anio">` · `CambiosLibro = Partial<Libro>` | §13.3.2 |
| 3 | **Props por componente** | `interface LibroRowProps { libro: Libro; indice: number; onEditar: (id: number) => void; onBorrar: (id: number) => void }` | §13.2 |
| 4 | **Botones de fila** | `<button onClick={() => onEditar(libro.id)}>Editar</button>` (id obligatorio: sin narrowing) | §13.2 |
| 5 | **Formulario** | `inicial?: Partial<Libro>` · `modo: "crear" \| "editar"` · `onGuardar: (d: NuevoLibro) => void`; un objeto `valores` + un `handleChange` por `name`; `guardar(e: SubmitEvent)` con `Number.parseInt`/`parseFloat` | §13.4/§13.6.2/§13.7 |
| 6 | **Estado + CRUD** | `useState<Libro[]>(…)`; `añadir` = `{ ...datos, id: Date.now() }` + `[...libros, nuevo]`; `editar` = `map` + spread; `borrar` = `filter`; `enEdicion` + `libroEnEdicion` derivado; `key={enEdicion ?? "nueva"}` | §13.5.1/§13.8 |
| 7 | **Eventos** | `SubmitEvent` (submit) · `ChangeEvent` (input/select) · `MouseEvent` (botón) | §13.7 |

### Esqueleto del formulario (JSX)



> [!TIP]
> **Cómo adaptarlo??:** si tenemos otro el dominio (ej. `Libro`) y se piden tareas puntuales: definir los tipos (§13.1/§13.3.2), escribir la fila con props tipadas (§13.2), el `guardar` del formulario (§13.4/§13.6.2/§13.7) y los handlers CRUD en `App` (§13.5.1/§13.8). Reconstruye aplicando cada patrón a ese dominio, no copiando `Pelicula`.

```tsx
import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import type { Libro, NuevoLibro } from "./tipos.ts";

interface LibroFormProps {
  inicial?: Partial<Libro>;
  modo: "crear" | "editar";
  onGuardar: (datos: NuevoLibro) => void;
  onCancelar: () => void;
}

// El estado del formulario es un objeto: los campos numéricos se guardan como
// string (para poder escribir en el input) y se convierten al enviar.
type LibroFormValores = {
  titulo: string;
  genero: string;
  anio: string;
  paginas: string;
};

const GENEROS = ["Novela", "Cuento", "Poesía", "Ensayo"];

export function LibroForm({ inicial, modo, onGuardar, onCancelar }: LibroFormProps) {
  const [valores, setValores] = useState<LibroFormValores>(() => ({
    titulo: inicial?.titulo ?? "",
    genero: inicial?.genero ?? "Novela",
    anio: inicial?.anio?.toString() ?? "",
    paginas: inicial?.paginas?.toString() ?? "",
  }));

  // Un solo handler para todos los campos: el `name` del control identifica el campo
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setValores(v => ({ ...v, [name]: value }));
  }

  function guardar(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos: NuevoLibro = {
      titulo: valores.titulo.trim(),
      genero: valores.genero,
      anio: Number.parseInt(valores.anio, 10),
      paginas: Number.parseInt(valores.paginas, 10),
    };
    onGuardar(datos);
    setValores({ titulo: "", genero: "Novela", anio: "", paginas: "" });
  }

  return (
    <form onSubmit={guardar} style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
      <input name="titulo" value={valores.titulo} onChange={handleChange} placeholder="Título" />
      <select name="genero" value={valores.genero} onChange={handleChange}>
        {GENEROS.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      <input name="anio" value={valores.anio} onChange={handleChange} placeholder="Año" style={{ width: "5rem" }} />
      <input name="paginas" value={valores.paginas} onChange={handleChange} placeholder="Páginas" style={{ width: "6rem" }} />
      <button type="submit">{modo === "crear" ? "Añadir" : "Guardar"}</button>
      {modo === "editar" && <button type="button" onClick={onCancelar}>Cancelar</button>}
    </form>
  );
}
```



---



## 📦 Ejemplos ejecutables

En [`repos/02-react-componentes`](../../../repos/02-react-componentes/) el tipado se ve en acción:

| Pestaña | Ejemplos | Qué demuestra |
|---|---|---|
| **Hooks** | `RenderCounter.tsx` | `useRef<HTMLInputElement>` (DOM) + `useRef<number>` (valor persistente) |
| **Básicos** | `Saludo.tsx` · `Card.tsx` | Props tipadas con `interface` + `children: ReactNode` |
| **Controles** | `TextInput.tsx` · `Select.tsx` · `SearchBox.tsx` | `ChangeEvent<HTMLInputElement>` · `Opcion` (tipos compartidos en `types.ts`) |
| **Personalizados** | `Boton.tsx` · `TablaGenerica.tsx` | `extends ButtonHTMLAttributes` · componente genérico `<T>` |

Para ejecutarlos: `cd repos/02-react-componentes && npm run dev`.

### AppCine completa: `repos/02-react-ejemplo-pelis`

El proyecto [`repos/02-react-ejemplo-pelis`](../../../repos/02-react-ejemplo-pelis/) implementa la app de películas de §13.1–§13.8 como aplicación Vite ejecutable (formulario + tabla + CRUD en memoria):

| Archivo | Qué demuestra |
|---|---|
| `src/tipos.ts` | `Pelicula`, `NuevaPelicula` (`Omit`), `FilaMinima` (`Pick`), `Cambios` (`Partial`) |
| `src/colorGenero.ts` | `Record<string, string>` + `colorDeGenero()` |
| `src/components/PeliculaRow.tsx` | Props tipadas, color por género y botones editar/borrar |
| `src/components/PeliculaForm.tsx` | Formulario crear/editar con `modo`, `SubmitEvent`/`ChangeEvent`, `Number.parseInt`/`parseFloat` |
| `src/App.tsx` | `useState<Pelicula[]>`, estado derivado y handlers `añadir`/`editar`/`borrar` |

Para ejecutarlo: `cd repos/02-react-ejemplo-pelis && npm run dev`.

---

[Volver al índice general](../../../README.md#5-distribución-temporal-y-contenidos-s00s13)