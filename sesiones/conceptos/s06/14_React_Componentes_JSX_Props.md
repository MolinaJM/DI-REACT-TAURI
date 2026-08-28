# 14. React: componentes, JSX y props 📝 🖥️

- [14. React: componentes, JSX y props 📝 🖥️](#14-react-componentes-jsx-y-props-️)
  - [1. Componentes funcionales y composición](#1-componentes-funcionales-y-composición)
  - [2. JSX y renderizado: qué se puede expresar y qué no](#2-jsx-y-renderizado-qué-se-puede-expresar-y-qué-no)
  - [3. Props: comunicación padre → hijo](#3-props-comunicación-padre--hijo)
  - [4. Renderizado de listas con `key`: `PeliculaTable`](#4-renderizado-de-listas-con-key-peliculatable)
  - [5. Renderizado condicional: loading, vacío, ternarios y `&&`](#5-renderizado-condicional-loading-vacío-ternarios-y-)
  - [6. `useState` y formularios controlados: `Buscador` y `PeliculaForm`](#6-usestate-y-formularios-controlados-buscador-y-películaform)
    - [6.1 `Buscador` con input controlado](#61-buscador-con-input-controlado)
    - [6.2 `PeliculaForm` controlado](#62-películaform-controlado)
  - [7. Composición de la pantalla principal](#7-composición-de-la-pantalla-principal)
  - [8. Prácticas](#8-prácticas)

Objetivo: crear la UI de AppCine a partir de componentes reutilizables, con JSX, props, listas con `key` y formularios controlados con `useState`. **No hay manipulación manual del DOM**: React se encarga de pintar a partir de los datos.

> [!NOTE]
> En este capítulo usamos `.tsx`: archivos TypeScript que contienen JSX. Todo el tipado que sabes aplicar en `.ts` se aplica igual en `.tsx`.

---

## 1. Componentes funcionales y composición

Un componente es una **función que recibe props y devuelve JSX**. Se reutiliza componiendo unos dentro de otros:

```tsx
export function App() {
  return (
    <main>
      <Toolbar />
      <PeliculaTable peliculas={peliculas} />
    </main>
  );
}
```

- `App` compone `Toolbar` y `PeliculaTable`.
- Cada uno es una pieza aislada y reutilizable.
- En React solo se usan **componentes funcionales** (nada de clases).

---

## 2. JSX y renderizado: qué se puede expresar y qué no

JSX es azúcar sintáctico para `createElement`. Dentro de `{...}` se puede poner **expresiones**, no sentencias.

```tsx
// ✅ Válido: expressiones con operadores, llamadas y ternarios
<h1>{peliculas.length} películas</h1>
<span className={color}>Género: {pelicula.genero.toUpperCase()}</span>

// ❌ No es válido: if, for, declaraciones
// { if (peliculas.length === 0) ... }
// { for (const p of peliculas) ... }
```

Para condicionales y bucles se usan ternarios y `map` (vistos en las secciones 4 y 5).

Reglas prácticas de JSX:

- `className` en vez de `class`.
- Los atributos se escriben en camelCase: `onClick`, `onSubmit`, `htmlFor`.
- Todo elemento debe cerrarse: `<img ... />` en vez de `<img ...>`.

---

## 3. Props: comunicación padre → hijo

Los datos bajan del padre al hijo mediante **props**. En el padre:

```tsx
<PeliculaRow pelicula={pelicula} indice={0} />
```

En el hijo se reciben desestructuradas y tipadas (unidad 13):

```tsx
interface PeliculaRowProps {
  pelicula: Pelicula;
  indice: number;
}

export function PeliculaRow({ pelicula, indice }: PeliculaRowProps) {
  return (
    <tr>
      <td>{indice + 1}</td>
      <td>{pelicula.titulo}</td>
      <td>{pelicula.anio}</td>
    </tr>
  );
}
```

> [!IMPORTANT]
> Las props son de **solo lectura**: el hijo nunca las modifica. Si falta una prop obligatoria, TypeScript no deja compilar.

---

## 4. Renderizado de listas con `key`: `PeliculaTable`

Las listas se pintan con `map` y cada elemento lleva una **`key`** única, basada en el id de los datos:

```tsx
import type { Pelicula } from "./peliculas";
import { PeliculaRow } from "./PeliculaRow";

interface PeliculaTableProps {
  peliculas: Pelicula[];
}

export function PeliculaTable({ peliculas }: PeliculaTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Título</th>
          <th>Género</th>
          <th>Año</th>
          <th>Director</th>
          <th>Puntuación</th>
        </tr>
      </thead>
      <tbody>
        {peliculas.map((pelicula, indice) => (
          <PeliculaRow key={pelicula.id ?? pelicula.titulo} pelicula={pelicula} indice={indice} />
        ))}
      </tbody>
    </table>
  );
}
```

> [!NOTE]
> `key` identifica cada fila ante los cambios (re-render eficiente). Nunca uses el índice de `map` como `key` si la lista puede reordenarse o filtrarse: usar el `id` es la regla de oro.

---

## 5. Renderizado condicional: loading, vacío, ternarios y `&&`

Cuatro patrones imprescindibles:

```tsx
// 1. Loading → ternario
{cargando ? <Spinner /> : <PeliculaTable peliculas={peliculas} />}

// 2. Estado vacío → ternario anidado
{peliculas.length === 0 ? (
  <p className="vacio">No hay películas que coincidan.</p>
) : (
  <PeliculaTable peliculas={peliculas} />
)}

// 3. Condición con && (pinta solo si se cumple)
{error && <p className="error">{error}</p>}

// 4. Evitar el 0: compara siempre con cadena o boolean
{peliculas.length > 0 && <p>{peliculas.length} películas</p>}
```

> [!CAUTION]
> Con `&&`, evita `{0 && ...}`: en JSX el `0` se pinta literalmente. Usa `> 0 &&` o un ternario.

---

## 6. `useState` y formularios controlados: `Buscador` y `PeliculaForm`

Un **formulario controlado** guarda el valor del input en el estado: el input muestra siempre `value` del estado y cada tecla llama al `set`.

### 6.1 `Buscador` con input controlado

```tsx
import { useState } from "react";

interface BuscadorProps {
  onBuscar: (texto: string) => void;
}

export function Buscador({ onBuscar }: BuscadorProps) {
  const [texto, setTexto] = useState("");

  function alEscribir(e: ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value;
    setTexto(valor);
    onBuscar(valor);
  }

  return (
    <label>
      Buscar:
      <input value={texto} onChange={alEscribir} placeholder="Título o género…" />
    </label>
  );
}
```

### 6.2 `PeliculaForm` controlado

Un formulario con varios campos, uno por cada propiedad de la película:

```tsx
import { useState } from "react";
import type { FormEvent } from "react";
import type { Pelicula } from "./peliculas";

interface PeliculaFormProps {
  inicial?: Partial<Pelicula>;
  onGuardar: (datos: Omit<Pelicula, "id">) => void;
}

export function PeliculaForm({ inicial = {}, onGuardar }: PeliculaFormProps) {
  const [titulo, setTitulo] = useState(inicial.titulo ?? "");
  const [genero, setGenero] = useState(inicial.genero ?? "");
  const [anio, setAnio] = useState(String(inicial.anio ?? ""));
  const [director, setDirector] = useState(inicial.director ?? "");
  const [puntuacion, setPuntuacion] = useState(String(inicial.puntuacion ?? "0"));

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const anioNum = Number.parseInt(anio, 10);
    const puntuacionNum = Number.parseFloat(puntuacion);

    onGuardar({
      titulo: titulo.trim(),
      genero: genero.trim(),
      anio: anioNum,
      director: director.trim(),
      puntuacion: puntuacionNum,
    });

    // Reiniciar el formulario en modo crear
    setTitulo("");
    setGenero("");
    setAnio("");
    setDirector("");
    setPuntuacion("");
  }

  return (
    <form onSubmit={enviar}>
      <label>
        Título
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
      </label>
      <label>
        Género
        <input value={genero} onChange={(e) => setGenero(e.target.value)} required />
      </label>
      <label>
        Año
        <input type="number" value={anio} onChange={(e) => setAnio(e.target.value)} required />
      </label>
      <label>
        Director
        <input value={director} onChange={(e) => setDirector(e.target.value)} required />
      </label>
      <label>
        Puntuación (0-10)
        <input type="number" step="0.1" value={puntuacion} onChange={(e) => setPuntuacion(e.target.value)} required />
      </label>
      <button type="submit">Guardar</button>
    </form>
  );
}
```

> [!NOTE]
> `anio` y `puntuacion` se guardan como `string` para poder escribir en el input; al enviar se convierten con `Number.parseInt` / `Number.parseFloat` (unidad 21).

---

## 7. Composición de la pantalla principal

Con estas piezas se compone la pantalla de AppCine:

```tsx
<main className="app">
  <h1>AppCine</h1>
  <Buscador onBuscar={onBuscar} />
  {cargando ? <Spinner /> : <PeliculaTable peliculas={visibles} />}
  <PeliculaForm onGuardar={onGuardar} />
</main>
```

- `Buscador`: entrada controlada.
- `PeliculaTable`: listas + `key`.
- `PeliculaForm`: formulario controlado.
- `cargando`: render condicional.

---

## 8. Prácticas

- **P1.** `PeliculaTable` que recibe `Pelicula[]` y pinta la tabla con `key={p.id}`.
- **P2.** `Buscador` con input controlado que avisa al padre con `onBuscar(texto)`.
- **P3.** `PeliculaForm` controlado con los 5 campos, usando `Number.parseInt`/`parseFloat`.
- **P4.** Refactorizar un componente sin tipos a uno totalmente tipado con `interface XProps`.

---

[Volver al índice general](../../index.md)