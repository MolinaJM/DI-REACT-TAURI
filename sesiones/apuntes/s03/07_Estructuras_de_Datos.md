<a id="capítulo-07-estructuras-de-datos"></a>
# **Capítulo 07. Estructuras de Datos 📝** 🖥️

- [**Capítulo 07. Estructuras de Datos 📝** 🖥️](#capítulo-07-estructuras-de-datos)
- [7. Estructura de Datos Objeto en TypeScript (ES6)](#7-estructura-de-datos-objeto-en-typescript-es6)
  - [7.1 Formas de crear Objetos](#71-formas-de-crear-objetos)
    - [7.1.1 Sintaxis de Objeto Literal](#711-sintaxis-de-objeto-literal)
  - [7.2 Acceso a Propiedades](#72-acceso-a-propiedades)
    - [7.2.1 Encadenamiento opcional (`?.`) y `??`](#721-encadenamiento-opcional)
  - [7.3 Modificación de Propiedades](#73-modificación-de-propiedades)
  - [7.4 Eliminación de Propiedades](#74-eliminación-de-propiedades)
  - [7.5 Métodos Importantes](#75-métodos-importantes)
    - [7.5.1 Object.keys()](#751-objectkeys)
    - [7.5.2 Object.values()](#752-objectvalues)
    - [7.5.3 Object.entries()](#753-objectentries)
    - [7.5.4 Object.assign()](#754-objectassign)
    - [7.5.5 Object.freeze()](#755-objectfreeze)
  - [7.6 Desestructuración de Objetos.](#76-desestructuración-de-objetos)
    - [Ejemplo 1: Extracción básica de propiedades](#ejemplo-1-extracción-básica-de-propiedades)
    - [Ejemplo 2: Propiedades con alias](#ejemplo-2-propiedades-con-alias)
    - [Ejemplo 3: Extracción de propiedades anidadas](#ejemplo-3-extracción-de-propiedades-anidadas)
  - [7.7 `Array.from()` en TypeScript](#77-arrayfrom-en-typescript)
  - [7.8 Métodos para trabajar con JSON en TypeScript `JSON.stringify()` y `JSON.parse()`.](#78-métodos-para-trabajar-con-json-en-typescript-jsonstringify-y-jsonparse)
    - [7.8.1 `JSON.stringify()`](#781-jsonstringify)
    - [Ejemplos de `JSON.stringify()`](#ejemplos-de-jsonstringify)
      - [Ejemplo 1: Conversión básica](#ejemplo-1-conversión-básica)
      - [Ejemplo 2: Formateo con `space`](#ejemplo-2-formateo-con-space)
    - [7.8.2 `JSON.parse()`](#782-jsonparse)
    - [Ejemplos de `JSON.parse()`](#ejemplos-de-jsonparse)
      - [Ejemplo 3: Conversión básica](#ejemplo-3-conversión-básica)
    - [Resumen](#resumen)
  - [7.9 Tipos de Objeto en TypeScript](#79-tipos-de-objeto-en-typescript)
  - [7.10 `Record<K, V>`](#710-record-k-v)
- 🧪 **Ejercicios:** [Objetos en profundidad](../../../ejerciciosTS/ejerciciosTS.md#17-objetos-en-profundidad)

---

<a id="7-estructura-de-datos-objeto-en-typescript-es6"></a>
# 7. Estructura de Datos Objeto en TypeScript (ES6)

Los objetos en JavaScript son una de las estructuras de datos más fundamentales y poderosas. Son colecciones de **pares clave-valor** y se utilizan para representar **datos estructurados**. En TypeScript, los objetos se describen con `interface` o `type`, lo que permite pasar de "cualquier forma" (JS dinámico) a formas conocidas de antemano que el compilador valida.

<a id="71-formas-de-crear-objetos"></a>
## 7.1 Formas de crear Objetos

Hay varias formas de crear objetos en JavaScript ES6 (ahora con anotaciones de TypeScript):

<a id="711-sintaxis-de-objeto-literal"></a>
### 7.1.1 Sintaxis de Objeto Literal

La forma más común de crear un objeto es utilizando la sintaxis de objeto literal:

```typescript
interface Persona {
  nombre: string;
  edad: number;
  profesion: string;
}

const persona: Persona = {
  nombre: "Juan",
  edad: 30,
  profesion: "Desarrollador",
};
```

<a id="72-acceso-a-propiedades"></a>
## 7.2 Acceso a Propiedades

Puedes acceder a las propiedades de un objeto de varias maneras:

```typescript
const persona: Persona = {
  nombre: "Juan",
  edad: 30,
  profesion: "Desarrollador",
};

// Notación de punto
console.log(persona.nombre); // "Juan"

// Notación de corchetes
console.log(persona["edad"]); // 30
```

<a id="721-encadenamiento-opcional"></a>
### 7.2.1 Encadenamiento opcional (`?.`) y `??`

El nullish coalescing ??, como ya sabemos, devuelve el valor de la derecha **solo** cuando el de la izquierda es `null` o `undefined`. 
**Pero `??` decide el *valor*, no protege el *acceso*.** Para aplicarlo, primero hay que evaluar lo que hay a la izquierda. 
Pero, si lo que falta no es el valor sino **la propiedad que lo contiene**, ese acceso ya ha reventado antes de que `??` llegue a decidir nada:

```typescript
// Si no hay dirección...
// persona.direccion.ciudad ?? "sin ciudad"
//            ↑ TypeError: Cannot read properties of undefined (reading 'ciudad')
```

Ese es justo el hueco que llena el concepto nuevo.

**Encadenamiento opcional / Optional Chaining (`?.`)**: si lo que hay a la izquierda es `null` o `undefined`, **la cadena se corta** y la expresión completa vale `undefined`, en lugar de lanzar un `TypeError`. Ahí está su utilidad: recorrer propiedades, niveles de anidado o índices que **pueden no existir** hasta llegar al final sin romperse. Se combina con lo ya conocido: `?.` llega sin choque hasta el final y `??` le pone el valor por defecto → `persona.direccion?.ciudad ?? "sin ciudad"`.
  
¿Qué tiene en común un array y una propiedad opcional?

**Ejemplo A — índice de array**

```typescript
const asistentes: Persona[] = [
  { nombre: "Juan", edad: 30, profesion: "Desarrollador" },
  { nombre: "María", edad: 25, profesion: "Diseñadora" },
];

console.log(asistentes[0]?.nombre); // "Juan"
console.log(asistentes[0]?.profesion); // "Desarrollador"

const mayores = asistentes.filter((p) => p.edad >= 40);
console.log(mayores[0]?.nombre); // undefined (sin TypeError)
```

> [!NOTE]
> `asistentes[0]` es `Persona | undefined` (con `noUncheckedIndexedAccess`, activo en este curso). Sin `?.`, TypeScript te avisa **al compilar** al acceder a `.nombre` con un `Object possibly undefined`; en runtime saltaría `TypeError: Cannot read properties of undefined`.

**Ejemplo B — propiedad anidada opcional**

Completamos `Persona` con una propiedad (objeto) anidada **opcional**. Fíjate en que hace falta anotar el tipo: en un objeto literal "a secas" TypeScript no sabe que `direccion` puede faltar.

```typescript
interface Persona {
  nombre: string;
  edad: number;
  profesion: string;
  direccion?: { ciudad: string; cp: string }; // puede faltar
}

const persona: Persona = {
  nombre: "Juan",
  edad: 30,
  profesion: "Desarrollador",
  direccion: { ciudad: "Granada", cp: "18000" },
};

const sinDireccion: Persona = { nombre: "María", edad: 25, profesion: "Diseñadora" };

console.log(persona.direccion?.ciudad); // "Granada"
console.log(persona.direccion?.cp); // "18000"
console.log(sinDireccion.direccion?.ciudad); // undefined (sin TypeError)

// Con `??` no nos queda un undefined escondido
console.log(persona.direccion?.ciudad ?? "sin ciudad"); // "Granada"
console.log(sinDireccion.direccion?.ciudad ?? "sin ciudad"); // "sin ciudad"
```



<a id="73-modificación-de-propiedades"></a>
## 7.3 Modificación de Propiedades

Puedes modificar propiedades de un objeto de la siguiente manera:

```typescript
persona.edad = 31;
persona["profesion"] = "Ingeniero";
```

<a id="74-eliminación-de-propiedades"></a>
## 7.4 Eliminación de Propiedades

Puedes eliminar propiedades de un objeto usando el operador `delete`:

```typescript
delete persona.profesion;
```

> [!NOTE]
> Si declaras `profesion` como opcional (`profesion?: string`), el borrado es más natural para TypeScript. Si la propiedad es obligatoria, `delete persona.profesion` produce un error de tipo (la propiedad deja de existir pero su tipo no lo refleja. Al intentar usar ese dato saldrá `undefined`).

<a id="75-métodos-importantes"></a>
## 7.5 Métodos Importantes

JavaScript proporciona varios métodos incorporados que son útiles para trabajar con objetos. Aquí hay algunos de los más importantes (con su tipado en TypeScript):

<a id="751-objectkeys"></a>
### 7.5.1 Object.keys()

El método `Object.keys(obj)` devuelve un array con las claves (propiedades) de un objeto:

```typescript
interface Persona {
  nombre: string;
  edad: number;
  profesion: string;
}

const persona: Persona = {
  nombre: "Juan",
  edad: 30,
  profesion: "Desarrollador",
};

const claves = Object.keys(persona); // string[]. ACTÚA EN RUNTIME
console.log(claves); // ["nombre", "edad", "profesion"]

type ClavesPersona = keyof Persona; // "nombre" | "edad" | "profesion". ACTÚA EN COMPILACIÓN para crear "moldes"
```

> [!NOTE]
> **`Object.keys` (runtime) no es `keyof` (compile-time).** `Object.keys(obj)` es un método de JavaScript que devuelve un `string[]` **en tiempo de ejecución**: no sabe nada de tipos. Su alter-ego "de tipos" es el operador `keyof T`, que devuelve la **unión de las claves de un tipo** y solo existe en compilación.

> [!NOTE]
> **`keyof`** es lo que usan los **genéricos** y los **utility types** (`Partial<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<keyof T, …>`).  Los  **utility types** sirven para manejar tipos: transforma, manipula y reutiliza tipos.
El puente entre ambos: un genérico indexado con `keyof T` puede recorrer sus campos con `Object.keys` en runtime, y el compilador garantiza que cada `key` es una clave válida (ver `s03/10_Generics.md`).


1. Usa keyof cuando estés ESCRIBIENDO TIPOS (Para el compilador)
    - **Dónde se usan**: En firmas de funciones, genéricos, type o interface.
    - **Para qué sirve**: Es como un vigilante que revisa tu código antes de compilarlo para crear un molde estricto con los nombres exactos de las propiedades (por ejemplo: "nombre" | "edad" | "profesion"). Le dice a TypeScript: "el valor de esta variable solo puede ser una de las claves válidas de este tipo".
    - **Resultado**: Te da autocompletado inteligente y salta un error en el editor antes de que el código llegue a ejecutarse si te equivocas al escribir el nombre de una propiedad.

2. Usa Object.keys() cuando estés EJECUTANDO CÓDIGO (Runtime)
    - **Dónde se usan**: En la lógica de tu programa cuando este ya está en marcha y necesitas interactuar con datos reales.
    - **Para qué sirve**: Funciona como un inspector que va a tu objeto en tiempo de ejecución, lee su estructura en la memoria del navegador o de Node.js y extrae los nombres de las propiedades reales.
    -  **Resultado** : Te devuelve un Array real de JavaScript en formato de texto (string[]) para que puedas recorrerlo en un bucle, contar cuántas propiedades tiene el objeto, filtrarlas o pintarlas dinámicamente en la pantalla.

Resumen mental para recordarlo siempre:

- keyof es preventivo (Estático): Trabaja en tu editor con las reglas del juego. 
    - No genera código en el archivo final (.js). 
    - Sirve para que tú (o tus genéricos) no escribáis mal una propiedad.
    - Ejemplo: Imagina que estás creando una función genérica para consultar datos de un personaje de Star Wars y quieres que el compilador te asegure que solo pidas propiedades que realmente existen.

- Object.keys() es ejecutivo (Dinámico): Trabaja cuando la aplicación corre en el navegador. 
    - Analiza el objeto real que hay en la memoria RAM en ese preciso instante y te da un array con el que puedes iterar (.map, .forEach, etc.).
    - Ejemplo: Ahora imagina que haces una petición real a la SWAPI (fetch) y recibes un objeto JSON con los datos de un personaje en la memoria del navegador. Necesitas recorrerlo dinámicamente para pintar una lista en pantalla.



```typescript
interface Persona {
  nombre: string;
  edad: number;
  profesion: string;
}

const persona: Persona = {
  nombre: "Juan",
  edad: 30,
  profesion: "Desarrollador",
};

// ==========================================================
// MUNDO 1: keyof (COMPILACIÓN - El Arquitecto)
// ==========================================================
// Su trabajo: Crear reglas estrictas antes de compilar.
// Escribimos un Generic (Reusabilidad):
// T: objeto genérico ( podrá ser persona, coche...)
// K: es una clave del objeto, pero al poner `extends` solo puede ser una clave que exista en el objeto
// keyof T : saca todas las propiedades de T
// En resumen: 'K' está obligado a ser una de las claves válidas de T ("nombre" | "edad" | "profesion").
function obtenerValor<T, K extends keyof T>(obj: T, clave: K): T[K] {
  return obj[clave]; // TS sabe con absoluta seguridad que esto es válido
}

// Correcto: "edad" está en el tipo Persona
console.log(obtenerValor(persona, "edad")); 

// ERROR DE COMPILACIÓN: El editor se pone rojo antes de ejecutar.
// "altura" no existe en el tipo Persona.
console.log(obtenerValor(persona, "altura"));

//Probar a crear un interface Coche, un objeto c y a sacar 
//el valor de una de sus propiedades (existente) y otra inexistente


// ==========================================================
// MUNDO 2: Object.keys() (RUNTIME - El Inspector)
// ==========================================================
// Su trabajo: Ir a la memoria cuando el programa corre y sacar los datos reales.
function listarPropiedadesEnEjecucion(obj: object) {
  // Object.keys va a la RAM y devuelve un string[] genérico.
  const clavesReales = Object.keys(obj); 
  console.log("Propiedades encontradas en memoria:", clavesReales);
  // Resultado en consola: ["nombre", "edad", "profesion"]
  
  return clavesReales;
}

listarPropiedadesEnEjecucion(persona);
```

<a id="752-objectvalues"></a>
### 7.5.2 Object.values()

El método `Object.values(obj)` devuelve un array con los valores de un objeto:

```typescript
const valores = Object.values(persona); // Me devuelve (string | number)[]
console.log(valores); // ["Juan", 30, "Desarrollador"]
```

<a id="753-objectentries"></a>
### 7.5.3 Object.entries()

El método `Object.entries(obj)` devuelve un array de arrays con pares clave-valor:

```typescript
const entradas = Object.entries(persona); // [string, string | number][]
console.log(entradas);
// [["nombre", "Juan"], ["edad", 30], ["profesion", "Desarrollador"]]
// lo podemos recorrer con un for .. of instanciando [clave,valor]
```

<a id="754-objectassign"></a>
### 7.5.4 Object.assign()

El método `Object.assign(target, source)` copia las propiedades de uno o más objetos fuente en un objeto destino. Lo usamos cuando queremos "coger de aquí y de allá" para construir un nuevo objeto. Por ejemplo, tenemos un objeto "preferencias" (generales) y se crean las preferencias "personalizadas" de usuario. Se podría crear un nuevo objeto "preferenciasFusion".

```typescript
interface FuenteA {
  a: number;
}
interface FuenteB {
  b: number;
}

const fuente1: FuenteA = { a: 1 };
const fuente2: FuenteB = { b: 2 };

// TypeScript infiere automáticamente que 'destino' es { a: number; b: number }
const destino = Object.assign({}, fuente1, fuente2);

console.log(destino); // { a: 1, b: 2 }

//Si necesitamos escoger algunas propiedades ya hay que usar los Utility Types
```

<a id="755-objectfreeze"></a>
### 7.5.5 Object.freeze()

El método `Object.freeze(obj)` devuelve el mismo objeto pero marcado como **inmutable en runtime**: no se pueden añadir, modificar ni eliminar propiedades. Es el equivalente en runtime de `readonly` en TypeScript (que solo protege en compile-time).

```typescript
//Vamos a suponer que queremos que e la configuración de un juego NO se toque algo, 
// ni en compilación ni en ejecución

// 1. Definimos la interfaz con 'readonly' para que TypeScript nos proteja en el editor
interface Ajustes {
  readonly volumen: number;
  readonly dificultad: string;
}

// 2. Creamos el objeto y lo congelamos en la memoria RAM con Object.freeze()
const ajustes: Ajustes = Object.freeze({
  volumen: 80,
  dificultad: "normal"
});


// 1. PROTECCIÓN EN COMPILE-TIME (TypeScript):
// Si intentas hacer esto, el editor te pone la línea en rojo de inmediato:
ajustes.volumen = 100; // Error: Cannot assign to 'volumen' because it is a read-only property.

// 2. PROTECCIÓN EN RUNTIME (JavaScript):
// Si por cualquier motivo un script externo intentara modificarlo en la RAM:
// (ajustes as any).volumen = 100; 
// El motor de JavaScript bloquearía la acción y lanzaría un TypeError en ejecución.
console.log("Volumen actual:", ajustes.volumen); // 80
console.log("¿Está congelado en memoria?", Object.isFrozen(ajustes)); // true

//Prueba 1 :Probar a quitar el Object.freeze a ver qué ocurre

//Muy IMPORTANTE entender lo siguiente....
//Prueba 2: Ahora bien, qué ocurre si volvemos a congelar el objeto pero
//quitamos el readonly? Cambia el resultado? nos informa del error? peta??

//Prueba 3: Probar a crear un subobjeto en Ajustes y ver si lo congela o no (shalow)
```

> [!NOTE]
> `Object.freeze` es **shallow**: solo congela la primera capa. Si el objeto contiene otros objetos anidados, esos no se congelan. Para congelar en profundidad, usa un `freeze` recursivo que recorra los objetos y arrays anidados (por ejemplo con `Object.values`).


<a id="76-desestructuración-de-objetos"></a>
## 7.6 Desestructuración de Objetos.

En JavaScript ES6 y versiones posteriores, puedes extraer elementos de un objeto utilizando la desestructuración. La desestructuración te permite asignar valores de propiedades de un objeto a variables individuales de una manera más concisa. TypeScript asigna automáticamente los tipos de las variables extraídas.

<a id="ejemplo-1-extracción-básica-de-propiedades"></a>
### Ejemplo 1: Extracción básica de propiedades

Supongamos que tienes un objeto `persona` y deseas extraer sus propiedades en variables individuales:

```typescript
// Objeto persona
const persona = {
  nombre: "Juan",
  edad: 30,
  ciudad: "México",
};

// Desestructuración para extraer propiedades
const { nombre, edad, ciudad } = persona;

console.log(nombre); // Resultado: "Juan"  (tipo string)
console.log(edad); // Resultado: 30         (tipo number)
console.log(ciudad); // Resultado: "México" (tipo string)
```

<a id="ejemplo-2-propiedades-con-alias"></a>
### Ejemplo 2: Propiedades con alias

Puedes asignar un alias a las propiedades mientras las extraes del objeto:

```typescript
// Objeto libro
const libro = {
  titulo: "El despertar del leviatán",
  autor: "James S.A. Corey",
  año: 2011,
};

// Desestructuración con alias
const { titulo: nombreLibro, autor: nombreAutor, año: publicadoEn } = libro;

console.log(nombreLibro); // Resultado: "El despertar del leviatán"
console.log(nombreAutor); // Resultado: "James S.A. Corey"
console.log(publicadoEn); // Resultado: 2011
```

<a id="ejemplo-3-extracción-de-propiedades-anidadas"></a>
### Ejemplo 3: Extracción de propiedades anidadas

Si tienes propiedades anidadas en un objeto, también puedes extraerlas utilizando la desestructuración:

```typescript
// Objeto con propiedades anidadas
const producto = {
  nombre: "Portátil",
  marca: "Asus",
  detalles: {
    peso: "1.5 kg",
    precio: 950,
  },
};

// Desestructuración de propiedades anidadas (no es necesario sacarlas todas)
const {
  nombre,
  detalles: { peso, precio },
} = producto;

console.log(nombre); // Resultado: "Portátil"
console.log(peso); // Resultado: "1.5 kg"  (tipo string)
console.log(precio); // Resultado: 950      (tipo number)
```

<a id="77-arrayfrom-en-typescript"></a>
## 7.7 `Array.from()` en TypeScript

Un 'casi-un-array' (o **array-like object**)es un objeto común y corriente que no es un array real (no hereda de Array.prototype), pero que cumple con dos características clave: tiene .length y sus elementos se guardan en claves numéricas. Ej: argumentos en una función.

```typescript
function mostrarArgumentos(...argumentos: unknown[]) {
  console.log(arguments.length); // 3 (Tiene length)
  console.log(arguments[0]);     // "Hola" (Tiene índices numéricos)  
  // PERO NO ES UN ARRAY REAL:
  // arguments.push("nuevo"); // ¡Error! push no existe en un objeto casi-un-array
}


mostrarArgumentos("Hola", "mundo", 2026);
```

`Array.from()` crea un array a partir de una secuencia iterable (una cadena, un `Set`, un `Map`, o un objeto "similar a un array" con `length` e índices). Es la forma tipada de convertir "casi-un-array" en array de verdad. Permite incluso hacer "mapeos", aunque lo más sencillo es crear el Array y luego usar el mapeo normal con (.map)
```typescript
const caracteres: string[] = Array.from("JavaScript");               // ['J', 'a', ...]
const duplicados: number[] = Array.from([1, 2, 3], (n) => n * 2);    // [2, 4, 6]
const desdeSet: string[] = Array.from(new Set(["a", "b", "a"]));     // ['a', 'b']
```

> En React/Tauri te servirá para convertir resultados "iterables" en arrays antes de mapearlos con `.map()` al render.

No confundir con Object.entries() y Object.fromEntries():  
- Array.from(): Convierte un objeto iterable (como un Set o un Map o "casi-un-array") en un array en un Array real.
- Object.entries(): Desmonta un Objeto plano (Object) convirtiéndolo en un array de pares clave-valor ([clave, valor]).
- Object.fromEntries(): Hace lo inverso, transforma un array de pares clave-valor ([clave, valor]) o un Map en un Objeto plano (Object).

 
<a id="78-métodos-para-trabajar-con-json-en-typescript-jsonstringify-y-jsonparse"></a>
## 7.8 Métodos para trabajar con JSON en TypeScript `JSON.stringify()` y `JSON.parse()`.

En JavaScript, `JSON.stringify()` y `JSON.parse()` son dos métodos esenciales para trabajar con datos en formato JSON (JavaScript Object Notation). JSON es un formato de intercambio de datos ampliamente utilizado en aplicaciones web para enviar y recibir datos entre el cliente y el servidor.

<a id="781-jsonstringify"></a>
### 7.8.1 `JSON.stringify()`

`JSON.stringify()` es un método que convierte un objeto JavaScript en una cadena de texto en formato JSON. Esta cadena resultante puede ser utilizada para transmitir datos o para guardarlos en un archivo. Puede tomar tres argumentos: el objeto que se va a convertir, un argumento opcional llamado `replacer` (una función que personaliza la conversión), y otro argumento opcional llamado `space` (para dar formato legible al resultado).

**Sintaxis**

```typescript
JSON.stringify(objeto, replacer?, espacio?);
```

- `objeto`: El objeto que se va a convertir en una cadena JSON.
- `replacer` (opcional): Una función que permite personalizar la conversión. Puede ser un array o una función. No lo vamos a utilizar de momento. Ej: tengo un texto en mayúscula y lo cambio a minúscula.
- `espacio` (opcional): La cantidad de espacio (indentación) que se usará para formatear la cadena JSON resultante.

<a id="ejemplos-de-jsonstringify"></a>
### Ejemplos de `JSON.stringify()`

<a id="ejemplo-1-conversión-básica"></a>
#### Ejemplo 1: Conversión básica

```typescript
const usuario = {
  nombre: "JUAN",
  edad: 30,
  isAdmin: false,
};

const jsonString: string = JSON.stringify(usuario);

console.log(jsonString);
// Resultado: {"nombre":"JUAN","edad":30,"isAdmin":false}
```

En este ejemplo, el objeto `usuario` se convierte en una cadena JSON simple.

<a id="ejemplo-2-formateo-con-space"></a>
#### Ejemplo 2: Formateo con `space`

```typescript
const usuario = {
  nombre: "Ana",
  edad: 28,
  isAdmin: true,
};

const jsonString = JSON.stringify(usuario, null, 2);

console.log(jsonString);
// Resultado con formato:
// {
//   "nombre": "Ana",
//   "edad": 28,
//   "isAdmin": true
// }
```

En este caso, usamos el tercer argumento `space` para dar formato legible a la cadena JSON resultante.

<a id="782-jsonparse"></a>
### 7.8.2 `JSON.parse()`

`JSON.parse()` es un método que convierte una cadena de texto en formato JSON en un objeto JavaScript. Puede tomar dos argumentos: la cadena JSON que se va a analizar y un argumento opcional llamado `reviver` (una función que permite realizar transformaciones durante la conversión, como por ejemplo de formatos de fecha).

**Sintaxis**

```typescript
JSON.parse(cadenaJSON, reviver?);
```

- `cadenaJSON`: La cadena JSON que se va a analizar y convertir en un objeto JavaScript.
- `reviver` (opcional): Una función que permite personalizar la conversión durante el análisis. No lo vamos a usar de momento. Ej: pasar a mayúscula un campo string o formatear una fecha (hay gran variabilidad según base de datos destino).

<a id="ejemplos-de-jsonparse"></a>
### Ejemplos de `JSON.parse()`

<a id="ejemplo-3-conversión-básica"></a>
#### Ejemplo 3: Conversión básica

```typescript
const cadenaJSON = '{"nombre": "Maria", "edad": 35, "isAdmin": false}';

const usuario = JSON.parse(cadenaJSON) as { nombre: string; edad: number; isAdmin: boolean }; //Usamos aserción 
//por simplificar el ejemplo

console.log(usuario);
// Resultado: { nombre: 'Maria', edad: 35, isAdmin: false }
```

> [!IMPORTANT]
> `JSON.parse()` devuelve `any` (o `unknown` si el `tsconfig` usa `noImplicitAny` estricto), porque no puede saber qué contiene la cadena. Debes validar con **type guard** o `as` tras una comprobación. Nunca asumas el tipo sin verificar los datos (vienen de fuera: red, fichero, etc.).

En este ejemplo, la cadena JSON se convierte en un objeto JavaScript llamado `usuario`.

<a id="resumen"></a>
### Resumen

- `JSON.stringify()` se utiliza para convertir un objeto JavaScript en una cadena JSON.
- `JSON.parse()` se utiliza para convertir una cadena JSON en un objeto JavaScript.
- Ambos métodos son esenciales para trabajar con la serialización y deserialización de datos en aplicaciones web y comunicaciones cliente-servidor.
- `Replacer` y `Reviver` sirven para conversiones de datos. Son dos caras de la misma moneda y actúan en sentidos totalmente opuestos.
- Utiliza `JSON.stringify()` con `space` para dar formato legible a los datos JSON.
- **Limitación:** `JSON.stringify()` no maneja referencias circulares, `undefined`, `Symbol`, ni funciones. Lanza `TypeError` con objetos circulares.
- En TypeScript, modela los datos con `interface` y valida la entrada con *type guards* antes de usarlos.

<a id="79-tipos-de-objeto-en-typescript"></a>
## 7.9 Tipos de Objeto en TypeScript

Tipos útiles para trabajar con objetos y las dudas más frecuentes al migrar de JS:

```typescript
// interface con propiedades opcionales
interface UsuarioOpcional {
  nombre: string;
  edad?: number; // puede faltar
}

// propiedades de solo lectura
interface Config {
  readonly url: string;
  readonly puerto: number;
}

// tipo record: "diccionario" de clave string -> valor (detalle en §7.10)
// Lo usaremos cuando lleguemos a Tauri
type Diccionario = Record<string, string | number>;

// indexado (mismo efecto que Record, más explícito)
interface Indice {
  [clave: string]: string | number;
}

// unión basada en el discriminador (discriminated union)
type Estado = { tipo: "cargando" } | { tipo: "listo"; datos: string[] };
```

> [!IMPORTANT]
> Regla práctica del curso: en React y en el día a día, modela las entidades con `interface`; usa `type` para uniones, tuplas y alias de estructuras complejas. `Record<K, V>` es ideal para tablas de correspondencias o traducciones cuando la clave es `string`.
>
> **Declaration merging (fusión de declaraciones):** si defines dos o más interfaces con el mismo nombre en diferentes partes del código (o incluso en diferentes archivos), TypeScript las junta automáticamente en una sola interfaz combinada. Esto solo funciona con `interface`, no con `type` (para `type` se usa `&`). En React es útil para extender props o configuraciones desde múltiples módulos.

> 📖 **Los operadores de tipo `keyof`, `typeof` y `satisfies`** (que combinan con `Record<K, V>` en `Partial<Record<keyof T, string>>`, el patrón de errores de formulario en React) se explican en [`s03/10_Generics.md` §3](10_Generics.md#3-keyof-typeof-y-satisfies), junto a los genéricos que los hacen útiles.

<a id="710-record-k-v"></a>
## 7.10 `Record<K, V>`

`Record<K, V>` es un **utility type** de TypeScript que describe un objeto "diccionario": un conjunto de propiedades cuya **clave** es de tipo `K` y cuyo **valor** es de tipo `V`. Sirve cuando no sabes cuántas propiedades vas a tener ni cómo se van a llamar, pero sí sabes qué tipo de dato tendrá la llave y qué tipo de dato tendrá el valor. Nosotros lo hemos utilizado en los `type guards`.

Record y Map ambos son pareja clave-valor. La diferencia principal es que Map es un objeto completo (con sus funciones) y Record es un objeto genérico de JS.

```typescript
//Ej1
type Puntos = Record<string, number>;          // cualquier clave string : number
const p:Puntos={"Jugador":100}//Ojo, usa 
console.log(p.Jugador);

//Ej2
type Passwords = Record<"usuario" | "admin", string>; // solo esas dos claves -> string

//Da error por duplicidad
//const p1:Passwords = {admin:"YO", admin:"TU"}
const p2:Passwords = {admin:"YO1278!_", usuario:"TU37883??_"}

//Ej3
//Las claves son strings ("Luke", "Leia") y los valores son números (17)
const destinoRecord: Record<string, number> = {
  Luke: 17,
  Leia: 17
};
console.log(destinoRecord); // { Luke: 17, Leia: 17 }
console.log(destinoRecord.Luke); // 17

// Creamos el Map indicando que las claves son strings y los valores números
const destinoMap = new Map<string, number>();
// Añadimos los valores usando .set()
destinoMap.set("Luke", 17);
destinoMap.set("Leia", 17);

console.log(destinoMap); // Map(2) { 'Luke' => 17, 'Leia' => 17 }
console.log(destinoMap.get("Luke")); // 17
```

###
[!IMPORTANT]
> Regla práctica: usa `interface` para entidades, `Record<K, V>` para "diccionarios" tipados y `Map` cuando necesites la estructura en ejecución (cachés de búsqueda). Un `Record` es un objeto plano de JS; un `Map` es una colección propia.



---

[Volver al índice general](../../../README.md#5-distribución-temporal-y-contenidos-s00s13)
