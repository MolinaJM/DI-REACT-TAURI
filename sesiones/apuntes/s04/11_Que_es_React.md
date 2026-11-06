# 11. React de cero: qué es, cómo se usa y por qué TypeScript

> 🧭 **Sesiones donde se aplica:** S04 · S05 · S06 (y base para S07–S13). Esto apuntes son una **teoría de partida**: responde *qué es* React antes de escribir el primer componente. El repo completo `02-react-componentes` es el ejemplo de referencia con todo lo de estas sesiones.

> ⚠️ **Atención:** para seguir esta parte de apuntes de forma más sencilla, abre el **proyecto mínimo** [`repos/02-react-ejemplo-minimo`](../../../repos/02-react-ejemplo-minimo/)  (`npm install` más `npm run dev`)— una app React reducida a una caja de texto y un botón con dos componentes. Toda la teoría que verás aquí (props, estado, callbacks) se puede probar ahí al momento. 

> 🗺️ **Árbol de componentes del proyecto mínimo:** `App` es el **padre** que gestiona el estado (la memoria) ¿por qué? porque necesitamos comunicar los hermanos (luego veremos que esto también se podría hacer con un hook específico: `useContext` o incluso con una librería como **Zustang**). Los datos **bajan por props** (⬇) y las acciones **suben por callbacks** (⬆). Ejemplo:
>

>
> ```mermaid
> flowchart TD
>   App["App (padre)"] --> Form["FormularioNombre (hijo)"]
>   App --> Saludo["Saludo (hijo)"]
>
>   classDef padre fill:#2563eb,color:#ffffff,stroke:#1e40af,stroke-width:2px
>   classDef hijo fill:#ffffff,color:#0f172a,stroke:#94a3b8
>   class App padre
>   class Form,Saludo hijo
> ```
>
> ```mermaid
> sequenceDiagram
>     autonumber
>     participant App as App (padre)
>     participant Form as FormularioNombre (hijo)
>     participant Saludo as Saludo (hijo)
>
>     Note over App: const [nombre, setNombre] = useState("")
>
>     Form->>Form: usuario escribe → onChange → setTexto(loTecleado)
>     Form->>App: pulsa "Saludar" → onEnviar(texto)  ⬆ sube la acción
>     Note over App: setNombre(texto) → estado actualizado
>     Note over App: App re-renderiza con nombre = texto
>     App->>Saludo: nombre={nombre}  ⬇ baja el dato
>     Saludo-->>App: pinta "¡Hola, {nombre}!"
> ```
>
> 🔎 **Idea clave:** el mensaje sube (callback `onEnviar`), el padre actualiza su estado (`setNombre`), y el dato baja repintado (prop `nombre`).  Este "mecanismo" se llama `lifting state up` y se suele usar en casos simples. En casos más complejos habrá que echar mano del `useContext` o incluso **Zustang**.

> 📌 **React & TypeScript Cheatsheet (Decálogo):** las **10 reglas de oro** de React con TS y Tauri (props, estado, hooks, callbacks, `invoke`...) en un solo documento de consulta rápida → [**React & TypeScript Cheatsheet**](14_React_TS_Cheatsheet.md).

