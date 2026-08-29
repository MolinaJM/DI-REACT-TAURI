# Sesión 5: Gestión de Estado Básico y Tipado de Formularios

useState, useReducer, formularios controlados y validación

[← Volver al Índice](index.md)

---

> 📚 **Apuntes de la sesión:** [A15 · Hooks, ciclo de vida y comunicación](apuntes/s05/15_React_Hooks_y_Comunicacion.md). Código ejecutable: [`repos/02-react-componentes`](../repos/02-react-componentes/).

## Estado con useReducer

> 📦 **Este código está en el repositorio:** `repos/02-react-componentes/src/state/useReducerEjemplo.tsx` (idéntico; el fichero real añade `export default Contador`)

```tsx
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
```

## Formulario Controlado con Tipado

> 📦 **Este código está en el repositorio:** `repos/02-react-componentes/src/state/FormularioRegistro.tsx` (idéntico; el fichero real añade `export default FormularioRegistro` y usa "inválido"/"años" con tilde)

```tsx
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
            nuevosErrores.email = "Email invalido";
        }
        if (Number(form.edad) < 18) {
            nuevosErrores.edad = "Debes ser mayor de 18 anios";
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
```

## localStorage: persistencia en el navegador

> 📦 **El código de los apartados de esta sección ("Operaciones básicas", "Guardar y recuperar objetos (JSON)", "sessionStorage", "Gestión de estado con localStorage" y "Seguridad") está en el repositorio:** `repos/02-react-componentes/src/state/localStorage.ts` (el fichero unifica todos los ejemplos y exporta las funciones; algunas sentencias están comentadas)

### Operaciones básicas

```typescript
// Guardar
localStorage.setItem("nombre", "Ana");

// Leer
const nombre = localStorage.getItem("nombre"); // string | null

// Eliminar
localStorage.removeItem("nombre");

// Limpiar todo
localStorage.clear();

// Número de elementos
console.log(localStorage.length);

// Iterar
for (let i = 0; i < localStorage.length; i++) {
  const clave = localStorage.key(i)!;
  console.log(clave, localStorage.getItem(clave));
}
```

### Guardar y recuperar objetos (JSON)

```typescript
interface UsuarioPersistente {
  id: string;
  nombre: string;
  ultimoAcceso: string;
}

function guardarUsuario(usuario: UsuarioPersistente): void {
  localStorage.setItem(`usuario:${usuario.id}`, JSON.stringify(usuario));
}

function obtenerUsuario(id: string): UsuarioPersistente | null {
  const raw = localStorage.getItem(`usuario:${id}`);
  if (!raw) return null;
  return JSON.parse(raw) as UsuarioPersistente;
}

const usuario: UsuarioPersistente = {
  id: crypto.randomUUID(),
  nombre: "María",
  ultimoAcceso: new Date().toISOString(),
};

guardarUsuario(usuario);
const recuperado = obtenerUsuario(usuario.id);
console.log(recuperado?.nombre); // "María"
```

### sessionStorage

```typescript
// sessionStorage es idéntico a localStorage pero se borra al cerrar la pestaña
sessionStorage.setItem("temporal", "dato efímero");
console.log(sessionStorage.getItem("temporal"));
```

### Gestión de estado con localStorage

```typescript
type Filtro = "todas" | "pendientes" | "completadas";

interface EstadoApp {
  tareas: Tarea[];
  filtro: Filtro;
}

function cargarEstado(): EstadoApp {
  const raw = localStorage.getItem("estado-app");
  if (!raw) return { tareas: [], filtro: "todas" };
  return JSON.parse(raw) as EstadoApp;
}

function guardarEstado(estado: EstadoApp): void {
  localStorage.setItem("estado-app", JSON.stringify(estado));
}

// Uso
let estado = cargarEstado();
estado = {
  ...estado,
  tareas: [...estado.tareas, { id: crypto.randomUUID(), texto: "Nueva tarea", estado: "pendiente" }],
};
guardarEstado(estado);
```

### Seguridad: no almacenar tokens sensibles

> ⚠️ localStorage es accesible desde cualquier script en la misma página. No almacenes tokens JWT, contraseñas ni datos sensibles. Para autenticación segura usa cookies `HttpOnly` + `Secure` + `SameSite`.

```typescript
// ❌ Inseguro
localStorage.setItem("token", jwtToken);

// ✅ Seguro: cookie HttpOnly (solo el servidor la lee)
document.cookie = "session=token123; HttpOnly; Secure; SameSite=Strict; Path=/";
```

## Gestión de estado con patrones funcionales

Patrón reducer (inmutable) similar a React useReducer, implementado en TypeScript puro.

### Estado inicial y tipos

```typescript
type Filtro = "todas" | "pendientes" | "completadas";

interface Tarea {
  id: string;
  texto: string;
  completada: boolean;
}

interface Estado {
  tareas: Tarea[];
  filtro: Filtro;
  cargando: boolean;
  error: string;
}

function crearEstadoInicial(): Estado {
  return {
    tareas: [],
    filtro: "todas",
    cargando: false,
    error: "",
  };
}
```

### Operaciones inmutables

```typescript
function agregarTarea(estado: Estado, texto: string): Estado {
  const textoLimpio = texto.trim();
  if (!textoLimpio) return estado;

  return {
    ...estado,
    tareas: [
      ...estado.tareas,
      {
        id: crypto.randomUUID(),
        texto: textoLimpio,
        completada: false,
      },
    ],
  };
}

function cambiarFiltro(estado: Estado, filtro: Filtro): Estado {
  return { ...estado, filtro };
}

function actualizarTarea(
  estado: Estado,
  id: string,
  cambios: Partial<Pick<Tarea, "texto" | "completada">>
): Estado {
  return {
    ...estado,
    tareas: estado.tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, ...cambios } : tarea
    ),
  };
}

function obtenerTareasVisibles(estado: Estado): Tarea[] {
  switch (estado.filtro) {
    case "pendientes":
      return estado.tareas.filter((t) => !t.completada);
    case "completadas":
      return estado.tareas.filter((t) => t.completada);
    default:
      return estado.tareas;
  }
}
```

### Pruebas del patrón de estado

```typescript
// Simula las aserciones de los autocorregibles
const estadoBase = crearEstadoInicial();
console.assert(estadoBase.tareas.length === 0, "Estado inicial sin tareas");

const estadoConTarea = agregarTarea(estadoBase, "  Estudiar React  ");
console.assert(estadoBase.tareas.length === 0, "Original inmutable");
console.assert(estadoConTarea.tareas.length === 1, "Nueva tarea agregada");
console.assert(estadoConTarea.tareas[0].texto === "Estudiar React", "Texto sin espacios");

const filtrado = cambiarFiltro(estadoConTarea, "pendientes");
console.assert(filtrado.filtro === "pendientes", "Filtro cambiado");
console.assert(estadoConTarea.filtro === "todas", "Original inmutable");

const actualizado = actualizarTarea(
  estadoConTarea,
  estadoConTarea.tareas[0].id,
  { completada: true }
);
console.assert(actualizado.tareas[0].completada === true, "Tarea completada");
console.assert(estadoConTarea.tareas[0].completada === false, "Original inmutable");

console.log("✅ Todos los tests de estado pasaron");
```

---

[Índice](index.md) [S0](sesion00.md) [S1](sesion01.md) [S2](sesion02.md) [S3](sesion03.md) [S4](sesion04.md) [S5](sesion05.md) [S6](sesion06.md) [S7](sesion07.md) [S8](sesion08.md) [S9](sesion09.md) [S10](sesion10.md) [S11](sesion11.md) [S12](sesion12.md)
