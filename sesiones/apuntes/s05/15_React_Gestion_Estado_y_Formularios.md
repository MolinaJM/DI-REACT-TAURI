<a id="15-react-gestión-de-estado-y-tipado-de-formularios"></a>
# 15. React: gestión de estado y tipado de formularios 📝 🖥️

- [15. React: gestión de estado y tipado de formularios 📝 🖥️](#15-react-gestión-de-estado-y-tipado-de-formularios)
  - [15.1. Peticiones asíncronas con `fetch` + `async/await`](#151-peticiones-asíncronas-con-fetch-asyncawait)
    - [15.1.1 Cliente `api`: GET, POST, PUT y DELETE](#1511-cliente-api-get-post-put-y-delete)
  - [15.2. `useEffect`: carga de datos y suscripciones](#152-useeffect-carga-de-datos-y-suscripciones)
    - [15.2.1 Carga inicial de datos](#1521-carga-inicial-de-datos)
  - [15.3. Lifting state up: App como fuente de la verdad](#153-lifting-state-up-app-como-fuente-de-la-verdad)
  - [15.4. Eventos por props: `onEditar`, `onBorrar`, `onGuardar`, `onCerrar`, `onBuscar`](#154-eventos-por-props-oneditar-onborrar-onguardar-oncerrar-onbuscar)
  - [15.5. Patrón modal: overlay + panel](#155-patrón-modal-overlay-panel)
  - [15.6. Formulario controlado con validación: `FormularioRegistro`](#156-formulario-controlado-con-validación-formularioregistro)
  - [15.7. El buscador: filtrado y debounce](#157-el-buscador-filtrado-y-debounce)
  - [15.8. `localStorage`: persistencia en el navegador](#158-localstorage-persistencia-en-el-navegador)
  - [15.9. Prácticas](#159-prácticas)


Objetivo: **gestionar tipos de estado** (local y persistido), **tipar formularios** controlados con **validación**, **coordinar componentes** y montar el **CRUD completo** de AppCine con hooks y props.

> [!TIP]
> **🆕 Lo nuevo en esta sesión (sobre lo ya visto en los apuntes 13), en el orden en que se enseña:**
> - `fetch` + `AbortController` aplicado al CRUD (ya visto en 12, ahora en la app) — §15.1
> - **Patrón modal** (overlay + panel, con Escape y click-outside) — §15.5
> - **Validación de campos** — §15.6
> - **Debounce** con `useRef` de timer (buscador) — §15.7
> - `localStorage` — **persistencia** (`JSON.parse`/`stringify`, init perezoso) — §15.8

> 🧱 **Esta sesión evoluciona la AppCine, pasamos de CRUD en memoria a una app con backend: [`repos/02-react-ejemplo-pelis-api`](../../../repos/02-react-ejemplo-pelis-api/). Esto es lo que añade o sustituye:

| Qué cambia en 15 | Antes (13 · `02-react-ejemplo-pelis`) | Ahora (15 · `02-react-ejemplo-pelis-api`) |
|---|---|---|
| **Datos** | Array fijo `LISTA_PELICULAS` en memoria | `fetch` a `json-server` (`peliculas.json`) vía cliente `api` — §15.1.1 |
| **CRUD** | Handlers síncronos, `id: Date.now()` | `api.crear/actualizar/eliminar` async, `id` del servidor — §15.1 |
| **Carga inicial** | Ninguna | `useEffect` + tres estados (`peliculas`/`cargando`/`error`) — §15.2 |
| **Handlers** | Funciones simples | Eventos por props — §15.4 |
| **Formulario** | Incrustado en la página | En `Modal` (overlay + panel) — §15.5 |
| **Búsqueda** | — (sin buscador) | Buscador controlado + filtro en render + `debounce` con `useRef` — §15.7 |

Se mantienen de 13: `tipos.ts` (§13.1), `PeliculaRow` (§13.2), `colorGenero.ts` (§13.3.1) y `PeliculaForm` (§13.4/§13.6.2/§13.7).

---

<a id="151-peticiones-asíncronas-con-fetch-asyncawait"></a>
## 15.1. Peticiones asíncronas con `fetch` + `async/await`

En AppCine usamos `fetch` manejando los estados de carga, éxito y error. Este fetch es exactamente igual que el del §12.1.3 (ListaAlumnos); lo único que cambia es la URL (http://localhost:3000/peliculas).

Esto funciona perfectamente para hacer de todo porque por debajo tenemos json-server, que levanta una API REST completa  a partir de un simple archivo JSON. Gracias a esto, ya viene preparado de fábrica para atender peticiones **GET, POST, PUT y DELETE** automáticamente, comportándose como un servidor real mientras desarrollamos.

### 15.1.1 Cliente `api`: GET, POST, PUT y DELETE

Para manejar la api usaremos un helper (una función auxiliar) genérico **`peticion<T>`** repite **una sola vez** el `fetch`, los `headers` y el check de `res.ok`; cada método del `api` solo aporta su `method`/`body` (o el `signal`). *POST* envía datos para inserción. *PUT* reemplaza el recurso completo; si solo cambias algunos campos, json-server también acepta *PATCH*. *DELETE* borra el recurso (y devuelve `204`, sin body).

En un hipotético examen esto se daría hecho.

```tsx
const URL_PELICULAS = "http://localhost:3000/peliculas";

// Un único helper genérico <T>: el fetch, los headers y el check de res.ok se escriben una vez
//-los headers indican el formato en el que viajan los datos (ej: JSON)
//-RequestInit se usa para tipar el objeto de configuración
//que se le suele pasar a fetch. Contiene: method (POST, PUT, GET...), headers, body, etc

async function peticion<T>(url: string, opciones?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...opciones, // method / body / signal los aporta cada llamada
  });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  if (res.status === 204) return undefined as T; // 204 == No Content. DELETE por ejemplo no devuelve body. 
  return (await res.json()) as T;
}

export const api = {
  //Indicamos que se le podría pasar una señal tipo AbortSignal
  listar: (signal?: AbortSignal) => peticion<Pelicula[]>(URL_PELICULAS, { signal }),

  crear: (datos: NuevaPelicula) =>
    peticion<Pelicula>(URL_PELICULAS, {
      method: "POST",
      body: JSON.stringify(datos),
    }),

  actualizar: (id: number, datos: NuevaPelicula) =>
    peticion<Pelicula>(`${URL_PELICULAS}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...datos, id }),
    }),

  eliminar: (id: number) =>
    peticion<unknown>(`${URL_PELICULAS}/${id}`, { method: "DELETE" }),
};
```


En el componente, el estado registra los 3 estados visuales (`cargando`/`error`/`datos`) y el render condicional (`if (cargando) return <p>Cargando…</p>` / `if (error) return ...`) es el mismo que el **§12.1.3** (Ejemplo de ALUMNOS); aquí solo cambia que la carga va por `api.listar()` y el `useEffect` lleva la dependencia `[recargar]` (§15.2.1).

> [!NOTE]
> En Tauri este `fetch` se sustituye por `invoke("listar_peliculas")`, que también devuelve una `Promise`. Todo lo aprendido de estados y errores se mantiene igual.

> [!TIP]
> **Ejemplo corriendo:** el cliente `api` de este apartado está en [`repos/02-react-ejemplo-pelis-api/src/api.ts`](../../../repos/02-react-ejemplo-pelis-api/src/api.ts), usado por `App` con `useEffect` y el patrón modal (§15.5). Es la evolución de la app del apunte 13; ver la tabla del inicio del capítulo.

---

## 15.2. `useEffect`: carga de datos y suscripciones

Como ya sabemos, el efecto permite ejecutar código "después del render" y  (`dependencias`) decide cuándo se vuelve a ejecutar.

### 15.2.1 Carga inicial de datos

> 💡 **¿Cómo haríamos para...?** traer las películas de la API un golpe al montar el componente y, además, cancelar la petición si el componente se desmonta antes de que llegue la respuesta?

El patrón de carga —`useEffect` + `AbortController` + estados `cargando`/`error` + cleanup— es el mismo que el **§12.1.3** (`ListaAlumnos`); aquí solo cambia que la petición va por el cliente `api.listar(signal)` (§15.1.1) en vez de `fetch` directo.

El resto de estados de UI nacen con cada patrón: la carga y su error en §15.2, el estado del modal en §15.5 y el del buscador en §15.6 (los del formulario ya se explicaron en el apunte 13).

> 💡 El cliente `api` (con `listar`, `crear`, `actualizar` y `eliminar`) se define en §15.2.1.

**Delta $\Delta$ * nuevo — recargar tras mutar:** para volver a lanzar la carga tras cada POST/PUT/DELETE sin duplicar la lógica de `fetch`, se usa un **contador** como dependencia: el efecto depende de `[recargar]` y cada mutación lo incrementa. La primera carga ocurre al montar (valor inicial `0`).

*Curiosidad: históricamente, los matemáticos empezaron a usar la D para mostrar la diferencia de una medida, luego se pasó a la letra griega $\Delta$. De ahí, que se use para mostrar el cambio con respecto a algo. Eje: Time.deltaTime en Unity.  

```tsx
const [recargar, setRecargar] = useState(0);

useEffect(() => {
  // ...misma carga de §12.1.3, pero con api.listar(controller.signal)...
}, [recargar]);

// tras un POST/PUT/DELETE:
setRecargar(n => n + 1);
```

> [!NOTE]
> El contador no se pinta en el JSX: solo existe para que cambie la dependencia y se repita el efecto. Alternativa: extraer la carga a una función y llamarla directamente tras cada mutación, aunque NO es lo más efectivo (duplica el `try/catch`).

> 📦 **En el proyecto:** [`App.tsx`](../../../repos/02-react-ejemplo-pelis-api/src/App.tsx) implementa exactamente este efecto: tres estados separados (`peliculas`, `cargando`, `error`), `useEffect` con `AbortController` y dependencia `[recargar]`. [`api.ts`](../../../repos/02-react-ejemplo-pelis-api/src/api.ts) expone `listar(signal?)`.

> 💡 El cleanup del efecto reaparece en el **patrón modal** (§15.5): ahí se suscribe el listener de `Escape` y se restaura el scroll del `body`, ambos con su función de limpieza.

---

---

## 15.3. Lifting state up: App como fuente de la verdad

Como ya sabemos, cuando varios componentes necesitan el mismo dato, el estado **sube** al componente común más cercano (`App`). Los hijos reciben el dato por props y avisan con callbacks:

> 💡 **¿Cómo haríamos para...?** compartir la lista de películas entre la tabla, el buscador y el formulario, de forma que todas lean/escriban la misma fuente (App)?

La estructura de `App` (estado + tabla + JSX) ya se montó en los apuntes **§13.8**; aquí el **delta**/$\Delta$: los handlers que manejan los datos pasan a ser **async** (llaman a `api`, gestionan `guardando`/`error` y recargan) y el formulario ahora vive dentro de un `Modal` controlado por `modalAbierto`/`enEdicion`:


```tsx
//App.tsx

// Delta sobre §13.8: handlers async + estado del modal
// Mezclamos function con const => por variar...
function abrirCrear() {
  setEnEdicion(null);
  setModalAbierto(true);
};

const abrirEditar = (pelicula: Pelicula) => {
  setEnEdicion(pelicula);
  setModalAbierto(true);
};

const cerrarModal = () => {
  setModalAbierto(false);
  setEnEdicion(null);
};

const guardar = async (datos: NuevaPelicula) => {
  setGuardando(true);//DESACTIVA BOTONES Aceptar/Cancelar de Form (Previene errores)
  setError(null);
  try {
    if (enEdicion) {
      await api.actualizar(enEdicion.id, datos);
    } else {
      await api.crear(datos);
    }
    cerrarModal();
    setRecargar((n) => n + 1); // recarga tras mutar (§15.2.1)
  } catch (err) {
    setError((err as Error).message);
  } finally {
    setGuardando(false);//VUELVE A ACTIVAR BOTONES (Previene errores)
  }
};
```

En el JSX **la tabla siempre se pinta** (con sus `PeliculaRow`); el `Modal` se coloca al final y se oculta él solo (`if (!abierto) return null`, §15.5) — no hay ternario que la esconda:

```tsx
// JSX: el formulario ya no va incrustado, va dentro del Modal
<Modal
  abierto={modalAbierto}//controla visibilidad
  titulo={enEdicion ? "Editar película" : "Nueva película"}
  onCerrar={cerrarModal}
>
  <PeliculaForm
    key={enEdicion?.id ?? "nueva"}
    inicial={enEdicion ?? undefined}
    modo={enEdicion ? "editar" : "crear"}
    guardando={guardando}
    onGuardar={guardar}
    onCancelar={cerrarModal}
  />
</Modal>
```

> 📦 **En el proyecto:** [`App.tsx`](../../../repos/02-react-ejemplo-pelis-api/src/App.tsx) es la fuente de la verdad (`peliculas`, `enEdicion`, `modalAbierto`) y pasa `onEditar`/`onBorrar` a `PeliculaRow` y `onGuardar` a `PeliculaForm`.

---

## 15.4. Eventos por props: `onEditar`, `onBorrar`, `onGuardar`, `onCerrar`, `onBuscar`

La comunicación hijo → padre se hace con **funciones pasadas como props**. Cada acción del CRUD tiene su prop:

| Prop | Tipo | Disparada desde |
| --- | --- | --- |
| `onEditar` | `(id: number) => void` | Fila de la tabla (lápiz) — §13.2 |
| `onBorrar` | `(id: number) => void` | Fila de la tabla (papelera) — §13.2 |
| `onGuardar` | `(d: Omit<Pelicula, "id">) => void` | Formulario |
| `onCancelar` | `() => void` | Formulario |
| `onCerrar` | `() => void` | Modal (×, overlay, Escape) |
| `onBuscar` | `(texto: string) => void` | Buscador — en 15 va inline; como prop llega con el `Buscador` de §16.1.1 |

Ejemplo real de la fila (§13.2): los botones llaman a la callback por `id`, inline y sin evento intermedio:

```tsx
<button onClick={() => onEditar(pelicula.id)}>Editar</button>{" "}
<button onClick={() => onBorrar(pelicula.id)}>Borrar</button>
```

> [!NOTE]
> En la app de 13 (§13.7.3) se vio `MouseEvent` + `stopPropagation` para botones dentro de filas clicable; como aquí **la fila no tiene `onClick` propio**, no hay nada que detener y el botón pasa el `id` directo. Si algún día la fila entera fuera clicable, ahí sí haría falta `stopPropagation`.

> [!IMPORTANT]
> El flujo es siempre: **hijo emite evento (prop) → App decide → App pasa datos de vuelta por props**. Así la fuente de la verdad nunca se duplica.

> 📦 **En el proyecto:** [`App.tsx`](../../../repos/02-react-ejemplo-pelis-api/src/App.tsx) define `abrirEditar`, `borrar`, `guardar` y `cerrarModal`, y se los pasa a [`PeliculaRow.tsx`](../../../repos/02-react-ejemplo-pelis-api/src/components/PeliculaRow.tsx) y [`PeliculaForm.tsx`](../../../repos/02-react-ejemplo-pelis-api/src/components/PeliculaForm.tsx).

---

<a id="155-patrón-modal-overlay-panel"></a>
## 15.5. Patrón modal: overlay + panel

El modal es un patrón fijo: **overlay** (fondo oscurecido) + **panel** (ventana). Se cierra con ESC o clic fuera.

Vamos a necesitar `useRef` el cual apunta a un elemento del DOM. Una vez tengo la referncia puedo llamar a sus propiedades o métodos. El más utilizado es `.current` que te da el valor actual de la referencia (se usa mucho con los Timers, se ve más abajo).

También vamos a usar por primera vez un `KeyboardEvent`. Se crea una función con un evento de este tipo como entrada y luego se asocia (suscribe) a la ventana mediante `window.addEventListener('evento',funcion)` . El mecanismo de suscripción de eventos es análogo en otros lenguajes.

> 💡 **¿Cómo haríamos para...?** construir un modal reutilizable que reciba el contenido por `children`, se cierre al clicar el fondo, con `Escape` y restaurando el scroll al cerrarse?

```tsx
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface ModalProps {
  abierto: boolean;//controla visibilidad
  onCerrar: () => void;
  children: ReactNode;
}

export function Modal({ abierto, onCerrar, children }: ModalProps) {
  //Creamos una referencia "puntero" a un elemento del DOM
  //El valor se asocia al hacer: ref={overlayRef} 
  const overlayRef = useRef<HTMLDivElement | null>(null);

 //Bloquea el scroll del documento cuando el modal está abierto y lo restaura al cerrarse.
  //Cleanup: restaura el scroll del body al cerrar o desmontar
  useEffect(() => {
    if (!abierto) return;
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { //cleanup
      document.body.style.overflow = overflowAnterior;
    };
  }, [abierto]);

  // Tecla de Escape: cierra el modal; el listener se limpia al desmontar
  useEffect(() => {
    if (!abierto) return;
    function teclaEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onCerrar();
    }
    window.addEventListener("keydown", teclaEsc);
    return () => window.removeEventListener("keydown", teclaEsc);
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  return (
    <div className="overlay">
      <div
        className="fondo"
        ref={overlayRef}
        onClick={(e) => {
          // solo cierra si el clic cae sobre el overlay, no sobre el panel
          if (e.target === overlayRef.current) onCerrar();
        }}
      />
      <div className="panel">{children}</div>
    </div>
  );
}
```

---

<a id="156-formulario-controlado-con-validación-formularioregistro"></a>
## 15.6. Formulario controlado con validación: `FormularioRegistro`

Un **formulario controlado** es aquel cuyo valor no lo guarda el navegador, sino el **estado de React**: cada control tiene su `value`/`checked` ligado al estado y, en cada cambio, `onChange` actualiza ese estado. Así React es siempre la fuente de la verdad y puedes validar antes de enviar.

> 🧭 **Por qué este apartado se sale del dominio AppCine:** todos los ejemplos de estos apuntes usan el dominio de películas y su código está aplicado en los repos. Este es el **único ejemplo deliberado en otro dominio**: un formulario de *registro* permite recorrer **todos los tipos de control** (`email`, `password`, `radio`, `checkbox`, `textarea`…) que un formulario de película no puede mostrar — una película no tiene email ni checkbox. Lo que se enseña aquí es el **mecanismo** (formulario controlado + validación con `ErroresForm`), que es exactamente el que aplica [`PeliculaForm.tsx`](../../../repos/02-react-ejemplo-pelis-api/src/components/PeliculaForm.tsx) en la app (ver la nota 📦 tras el bloque de código); solo cambia el dominio para poder enseñar el catálogo completo de controles.

Este ejemplo recorre **todos los controles básicos**:

| Control | Peculiaridad |
| --- | --- |
| `text` / `email` / `password` / `number` | `value` + `onChange` |
| `select` + `option` | igual que un input: `value` + `onChange` |
| `textarea` | igual que un input: `value` + `onChange` (en HTML el contenido va entre etiquetas; en React se controla con `value`) |
| `radio` (grupo con mismo `name`) | `checked` se **deriva** del estado; el `onChange` aporta el `value` |
| `checkbox` | se controla con `checked`, no con `value` |
| `button type="submit"` / `type="button"` | solo el `submit` envía el `form`; "Limpiar" restaura los valores iniciales sin enviar nada |

- `FormData` modela `edad` como `number | string` (el input empieza vacío) y `plan` como **unión de literales**. 
- Los `label` se asocian a su control mediante un `htmlFor` + `id`.   
- `ErroresForm` es `Partial<Record<keyof FormData, string>>` ¿por qué ? Necesito guardar 1 único mensaje de error por campo. `keyof` me da cada campo, creo un Record con campo-mensaje, y por último lo tipo como Partial dado que, en el mejor de los casos todos los campos serán opcionales (formulario válido.)

> 📦 **Fichero del repo (versión con `useForm`):** [`repos/02-react-componentes/src/state/FormularioRegistro.tsx`](../../../repos/02-react-componentes/src/state/FormularioRegistro.tsx). 

```tsx
import { useState } from 'react';
import type { ChangeEvent, SubmitEvent } from 'react';

interface FormData {
    nombre: string;
    email: string;
    password: string;
    edad: number | string;
    pais: string;
    plan: "gratuito" | "premium";
    comentarios: string;
    terminos: boolean;
}

type ErroresForm = Partial<Record<keyof FormData, string>>;

const VALORES_INICIALES: FormData = {
    nombre: "",
    email: "",
    password: "",
    edad: "",
    pais: "es",
    plan: "gratuito",
    comentarios: "",
    terminos: false
};

function FormularioRegistro() {
    const [valores, setValores] = useState<FormData>(VALORES_INICIALES);
    const [errores, setErrores] = useState<ErroresForm>({});

    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setValores(v => ({ ...v, [name]: type === "checkbox" ? checked : value }) as FormData);
    }

    function validar(v: FormData): ErroresForm {
        const nuevosErrores: ErroresForm = {};
        if (!v.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
        if (!v.email.includes("@")) nuevosErrores.email = "Email inválido";
        if (!v.password || v.password.length < 6) nuevosErrores.password = "Mínimo 6 caracteres";
        if (Number(v.edad) < 18) nuevosErrores.edad = "Debes ser mayor de 18 años";
        if (!v.terminos) nuevosErrores.terminos = "Debes aceptar los términos";
        return nuevosErrores;
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const errs = validar(valores);
        setErrores(errs);
        if (Object.keys(errs).length === 0) console.log("Formulario enviado:", valores);
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* ... controles del catálogo de abajo ... */}
            <button type="submit">Registrarse</button>
            <button type="button" onClick={() => setValores({ ...VALORES_INICIALES })}>Limpiar</button>
        </form>
    );
}
```

> 📦 **El mismo patrón en AppCine:** [`PeliculaForm.tsx`](../../../repos/02-react-ejemplo-pelis-api/src/components/PeliculaForm.tsx) aplica este mecanismo (`errores` + `validar()` + submit bloqueado) a la app de pelis: título obligatorio, año numérico (≥ 1888) y puntuación entre 0 y 10, con `{errores.campo && <p>}` bajo cada input. El `FormularioRegistro` de arriba se conserva como tour de todos los controles.

**Catálogo mínimo de controles** (asumiendo `valores` y `handleChange` del bloque anterior):

```tsx
<input type="text" name="nombre" value={valores.nombre} onChange={handleChange} />
<input type="email" name="email" value={valores.email} onChange={handleChange} />
<input type="password" name="password" value={valores.password} onChange={handleChange} />
<input type="number" name="edad" value={valores.edad} onChange={handleChange} />

<select name="pais" value={valores.pais} onChange={handleChange}>
    <option value="es">España</option>
    <option value="pt">Portugal</option>
</select>

<input type="radio" name="plan" value="gratuito"
    checked={valores.plan === "gratuito"} onChange={handleChange} />
<input type="radio" name="plan" value="premium"
    checked={valores.plan === "premium"} onChange={handleChange} />

<input type="checkbox" name="terminos"
    checked={valores.terminos} onChange={handleChange} />

<textarea name="comentarios" value={valores.comentarios} onChange={handleChange} />

<button type="submit">Enviar</button>
```

---

<a id="157-el-buscador-filtrado-y-debounce"></a>
## 15.7. El buscador: filtrado y debounce

El buscador de AppCine es un `input` controlado (§13.7.2): el texto está en `useState` y la lista filtrada es un **estado derivado** que se calcula en el render, nunca se guarda en `useState`.

> 💡 **¿Cómo haríamos para...?** filtrar la tabla mientras se escribe sin duplicar la lista en otro estado? Texto en `useState`, filtro derivado con `useMemo`:

```tsx
const [busqueda, setBusqueda] = useState("");//busqueda controla el texto de la caja de búsqueda
const [busquedaDebounced, setBusquedaDebounced] = useState("");//En el repo se amplía con localStorage

// Estado derivado: peliculas + busquedaDebounced (no se guarda en useState)
const filtradas = useMemo(
  () => peliculas.filter((p) => p.titulo.toLowerCase().includes(busquedaDebounced.toLowerCase())),
  [peliculas, busquedaDebounced]
);
```

> [!NOTE]
> **`useMemo`** guarda en caché el resultado de un cálculo entre renders y **solo lo repite si cambia algo de su array de dependencias** (la misma mecánica que las dependencias de `useEffect`). Aquí importa dos veces:
> 1. **El concepto clave es el estado derivado**: `filtradas` se calcula en el render a partir de `peliculas` + `busquedaDebounced` y **nunca se guarda en `useState`** ( es más rápido porque se ahorra un renderizado de useState!. En caso contrario, cambia setPeliculas->peliculas->useEffect->filter peliculas).
> 2. **`useMemo` es la optimización**: cada pulsación de tecla cambia `busqueda` y dispara un re-render; como `busqueda` **no** está en las dependencias de useMemo, el filtrado de N películas **no se repite** en cada pulsación — solo se recalcula cuando llegan datos nuevos o pasa el debounce.
>
> Sin `useMemo` el código seguiría funcionando (React no exige memorizar), pero repetiría el `filter` en cada render. Regla práctica: cálculo barato → filter inline; cálculo sobre una lista completa → `useMemo`.

> 💡 En el apunte 16 reaparece: la `TablaGenerica` se alimenta con un `resumen` por género que también se calcula con `useMemo` sobre `peliculas`.

El input, junto a los botones de la barra superior:

```tsx
//localStorage se ve más adelante
<div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
 Última búsqueda: <strong>{localStorage.getItem("busquedaPeliculas")}</strong>
  <input
    value={busqueda}
    onChange={(e) => setBusqueda(e.target.value)}
    placeholder="Buscar por título…"
  />
  <button onClick={abrirCrear}>Nueva película</button>
  <button onClick={() => setRecargar((n) => n + 1)} disabled={cargando}>
    Recargar
  </button>
</div>
```

Y si no hay coincidencias, se avisa al usuario en lugar de renderizar una tabla vacía:

```tsx
{filtradas.length === 0 ? (
  <p>No hay películas que coincidan con «{busquedaDebounced}».</p>
) : (
  <table>…</table>
)}
```

Dónde está el retardo(Debounce) aquí??  

**Debounce.** Filtrar en cada tecla dispara un render por pulsación (y contra una API, una petición). El *debounce* espera 300 ms desde la última pulsación: `busqueda` guarda lo que el usuario escribe y `busquedaDebounced` (el que realmente filtra) se actualiza 300 ms después de que el primero deje de cambiar.

> 💡 **¿Cómo haríamos para...?** actualizar `busquedaDebounced` solo 300 ms después de la última pulsación, cancelando el temporizador anterior si el usuario sigue escribiendo?

```tsx
//App.tsx

//Nos creamos un temporizador (en realidad es un simple número), inicializamos a null
//Es setTimeout() el que devuelve el tiempo
const timerRef = useRef<number | null>(null);

// Debounce de la búsqueda con useRef + setTimeout
useEffect(() => {
  if (timerRef.current !== null) window.clearTimeout(timerRef.current); //La segunda vez entra por aquí
  timerRef.current = window.setTimeout(() => setBusquedaDebounced(busqueda), 300); //La primera vez
  //En el repo se retarda a 1000 (1s) para que se note más el efecto
  return () => { //cleanup
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  };
}, [busqueda]);
```

> [!TIP]
> **`useState` vs `useRef`:** `useState` guarda un dato que al cambiar **debe re-dibujar** la UI; `useRef` guarda un valor que **no afecta a la UI** (el id de un temporizador, una referencia al DOM…). Cambiar `ref.current` es "invisible" para React: no re-renderiza; por eso el id del timer vive en `useRef` y no en `useState`. Y el `return` del `useEffect` es el **cleanup**: cancela el temporizador pendiente antes de programar el siguiente o al desmontar — el mismo patrón del `AbortController` de §15.2 y del listener de `Escape` de §15.7.

> 📦 **En el proyecto:** [`App.tsx`](../../../repos/02-react-ejemplo-pelis-api/src/App.tsx) aplica el debounce con `timerRef` (`useRef<number | null>`), `setTimeout` de 300 ms y calcula `filtradas` con `useMemo` sobre `busquedaDebounced`.

---

<a id="158-localstorage-persistencia-en-el-navegador"></a>
## 15.8. `localStorage`: persistencia en el navegador

`localStorage` es una API del navegador que permite guardar pares clave-valor como strings (máx. ~5 MB) que persisten entre sesiones del navegador. Es la evolución natural de las Cookies (máx. ~4 KB).

> 💡 **En Tauri:**  esto no se suele usar porque está muy limitada. El almacenamiento real se hace en **Rust** (ficheros, `tauri-plugin-store` o una BD) vía `invoke`. `sessionStorage`.

### Operaciones básicas

**`localStorage`** tiene cuatro operaciones esenciales y, todo lo que se lee, devuelve `string | null` (por eso `getItem` puede dar `null` si la clave no existe). El bucle sirve para recorrer las claves almacenadas usando `key(i)`.

```typescript
// Guardar la última búsqueda (suponiendo que se guarda en busqueda)
localStorage.setItem("busquedaPeliculas", busqueda);

// Leer
const busqueda = localStorage.getItem("busquedaPeliculas"); // string | null
//se podría poner en el placeholder del input

// Eliminar
localStorage.removeItem("busquedaPeliculas");

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

Como `localStorage` solo guarda strings, **los objetos se serializan con `JSON.stringify`** al guardar y se recuperan con `JSON.parse` al leer.  Para objetos usamos una **type assertion**: convierte el resultado de `JSON.parse` (que es `any`) a nuestro tipo, asumiendo que el JSON guardado coincide con el modelo de la `interface`.

```typescript
// AppCine podría cachear la lista para mostrarla si el fetch falla:
interface CachePeliculas {
  guardadoEn: string; //Fecha de guardado
  datos: Pelicula[];
}

function guardarCache(peliculas: Pelicula[]): void {
  const cache: CachePeliculas = { guardadoEn: new Date().toISOString(), datos: peliculas };
  localStorage.setItem("cachePeliculas", JSON.stringify(cache));
}

function obtenerCache(): CachePeliculas | null {
  const raw = localStorage.getItem("cachePeliculas");
  if (!raw) return null; // sin caché: estado por defecto
  return JSON.parse(raw) as CachePeliculas; //ASERCIÓN!!
}

guardarCache(peliculas);
const cache = obtenerCache();
console.log(cache?.datos.length); // p. ej. 3
```

> 💡 El patrón completo es "cargar al arrancar, guardar en cada cambio". El ejemplo de `CachePeliculas` (arriba) muestra la variante con **objetos completos** (`JSON.stringify`/`parse` + aserción); la que AppCine usa de verdad es más sencilla: la búsqueda es un `string` (`busquedaPeliculas`), así que no hace falta JSON.

El patrón que **sí usa AppCine de verdad**, sobre la búsqueda (un `string`, sin JSON):

```tsx
// En App: init perezoso (la función solo se ejecuta en el primer render)
// y persistencia en cada cambio
const [busquedaDebounced, setBusquedaDebounced] = useState<string>(
  () => localStorage.getItem("busquedaPeliculas") ?? ""
);

// Persistir cada cambio
useEffect(() => {
  localStorage.setItem("busquedaPeliculas", busquedaDebounced);
}, [busquedaDebounced]);
```

> 📦 **En el proyecto:** exactamente eso es lo que hace [`App.tsx`](../../../repos/02-react-ejemplo-pelis-api/src/App.tsx) con `busquedaDebounced` y la clave `busquedaPeliculas`.

### Seguridad: no almacenar datos sensibles

> ⚠️ `localStorage` es accesible desde cualquier script en la misma página. No almacenes tokens, contraseñas ni datos sensibles.

```typescript
// ❌ Inseguro
localStorage.setItem("token", jwtToken);
```

> 💡 **En Tauri:** `document.cookie` y las cookies `HttpOnly` **no existen** en una app de escritorio (no hay servidor web). Si necesitas guardar un token o un secreto, la sesión se gestiona desde el lado **Rust** (ficheros protegidos, `tauri-plugin-store`, o el sistema de credenciales del SO), nunca en `localStorage`. La regla de no guardar secretos en `localStorage` sigue siendo válida.

---

<a id="159-prácticas"></a>
## 15.9. Prácticas


La app completa está en [`repos/02-react-ejemplo-pelis-api`](../../../repos/02-react-ejemplo-pelis-api/): es la AppCine de los apuntes 13 evolucionada con backend. Aquí tienes el extracto clave y **qué mirar**; el extracto es autosuficiente para un hipotético examen, y el archivo enlazado solo añade imports, JSX y estilos.

#### `src/App.tsx` — la app completa (carga, modal y CRUD async)

📦 [`repos/02-react-ejemplo-pelis-api/src/App.tsx`](../../../repos/02-react-ejemplo-pelis-api/src/App.tsx)

**Qué mirar:**
- **Carga con `useEffect`** y tres estados separados: `peliculas`, `cargando` y `error` (§15.2); el contador `recargar` como dependencia.
- **Persistencia**: la última búsqueda está en `localStorage` con init perezoso y `setItem` en cada cambio (§15.8).
- **App como fuente de la verdad**: `enEdicion` decide crear/editar y los hijos avisan por props (§15.3/§15.4).
- **Handlers async** (`guardar`, `borrar`) que llaman a `api` y después recargan; sus `catch` despachan `ERROR` (§15.3/§15.3).
- **Debounce** del buscador con `useRef` + `setTimeout` (§15.7).
- **Modal** con `abierto`/`onCerrar` envolviendo al formulario (§15.5).

#### Más ejemplos. Demos sueltas: `repos/02-react-componentes`

Los siguientes ficheros del repo de componentes repiten el **mismo patrón** que ya viste en la app de AppCine; el dominio cambia, el código aplicado a pelis es el de los enlaces 📦 de cada sección:

- [`ListaUsuarios.tsx`](../../../repos/02-react-componentes/src/components/ListaUsuarios.tsx) — `fetch` con tres `useState` separados (`datos`/`cargando`/`error`), `res.ok` comprobado antes de `res.json()` y `finally` que apaga `cargando` — el mismo patrón de AppCine (§15.2). El archivo avisa: en Tauri la fuente es `invoke(...)`, no `fetch`; el patrón de estados es el mismo.
- [`Modal.tsx`](../../../repos/02-react-componentes/src/components/Modal.tsx) — composición con `children` y cleanup del scroll (§15.5).

## 📦 Ejemplos ejecutables

En [`repos/02-react-componentes`](../../../repos/02-react-componentes/) las pestañas **Estado**, **Controles**, **Hooks** y **Extras** agrupan los ejemplos de este apunte:

| Pestaña | Ejemplos | Qué demuestra |
|---|---|---|
| **Estado** | `FormularioRegistro.tsx` · `useForm.ts` | formulario controlado con validación · hook genérico `Partial<Record<keyof T, string>>` |
| **Controles** | `ControlesFormulario.tsx` (+ `TextInput`, `Label`, `Select`, `RadioGroup`, `Checkbox`, `SearchBox`) | Controles "dumb" (tontos/pasivos/sin inteligencia/solo reciben Props) + lifting state up |
| **Hooks** | `RenderCounter.tsx` · `SagaContext.tsx` · `LikeCounter.tsx` · `Reloj.tsx` | `useRef` · `useContext` · stale closure · `useEffect` + cleanup |
| **Extras** | `Toast.tsx` · `Pagination.tsx` | `useEffect` + `setTimeout` · paginación |

Para ejecutarlos: `cd repos/02-react-componentes && npm run dev` → pestañas **Estado**, **Controles**, **Hooks** y **Extras**.

### AppCine con API: `repos/02-react-ejemplo-pelis-api`

El proyecto [`repos/02-react-ejemplo-pelis-api`](../../../repos/02-react-ejemplo-pelis-api/) es la AppCine de los apuntes 13 evolucionada con los conceptos de este capítulo (dos terminales: `npm run api` + `npm run dev`):

| Archivo | Qué demuestra |
|---|---|
| `src/api.ts` | Cliente `fetch`: GET, POST, PUT y DELETE — §15.1.1 |
| `src/App.tsx` | Carga con `useEffect` + estados `cargando`/`error`, debounce y handlers async — §15.1.1/§15.2/§15.7 |
| `src/components/Modal.tsx` | Overlay + panel con `children` y cleanup — §15.5 |
| `src/components/PeliculaForm.tsx` | Precarga + modo (heredado de 13, §13.8) y validación — §13.8/§15.6 |
| `peliculas.json` | Datos de `json-server` |

<span style="color: green;">VEMOS YA SÍ, LA APP DEL REPOSITORIO FUNCIONANDO y ANALIZAMOS CÓDIGO desde el componente más interno hacia ARRIBA</span>

---

[Volver al índice general](../../../README.md#5-distribución-temporal-y-contenidos-s00s13)