# Asincronismo. CallBacks, Promesas y Async/Await en TypeScript 📝 🖥️

- [Asincronismo. CallBacks, Promesas y Async/Await en TypeScript 📝 🖥️](#asincronismo-callbacks-promesas-y-asyncawait-en-typescript--️)
  - [1. Sincronismo/Asincronismo en JavaScript](#1-sincronismoasincronismo-en-javascript)
    - [Operaciones Síncronas:](#operaciones-síncronas)
    - [Operaciones Asíncronas:](#operaciones-asíncronas)
  - [2. Los Callbacks](#2-los-callbacks)
    - [2.1 Callback Básico](#21-callback-básico)
    - [2.2 Callback con Parámetros](#22-callback-con-parámetros)
    - [2.3. Callbacks en Eventos](#23-callbacks-en-eventos)
    - [2.4 Callback de Temporizador](#24-callback-de-temporizador)
    - [2.5 Callback Hell: El Desafío de los Callbacks Anidados](#25-callback-hell-el-desafío-de-los-callbacks-anidados)
  - [3. Las Promesas](#3-las-promesas)
    - [3.1 Creación de una Promesa](#31-creación-de-una-promesa)
    - [3.2 Resolución y Rechazo de Promesas](#32-resolución-y-rechazo-de-promesas)
      - [1. Método `then`:](#1-método-then)
      - [2. Método `catch`:](#2-método-catch)
      - [3. Método `finally`:](#3-método-finally)
    - [3.3 Encadenamiento de Promesas](#33-encadenamiento-de-promesas)
    - [3.4 Manejo de Errores con Promesas](#34-manejo-de-errores-con-promesas)
    - [3.5 Promesas en Paralelo](#35-promesas-en-paralelo)
    - [3.6 Combinadores modernos de Promesas (ES2020+)](#36-combinadores-modernos-de-promesas-es2020)
    - [3.7 El Event Loop: microtareas vs macrotareas](#37-el-event-loop-microtareas-vs-macrotareas)
  - [4. Async/Await: Simplificando el Uso de Promesas](#4-asyncawait-simplificando-el-uso-de-promesas)
    - [Otros Ejemplos:](#otros-ejemplos)
      - [1. Uso Básico:](#1-uso-básico)
      - [2. Manejo de Errores con Try/Catch:](#2-manejo-de-errores-con-trycatch)
      - [3. Múltiples Operaciones Asíncronas:](#3-múltiples-operaciones-asíncronas)
      - [4. Uso de Async/Await con Fetch:](#4-uso-de-asyncawait-con-fetch)
  - [5. El tipado de `Promise<T>`: la clave de TypeScript](#5-el-tipado-de-promiset-la-clave-de-typescript)
  - [6. Bibliografía:](#6-bibliografía)

## 1. Sincronismo/Asincronismo en JavaScript

En programación, el `sincronismo` y el `asincronismo` se refieren a la forma en que se ejecutan las tareas. En el **_sincronismo_**, las tareas se ejecutan una tras otra, en el orden en que se declaran. En el **_asincronismo_**, las tareas se pueden ejecutar al mismo tiempo, o en cualquier orden.

En JavaScript, el sincronismo es el modo de ejecución predeterminado. Cuando se ejecuta una tarea sincrónica, el navegador web detiene la ejecución del código hasta que la tarea se complete. Esto puede provocar problemas de rendimiento, ya que el navegador web puede estar esperando a que se complete una tarea que no es crítica para el flujo de la aplicación.

El asincronismo se puede utilizar para evitar estos problemas de rendimiento. Cuando se ejecuta una tarea asíncrona, el navegador web continúa ejecutando el código siguiente, sin esperar a que la tarea se complete. La tarea asíncrona se ejecuta en segundo plano y, cuando se completa, se notifica al navegador web.

> [!NOTE]
> Estas reglas del lenguaje son iguales en JS y TS. TypeScript no cambia la asincronía: **solo la tipa**. En este capítulo verás `Promise<T>` y `async`/`await` con tipos, que te avisan si usas mal el resultado de una operación asíncrona.

### Operaciones Síncronas:

- En las operaciones síncronas, cada instrucción espera a que la instrucción anterior se complete antes de ejecutarse.
- El flujo de ejecución sigue una secuencia lineal.
- Las operaciones bloquean la ejecución del código hasta que se resuelven.

_Ejemplo síncrono:_

```typescript
console.log("Inicio");
for (let i = 0; i < 5; i++) {
  console.log(i);
}
console.log("Fin");
```

En este ejemplo, cada número se imprimirá en orden, uno después del otro, antes de imprimir "Fin".

### Operaciones Asíncronas:

- En las operaciones asíncronas, el código no espera a que una operación se complete y continúa ejecutándose.
- Se utilizan callbacks, Promesas y async/await para manejar el resultado de las operaciones asíncronas.
- Permite realizar tareas en segundo plano sin bloquear la ejecución del código.

_Ejemplo Asíncrono con Callback:_

```typescript
console.log("Inicio");
setTimeout(() => {
  console.log("Hola Profe. Ejecutando después de 2 segundos");
}, 2000);
console.log("Fin");
```

En este ejemplo, "Inicio" se imprimirá, luego "Fin", y finalmente, después de 2 segundos, se imprimirá "Hola Profe. Ejecutando después de 2 segundos".

`TypeScript (y JavaScript) proporciona varios mecanismos para gestionar el asincronismo en la versión ES6 y posteriores. Los más importantes serían los CallBacks, las promesas, el Async/Await, los Event Listeners, Timers. Vamos a ver algunos de los que acabo de mencionar.`

## 2. Los Callbacks

Los callbacks en JavaScript son como piezas de un rompecabezas que encajan perfectamente en el mundo asincrónico. Son funciones que se ejecutan después de que se completa una tarea. En lugar de bloquear el flujo de ejecución, los callbacks permiten que tu código continúe haciendo otras cosas mientras espera que una tarea finalice.

### 2.1 Callback Básico

Lo primero que tenemos que recordar es que las funciones son `objetos` (object) para Javascript — y en TypeScript tienen además un **tipo** (`() => void`, `(x: number) => string`, etc.).

Dicho lo cual, supongamos que deseamos realizar una tarea que puede tardar en el tiempo y luego ejecutar otra función cuando termine. Aquí tenemos un ejemplo:

```typescript
function hacerTarea(callback: () => void): void {
  console.log("Realizando tarea...");
  setTimeout(function () {
    console.log("Tarea completada.");
    callback();
  }, 2000);
}
/* Al parámetro de hacerTarea lo podemos llamar como queramos, pero es una buena práctica usar la palabra callback 
para indicar el tipo de parámetro que se le tiene que pasar, una función callback. En TS además definimos su tipo:
`callback: () => void` significa "función sin parámetros que no devuelve nada".
 */

function miCallback(): void {
  console.log("El callback ha sido ejecutado.");
}

hacerTarea(miCallback);
```

> [!IMPORTANT]
> El tipo del callback palabra por palabra es el contrato: `() => void`. Si `hacerTarea` esperara un valor del callback, sería `(resultado: number) => void`. TypeScript **obliga** a que la función que pasamos encaje con ese tipo.

En este ejemplo, la función `hacerTarea` simula una tarea demorada en el tiempo con un setTimeout y luego llama al `callback` cuando está lista. Esto permite una ejecución no bloqueante.

### 2.2 Callback con Parámetros

Los callbacks también pueden recibir argumentos. Imagina que necesitas realizar un cálculo asincrónico y luego procesar el resultado:

```typescript
function operacionAsincrona(valor: number, callback: (resultado: number) => void): void {
  setTimeout(function () {
    const resultado = valor * 2;
    callback(resultado);
  }, 1000);
}

function procesarResultado(resultado: number): void {
  console.log(`El resultado es: ${resultado}`);
}

operacionAsincrona(5, procesarResultado);
```

Aquí, `operacionAsincrona` toma un valor y un `callback`, realiza una operación y luego pasa el resultado al `callback`. Esto como puedes comprobar es bastante versátil.

### 2.3. Callbacks en Eventos

Los callbacks son excelentes para manejar eventos. Supongamos que deseas detectar cuándo un botón se hace clic:

```typescript
const boton = document.getElementById("miBoton");

function clicCallback(): void {
  console.log("El botón ha sido clickeado.");
}

boton?.addEventListener("click", clicCallback);
```

Al hacer clic en el botón, se llama al `clicCallback`. Esto es útil para interactuar con el usuario de manera asincrónica.

### 2.4 Callback de Temporizador

Un uso común de los callbacks es con temporizadores como hemos visto antes. Por ejemplo:

```typescript
function miCallback(): void {
  console.log("El temporizador ha terminado.");
}

setTimeout(miCallback, 3000);
```

Aquí, `setTimeout` espera tres segundos y luego ejecuta el `callback`. Ideal para crear animaciones y tareas programadas.

### 2.5 Callback Hell: El Desafío de los Callbacks Anidados

Sin embargo, con una programación excesiva de callbacks anidados, puedes entrar en lo que se conoce como "callback hell". Escribir y mantener código así puede ser una pesadilla:

<p align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--c0aEZX7m--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/b8euo2n7twvgh3dbuatd.jpeg" alt="Descripción de la imagen" width="300" />
</p>

```typescript
function nivelUno(callbackUno: () => void): void {
  console.log("Nivel 1");
  setTimeout(() => {
    callbackUno();
  }, 1000);
}

function nivelDos(callbackDos: () => void): void {
  console.log("Nivel 2");
  setTimeout(() => {
    callbackDos();
  }, 1000);
}

function nivelTres(callbackTres: () => void): void {
  console.log("Nivel 3");
  setTimeout(() => {
    callbackTres();
  }, 1000);
}

function nivelCuatro(): void {
  console.log("Nivel 4");
}

// Uso de las funciones de devolución de llamada anidadas
nivelUno(() => {
  nivelDos(() => {
    nivelTres(() => {
      nivelCuatro();
    });
  });
});
```

Si bien es cierto que actualmente los programadores no solemos aplicar este tipo de gestión funcional, lo que está claro es que este código puede volverse difícil de mantener. ¿La solución? Promesas.

## 3. Las Promesas

Las Promesas son un patrón de programación que simplifica la lógica de manejo de tareas asincrónicas en JavaScript. Proporcionan una forma más estructurada y legible para trabajar con operaciones que pueden demorar, como solicitudes de red o lectura/escritura de archivos.

<p align="center">
  <img src="https://lenguajejs.com/javascript/asincronia/promesas/promises.png" alt="Promesas" width="400" />
</p>

### 3.1 Creación de una Promesa

Para crear una Promesa, utiliza el constructor `Promise`. En TypeScript, `Promise<T>` indica el tipo de valor con el que se resolverá (`T`); el rechazo siempre es `any` o `unknown` según la configuración. Una Promesa tiene dos estados: pendiente **_(pending)_** o resuelta **_(fulfilled)_**. También tiene el estado **_(Reject)_** que es cuando no se puede llevar a cabo una promesa y es por tanto rechazada.

Así los tres estados detalladamente serían:

- **pending:** este estado pendiente se da cuando no hemos obtenido respuesta a la solicitud hecha por la promesa.
- **fulfilled:** una promesa pasa del estado pending al fulfilled mediante el comando resolve. Este estado se da cuando hemos obtenido una respuesta satisfactoria a la solicitud.
- **rejected:** este estado se da, a través del comando reject, cuando obtenemos una respuesta negativa a la solicitud que ha hecho la promesa.

Recuerdo que `No obtener una respuesta` significaría estar en estado _pending_.

Aquí expongo un ejemplo básico de promesa usando `Promise` obviamente para su construcción:

```typescript
const miPromesa: Promise<string> = new Promise<string>((resolve, reject) => {
  // Simula una operación asincrónica
  setTimeout(() => {
    const exito = true; // Cambia a false para simular un rechazo
    if (exito) {
      resolve("La Promesa se ha cumplido.");
    } else {
      reject("La Promesa ha sido rechazada.");
    }
  }, 2000);
});
```

> [!NOTE]
> `new Promise<string>((resolve, reject) => ...)` declara que la promesa se resolverá con un `string`. Entonces en `then` el `resultado` ya es `string` (no necesitas averiguarlo). El `reject` puede llevar cualquier cosa (suele ser un `Error`).

Por convenio se utilizan como parámetros los nombres `resolve` y `reject`. Conviene seguir usando dichos nombres a pesar de que podemos colocar lo que deseemos.

### 3.2 Resolución y Rechazo de Promesas

<p align="center">
  <img src="https://keepcoding.io/wp-content/uploads/2022/10/Captura-de-Pantalla-2022-10-26-a-las-5.12.48-p.m..png" alt="Promesas" width="300" />
</p>

Como hemos visto, en JavaScript, las Promesas son un objeto que representa el resultado eventual (éxito o fracaso) de una operación asíncrona. Las Promesas tienen varios métodos para manejar el flujo de ejecución y los resultados. Entre ellos, los más comunes son `then`, `catch` y `finally`. Aquí está una explicación de cada uno:

#### 1. Método `then`:

El método `then` se utiliza para manejar el resultado exitoso de una Promesa. Toma una función de devolución de llamada como argumento que se ejecutará cuando la Promesa se resuelva correctamente. La función de devolución de llamada recibe el valor resultante de la Promesa (tipado como `T`).

```typescript
const miPromesa: Promise<string> = new Promise<string>((resolve) => {
  // Operación asíncrona exitosa
  resolve("¡Éxito!");
});

miPromesa.then((resultado: string) => {
  console.log("Resultado:", resultado); // Imprimirá '¡Éxito!'
});
```

#### 2. Método `catch`:

El método `catch` se utiliza para manejar el rechazo de una Promesa. Toma una función de devolución de llamada como argumento que se ejecutará cuando la Promesa se rechace (cuando ocurra un error). La función de devolución de llamada recibe el motivo del rechazo.

```typescript
const miPromesa: Promise<string> = new Promise<string>((_, reject) => {
  // Operación asíncrona que falla
  reject("¡Error!");
});

miPromesa.catch((error) => {
  console.error("Error:", error); // Imprimirá '¡Error!'
});
```

#### 3. Método `finally`:

El método `finally` se utiliza para agregar lógica que se ejecutará sin importar si la Promesa se resuelve o se rechaza. Es útil para realizar tareas que deben ocurrir sin importar el resultado de la Promesa, como limpiar recursos o ejecutar código de finalización.

```typescript
const miPromesa: Promise<string> = new Promise<string>((resolve) => {
  // Operación asíncrona que podría resolver o rechazar
  resolve("¡Éxito!");
});

miPromesa
  .then((resultado: string) => {
    console.log("Resultado:", resultado);
  })
  .catch((error) => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Fin de la operación, independientemente del resultado.");
  });
```

> [!NOTE]
> `.finally` mantiene el tipo: después de `miPromesa.finally(() => {...})` sigues teniendo una `Promise<string>`. Es una *macro* que no cambia el valor, solo ejecuta lógica final.

En este ejemplo, el bloque `finally` se ejecutará siempre, independientemente de si la Promesa se resuelve o se rechaza.

Estos métodos permiten estructurar y manejar de manera más efectiva el flujo de ejecución y los errores al trabajar con Promesas en JavaScript.

### 3.3 Encadenamiento de Promesas

Un beneficio clave de las Promesas es que puedes encadenar múltiples operaciones asincrónicas en secuencia. Esto mejora la legibilidad del código:

```typescript
realizarTarea1()
  .then((resultado1: string) => realizarTarea2(resultado1))
  .then((resultado2: number) => realizarTarea3(resultado2))
  .then((resultado3: boolean) => {
    console.log("Todas las tareas han sido completadas.");
  })
  .catch((error) => {
    console.error("Algo salió mal:", error);
  });
```

> [!TIP]
> En cada `then`, el parámetro recibe el tipo de la promesa anterior. El encadenamiento es "escalable" en tipos: si `realizarTarea2` devuelve `Promise<number>`, el `resultado2` es `number` — TS lo comprueba en cada eslabón.

### 3.4 Manejo de Errores con Promesas

El manejo de errores es esencial. Como ya he comentado podemos utilizar `catch` al final de una cadena de Promesas para capturar errores en cualquier parte de la secuencia:

```typescript
realizarTarea1()
  .then((resultado1: string) => realizarTarea2(resultado1))
  .then((resultado2: number) => realizarTarea3(resultado2))
  .catch((error) => {
    console.error("Algo salió mal:", error);
  });
```

### 3.5 Promesas en Paralelo

A menudo, necesitas realizar múltiples operaciones asincrónicas en paralelo y esperar a que todas se completen. Utiliza `Promise.all` para lograrlo:

```typescript
const promesa1: Promise<string> = hacerAlgoAsincrono1();
const promesa2: Promise<number> = hacerAlgoAsincrono2();
const promesa3: Promise<boolean> = hacerAlgoAsincrono3();

Promise.all([promesa1, promesa2, promesa3])
  .then((resultados: [string, number, boolean]) => {
    console.log("Todas las tareas han sido completadas:", resultados);
  })
  .catch((error) => {
    console.error("Algo salió mal:", error);
  });
```

> [!NOTE]
> `Promise.all([p1, p2, p3])` tipa el resultado como una **tupla** con los tipos en orden (`[string, number, boolean]`). Es decir: el `resultados[0]` es `string`, el `[1]` es `number`, etc. Mucho más seguro que un `any[]`.

### 3.6 Combinadores modernos de Promesas (ES2020+)

**`Promise.allSettled()` (ES2020):** espera a que TODAS las promesas terminen (éxito o fracaso). Nunca falla — siempre devuelve el resultado de cada una:

```typescript
const resultados: Array<
  { status: "fulfilled"; value: unknown } | { status: "rejected"; reason: unknown }
> = await Promise.allSettled([
  fetch("/api/usuarios").then((r) => r.json()),
  fetch("/api/productos").then((r) => r.json()),
  Promise.reject("Error simulado"),
]);

// [{ status: "fulfilled", value: [...] }, { status: "fulfilled", value: [...] }, { status: "rejected", reason: "Error simulado" }]
```

> [!TIP]
> El resultado de `allSettled` es una **unión discriminada** (`status: "fulfilled" | "rejected"`). Con `if (r.status === "fulfilled")` TypeScript te deja acceder a `r.value`, y dentro del `else` a `r.reason`.

**`Promise.any()` (ES2021):** se resuelve con la primera promesa exitosa. Solo falla si TODAS son rechazadas:

```typescript
const masRapida: unknown = await Promise.any([
  fetch("https://api1.example.com").then((r) => r.json()),
  fetch("https://api2.example.com").then((r) => r.json()),
]);
// Usa la respuesta del servidor que responda primero
```

**`Promise.race()`:** se resuelve/rechaza con la primera promesa que termine (éxito o fracaso):

```typescript
const resultado: unknown = await Promise.race([
  fetch("/api/datos"),
  new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000)),
]);
// Si la API no responde en 5 segundos, lanza error de timeout
```

**`Promise.withResolvers()` (ES2024):** crea una promesa y expone sus funciones `resolve`/`reject` externamente, útil para patrones avanzados:

```typescript
const { promise, resolve, reject } = Promise.withResolvers<string>();

// Puedes pasar resolve/reject a otro código sin anidar todo dentro del constructor
setTimeout(() => resolve("Listo"), 1000);
const resultado = await promise; // "Listo" al cabo de 1s
```

> [!NOTE]
> `Promise.withResolvers<string>()` devuelve `{ promise: Promise<string>; resolve: (v: string) => void; reject: (r: unknown) => void }`: la funcionalidad ES2024 ya está en el `lib` de TS.

### 3.7 El Event Loop: microtareas vs macrotareas

Entender el orden de ejecución es clave para depurar asincronía:

```typescript
console.log("1. Síncrono");

setTimeout(() => console.log("2. Macrotarea (setTimeout)"), 0);

Promise.resolve().then(() => console.log("3. Microtarea (Promise.then)"));

console.log("4. Síncrono");

// Orden real: 1, 4, 3, 2
// Las microtareas (Promise.then/catch/finally) se ejecutan ANTES que las macrotareas (setTimeout, setInterval, I/O)
```

> **Regla:** código síncrono → microtareas (Promises, queueMicrotask) → macrotareas (setTimeout, eventos, fetch callback).

## 4. Async/Await: Simplificando el Uso de Promesas

`async/await` es una característica introducida en ECMAScript 2017 (también conocido como ES8) que simplifica la escritura y gestión del código asíncrono en JavaScript (y en TypeScript no cambia nada: solo añade tipos). Permite escribir código asíncrono de manera más similar a código síncrono, haciendo que sea más legible y fácil de entender.

```typescript
async function realizarTareas(): Promise<void> {
  try {
    const resultado1: string = await realizarTarea1();
    const resultado2: number = await realizarTarea2(resultado1);
    const resultado3: boolean = await realizarTarea3(resultado2);
    console.log("Todas las tareas han sido completadas.");
  } catch (error) {
    console.error("Algo salió mal:", error);
  }
}

realizarTareas();
```

> [!IMPORTANT]
> Una función `async` devuelve SIEMPRE una `Promise`. Anota el tipo de retorno con `Promise<X>` (o `Promise<void>` si no devuelve nada). Con `await`, el valor "desempaquetado" ya tiene el tipo interno de la promesa.

`await` pausa la ejecución hasta que la Promesa se resuelva o se rechace.

### Otros Ejemplos:

#### 1. Uso Básico:

```typescript
// Función asíncrona con async
async function obtenerDatos(): Promise<void> {
  // Operación asíncrona, por ejemplo, una Promesa
  const resultado: string = await new Promise<string>((resolve) => {
    setTimeout(() => resolve("Datos obtenidos"), 1000);
  });

  console.log(resultado);
}

// Llamada a la función asíncrona
obtenerDatos();
```

En este ejemplo, `await` se utiliza dentro de una función asíncrona para esperar que la Promesa se resuelva antes de continuar con la ejecución del código. Esto hace que el código sea más legible y se asemeje a la ejecución síncrona.

#### 2. Manejo de Errores con Try/Catch:

```typescript
async function obtenerDatos(): Promise<void> {
  try {
    const resultado: string = await new Promise<string>((resolve, reject) => {
      // Simular un error
      setTimeout(() => reject("Error al obtener datos"), 1000);
    });

    console.log(resultado);
  } catch (error) {
    console.error("Error:", error);
  }
}

obtenerDatos();
```

`try/catch` se utiliza para manejar errores de manera más eficiente en código asíncrono.

#### 3. Múltiples Operaciones Asíncronas:

```typescript
async function operacionCompleja(): Promise<void> {
  try {
    const resultado1: string = await obtenerDatos1();
    console.log(resultado1);

    const resultado2: string = await obtenerDatos2();
    console.log(resultado2);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function obtenerDatos1(): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve("Datos de la operación 1"), 1000);
  });
}

async function obtenerDatos2(): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve("Datos de la operación 2"), 1000);
  });
}

operacionCompleja();
```

En este ejemplo, se muestran dos funciones asíncronas (`obtenerDatos1` y `obtenerDatos2`) que se pueden llamar de manera secuencial dentro de una función principal (`operacionCompleja`) utilizando `await`.

#### 4. Uso de Async/Await con Fetch:

```typescript
interface DatosPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function obtenerDatosDesdeAPI(): Promise<void> {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
    );
    if (!response.ok) {
      throw new Error("No se pudo obtener los datos");
    }

    const datos = (await response.json()) as DatosPost;
    console.log("Datos desde la API:", datos.title);
  } catch (error) {
    console.error("Error:", error);
  }
}

obtenerDatosDesdeAPI();
```

> [!IMPORTANT]
> `response.json()` devuelve `Promise<any>` (en TS moderno `unknown` según `lib`) porque la respuesta JSON puede ser cualquier cosa. Definimos una `interface DatosPost` y validamos/casteamos el resultado, como vimos en el capítulo de `JSON.parse`. **No confies el tipo sin validar.**

En este ejemplo, `fetch` se utiliza junto con `await` para realizar una solicitud HTTP y manejar los datos resultantes de manera asincrónica.

## 5. El tipado de `Promise<T>`: la clave de TypeScript

La diferencia práctica entre JS y TS en asincronía es el **flujo de tipos**. Recuerda estas reglas:

| Código | Tipo para TS |
|--------|--------------|
| `new Promise<T>(executor)` | `Promise<T>` |
| `async function f(): Promise<T>` | siempre `Promise<T>` |
| `await promesa` | `T` (se desempaqueta) |
| `.then((value) => ...)` | `value` es `T` |
| `.catch((error) => ...)` | `error` es `any`/`unknown` |
| `Promise.all([p1: Promise<A>, p2: Promise<B>])` | `Promise<[A, B]>` |
| `Promise.allSettled(...)` | unión discriminada `{status:"fulfilled"|"rejected", ...}` |

```typescript
async function ejemploTipado(): Promise<string> {
  const valor = await Promise.resolve(42); // number
  const texto = valor.toString(); // string
  return texto;
}
```

> [!TIP]
> **Regla práctica:** si una función hace `await`, debe ser `async` y devolver `Promise<...>`. Nunca pongas `await` a un tipo; `await` siempre actúa sobre una promesa (si `await` un no-promesa, TS lo "envuelve" como `Promise.resolve(valor)`).

## 6. Bibliografía:

1. Flanagan, D. (2011). JavaScript: The Definitive Guide. O'Reilly Media.
2. Resig, J., Bibeault, B., & Maras, J. (2013). Secrets of the JavaScript Ninja. Manning Publications.

3. Mozilla Developer Network (MDN) Web Docs. [JavaScript Asynchronous Programming and Callbacks](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous).

4. Mozilla Developer Network (MDN) Web Docs. [JavaScript Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

5. Mozilla Developer Network (MDN) Web Docs. [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

6. Axios GitHub Repository. [Axios - Promise based HTTP client for the browser and node.js](https://github.com/axios/axios).

7. JavaScript.info. [Fetch](https://javascript.info/fetch).

---

### 📦 En el repositorio (`repos/01-typescript-fundamentos/src/REPO-13-async-await.ts`)

```typescript
export {};

/**
 * Fichero 13: Programacion Asincrona
 * -------------------------------------------
 * Ejemplos extraidos de Sesion 3 (concepto 15):
 * - Callbacks tipados
 * - Promesas (Promise)
 * - Combinadores: Promise.all, allSettled, race, any
 * - Event Loop: microtareas vs macrotareas
 * - Fetch API con tipos
 * - AbortController para cancelar peticiones
 */

// ============================================================================
// CALLBACKS
// ============================================================================

type Callback = (error: Error | null, resultado?: string) => void;

function operacionAsincrona(exito: boolean, cb: Callback): void {
    setTimeout(() => {
        if (exito) {
            cb(null, "Operacion completada");
        } else {
            cb(new Error("Fallo la operacion"));
        }
    }, 1000);
}

operacionAsincrona(true, (error, resultado) => {
    if (error) {
        console.error(error.message);
    } else {
        console.log(resultado);
    }
});

// ============================================================================
// PROMESAS
// ============================================================================

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ejemplo(): Promise<string> {
    await delay(1000);
    return "Hecho tras 1s";
}

// Combinadores de promesas
const promesas: Promise<number>[] = [Promise.resolve(1), Promise.resolve(2)];

Promise.all(promesas).then((resultados) => console.log(resultados));

Promise.allSettled(promesas).then((resultados) => {
    resultados.forEach((r) => {
        if (r.status === "fulfilled") console.log(r.value);
    });
});

Promise.race(promesas).then((primero) => console.log(primero));

Promise.any(promesas).then((primeroExitoso) => console.log(primeroExitoso));

// ============================================================================
// EVENT LOOP: microtareas vs. macrotareas
// ============================================================================

console.log("1: sincrono");

setTimeout(() => console.log("2: macrotarea (setTimeout)"), 0);

Promise.resolve().then(() => console.log("3: microtarea (Promise)"));

queueMicrotask(() => console.log("4: microtarea (queueMicrotask)"));

console.log("5: sincrono");

// Orden: 1, 5, 3, 4, 2

// ============================================================================
// FETCH API CON TIPOS
// ============================================================================

interface UsuarioAPI {
    id: number;
    name: string;
    email: string;
}

async function obtenerUsuario(id: number): Promise<UsuarioAPI> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    return (await response.json()) as UsuarioAPI;
}

// POST
async function crearUsuario(datos: Omit<UsuarioAPI, "id">): Promise<UsuarioAPI> {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });
    return (await response.json()) as UsuarioAPI;
}

// AbortController para cancelar peticiones
function fetchConTimeout(url: string, ms: number = 5000): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ms);

    return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timeout));
}

// Ejemplo de uso
ejemplo().then((msg) => console.log(msg));
```

---

[Volver al índice general](../../index.md)