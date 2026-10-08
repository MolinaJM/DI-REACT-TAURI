<a id="capítulo-07-estructuras-de-datos"></a>
# **Capítulo 07. Estructuras de Datos 📝** 🖥️

- [**Capítulo 07. Estructuras de Datos 📝** 🖥️](#capítulo-07-estructuras-de-datos)
- [8. Estructura de Datos Objeto en TypeScript (ES6)](#7-estructura-de-datos-objeto-en-typescript-es6)
  - [7.1 Formas de crear Objetos](#71-formas-de-crear-objetos)
    - [7.1.1 Sintaxis de Objeto Literal](#711-sintaxis-de-objeto-literal)
  - [7.2 Acceso a Propiedades](#72-acceso-a-propiedades)
  - [7.3 Modificación de Propiedades](#73-modificación-de-propiedades)
  - [7.4 Eliminación de Propiedades](#74-eliminación-de-propiedades)
  - [7.5 Métodos Importantes](#75-métodos-importantes)
    - [7.5.1 Object.keys()](#751-objectkeys)
    - [7.5.2 Object.values()](#752-objectvalues)
    - [7.5.3 Object.entries()](#753-objectentries)
    - [7.5.4 Object.assign()](#754-objectassign)
    - [7.5.5 Object.freeze()](#755-objectfreeze)
  - [7.6 Iteración en Objetos](#76-iteración-en-objetos)
  - [7.7 Desestructuración de Objetos.](#77-desestructuración-de-objetos)
    - [Ejemplo 1: Extracción básica de propiedades](#ejemplo-1-extracción-básica-de-propiedades)
    - [Ejemplo 2: Propiedades con alias](#ejemplo-2-propiedades-con-alias)
    - [Ejemplo 3: Extracción de propiedades anidadas](#ejemplo-3-extracción-de-propiedades-anidadas)
  - [7.8 `Array.from()` en TypeScript](#78-arrayfrom-en-typescript)
  - [7.9 Métodos para trabajar con JSON en TypeScript `JSON.stringify()` y `JSON.parse()`.](#79-métodos-para-trabajar-con-json-en-typescript-jsonstringify-y-jsonparse)
    - [7.9.1 `JSON.stringify()`](#791-jsonstringify)
    - [Ejemplos de `JSON.stringify()`](#ejemplos-de-jsonstringify)
      - [Ejemplo 1: Conversión básica](#ejemplo-1-conversión-básica)
      - [Ejemplo 2: Personalización con `replacer`](#ejemplo-2-personalización-con-replacer)
      - [Ejemplo 3: Formateo con `space`](#ejemplo-3-formateo-con-space)
    - [7.9.2 `JSON.parse()`](#792-jsonparse)
    - [Ejemplos de `JSON.parse()`](#ejemplos-de-jsonparse)
      - [Ejemplo 4: Conversión básica](#ejemplo-4-conversión-básica)
      - [Ejemplo 5: Personalización con `reviver`](#ejemplo-5-personalización-con-reviver)
    - [Resumen](#resumen)
  - [7.10 Clonado profundo moderno](#710-clonado-profundo-moderno)
    - [`structuredClone()` (ES2022+)](#structuredclone-es2022)
  - [7.11 Tipos de Objeto en TypeScript](#711-tipos-de-objeto-en-typescript)
  - [7.12 Spread, rest y optional chaining (puente a React)](#712-spread-rest-y-optional-chaining)
    - [7.12.1 Spread de objetos](#7121-spread-de-objetos--obj-)
    - [7.12.2 Rest en desestructuración](#7122-rest-en-desestructuración-resto)
    - [7.12.3 Desestructuración anidada con valores por defecto](#7123-desestructuración-anidada-con-valores-por-defecto)
    - [7.12.4 Optional chaining y nullish coalescing](#7124-optional-chaining--y-nullish-coalescing-)
- 🧪 **Ejercicios:** [Objetos en profundidad](../../../ejerciciosTS/ejerciciosTS.md#18-objetos-en-profundidad) · [Desestructuración/spread/optional chaining](../../../ejerciciosTS/ejerciciosTS.md#19-desestructuración-spreadrest-y-optional-chaining-puente-a-react)

---

<a id="7-estructura-de-datos-objeto-en-typescript-es6"></a>
# 7. Estructura de Datos Objeto en TypeScript (ES6)

Los objetos en JavaScript son una de las estructuras de datos más fundamentales y poderosas. Son colecciones de pares clave-valor y se utilizan para representar datos estructurados. En TypeScript, los objetos se describen con `interface` o `type`, lo que permite pasar de "cualquier forma" (JS dinámico) a formas conocidas de antemano que el compilador valida.

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
<a id="73-modificación-de-propiedades"></a>
### 7.3 Modificación de Propiedades

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
> Si declaras `profesion` como opcional (`profesion?: string`), el borrado es más natural para TypeScript. Si la propiedad es obligatoria, `delete persona.profesion` produce un error de tipo (la propiedad deja de existir pero su tipo no lo refleja).

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
```

> [!NOTE]
> **`Object.keys` (runtime) no es `keyof` (compile-time).** `Object.keys(obj)` es un método de JavaScript que devuelve un `string[]` **en tiempo de ejecución**: no sabe nada de tipos. Su par "de tipos" es el operador `keyof T`, que devuelve la **unión de las claves de un tipo** y solo existe en compilación:

```typescript
type ClavesPersona = keyof Persona; // "nombre" | "edad" | "profesion". ACTÚA EN COMPILACIÓN para crear "moldes"
```
> [!NOTE]
> `keyof` es lo que usan los **genéricos** y los **utility types** (`Partial<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<keyof T, …>`), no `Object.keys`. El puente entre ambos: un genérico indexado con `keyof T` puede recorrer sus campos con `Object.keys` en runtime, y el compilador garantiza que cada `key` es una clave válida (ver `s03/10_Generics.md`).


Usa keyof cuando estés ESCRIBIENDO TIPOS (Para el compilador).     
- Dónde se escribe: En firmas de funciones, genéricos, type o interface.
- Para qué sirve: Para decirle a TypeScript "el valor de esta variable solo puede ser una de las claves de este tipo". Piensa en Object.keys como un inspector que va a tu objeto cuando el programa ya se está ejecutando, saca una lista de etiquetas en formato texto (string[]) y se despreocupa de los tipos.  
- Resultado: Te da autocompletado y salta un error en el editor si te equivocas al escribir el nombre de la propiedad.

Usa Object.keys cuando estés EJECUTANDO CÓDIGO (Runtime)
- Lo usas cuando tu programa ya se está ejecutando y necesitas hacer algo con datos reales.     
- Para qué sirve: Para obtener un Array real de JavaScript en memoria con los nombres de las propiedades. keyof es como un vigilante que revisa tu código antes de guardarlo para crear un molde estricto con los nombres exactos de las propiedades ("nombre" | "edad" | "profesion"); si intentas usar una clave que no existe, lanza error en el editor antes de que el código llegue a ejecutarse.

- Resultado: Te devuelve un array de textos (string[]) para que puedas recorrerlo en un bucle, contar cuántas propiedades hay o pintarlas en la pantalla.

<a id="752-objectvalues"></a>
### 7.5.2 Object.values()

El método `Object.values(obj)` devuelve un array con los valores de un objeto:

```typescript
const valores = Object.values(persona); // (string | number)[]
console.log(valores); // ["Juan", 30, "Desarrollador"]
```

<a id="753-objectentries"></a>
### 7.5.3 Object.entries()

El método `Object.entries(obj)` devuelve un array de arrays con pares clave-valor:

```typescript
const entradas = Object.entries(persona); // [string, string | number][]
console.log(entradas);
// [["nombre", "Juan"], ["edad", 30], ["profesion", "Desarrollador"]]
```

<a id="754-objectassign"></a>
### 7.5.4 Object.assign()

El método `Object.assign(target, source)` copia las propiedades de uno o más objetos fuente en un objeto destino:

```typescript
interface FuenteA {
  a: number;
}
interface FuenteB {
  b: number;
}

const destino: { a: number; b: number } = Object.assign({}, { a: 1 }, { b: 2 });
console.log(destino); // { a: 1, b: 2 }
```

<a id="755-objectfreeze"></a>
### 7.5.5 Object.freeze()

El método `Object.freeze(obj)` devuelve el mismo objeto pero marcado como **inmutable en runtime**: no se pueden añadir, modificar ni eliminar propiedades. Es el equivalente en runtime de `readonly` en TypeScript (que solo protege en compile-time).

```typescript
interface Config {
  url: string;
  puerto: number;
}

const config = Object.freeze({ url: "https://api.ejemplo.com", puerto: 3000 });

// En runtime (strict mode): lanza TypeError al intentar modificar
config.puerto = 8080; // TypeError: Cannot assign to read only property 'puerto'

// En compile-time, TypeScript ya lo prohíbe si el tipo es readonly:
interface ConfigLectura {
  readonly url: string;
  readonly puerto: number;
}
const configLectura: ConfigLectura = Object.freeze({ url: "https://api.ejemplo.com", puerto: 3000 });
configLectura.puerto = 8080; // Error TS: solo lectura

// Comprobar si un objeto está congelado:
console.log(Object.isFrozen(config)); // true
```

> [!NOTE]
> `Object.freeze` es **shallow**: solo congela la primera capa. Si el objeto contiene otros objetos anidados, esos no se congelan. Para congelar en profundidad, combina con `structuredClone` + `freeze` recursivo (ver §7.10).

<a id="76-iteración-en-objetos"></a>
## 7.6 Iteración en Objetos

Puedes iterar sobre las propiedades de un objeto utilizando bucles `for...in`:

```typescript
for (const clave in persona) {
  if (Object.prototype.hasOwnProperty.call(persona, clave)) {
    console.log(`${clave}: ${persona[clave as keyof Persona]}`);
  }
}
```

> [!TIP]
> En TS, con `noUncheckedIndexedAccess` (activo en este proyecto), `persona[clave]` necesita el cast a `keyof Persona` para que el compilador sepa que `clave` es una propiedad real del objeto y no cualquier `string`.

<a id="77-desestructuración-de-objetos"></a>
## 7.7 Desestructuración de Objetos.

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

// Desestructuración de propiedades anidadas
const {
  nombre,
  detalles: { peso, precio },
} = producto;

console.log(nombre); // Resultado: "Portátil"
console.log(peso); // Resultado: "1.5 kg"  (tipo string)
console.log(precio); // Resultado: 950      (tipo number)
```

<a id="78-arrayfrom-en-typescript"></a>
## 7.8 `Array.from()` en TypeScript

`Array.from()` crea un array a partir de una secuencia iterable (una cadena, un `Set`, un `Map`, o un objeto "similar a un array" con `length` e índices). Es la forma tipada de convertir "casi-un-array" en array de verdad:

```typescript
Array.from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];

// con función de mapeo (equivale a .map() sobre la conversión):
Array.from<S, T>(iterable: Iterable<S> | ArrayLike<S>, mapFn: (v: S, k: number) => T): T[];
```

```typescript
const caracteres: string[] = Array.from("JavaScript");               // ['J', 'a', ...]
const duplicados: number[] = Array.from([1, 2, 3], (n) => n * 2);    // [2, 4, 6]
const desdeSet: string[] = Array.from(new Set(["a", "b", "a"]));     // ['a', 'b']
```

> En React/Tauri te servirá para convertir resultados "iterables" en arrays antes de mapearlos con `.map()` al render.

<a id="79-métodos-para-trabajar-con-json-en-typescript-jsonstringify-y-jsonparse"></a>
## 7.9 Métodos para trabajar con JSON en TypeScript `JSON.stringify()` y `JSON.parse()`.

En JavaScript, `JSON.stringify()` y `JSON.parse()` son dos métodos esenciales para trabajar con datos en formato JSON (JavaScript Object Notation). JSON es un formato de intercambio de datos ampliamente utilizado en aplicaciones web para enviar y recibir datos entre el cliente y el servidor.

<a id="791-jsonstringify"></a>
### 7.9.1 `JSON.stringify()`

`JSON.stringify()` es un método que convierte un objeto JavaScript en una cadena de texto en formato JSON. Esta cadena resultante puede ser utilizada para transmitir datos o para guardarlos en un archivo. Puede tomar tres argumentos: el objeto que se va a convertir, un argumento opcional llamado `replacer` (una función que personaliza la conversión), y otro argumento opcional llamado `space` (para dar formato legible al resultado).

**Sintaxis**

```typescript
JSON.stringify(objeto, replacer?, espacio?);
```

- `objeto`: El objeto que se va a convertir en una cadena JSON.
- `replacer` (opcional): Una función que permite personalizar la conversión. Puede ser un array o una función.
- `espacio` (opcional): La cantidad de espacio (indentación) que se usará para formatear la cadena JSON resultante.

<a id="ejemplos-de-jsonstringify"></a>
### Ejemplos de `JSON.stringify()`

<a id="ejemplo-1-conversión-básica"></a>
#### Ejemplo 1: Conversión básica

```typescript
const usuario = {
  nombre: "Juan",
  edad: 30,
  isAdmin: false,
};

const jsonString: string = JSON.stringify(usuario);

console.log(jsonString);
// Resultado: {"nombre":"Juan","edad":30,"isAdmin":false}
```

En este ejemplo, el objeto `usuario` se convierte en una cadena JSON simple.

<a id="ejemplo-2-personalización-con-replacer"></a>
#### Ejemplo 2: Personalización con `replacer`

```typescript
const habitacion = {
  numero: 23,
  toJSON(this: typeof habitacion) {
    return this.numero;
  },
};

const reunion = {
  titulo: "Conferencia",
  habitacion,
};

const jsonString = JSON.stringify(reunion, (clave, valor) => {
  return clave === "habitacion" ? valor.toJSON() : valor;
});

console.log(jsonString);
// Resultado: {"titulo":"Conferencia","habitacion":23}
```

Usamos un `replacer` para personalizar la conversión del objeto `reunion` y convertir la propiedad `habitacion` en su valor personalizado utilizando el método `toJSON()`.

<a id="ejemplo-3-formateo-con-space"></a>
#### Ejemplo 3: Formateo con `space`

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

<a id="792-jsonparse"></a>
### 7.9.2 `JSON.parse()`

`JSON.parse()` es un método que convierte una cadena de texto en formato JSON en un objeto JavaScript. Puede tomar dos argumentos: la cadena JSON que se va a analizar y un argumento opcional llamado `reviver` (una función que permite realizar transformaciones durante la conversión).

**Sintaxis**

```typescript
JSON.parse(cadenaJSON, reviver?);
```

- `cadenaJSON`: La cadena JSON que se va a analizar y convertir en un objeto JavaScript.
- `reviver` (opcional): Una función que permite personalizar la conversión durante el análisis.

<a id="ejemplos-de-jsonparse"></a>
### Ejemplos de `JSON.parse()`

<a id="ejemplo-4-conversión-básica"></a>
#### Ejemplo 4: Conversión básica

```typescript
const cadenaJSON = '{"nombre": "Maria", "edad": 35, "isAdmin": false}';

const usuario = JSON.parse(cadenaJSON) as { nombre: string; edad: number; isAdmin: boolean };

console.log(usuario);
// Resultado: { nombre: 'Maria', edad: 35, isAdmin: false }
```

> [!IMPORTANT]
> `JSON.parse()` devuelve `any` (o `unknown` si el `tsconfig` usa `noImplicitAny` estricto), porque no puede saber qué contiene la cadena. Debes validar con **type guard** o `as` tras una comprobación. Nunca asumas el tipo sin verificar los datos (vienen de fuera: red, fichero, etc.).

En este ejemplo, la cadena JSON se convierte en un objeto JavaScript llamado `usuario`.

<a id="ejemplo-5-personalización-con-reviver"></a>
#### Ejemplo 5: Personalización con `reviver`

```typescript
interface UsuarioFechas {
  fechaNacimiento: Date;
}

const cadenaJSON = '{"fechaNacimiento": "1990-05-15"}';

const usuario = JSON.parse(cadenaJSON, (clave, valor) => {
  if (clave === "fechaNacimiento") {
    return new Date(valor as string);
  }
  return valor;
}) as UsuarioFechas;

console.log(usuario.fechaNacimiento.getFullYear());
// Resultado: 1990
```

Usamos un `reviver` para convertir la cadena JSON en un objeto JavaScript y transformar la propiedad `fechaNacimiento` en un objeto `Date`.

<a id="resumen"></a>
### Resumen

- `JSON.stringify()` se utiliza para convertir un objeto JavaScript en una cadena JSON.
- `JSON.parse()` se utiliza para convertir una cadena JSON en un objeto JavaScript.
- Ambos métodos son esenciales para trabajar con la serialización y deserialización de datos en aplicaciones web y comunicaciones cliente-servidor.
- `replacer` en `JSON.stringify()` permite personalizar la conversión.
- Utiliza `JSON.stringify()` con `space` para dar formato legible a los datos JSON.
- **Limitación:** `JSON.stringify()` no maneja referencias circulares, `undefined`, `Symbol`, ni funciones. Lanza `TypeError` con objetos circulares.
- En TypeScript, modela los datos con `interface` y valida la entrada con *type guards* antes de usarlos.

<a id="710-clonado-profundo-moderno"></a>
## 7.10 Clonado profundo moderno

<a id="structuredclone-es2022"></a>
### `structuredClone()` (ES2022+)

`structuredClone()` realiza un clonado profundo nativo, sin necesidad de `JSON.parse(JSON.stringify())` ni librerías externas. Soporta tipos complejos que JSON no maneja:

```typescript
const original = {
  nombre: "Profe",
  fecha: new Date(),
  datos: new Map<string, string>([["clave", "valor"]]),
  numeros: new Set<number>([1, 2, 3]),
};

const copia = structuredClone(original);

console.log(copia.fecha instanceof Date);  // true (JSON perdería el tipo)
console.log(copia.nombre);                 // "Profe"
console.log(original.datos === copia.datos); // false (clonado real)
```

> `structuredClone()` maneja: objetos, arrays, `Date`, `Map`, `Set`, `RegExp`, `ArrayBuffer`, `Blob`, etc. No clona funciones ni símbolos. En TS infiere el tipo exacto del clon.

<a id="711-tipos-de-objeto-en-typescript"></a>
## 7.11 Tipos de Objeto en TypeScript

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

// tipo record: "diccionario" de clave string -> valor
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


<a id="712-spread-rest-y-optional-chaining"></a>
## 7.12 Spread, rest y optional chaining (puente a React)

Tres recursos que usarás en **cada** componente de React: destructuring de `props` en la firma, `const [valor, setValor] = useState(...)`, `setState({ ...prev, ... })` y `?.`/`??` para navegar datos anidados.

### 7.12.1 Spread de objetos (`{ ...obj }`)

Copia las propiedades de un objeto en uno nuevo **sin mutar el original**. Es el patrón de `setState({ ...prev, ...parcial })`:

```typescript
interface Config {
  url: string;
  puerto: number;
  debug: boolean;
}

const CONFIG_DEFECTO: Config = { url: "http://localhost", puerto: 3000, debug: false };

// Mezclar una configuración parcial con los valores por defecto (sin mutar)
function mergeConfig(parcial: Partial<Config>): Config {
  return { ...CONFIG_DEFECTO, ...parcial }; // parcial gana si tiene el campo
}

const config = mergeConfig({ puerto: 8080 });
console.log(config); // { url: "http://localhost", puerto: 8080, debug: false }
console.log(CONFIG_DEFECTO.puerto); // 3000 (no mutado)
```

### 7.12.2 Rest en desestructuración (`...resto`)

Separa una o varias propiedades y agrupa el resto en un nuevo objeto. Es el patrón de `<Componente {...resto} />`:

```typescript
interface Pelicula {
  id: number;
  titulo: string;
  genero: string;
}

function separarId(pelicula: Pelicula): { id: number; resto: Omit<Pelicula, "id"> } {
  const { id, ...resto } = pelicula; // id fuera, el resto agrupa lo demás
  return { id, resto }; // resto: { titulo, genero } — tipo Omit<Pelicula, "id">
}

const p = separarId({ id: 1, titulo: "Dune", genero: "ciencia ficción" });
console.log(p.id);    // 1
console.log(p.resto); // { titulo: "Dune", genero: "ciencia ficción" }
```

### 7.12.3 Desestructuración anidada con valores por defecto

Extraer campos de objetos anidados con defaults en una sola línea (patrón de props con defaults):

```typescript
interface RespuestaPlaneta {
  ok: boolean;
  datos?: { planeta?: { name?: string; climate?: string; films?: string[] } };
}

function resumenPlaneta(resp: RespuestaPlaneta): string {
  const { name = "desconocido", climate = "desconocido", films = ["sin films"] } = resp.datos?.planeta ?? {};
  return `${name} (${climate}) — ${films[0]}`;
}

console.log(resumenPlaneta({ ok: true, datos: { planeta: { name: "Tatooine", climate: "árido" } } }));
// "Tatooine (árido) — sin films" (films no viene → default)
```

### 7.12.4 Optional chaining (`?.`) y nullish coalescing (`??`)

Navegar datos anidados que pueden no existir, con un valor por defecto seguro:

```typescript
interface Carrito {
  cliente?: { envio?: { direccion?: string } };
}

function direccionEnvio(carrito: Carrito): string {
  return carrito.cliente?.envio?.direccion ?? "Sin dirección"; // ?? solo si es null/undefined (no "" ni 0)
}

console.log(direccionEnvio({ cliente: {} }));          // "Sin dirección" (envio no existe)
console.log(direccionEnvio({ cliente: { envio: {} } })); // "Sin dirección" (direccion no existe)
console.log(direccionEnvio({ cliente: { envio: { direccion: "Calle Mayor" } } })); // "Calle Mayor"
```

> [!TIP] **`?.` vs `??`:** `?.` evita el error al acceder a una propiedad de `null`/`undefined`; `??` sustituye solo si el valor es `null` o `undefined` (a diferencia de `||`, que también sustituye valores falsy como `""`, `0`, `false`). En React los usarás juntos para navegar respuestas de API o store sin que se rompa el render.

> [!NOTE] **Spread de arrays:** `{ ...arr }` y `[...arr]` también clonan arrays sin mutar (`anadirPuntuacion(arr, n)` → `[...arr, n]`). Se vio en [`s03/06_Arrays.md §6.8`](06_Arrays.md#68-clonar-un-array). Aquí lo usamos sobre objetos porque es el patrón dominante en React (`setState`).

<a id="713-ejemplo-completo-interfaces-types"></a>

---

[Volver al índice general](../../../README.md#5-distribución-temporal-y-contenidos-s00s13)
