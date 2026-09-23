# **Capítulo 06. Contenido 📝** 🖥️

- [6. Ámbito (Scope) en TypeScript](#6-ámbito-scope-en-typescript)
  - [6.1. Ámbito (Scope)](#61-ámbito-scope)
    - [6.1.1 Ámbito Global](#611-ámbito-global)
    - [6.1.2 Ámbito de Función](#612-ámbito-de-función)
    - [6.1.3 Ámbito de Bloque](#613-ámbito-de-bloque)
    - [6.1.4 Ámbito de Cierre (Closures)](#614-ámbito-de-cierre-closures)
  - [6.2. Ejemplos Prácticos](#62-ejemplos-prácticos)
    - [Ejemplo 1: Closure contador (ámbito léxico en acción)](#ejemplo-1-closure-contador-ámbito-léxico-en-acción)    - 
- 🧪 **Ejercicios:** [Ámbito (Scope) y closures](../../EjerciciosPropuestos/ejerciciosTS.md#14-ambito-scope)

---

# 6. Ámbito (Scope) en TypeScript

En JavaScript, el ámbito (scope) se refiere a las reglas que determinan dónde pueden ser accedidas las variables y funciones dentro de un programa. Comprender el ámbito y el uso de `this` es fundamental para escribir código JavaScript efectivo.
// ⚠️ ESTE CONCEPTO SE DESARROLLARÁ MÁS ADELANTE:
// - `this` → no se cubre en este bloque (se verá en sesiones avanzadas)
Este manual explora los conceptos de ámbito y `this` en ECMAScript 6 y versiones posteriores, y muestra cómo TypeScript los tipa y protege.

## 6.1. Ámbito (Scope)

El ámbito en JavaScript determina dónde una variable o función es accesible en un programa. ECMAScript 6 introduce nuevos tipos de ámbito, como el ámbito de bloque.

### 6.1.1 Ámbito Global

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


### 6.1.2 Ámbito de Función

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

### 6.1.3 Ámbito de Bloque

ECMAScript 6 introduce el ámbito de bloque, que se aplica a variables declaradas con `let` y `const`. Estas variables solo son accesibles dentro del bloque en el que se declaran.

Ejemplo:

```typescript
if (true) {
  let blockVar: string = "Soy local de bloque";
  console.log(blockVar); // Acceso a blockVar dentro del bloque
}

// console.log(blockVar); // Error: blockVar no está definida fuera del bloque
```

### 6.1.4 Ámbito de Cierre (Closures)

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
> Hay que tener en cuenta que el tipo devuelto por la función ha de ser igual tipo de dato recept

## 6.2. Ejemplos Prácticos

#### Ejemplo 1: Closure contador 

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


> ✏️ **Práctica:** [`s02/08-scope-closures.ts`](../../../ejercicios/s02/08-scope-closures.ts) (closures = la lógica interna de los hooks) · [catálogo S2·15](../../../sesiones/EjerciciosPropuestos/ejerciciosTS.md).

> 🏁 **Reto final de S2:** con todo lo de la sesión, completa [`s02/12-reto-s02.ts`](../../../ejercicios/s02/12-reto-s02.ts) (solución: [`soluciones/s02/12-reto-s02.ts`](../../../ejercicios/soluciones/s02/12-reto-s02.ts)) · [catálogo](../../../sesiones/EjerciciosPropuestos/ejerciciosTS.md#reto-final-s2).

---

[Volver al índice general](../../../README.md#5-distribución-temporal-y-contenidos-s00s13)