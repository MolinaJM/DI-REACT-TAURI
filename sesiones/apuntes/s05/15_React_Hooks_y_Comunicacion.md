# 15. React: hooks, ciclo de vida y comunicación entre componentes 📝 🖥️

> 🧭 **Sesiones donde se aplica:** Se usa en las sesiones S05 (estado, efecto y lifting state up) y S06 (eventos, modal y debounce).

- [15. React: hooks, ciclo de vida y comunicación entre componentes 📝 🖥️](#15-react-hooks-ciclo-de-vida-y-comunicación-entre-componentes)
  - [15.1. `useState`: el estado local](#151-usestate-el-estado-local)
  - [15.2. `useEffect`: carga de datos y suscripciones](#152-useeffect-carga-de-datos-y-suscripciones)
    - [15.2.1 Carga inicial de datos](#1521-carga-inicial-de-datos)
    - [15.2.2 Suscripción a eventos y cleanup](#1522-suscripción-a-eventos-y-cleanup)
  - [15.3. `useCallback` y dependencias](#153-usecallback-y-dependencias)
  - [15.4. `useRef`: timers y referencias al DOM](#154-useref-timers-y-referencias-al-dom)
  - [15.5. Lifting state up: App como fuente de la verdad](#155-lifting-state-up-app-como-fuente-de-la-verdad)
  - [15.6. Eventos por props: `onEdit`, `onDelete`, `onSave`, `onClose`, `onSearch`](#156-eventos-por-props-onedit-ondelete-onsave-onclose-onsearch)
  - [15.7. Peticiones asíncronas con `fetch` + `async/await`](#157-peticiones-asíncronas-con-fetch--asyncawait)
  - [15.8. Patrón modal: overlay + panel](#158-patrón-modal-overlay--panel)
  - [15.9. Debounce en la búsqueda](#159-debounce-en-la-búsqueda)
  - [15.10. Formulario: modo crear vs modo editar](#1510-formulario-modo-crear-vs-modo-editar)
  - [15.11. Prácticas](#1511-prácticas)

Objetivo: gestionar datos asíncronos, coordinar componentes y montar el CRUD completo de AppCine con hooks y props.

> [!IMPORTANT]
> Los hooks (funciones que empiezan por `use`) solo se llaman en el nivel superior del componente y siempre en el mismo orden. Nunca dentro de bucles o condicionales.

---

## 15.1. `useState`: el estado local

El estado recuerda valores **entre renders**. Cambiar el estado con su `set` provoca un re-render automático:

```tsx
const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
const [showForm, setShowForm] = useState(false);
const [editando, setEditando] = useState<Pelicula | null>(null); // null = crear
```

- `peliculas`: la lista completa (fuente de la verdad).
- `showForm`: si el formulario está abierto.
- `editando`: `null` (crear) o una película concreta (editar).

---

## 15.2. `useEffect`: carga de datos y suscripciones

El efecto permite ejecutar código "después del render". Su segundo argumento (`dependencias`) decide cuándo se vuelve a ejecutar.

### 15.2.1 Carga inicial de datos

```tsx
useEffect(() => {
  let cancelado = false;

  async function cargar() {
    setCargando(true);
    try {
      const datos = await api.listarPeliculas();
      if (!cancelado) setPeliculas(datos);
    } catch (err) {
      if (!cancelado) setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      if (!cancelado) setCargando(false);
    }
  }

  cargar();
  return () => {
    cancelado = true; // se ejecuta al desmontar o cambiar dependencias
  };
}, []); // [] → una vez al montar
```

> [!NOTE]
> `[]` (array vacío) hace que el efecto se ejecute una sola vez. El `cleanup` evita actualizar el estado de un componente ya desmontado (petición tardía).

### 15.2.2 Suscripción a eventos y cleanup

Cerrar el modal con la tecla **Escape** es una suscripción que necesita limpieza:

```tsx
useEffect(() => {
  function teclaEsc(e: KeyboardEvent) {
    if (e.key === "Escape") {
      setShowForm(false);
      setEditando(null);
    }
  }

  window.addEventListener("keydown", teclaEsc);
  return () => window.removeEventListener("keydown", teclaEsc);
}, []);
```

---

## 15.3. `useCallback` y dependencias

`useCallback` memoriza una función y solo la recrea si cambian sus dependencias. Evita re-renders innecesarios en componentes hijos:

```tsx
const fetchPeliculas = useCallback(async () => {
  setCargando(true);
  try {
    const datos = await api.listarPeliculas();
    setPeliculas(datos);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Error desconocido");
  } finally {
    setCargando(false);
  }
}, [api]); // se recrea solo si `api` cambia

useEffect(() => {
  fetchPeliculas();
}, [fetchPeliculas]);
```

> [!TIP]
> Regla de oro: si una función que pasas como prop a un hijo depende de un `useEffect` o lista de comparación, envídrala con `useCallback` para que la identidad no cambie en cada render.

---

## 15.4. `useRef`: timers y referencias al DOM

`useRef` guarda un valor mutable que **no provoca re-renders** y persiste toda la vida del componente. Dos usos fundamentales en AppCine:

**Timers para el debounce** (el id de `setTimeout`):

```tsx
const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

function buscar(texto: string) {
  if (timeoutRef.current !== null) {
    clearTimeout(timeoutRef.current);
  }
  timeoutRef.current = setTimeout(async () => {
    const resultado = await api.buscarPeliculas(texto);
    setPeliculas(resultado);
  }, 300);
}
```

**Referencias al DOM** (el overlay del modal):

```tsx
const overlayRef = useRef<HTMLDivElement | null>(null);

function clicFuera(e: MouseEvent) {
  if (overlayRef.current !== null && e.target === overlayRef.current) {
    setShowForm(false);
    setEditando(null);
  }
}
```

> [!NOTE]
> `useRef<T>(null)` crea un `RefObject`. Con `strict` hay que comprobar `ref.current !== null` antes de usar el nodo.

---

## 15.5. Lifting state up: App como fuente de la verdad

Cuando varios componentes necesitan el mismo dato, el estado **sube** al componente común más cercano (`App`). Los hijos reciben el dato por props y avisan con callbacks:

```tsx
export function App() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState<Pelicula | null>(null);

  async function onGuardar(datos: Omit<Pelicula, "id">) {
    if (editando && editando.id !== undefined) {
      await api.actualizarPelicula(editando.id, datos);
    } else {
      await api.crearPelicula(datos);
    }
    await fetchPeliculas();
    cerrarForm();
  }

  async function onEliminar(pelicula: Pelicula) {
    if (pelicula.id !== undefined) {
      await api.eliminarPelicula(pelicula.id);
      await fetchPeliculas();
    }
  }

  function abrirCrear() {
    setEditando(null);
    setShowForm(true);
  }

  function abrirEditar(pelicula: Pelicula) {
    setEditando(pelicula);
    setShowForm(true);
  }

  function cerrarForm() {
    setShowForm(false);
    setEditando(null);
  }

  return (
    <main className="app">
      <Toolbar onNueva={abrirCrear} onBuscar={...} />
      {showForm ? (
        <Modal onCerrar={cerrarForm}>
          <PeliculaForm inicial={editando ?? undefined} onGuardar={onGuardar} onCancelar={cerrarForm} />
        </Modal>
      ) : (
        <PeliculaTable
          peliculas={peliculas}
          onEditar={abrirEditar}
          onEliminar={onEliminar}
        />
      )}
    </main>
  );
}
```

---

## 15.6. Eventos por props: `onEdit`, `onDelete`, `onSave`, `onClose`, `onSearch`

La comunicación hijo → padre se hace con **funciones pasadas como props**. Cada acción del CRUD tiene su prop:

| Prop | Tipo | Disparada desde |
| --- | --- | --- |
| `onNueva` | `() => void` | Toolbar (crear) |
| `onEditar` | `(p: Pelicula) => void` | Fila de la tabla (lápiz) |
| `onEliminar` | `(p: Pelicula) => void` | Fila de la tabla (papelera) |
| `onGuardar` | `(d: Omit<Pelicula, "id">) => void` | Formulario |
| `onCerrar` / `onCancelar` | `() => void` | Modal / Formulario |
| `onBuscar` | `(texto: string) => void` | Buscador |

Ejemplo en la fila de la tabla:

```tsx
interface PeliculaRowProps {
  pelicula: Pelicula;
  onEditar: (pelicula: Pelicula) => void;
  onEliminar: (pelicula: Pelicula) => void;
}

function borrar(e: MouseEvent<HTMLButtonElement>) {
  e.stopPropagation(); // no dispara el click de la fila
  onEliminar(pelicula);
}

<button onClick={borrar} aria-label={`Borrar ${pelicula.titulo}`}>🗑</button>
```

> [!IMPORTANT]
> El flujo es siempre: **hijo emite evento (prop) → App decide → App pasa datos de vuelta por props**. Así la fuente de la verdad nunca se duplica.

---

## 15.7. Peticiones asíncronas con `fetch` + `async/await`

Fuera de Tauri (sin puente Rust) o para probar contra una API web, AppCine usa `fetch` con los estados de carga, acierto y error (los 5 estados vistos en la unidad 11):

```tsx
async function listarPeliculas(): Promise<Pelicula[]> {
  const respuesta = await fetch("http://localhost:8080/api/peliculas");

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
  }

  return (await respuesta.json()) as Pelicula[];
}
```

En el componente, el estado registra los 3 estados visuales:

```tsx
const [cargando, setCargando] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  async function cargar() {
    try {
      const datos = await listarPeliculas();
      setPeliculas(datos);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setCargando(false);
    }
  }
  cargar();
}, []);

if (cargando) return <Spinner />;
if (error) return <p className="error">{error}</p>;
```

> [!NOTE]
> En Tauri este `fetch` se sustituye por `invoke("listar_peliculas")`, que también devuelve una `Promise`. Todo lo aprendido de estados y errores se mantiene igual.

---

## 15.8. Patrón modal: overlay + panel

El modal es un patrón fijo: **overlay** (fondo oscurecido) + **panel** (ventana). Se cierra con ESC o clic fuera.

```tsx
interface ModalProps {
  onCerrar: () => void;
  children: ReactNode;
}

export function Modal({ onCerrar, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  function clicFuera(e: MouseEvent) {
    if (overlayRef.current !== null && e.target === overlayRef.current) {
      onCerrar();
    }
  }

  return (
    <div className="overlay" ref={overlayRef} onClick={clicFuera}>
      <div className="panel">
        <button className="cerrar" onClick={onCerrar} aria-label="Cerrar">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
```

El cierre con ESC (unidad 15.2.2) ya funciona desde `App`. El `ref` al overlay permite distinguir "clic dentro" de "clic fuera".

---

## 15.9. Debounce en la búsqueda

El debounce evita lanzar una petición por cada tecla: espera 300 ms desde la última pulsación.

```tsx
const [termino, setTermino] = useState("");
const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

function buscar(texto: string) {
  setTermino(texto);

  if (timeoutRef.current !== null) {
    clearTimeout(timeoutRef.current);
  }

  timeoutRef.current = setTimeout(async () => {
    if (texto.trim() === "") {
      fetchPeliculas();
    } else {
      const resultado = await api.buscarPeliculas(texto);
      setPeliculas(resultado);
    }
  }, 300);
}
```

> [!TIP]
> `useRef` guarda el id del timer entre renders pero sin provocar re-renders: es el lugar correcto para un debounce.

---

## 15.10. Formulario: modo crear vs modo editar

El mismo formulario sirve para **crear** y **editar** según si `editando` es `null` o no. Dos señales:

1. **`editando`**: qué película se edita (o `null` para crear).
2. **`inicial`**: los valores precargados que recibe `PeliculaForm`.

```tsx
interface PeliculaFormProps {
  inicial?: Partial<Pelicula>;
  onGuardar: (datos: Omit<Pelicula, "id">) => void;
  onCancelar: () => void;
}

export function PeliculaForm({ inicial = {}, onGuardar, onCancelar }: PeliculaFormProps) {
  const [titulo, setTitulo] = useState(inicial.titulo ?? "");
  const [genero, setGenero] = useState(inicial.genero ?? "");
  const [anio, setAnio] = useState(String(inicial.anio ?? ""));
  const [director, setDirector] = useState(inicial.director ?? "");
  const [puntuacion, setPuntuacion] = useState(String(inicial.puntuacion ?? "0"));

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onGuardar({
      titulo: titulo.trim(),
      genero: genero.trim(),
      anio: Number.parseInt(anio, 10),
      director: director.trim(),
      puntuacion: Number.parseFloat(puntuacion),
    });
  }

  return (
    <form onSubmit={enviar}>
      {/* ... inputs controlados igual que en la unidad 14 ... */}
      <button type="submit">{inicial?.titulo ? "Guardar cambios" : "Añadir película"}</button>
      <button type="button" onClick={onCancelar}>Cancelar</button>
    </form>
  );
}
```

```tsx
// En App:
<PeliculaForm
  inicial={editando ?? undefined}
  onGuardar={onGuardar}
  onCancelar={cerrarForm}
/>
```

> [!NOTE]
> Al montar el formulario, `useState(inicial.titulo ?? "")` precarga los datos. Como el modal se desmonta al cerrar (renderizado condicional), cada apertura reinicia el formulario con los datos correctos.

---

## 15.11. Prácticas

- **P1.** Cargar películas desde la API en `useEffect` y mostrar spinner + estado vacío.
- **P2.** CRUD completo (crear, editar, borrar) llamando a la API desde `App`.
- **P3.** Modal que se abre con "Nueva película" y con el lápiz de edición; cierre con ESC y clic fuera.
- **P4.** Búsqueda con debounce de 300 ms contra `/buscar`.
- **P5.** Refactor a comandos Tauri: sustituir `fetch` por `invoke("listar_peliculas")` etc.

---

### 📦 En el repositorio (`repos/02-react-componentes/src/components/ListaUsuarios.tsx`)


```tsx
/**
 * ListaUsuarios.tsx - useEffect con TypeScript
 * Fuente: Sesión 04 - useEffect con TypeScript
 * Fetch de usuarios desde jsonplaceholder
 */
import { useState, useEffect } from 'react';

interface Usuario {
    id: number;
    name: string;
    email: string;
}

function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/users");
                if (!res.ok) throw new Error("Error en la petición");
                const data: Usuario[] = await res.json();
                setUsuarios(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setCargando(false);
            }
        };
        fetchUsuarios();
    }, []);

    if (cargando) return <p>Cargando...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <ul className="space-y-2">
            {usuarios.map(u => (
                <li key={u.id} className="bg-gray-100 p-3 rounded">
                    <strong>{u.name}</strong> - {u.email}
                </li>
            ))}
        </ul>
    );
}

export default ListaUsuarios;
```

> ▶ **Cómo probarlo en el repositorio:** dentro de `repos/02-react-componentes/` ejecuta `npm run dev` y abre la app de Vite para ver este ejemplo (se usa en `src/App.tsx`).


### 📦 En el repositorio (`repos/02-react-componentes/src/components/Modal.tsx`)


```tsx
/**
 * Modal.tsx - Componente Modal
 * Fuente: Sesión 07 - Creación de Componentes Personalizados
 * Modal con abierto/onCerrar/titulo/children, useEffect para body overflow
 */
import { ReactNode, useEffect } from 'react';

interface ModalProps {
    abierto: boolean;
    onCerrar: () => void;
    titulo: string;
    children: ReactNode;
    tamano?: "sm" | "md" | "lg";
}

function Modal({ abierto, onCerrar, titulo, children, tamano: _tamano = "md" }: ModalProps) {
    useEffect(() => {
        if (abierto) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [abierto]);

    if (!abierto) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" onClick={onCerrar}></div>
            <div className={`relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6`}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">{titulo}</h2>
                    <button onClick={onCerrar}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;
```

> ▶ **Cómo probarlo en el repositorio:** dentro de `repos/02-react-componentes/` ejecuta `npm run dev` y abre la app de Vite para ver este ejemplo (se usa en `src/App.tsx`).


### 📦 En el repositorio (`repos/02-react-componentes/src/state/useReducerEjemplo.tsx`)


```tsx
/**
 * useReducerEjemplo.tsx - Estado con useReducer
 * Fuente: Sesión 05 - Estado con useReducer
 * Contador con INCREMENTAR/DECREMENTAR/RESETEAR
 */
import { useReducer } from 'react';

interface ContadorState {
    valor: number;
    incrementos: number;
}

type Accion =
    | { type: "INCREMENTAR"; payload: number }
    | { type: "DECREMENTAR" }
    | { type: "RESETEAR" };

function reducer(state: ContadorState, action: Accion): ContadorState {
    switch (action.type) {
        case "INCREMENTAR":
            return {
                valor: state.valor + action.payload,
                incrementos: state.incrementos + 1
            };
        case "DECREMENTAR":
            return { ...state, valor: state.valor - 1 };
        case "RESETEAR":
            return { valor: 0, incrementos: 0 };
        default:
            return state;
    }
}

function Contador() {
    const [state, dispatch] = useReducer(reducer, { valor: 0, incrementos: 0 });

    return (
        <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">{state.valor}</h2>
            <p>Incrementos totales: {state.incrementos}</p>
            <div className="space-x-2">
                <button onClick={() => dispatch({ type: "INCREMENTAR", payload: 1 })}
                    className="bg-blue-500 text-white px-4 py-2 rounded">+1</button>
                <button onClick={() => dispatch({ type: "DECREMENTAR" })}
                    className="bg-red-500 text-white px-4 py-2 rounded">-1</button>
                <button onClick={() => dispatch({ type: "RESETEAR" })}
                    className="bg-gray-500 text-white px-4 py-2 rounded">Reset</button>
            </div>
        </div>
    );
}

export default Contador;
```

> ▶ **Cómo probarlo en el repositorio:** dentro de `repos/02-react-componentes/` ejecuta `npm run dev` y abre la app de Vite para ver este ejemplo (se usa en `src/App.tsx`).


---

[Volver al índice general](../../index.md)