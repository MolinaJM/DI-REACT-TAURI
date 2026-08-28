# **Capítulo 06. Contenido 📝** 🖥️

- [7. Ámbito (Scope) y Uso de `this` en TypeScript](#7-ámbito-scope-y-uso-de-this-en-typescript)
  - [7.1. Ámbito (Scope)](#71-ámbito-scope)
    - [7.1.1 Ámbito Global](#711-ámbito-global)
    - [7.1.2 Ámbito de Función](#712-ámbito-de-función)
    - [7.1.3 Ámbito de Bloque](#713-ámbito-de-bloque)
    - [7.1.4 Ámbito de Cierre (Closures)](#714-ámbito-de-cierre-closures)
  - [7.2. Uso de `this`](#72-uso-de-this)
    - [7.2.1 Objeto Global](#721-objeto-global)
    - [7.2.2 Métodos y `this`](#722-métodos-y-this)
    - [7.2.3 Funciones Flecha y `this`](#723-funciones-flecha-y-this)
    - [7.2.4 `strict mode` y `this`](#724-strict-mode-y-this)
  - [7.3. `this` en TypeScript: cómo se tipa](#73-this-en-typescript-cómo-se-tipa)
    - [7.3.1 `this` en métodos de clase](#731-this-en-métodos-de-clase)
    - [7.3.2 Parámetro `this` explícito en funciones](#732-parámetro-this-explícito-en-funciones)
  - [7.4. Ejemplos Prácticos](#74-ejemplos-prácticos)
    - [Ejemplo 1: Closure contador (ámbito léxico en acción)](#ejemplo-1-closure-contador-ámbito-léxico-en-acción)
    - [Ejemplo 2: `this` en event listeners](#ejemplo-2-this-en-event-listeners)
    - [Ejemplo 3: TDZ (Temporal Dead Zone)](#ejemplo-3-tdz-temporal-dead-zone)
    - [Ejemplo 4: `this` perdido y cómo solucionarlo](#ejemplo-4-this-perdido-y-cómo-solucionarlo)

---

# 7. Ámbito (Scope) y Uso de `this` en TypeScript

En JavaScript, el ámbito (scope) se refiere a las reglas que determinan dónde pueden ser accedidas las variables y funciones dentro de un programa. Comprender el ámbito y el uso de `this` es fundamental para escribir código JavaScript efectivo. Este manual explora los conceptos de ámbito y `this` en ECMAScript 6 y versiones posteriores, y muestra cómo TypeScript los tipa y protege.

## 7.1. Ámbito (Scope)

El ámbito en JavaScript determina dónde una variable o función es accesible en un programa. ECMAScript 6 introduce nuevos tipos de ámbito, como el ámbito de bloque.

### 7.1.1 Ámbito Global

Las variables declaradas fuera de cualquier función tienen un ámbito global y pueden ser accedidas desde cualquier lugar del código.

Ejemplo:

```typescript
let globalVar: string = "Soy global";

function exampleFunction(): void {
  console.log(globalVar); // Acceso a globalVar desde la función
}

exampleFunction(); // Imprime "Soy global"
console.log(globalVar); // También se puede acceder aquí
```

> [!WARNING]
> En módulos ES, un archivo con `import`/`export` ya NO crea variables globales: cada módulo tiene su propio ámbito. Las variables "globales" de verdad quedarían en `globalThis`. Para evitar sorpresas, este curso recomienda no depender del ámbito global: cada archivo exporta lo que otros necesiten.

### 7.1.2 Ámbito de Función

Las variables declaradas dentro de una función tienen un ámbito local y solo pueden ser accedidas desde dentro de esa función.

Ejemplo:

```typescript
function exampleFunction(): void {
  let localVar: string = "Soy local";
  console.log(localVar); // Acceso a localVar dentro de la función
}

exampleFunction(); // Imprime "Soy local"
// console.log(localVar); // Error: localVar no está definida fuera de la función
```

### 7.1.3 Ámbito de Bloque

ECMAScript 6 introduce el ámbito de bloque, que se aplica a variables declaradas con `let` y `const`. Estas variables solo son accesibles dentro del bloque en el que se declaran.

Ejemplo:

```typescript
if (true) {
  let blockVar: string = "Soy local de bloque";
  console.log(blockVar); // Acceso a blockVar dentro del bloque
}

// console.log(blockVar); // Error: blockVar no está definida fuera del bloque
```

### 7.1.4 Ámbito de Cierre (Closures)

Los closures ocurren cuando una función se declara dentro de otra función y tiene acceso a las variables de su función contenedora, incluso después de que la función contenedora haya terminado de ejecutarse.

Ejemplo:

```typescript
function outerFunction(): () => void {
  let outerVar: string = "Externa";

  function innerFunction(): void {
    console.log(outerVar); // Acceso a outerVar dentro del closure
  }

  return innerFunction;
}

const closureExample: () => void = outerFunction();
closureExample(); // Imprime "Externa"
```

> [!NOTE]
> TypeScript infiere el tipo del closure: `outerFunction` devuelve una función `() => void`. Si el closure devuelve un valor, el tipo de retorno se deduce igualmente.

## 7.2. Uso de `this`

La palabra clave `this` se utiliza en JavaScript para referirse al contexto en el que se está ejecutando el código. Su valor puede cambiar según el contexto de ejecución.

### 7.2.1 Objeto Global

Cuando `this` se usa en el ámbito global o fuera de cualquier función, hace referencia al objeto global, que en un navegador es `window`.

Ejemplo:

```typescript
console.log(this === window); // En un navegador, esto es verdadero
```

> [!NOTE]
> En un módulo ES, `this` a nivel de módulo NO es `window`: es `undefined`. Por eso en TypeScript y con `type="module"` apenas se usa `this` global.

### 7.2.2 Métodos y `this`

Dentro de un método de un objeto, `this` hace referencia al objeto en sí.

Ejemplo:

```typescript
interface ObjetoConProp {
  prop: string;
  greet: () => void;
}

const myObject: ObjetoConProp = {
  prop: "Hola",
  greet: function (this: ObjetoConProp): void {
    console.log(this.prop); // Acceso a la propiedad prop del objeto
  },
};

myObject.greet(); // Imprime "Hola"
```

> [!TIP]
> El parámetro `this: ObjetoConProp` (el primer "parámetro" falso de la firma) es una característica exclusiva de TypeScript: declara qué tipo debe tener `this` dentro de la función, sin emitir nada en runtime.

### 7.2.3 Funciones Flecha y `this`

Las funciones flecha (`=>`) **no tienen su propio `this`**. Heredan el `this` del ámbito léxico donde fueron definidas, lo que las hace ideales para callbacks dentro de métodos:

```typescript
interface Usuario {
  nombre: string;
  asignaturas: string[];
  mostrarTradicional: () => void;
  mostrarFlecha: () => void;
}

const usuario: Usuario = {
  nombre: "Profe",
  asignaturas: ["DWEC", "DIW"],

  // Método con función tradicional
  mostrarTradicional() {
    // this = usuario (el objeto que llama al método)
    this.asignaturas.forEach(function (asig) {
      console.log(this?.nombre, asig); // ⚠️ this.nombre = undefined
      // Dentro de function(), this es el objeto global (o undefined en strict mode)
    });
  },

  // Método con arrow function
  mostrarFlecha() {
    this.asignaturas.forEach((asig) => {
      console.log(this.nombre, asig); // ✅ this.nombre = "Profe"
      // Arrow hereda el this del método mostrarFlecha (que es usuario)
    });
  },
};

usuario.mostrarFlecha();
// Imprime: Profe DWEC, Profe DIW
```

> **Regla práctica:** usa arrow functions para callbacks y métodos dentro de métodos. Usa funciones tradicionales (`function` o método abreviado) cuando necesites que `this` dependa de quién llame a la función.
> En TypeScript, dentro de un callback tradicional, `this` se tipa como el contexto que le corresponda; en la práctica, si `noImplicitThis` está activo (dentro de `strict`), el compilador avisa cuando `this` es ambiguo.

### 7.2.4 `strict mode` y `this`

En **modo estricto** (`"use strict"`), `this` en una función tradicional no apunta al objeto global (`window`), sino que es `undefined`:

```typescript
"use strict";

function mostrarThis(this: undefined | Record<string, string>): void {
  console.log(this); // undefined (no window)
}

// En un método de objeto, this sigue siendo el objeto
const obj = {
  nombre: "Hola",
  mostrarThis(): void {
    console.log(this); // { nombre: "Hola" }
  },
};
obj.mostrarThis(); // ✅ correcto
```

> Los módulos ES (`type="module"`) y las clases siempre ejecutan en modo estricto automáticamente. TypeScript compila todo el código a modo estricto si el `tsconfig` lo pide (lo hace), y además el compilador marca `this` implícitos problemáticos.

## 7.3. `this` en TypeScript: cómo se tipa

### 7.3.1 `this` en métodos de clase

En las clases TypeScript, `this` está tipado: el compilador conoce el tipo de la clase dentro de cada método. Veremos el detalle en el capítulo de POO; aquí un anticipo:

```typescript
class Contador {
  private valor: number;

  constructor(valor: number) {
    this.valor = valor;
  }

  incrementar(): number {
    this.valor++; // this es Contador, valor es privado
    return this.valor;
  }
}
```

### 7.3.2 Parámetro `this` explícito en funciones

TypeScript permite declarar el tipo de `this` en funciones y métodos. Es útil para escribir callbacks seguros:

```typescript
interface Boton {
  texto: string;
  activo: boolean;
}

function activar(this: Boton): void {
  this.activo = true;
}
```

## 7.4. Ejemplos Prácticos

#### Ejemplo 1: Closure contador (ámbito léxico en acción)

```typescript
interface Contador {
  incrementar: () => number;
  decrementar: () => number;
  valor: () => number;
}

function crearContador(inicial: number = 0): Contador {
  let contador: number = inicial; // Variable privada dentro del closure

  return {
    incrementar: () => ++contador,
    decrementar: () => --contador,
    valor: () => contador,
  };
}

const c: Contador = crearContador(10);
console.log(c.incrementar()); // 11
console.log(c.incrementar()); // 12
console.log(c.decrementar()); // 11
console.log(c.valor());       // 11
```

#### Ejemplo 2: `this` en event listeners

```typescript
// En un navegador, los tipos DOM vienen de lib.dom.d.ts:
// document.querySelector<HTMLButtonElement>("button")?.addEventListener(...)
const boton = { texto: "Púlsame" };

// ❌ función tradicional: this será el elemento DOM, no 'boton'
document.querySelector("button")?.addEventListener("click", function (this: HTMLButtonElement) {
  console.log(this.textContent); // el elemento <button>, no 'boton'
});

// ✅ arrow function: this es 'boton' (capturado del ámbito léxico)
document.querySelector("button")?.addEventListener("click", () => {
  console.log(boton.texto); // "Púlsame"
});
```

#### Ejemplo 3: TDZ (Temporal Dead Zone)

```typescript
// var se eleva e inicializa con undefined → accesible
console.log(a); // undefined
var a: number = 5;

// let/const se elevan pero NO se inicializan → ReferenceError
try {
  console.log(b); // ReferenceError: Cannot access 'b' before initialization
} catch (e) {
  console.log("Error capturado:", (e as Error).message);
}
let b: number = 10;
console.log(b); // 10 (ahora sí)
```

> [!NOTE]
> El `catch (e)` tipa `e` como `unknown` en TypeScript. Para leer el mensaje hay que estrecharlo: `(e as Error).message` (aserción) o mejor con `instanceof Error` (narrowing), como veremos en el capítulo de asincronía.

#### Ejemplo 4: `this` perdido y cómo solucionarlo

```typescript
interface Usuario2 {
  nombre: string;
  saludar: () => void;
}

const usuario: Usuario2 = {
  nombre: "Profe",
  saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  },
};

// ❌ Al pasar el método como callback, this se pierde
setTimeout(usuario.saludar, 1000); // "Hola, soy undefined"

// ✅ Solución 1: arrow wrapper
setTimeout(() => usuario.saludar(), 1000); // "Hola, soy Profe"

// ✅ Solución 2: bind()
setTimeout(usuario.saludar.bind(usuario), 1000); // "Hola, soy Profe"
```

> [!IMPORTANT]
> Cuando una función espera un callback `() => void` y le pasamos un método que usa `this`, TypeScript puede no quejarse (el método encaja en la firma) aunque en runtime falle. La regla de oro: **si pasas un método como callback, envuélvelo en una arrow** (`() => obj.metodo()`) o usa `bind`. Esto evita el `this` perdido.

---

[Volver al índice general](../../index.md)