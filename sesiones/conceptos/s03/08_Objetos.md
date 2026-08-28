# **Capítulo 08. Estructuras de Datos 📝** 🖥️

- [**Capítulo 08. Estructuras de Datos 📝** 🖥️](#capítulo-08-estructuras-de-datos)
- [8. Estructura de Datos Objeto en TypeScript (ES6)](#8-estructura-de-datos-objeto-en-typescript-es6)
  - [8.1 Formas de crear Objetos](#81-formas-de-crear-objetos)
    - [8.1.1 Sintaxis de Objeto Literal](#811-sintaxis-de-objeto-literal)
    - [8.1.2 Constructor de Objeto o función constructora.](#812-constructor-de-objeto-o-función-constructora)
    - [8.1.3 Usando Clases.](#813-usando-clases)
    - [8.1.4 Object.create()](#814-objectcreate)
    - [8.1.5 Patrón Singleton](#815-patrón-singleton)
      - [Ejemplo 1: Singleton básico](#ejemplo-1-singleton-básico)
  - [8.2 Acceso a Propiedades](#82-acceso-a-propiedades)
  - [8.3 Modificación de Propiedades](#83-modificación-de-propiedades)
  - [8.4 Eliminación de Propiedades](#84-eliminación-de-propiedades)
  - [8.5 Métodos Importantes](#85-métodos-importantes)
    - [8.5.1 Object.keys()](#851-objectkeys)
    - [8.5.2 Object.values()](#852-objectvalues)
    - [8.5.3 Object.entries()](#853-objectentries)
    - [8.5.4 Object.assign()](#854-objectassign)
    - [8.5.5 Object.freeze()](#855-objectfreeze)
  - [8.6 Iteración en Objetos](#86-iteración-en-objetos)
  - [8.7 Desestructuración de Objetos.](#87-desestructuración-de-objetos)
    - [Ejemplo 1: Extracción básica de propiedades](#ejemplo-1-extracción-básica-de-propiedades)
    - [Ejemplo 2: Propiedades con alias](#ejemplo-2-propiedades-con-alias)
    - [Ejemplo 3: Extracción de propiedades anidadas](#ejemplo-3-extracción-de-propiedades-anidadas)
  - [8.8 `Array.from()` en TypeScript](#88-arrayfrom-en-typescript)
    - [8.8.1 Sintaxis](#881-sintaxis)
      - [Ejemplo 1:](#ejemplo-1)
      - [Ejemplo 2:](#ejemplo-2)
      - [Ejemplo 3:](#ejemplo-3)
      - [Ejemplo 4:](#ejemplo-4)
      - [Ejemplo 5:](#ejemplo-5)
  - [8.9 Métodos para trabajar con JSON en TypeScript `JSON.stringify()` y `JSON.parse()`.](#89-métodos-para-trabajar-con-json-en-typescript-jsonstringify-y-jsonparse)
    - [8.9.1 `JSON.stringify()`](#891-jsonstringify)
    - [Ejemplos de `JSON.stringify()`](#ejemplos-de-jsonstringify)
      - [Ejemplo 1: Conversión básica](#ejemplo-1-conversión-básica)
      - [Ejemplo 2: Personalización con `replacer`](#ejemplo-2-personalización-con-replacer)
      - [Ejemplo 3: Formateo con `space`](#ejemplo-3-formateo-con-space)
    - [8.9.2 `JSON.parse()`](#892-jsonparse)
    - [Ejemplos de `JSON.parse()`](#ejemplos-de-jsonparse)
      - [Ejemplo 4: Conversión básica](#ejemplo-4-conversión-básica)
      - [Ejemplo 5: Personalización con `reviver`](#ejemplo-5-personalización-con-reviver)
    - [Resumen](#resumen)
  - [8.10 Clonado profundo moderno y `Object.groupBy()`](#810-clonado-profundo-moderno-y-objectgroupby)
    - [`structuredClone()` (ES2022+)](#structuredclone-es2022)
    - [`Object.groupBy()` (ES2024)](#objectgroupby-es2024)
  - [8.11 Tipos de Objeto en TypeScript](#811-tipos-de-objeto-en-typescript)

---

# 8. Estructura de Datos Objeto en TypeScript (ES6)

Los objetos en JavaScript son una de las estructuras de datos más fundamentales y poderosas. Son colecciones de pares clave-valor y se utilizan para representar datos estructurados. En TypeScript, los objetos se describen con `interface` o `type`, lo que permite pasar de "cualquier forma" (JS dinámico) a formas conocidas de antemano que el compilador valida.

## 8.1 Formas de crear Objetos

Hay varias formas de crear objetos en JavaScript ES6 (ahora con anotaciones de TypeScript):

### 8.1.1 Sintaxis de Objeto Literal

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

> [!TIP]
> Incluso sin anotación, TypeScript **infiere** la forma del objeto literal y la valida: `persona.edad = "30"` daría error aunque no se haya escrito `: Persona`.

### 8.1.2 Constructor de Objeto o función constructora.

También puedes crear objetos utilizando un constructor de objeto. Consiste en crear una función a la que se le pasen como parámetros las propiedades del objeto y dentro de esa función usamos el objeto this. Para crear una instancia simplemente usamos new pasando los parámetros que queramos.

```typescript
interface PersonaConstructora {
  nombre: string;
  cp: number;
  profesion: string;
}

function Persona(this: PersonaConstructora, nombre: string, cp: number, profesion: string) {
  this.nombre = nombre;
  this.cp = cp;
  this.profesion = profesion;
}

const juan = new (Persona as new (nombre: string, cp: number, profesion: string) => PersonaConstructora)(
  "Profe",
  18000,
  "Desarrollador",
);
```

> [!NOTE]
> Las funciones constructoras son la forma "antigua" de crear objetos. TypeScript las soporta, pero como verás en el apartado siguiente, en este curso preferimos las clases, que el compilador entiende de forma natural y con mejor soporte de tipos.

### 8.1.3 Usando Clases.

Se puede realizar la creación usando el azucar sintáctico que nos provee Javascript a partir de ECMAScript6 con la sintaxis de clases. Sería una copia de la anterior adaptada a clases. Cambiamos un constructor de objeto por un constructor de clase.

> [!IMPORTANT]
> En este curso (regla *erasable-only*, ver `CONTRIBUTING.md`), **no usamos parámetros de constructor** (`constructor(private nombre: string)`). Declaramos los campos explícitamente con `nombre: string;` y los asignamos en el constructor. Así el código es 100% compatible con la ejecución directa de Node 24 y no depende de la *emit* de TypeScript.

```typescript
class PersonaClase {
  nombre: string;
  cp: number;
  profesion: string;

  constructor(nombre: string, cp: number, profesion: string) {
    this.nombre = nombre;
    this.cp = cp;
    this.profesion = profesion;
  }
}

const newPersona = new PersonaClase("Profe", 18000, "Developer");
```

### 8.1.4 Object.create()

Otra forma de crear objetos es utilizando `Object.create()`:

```typescript
interface PersonaSinProto {
  nombre: string;
  cp: number;
  profesion: string;
}

const persona = Object.create(null) as PersonaSinProto;
persona.nombre = "Profe";
persona.cp = 18000;
persona.profesion = "Desarrollador";
```

> `Object.create(null)` crea un objeto **sin prototipo**, es decir, sin heredar de `Object.prototype`. Esto significa que no dispondrá de métodos como `toString()`, `hasOwnProperty()` o `valueOf()`. Se usa cuando necesitas un "diccionario puro" sin propiedades heredadas que interfieran. En TypeScript debes "decirle" su forma con `as`, porque un objeto sin prototipo no viene tipado.

### 8.1.5 Patrón Singleton

Tomando los conceptos de las funciones autoinvocables de los clousures de Javascript (que veremos más adelante), podemos crear este patrón de programación `Singleton` en el cual el objeto sólo se instancia una única vez y así te aseguras que no se creen nuevas instancias.

```typescript
interface UsuarioSingleton {
  name: string;
  cp: number;
  profesion: string;
}

const usuario1 = new (function PersonaSingleton(this: UsuarioSingleton) {
  this.name = "Profe";
  this.cp = 18000;
  this.profesion = "FullStack";
})();

// otra forma de hacerlo más despacio sería:

class PersonaSingletonClase {
  static instancia: PersonaSingletonClase | undefined;

  nom: string;
  cp: number;
  profesion: string;

  constructor(nombre: string, cp: number, profesion: string) {
    if (typeof PersonaSingletonClase.instancia === "object") {
      return PersonaSingletonClase.instancia;
    }
    this.nom = nombre;
    this.cp = cp;
    this.profesion = profesion;
    PersonaSingletonClase.instancia = this;
  }
}

const profe = new PersonaSingletonClase("Profe", 18000, "developer");
// si intento crear otra persona, me devolvería la primera persona creada
```

> _Nota:_
>
> > _El patrón Singleton es un patrón de diseño de software que se utiliza para garantizar que una clase tenga una sola instancia y proporcionar un punto de acceso global a esa instancia en todo el programa. En JavaScript, donde no hay soporte nativo para clases singleton, puedes implementar este patrón para asegurarte de que una clase tenga una única instancia en tu aplicación._
> >
> > ### ¿Por qué se utiliza el patrón Singleton?
> >
> > El patrón Singleton se utiliza por varias razones:
> >
> > 1. **Control de acceso**: Garantiza que solo haya una instancia de una clase y proporciona un punto único de acceso a esa instancia, lo que puede ser útil en situaciones donde se necesita un único punto de control, como una configuración global o un registro de eventos.
> > 2. **Conservación de recursos**: Si una instancia de una clase es costosa en términos de recursos (como una conexión a una base de datos), el patrón Singleton ayuda a conservar esos recursos al evitar la creación de múltiples instancias innecesarias.
> > 3. **Mantenimiento y gestión**: Facilita la gestión y el mantenimiento de una instancia única, lo que puede simplificar la aplicación y reducir la complejidad.

#### Ejemplo 1: Singleton básico

```typescript
class Singleton {
  static instancia: Singleton | undefined;

  constructor() {
    if (!Singleton.instancia) {
      Singleton.instancia = this;
    }
    return Singleton.instancia;
  }

  // Métodos de la instancia
  showMessage(): void {
    console.log("¡Hola desde la instancia Singleton!");
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();

console.log(instance1 === instance2); // true, ambas variables apuntan a la misma instancia

instance1.showMessage(); // ¡Hola desde la instancia Singleton!
```

> [!NOTE]
> `Singleton.instancia` es `Singleton | undefined`. Al declararla con ese tipo, TypeScript valida el patrón: no puedes anexarla mal porque en el constructor `return Singleton.instancia` no sería un `Singleton` válido si quedase sin inicializar.

## 8.2 Acceso a Propiedades

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

> [!IMPORTANT]
> Con la notación de corchetes, TypeScript comprueba que la clave sea del tipo correcto. `persona["edad" as keyof Persona]` no es necesario aquí (literal válido), pero si usaras variables, tendrías que tiparlas como `keyof Persona` para evitar errores.

## 8.3 Modificación de Propiedades

Puedes modificar propiedades de un objeto de la siguiente manera:

```typescript
persona.edad = 31;
persona["profesion"] = "Ingeniero";
```

## 8.4 Eliminación de Propiedades

Puedes eliminar propiedades de un objeto usando el operador `delete`:

```typescript
delete persona.profesion;
```

> [!NOTE]
> Si declaras `profesion` como opcional (`profesion?: string`), el borrado es más natural para TypeScript. Si la propiedad es obligatoria, `delete persona.profesion` produce un error de tipo (la propiedad deja de existir pero su tipo no lo refleja).

## 8.5 Métodos Importantes

JavaScript proporciona varios métodos incorporados que son útiles para trabajar con objetos. Aquí hay algunos de los más importantes (con su tipado en TypeScript):

### 8.5.1 Object.keys()

El método `Object.keys(obj)` devuelve un array con las claves (propiedades) de un objeto:

```typescript
const persona: Persona = {
  nombre: "Juan",
  edad: 30,
  profesion: "Desarrollador",
};

const claves = Object.keys(persona); // string[]
console.log(claves); // ["nombre", "edad", "profesion"]
```

> [!TIP]
> `Object.keys()` devuelve `string[]`, no `(keyof Persona)[]`. Si necesitas iterar con las claves tipadas, declara tú el tipo: `const claves = Object.keys(persona) as Array<keyof Persona>;`.

### 8.5.2 Object.values()

El método `Object.values(obj)` devuelve un array con los valores de un objeto:

```typescript
const valores = Object.values(persona); // (string | number)[]
console.log(valores); // ["Juan", 30, "Desarrollador"]
```

### 8.5.3 Object.entries()

El método `Object.entries(obj)` devuelve un array de arrays con pares clave-valor:

```typescript
const entradas = Object.entries(persona); // [string, string | number][]
console.log(entradas);
// [["nombre", "Juan"], ["edad", 30], ["profesion", "Desarrollador"]]
```

> [!NOTE]
> Cada par es una tupla `[clave, valor]` con la clave como `string`. Si desestructuras al iterar, ya obtienes tipos: `for (const [clave, valor] of entradas)`, donde `clave: string` y `valor: string | number`.

### 8.5.4 Object.assign()

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

### 8.5.5 Object.freeze()

El método `Object.freeze(obj)` evita que se puedan agregar, modificar o eliminar propiedades de un objeto:

```typescript
const objetoCongelado = Object.freeze(persona);
// objetoCongelado.nombre = "Carlos"; // Error TS: solo lectura
```

> [!IMPORTANT]
> `Object.freeze()` devuelve el tipo `Readonly<Persona>`. Por eso, además de fallar en tiempo de ejecución (en modo estricto lanza error), TypeScript te avisa **en tiempo de compilación** antes de ejecutar nada.

## 8.6 Iteración en Objetos

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

## 8.7 Desestructuración de Objetos.

En JavaScript ES6 y versiones posteriores, puedes extraer elementos de un objeto utilizando la desestructuración. La desestructuración te permite asignar valores de propiedades de un objeto a variables individuales de una manera más concisa. TypeScript asigna automáticamente los tipos de las variables extraídas.

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

### Ejemplo 2: Propiedades con alias

Puedes asignar un alias a las propiedades mientras las extraes del objeto:

```typescript
// Objeto libro
const libro = {
  titulo: "La sombra del viento",
  autor: "Carlos Ruiz Zafón",
  año: 2001,
};

// Desestructuración con alias
const { titulo: nombreLibro, autor: nombreAutor, año: publicadoEn } = libro;

console.log(nombreLibro); // Resultado: "La sombra del viento"
console.log(nombreAutor); // Resultado: "Carlos Ruiz Zafón"
console.log(publicadoEn); // Resultado: 2001
```

> [!NOTE]
> `publicadoEn` hereda el tipo del literal `año` (aquí `number`; si estuviera anotado `const libro: { año: 2001 }` sería el literal `2001`).

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

## 8.8 `Array.from()` en TypeScript

`Array.from()` es un método incorporado en JavaScript que se utiliza para crear un nuevo objeto de matriz (array) a partir de una `secuencia iterable`, como un objeto iterable, un objeto similar a un array (con una propiedad `length` y elementos indexados), o una cadena de texto. Este método es útil para convertir otras estructuras de datos en matrices o realizar operaciones en datos iterables.

### 8.8.1 Sintaxis

La sintaxis básica de `Array.from()` es la siguiente:

```typescript
Array.from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];

// con función de mapeo:
Array.from<S, T>(iterable: Iterable<S> | ArrayLike<S>, mapFn: (v: S, k: number) => T): T[];
```

- `iterable`: El objeto iterable del cual se creará la nueva matriz.
- `mapFn` (opcional): Una función de mapeo que se ejecuta para cada elemento del iterable antes de agregarlo a la nueva matriz.
- `thisArg` (opcional): Un valor que se utiliza como `this` al ejecutar la función `mapFn`.

#### Ejemplo 1:

Crear una matriz a partir de una cadena de texto

```typescript
const texto = "JavaScript";
const caracteres: string[] = Array.from(texto);

console.log(caracteres); // ['J', 'a', 'v', 'a', 'S', 'c', 'r', 'i', 'p', 't']
```

`Array.from()` se utiliza para convertir una cadena de texto en una matriz de caracteres.

#### Ejemplo 2:

Crear una matriz con elementos duplicados a partir de un objeto iterable

```typescript
const iterable: number[] = [1, 2, 3];
const matrizDuplicada = Array.from(iterable, (elemento) => elemento * 2); // number[]

console.log(matrizDuplicada); // [2, 4, 6]
```

Aquí, `Array.from()` se usa para crear una nueva matriz duplicando cada elemento del objeto iterable original.

#### Ejemplo 3:

Crear una matriz a partir de un objeto similar a un array

```typescript
const objetoSimilarArray: ArrayLike<string> = {
  length: 3,
  0: "a",
  1: "b",
  2: "c",
};

const matrizDesdeObjeto: string[] = Array.from(objetoSimilarArray);

console.log(matrizDesdeObjeto); // ['a', 'b', 'c']
```

En este caso, `Array.from()` se utiliza para convertir un objeto similar a un array en una matriz real. Ojo: `ArrayLike` (y no `string[]`) es el tipo correcto para algo con `length` e índices numéricos.

#### Ejemplo 4:

Crear una matriz con elementos filtrados a partir de un objeto iterable

```typescript
const iterable: number[] = [1, 2, 3, 4, 5];
const matrizFiltrada = Array.from(iterable, (elemento) =>
  elemento % 2 === 0 ? elemento : null,
).filter((x): x is number => x !== null);

console.log(matrizFiltrada); // [2, 4]
```

> [!TIP]
> En el original JS se usa `.filter(Boolean)`, que deja el tipo como `(number | null)[]`. Con un *type guard* (`x is number`) le indicamos a TypeScript que tras el `filter` solo quedan números.

`Array.from()` se usa para crear una nueva matriz filtrando solo los elementos pares del objeto iterable original.

#### Ejemplo 5:

Crear una matriz de objetos a partir de un objeto iterable

```typescript
interface Fruta {
  nombre: string;
}

const iterable: string[] = ["Manzana", "Banana", "Cereza"];
const matrizDeObjetos: Fruta[] = Array.from(iterable, (fruta) => ({ nombre: fruta }));

console.log(matrizDeObjetos);
// [
//   { nombre: 'Manzana' },
//   { nombre: 'Banana' },
//   { nombre: 'Cereza' }
// ]
```

Aquí `Array.from()` se utiliza para crear una matriz de objetos con cada elemento del iterable como valor de la propiedad `nombre`.

## 8.9 Métodos para trabajar con JSON en TypeScript `JSON.stringify()` y `JSON.parse()`.

En JavaScript, `JSON.stringify()` y `JSON.parse()` son dos métodos esenciales para trabajar con datos en formato JSON (JavaScript Object Notation). JSON es un formato de intercambio de datos ampliamente utilizado en aplicaciones web para enviar y recibir datos entre el cliente y el servidor.

### 8.9.1 `JSON.stringify()`

`JSON.stringify()` es un método que convierte un objeto JavaScript en una cadena de texto en formato JSON. Esta cadena resultante puede ser utilizada para transmitir datos o para guardarlos en un archivo. Puede tomar tres argumentos: el objeto que se va a convertir, un argumento opcional llamado `replacer` (una función que personaliza la conversión), y otro argumento opcional llamado `space` (para dar formato legible al resultado).

**Sintaxis**

```typescript
JSON.stringify(objeto, replacer?, espacio?);
```

- `objeto`: El objeto que se va a convertir en una cadena JSON.
- `replacer` (opcional): Una función que permite personalizar la conversión. Puede ser un array o una función.
- `espacio` (opcional): La cantidad de espacio (indentación) que se usará para formatear la cadena JSON resultante.

### Ejemplos de `JSON.stringify()`

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

### 8.9.2 `JSON.parse()`

`JSON.parse()` es un método que convierte una cadena de texto en formato JSON en un objeto JavaScript. Puede tomar dos argumentos: la cadena JSON que se va a analizar y un argumento opcional llamado `reviver` (una función que permite realizar transformaciones durante la conversión).

**Sintaxis**

```typescript
JSON.parse(cadenaJSON, reviver?);
```

- `cadenaJSON`: La cadena JSON que se va a analizar y convertir en un objeto JavaScript.
- `reviver` (opcional): Una función que permite personalizar la conversión durante el análisis.

### Ejemplos de `JSON.parse()`

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

### Resumen

- `JSON.stringify()` se utiliza para convertir un objeto JavaScript en una cadena JSON.
- `JSON.parse()` se utiliza para convertir una cadena JSON en un objeto JavaScript.
- Ambos métodos son esenciales para trabajar con la serialización y deserialización de datos en aplicaciones web y comunicaciones cliente-servidor.
- `replacer` en `JSON.stringify()` permite personalizar la conversión.
- Utiliza `JSON.stringify()` con `space` para dar formato legible a los datos JSON.
- **Limitación:** `JSON.stringify()` no maneja referencias circulares, `undefined`, `Symbol`, ni funciones. Lanza `TypeError` con objetos circulares.
- En TypeScript, modela los datos con `interface` y valida la entrada con *type guards* antes de usarlos.

## 8.10 Clonado profundo moderno y `Object.groupBy()`

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

### `Object.groupBy()` (ES2024)

Agrupa elementos de un array en un objeto según una función de clasificación:

```typescript
interface Producto {
  nombre: string;
  categoria: string;
}

const productos: Producto[] = [
  { nombre: "Laptop", categoria: "electrónica" },
  { nombre: "Ratón", categoria: "electrónica" },
  { nombre: "Mesa", categoria: "muebles" },
];

const agrupado = Object.groupBy(productos, (p) => p.categoria);
// {
//   electrónica: [{ nombre: "Laptop", ... }, { nombre: "Ratón", ... }],
//   muebles: [{ nombre: "Mesa", ... }]
// }
```

> Usa `Map.groupBy()` si necesitas claves que no sean strings o mantener orden de inserción.

## 8.11 Tipos de Objeto en TypeScript

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

### 📦 En el repositorio (`repos/01-typescript-fundamentos/src/REPO-05-interfaces-types.ts`)

```typescript
export {};

/**
 * Fichero 05: Interfaces y Type Aliases
 * -------------------------------------------
 * Ejemplos extraidos de Sesion 2 (conceptos 11 y 12):
 * - Interfaces (basica, opcionales, readonly, index, extends, merging)
 * - Type Aliases (primitivos, objetos, funciones, tuplas, genericos)
 * - Comparacion Interface vs Type
 */

// ============================================================================
// INTERFACES
// ============================================================================

// Interface basica
interface Usuario {
    id: number;
    nombre: string;
    email: string;
}

// Propiedades opcionales (?)
interface Configuracion {
    url: string;
    puerto?: number;
}

// Propiedades de solo lectura (readonly)
interface Punto {
    readonly x: number;
    readonly y: number;
}

// Index signature
interface Diccionario {
    [clave: string]: string;
}

// Interface con metodos
interface Reproducible {
    titulo: string;
    reproducir(): void;
    obtenerInfo(): string;
}

// Extension de interfaces (extends)
interface Animal { nombre: string; }
interface Perro extends Animal {
    raza: string;
    ladrar(): void;
}

// Herencia multiple
interface Volador { volar(): void; }
interface Nadador { nadar(): void; }
interface Pato extends Volador, Nadador {
    nombre: string;
}

// Declaration merging
interface Documento { titulo: string; }
interface Documento { contenido: string; }
// Se fusionan: { titulo: string; contenido: string; }

// ============================================================================
// TYPE ALIASES
// ============================================================================

// Type para primitivos
type ID = string | number;
type Email = string;

// Type para objetos
type Punto2D = { x: number; y: number };

// Type para funciones
type Callback = (error: Error | null, resultado?: string) => void;

// Type para tuplas
type Par = [string, number];

// Type con genericos
type RespuestaAPI<T> = {
    datos: T;
    status: number;
    mensaje: string;
};

// ============================================================================
// COMPARACION: Interface vs Type
// ============================================================================
// Interface: extends, declaration merging, mejor rendimiento
// Type: uniones, primitivos, tuplas, mapped types
//
// | Caracteristica       | Interface | Type |
// |---------------------|-----------|------|
// | Extension           | extends   | &    |
// | Declaration merging | Si        | No   |
// | Uniones / Primitivos| No        | Si   |
// | Tuplas / Mapped     | No        | Si   |

// Ejemplo de uso
const punto: Punto = { x: 10, y: 20 };
console.log(punto.x, punto.y);

const config: Configuracion = { url: "http://localhost" };
console.log(config.url, config.puerto);

type UsuarioResp = RespuestaAPI<{ id: number; nombre: string }>;
const resp: UsuarioResp = {
    datos: { id: 1, nombre: "Ana" },
    status: 200,
    mensaje: "OK"
};
console.log(resp);
```

---

[Volver al índice general](../../index.md)