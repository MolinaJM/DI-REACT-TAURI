# Ejercicios de React — Sesiones 4, 5 y 6

> ⚠️ **Importante.** Cada bloque tiene **únicamente 3 ejercicios**: supuestos **prácticos** (no preguntas teóricas) con **datos reales** (los `.json` de cada bloque, servidos tal cual o por `json-server`). Cada ejercicio usa **solo lo visto hasta ese bloque**: nada de hooks, eventos ni patrones que lleguen más adelante. Si un ejercicio parece pedir algo que no se ha visto, relee el apunte de referencia del bloque.

> 🧪 **Cómo se trabaja.** Los ejercicios son componentes React: se escriben en `.tsx` dentro de una app Vite de pruebas. Crea una con `npm create vite@latest -- --template react-ts` (o reutiliza una copia de [`repos/02-react-componentes`](../repos/02-react-componentes/)), copia los datos desde `ejerciciosRT/datos/` al proyecto y monta cada ejercicio desde `App.tsx`. Los bloques que hacen `fetch` (12 y 15) además necesitan la API local de [FAKEAPI](#montar-la-api-local-con-fakeapi). 

> ✅ **Soluciones.** Cada bloque tiene su solución resuelta en su subcarpeta: `tipos.ts` (las entidades), `ej1.tsx`–`ej3.tsx` (un supuesto por ejercicio) y `App.tsx`, que monta los tres para probarlos. Para ejecutar una solución: crea una app Vite, **sustituye el contenido de `src/` por el de la subcarpeta del bloque** (su `App.tsx` reemplaza al de la plantilla; un bloque por app) y `npm run dev`.

> 📦 **Datos reales.** Los datos comunes están centralizados en **3 ficheros con wrapper**, reutilizables por varios bloques: [`ejerciciosRT/datos/peliculas.json`](datos/peliculas.json) (`{"peliculas": [...]}` — usado por 11, 13, 15 y 16), [`ejerciciosRT/datos/alumnos.json`](datos/alumnos.json) (`{"alumnos": [...]}` — usado por 12), [`ejerciciosRT/datos/libros.json`](datos/libros.json) (`{"libros": [...]}` — usado por 13). Todos sirven también para `json-server`. Desde los ejercicios se importan con rutas relativas `../datos/peliculas.json`, `../datos/alumnos.json` o `../datos/libros.json`. Si tu editor se queja del import del JSON, activa `"resolveJsonModule": true` en tu `tsconfig`.

## Bloques y apuntes

| Bloque | Apunte de referencia | Datos | Sesión |
|---|---|---|---|
| [11 · Componentes, JSX y props](#bloque-11-componentes-jsx-y-props) | [11 · React de cero](../sesiones/apuntes/s04/11_Que_es_React.md) | [datos/peliculas.json](datos/peliculas.json) | S04 |
| [12 · `useState` y `useEffect` con `fetch`](#bloque-12-usestate-y-useeffect-con-fetch) | [12 · Los tres patrones de React](../sesiones/apuntes/s04/12_Preparacion_React_19.md) | [datos/alumnos.json](datos/alumnos.json) + API | S04 |
| [13 · Tipado en React: props, generics y eventos](#bloque-13-tipado-en-react-props-generics-y-eventos) | [13 · TypeScript aplicado a React](../sesiones/apuntes/s04/13_Tipado_en_React_TS.md) | [datos/peliculas.json](datos/peliculas.json) · [datos/libros.json](datos/libros.json) | S04 |
| [15 · Gestión de estado y formularios](#bloque-15-gestión-de-estado-y-formularios) | [15 · React: gestión de estado y tipado de formularios](../sesiones/apuntes/s05/15_React_Gestion_Estado_y_Formularios.md) | [datos/peliculas.json](datos/peliculas.json) + API | S05 |
| [16 · Componentes personalizados](#bloque-16-componentes-personalizados) | [16 · React: creación de componentes personalizados](../sesiones/apuntes/s06/16_React_Creacion_de_Componentes_Personalizados.md) | [datos/peliculas.json](datos/peliculas.json) | S06 |

> [!NOTE]
> El [14 · React & TypeScript Cheatsheet](../sesiones/apuntes/s04/14_React_TS_Cheatsheet.md) es un decálogo **de consulta**: no tiene bloque de ejercicios propio (sus 10 reglas son las que se practican en el bloque 11 y en todos los demás).

---

## Sesión 4: React de partida

<a id="bloque-11-componentes-jsx-y-props"></a>
### 11 · Componentes, JSX y props

> 🧭 **Apunte:** [11 · React de cero](../sesiones/apuntes/s04/11_Que_es_React.md) · **Datos:** [datos/peliculas.json](datos/peliculas.json) — 6 películas reales de AppCine (`id`, `titulo`, `genero`, `anio`, `director`, `puntuacion`).
>
> 🚧 **Solo lo visto:** componentes funcionales, JSX (una raíz, expresiones entre `{}`, `&&` y ternarios), listas con `.map` + `key`, props tipadas con `interface` (obligatorias y `?` opcionales), `useState`, eventos en JSX (`onClick`, `onChange`, `onSubmit`) pasando funciones y `useContext` para compartir estado entre componentes sin pasar props por niveles (*lifting state up* clásico y alternativa con `createContext`/`useContext`). Nada de `children`, formularios controlados con validación avanzada ni `fetch`.

1. Estás montando la cartelera de AppCine. Define la `interface Pelicula` (`id?`, `titulo`, `genero`, `anio`, `director`, `puntuacion`) y el componente `PeliculaCard` con props tipadas (`PeliculaCardProps { pelicula: Pelicula }`) que pinte la ficha (título, año, director y puntuación). En `App`, importa `datos.json`, toma `datos.peliculas` y renderiza toda la cartelera con `.map` + `key`. (Como parte opcional, se podría realizar un typeguard esPeli(p: unknown): is Pelicula).
2. La ficha de AppCine tiene una versión corta y una extendida. Crea `ResumenPelicula` con props `pelicula: Pelicula` y `mostrarDirector?: boolean`: pinta título y año siempre, el director solo si `mostrarDirector` es `true` (`&&`), y un "⭐ Recomendada" solo si la `puntuacion` es 8 o más (ternario). Úsala dos veces con la misma película, con y sin la prop opcional.
3. Quieres que cada película de la cartelera tenga su botón de "me gusta" con su propio contador. Crea `VotoCard` con props `titulo: string` que use `useState<number>` para contar los clics de su botón (patrón `Contador` del apunte) y compón varias instancias (una por película) dentro de `App`: cada una recuerda sus votos entre renders.
4. **Selector de tema con `useContext` (3 hermanos, 1 variable).** Tienes tres componentes **hermanos** (`TemaMostrar`, `TemaAlternar` y `TemaReset`) que deben compartir **una sola variable** (`tema`, `"claro" | "oscuro"`) sin pasar props de padre a hijo en cadena. Crea `TemaContext` con `createContext<TemaContextType | undefined>(undefined)`, un `TemaProvider` con `useState<"claro" | "oscuro">` que exponga `{ tema, alternar, reset }`, y un hook `useTema()` que lance un error si se usa fuera del `Provider`. En `App`, envuelve los tres con `TemaProvider`: `TemaMostrar` pinta el tema actual, `TemaAlternar` lo cambia entre claro/oscuro y `TemaReset` lo vuelve a `"claro"`. **No** uses *lifting state up* pasando `tema` y las funciones como props entre hermanos.

<a id="bloque-12-usestate-y-useeffect-con-fetch"></a>
### 12 · `useState` y `useEffect` con `fetch`

> 🧭 **Apunte:** [12 · Los tres patrones de React](../sesiones/apuntes/s04/12_Preparacion_React_19.md) · **Datos:** [datos/alumnos.json](datos/alumnos.json) — 4 alumnos con `id`, `nombre`, `curso` y `notas`, servidos por `json-server` en `http://localhost:3000/alumnos` (ver [FAKEAPI](#montar-la-api-local-con-fakeapi)).
>
> 🚧 **Solo lo visto (además del bloque 11):** `useState` con actualización inmutable (spread/`map`/`filter`), `useEffect` + `fetch` con los tres estados (`cargando`/`error`/`datos`), cancelación con `AbortController` y el input controlado (con `onChange` inferido) del gestor de tareas. Nada de eventos tipados (`ChangeEvent`/`FormEvent`), lifting ni formularios con validación.

1. Estás montando la cola de pendientes de un equipo de desarrollo. Con el patrón del gestor de tareas del apunte, crea `ColaPendientes` con `useState<Tarea[]>` (`Tarea { id: number; texto: string; hecha: boolean }`) que empiece vacío, un input controlado para añadir tareas (id con `Date.now()`, spread para añadir sin mutar), clic en una tarea para marcarla hecha (`map`) y un botón por tarea para borrarla (`filter`).
2. Estás cargando el listado del aula desde la API. Crea `ListaAlumnos` con `useState` para `cargando`, `error` y `alumnos`, y un `useEffect` que haga `fetch("http://localhost:3000/alumnos")`, compruebe `res.ok`, y pinte `<li key={a.id}>` con nombre y curso — o el aviso de cargando/error correspondiente. Cancela la petición al desmontar con `AbortController` (cleanup del efecto).
3. El listado del aula necesita buscador. A partir del ejercicio 2, añade a `ListaAlumnos` un input controlado (`useState<string>`) que filtre los alumnos ya cargados por nombre o curso (`filter`, sin mutar el array original), y pinta "Sin resultados" cuando el filtro no deja nada (ternario en el JSX).

<a id="bloque-13-tipado-en-react-props-generics-y-eventos"></a>
### 13 · Tipado en React: props, generics y eventos

> 🧭 **Apunte:** [13 · TypeScript aplicado a React](../sesiones/apuntes/s04/13_Tipado_en_React_TS.md) · **Datos:** [datos/peliculas.json](datos/peliculas.json) — 6 películas reales de AppCine; [datos/libros.json](datos/libros.json) — 3 libros (`id`, `titulo`, `autor`, `anio`).
>
> 🚧 **Solo lo visto (además de 11 y 12):** tipado de eventos (`React.ChangeEvent`, `React.FormEvent`), `useState<T>` explícito, utility types (`Record`, `Partial`, `Pick`, `Omit`), `Number.parseInt`/`parseFloat` y componentes genéricos `<T>`. Nada de `useReducer`, `localStorage` ni `children`.

1. AppCine colorea el badge del género. Define `COLORES_GENERO: Record<string, string>` con los seis géneros de `datos.json` (`accion`, `comedia`, `drama`, `terror`, `cienciaficcion`, `romantica`) y escribe `colorDeGenero(genero: string): string` que devuelva el color o un neutro con `??`. Crea `PeliculaBadge` (props tipadas con `PeliculaBadgeProps`) que pinte un `<span>` con `backgroundColor: colorDeGenero(pelicula.genero)` y renderiza la cartelera completa con `.map` + `key`.
2. El formulario de alta de películas debe tipar sus eventos. Crea `NuevaPeliculaForm` con la prop `onGuardar: (datos: Omit<Pelicula, "id">) => void`: inputs controlados para `titulo` (`ChangeEvent<HTMLInputElement>`), `anio` (`Number.parseInt`) y `puntuacion` (`Number.parseFloat`, base decimal), y al `submit` (`FormEvent<HTMLFormElement>` + `preventDefault`) llama a `onGuardar` con la película construida y limpia el formulario.
3. Quieres una misma fila de listado para películas y libros. Crea el componente genérico `Fila<T extends { id?: number; titulo: string }>` (props `FilaProps<T>`) que pinte el `titulo` en un `<li>`, y renderízalo dos veces desde `App`: una para `datos.peliculas` y otra para `datos.libros` (con `.map` + `key`). El mismo componente, dos entidades distintas.

---

## Sesión 5: Gestión de Estado Básico y Tipado de Formularios

<a id="bloque-15-gestión-de-estado-y-formularios"></a>
### 15 · Gestión de estado y formularios

> 🧭 **Apunte:** [15 · React: gestión de estado y tipado de formularios](../sesiones/apuntes/s05/15_React_Gestion_Estado_y_Formularios.md) · **Datos:** [datos/peliculas.json](datos/peliculas.json) — las 6 películas de AppCine, servidas por `json-server` en `http://localhost:3000/peliculas` (ver [FAKEAPI](#montar-la-api-local-con-fakeapi)).
>
> 🚧 **Solo lo visto (además de 11–13):** lifting state up, eventos por props (`onEditar`/`onDelete`/`onGuardar`), patrón modal, formulario crear/editar, `useReducer` con acciones tipadas, `localStorage` como patrón de persistencia y patrones de estado con funciones puras. Nada de `children`, componentes genéricos de tabla ni `ButtonHTMLAttributes` (eso es S06).

1. Estás montando el CRUD de AppCine. En `App` (fuente de la verdad): `useState<Pelicula[]>` con las películas de `http://localhost:3000/peliculas` cargadas en un `useEffect`, una tabla/lista con `onEditar`/`onDelete` por película (eventos por props) y un formulario **en un modal** que sirva para crear y editar (`inicial?: Partial<Pelicula>`, `modo: "crear" | "editar"`, `onGuardar: (datos: Omit<Pelicula, "id">) => void`): el modal se abre desde "Nueva" y desde el lápiz de editar, y `App` actualiza la lista sin mutar.
2. La videoteca cambia por acciones, no por setters. Reimplementa la lista de películas con `useReducer`: `Accion` como unión discriminada (`{ type: "AÑADIR"; pelicula: Pelicula } | { type: "BORRAR"; id: number } | { type: "ORDENAR_PUNTUACION" }`), el `reducer` puro (switch que devuelve estado nuevo, nunca muta) y despacha desde botones: añade una película, borra por id y ordena por puntuación con `toSorted` (sin mutar).
3. Los favoritos de AppCine deben sobrevivir al refresco. Con el patrón de persistencia de `localStorage`, escribe `cargarFavoritos(): number[]` (lee la clave `"appcine-favoritos"`, `string | null`, `JSON.parse` con valor por defecto) y `guardarFavoritos(ids: number[]): void` (`JSON.stringify`). En `App`, mantén los ids favoritos en `useState` (partiendo de `cargarFavoritos()`), guarda en cada cambio y pinta un corazón (o similar) por película para alternar el favorito sin mutar el array.

---

## Sesión 6: Creación de Componentes Personalizados

<a id="bloque-16-componentes-personalizados"></a>
### 16 · Componentes personalizados

> 🧭 **Apunte:** [16 · React: creación de componentes personalizados](../sesiones/apuntes/s06/16_React_Creacion_de_Componentes_Personalizados.md) · **Datos:** [datos/peliculas.json](datos/peliculas.json) — las 6 películas de AppCine.
>
> 🚧 **Solo lo visto (además de 11–15):** `children` y composición, render condicional, `Boton` con `extends ButtonHTMLAttributes` y `Record` de variantes, `Modal` con overlay + `useEffect` de limpieza, y tabla genérica `Tabla<T>` con `Columna<T>`, `keyExtractor` y `render`.

1. AppCine necesita su botón corporativo. Crea `Boton` con `BotonProps extends ButtonHTMLAttributes<HTMLButtonElement>` más `variante?: "primary" | "secondary" | "danger" | "ghost"`, `tamano?: "sm" | "md" | "lg"`, `icono?` y `cargando?`: las variantes y tamaños se asocian a clases con `Record<Variante, string>` y `Record<Tamano, string>`, `disabled` se combina con `cargando`, y el `...props` repesca los atributos nativos. Úsalo en una barra con las cuatro variantes y un botón en estado `cargando`.
2. La tabla de películas debe servir para cualquier entidad. Crea `Tabla<T>` genérica (`TablaProps<T>` con `datos: T[]`, `columnas: Columna<T>[]` y `keyExtractor`), con estado vacío ("No hay datos disponibles") y `render?` por columna; montala con las películas de `datos.json` (columnas título, año y director) y usa el `render` de una columna para pintar el badge de género con `colorDeGenero` (bloque 13).
3. El detalle de película se abre en un modal reutilizable. Crea `Modal` (`abierto: boolean`, `onCerrar: () => void`, `titulo: string`, `children: ReactNode`) con overlay, cierre por click fuera y `useEffect` que bloquee el scroll del body mientras está abierto (con limpieza al desmontar). Crea `PeliculaDetalle` que reciba una `Pelicula` y use el `Modal` pasándole la ficha completa por `children`; en `App`, un botón "Ver detalle" por película (con `onClick` + `stopPropagation` si va dentro de la fila) abre el modal de la película seleccionada.

---

<a id="montar-la-api-local-con-fakeapi"></a>
## Montar la API local con FAKEAPI

Los bloques **12** y **15** hacen `fetch` real contra una API local montada con [`json-server`](https://github.com/typicode/json-server) (versión `0.17.4`, ya instalada en [`bancop`](../bancop/)). Usa directamente uno de los ficheros reutilizables con *wrapper*:

```bash
# Bloque 12 (alumnos)
cd bancop && npx json-server ../ejerciciosRT/datos/alumnos.json --port 3000

# Bloque 15 (películas)
cd bancop && npx json-server ../ejerciciosRT/datos/peliculas.json --port 3000
```

Esto deja la API consultable en el puerto **3000**:

```
http://localhost:3000/alumnos
http://localhost:3000/peliculas
```

`json-server` crea **un endpoint por cada clave de primer nivel** del JSON (el *wrapper*): `alumnos.json` empieza por `{ "alumnos": [...] }` y produce `/alumnos`; `peliculas.json` empieza por `{ "peliculas": [...] }` y produce `/peliculas`. Un endpoint inexistente (p. ej. `http://localhost:3000/noexiste`) responde `404`: es el caso de error que debe pintar tu `catch`.

> [!IMPORTANT]
> En tus `fetch`, usa la URL local tal cual (`http://localhost:3000/alumnos`). Ojo: se podría filtrar la respuesta variando la URL pero eso **NO SE PERMITE** (p. ej. `?_limit=1`, `?_start=1&_end=2` o condiciones como `?curso=2º%20DAM`): la app debe traer el endpoint completo y filtrar en el cliente.
