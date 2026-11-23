<a id="16-react-creacion-de-componentes-personalizados"></a>
# 16. React: creación de componentes personalizados 📝 🖥️

- [16. React: creación de componentes personalizados 📝 🖥️](#16-react-creacion-de-componentes-personalizados)
  - [16.1. ¿Por qué componentes personalizados?](#161-por-qué-componentes-personalizados)
  - [16.2. Monolítico vs no monolítico](#162-monolítico-vs-no-monolítico)
  - [16.3. Componentes en ficheros propios: `Buscador`, `PeliculaForm` y `PeliculaTable`](#163-componentes-en-ficheros-propios-buscador-peliculaform-y-peliculatable)
    - [16.3.1 `Buscador` con input controlado](#1631-buscador-con-input-controlado)
    - [16.3.2 `PeliculaForm` controlado](#1632-peliculaform-controlado)
    - [16.3.3 La tabla de películas: `PeliculaTable`](#1633-la-tabla-de-películas-peliculatable)
  - [16.4. Composición de la pantalla principal](#164-composición-de-la-pantalla-principal)
  - [16.5. Botón personalizado: `extends ButtonHTMLAttributes`](#165-botón-personalizado-extends-buttonhtmlattributes)
  - [16.6. Modal: overlay, `children` y `useEffect` de limpieza](#166-modal-overlay-children-y-useeffect-de-limpieza)
  - [16.7. Tabla genérica: componentes `<T>`](#167-tabla-genérica-componentes-t)
  - [16.8. Vista de tarjetas: `PeliculaCard`](#168-vista-de-tarjetas-peliculacard)
  - [16.9. Prácticas](#169-prácticas)

<a id="161-por-qué-componentes-personalizados"></a>
## 16.1. ¿Por qué componentes personalizados?

La app de 15 funciona, pero se podría organizar mejor. Si se extrae por piezas  (buscador, botón, tabla, spinner, etc..)  se gana:

- **Reutilización:** un solo `Boton` con variantes para toda la app, en vez de 5 `<button>` sueltos con el mismo estilo repetido.
- **Generalidad:** `TablaGenerica<T>` vale para `Pelicula` hoy y para cualquier otra entidad mañana (se demuestra con `ResumenGenero`, §16.7).
- **Lectura vertical:** cada fichero es una pieza autodescriptiva y testable, con su `interface` de props como contrato.
- **UI como composición:** se demuestra que se puede montar o desmontar piezas en `App` sin tocar la lógica de datos (lógica de negocio).

Por tanto el **Objetivo**: reconstruir la UI de AppCine del apunte 15 con **componentes reutilizables**. La lógica no cambia (`api.ts`, `fetch`, etc..), estamos refactorizando la GUI, y el paso previo natural a reestilizar la app con Tailwind (S10).

<a id="162-monolítico-vs-no-monolítico"></a>
## 16.2. Monolítico vs no monolítico

- En 15, `App.tsx` es **monolítico**: es cierto que antes teníamos 3 componentes: Modal, PeliculaForm y PeliculaRow, PERO, las definiciones de buscador, la tabla, los botones están todos mezclados dentro del mismo JSX de un único fichero. Funcionar funciona... pero el fichero crece y se convierte en ineficiente. 
- En 16 la app es **no monolítica**: cada pieza es un componente con su propio fichero y su `interface` de props como contrato, y `App.tsx` solo las **compone** (las monta y les pasa datos/callbacks). 

La LÓGICA DE NEGOCIO no cambia; cambia cómo se COMPONE LA GUI. Cada apartado de este capítulo lleva un bloque **Antes/Ahora** que señala el delta concreto respecto a [`02-react-ejemplo-pelis-api`](../../../repos/02-react-ejemplo-pelis-api/).

> [TIP!] Lo vemos todo en [`repos/02-react-ejemplo-pelis-componentes`](../../../repos/02-react-ejemplo-pelis-componentes/). En concreto, esto  es lo que añade o sustituye:

| Qué cambia en 16 | Antes (15 · `02-react-ejemplo-pelis-api`) | Ahora (16 · `02-react-ejemplo-pelis-componentes`) |
|---|---|---|
| **Tabla** | JSX plano (`<table>` + `PeliculaRow`) | Componente `PeliculaTable` (listas con `key`) — §13.8 y §16.3.3 |
| **Botones** | `<button>` nativo | Componente `Boton extends ButtonHTMLAttributes` — §16.5 |
| **Buscador** | `<input>` inline en `App` | Componente `Buscador` con `onBuscar` — §16.3.1 |
| **Buscador (debounce)** | §15.7: `timerRef` + `setTimeout` en `App` | Se conserva: `Buscador` avisa con `onBuscar` y `App` sigue aplicando el debounce — §15.7 |
| **Carga/estados** | Texto `Cargando…` | `Spinner` (gráfico de loading)+ renderizado condicional — §12.1.3 |
| **Formulario** | `PeliculaForm` con `modo`, sin reinicio, `<button>` nativos | `PeliculaForm` sin `modo`, auto-reinicio, `Boton` y `<label>` — §16.3.2 |
| **Modal** | Overlay + panel (sin `×` ni `tamano`) | Añade botón `×` y prop `tamano` — §16.6 |
| **Pantalla** | `App` monolítica: input, `<table>` y botones inline | `App` no monolítica: compone piezas — §16.4 |
| **Extra** | — | `TablaGenerica<T>` con otro tipo (`ResumenGenero`) — §16.7. `PeliculaCard` |

---
>💡EN 15 ESTUDIAMOS UNA NUEVA LÓGICA para hacer la APP con respecto a 13, por tanto, primero VIMOS TODA LA TEORÍA y LUEGO, vimos todo FUNCIONANDO EN CONJUNTO.
>💡 PERO, DADO QUE 16 ES UNA VERSIÓN MEJORADA DE DISEÑO (NO DE FUNCIONAMIENTO INTERNO), ahora SÍ VAMOS A IR VIENDO COMPONENTE POR COMPONENTE funcionando de forma INDEPENDIENTE</h3>

---

<a id="163-componentes-en-ficheros-propios-buscador-peliculaform-y-peliculatable"></a>
## 16.3. Componentes en ficheros propios: `Buscador`, `PeliculaForm` y `PeliculaTable`

En 15, el input del buscador y la tabla vivían **inline en el JSX de `App.tsx`**, y `PeliculaForm` era un componente que solo funcionaba pegado a su `Modal`. 

El **delta** de esta sesión es dar a esas piezas un **fichero propio con su `interface` de props como contrato**, comunicándose con el padre por callbacks: el `Buscador`, el `PeliculaForm` y la `PeliculaTable` (la tabla que delega cada fila en `PeliculaRow`).

<a id="1631-buscador-con-input-controlado"></a>
### 16.3.1 `Buscador` con input controlado

El input controlado (`value` + `onChange` tipado con `ChangeEvent<HTMLInputElement>`) ya se vió en  **§13.7.2**; el **delta** es que el buscador es un componente que sube el texto al padre con la prop `onBuscar`:

```tsx
interface BuscadorProps {
  onBuscar: (texto: string) => void;
}

export function Buscador({ onBuscar }: BuscadorProps) {
  const [texto, setTexto] = useState("");

  function alEscribir(e: ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value;
    setTexto(valor);
    onBuscar(valor); // delta: sube el texto al padre
  }

  return (
    <label>
      Buscar:
      <input value={texto} onChange={alEscribir} placeholder="Título o género…" />
    </label>
  );
}
```

> [!TIP]
> **Antes (15 · `pelis-api`) → Ahora (16 · `componentes`)**
>
> | Antes | Ahora |
> |---|---|
> | `<input value={busqueda}…>` inline en `App.tsx` | Componente `Buscador` con `onBuscar` |
> | El debounce (`timerRef` + `setTimeout`) también en `App` | Se **conserva en `App`**: `Buscador` solo avisa con `onBuscar` (§15.7) |

> 📦 **En el proyecto:** [`Buscador.tsx`](../../../repos/02-react-ejemplo-pelis-componentes/src/components/Buscador.tsx) guarda el texto y llama a `onBuscar(texto)` en cada cambio. El debounce no está en el buscador sino en `App` (§15.7), que retrasa 300 ms el filtrado.

<a id="1632-peliculaform-controlado"></a>
### 16.3.2 `PeliculaForm` controlado

El esqueleto base es el de **§13.11** (estado `valores` + `handleChange` + conversión a número, ya visto en §15.6). El **delta** de 16 trata sobre COMPOSICIÓN; los 6 deltas de la tabla «Antes/Ahora» están marcados con `// delta` en el código de abajo.

```tsx
interface PeliculaFormProps {
  inicial?: Partial<Pelicula>;
  guardando?: boolean;
  onCancelar: () => void;
  onGuardar: (datos: Omit<Pelicula, "id">) => void;
}

type PeliculaFormValores = {
  titulo: string; 
  genero: string; 
  anio: string; 
  director: string; 
  puntuacion: string;
};

const GENEROS = ["Acción", "Comedia", "Drama", "Terror", "Ciencia-ficción", "Romántica"];

// delta: sin prop `modo` (el padre decide, según lo que pase, si pasa vacío, será porque
// queremos insertar. Si paso un objeto es porque estamos editando) y `inicial = {}` por defecto
export function PeliculaForm({ inicial = {}, guardando = false, onGuardar, onCancelar }: PeliculaFormProps) {
  const [valores, setValores] = useState<PeliculaFormValores>(() => ({
    titulo: inicial.titulo ?? "",
    // delta: normaliza el género guardado a las opciones de GENEROS
    genero: GENEROS.find((g) => g.toLowerCase() === (inicial.genero ?? "").toLowerCase()) ?? (inicial.genero ?? ""),
    anio: String(inicial.anio ?? ""),
    director: inicial.director ?? "",
    puntuacion: String(inicial.puntuacion ?? "0"),
  }));

  // handleChange: idéntico al §13.11 (valores + name)

  function enviar(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onGuardar({
      titulo: valores.titulo.trim(),
      genero: valores.genero.trim(),
      anio: Number.parseInt(valores.anio, 10),
      director: valores.director.trim(),
      puntuacion: Number.parseFloat(valores.puntuacion),
    });
    // delta: auto-reinicio al enviar (en 15 no hacía falta: el Modal se cerraba)
    setValores({ titulo: "", genero: "", anio: "", director: "", puntuacion: "" });
  }

  return (
    <form onSubmit={enviar}>
      
      {/* delta: cada campo en <label> (en 15 eran inputs sueltos con placeholder) 

      El estilo flex es muy socorrido, coloca de forma automática elementos en una dirección (column/row).

      display: "flex", flexDirection: "column", gap: "0.25rem" (1 rem = 16px)

      */}

      <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        Título
        <input name="titulo" value={valores.titulo} onChange={handleChange} />
      </label>
      {/* …los otros 4 campos igual: <label> + control con name/value/onChange.
          El <select> arranca con <option value="">Selecciona un género…</option> */}

      {/* delta: Boton en vez de <button> nativo */}
      <Boton type="submit" variante="exito">Guardar</Boton>
      <Boton type="button" variante="secondary" onClick={onCancelar}>Cancelar</Boton>
    </form>
  );
}
```

> [!TIP]
> **Antes (15 · `pelis-api`) → Ahora (16 · `componentes`)**
>
> | Antes | Ahora |
> |---|---|
> | Prop `modo: "crear"\|"editar"` → botón "Añadir"/"Guardar" | **Sin `modo`**: el padre decide, botón siempre "Guardar" |
> | No reiniciaba al enviar (el `Modal` se cerraba) | **Auto-reinicio**: `setValores({…})` + `setErrores({})` |
> | `<button>` nativos | Componente `Boton` (`exito`/`secondary`, `cargando`) |
> | Inputs sueltos con `placeholder` | Cada campo en `<label>` |
> | `inicial?.x ?? ""` (opcional) | `inicial = {}` por defecto |
> | `inicial?.genero ?? ""` | Normaliza a `GENEROS` (`GENEROS.find`) |
>
> El esqueleto de arriba omite a propósito la validación para centrarnos en el form controlado; los 6 deltas de la tabla están marcados con `// delta`.

> 📦 **En el proyecto:** [`PeliculaForm.tsx`](../../../repos/02-react-ejemplo-pelis-componentes/src/components/PeliculaForm.tsx) usa un objeto `valores` + un `handleChange` por `name` y convierte a número al enviar; recibe `inicial`, `guardando`, `onGuardar` y `onCancelar` (ya sin `modo`: el padre decide), y sus botones son `Boton` (`exito` para guardar, `secondary` para cancelar — §16.5).

<a id="1633-la-tabla-de-películas-peliculatable"></a>
### 16.3.3 La tabla de películas: `PeliculaTable`

> 💡 **¿Cómo haríamos para...?** extraer la tabla de películas a su propio componente sin duplicar el `.map` ni las cabeceras?

En 15, la `<table>` estaba **inline en el JSX de `App.tsx`**: cabeceras (`<thead>` con 7 `<th>`) y el `.map` de filas mezclados con el resto de la pantalla. En 16 se extrae a su propio fichero, `PeliculaTable.tsx`, y `App` se queda solo con la llamada:

```tsx
<PeliculaTable peliculas={visibles} onEditar={abrirEditar} onBorrar={borrar} />
```

El componente recibe el array `peliculas` y las dos callbacks del listado (`onEditar` con la película entera y `onBorrar` con el `id`, las mismas que ya maneja `App`), y **delega cada fila en `PeliculaRow`**: un `.map` con `key={pelicula.id}` (§13.8) que renderiza una `<PeliculaRow>` por película. 

Es decir, `PeliculaTable` solo aporta **el esqueleto de la tabla** (`<table>`, `<thead>` con las cabeceras y `<tbody>` con el map); el contenido de cada fila vive en `PeliculaRow`, que sigue siendo el que pinta las celdas y sus botones.

Un detalle de alineación: las cabeceras se pintan con una constante `TH` de tipo `CSSProperties` con `textAlign: "left"`, porque `<th>` va **centrado por defecto** y, sin ese ajuste, la cabecera descuadra respecto a las celdas (`<td>`), que en `PeliculaRow` van alineadas a la izquierda con su propia constante `TD`. Mismo patrón "estilos compartidos como constantes fuera del componente" que en `PeliculaRow`.

No confundir con la tabla genérica: `PeliculaTable` es un componente **específico** (conoce el dominio `Pelicula` y reutiliza `PeliculaRow`); `TablaGenerica<T>` (§16.7) es la versión **genérica** sin dominio, configurada por `datos`/`columnas`/`keyExtractor`, que en AppCine se usa para el resumen por género. 

**Dos puntos de vista de la misma idea**: si la tabla de películas necesitara configuración por columna (renders personalizados, columnas calculadas), podría reimplementarse sobre `TablaGenerica<Pelicula>` definiendo sus `Columna<Pelicula>`.

> 📦 **Fichero del repo:** [`PeliculaTable.tsx`](../../../repos/02-react-ejemplo-pelis-componentes/src/components/PeliculaTable.tsx) — el fichero íntegro es nuevo en 16 (todo él está marcado con el par `//JMM - Inicio/Fin Nuevo con respecto a 15`).

---

<a id="164-composición-de-la-pantalla-principal"></a>
## 16.4. Composición de la pantalla principal - El LAYOUT

Con estas piezas se compone el LAYOUT principal, la pantalla de AppCine:

> 💡 **¿Cómo haríamos para...?** montar todas las piezas (buscador, tabla, formulario) en una sola pantalla, combinando listas, condicionales y state?

```tsx
// delta: en 15, input + <table> + botones estaban inline en App.tsx (monolítico)
<main className="app">
  <h1>AppCine</h1>
  <Buscador onBuscar={onBuscar} />
  {cargando ? <Spinner /> : <PeliculaTable peliculas={visibles} />}
  <PeliculaForm onGuardar={onGuardar} />
</main>
```

- `Buscador`: entrada controlada.
- `PeliculaTable`: listas + `key` (§16.3.3).
- `PeliculaForm`: formulario controlado.
- `cargando`: render condicional.

> [!TIP]
> **Antes (15 · `pelis-api`) → Ahora (16 · `componentes`)**
>
> | Antes | Ahora |
> |---|---|
> | `App.tsx` **monolítico**: input, `<table>` y botones inline en un solo JSX | `App.tsx` **no monolítico**: compone `Buscador`/`PeliculaTable`/`PeliculaForm`/`Spinner`/`Boton` |

> [!CAUTION]
> Con `&&` en JSX evita `{0 && ...}`: en JSX el `0` se pinta literalmente. Usa `> 0 &&` o un ternario (render condicional en §12.1.3).

---

<a id="165-botón-personalizado-extends-buttonhtmlattributes"></a>
## 16.5. Botón personalizado: `extends ButtonHTMLAttributes`

Para obtener un **botón reutilizable** con variantes visuales, la clave está en que su interfaz `BotonProps` **herede de `ButtonHTMLAttributes<HTMLButtonElement>`** (los atributos nativos del `<button>`, como `disabled`, `style`, `onClick`...) y añade props propias (`variante`, `tamano`, `icono`, `cargando`). La herencia se marca con **`extend`**.

Esto se puede hacer con casi cualquier etiqueta HTML. Y aunque **herencia** es algo que conocemos, en React a esto se le denomina **composición/envoltura** (wrapping), más que **herencia**. 

Los valores posibles se modelan con **uniones de literales** y se asocian a clases mediante `Record<Variante, string>`. 

Y para que el invento no pete, el `...props` final repesca las props heredadas no desestructuradas, así el botón sigue aceptando todo lo de un `<button>` normal.

> 📦 **Fichero del repo:** [`repos/02-react-componentes/src/components/Boton.tsx`](../../../repos/02-react-componentes/src/components/Boton.tsx)

```tsx
// delta: nuevo en 16 — sustituye los <button> nativos de 15
// p. ej.: <Boton variante="exito">Guardar</Boton>  en vez de  <button>Guardar</button>
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variante = "primary" | "secondary" | "danger" | "exito" | "ghost";
type Tamano = "sm" | "md" | "lg";

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;//Podría contener hijos
    variante?: Variante;
    tamano?: Tamano;
    icono?: ReactNode;
    cargando?: boolean;
}

const VARIANTES: Record<Variante, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    exito: "bg-green-600 text-white hover:bg-green-700",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
};

const TAMANOS: Record<Tamano, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
};

//Hay que pasar todos los props, pero detallamos los nuevos y lo obligatorios: disabled, style, type, ...props
function Boton({children, variante = "primary", tamano = "md", icono, cargando = false, disabled, type = "button", style, ...props}: BotonProps) {
  return (
    <button
      type={type}
      disabled={disabled || cargando}
      style={{
        ...VARIANTES[variante],
        ...TAMANOS[tamano],
        borderRadius: "0.375rem",
        cursor: disabled || cargando ? "not-allowed" : "pointer",
        opacity: disabled || cargando ? 0.6 : 1,
        ...style,
      }}
      {...props}
    >
      {cargando ? "Cargando…" : icono}
      {children}
    </button>
  );
}

export default Boton;
```

> [!TIP]
> **Antes (15 · `pelis-api`) → Ahora (16 · `componentes`)**
>
> | Antes | Ahora |
> |---|---|
> | `<button>` nativos sueltos (App: "Nueva película"/"Recargar"; `PeliculaRow`: "Editar"/"Borrar"; form: "Cancelar"/"Añadir") | Todos sustituidos por el componente `Boton` con `variante`, `tamano` y `cargando` |

En la `sesion10.md` veremos que también podemos personalizar mediante el uso de `TailWind CSS`.

---

<a id="166-modal-overlay-children-y-useeffect-de-limpieza"></a>
## 16.6. Modal: overlay, `children` y `useEffect` de limpieza

Un **Modal** es una capa superpuesta que bloquea la pantalla. Controla su visibilidad con la prop `abierto`: si es `false` devuelve `null` (no se pinta nada); si es `true` muestra el overlay oscuro y el panel. El `useEffect` gira en torno a `abierto`: al abrir **bloquea el scroll** (`document.body.style.overflow = "hidden"`) y la función de limpieza (el `return`) lo restaura al cerrar o desmontar. Destacan `onCerrar` (callback que sube el "cerrar" al padre) y `children` (el contenido de la tarjeta).

> 📦 **Fichero del repo:** [`repos/02-react-componentes/src/components/Modal.tsx`](../../../repos/02-react-componentes/src/components/Modal.tsx)

```tsx
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type Tamano = "sm" | "md" | "lg";

interface ModalProps {
  abierto: boolean;
  titulo: string;
  onCerrar: () => void;
  children: ReactNode;
  //JMM - Inicio Nuevo con respecto a 15
  tamano?: Tamano;
  //JMM - Fin Nuevo con respecto a 15
}

const ANCHOS: Record<Tamano, string> = {sm: "20rem", md: "28rem", lg: "40rem"};

//JMM - Inicio Nuevo con respecto a 15
export function Modal({ abierto, titulo, onCerrar, children, tamano = "md" }: ModalProps) {
//JMM - Fin Nuevo con respecto a 15
  ...
  useEffect(() => //Ocultar
  useEffect(() => //Tecla Escape
  ...
return (
  ...
  //Parte final. Tamaño afecta al ancho de las cajas
    <div
        style={{
          position: "relative",
          background: "white",
          padding: "1.5rem",
          borderRadius: "0.75rem",
          //JMM - Inicio Nuevo con respecto a 15
          width: ANCHOS[tamano],
          //JMM - Fin Nuevo con respecto a 15
          maxWidth: "90vw",
        }}
      >
        {/* JMM - Inicio Nuevo con respecto a 15 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ marginTop: 0 }}>{titulo}</h2>
          <button type="button" onClick={onCerrar} aria-label="Cerrar">
            ×
          </button>
        </div>
        {/* JMM - Fin Nuevo con respecto a 15 */}
        {children}
      </div>
    </div>
  );
}

```

> [!TIP]
> **Antes (15 · `pelis-api`) → Ahora (16 · `componentes`)**
>
> | Antes | Ahora |
> |---|---|
> | `Modal.tsx` solo `abierto`/`titulo`/`onCerrar`/`children` (patrón §15.5) | Añade **botón `×`** y prop **`tamano`** (`"sm" \| "md" \| "lg"`) |

---

<a id="167-tabla-genérica-componentes-t"></a>
## 16.7. Tabla genérica: componentes `<T>`

Este componente es **genérico** y personalizable funcionando con cualquier tipo `T` (como por ejemplo Pelicula). Se puede personalizar TABLA y COLUMNAS.

La interfaz `TablaProps<T>` recibe `datos: T[]` ( ej: Pelicula[]) y `columnas`, donde cada columna define 3 cosas básicas: 1) su `key` (un campo de `T` o un string), 2) un `titulo` y 3) opcionalmente un `render` que devuelve `ReactNode` (útil para botones o badges). `keyExtractor` da la `key` única de cada fila. Es el patrón `T extends Record<string, any>` que reutilizaremos para cualquier dominio.

En el componente Tabla marcado como /* modificable */, estos son los ajustes principales que puedes hacer:
- En Columna<T>: Añadir propiedades extra por columna (como align o className).
- En TablaProps<T>: Añadir props nuevas para el componente (como mensajeVacio o onFilaClick).
- En la restricción genérica: Cambiar `<T extends Record<string, any>>` por algo más flexible con interfaces, como `<T extends object>`. Esa restricción indica que "tiene que encajar con este molde", puede ser más estricto utilizando Record o más laxo, utilizando un objeto. De todas formas, la primera opción es la más válida en este caso dado que, de forma normal, tendremos un array de objetos indexables (con campos clave-valor).
- En el estado vacío del ARRAY. (es decir, no hay datos en el array principal): Personalizar los estilos del contenedor o hacer dinámico el texto/elemento que se muestra cuando datos está vacío. 
- En `<table>, <thead>, <tr>, <th> `y `<td>`: Añadir clases CSS (por ejemplo, bordes, fondos, paddings, hover o alineación) y eventos de fila como onClick.
- En el valor por defecto de CELDA: Cambiar qué se muestra cuando **no hay función render** y el valor es nulo/vacío (por ejemplo, mostrar "—" en vez de ""). Aunque lo más potente es usar un **render**, indica cómo se pinta ( todo a mayúsculas, número de decimales, etc..). Ejemplo de render llamado desde el padre: ` { key: "genero", titulo: "Género", render: (fila) => fila.genero.toUpperCase() },`

> 📦 **Fichero del repo:** [`repos/02-react-componentes/src/components/TablaGenerica.tsx`](../../../repos/02-react-componentes/src/components/TablaGenerica.tsx)

```tsx
// delta: nuevo en 16 — en 15 la tabla era <table> plano en App + PeliculaRow
import type { ReactNode } from 'react';

interface Columna<T> {
    key: keyof T | string;
    titulo: string;
    render?: (item: T) => ReactNode; //render determina CÓMO se pinta una columna.
    /* el render es modificable      
    render: (fila) => fila.genero.toUpperCase()

    La tabla también es ampliable:
    p. ej. align?: 'left' | 'center' | 'right'; className?: string; 
         
    */
}

interface TablaProps<T> {
    datos: T[];
    columnas: Columna<T>[];
    keyExtractor: (item: T) => string | number; //Extractor de propiedades
    /* modificable: p. ejempls 
    mensajeVacio?: ReactNode; 
    onFilaClick?: (item: T) => void; 
    */
}

function Tabla<T extends Record<string, any>>({datos, columnas, keyExtractor }: TablaProps<T>) {
    if (datos.length === 0) {
      return <div >No hay datos disponibles</div>; {/*DIV modificable mediante CSS o con TSX*/}
    }
  /*Cualquier etiqueta es Modificable en la tabla genérica, mediante style directo/ClassName o TSX*/
    return (
        <table /* modificable: p. ej. className="w-full border-collapse" */ >
            <thead>
                <tr /* modificable: p. ej. className="bg-gray-100" */ >
                    {columnas.map(col => (
                        <th key={String(col.key)} /* modificable: p. ej. className="px-4 py-3 text-left text-sm font-semibold text-gray-600" */ >
                            {col.titulo}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {datos.map(item => (
                    <tr key={keyExtractor(item)} /* modificable: p. ej. className="border-t hover:bg-gray-50 transition" onClick={() => onFilaClick?.(item)} */ >
                        {columnas.map(col => (
                            <td key={String(col.key)} /* modificable: p. ej. className="px-4 py-3 text-sm" */ >
                                {col.render ? col.render(item) : String(item[col.key as keyof T] ?? "") /* modificable: p. ej. String(item[col.key as keyof T] ?? "—") */ }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

// [INTACTO] Exportación por defecto del componente
export default Tabla;
```

> [!TIP]
> **Antes (15 · `pelis-api`) → Ahora (16 · `componentes`)**
>
> | Antes | Ahora |
> |---|---|
> | **No existía**: la tabla era `<table>` plano en `App` + `PeliculaRow` | Componente genérico `<T>` reutilizado con `Pelicula` y con `ResumenGenero` |

> 📦 **En el proyecto:** [`TablaGenerica.tsx`](../../../repos/02-react-ejemplo-pelis-componentes/src/components/TablaGenerica.tsx) define `Columna<T>` y `keyExtractor`, y [`App.tsx`](../../../repos/02-react-ejemplo-pelis-componentes/src/App.tsx) lo reutiliza con `Pelicula` y con `ResumenGenero` (el tipo `T` se infiere de `datos`/`columnas`).

Ahora bien, ¿cómo se configura la tabla, de qué datos se alimenta la tabla y cómo se llama al componente? Habrá que hacer una estructura con:
- 1) Primero se definen las Columnas.
 ```tsx
interface ResumenGenero { //Definimos la FILA
  genero: string;
  total: number;
  media: number;
}
const COLUMNAS_RESUMEN: Columna<ResumenGenero>[] = [ //render determina CÓMO se pinta una celda. Probar a cambiar!
  { key: "genero", titulo: "Género", render: (fila) => fila.genero.toUpperCase() },
  { key: "total", titulo: "Núm.Pelis" },
  { key: "media", titulo: "Puntuación media", render: (fila) => fila.media > 9 ? (
        <span style={{ color: "green" , fontWeight: "bold" }}>{fila.media.toFixed(2)}</span>
      ) : (
        fila.media.toFixed(1)
      )}];

   ```  

   - 2) Si los datos son derivados y los toma de otro sitio (un array existente), habrá que hacer un **Memo** que calcule los datos de la nueva tabla. Ej: Memo **resumen**. Si los datos no son derivados, pues se le pasa el array original o el filtrado.

   ```tsx

 const resumen = useMemo<ResumenGenero[]>(() => {
      const porGenero = new Map<string, number[]>();
      for (const p of peliculas) {
        const notas = porGenero.get(p.genero) ?? [];
        notas.push(p.puntuacion);
        porGenero.set(p.genero, notas);
      }
      //Expandimos/Dispersamos/Separamos con spread, y recorremos con map.
      return [...porGenero.entries()].map(([genero, notas]) => ({genero,total: notas.length, 
        media: notas.reduce((a, b) => a + b, 0) / notas.length,
      }));
    }, [peliculas]);

   ```  
   - Finalmente se hace la llamada: ` <TablaGenerica datos={resumen} columnas={COLUMNAS_RESUMEN} keyExtractor={(fila) => fila.genero} />`. El último parámetro es la key de la fila que hay que intentar que no se repita, en este caso, al agrupar por género, lo más lógico es usarlo como key.

---

<a id="168-vista-de-tarjetas-peliculacard"></a>
## 16.8. Vista de tarjetas: `PeliculaCard`

El listado no tiene por qué ser siempre una tabla: `PeliculaCard` presenta la misma película (en cuanto a funcionamiento, no a diseño) como **ficha**.  Dicho de otra forma, es una variante de `PeliculaRow` (comparar Props)

El componente **o añade lógica, solo layout**: reutiliza `colorDeGenero` (§13.3.1) para el badge de género y `Boton` (§16.5) para las acciones, y recibe las mismas callbacks que ya maneja `App` (`onEditar` con la `pelicula` entera y `onBorrar` con el `id`), así que se le pasan `abrirEditar` y `borrar` directamente.

Usamos `<article>` dado que el Card representa en sí un bloque autónomo con sentido, no una división o contenedor de diseño (div). Queda más legible (representa un ítem) y además, los lectores de pantalla identifican **article** como un ítem independiente.

Regla exprés para diseño de bloques:
- ¿Es un trocito dentro de una frase? $\rightarrow$  `<span>`
- ¿Es solo un envoltorio visual/de diseño? $\rightarrow$ `<div>` 
- ¿Es una unidad de contenido independiente (como una tarjeta o entrada)? $\rightarrow$ `<article>`

> [!TIP]
> **Antes (15 · `pelis-api`) → Ahora (16 · `componentes`)**
>
> | Antes | Ahora |
> |---|---|
> | **No existía**: solo la vista de tabla | Vista de tarjetas (`PeliculaCard`) + conmutador `vista` (`"tabla" \| "tarjetas"`) en `App` |

> 📦 **Fichero del repo:** [`PeliculaCard.tsx`](../../../repos/02-react-ejemplo-pelis-componentes/src/components/PeliculaCard.tsx)

```tsx
// delta: nuevo en 16 — en 15 solo existía la vista de tabla
import type { CSSProperties } from "react";
import type { Pelicula } from "../tipos.ts";
import { colorDeGenero } from "../colorGenero.ts";
import { Boton } from "./Boton.tsx";

const CAJA: CSSProperties = {
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  padding: "0.75rem 1rem",
  display: "flex", 
  flexDirection: "column",
  gap: "0.35rem",
};

interface PeliculaCardProps {
  pelicula: Pelicula;
  onEditar: (pelicula: Pelicula) => void;
  onBorrar: (id: number) => void;
}

export function PeliculaCard({ pelicula, onEditar, onBorrar }: PeliculaCardProps) {
  return (
    <article style={CAJA}>
      <h3 style={{ margin: 0 }}>{pelicula.titulo}</h3>
      <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>{pelicula.anio}</span>
      <span
        style={{
          color: colorDeGenero(pelicula.genero.toLowerCase()),
          textTransform: "uppercase",
          fontWeight: 600,
          fontSize: "0.85rem",
        }}
      >
        {pelicula.genero}
      </span>
      <span>{pelicula.director}</span>
      <span>★ {pelicula.puntuacion.toFixed(1)}</span>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
        <Boton variante="primary" tamano="sm" onClick={() => onEditar(pelicula)}>
          Editar
        </Boton>
        <Boton variante="danger" tamano="sm" onClick={() => onBorrar(pelicula.id)}>
          Borrar
        </Boton>
      </div>
    </article>
  );
}
```

Anatomía de la tarjeta:

- **Contenedor `<article>`**, sigue CSS: apilado en columna (`flexDirection: "column"` + `gap`): el layout vertical ordena los campos sin calcular alturas.
- **Badge de género** con `colorDeGenero` y `textTransform: "uppercase"` — el mismo tratamiento que en `PeliculaRow`.
- **`marginTop: "auto"`** en el pie de acciones: empuja los botones al fondo de la tarjeta, de modo que en una rejilla con alturas distintas las acciones quedan alineadas.
- **`interface PeliculaCardProps`**: el contrato de props es similar al del resto de componentes, sobre todo a su "hermano" `PeliculaRow`.

### El conmutador de vista en `App`

`App` decide con un `useState` qué vista pinta; los dos botones del conmutador reutilizan las variantes de `Boton` (vista activa en `primary`, inactiva en `ghost`):

```tsx
const [vista, setVista] = useState<"tabla" | "tarjetas">("tabla");

<Boton variante={vista === "tabla" ? "primary" : "ghost"} onClick={() => setVista("tabla")}>
  Tabla
</Boton>
<Boton variante={vista === "tarjetas" ? "primary" : "ghost"} onClick={() => setVista("tarjetas")}>
  Tarjetas
</Boton>
```

Y el render condicional: la tabla de §13.8, o una **rejilla CSS** de tarjetas con `display: grid` y `repeat(auto-fill, minmax(240px, 1fr))`, que reparte las columnas disponibles según el ancho sin media queries:

```tsx
{vista === "tabla" ? (
  <PeliculaTable peliculas={visibles} onEditar={abrirEditar} onBorrar={borrar} />
) : (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
    {visibles.map((pelicula) => (
      <PeliculaCard key={pelicula.id} pelicula={pelicula} onEditar={abrirEditar} onBorrar={borrar} />
    ))}
  </div>
)}
```

El `.map` con `key` es el mismo de `PeliculaTable` (§13.8 y §16.3.3): cambia el contenedor, no el patrón. En la versión Tailwind (`repos/02-react-ejemplo-pelis-tailwind`) la única diferencia es el estilo: caja con `rounded-lg border p-4 shadow-sm`, badge con `claseDeGenero` y rejilla con `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`.

---

<a id="169-prácticas"></a>
## 16.9. Prácticas

La app completa de esta sesión está en [`repos/02-react-ejemplo-pelis-componentes`](../../../repos/02-react-ejemplo-pelis-componentes/): es la AppCine del apunte 15 refactorizada con componentes personalizados. Aquí tienes el extracto clave y **qué mirar**; el extracto es autosuficiente para el examen, y el archivo enlazado solo añade imports, JSX y estilos.

#### `src/App.tsx` — composición con componentes propios

📦 [`repos/02-react-ejemplo-pelis-componentes/src/App.tsx`](../../../repos/02-react-ejemplo-pelis-componentes/src/App.tsx)

**Qué mirar:**
- **Composición**: `Buscador`, `PeliculaTable` y `PeliculaForm` se combinan en una sola pantalla (§16.4).
- **`TablaGenerica<T>`** reutilizada para películas y para el resumen por género (§16.7).
- **`Boton`** con variantes y `cargando` sustituye a los `<button>` sueltos (§16.5).
- **Vista conmutable**: el estado `vista` alterna `PeliculaTable` (§16.3.3) y las tarjetas de `PeliculaCard` en una rejilla CSS (§16.8).
- Los hijos siguen avisando por props (`onBuscar`, `onGuardar`, `onEditar`, `onBorrar`); la fuente de la verdad sigue en `App`.
- **No monolítico**: compara con el `App.tsx` de 15, donde buscador, tabla y botones eran JSX inline.

#### Demos sueltas: `repos/02-react-componentes`

Los siguientes ficheros del sandbox repiten patrones ya vistos; el código aplicado a pelis son los enlaces 📦 de cada sección:

- [`Saludo.tsx`](../../../repos/02-react-componentes/src/components/Saludo.tsx) — `FC<Props>` y prop opcional; AppCine usa la alternativa preferida: función plana con `interface ...Props` (§16.3).
- [`Card.tsx`](../../../repos/02-react-componentes/src/components/Card.tsx) — envoltorio con `children: ReactNode`, el mismo patrón del `Modal` (§16.6).
- [`ListaTareas.tsx`](../../../repos/02-react-componentes/src/components/ListaTareas.tsx) — actualizaciones inmutables con `useState<Tarea[]>` (§13).
- [`FormularioRegistro.tsx`](../../../repos/02-react-componentes/src/state/FormularioRegistro.tsx) — validación con `ErroresForm = Partial<Record<...>>`; el mismo mecanismo, autocontenido con `useState`, está en `PeliculaForm` (§15.6 y §16.3).
- [`App.tsx`](../../../repos/02-react-componentes/src/App.tsx) — navegación por pestañas: `NAV.map` + `key` + renderizado condicional (§12.1.3).

## 📦 Ejemplos ejecutables

En [`repos/02-react-componentes`](../../../repos/02-react-componentes/) las pestañas **Personalizados** y **Cards** agrupan los ejemplos de este apunte:

| Pestaña | Ejemplos | Qué demuestra |
|---|---|---|
| **Personalizados** | `Boton.tsx` · `Modal.tsx` · `TablaGenerica.tsx` | `extends ButtonHTMLAttributes` · composición + `useEffect` · genérico `<T>` |
| **Cards** | `CardPelicula.tsx` · `CardBordePelicula.tsx` · `TablaPeliculas.tsx` | Mismo componente con campos opcionales · estilo · tabla para muchas filas |

Para ejecutarlos: `cd repos/02-react-componentes && npm run dev` → pestañas **Personalizados** y **Cards**.

### AppCine con componentes personalizados: `repos/02-react-ejemplo-pelis-componentes`

El proyecto [`repos/02-react-ejemplo-pelis-componentes`](../../../repos/02-react-ejemplo-pelis-componentes/) es la AppCine del apunte 15 reconstruida con las piezas de este capítulo (dos terminales: `npm run api` + `npm run dev`):

| Archivo | Qué demuestra |
|---|---|
| `src/components/PeliculaTable.tsx` | Listas con `key` — §13.8 y §16.3.3 |
| `src/components/PeliculaCard.tsx` | Tarjetas + conmutador de vista — §16.8 |
| `src/components/Buscador.tsx` | Input controlado + `onBuscar` — §16.3.1 |
| `src/components/PeliculaForm.tsx` | Formulario controlado con los 5 campos — §16.3.2 |
| `src/components/Boton.tsx` | `extends ButtonHTMLAttributes` — §16.5 |
| `src/components/Modal.tsx` | Overlay, `children` y cleanup — §16.6 |
| `src/components/TablaGenerica.tsx` | Componente genérico `<T>` — §16.7 |
| `src/App.tsx` | Composición de la pantalla — §16.4 |

---

[Volver al índice general](../../../README.md#5-distribución-temporal-y-contenidos-s00s13)
