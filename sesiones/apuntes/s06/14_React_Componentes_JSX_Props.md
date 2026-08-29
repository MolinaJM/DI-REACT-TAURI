# 14. React: componentes, JSX y props 📝 🖥️

- [14. React: componentes, JSX y props 📝 🖥️](#14-react-componentes-jsx-y-props)
  - [14.1. Componentes funcionales y composición](#141-componentes-funcionales-y-composición)
  - [14.2. JSX y renderizado: qué se puede expresar y qué no](#142-jsx-y-renderizado-qué-se-puede-expresar-y-qué-no)
  - [14.3. Props: comunicación padre → hijo](#143-props-comunicación-padre--hijo)
  - [14.4. Renderizado de listas con `key`: `PeliculaTable`](#144-renderizado-de-listas-con-key-peliculatable)
  - [14.5. Renderizado condicional: loading, vacío, ternarios y `&&`](#145-renderizado-condicional-loading-vacío-ternarios-y)
  - [14.6. `useState` y formularios controlados: `Buscador` y `PeliculaForm`](#146-usestate-y-formularios-controlados-buscador-y-peliculaform)
    - [14.6.1 `Buscador` con input controlado](#1461-buscador-con-input-controlado)
    - [14.6.2 `PeliculaForm` controlado](#1462-peliculaform-controlado)
  - [14.7. Composición de la pantalla principal](#147-composición-de-la-pantalla-principal)
  - [14.8. Prácticas](#148-prácticas)

Objetivo: crear la UI de AppCine a partir de componentes reutilizables, con JSX, props, listas con `key` y formularios controlados con `useState`. **No hay manipulación manual del DOM**: React se encarga de pintar a partir de los datos.

> [!NOTE]
> En este capítulo usamos `.tsx`: archivos TypeScript que contienen JSX. Todo el tipado que sabes aplicar en `.ts` se aplica igual en `.tsx`.

---

## 14.1. Componentes funcionales y composición

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

## 14.2. JSX y renderizado: qué se puede expresar y qué no

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

## 14.3. Props: comunicación padre → hijo

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

## 14.4. Renderizado de listas con `key`: `PeliculaTable`

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

## 14.5. Renderizado condicional: loading, vacío, ternarios y `&&`

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

## 14.6. `useState` y formularios controlados: `Buscador` y `PeliculaForm`

Un **formulario controlado** guarda el valor del input en el estado: el input muestra siempre `value` del estado y cada tecla llama al `set`.

### 14.6.1 `Buscador` con input controlado

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

### 14.6.2 `PeliculaForm` controlado

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

## 14.7. Composición de la pantalla principal

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

## 14.8. Prácticas

- **P1.** `PeliculaTable` que recibe `Pelicula[]` y pinta la tabla con `key={p.id}`.
- **P2.** `Buscador` con input controlado que avisa al padre con `onBuscar(texto)`.
- **P3.** `PeliculaForm` controlado con los 5 campos, usando `Number.parseInt`/`parseFloat`.
- **P4.** Refactorizar un componente sin tipos a uno totalmente tipado con `interface XProps`.

---

### 📦 En el repositorio (`repos/02-react-componentes/src/components/Saludo.tsx`)

```tsx
/**
 * Saludo.tsx - Componente funcional con FC<Props>
 * Fuente: Sesión 04 - Anatomía de Componentes y Funciones con TypeScript
 * Ejemplo de interfaz con nombre/edad
 */
import { FC } from 'react';

interface SaludoProps {
    nombre: string;
    edad?: number;
}

const Saludo: FC<SaludoProps> = ({ nombre, edad }) => {
    return (
        <div className="p-4 bg-blue-100 rounded-lg">
            <h2 className="text-xl font-bold">Hola, {nombre}!</h2>
            {edad && <p className="text-gray-600">Edad: {edad} años</p>}
        </div>
    );
};

export default Saludo;
```

### 📦 En el repositorio (`repos/02-react-componentes/src/components/Card.tsx`)

```tsx
/**
 * Card.tsx - Props children pattern con ReactNode
 * Fuente: Sesión 04 - Props Children
 */
import { ReactNode } from 'react';

interface CardProps {
    titulo: string;
    children: ReactNode;
    className?: string;
}

function Card({ titulo, children, className = "" }: CardProps) {
    return (
        <div className={`bg-white shadow-md rounded-xl p-6 ${className}`}>
            <h3 className="text-lg font-semibold mb-3">{titulo}</h3>
            {children}
        </div>
    );
}

export default Card;
```

### 📦 En el repositorio (`repos/02-react-componentes/src/components/ListaTareas.tsx`)

```tsx
/**
 * ListaTareas.tsx - useState con TypeScript
 * Fuente: Sesión 04 - useState con TypeScript
 * Lista de tareas completa con agregar/toggle
 */
import { useState } from 'react';

interface Tarea {
    id: number;
    texto: string;
    completada: boolean;
}

function ListaTareas() {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [nuevaTarea, setNuevaTarea] = useState("");

    const agregarTarea = () => {
        if (nuevaTarea.trim() === "") return;
        const tarea: Tarea = {
            id: Date.now(),
            texto: nuevaTarea,
            completada: false
        };
        setTareas([...tareas, tarea]);
        setNuevaTarea("");
    };

    const toggleTarea = (id: number) => {
        setTareas(tareas.map(t =>
            t.id === id ? { ...t, completada: !t.completada } : t
        ));
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="flex gap-2 mb-4">
                <input type="text" value={nuevaTarea}
                    onChange={e => setNuevaTarea(e.target.value)}
                    className="border p-2 flex-1 rounded" />
                <button onClick={agregarTarea}
                    className="bg-green-500 text-white px-4 py-2 rounded">
                    Agregar
                </button>
            </div>
            <ul>
                {tareas.map(tarea => (
                    <li key={tarea.id}
                        onClick={() => toggleTarea(tarea.id)}
                        className={`cursor-pointer p-2 ${tarea.completada ? "line-through text-gray-400" : ""}`}>
                        {tarea.texto}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaTareas;
```

### 📦 En el repositorio (`repos/02-react-componentes/src/state/FormularioRegistro.tsx`)

```tsx
/**
 * FormularioRegistro.tsx - Formulario Controlado con Tipado
 * Fuente: Sesión 05 - Formulario Controlado con Tipado
 * Validación para nombre, email, edad
 */
import { useState } from 'react';

interface FormData {
    nombre: string;
    email: string;
    edad: number | string;
    pais: string;
    terminos: boolean;
}

interface ErroresForm {
    nombre?: string;
    email?: string;
    edad?: string;
}

function FormularioRegistro() {
    const [form, setForm] = useState<FormData>({
        nombre: "",
        email: "",
        edad: "",
        pais: "es",
        terminos: false
    });

    const [errores, setErrores] = useState<ErroresForm>({});

    const validar = (): boolean => {
        const nuevosErrores: ErroresForm = {};
        if (!form.nombre.trim()) {
            nuevosErrores.nombre = "El nombre es obligatorio";
        }
        if (!form.email.includes("@")) {
            nuevosErrores.email = "Email inválido";
        }
        if (Number(form.edad) < 18) {
            nuevosErrores.edad = "Debes ser mayor de 18 años";
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validar()) {
            console.log("Formulario enviado:", form);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div>
                <label className="block font-medium">Nombre</label>
                <input type="text" name="nombre" value={form.nombre}
                    onChange={handleChange} className="w-full border rounded p-2" />
                {errores.nombre && <p className="text-red-500 text-sm">{errores.nombre}</p>}
            </div>
            <div>
                <label className="block font-medium">Email</label>
                <input type="email" name="email" value={form.email}
                    onChange={handleChange} className="w-full border rounded p-2" />
                {errores.email && <p className="text-red-500 text-sm">{errores.email}</p>}
            </div>
            <div>
                <label className="block font-medium">Edad</label>
                <input type="number" name="edad" value={form.edad}
                    onChange={handleChange} className="w-full border rounded p-2" />
                {errores.edad && <p className="text-red-500 text-sm">{errores.edad}</p>}
            </div>
            <button type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Registrarse
            </button>
        </form>
    );
}

export default FormularioRegistro;
```

### 📦 En el repositorio (`repos/02-react-componentes/src/App.tsx`)

```tsx
/**
 * App.tsx - Componente principal que muestra todos los ejemplos
 * Extraído de las sesiones 04, 05 y 07
 */
import { useState } from 'react';

// S04 - Componentes básicos
import Saludo from './components/Saludo';
import Card from './components/Card';
import ListaTareas from './components/ListaTareas';
import ListaUsuarios from './components/ListaUsuarios';

// S07 - Componentes personalizados
import Boton from './components/Boton';
import Modal from './components/Modal';
import TablaGenerica from './components/TablaGenerica';

// S05 - Estado y formularios
import Contador from './state/useReducerEjemplo';
import FormularioRegistro from './state/FormularioRegistro';

function App() {
  const [modalAbierto, setModalAbierto] = useState(false);

  const usuariosEjemplo = [
    { id: 1, nombre: "Ana García", email: "ana@ejemplo.com", edad: 28 },
    { id: 2, nombre: "Pedro López", email: "pedro@ejemplo.com", edad: 35 },
    { id: 3, nombre: "María Ruiz", email: "maria@ejemplo.com", edad: 22 },
  ];

  return (
    <div style={{ maxWidth: 960, margin: '2rem auto', padding: '0 2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        React Componentes - Ejemplos Sesiones 4, 5 y 7
      </h1>

      {/* === SESION 4 === */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>S04 - Componente Saludo</h2>
        <Saludo nombre="María" edad={28} />
        <Saludo nombre="Pedro" />
      </section>

      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>S04 - Card con Children</h2>
        <Card titulo="Noticia">
          <p>Este es el contenido de la tarjeta.</p>
          <button>Leer más</button>
        </Card>
      </section>

      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>S04 - Lista de Tareas</h2>
        <ListaTareas />
      </section>

      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>S04 - Lista de Usuarios (useEffect)</h2>
        <ListaUsuarios />
      </section>

      {/* === SESION 7 === */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>S07 - Botón Personalizado</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          <Boton variante="primary">Primary</Boton>
          <Boton variante="secondary">Secondary</Boton>
          <Boton variante="danger">Danger</Boton>
          <Boton variante="ghost">Ghost</Boton>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Boton variante="primary" tamano="sm">Pequeño</Boton>
          <Boton variante="primary" tamano="md">Mediano</Boton>
          <Boton variante="primary" tamano="lg">Grande</Boton>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Boton cargando>Cargando</Boton>
          <Boton disabled>Deshabilitado</Boton>
        </div>
      </section>

      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>S07 - Modal</h2>
        <Boton onClick={() => setModalAbierto(true)}>Abrir Modal</Boton>
        <Modal abierto={modalAbierto} onCerrar={() => setModalAbierto(false)} titulo="Ejemplo Modal">
          <p>Contenido del modal con children.</p>
          <Boton onClick={() => setModalAbierto(false)} style={{ marginTop: '1rem' }}>Cerrar</Boton>
        </Modal>
      </section>

      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>S07 - Tabla Genérica</h2>
        <TablaGenerica
          datos={usuariosEjemplo}
          columnas={[
            { key: 'id', titulo: 'ID' },
            { key: 'nombre', titulo: 'Nombre' },
            { key: 'email', titulo: 'Email' },
            { key: 'edad', titulo: 'Edad' },
          ]}
          keyExtractor={(item: typeof usuariosEjemplo[number]) => item.id}
        />
      </section>

      {/* === SESION 5 === */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>S05 - useReducer (Contador)</h2>
        <Contador />
      </section>

      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>S05 - Formulario Controlado con Validación</h2>
        <FormularioRegistro />
      </section>
    </div>
  );
}

export default App;
```

---

[Volver al índice general](../../index.md)