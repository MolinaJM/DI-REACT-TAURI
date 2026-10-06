# **Capítulo 05. Contenido 📝** 🖥️

- [5. Estructuras de Control de Flujo en TypeScript](#5-estructuras-de-control-de-flujo-en-typescript)
  - [5.1. Estructuras Condicionales](#51-estructuras-condicionales)
    - [5.1.1. Declaración `if`](#511-declaraci%C3%B3n-if)
    - [5.1.2. Declaración `else`](#512-declaraci%C3%B3n-else)
    - [5.1.3. `else if`](#513-else-if)
  - [5.2. Bucles](#52-bucles)
    - [5.2.1. `for` Loop (clásico)](#521-for-loop-clásico)
    - [5.2.2. `while` Loop](#522-while-loop)
    - [5.2.3. `do...while` Loop](#523-dowhile-loop)
    - [5.2.4. `for...of` Loop (ES6)](#524-forof-loop-es6)
  - [5.3. Estructuras de Control Avanzadas](#53-estructuras-de-control-avanzadas)
    - [5.3.1. `switch` Statement](#531-switch-statement)
  - [5.4. Narrowing: el control de flujo tipado](#54-narrowing-el-control-de-flujo-tipado)
    - [Unión discriminada (narrowing por discriminante)](#unión-discriminada-narrowing-por-discriminante)
    - [Type guards con predicados (`is`)](#type-guards-con-predicados-is)
    - [Type guards con `asserts`](#type-guards-con-asserts)
  - [5.5. Importar un JSON de un fichero y validarlo](#55-importar-un-json-y-validarlo)
    - [5.5.1. El fichero de datos](#551-el-fichero-de-datos)
    - [5.5.2. `tsconfig.json` y el atributo de import](#552-tsconfig-y-el-atributo-de-import)
    - [5.5.3. ¿Por qué un JSON local y no un `fetch` real?](#553-por-qué-json-local-y-no-fetch-real)
    - [5.5.4. El código: import + `unknown` + type guard + estados](#554-el-código)
    - [5.5.5. Tres errores típicos](#555-tres-errores-típicos)
- 🧪 **Ejercicios:** [Estructuras de control de flujo](../../../ejerciciosTS/ejerciciosTS.md#10-estructuras-de-control-de-flujo) · [Literal Types y Narrowing](../../../ejerciciosTS/ejerciciosTS.md#11-literal-types-y-type-narrowing) · [Type Guards Avanzados](../../../ejerciciosTS/ejerciciosTS.md#12-type-guards-avanzados)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<a id="5-estructuras-de-control-de-flujo-en-typescript"></a>
# 5. Estructuras de Control de Flujo en TypeScript

Las estructuras de control de flujo en JavaScript permiten tomar decisiones y repetir acciones según sea necesario en un programa. Estas estructuras son fundamentales para el flujo de ejecución de un programa. En TypeScript, además, las estructuras condicionales y los `switch` **refinan los tipos** de las variables (narrowing), lo que hace el código más seguro.

<a id="51-estructuras-condicionales"></a>
## 5.1. Estructuras Condicionales

<a id="511-declaración-if"></a>
### 5.1.1. Declaración `if`

La estructura `if` se utiliza para ejecutar un bloque de código si una condición es verdadera.

```typescript
let edad: number = 18;

if (edad >= 18) {
  console.log("Eres mayor de edad");
}
```

<a id="512-declaración-else"></a>
### 5.1.2. Declaración `else`

El bloque `else` se ejecuta si la condición en `if` es falsa.

```typescript
let edad: number = 15;

if (edad >= 18) {
  console.log("Eres mayor de edad");
} else {
  console.log("Eres menor de edad");
}
```

<a id="513-else-if"></a>
### 5.1.3. `else if`

`else if` se utiliza para evaluar múltiples condiciones secuencialmente.

```typescript
let puntuacion: number = 85;

if (puntuacion >= 90) {
  console.log("Excelente");
} else if (puntuacion >= 70) {
  console.log("Aprobado");
} else {
  console.log("Reprobado");
}
```

**Recordemos:**

`El número 0, un string vacío "", null, undefined, y NaN se convierte en false. Por esto son llamados valores "falsy".`

`El resto de los valores se convierten en true, entonces los llamaremos valores "truthy".`

> [!TIP]
> En TypeScript con `strict`, un `if (valor)` comprobando un tipo que incluye `null` o `undefined` provoca *narrowing*: dentro del bloque, el tipo de `valor` queda reducido. Es la base para manejar datos opcionales de forma segura.

<a id="52-bucles"></a>
## 5.2. Bucles

Un **bucle** repite un bloque de código mientras se cumpla una condición. En TypeScript, como en JavaScript, hay cuatro formas de iterar: `for` (clásico), `while`, `do...while` y `for...of` (la moderna, para iterables).

<a id="521-for-loop-clásico"></a>
### 5.2.1. `for` Loop (clásico)

El bucle `for` es el más versátil: controlas **inicialización**, **condición** y **paso** en una sola línea. Es la opción cuando necesitas el **índice** o un paso no lineal.

```typescript
const numeros: number[] = [10, 20, 30, 40];

for (let i = 0; i < numeros.length; i++) {
  console.log(`Índice ${i}: ${numeros[i]}`);
}
// Imprime:
// Índice 0: 10
// Índice 1: 20
// Índice 2: 30
// Índice 3: 40
```

> [!TIP]
> Usa `for` clásico cuando necesites el **índice** (`i`) o quieras saltar elementos (`i += 2`). Si solo te interesa el **valor**, prefiere `for...of` (§5.2.4): es más corto y el tipo de cada elemento se infiere solo.

<a id="522-while-loop"></a>
### 5.2.2. `while` Loop

El bucle `while` repite mientras su condición sea `true`. La condición se comprueba **antes** de cada iteración; si es falsa desde el principio, el bloque **no se ejecuta ni una vez**.

```typescript
let contador: number = 1;

while (contador <= 3) {
  console.log(`Ronda ${contador}`);
  contador++; // sin esto, bucle infinito
}
// Imprime: Ronda 1, Ronda 2, Ronda 3
```

> [!NOTE]
> La condición debe **cambiar** dentro del bucle (aquí `contador++`), o el bucle será infinito. Úsalo cuando no sepas de antemano cuántas iteraciones harás (p. ej. leer hasta que el usuario escriba "salir").

<a id="523-dowhile-loop"></a>
### 5.2.3. `do...while` Loop

El bucle `do...while` es como `while`, pero la condición se comprueba **después**: el bloque se ejecuta **al menos una vez**, aunque la condición sea falsa desde el inicio.

```typescript
let intentos: number = 0;
let correcto: boolean = false;

do {
  intentos++;
  console.log(`Intento ${intentos}`);
  correcto = intentos === 2; // "acierta" en el 2º intento
} while (!correcto);
// Imprime: Intento 1, Intento 2
```

> [!NOTE]
> Diferencia clave con `while`: `do...while` garantiza **una ejecución mínima**. Es útil para menús o validaciones donde primero se muestra la opción y después se pregunta si se repite.

<a id="524-forof-loop-es6"></a>
### 5.2.4. `for...of` Loop (ES6)

El bucle `for...of` itera sobre los **valores** de un iterable (arrays, strings, Map, Set, etc.). Es la forma moderna y recomendada para recorrer arrays. No debes usar forEach cuando necesites detener la iteración con break/continue o manejar código asíncrono con async/await, ya que no soporta control de flujo ni espera la resolución de promesas.

```typescript
const frutas: string[] = ["manzana", "pera", "uva"];

for (const fruta of frutas) {
  console.log(fruta);
}
// Imprime: manzana, pera, uva

// También funciona con strings
for (const letra of "Hola") {
  console.log(letra);
}
// Imprime: H, o, l, a
```

> `for...of` obtiene directamente el **valor** de cada elemento, a diferencia de `for...in` que itera sobre las **claves** (índices). Para arrays, usa siempre `for...of`. En apuntes posteriores veremos el uso del `for...in`.

> [!TIP]
> Con `for...of`, cada `fruta` es automáticamente `string` (inferido del array). Al recorrer un `Map<string, number>` con `for (const [clave, valor] of mapa)`, TypeScript ya sabe que `clave: string` y `valor: number`.

<a id="53-estructuras-de-control-avanzadas"></a>
## 5.3. Estructuras de Control Avanzadas

<a id="531-switch-statement"></a>
### 5.3.1. `switch` Statement

`switch` se utiliza para evaluar múltiples casos y ejecutar código según el caso que coincida.

```typescript
let diaSemana: string = "Lunes";

switch (diaSemana) {
  case "Lunes":
    console.log("Hoy es lunes.");
    break;
  case "Martes":
    console.log("Hoy es martes.");
    break;
  default:
    console.log("Es otro día de la semana.");
}
```

> [!NOTE]
> En `strict` mode, un `switch` sobre un tipo **unión** (p. ej. `type Estado = "ok" | "cargando" | "error"`) estrecha el tipo en cada `case`. Si además usamos el patrón *exhaustive check* con `never`, TypeScript nos avisa si falta un caso. Ya lo vimos en   [`01_SintaxisBasica.md`](01_SintaxisBasica.md) (sección *never en exhaustiveness checking*), con una variable `_exhaustivo: never` en el `default`.

<a id="54-narrowing-el-control-de-flujo-tipado"></a>
## 5.4. Narrowing: el control de flujo tipado. Los type guards.

TypeScript analiza el flujo del programa y **reduce el tipo** de una variable según las condiciones por las que pasa. Esto se llama *type narrowing* y es la forma segura de "filtrar" tipos unión.

Los **type guards** son las herramientas para producir el narrowing.

El narrowing **NO es algo que nosotros programemos, sino que es una consecuencia del flujo que SÍ hemos programado**.

Ejemplos de narrowing básico:

```typescript
//Narrowing clásico con typeof
function hazCambios(valor: string | number): void {
console.log(typeof valor);//Aquí, en codificación, me dirá que es de ambos tipos
//pero en runtime ya sí lo estrechará
  if (typeof valor === "string") {
    // aquí valor es string --> a Mayúsculas
    console.log(valor.toUpperCase()+"\n");
  } else {
    // aquí valor es number --> Redondea decimales
    console.log(valor.toFixed(2)+"\n");
  }
}

hazCambios(3);
hazCambios("TRES");

 //Narrowing por igualdad/desigualdad (equality narrowing). No usa typeof/instanceof...
function procesar(dato: Usuario | null): string {
  if (dato === null) {
    return "Sin datos";
  }
  // aquí dato es Usuario (narrowing implícito) Si el ascensor no va hacia arriba ... entonces??
  return dato.nombre;
}

interface Usuario {
  nombre: string;
}

console.log(procesar(null)); 
let u:Usuario={nombre:"Profe"};
console.log(procesar(u)); 
```

| Type Guard  | Cuándo usarla | Ejemplo |
|-------------|---------------|---------|
| `typeof` | Tipos primitivos de JS (`string`, `number`, `boolean`, `undefined`, `function`) | `typeof x === "string"` |
| `in` | Interfaces/objetos con propiedades distintas | `"ladrar" in animal` |
| `Array.isArray(x)` | Arrays (porque `typeof []` es `"object"`) | `Array.isArray(lista)` |
| `instanceof` | Instancias de `Error`/clases | `x instanceof Error` |
| `igualdad/desigualdad` | Para valores concretos. Vale para tipos primitivos (ej: null) o un valor concreto 404| `v == "404"` |

```typescript
// Ejemplo mínimo de las tres herramientas: `in`, `Array.isArray(x)` e `instanceof`

interface Perro { 
    ladrar(): void 
}
interface Gato { 
    maullar(): void 
}
type Animal = Perro | Gato;

function hablar(animal: Animal): string {
  if ("ladrar" in animal) {   // `in` estrecha la unión a Perro
    animal.ladrar();
    return "Guau";
  }
  animal.maullar(); // aquí TypeScript ya sabe que es Gato (narrowing implícito)
  return "Miau";
}

console.log(hablar({ ladrar: () => {} }));  // Guau
console.log(hablar({ maullar: () => {} })); // Miau
//Otra forma equivalente de haber puesto la llamada
//console.log(hablar({ ladrar() {} }));  // Guau
//console.log(hablar({ maullar() {} })); // Miau


type Dato = string | number | string[] | Error;

function describir(dato: Dato): string {
  if (Array.isArray(dato)) {   // único narrowing fiable para arrays porque si hacemos typeof [] da un "object")
    console.log(typeof dato);//Da object y no valdría para hacer narrowing
    return `Lista de ${dato.length}: ${dato.join(", ")}`;
  }
  if (dato instanceof Error) { // instanceof mira la clase real del objeto
    return `Error: ${dato.message}`;
  }
  return `Valor: ${dato}`;
}


console.log(describir("hola"));             // Valor: hola
console.log(describir(42));                 // Valor: 42
console.log(describir(["a", "b"]));         // Lista de 2: a, b
console.log(describir(new Error("boom")));  // Error: boom
```

<a id="unión-discriminada-narrowing-por-discriminante"></a>
### Unión discriminada (narrowing por discriminante)

Cuando **todos** los miembros de una unión comparten la misma propiedad literal (la que se llama *discriminante*), el `switch` deja de ser un `switch` cualquiera. Ocurre que en cada `case`, TypeScript reduce el tipo al miembro correspondiente y **solo deja acceder a las propiedades de ese miembro**. 

Es el patrón más usado en React y en Tauri para modelar estados:

- **Gestión de estados asíncronos en UI (React)**: Para no volverte loco con mil booleanos tipo cargando, hayError o tengoDatos que se pisan entre sí. Así la app solo puede estar en un sitio a la vez y te quitas de encima estados raros o imposibles.

- **Manejo de respuestas de comandos IPC (Tauri)**: Básicamente para cuando le pedimos algo al backend en Rust y no sabes si te va a devolver los datos bien o te va a lanzar un error. Así te aseguras de tratar cada caso sin que explote la app.

- **Procesamiento de buses de eventos del sistema (Tauri/React)**: Cuando el sistema lanza avisos por detrás (como que se bajó una actualización o cambió el tamaño de la pantalla), sirve para saber exactamente qué información trae cada aviso sin ir a ciegas.

Ya se introdujo en [`01_SintaxisBasica.md`](01_SintaxisBasica.md) (sección *Unión de tipos*) con `status: 'success' | 'error'`; aquí se ve el efecto sobre el control de flujo:

```typescript
interface Circulo { tipo: "circulo"; radio: number }          // `tipo` es el discriminante
interface Rectangulo { tipo: "rectangulo"; ancho: number; alto: number }
type Figura = Circulo | Rectangulo;

function calcularArea(fig: Figura): number {
  switch (fig.tipo) {
    case "circulo":       // aquí fig es Circulo: existe fig.radio
      return Math.PI * fig.radio ** 2;
    case "rectangulo":    // aquí fig es Rectangulo: existen fig.ancho y fig.alto
      return fig.ancho * fig.alto;
    default: {
      const _exhaustivo: never = fig;   // exhaustiveness check (§5.3.1)
      return _exhaustivo;
    }
  }
}

console.log(calcularArea({ tipo: "circulo", radio: 5 }));        // 78.53981633974483
console.log(calcularArea({ tipo: "rectangulo", ancho: 4, alto: 6 })); // 24
```

Qué aporta frente a un objeto normal:

- **No hace falta optional chaining** (`fig.radio?.`) ni aserciones `as`: en cada rama las propiedades existen de verdad.
- **El `default` con `never` avisa si falta un caso**: al añadir un tercer miembro a `Figura`, el compilador señala el `switch` que se ha quedado corto.
- Cada rama trabaja con **tipos distintos**, así que el compilador ayuda también con autocompletado y con el renombrado de propiedades.

> [!NOTE]
> Si el discriminante es un `string` en vez de un literal (`tipo: string`), el narrowing se pierde: `instanceof` y las aserciones no ayudan aquí porque la forma no distingue. Mantén siempre literales (`"circulo"`, `"rectangulo"`).

<a id="type-guards-con-predicados-is"></a>
### Type guards con predicados (`is`)

Las herramientas anteriores (`typeof`, `in`, `instanceof`) son narrowing integrado en el lenguaje. Pero a veces necesitas comprobar algo más específico: "¿este objeto cumple la forma de `Usuario`?". Para eso se usan **type guards con predicados**: funciones que devuelven `boolean` pero cuyo tipo de retorno se anota como `valor is Tipo`. Esto le dice a TypeScript: "cuando esta función devuelve `true`, dentro del `if` el valor es de ese tipo".

Estos typeguards se usan MUCHO en REACT, sobre todo a la hora de recibir datos desde un JSON. Suelen denotarse como **esLOQUESEA()** devolviendo siempre un boolean.

```typescript
interface Usuario {
  nombre: string;
  email: string;
}

interface Admin {
  nombre: string;
  rol: "superadmin" | "moderador";
}

// Type guard: devuelve true si el objeto tiene la forma de Usuario
function esUsuario(v: unknown): v is Usuario {
  return typeof v === "object" && v !== null
    && "nombre" in v && "email" in v;
}

// Type guard: devuelve true si el objeto tiene la forma de Admin
function esAdmin(v: unknown): v is Admin {
  return typeof v === "object" && v !== null
    && "nombre" in v && "rol" in v;
}

function saludar(persona: unknown): string {
  if (esUsuario(persona)) {  // aquí persona es Usuario   
    return `Hola ${persona.nombre}, email: ${persona.email}`;
  }
  if (esAdmin(persona)) { // aquí persona es Admin    
    return `Hola ${persona.nombre}, rol: ${persona.rol}`;
  }
  return "Desconocido";
}

console.log(saludar({ nombre: "Ana", email: "ana@test.com" }));
console.log(saludar({ nombre: "Carlos", rol: "moderador" }));
console.log(saludar("no soy un objeto"));
```

> [!TIP]
> El predicado `v is T` se escribe en el **retorno de la función**, no en los parámetros. TypeScript usa esa información para hacer narrowing automáticamente en el `if`. Es como decirle al compilador: "yo me hago cargo de la comprobación, confía en mí".

<a id="type-guards-con-asserts"></a>
### Type guards con `asserts`

A veces no quieres devolver un booleano, sino **afirmar** que un valor es de cierto tipo y lanzar un error si no lo es. Para eso se usa `asserts valor is Tipo` como tipo de retorno. La función no devuelve nada (`void`), pero a cambio le dice a TypeScript que, si no se lanza excepción, el valor es del tipo afirmado.

No se usan mucho en la capa de UI (React), pero en el motor de la app (Tauri/Servicios) sí se usan mucho más. Es el sitio perfecto para decir: "O el servidor/Rust me manda exactamente los datos como yo quiero, o paro todo de golpe todo antes de enviar basura a la pantalla"..

```typescript
interface Config {
  url: string;
  timeout: number;
}

// Afirmación: si no lanza error, nos aseguramos que cfg es Config
function validarConfig(cfg: unknown): asserts cfg is Config {
  if (typeof cfg !== "object" || cfg === null) {
    throw new TypeError("La configuración debe ser un objeto");
  }
  //Si llegamos aquí, necesitamos comprobar si es de tipo Config  
  
  // Podríasmo poner ahora esto:
  // const c = config as Config;
  // ERROR! Es una aserción que deberíamos evitar. Hay que comprobar que 
  // exactamente tengo un "objeto" con los campos correctos en nombre y contenido  
 
  // Usamos RECORD: se verá en la sección de Arrays
  // Castea 'cfg' a un objeto con claves de texto y valores 'unknown',
  // lo que permite acceder a sus propiedades (c.url, c.timeout) para validarlas.
  const c = cfg as Record<string, unknown>; //ese string indica la cadena con el nombre del atributo de objeto
  if (typeof c.url !== "string") {
    throw new TypeError("La configuración debe tener 'url' como string");
  }
  if (typeof c.timeout !== "number") {
    throw new TypeError("La configuración debe tener 'timeout' como number");
  }
}

const datos = { url: "https://api.ejemplo.com", timeout: 5000 };
validarConfig(datos);
// aquí TypeScript sabe que datos es Config sin necesidad de aserciones
console.log(datos.url); // sin error
```

> [!IMPORTANT]
> Preferir **narrowing** a `as`. Una aserción `as` le dice a TypeScript "confía en mí"; el narrowing le permite **comprobar** las ramas. La diferencia es que el narrowing se puede equivocar menos porque está basado en el flujo real del programa.




<a id="55-importar-un-json-y-validarlo"></a>
## 5.5. Importar un JSON de un fichero y validarlo

Hasta aquí los type guards los aplicábamos a datos escritos a mano. El caso real habitual es otro: los datos vienen del exterior, normalmente vía una API. Dado que aún no hemos visto el capítulo de asincronía, lo vamos a realizar mediante un **fichero `.json`**.  Hay que importar los datos, comprobar que tienen la forma correcta y modelar los estados de la carga. Este apartado reutiliza los type guards de §5.4.

<a id="551-el-fichero-de-datos"></a>
### 5.5.1. El fichero de datos

Los datos van en un `.json` normal, junto al código (o en una carpeta `datos/`):

```json
// datos/planetas.json
{
  "planetas": [
    { "name": "Tatooine", "population": 200000, "climate": "arid" },
    { "name": "Hoth",      "population": 0,      "climate": "frozen" },
    { "name": "Dagobah",   "population": "muchos", "climate": "humid" }
  ]
}
```

<a id="552-tsconfig-y-el-atributo-de-import"></a>
### 5.5.2. `tsconfig.json` y el atributo de import

Aquí hay que distinguir **dos cosas** que se confunden y acaban dando el mismo síntoma:

1. El **`tsconfig.json`** solo lo usa `tsc` (y a lo que indique  el editor como por ejemplos, VSCODE). `Node` no lo mira!!, y `tsc`no usa otra cosa para saber qué hacer.
2. El **atributo `with { type: "json" }`** en el import le importa al **motor de JavaScript**, o sea a `node`.

**CONCLUSIÓN? Pon siempre el atributo.** Funciona igual con `tsc`, con `npx tsx` y con `node`:

```typescript
//En fichero donde quiero consumir esos datos
import datos from "./planetas.json" with { type: "json" };
const datosCrudos: unknown = datos;
console.log(datosCrudos);//Mostramos en crudo (habría que tratarlos)
```

Y en el `tsconfig.json`, **con la configuración del curso no hay que cambiar nada**: `bancop` ya lleva `"moduleResolution": "bundler"`.  `bundler`es el "empaquetador" que revisa todo (.ts, .css, .json, imágenes, etc..) y lo empaqueta en un único .js. Como ventaja, trata los json de forma distinta a los .ts o .tsx. Node sabe que es un fichero "distinto" y lo trata de forma distinta (es un recurso)..
 `
<details>
<summary><b>Si te saltas el atributo, verás esto</b></summary>

Con `npx tsx` el import plano funciona, pero en cuanto lo ejecutas con `node` (que es como se ejecuta de verdad) revienta:

```
TypeError [ERR_IMPORT_ATTRIBUTE_MISSING]: Module ".../planetas.json" needs an import attribute of "type: json"
```

`tsx` deja pasar el error pero node no. `tsx`es un *transpilador* con su propio cargador de módulos, no el cargador nativo.

⚠️ Y justo en la otra dirección: **`tsx` no comprueba los tipos**. Que un ejemplo funcione con `npx tsx` no significa que esté bien tipado; ejecútalo también con `npx tsc` para verlo.
</details>


<a id="553-por-qué-json-local-y-no-fetch-real"></a>
### 5.5.3. ¿Por qué un JSON local y no un `fetch` real?

Porque en este capítulo toca **`narrowing`**, no asincronía. Para entender el *guard* no hace falta, ni conviene, mezclar promesas:

| | `import datos from "./planetas.json"` | `await fetch(url)` |
|---|---|---|
| ¿Cuándo llega el dato? | Es inmediato. Al cargar el módulo, **síncrono** | Viene después, **asíncrono** (devuelve `Promise<T>`) |
| ¿Dónde se resuelve? | En **compilación**, lo empaqueta el bundler | En **ejecución**, contra un servidor |
| ¿Puede fallar? | Si el `.json` es inválido, da error de TS al compilar. Ojo: `tsx` **no** comprueba tipos, así que también puede reventar al ejecutar | Sí: red caída, `404`, sin cobertura, y el servidor puede cambiar la forma de los datos |
| ¿Repetible? | Siempre igual | Depende del servidor en cada ejecución |

Y lo realmente **IMPORTANTE**: **el problema es el mismo en ambos casos (capítulo actual /capítulo asincronía)**. El dato es una fuente externa, así que da igual de dónde venga, hay que tratarlo como `unknown` y validarlo. El *guard* **no cambia ni una línea**:

```typescript
function esPlaneta(valor: unknown): valor is Planeta { /* igual */ }

// Solo cambia CÓMO se consigue el valor:
...
const valor: unknown = datosCrudos.planetas;             // con import (como se ve en este capítulo)
const valor: unknown = await (await fetch(url)).json();  // con fetch (acordarse del ejemplo de SWAPI)
...
```

> [!TIP]
> Por eso el `fetch` de verdad llega después. En [00_Introduccion §0.4.6](00_Introduccion.md#6-asincronía-nativa-y-moderna) ya lo vimos de pasada contra SWAPI, pero **anunciando que los conceptos se desarrollan más adelante** (`async`/`await`/`Promise`, en [Asincronismo §8.4](../s03/08_Asincronismo_Callbacks_Promesas_AsyncAwait.md#84-asyncawait-simplificando-el-uso-de-promesas)). Cuando llegues allí, este ejemplo cambiará **dos líneas** y el type guard seguirá exactamente igual.

> [!NOTE]
> **Un matiz honesto:** con un import estático **no hay un estado de carga `cargando` real** (el dato ya está disponible al arrancar). Los **estados de carga** le indican a la interfaz qué hacer (mostrar) según el estado de los datos esperados (Ej: una tabla de datos podrá estar en estado cargando/cargado/error).  Lo modelamos igualmente porque es la forma que necesitarás cuando el dato sí tarde, y de paso practicas unión discriminada y `switch` exhaustivo.

<a id="554-el-código"></a>
### 5.5.4. El código: import + `unknown` + type guard + estados de carga

```typescript
/**
 * Fichero: cargar-json.ts
 * -----------------------------------------------------------------
 * Traer datos de un fichero .json, validarlos con un type guard
 * y modelar los estados de la carga con una unión discriminada.
 */

// El import normal. TS YA CONOCE la forma: `datosCrudos.planetas[0].noExiste`
// daría error, no `any`. Aun así, el JSON es una FUENTE EXTERNA:
// lo tratamos como `unknown` y lo validamos antes de confiar en él.
import datosCrudos from "./planetas.json" with { type: "json" };

// El tipo que NOSOTROS queremos (el .json no sabe nada de él)
interface Planeta {
    name: string;
    population: number;
    climate: string;
}

// Type guard con predicado `is` (§5.4): comprueba la forma EN EJECUCIÓN.
function esPlaneta(valor: unknown): valor is Planeta {
    if (typeof valor !== "object" || valor === null) return false;   // null y primitivos fuera
    const p = valor as Record<string, unknown>;                      // ya es un objeto
    return typeof p.name === "string"
        && typeof p.population === "number"
        && typeof p.climate === "string";
}

// `filter` con un predicado `is` devuelve el array YA TIPADO como Planeta[]
const planetas: Planeta[] = datosCrudos.planetas.filter(esPlaneta);

console.log(planetas.map((p) => `${p.name}: ${p.population}`));
// Dagobah NO aparece: su "population" es un string, el guard lo descarta

// Unión discriminada: los ESTADOS de la carga. Solo se accede a las
// propiedades de cada variante dentro de su `case` (narrowing por discriminante).
type EstadoCarga =
    | { estado: "cargando" }
    | { estado: "error"; mensaje: string }
    | { estado: "listo"; planetas: Planeta[] };

function procesar(estado: EstadoCarga): string {
    switch (estado.estado) {                       // switch exhaustivo (§5.3.1)
        case "cargando": return "Cargando...";
        case "error":    return `Error: ${estado.mensaje}`;
        case "listo":    return `${estado.planetas.length} planetas`;
        default: {
            const nunca: never = estado;          // ¿te falta un caso? ERROR aquí
            return nunca;
        }
    }
}

//Hacemos un test de los estados de carga
//Cuando estemos con funciones ASÍNCRONAS (async) estos estados saltarán
//según lo que esté pasando con la carga de los datos.
console.log(procesar({ estado: "cargando" }));
console.log(procesar({ estado: "error", mensaje: "sin red" }));
console.log(procesar({ estado: "listo", planetas }));
```

> ▶ **Cómo probarlo:** copia el `.json` a `bancop/datos/planetas.json` y el bloque a `bancop` como `cargar-json.ts`; ejecuta `npx tsx cargar-json.ts` (desde `bancop/`) y después `npx tsc` para ver los tipos.
> Ejercicios relacionados en `ejerciciosTS/ejerciciosTS.md`: §12 (type guards) y §20 (estados de carga).

<a id="555-tres-errores-típicos"></a>
### 5.5.5. Tres errores típicos

> [!IMPORTANT]
> - **No uses `node:fs` (`readFileSync`, `readFileSyncSync`)** para leer el JSON. Estas librerías NO SIRVEN AQUÍ. No existe en el navegador, así que el código te dejará de funcionar en cuanto llegues a React.
> - **No uses `fetch("./datos/planetas.json")`**: `fetch` no admite rutas relativas (necesita URL absoluta) ni el protocolo `file://`. `fetch` es para pedir datos a un **backend real** (ver [Asincronismo (S03·8)](../s03/08_Asincronismo_Callbacks_Promesas_AsyncAwait.md#85-el-tipado-de-promiset-la-clave-de-typescript)).
> - **El JSON importado es un objeto ÚNICO compartido** (singleton): todas las importaciones ven la misma referencia. **No lo mutes**; deriva una copia con spread, como en [Estructuras de Datos (S03·7)](../s03/07_Estructuras_de_Datos.md#75-métodos-importantes).

```typescript
import datos from "./planetas.json" with { type: "json" };

// ERROR!! Mutar el singleton: lo ven todos los que importan el módulo
datos.planetas[1].population = 999; //Intento de cambio de población a Hoth

// OK!!! Derivar una copia nueva con spread (inmutabilidad)
// Estamos intentando "modificar" su copia correctamente copiada
const copia = datos.planetas.map((p) =>
    p.name === "Hoth" ? { ...p, population: 999 } : p,
);
```



---

[Volver al índice general](../../../README.md#5-distribución-temporal-y-contenidos-s00s13)