- [11. React de cero: qué es, cómo se usa y por qué TypeScript](#11-react-de-cero-qué-es-cómo-se-usa-y-por-qué-typescript)
  - [11.0. Repaso de TypeScript previo (el puente)](#110-repaso-de-typescript-previo-el-puente)
    - [11.0.1. Tipos, interfaces y datos](#1101-tipos-interfaces-y-datos)
    - [11.0.2. Módulos, funciones puras y reutilización](#1102-módulos-funciones-puras-y-reutilización)
    - [11.0.3. Asincronía, `fetch` y cancelación](#1103-asincronía-fetch-y-cancelación)
    - [11.0.4. Closures](#1103-asincronía-fetch-y-cancelación)
    - [11.0.5. De TS a React: traducción rápida](#1104-de-ts-a-react-traducción-rápida)
  - [11.1. ¿Qué es React?](#111-qué-es-react)
  - [11.2. ¿Cómo funciona? El modelo mental](#112-cómo-funciona-el-modelo-mental)
    - [11.2.1. Imperativo vs declarativo](#1121-imperativo-vs-declarativo)
    - [11.2.2. El Virtual DOM y el render](#1122-el-virtual-dom-y-el-render)
  - [11.3. Componentes: las piezas de React](#113-componentes-las-piezas-de-react)
    - [11.3.1. Componentes funcionales](#1131-componentes-funcionales)
    - [11.3.2. JSX/TSX](#1132-jsx)
    - [11.3.3. Eventos en JSX: `onClick`, `onChange`, `onSubmit`](#1133-eventos-en-jsx-onclick-onchange-onsubmit)
    - [11.3.4. Props: datos de entrada](#1134-props-datos-de-entrada)
    - [11.3.5. Estado y hooks](#1135-estado-y-hooks)
  - [11.4. El árbol de componentes y el flujo de datos](#114-el-árbol-de-componentes-y-el-flujo-de-datos)
    - [11.4.1. El punto de entrada: de `index.html` a `App`](#1141-el-punto-de-entrada-de-indexhtml-a-app)
  - [11.5. React con TypeScript: la plantilla mental](#115-react-con-typescript-la-plantilla-mental)
  - [11.6. Qué partes de TypeScript son las más usadas](#116-qué-partes-de-typescript-son-las-más-usadas)
- 🧪 **Ejercicios:** [Componentes, JSX y props](../../../ejerciciosRT/ejerciciosRT.md#bloque-11-componentes-jsx-y-props)

---

## 11.0. Repaso de TypeScript previo (el puente)

Antes de escribir tu primer componente, asegúrate de dominar esto. Todo es repaso del bloque TS (unidades 07-09). Es el **puente** entre lo que ya sabes de TypeScript y lo que React va a pedirte. 

### 11.0.1. Tipos, interfaces y datos

```typescript
interface Alumno {
  nombre: string;
  notas: number[];
  curso?: string;
}

const alumnos: Alumno[] = [
  { nombre: "Profe", notas: [7, 8, 9] },
  { nombre: "Ana", notas: [5, 6, 7] },
];

type AlumnoConMedia = {
  nombre: string;
  notas: number[];
  media: number;
};

function conMedia(alumno: Alumno): AlumnoConMedia {
  const { curso, ...resto } = alumno;
  const media = alumno.notas.reduce((s, n) => s + n, 0) / alumno.notas.length;
  
  return { ...resto, media };
}

const aprobados = alumnos
  .map(conMedia)                  
  .filter((a) => a.media >= 5);   

console.log(aprobados);  

const primero = aprobados[0]?.nombre ?? "Nadie";
const nuevoAlumno: Alumno = alumnos[0] 
  ? { ...alumnos[0], curso: "DI" } 
  : { nombre: "Sin datos", notas: [], curso: "DI" };

```

> [!NOTE]
> Usa funciones puras, arrays inmutables (`map`, `filter`, `...`) y tipos precisos. Es justo lo que harás al actualizar estado en React.

### 11.0.2. Módulos, funciones puras y reutilización

```typescript
// tipos.ts
export type Filtro = "todas" | "pendientes" | "completadas";
export interface Tarea {
  id: number;
  texto: string;
  completada: boolean;
}

// servicios/tareas.ts
import type { Filtro, Tarea } from "./tipos.ts";

export function filtrar(tareas: Tarea[], filtro: Filtro): Tarea[] {
  if (filtro === "pendientes") return tareas.filter((t) => !t.completada);
  if (filtro === "completadas") return tareas.filter((t) => t.completada);
  return tareas;
}
```

> [!NOTE]
> Separa **tipos**, **lógica pura** y **punto de entrada**.

### 11.0.3. Asincronía con `fetch` 

```typescript
interface Alumno {
  id: number;
  nombre: string;
}

async function cargarAlumnos(url: string): Promise<Alumno[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al cargar");
  return (await res.json()) as Alumno[];
}
```

### 11.0.4. Closures 

```typescript 
function crearContador() {
  let contador = 0; //Esta variable está en el ámbito exterior de crearContador
  return function() {
    contador++; // La función interna accede y modifica la variable exterior
    return contador;
  };
}

//Creamos una instancia del contador
const contar = crearContador();

console.log(contar());// 1
console.log(contar());// 2
console.log(contar());// 3
```
### 11.0.5. De TS a React: traducción rápida (IMPORTANTE)

| Lo que ya sabes (TS) | En React 19 |
|:---|:---|
| Función que recibe datos y devuelve un valor | Componente (`function Componente(props)`) que devuelve JSX |
| `interface` para tipar parámetros | Props tipadas mediante `interface` |
| Variables con tipos (`T \| null`) | `useState<T>()` / `useReducer`("useState avanzado") |
| `fetch` + `try/catch` + `async/await` | `useEffect` + `fetch` (mismos estados ya vistos... cargando/error/listo) |
| `map()` / `filter()` sin mutar | Listas con `{items.map(i => <Item key={i.id} />)}` |
| `if/else`, ternario | Render condicional / cortocirtuito (`&&`, ternario) |
| Módulos ES `import`/`export` | Componentes, tipos y utilidades reutilizables |
| Unión de literales (`"a" \| "b"`) | Estado cambiantes controlados mediante elementos de UI (filtros, radios, `select`) |

---

## 11.1. ¿Qué es React?

**React** es una **librería JavaScript para construir interfaces de usuario** a partir de piezas reutilizables llamadas **COMPONENTES** (piezas de Lego). La creó Meta (Facebook) en 2013 y hoy es la librería de UI más usada del ecosistema web.

Puntos clave:

- React **no es un lenguaje**: es JavaScript (con su sintaxis *JSX*) corriendo una librería. *JSX* es una especie de HTML `chetado` (con superpoderes, con código ejecutable dentro de él). Y como en este curso usamos **TypeScript**, todos esos componentes se escriben **tipados**, con `.tsx` en lugar de `.jsx`.
- Es una **librería**, no un framework completo: se encarga de la **vista** (la UI). La lógica de negocio, el enrutado, el estado global o el acceso a datos son decisiones que tú añades con otras herramientas (React Router, Zustand, `fetch`/`invoke`...).
- Aplica el concepto de **"UI = f(estado)"**: a partir del estado actual, React calcula qué debe mostrarse. Ej: si cambia el texto de la caja al darle al botón, cambia la etiqueta.
- Trabaja con **componentes**, funciones que devuelven lo que se pinta en pantalla. Ej: un botón.
- Vive dentro del **navegador/webview**. En Tauri, React se ejecuta en el *webview* nativo, y el **host Rust** (Tauri) le da capacidades de escritorio.
- React no manipula el DOM a mano (no haces `document.createElement`como se podría hacer en JS); **declaras qué debe haber** y React se encarga de llevarlo a la pantalla.

---

## 11.2. ¿Cómo funciona? El modelo mental

### 11.2.1. Imperativo vs declarativo

| Estilo | Qué haces | Ejemplo mental |
|--------|-----------|----------------|
| **Imperativo** (vanilla JS) | Dices *cómo* hacerlo, paso a paso: `document.getElementById(...).appendChild(...)`, `list.style.color = "red"`. | Sería como montar el mueble de IKEA siguiendo cada instrucción. |
| **Declarativo** (React) | Dices *qué* quieres, y React hace el resto. | Tú dices "quiero un armario aquí" y lo traen montado. |

> 💡 **¿Cómo haríamos para...?** pintar en pantalla el texto "Hola, Tronco!" a partir de un nombre guardado en una variable? Hay dos caminos: hacerlo **a mano** (imperativo: tú gestionas el DOM, paso a paso) o **describirlo** (declarativo: dices qué quieres y React lo monta por ti). Compara los dos:

```typescript
// Imperativo (vanilla): tú gestionas el DOM a mano
const h1 = document.createElement("h1");
h1.textContent = `Hola, ${nombre}`;
document.getElementById("app")!.appendChild(h1);

// Declarativo (React): describes la UI
<h1> Hola, {nombre} </h1>, mezclando HTML y TS (TSX)
```

### 11.2.2. El Virtual DOM y el render

Cada vez que el **estado** cambia, React:

1. Vuelve a ejecutar los componentes afectados y produce una **descripción** de la UI (el *Virtual DOM*, un árbol en memoria — no el DOM real).
2. Compara la descripción nueva con la anterior (el "diff").
3. Aplica solo los **cambios mínimos** al DOM real del navegador.

Es por esto que escribes código que "repinta todo" (*digamos que se "prepara" el escenario*), pero el navegador no recarga ni recrea toda la página: React optimiza qué nodos se tocan. En el proyecto de ejemplo al pulsar botón, cambia el estado del padre, que sa su vez envía un prop al hijo Saludo.tsx

---

## 11.3. Componentes: las piezas de React

Un **componente** (o componente funcional) es una función que recibe (opcionalmente) **datos de entrada**  o ***props***  y devuelve lo que se pinta. Las convenciones:

- Se nombran con **Mayúscula inicial** (`PeliculaCard`, no `peliculaCard`) — así React distingue un componente de una etiqueta HTML.
- Se escriben en ficheros `.tsx` (TS + JSX).

### 11.3.1. Componentes funcionales

> 💡 **¿Cómo haríamos para...?** mostrar un saludo que cambie según el nombre que queramos, sin tener que escribir el HTML a mano cada vez? La respuesta es un **componente**: una función reutilizable que recibe el nombre y devuelve el JSX ya montado:

```tsx
// Fichero Saludo.tsx . Componente funcional Saludo: recibe props y devuelve JSX
// No confundir sintaxis! Se le pasa un objeto (prop) con campo nombre tipado
// y se desestructura en la cabecera a nombre
export function Saludo({ nombre }: { nombre: string }) {
  return <h1>Hola, {nombre}</h1>;
}

// Componente funcional: recibe props y devuelve JSX en formato arrow
export const Saludo=({ nombre }: { nombre: string }) => {
  return <h1>Hola, {nombre}</h1>;
}

//En el componente padre habría que llamarlo así
import {Saludo} from "./Saludo.tsx"
export default function App() {
  const n="Tronco"
  return (
        <Saludo nombre={n}></Saludo> //el nombre del prop es "nombre" y su valor es "n"
  );
}

//Y a su vez, App ha de ser llamada desde otro componente inicial. 
//Normalmente el PUNTO DE ENTRADA es main.tsx (con una estructura más o menos fija)
```

Son funciones **puras** respecto a sus props: mismo `nombre` → mismo JSX. Las funciones puras en matemáticas son aquellas que bajo los mismos datos de entrada SIEMPRE dan los mismos datos de salida.

### 11.3.2. JSX/TSX

**JSX** es una extensión de sintaxis que mezcla HTML y expresiones JavaScript, **TSX** es su variante tipada. Reglas esenciales:

- **Una sola raíz** por retorno (`<>...</>`). Esa raíz puede tener una estructura jerárquica (padres/hijos). En el siguiente ejemplo la raíz es un `<ul>`
- Expresiones JavaScript/TypeScript entre **llaves `{}`** (strings, números, ternarios, cortocircuitos `&&`, llamadas a `map`...).
- Declaraciones (`if`, `for`) **no** van entre llaves: van fuera o se sustituyen por ternarios.
- Atributos en `camelCase`: `onClick` (no `onclick`).

> 💡 **¿Cómo haríamos para...?** pintar una lista de nombres cuando **no sabemos cuántos habrá** (1, 5 o 100)? Con `map` sobre el array, generando un `<li>` por cada elemento y usando `key`:

```tsx
//Sin sintaxis extendida (todo en cabecera)
function Lista({ nombres }: { nombres: string[] }) {
  return (
    <ul>
      {nombres.map((n) => (
        <li key={n}>{n}</li>
      ))}
    </ul>
  );
}

//Con sintaxis extendida, separado en interface y cabecera. Esta opción es PREFERIBLE
//En el caso anterior teníamos un único parámetro, pero si tenemos 8??
//Es mejor "envolverlos" en un objeto
//Se usa XXXProps por norma o convención
interface ListaProps {
  nombres: string[];
}

// 2. Usas la desestructuración aplicando el tipo definido
function Lista({ nombres }: ListaProps) {
  return (
    <ul>
      {nombres.map((n) => (
        <li key={n}>{n}</li>
      ))}
    </ul>
  );
}

//Probamos a meter un componente Lista en la APP de prueba
```

> [!NOTE]
> La **`key`** en las listas es obligatoria ya que si hay 2 elementos con el mismo key, si cambia, no sabría cuál re-renderizar: le da a React una identidad estable a cada elemento para poder hacer el *diff* eficientemente. Hay que usarla con un id único, nunca con el índice si la lista cambia de orden. En el navegador podemos ver los problemas asociados a el mal uso de key si no se pone(Probar en EDGE con F12).

### 11.3.3. Eventos en JSX: `onClick`, `onChange`, `onSubmit`

En JSX, los manejadores de eventos se escriben en **camelCase** (`onClick`, `onChange`, `onSubmit`) y se les **pasa una función**, no un string como ocurre con `onclick` en HTML plano.

```tsx
// ❌HTML plano (minúsculas + cadena de texto)
<button onclick="saludar()">Pulsar</button>

// ✅ React JSX (camelCase + función)
<button onClick={() => saludar()}>Pulsar</button>
<input onChange={(e) => setTexto(e.target.value)} />
```

**Diferencias clave:**

| Aspecto | `onclick` (HTML) | `onClick` (JSX/React) |
|---|---|---|
| **Sintaxis** | Minúsculas | **camelCase** |
| **Valor** | Cadena de texto (`"..."`) | **Función** (`() => {}`, `miFuncion`, etc.) |
| **Funcionamiento** | Se asigna directamente al elemento del DOM | Gestionado por el **sistema de eventos** de React |

> [!WARNING]
> **No los confundas.** `onClick` **NO** es lo mismo que `onclick`. En JSX son *props*, no atributos HTML. React usa su propio sistema de eventos sintéticos para manejarlos.

> [!NOTE]
> **Atributos sí HTML, eventos son props.** Cosas como `placeholder`, `type`, `name`, `id` o `value` **sí son atributos HTML nativos** que deberían conocerse desde primer curso. En cambio, `onClick`, `onChange`, `onSubmit` son **manejadores de eventos** que se pasan como *props* al sistema de React.
>
> **Sobre `setTexto`/`setNombre`:** no son funciones de React. Son el *setter* devuelto por `useState`. Al hacer `const [texto, setTexto] = useState("")`, `setTexto` es un *closure* que pertenece a ese componente y sirve para actualizar su estado y provocar un nuevo render. Es por eso que lo usamos junto a `onChange` en los **formularios controlados** (`value={texto}` + `onChange={(e) => setTexto(e.target.value)}`).

### 11.3.4. Props: datos de entrada

Las **props** son los parámetros que recibe un componente desde su padre. En TypeScript se tipan con una **`interface`**, con propiedades obligatorias y opcionales (`?`).

> 💡 **¿Cómo haríamos para...?** que una tarjeta de película muestre datos que le llegan de fuera (título, puntuación y un género opcional)? Declarando cuáles son esos datos con una `interface`, y recibiéndolos como props:

```tsx
interface PeliculaCardProps {
  titulo: string;
  puntuacion: number;
  genero?: string; // opcional
}

function PeliculaCard({ titulo, puntuacion, genero }: PeliculaCardProps) {
  return (
    <div>
      <h3>{titulo}</h3>
      <p>{puntuacion} / 10</p>
      {genero && <span>{genero}</span>}
    </div>
  );
}

//Probamos a meter el componente en el proyecto de prueba
```

Las props **son de solo lectura**: un componente nunca debe modificar las suyas; si necesita cambios, los pide al padre (con *callbacks* pasados por props) o gestiona su propio **estado**.
Por otra parte estamos usando un cortocircuito con &&. Otra posible forma de manejar `genero` sería mediante un ternario: `{genero ? <span>{genero}</span> : <h1>sin género</h1>}`

### 11.3.5. Estado y hooks

El **estado** es información que el componente recuerda entre renderizados y que, al cambiar, dispara un re-render. Los **Hooks** son funciones especiales de React que te permiten "enganchar" (*hook into*) el estado y otras características del ciclo de vida de React dentro de componentes funcionales. En resumen: **un hook es como un almacén para guardar/modificar/leer un estado(variable)**.

¿Cómo identificas un Hook?

Por **convención**, todos los Hooks empiezan por la palabra `use` (`useState`, `useEffect`, `useContext`, `useRef`, etc.). Además, puedes crear tus propios **Custom Hooks** (por ejemplo, `useFetch` o `useUserStore` en Zustand) aislando lógica reutilizable en funciones que empiezan por `use`.

> [!TIP]
> Los hooks **no** se pueden llamar dentro de condicionales ni bucles: deben ejecutarse en el mismo orden en cada render (regla de los hooks). Se nombran siempre con el prefijo `use`.

| Hook | Para qué sirve | Tipo en TS |
|------|----------------|------------|
| `useState` | Estado local del componente | `useState<T>(valorInicial)` |
| `useEffect` | Efectos secundarios (fetch, suscripciones, timers) | `useEffect(fn, deps)` |
| `useRef` | Referencias a elementos DOM o valores que no re-renderizan | `useRef<T>(inicial)` |
| `useContext` | Compartir estado entre componentes sin pasar props por todos los niveles | `useContext(Contexto)` |

#### `useState` (para guardar datos que cambian)

Permite que un componente recuerde información y se vuelva a dibujar (renderizar) cuando esa información cambia.

> 💡 **¿Cómo haríamos para...?** que un botón **recuerde** cuántas veces se ha pulsado y se actualice en cada clic? Con `useState`: `valor` es la variable con el dato; `setValor` es la función para cambiarlo:

```tsx
import { useState } from "react";

function Contador() {
  const [valor, setValor] = useState<number>(0);

  return (
    <button onClick={() => setValor((v) => v + 1)}>Clicks: {valor}</button>
  );
}

//Probamos a meter el componente en el proyecto de prueba
```

#### `useEffect` (para efectos secundarios)

- **Para qué?** Lo usamos cuando necesitamos ejecutar código que NO tiene que ver directamente con el pintado del JSX. 
- **Cuándo se ejecuta?** Se ejecuta cuando el componente se dibuja en pantalla o cuando cambian ciertas variables. 
- **En qué casos concretos se usa?** Sirve para hacer **fetch**, para cargar ficheros o manipular cosas fuera de React.

> 💡 **¿Cómo haríamos para...?** actualizar el título de la pestaña cada vez que el usuario escribe su nombre? Con `useEffect`, que recibe un array de dependencias:

```tsx
import { useEffect, useState } from "react";

function Titulo() {
  const [nombre, setNombre] = useState("Alicia");

  useEffect(() => {
    // Esto se ejecuta cada vez que 'nombre' cambia. Abajo está el Array de dependencias
    document.title = `Hola, ${nombre}`;
  }, [nombre]); // <--Array de dependencias

  return <input value={nombre} onChange={(e) => setNombre(e.target.value)} />;
  // Se podría haber hecho todo abajo, pero estamos separando por organización de código
  /*return <input value={nombre} onChange={(e) => {
         setNombre(e.target.value);
         document.title = `Hola, ${nombre}`;
         } 
  } />;*
}/

//Probamos a meter el componente en el proyecto de prueba
```

#### 

#### `useContext`: Comunicación entre componentes hermanos 

Cuando dos componentes **hermanos** necesitan compartir información, lo normal es **subir el estado al padre común** (*lifting state up*) y pasar datos/callbacks por props. 

Sin embargo, si el árbol fuera muy profundo o con muchas ramificaciones, pasar props por muchos niveles se vuelve incómodo. Ahí aparece **`createContext` + `useContext`**: se crea un **contexto** en un ancestro común, se provee con `<Contexto.Provider value={...}>` y cualquier componente descendiente (hijo, nieto, incluso **hermano** accediendo desde el mismo proveedor) puede leerlo con `useContext(Contexto)` **sin pasar props por cada nivel**.

> [!NOTE]
> **Regla práctica:** para **dos hermanos directos** lo más claro es subir el estado al padre. `useContext` brilla cuando el estado debe compartirse por un **subárbol** o hay muchos componentes que lo necesitan.

**Ejemplo: dos componentes hermanos que comparten un contador sin pasar props por todos los huecos**

```tsx
//1. Tipos.ts
export interface ContadorContextType {
  contador: number;
  incrementar: () => void;
}


//2. FICHERO: ContadorContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import type { ContadorContextType } from "./tipos";

const ContadorContext = createContext<ContadorContextType | undefined>(undefined);

export function ContadorProvider({ children }: { children: ReactNode }) {
  const [contador, setContador] = useState(0);
  const incrementar = () => setContador((c) => c + 1);

  return (
    <ContadorContext.Provider value={{ contador, incrementar }}>
      {children}
    </ContadorContext.Provider>
  );
}

export function useContador() {
  const ctx = useContext(ContadorContext);
  if (ctx === undefined) {
    throw new Error("useContador debe usarse dentro de ContadorProvider");
  }
  return ctx;
}


//3. FICHERO: components/ContadorMostrar.tsx
import { useContador } from "../ContadorContext";

export function ContadorMostrar() {
  const { contador } = useContador();
  return <p>Contador: {contador}</p>;
}


//4. FICHERO: components/ContadorBoton.tsx
import { useContador } from "../ContadorContext";

export function ContadorBoton() {
  const { incrementar } = useContador();
  return <button onClick={incrementar}>+1</button>;
}


//5. FICHERO: App.tsx (Punto de entrada)
import { ContadorProvider } from "./ContadorContext";
import { ContadorMostrar } from "./components/ContadorMostrar";
import { ContadorBoton } from "./components/ContadorBoton";

export default function App() {
  return (
    <ContadorProvider>
      <ContadorMostrar />
      <ContadorBoton />
    </ContadorProvider>
  );
}
```

> [!NOTE]
> **Fíjate:** `ContadorMostrar` y `ContadorBoton` son **hermanos**. **Ninguno** pasa props al otro. Ambos leen y escriben el mismo estado a través de `useContext`. El proveedor (`ContadorProvider`) vive en su padre común (`App`). 

> **Diferencia con el enfoque clásico:** Con *lifting state up*, `App` tendría `[contador, setContador]` y pasaría `contador` a `ContadorMostrar` y `setContador`/`incrementar` a `ContadorBoton` por props. Con `useContext`, evitamos ese encadenado de props y cualquier descendiente accede directamente al contexto.

---

## 11.4. El árbol de componentes y el flujo de datos

### 11.4.1. El punto de entrada: de `index.html` a `App`

Toda app React (y Vite, que es lo que usa este curso) arranca con esta cadena de ficheros:

```
index.html  ── carga con <script> ──▶  src/main.tsx  ── monta con createRoot ──▶  App.tsx
```

1. **`index.html`** es la **única página HTML** que sirve el navegador (SPA). Contiene un `<div id="root"></div>` vacío, que será el **hueco donde React inserta la app**, y un `<script type="module" src="/src/main.tsx">` que arranca todo.

> 💡 **¿Cómo haríamos para...?** que el navegador tenga un punto de montaje vacío donde React "cuelgue" toda la app? Un único HTML con un `<div id="root">` y un script que cargue el código TypeScript:

```html
<!-- index.html -->
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

2. **`src/main.tsx`** es el **punto de entrada JavaScript/TypeScript**. Importa el `App` y lo **monta** en el `#root` con `createRoot`. Es el único lugar donde se "manipula" el DOM directamente (para enganchar React a la página):

> 💡 **¿Cómo haríamos para...?** decirle a React que el `<div id="root">` del HTML es suyo y montar ahí la app? `createRoot(...).render(...)` hace el enganche:

```tsx
// src/main.tsx
import { createRoot } from "react-dom/client";
import App from "./App";

//StrictMode hace doble ejecución de useState y useEffect para ver si genera problemas.
//Ej: componente CHAT que al quitarlo (desmontar) no limpia/reinicia variables o conexiones. Podrías
// tener varias conexiones. Estas cosas son las que intenta detectar
createRoot(document.getElementById("root")!).render(
  <React.StrictMode> 
    <App />
  </React.StrictMode>
);
```

3. **`src/App.tsx`** es el **componente raíz**: devuelve el JSX de toda la interfaz y da comienzo al árbol de componentes:

> 💡 **¿Cómo haríamos para...?** que ese `App` montado en `main.tsx` contenga el resto de pantallas? `App` es el primer componente y, dentro, se compone de otros:

```tsx
// src/App.tsx
function App() {
  return (
    <div>
      <Cabecera />
      <ListaPeliculas />
    </div>
  );
}
export default App;
```

> [!NOTE]
> `document.getElementById("root")!` usa el **operador de aserción no-null (`!`)** para decirle a TypeScript "sé que `root` existe". En AppCine/el scaffolding real este fichero de entrada ya está montado; tú solo tocas `App.tsx` y los componentes que crees.

Una app React se compone de una raíz (`App`) que "cuelga" de la etiqueta de montaje (normalmente `#root` en `main.tsx`). Cada componente puede contener otros, formando un **árbol**:

```
App
├── Cabecera
│   └── Buscador (input controlado)
├── ListaPeliculas
│   ├── PeliculaCard (xN, con key)
│   └── BotonNueva
└── ModalFormulario
```

Flujo dominante en React:

- **De arriba abajo**: los datos bajan por **props**, de padre a hijo.
- **De abajo arriba**: los hijos "notifican" al padre con **callbacks** (funciones por props): `onClick`, `onSave`, `onDelete`...
- **Estado compartido**: cuando varios componentes necesitan los mismos datos, se sube el estado al ancestro común (*lifting state up*), y ese ancestro distribuye los datos por props.

> [!NOTE]
> En S05 verás esto con detalle (estado compartido y *lifting state up*). La idea es que el estado se vive arriba y los eventos se disparan desde abajo.

---

## 11.5. React con TypeScript: la plantilla mental

TypeScript **no** cambia cómo funciona React: hace que lo que ya escribes sea **comprobable en compilación**. La relación es de "contratos", y se resume en la "plantilla mental" de cualquier componente que harás en el curso:

1. **Tipas los datos** con `interface` / `type` (el modelo de tu app, ej. `Pelicula`).
2. **Tipas las props** del componente con una `interface ...Props` (obligatorias y `?`).
3. **Renderizas** listas con `.map()` y `key`, y condiciones con ternarios/`&&`.
4. **Gestionas estado** con `useState<T>` (y `useEffect` para datos asíncronos).
5. **Tipas los eventos** de los handlers (`React.FormEvent`, `React.ChangeEvent`, `React.MouseEvent`).
6. **Comunicas** hijos→padre con callbacks tipados por props.

Los componentes se escriben en `.tsx` (JSX + TS). Es un ciclo que repetirás en todos los componentes; dominarlo es dominar React.

> [!IMPORTANT]
> El **`strict` mode** de TypeScript es tu red de seguridad: al tipar props, estado y eventos, el compilador te avisa antes de ejecutar si pasas un tipo incorrecto a un componente (p. ej. un `string` donde se espera `number`). En React, casi todos los errores de tipos que se escapan terminan dando *runtime errors* difíciles de depurar — TypeScript los convierte en errores de compilación claros.

---

## 11.6. Qué partes de TypeScript son las más usadas

No necesitas todo TypeScript para hacer React: este curso ya te dio lo esencial en S02/S03. Lo que más se repite en componentes React y que iremos viendo:

| Concepto TS | Dónde lo usas en React |
|-------------|------------------------|
| `interface` / `type` | Modelo de datos y **tipado de props** |
| Propiedades opcionales `?` | Props/estado que pueden faltar |
| **Generics `<T>`** | `useState<T>`, `useRef<T>`, `useReducer<R>`, componentes genéricos |
| **Utility types** (`Partial`, `Pick`, `Omit`, `Record`) | Formularios de edición, mapas de configuración (ej. colores por género)Volveremos a 10_Generics.md cuando haga falta. |
| **Uniones de literales** | `type Estado = "crear" \| "editar"` — modela selectores y condiciones |
| **Narrowing / type guards** | Comprobar datos antes de usarlos (p. ej. en `useEffect` con `fetch`) |
| **Type assertions** `as` | `as HTMLElement` al tocar el DOM desde `useRef` |
| Tipado de funciones/callbacks | Props que reciben funciones (`onEnviar`)  |
| Módulos `import`/`export` | Separar componentes y servicios en ficheros |
| `Record<string, T>` | Mapas clave-valor (colores, etiquetas) |

> [!TIP]
> De todo lo anterior, la pareja que hace React + TS "clic" es **interfaces para props + generics para hooks**. Ambas las practica en profundidad el apunte [13 · TypeScript aplicado a React](13_Tipado_en_React_TS.md).

---

> 📌 **Recuerda:** esto es la teoría. El dominio llega escribiendo componentes; los ejercicios del [catálogo](../../../ejerciciosRT/ejerciciosRT.md) lo practican.

---

[Volver al índice general](../../../README.md#5-distribución-temporal-y-contenidos-s00s13)
