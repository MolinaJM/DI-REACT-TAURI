# **Capítulo 00. TypeScript  sobre ES6+/ES2026 📝**💻

- [**Capítulo 00. TypeScript  sobre ES6+/ES2026 📝**💻](#capítulo-00-typescript-sobre-es6es2026)
- [0. Introducción a JavaScript y TypeScript 📖](#0-introducción-a-javascript-y-typescript)
  - [0.1 Historia y contexto](#01-historia-y-contexto)
    - [Los Primeros Días](#los-primeros-días)
    - [La Guerra de Navegadores](#la-guerra-de-navegadores)
    - [Estándares y Evolución](#estándares-y-evolución)
    - [JavaScript en la Actualidad](#javascript-en-la-actualidad)
    - [La Revolución ES6+ y el ciclo anual](#la-revolución-es6-y-el-ciclo-anual)
  - [0.2 Características Modernas](#02-características-modernas)
    - [1. **Lenguaje Multi-paradigma Moderno**](#1-lenguaje-multi-paradigma-moderno)
    - [2. **Compilado e Interpretado (JIT)**](#2-compilado-e-interpretado-jit)
    - [3. **Programación Funcional Avanzada**](#3-programación-funcional-avanzada)
    - [4. **Tipado Estático con TypeScript**](#4-tipado-estático-con-typescript)
    - [5. **Orientado a Objetos Moderno**](#5-orientado-a-objetos-moderno)
    - [6. **Asincronía Nativa y Moderna**](#6-asincronía-nativa-y-moderna)
    - [7. **Multiplataforma y Universal**](#7-multiplataforma-y-universal)
  - [0.3 Palabras Reservadas](#03-palabras-reservadas)
  - [0.4 Primeros Pasos con TypeScript ](#04-primeros-pasos-con-typescript)
    - [Hola Mundo Moderno](#hola-mundo-moderno)
    - [Variables y Constantes](#variables-y-constantes-let-y-const)
    - [Arrow Functions](#arrow-functions)
    - [Template Literals](#template-literals)
    - [Destructuring](#destructuring)
  - [0.5 Introducción a TypeScript](#05-introducción-a-typescript)
    - [¿Qué es TypeScript?](#qué-es-typescript)
    - [Ventajas de TypeScript](#ventajas-de-typescript)
    - [Instalación y Configuración](#instalación-y-configuración)
    - [Primer Código con TypeScript](#primer-código-más-complejo-con-typescript)

---

# 0. Introducción a JavaScript y TypeScript 📖

> Este capítulo cuenta la historia y las capacidades modernas de **JavaScript**, y a partir de la sección 0.5 entra de lleno en **TypeScript**. Recuerda: TypeScript **es** JavaScript con tipos. Todo lo que aprendes de JS se mantiene; los tipos se añaden encima.

## 0.1 Historia y contexto

JavaScript es uno de los lenguajes de programación más populares y ampliamente utilizados en la web. Su historia se remonta a la década de 1990:

### Los Primeros Días

- A principios de la década de 1990, Marc Andreessen y su equipo en Netscape Communications desarrollaron el navegador web Netscape Navigator.
- En 1995, Brendan Eich fue contratado por Netscape para crear un lenguaje de programación que pudiera ejecutarse en el navegador.
- Eich creó JavaScript en tan solo 10 días. Fue lanzado con Netscape Navigator 2.0 en diciembre de 1995.

### La Guerra de Navegadores

- JavaScript rápidamente ganó popularidad como el lenguaje de programación para el lado del cliente en la web.
- Microsoft respondió con JScript, su propia versión de JavaScript, lo que llevó a una "guerra de navegadores" entre Netscape y Microsoft.

### Estándares y Evolución

- Para evitar la fragmentación, Netscape entregó JavaScript a la ECMA International (European Computer Manufacturers Association), una organización de estándares, en 1996.
- El estándar ECMAScript se creó basado en JavaScript, y la primera edición se publicó en 1997.
- A lo largo de los años, ECMAScript ha evolucionado con nuevas versiones y características, como ES6 (ECMAScript 2015) que introdujo mejoras significativas.

### JavaScript en la Actualidad

- Hoy en día, JavaScript se encuentra en todas partes, no solo en navegadores web, sino también en servidores (Node.js), aplicaciones móviles (React Native), y más.
- Es uno de los lenguajes más utilizados para el desarrollo web, permitiendo la creación de sitios web interactivos y dinámicos.
- **TypeScript** (creado por Microsoft y publicado en 2012) se ha convertido en el estándar para proyectos grandes: React lo usa como recomendado, y Vite tiene plantillas oficiales TS.

### La Revolución ES6+ y el ciclo anual

En 2015, JavaScript experimentó una transformación radical con la especificación **ES6 (ECMAScript 2015)**. Desde ECMAScript 2016, el lenguaje sigue un ciclo de publicación anual coordinado por **TC39**, el comité técnico que mantiene la especificación ECMAScript.

- **ES2015 (ES6)**: `class`, `let`, `const`, arrow functions, template literals, destructuring, módulos y promesas.
- **ES2016**: `Array.prototype.includes()` y operador de exponenciación `**`.
- **ES2017**: `async/await`, `Object.values()`, `Object.entries()` y string padding.
- **ES2018**: iteración asíncrona, rest/spread en objetos y `Promise.prototype.finally()`.
- **ES2019**: `Array.prototype.flat()`, `Array.prototype.flatMap()` y `Object.fromEntries()`.
- **ES2020**: `BigInt`, optional chaining `?.` y nullish coalescing `??`.
- **ES2021**: asignación lógica, separadores numéricos y `String.prototype.replaceAll()`.
- **ES2022**: campos privados de clase, `Object.hasOwn()`, `Array.prototype.at()` y `Error.cause`.
- **ES2023**: métodos de array por copia como `toSorted()`, `toReversed()`, `toSpliced()` y `findLast()`.
- **ES2024 / ES2025**: mejoras incrementales del lenguaje y de APIs estándar, con especial atención a promesas, colecciones, expresiones regulares e iteradores.
- **ES2026**: versión en proceso de ratificación durante 2026; la referencia más fiable es el borrador vivo de TC39 (`tc39.es/ecma262`) y la lista oficial de propuestas finalizadas.

> **Idea importante para clase:** no se estudia JavaScript como una lista de versiones. Se estudian las capacidades modernas que ya están disponibles en navegadores actuales y en Node LTS, y cómo TypeScript las tipa.

## 0.2 Características Modernas

JavaScript en 2026 es un lenguaje moderno, potente y versátil. Así es JavaScript hoy en día:

#### 1. **Lenguaje Multi-paradigma Moderno**

JavaScript ha evolucionado para soportar múltiples paradigmas de programación:

- **Programación Funcional**: Con arrow functions, inmutabilidad, funciones puras y composición
- **Programación Orientada a Objetos**: Con clases ES6 (y clases tipadas en TS), herencia y encapsulación
- **Programación Asíncrona**: Con async/await, promises y streams
- **Programación Reactiva**: Con observables y patrones modernos

```typescript
// Ejemplo de programación funcional moderna y tipada
interface Item {
  activo: boolean;
  procesado?: boolean;
}

const procesarDatos = (datos: Item[]): Item[] =>
  datos
    .filter((item) => item.activo)
    .map((item) => ({ ...item, procesado: true }))
    .reduce((acc: Item[], item: Item) => [...acc, item], []);

// Ejemplo de programación asíncrona moderna y tipada
interface User {
  id: number;
  nombre: string;
}

async function fetchUserData(userId: number): Promise<User> {
  try {
    const response: Response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const userData = (await response.json()) as User;
    return userData;
  } catch (error: unknown) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
```

#### 2. **Compilado e Interpretado (JIT)**

JavaScript moderno utiliza compilación **Just-In-Time (JIT)** en los navegadores modernos:

- **V8 (Chrome/Node.js)**: Compila JavaScript a código máquina nativo
- **SpiderMonkey (Firefox)**: Motor optimizado para rendimiento
- **JavaScriptCore (Safari)**: Compilación por niveles
- **V8 (Edge actual)**: Microsoft Edge moderno usa Chromium y, por tanto, V8.

```typescript
// Código que se optimiza automáticamente por el JIT
function sumarNumeros(arr: number[]): number {
  return arr.reduce((sum, num) => sum + num, 0);
}

// Los motores JIT optimizan este código basado en el uso
```

> [!NOTE]
> TypeScript, sin embargo, **no** es "compilado" como Java o C#: `tsc` lo que hace es *type-checking* y (opcionalmente) transpilar a JavaScript. El código que llega al navegador siempre es JavaScript.

#### 3. **Programación Funcional Avanzada**

JavaScript ES6+ ofrece características poderosas para programación funcional:

```typescript
// Array methods funcionales con tipos
const numeros: number[] = [1, 2, 3, 4, 5];
const resultado: number = numeros
  .filter((n) => n % 2 === 0)
  .map((n) => n * 2)
  .reduce((acc, n) => acc + n, 0);

// Funciones como ciudadanos de primera clase
type Operador = "+" | "-" | "*";

const crearOperacion =
  (operador: Operador) =>
  (a: number, b: number): number => {
    switch (operador) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      default:
        return 0;
    }
  };

const sumar = crearOperacion("+");
const multiplicar = crearOperacion("*");
```

#### 4. **Tipado Estático con TypeScript**

JavaScript mantiene su tipado dinámico, pero este curso, y la mayoría de la industria moderna, apuesta por **TypeScript** para el tipado estático:

```typescript
// JavaScript: tipado dinámico (permitido, pero no recomendado en este curso)
let variable: unknown = 42;        // se puede cambiar el tipo en runtime
variable = "Hola";
variable = [1, 2, 3];
variable = { nombre: "Profe" };

// TypeScript: tipado estático seguro
let numero: number = 42;
let texto: string = "Profe";
interface Usuario {
  nombre: string;
  edad: number;
}
let usuario: Usuario = {
  nombre: "Profe",
  edad: 35,
};
```

> [!IMPORTANT]
> En este curso **prohibimos `any`** en los ejemplos. Cuando un valor llega del exterior y no conocemos su tipo (p. ej. `JSON.parse`), lo tratamos como `unknown` y lo validamos. Veremos el patrón en los capítulos de localStorage y Fetch API.

#### 5. **Orientado a Objetos Moderno**

JavaScript es un lenguaje **orientado a objetos**, pero en lugar de basarse en clases tradicionales (como C++ o Java), usa un sistema de **prototipos**. Los objetos en JavaScript pueden heredar propiedades y métodos de otros objetos a través de la herencia basada en prototipos.

Sin embargo, desde **ES6** (ECMAScript 2015), se introdujeron las **clases**, que proporcionan una sintaxis más familiar para la orientación a objetos, aunque internamente JavaScript sigue utilizando prototipos. Esta sintaxis de clases es un "azúcar sintáctico" sobre el modelo basado en prototipos, pero hace el código más legible y fácil de entender para desarrolladores que vienen de otros lenguajes.

**Conceptos clave de POO en JavaScript/TypeScript :**

- **Encapsulación**: Agrupar datos y métodos que operan sobre esos datos (`private`, `#campo`)
- **Herencia**: Crear nuevas clases basadas en clases existentes (`extends`)
- **Polimorfismo**: Usar una interfaz común para diferentes tipos de objetos
- **Abstracción**: Ocultar detalles complejos y mostrar solo lo necesario

**Ejemplo de clases modernas, ahora tipadas en TypeScript:**

```typescript
// Clases modernas con encapsulación y herencia en TypeScript
class Estudiante {
  static universidad: string = "UDC"; // Propiedad estática (compartida)
  private nombre: string; // Propiedad privada a nivel de tipos
  private edad: number;

  constructor(nombre: string, edad: number) {
    this.nombre = nombre;
    this.edad = edad;
    console.log(
      `Nuevo estudiante ${this.nombre} inscrito en ${Estudiante.universidad}`,
    );
  }

  // Getter público para acceder a la propiedad privada
  get nombre(): string {
    return this.nombre;
  }

  // Setter público para modificar la propiedad privada con validación
  set edad(nuevaEdad: number) {
    if (nuevaEdad > 0 && nuevaEdad < 100) {
      this.edad = nuevaEdad;
    } else {
      console.error("Edad no válida");
    }
  }

  // Método público (se tipa el parámetro y el retorno)
  estudiar(asignatura: string): void {
    console.log(`${this.nombre} está estudiando ${asignatura}`);
  }

  // Método estático (se llama sobre la clase, no sobre la instancia)
  static crearEstudianteProfesor(nombre: string): Estudiante {
    return new Estudiante(nombre, 35);
  }
}

// Herencia moderna - extends
class EstudianteDI extends Estudiante {
  private proyecto: string;

  constructor(nombre: string, edad: number, proyecto: string) {
    super(nombre, edad); // Llama al constructor de la clase padre
    this.proyecto = proyecto;
    console.log(`Estudiante de DI con proyecto: ${this.proyecto}`);
  }

  // Sobrescritura de método (TS comprueba compatibilidad de firma)
  override estudiar(asignatura: string): void {
    console.log(
      `${this.nombre} está programando ${asignatura} para su proyecto ${this.proyecto}`,
    );
  }

  // Método específico de esta clase
  programar(): void {
    console.log(`${this.nombre} está desarrollando en ${this.proyecto}`);
  }
}

// Uso práctico de las clases
const profe = new EstudianteDI("Profe", 35, "React");
profe.estudiar("TypeScript");
profe.programar();

// Uso de método estático
const profesor = Estudiante.crearEstudianteProfesor("Profesor Invitado");
console.log(`Profesor creado: ${profesor.nombre}`);
```

> [!NOTE]
> Fíjate en el constructor: las propiedades se **declaran e inicializan explícitamente** (`private nombre: string;` y `this.nombre = nombre;`). No usamos *parameter properties* (`constructor(private nombre: string)`), porque este curso mantiene compatibilidad con Node 24 (type stripping), que solo admite *erasable syntax*.

#### 6. **Asincronía Nativa y Moderna**

JavaScript es conocido por su enfoque **asíncrono** y su capacidad para manejar operaciones basadas en eventos, como las interacciones del usuario o las solicitudes HTTP. Este enfoque es especialmente importante en entornos como los **navegadores** y **Node.js**, donde ciertas operaciones, como la carga de datos desde un servidor, pueden tardar un tiempo en completarse.

**El modelo de eventos** permite a JavaScript responder a acciones como clics de usuario, movimientos del ratón o el envío de formularios. Este comportamiento basado en eventos garantiza que JavaScript no detenga el flujo de ejecución mientras espera que ciertas operaciones finalicen, lo que resulta en una mejor **experiencia de usuario** y una mayor **eficiencia**.

**Conceptos fundamentales de la asincronía en JavaScript:**

- **Single Thread**: JavaScript ejecuta código en un solo hilo principal
- **Event Loop**: Mecanismo que gestiona la ejecución de tareas asíncronas
- **Non-blocking**: Las operaciones asíncronas no bloquean el hilo principal
- **Callback Queue**: Cola donde se almacenan las funciones callback pendientes

**Evolución de la asincronía en JavaScript:**

1. **Callbacks (1995)**: El método original para manejar asincronía
2. **Promises (2015)**: ES6 introdujo las promesas para mejorar la gestión asíncrona
3. **Async/Await (2017)**: ES8 proporcionó una sintaxis más clara para trabajar con promesas
4. **Top-level await (2022)**: Permitido usar `await` fuera de funciones async

**Ejemplos prácticos de asincronía moderna (y tipada):**

```typescript
interface Alumno {
  id: number;
  nombre: string;
  activo: boolean;
}

// 1. Promesas encadenadas (ES6) - los .then ya tienen tipos
async function cargarAlumnos(): Promise<Alumno[]> {
  console.log("Iniciando carga de alumnos...");
  const response = await fetch("/api/alumnos");
  const alumnos = (await response.json()) as Alumno[];
  const alumnosActivos = alumnos.filter((a) => a.activo);
  console.log("Alumnos activos:", alumnosActivos);
  return alumnosActivos;
}

// 2. Async/Await (ES8) - más legible y fácil de depurar
async function obtenerAlumnosActivos(): Promise<Alumno[]> {
  try {
    console.log("Buscando alumnos activos...");
    const response: Response = await fetch("/api/alumnos");
    const alumnos: Alumno[] = (await response.json()) as Alumno[];
    const alumnosActivos = alumnos.filter((alumno) => alumno.activo);

    console.log(`Se encontraron ${alumnosActivos.length} alumnos activos`);
    return alumnosActivos;
  } catch (error: unknown) {
    console.error("Error al obtener alumnos:", error);
    throw error;
  }
}

// 3. Promise.all para operaciones paralelas (optimización)
async function cargarDatosParalelos(): Promise<void> {
  console.log("Cargando datos en paralelo...");
  try {
    const [alumnos, profesores, asignaturas] = await Promise.all([
      fetch("/api/alumnos").then((r) => r.json()),
      fetch("/api/profesores").then((r) => r.json()),
      fetch("/api/asignaturas").then((r) => r.json()),
    ]);

    console.log("Alumnos:", alumnos);
    console.log("Profesores:", profesores);
    console.log("Asignaturas:", asignaturas);
  } catch (error: unknown) {
    console.error("Error en carga paralela:", error);
  }
}

// 4. Eventos del DOM (manejo de interacciones del usuario)
document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("cargarDatos") as HTMLButtonElement | null;
  if (!boton) return;

  boton.addEventListener("click", async () => {
    boton.disabled = true;
    boton.textContent = "Cargando...";

    try {
      const alumnos = await obtenerAlumnosActivos();
      console.table(alumnos);
    } catch (error: unknown) {
      console.error("No se pudieron cargar los alumnos", error);
    } finally {
      boton.disabled = false;
      boton.textContent = "Cargar Alumnos";
    }
  });
});
```

**Ventajas de la asincronía moderna:**

- **Mejor rendimiento**: No bloquea la interfaz de usuario
- **Código más legible**: Async/await se lee como código síncrono
- **Mejor manejo de errores**: Try/catch funciona con código asíncrono y `error` es `unknown` (se estrecha)
- **Composición**: Las promesas se pueden combinar y encadenar fácilmente

El enfoque asíncrono de JavaScript permite que el programa continúe ejecutándose mientras espera por operaciones más lentas, como una solicitud de red o la lectura de archivos. Esto mejora significativamente el rendimiento en aplicaciones interactivas, evitando que la interfaz de usuario se "congele" mientras espera respuestas del servidor.

> [!NOTE]
> En TypeScript, una función `async` siempre devuelve `Promise<T>`. El tipo `T` se infiere del `return`. Además, en lugar de `any` para los datos de la API, usaremos *type guards* y validación (capítulo 19).

#### 7. **Multiplataforma y Universal**

JavaScript es **multiplataforma**. Se ejecuta no solo en navegadores y servidores (con Node.js), sino también en entornos como aplicaciones móviles (con frameworks como **React Native**), aplicaciones de escritorio (con **Electron**), y dispositivos IoT. Esto lo convierte en uno de los lenguajes más versátiles disponibles.

**Ecosistema JavaScript/TypeScript :**

- **Frontend**: React (TS), Vue, Svelte
- **Backend**: Node.js, Express, NestJS (TS), Fastify
- **Móvil**: React Native, Ionic, Capacitor
- **Desktop**: Electron, Tauri, NW.js
- **IoT**: Johnny-Five, Espruino, JerryScript

**Ejemplo de código multiplataforma (tipado):**

```typescript
// 1. Navegador Web (frontend) con DOM tipado
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  if (app) {
    app.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="color: #2c3e50;">¡Hola desde el navegador!</h1>
        <p style="background: #ecf0f1; padding: 10px; border-radius: 5px;">
          TypeScript con DOM tipado.
        </p>
      </div>
    `;
  }
});

// 2. Node.js (backend - servidor) con CommonJS (en .ts puedes usar ESM: import)
import { createServer } from "node:http";

const server = createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head><title>Servidor Node.js</title></head>
        <body>
          <h1>¡Hola desde el servidor Node.js!</h1>
          <p>Servidor creado por Profe</p>
        </body>
      </html>
    `);
  }
});

server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
```

**Ventajas de la multiplataforma con JavaScript/TypeScript:**

- **Mismo lenguaje**: Aprender un lenguaje para todo el stack
- **Reutilización de código**: Compartir lógica entre plataformas
- **Gran comunidad**: Soporte y librerías para cualquier necesidad
- **Rápido desarrollo**: Herramientas y frameworks maduros
- **Alta demanda**: Muchas oportunidades laborales

## 0.3 Palabras Reservadas

Son las palabras (en inglés) que se utilizan para construir las sentencias de JavaScript y que por tanto no pueden ser utilizadas libremente. Las palabras actualmente reservadas por JavaScript son:

```typescript
break, case, catch, continue, default, delete, do, else, finally, for, function, if, in, instanceof, new, return, switch, this, throw, try, typeof, var, void, while, with.
```

Además, en versiones modernas se han añadido palabras reservadas para ES6+:

```typescript
await, class, const, enum, export, extends, implements, import, interface, let, package, private, protected, public, static, super, yield.
```

> [!WARNING]
> `enum` es palabra reservada de TypeScript pero **no la usaremos**: este curso usa *erasable-only* (Node 24 type stripping). Para conjuntos de constantes usamos uniones de tipos: `type Estado = "ok" | "error";`. Más adelante se verá `implements`, `interface`, `private`, `protected`, `public` como características propias de TS.

---

## 0.4 Primeros Pasos con TypeScript 

Vamos a crear nuestros primeros ejemplos utilizando TypeScript  sobre la base de JavaScript ES6+. Estos son los conceptos fundamentales que necesitarás para empezar a programar.

### Hola Mundo Moderno

El clásico "Hola Mundo" pero con características modernas:

```typescript
// Hola Mundo con template literals y tipos
const profesor: string = "Profe";
const modulo: string = "DI";
const mensaje: string = `¡Hola! Soy ${profesor} y te doy la bienvenida a ${modulo}`;

console.log(mensaje); // ¡Hola! Soy Profe y te doy la bienvenida a DI

```

### Variables y Constantes (let y const)

TypeScript es un lenguaje fuertemente tipado. En TypeScript usamos `let` y `const` en lugar de `var`, y además anotamos los tipos:

```typescript
// const - Para valores que no cambian
const NOMBRE_CURSO: string = "Desarrollo de Interfaces - 2 DAM";
const PROFESOR: string = "Profe";

// let - Para valores que sí pueden cambiar
let numeroAlumnos: number = 25;
let aulaActual: string = "Aula A13";

console.log(`Curso: ${NOMBRE_CURSO}`);
console.log(`Profesor: ${PROFESOR}`);
console.log(`Número de alumnos: ${numeroAlumnos}`);

// Podemos cambiar los valores de let
numeroAlumnos = 26;
aulaActual = "Laboratorio 2";

console.log(`Actualizado: ${numeroAlumnos} alumnos en ${aulaActual}`);

// const no se puede reasignar (daría error)
// NOMBRE_CURSO = "Otro curso"; // Error: Assignment to constant variable
```

**¿Por qué usar let y const con tipos en lugar de var?**

- **const**: Previene reasignaciones accidentales
- **let**: Tiene scope de bloque (solo existe dentro del bloque donde se define)
- **var**: Tiene scope de función y puede causar problemas de *hoisting* (se puede hacer referencia en una línea a una variable que se declara en una línea posterior sin dar excepción. Con let se evita esto.)
- **Tipos**: La anotación `: number` hace que una asignación errónea (`numeroAlumnos = "muchos"`). A pesar del fallo, las versiones recientes de Node.js incluyen soporte nativo para TypeScript mediante una técnica llamada type stripping (eliminación de tipos). El error se marca pero coge el último valor válido.

### Arrow Functions

Las funciones flecha son una forma más compacta de escribir funciones, y en TypeScript se tipan:

```typescript
// Función tradicional tipada
function saludarTradicional(nombre: string): string {
  return `Hola, ${nombre}`;
}

// Arrow function básica (usa const y se asigna a nombre de función)
const saludarFlecha = (nombre: string): string => {
  return `Hola, ${nombre}`;
};

// Arrow function más concisa (si solo tiene un parámetro, nos ahorramos las llaves)
const saludarConcisa = (nombre: string): string => `Hola, ${nombre}`;

// Arrow function sin parámetros
const saludarProfesor = (): string => "Hola, soy el Profe";

// Ejemplos de uso
console.log(saludarTradicional("María"));
console.log(saludarFlecha("Juan"));
console.log(saludarConcisa("Ana"));
console.log(saludarProfesor());

// Arrow functions con múltiples parámetros
const calcularMedia = (nota1: number, nota2: number, nota3: number): string => {
  let media: number = (nota1 + nota2 + nota3) / 3;
  return `La media de ${nota1}, ${nota2} y ${nota3} es: ${media.toFixed(2)}`;
};

console.log(calcularMedia(7.5, 8.0, 6.5));
```

### Template Literals

Los template literals permiten crear cadenas de texto con variables y expresiones:

```typescript
const profesor: string = "Profe";
const asignatura: string = "TypeScript";
const nivel: string = "Básico";

// Template literal multilínea
const descripcion: string = `
Curso: ${asignatura}
Profesor: ${profesor}
Nivel: ${nivel}
Duración: 120 horas
`;

console.log(descripcion);

// Template literals con expresiones
const precioBase: number = 100;
const descuento: number = 0.15;
const precioFinal: number = precioBase * (1 - descuento);

const mensaje: string = `
${profesor} - ${asignatura}
----------------------------------------
Precio base: €${precioBase}
Descuento: ${descuento * 100}%
Precio final: €${precioFinal.toFixed(2)}
¡Ahorras: €${(precioBase * descuento).toFixed(2)}!
`;

console.log(mensaje);

// Template literals con funciones
const formatearNombre = (nombre: string, apellidos: string): string => {
  const nombreCompleto: string = `${nombre} ${apellidos}`.toUpperCase();
  return `ALUMNO: ${nombreCompleto}`;
};

console.log(formatearNombre("juan", "pérez")); // ALUMNO: JUAN PÉREZ
```

### Destructuring

El destructuring permite extraer valores de arrays y objetos de forma concisa, y en TypeScript mantiene los tipos. Muy útil en React para los Props y Hooks.

```typescript
// Destructuring de arrays
const tecnologias: string[] = ["JavaScript", "TypeScript", "React", "Node.js", "Tauri"];
const [js, ts, react, node, tauri] = tecnologias;

console.log(`Frontend: ${js} y ${react}`);
console.log(`Backend: ${node} y ${tauri}`);
console.log(`Tipado: ${ts}`);

// Destructuring de objetos (el tipo se declara con interface)
// Un interface es propio de TS: define la estructura y el tipo de datos que debe tener un objeto. Es extremadamente útil y se usa mucho.
interface ProfesorInfo {
  nombre: string;
  apellidos: string;
  modulo: string;
  experiencia: number;
  especialidades: string[];
}

const profesorInfo: ProfesorInfo = {
  nombre: "Profe",
  apellidos: "MC",
  modulo: "DI",
  experiencia: 20,
  especialidades: ["Java", "TypeScript", "React", "Unity"],
};

// He de llamar de la misma forma a las variables que devuelve 
const { nombre, apellidos, modulo, experiencia } = profesorInfo;
console.log(`Profesor: ${nombre} ${apellidos}`);
console.log(`Módulo: ${modulo}`);
console.log(`Experiencia: ${experiencia} años`);

// Destructuring con valores por defecto
interface Configuracion {
  tema: string;
  idioma: string;
  tamanoFuente?: string; // ? indica opcionalidad en la inicialización
}

const configuracion: Configuracion = {
  tema: "oscuro",
  idioma: "español",
};

const { tema, idioma, tamanoFuente = "mediana" } = configuracion;
console.log(`Tema: ${tema}, Idioma: ${idioma}, Fuente: ${tamanoFuente}`);

// Destructuring en parámetros de funciones (el tipo se define como interface)
interface AlumnoInfo {
  nombre: string;
  edad: number;
  curso?: string;
}

const mostrarInfoAlumno = ({ nombre, edad, curso = "DI" }: AlumnoInfo): string => {
  return `Alumno: ${nombre}, Edad: ${edad}, Curso: ${curso}`;
};

const alumno1: AlumnoInfo = { nombre: "Ana", edad: 20 };
const alumno2: AlumnoInfo = { nombre: "Carlos", edad: 21, curso: "DAM" };

console.log(mostrarInfoAlumno(alumno1)); // Curso: DI (por defecto)
console.log(mostrarInfoAlumno(alumno2)); // Curso: DAM
```

> [!TIP]
> Si tenemos `noUncheckedIndexedAccess` activo en tsconfig.json, al hacer `const [a, b] = array` los elementos pueden ser `T | undefined`. Si sabes que el array está completo, puedes notificarlo: `const [a, b] = array as [string, string]`. Lo veremos en el capítulo de arrays.

---

## 0.5 Introducción a TypeScript

TypeScript es un superconjunto de JavaScript que añade tipado estático opcional. Fue desarrollado por Microsoft y se ha convertido en el estándar para desarrollo JavaScript a gran escala.

### ¿Qué es TypeScript?

TypeScript es un lenguaje de programación que extiende JavaScript añadiendo:

- **Tipado estático**: Define tipos para variables, parámetros y retornos
- **Interfaces**: Define contratos para objetos
- **Clases mejoradas**: Con modificadores de acceso y más
- **Enum → uniones de tipos**: Este curso reemplaza las enumeraciones (`enum`) por uniones de string literals, compatibles con Node 24 (a partir de Node 22 se introdujo de forma nativa el Type Stripping (la capacidad de ejecutar archivos .ts directamente borrando las anotaciones de tipo). Sin embargo, para que Node pueda ejecutar un archivo .ts sin compilar, la sintaxis de TypeScript debe ser 100% removible. Y los enum no dejan hacer eso.)
- **Genéricos**: Funciones y clases que trabajan con varios tipos
- **Type narrowing**: Refinar el tipo según el flujo del programa

### Ventajas de TypeScript

1. **Detección temprana de errores**: Los errores se detectan en tiempo de compilación
2. **Mejor autocompletado**: Los IDEs ofrecen mejor soporte
3. **Documentación viva**: Los tipos sirven como documentación
4. **Refactorización más segura**: Los cambios se propagan correctamente
5. **Mejor colaboración**: El código es más explícito y claro
6. **Ecosistema**: React (oficial) parte de TypeScript

### Instalación y Configuración

Para empezar con TypeScript, necesitas instalarlo:

```bash
# Instala TypeScript en la carpeta actual. Crea node_modules, mete ahí las librerías de TS y las definiciones de tipos.
# --save-dev es una dependencia de desarrollo (no irá en la versión de producción)
npm install --save-dev typescript @types/node

# Crea archivo de configuración tsconfig.json (reglas de compilación)
npx tsc --init
```

```bash
npm install # lee package.json y verifica que node_modules esté actualizado
npx tsc # ejecuta el compilador de TS en todo el proyecto. Transpila de .ts a .js según indique tsconfig.json
```

### Primer código más complejo con TypeScript

Aquí ya vemos muchos conceptos mezclados y alguno que aún no se ha visto (como las uniones y los genéricos):

```typescript
// TypeScript: Variables tipadas
let nombre: string = "Profe";
let edad: number = 35;
let esProfesor: boolean = true;
let tecnologias: string[] = ["JavaScript", "TypeScript", "React"];

//interface+inicialización
interface Info {
  nombre: string;
  edad: number;
}
let info: Info = {
  nombre: "Profe",
  edad: 35,
};

// TypeScript: Funciones tipadas
function saludar(nombre: string): string {
  return `Hola, ${nombre}`;
}

function calcularMedia(notas: number[]): number {
  const suma = notas.reduce((acc, nota) => acc + nota, 0);
  return suma / notas.length;
}

// TypeScript: Interfaces y uniones
interface Alumno {
  nombre: string;
  edad: number;
  curso?: string; // ? significa opcional
}

interface Profesor {
  nombre: string;
  especialidades: string[];
  experiencia: number;
}

function mostrarInfoPersona(persona: Alumno | Profesor): void {
  console.log(`Nombre: ${persona.nombre}`);

  if ("experiencia" in persona) {
    console.log(`Experiencia: ${persona.experiencia} años`);
  } else if ("curso" in persona) {
    console.log(`Curso: ${persona.curso || "No asignado"}`);
  }
}

// Uso de las interfaces
const alumno: Alumno = {
  nombre: "Ana García",
  edad: 20,
  curso: "DI",
};

const profesor: Profesor = {
  nombre: "Profe",
  especialidades: ["JavaScript", "TypeScript"],
  experiencia: 10,
};

mostrarInfoPersona(alumno);
mostrarInfoPersona(profesor);

// TypeScript: Genéricos
function crearArray<T>(items: T[]): T[] {
  return new Array<T>().concat(items);
}

const numeros: number[] = crearArray([1, 2, 3]);
const textos: string[] = crearArray(["a", "b", "c"]);

console.log(numeros); // [1, 2, 3]
console.log(textos); // ["a", "b", "c"]
```

### ¿Cómo usar TypeScript?

**Compilar / ejecutar TypeScript en este curso:**

```bash
# Comprobar si hay errores de tipos de un repo (desde repos/01-typescript-fundamentos)
npx tsc

# Ejecutar un ejemplo de la sesión (tsx ex TypeScript Execute: ejecuta .ts sin recompilar).
npx tsx src/REPO-01-tipos-primitivos.ts

# En el navegador, Vite lo transforma en caliente (capítulo 3)
```

TypeScript se compila a JavaScript estándar, por lo que puede ejecutarse en cualquier navegador o entorno Node.js.

> [!NOTE]
> **Erasable-only:** en todo este repositorio usamos solo sintaxis TS que Node 24 puede quitar al ejecutar. Eso significa: sin `enum`, sin `namespace` y sin *parameter properties* en constructores. Interfaces, uniones, tipos y genéricos sí están permitidos. Node no compila TypeScript; simplemente borra los tipos (type stripping) como si pasara un borrador sobre el texto y luego ejecuta el JavaScript que queda.

### 📦 En el repositorio (`repos/01-typescript-fundamentos/src/REPO-17-que-es-typescript.ts`)

```typescript
export {};

/**
 * Fichero 17: Que es TypeScript
 * -------------------------------------------
 * TypeScript es un superconjunto de JavaScript que anade
 * tipado estatico opcional. Todo codigo JavaScript valido
 * es TypeScript valido, pero TypeScript extiende JS con un
 * sistema de tipos que permite detectar errores en tiempo
 * de compilacion.
 *
 * - JavaScript detecta errores solo en tiempo de ejecucion
 * - TypeScript detecta errores al escribir (compilacion)
 * - TypeScript compila a JavaScript plano (navegador no lo entiende directamente)
 *
 * Ejemplos extraidos de Sesion 2 (concepto 1):
 * - Problemas de JS sin tipos
 * - Solucion con TS tipado
 */

// ========================================
// PROBLEMAS QUE SOLUCIONA TYPESCRIPT
// ========================================

// JavaScript: errores silenciosos en tiempo de ejecucion
function sumarJS(a: any, b: any): any {
    return a + b;
}

console.log("=== JavaScript (con any) ===");
console.log(sumarJS(5, "3"));          // "53" (concatenacion, no suma)
console.log(sumarJS([], {}));          // "[object Object]" (sin sentido)
// @ts-expect-error demostracion: falta el segundo argumento en JS
console.log(sumarJS(5));               // NaN (falta el segundo argumento)

// TypeScript: detecta estos errores al escribir
function sumarTS(a: number, b: number): number {
    return a + b;
}

console.log("\n=== TypeScript (tipado) ===");
console.log(sumarTS(5, 3));            // 8 - correcto
// sumarTS(5, "3");  // Error: Argument of type 'string' not assignable to 'number'
// @ts-expect-error demostracion: faltaba el segundo argumento
sumarTS(5);       // Error: Expected 2 arguments, but got 1

// ========================================
// DIFERENCIAS CLAVE
// ========================================

// JS: el tipo puede cambiar durante la ejecucion
let mutable = 42;
// @ts-expect-error demostracion: JS permite cambiar tipo, TS no
mutable = "ahora soy string";  // OK en JS, problema silencioso

// TS: detecta el conflicto de tipos
let tipado: number = 42;
// tipado = "hola";  // Error: Type 'string' is not assignable to type 'number'

// JS: no sabe que propiedad existe
const usuario = { nombre: "Ana", edad: 25 };
// console.log(usuario.telefono);  // undefined (sin error)

// TS: valida propiedades en tiempo de compilacion
interface Usuario {
    nombre: string;
    edad: number;
}
const usuarioTS: Usuario = { nombre: "Ana", edad: 25 };
// console.log(usuarioTS.telefono);  // Error: Property 'telefono' does not exist

// ========================================
// VENTAJAS DE TYPESCRIPT
// ========================================

// 1. Autocompletado inteligente
// El editor sugiere propiedades y metodos correctos

// 2. Refactor seguro
// Cambiar un nombre de tipo actualiza todas las referencias

// 3. Documentacion viva
// Los tipos documentan que espera cada funcion

// 4. Deteccion temprana de bugs
// Errores antes de ejecutar el codigo

console.log("\n=== Resumen ===");
console.log("TypeScript = JavaScript + Tipos estaticos");
console.log("Detecta errores al escribir, no al ejecutar");
console.log("Compila a JS plano que el navegador entiende");
```

---

[Volver al índice general](../../index.md)