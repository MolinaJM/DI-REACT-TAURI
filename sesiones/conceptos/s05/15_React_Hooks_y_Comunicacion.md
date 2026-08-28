# 15. React: hooks, ciclo de vida y comunicación entre componentes 📝 🖥️

- [15. React: hooks, ciclo de vida y comunicación entre componentes 📝 🖥️](#15-react-hooks-ciclo-de-vida-y-comunicación-entre-componentes-️)
  - [1. `useState`: el estado local](#1-usestate-el-estado-local)
  - [2. `useEffect`: carga de datos y suscripciones](#2-useeffect-carga-de-datos-y-suscripciones)
    - [2.1 Carga inicial de datos](#21-carga-inicial-de-datos)
    - [2.2 Suscripción a eventos y cleanup](#22-suscripción-a-eventos-y-cleanup)
  - [3. `useCallback` y dependencias](#3-usecallback-y-dependencias)
  - [4. `useRef`: timers y referencias al DOM](#4-useref-timers-y-referencias-al-dom)
  - [5. Lifting state up: App como fuente de la verdad](#5-lifting-state-up-app-como-fuente-de-la-verdad)
  - [6. Eventos por props: `onEdit`, `onDelete`, `onSave`, `onClose`, `onSearch`](#6-eventos-por-props-onedit-ondelete-onsave-onclose-onsearch)
  - [7. Peticiones asíncronas con `fetch` + `async/await`](#7-peticiones-asíncronas-con-fetch--asyncawait)
  - [8. Patrón modal: overlay + panel](#8-patrón-modal-overlay--panel)
  - [9. Debounce en la búsqueda](#9-debounce-en-la-búsqueda)
  - [10. Formulario: modo crear vs modo editar](#10-formulario-modo-crear-vs-modo-editar)
  - [11. Prácticas](#11-prácticas)

Objetivo: gestionar datos asíncronos, coordinar componentes y montar el CRUD completo de AppCine con hooks y props.

> [!IMPORTANT]
> Los hooks (funciones que empiezan por `use`) solo se llaman en el nivel superior del componente y siempre en el mismo orden. Nunca dentro de bucles o condicionales.

---

## 1. `useState`: el estado local

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

## 2. `useEffect`: carga de datos y suscripciones

El efecto permite ejecutar código "después del render". Su segundo argumento (`dependencias`) decide cuándo se vuelve a ejecutar.

### 2.1 Carga inicial de datos

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

### 2.2 Suscripción a eventos y cleanup

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

## 3. `useCallback` y dependencias

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

## 4. `useRef`: timers y referencias al DOM

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

## 5. Lifting state up: App como fuente de la verdad

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

## 6. Eventos por props: `onEdit`, `onDelete`, `onSave`, `onClose`, `onSearch`

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

## 7. Peticiones asíncronas con `fetch` + `async/await`

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

## 8. Patrón modal: overlay + panel

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

## 9. Debounce en la búsqueda

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

## 10. Formulario: modo crear vs modo editar

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

## 11. Prácticas

- **P1.** Cargar películas desde la API en `useEffect` y mostrar spinner + estado vacío.
- **P2.** CRUD completo (crear, editar, borrar) llamando a la API desde `App`.
- **P3.** Modal que se abre con "Nueva película" y con el lápiz de edición; cierre con ESC y clic fuera.
- **P4.** Búsqueda con debounce de 300 ms contra `/buscar`.
- **P5.** Refactor a comandos Tauri: sustituir `fetch` por `invoke("listar_peliculas")` etc.

---

[Volver al índice general](../../index.md)