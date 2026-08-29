# **Capítulo 03. Contenido 📝** 🖥️

- [3. Operadores Lógicos y de Comparación en TypeScript.](#3-operadores-l%C3%B3gicos-y-de-comparaci%C3%B3n-en-typescript)
  - [3.1. Operadores de Comparación](#31-operadores-de-comparaci%C3%B3n)
    - [i. Igualdad (`==`) y Desigualdad (`!=`)](#i-igualdad-y-desigualdad)
    - [ii. Igualdad Estricta (`===`) y Desigualdad Estricta (`!==`)](#ii-igualdad-estricta-y-desigualdad-estricta)
    - [iii. Mayor que (`>`) y Menor que (`<`)](#iii-mayor-que-y-menor-que)
    - [iv. Mayor o Igual que (`>=`) y Menor o Igual que (`<=`)](#iv-mayor-o-igual-que-y-menor-o-igual-que)
  - [3.2. Operadores Lógicos](#32-operadores-l%C3%B3gicos)
    - [i. AND Lógico (`&&`)](#i-and-l%C3%B3gico)
    - [ii. OR Lógico (`||`)](#ii-or-l%C3%B3gico)
    - [iii. NOT Lógico (`!`)](#iii-not-l%C3%B3gico)
    - [iv. Ejemplo Completo](#iv-ejemplo-completo)
  - [3.3. Operador Ternario (`?`)](#33-operador-ternario)
    - [Ejemplo:](#ejemplo-de-operador-ternario)
  - [3.4. Operador Nullish Coalescing (`??`)](#34-operador-nullish-coalescing)
    - [Ejemplo:](#ejemplo-de-nullish-coalescing)
  - [3.5. Combinación de Operadores (`?`) y (`??`)](#35-combinaci%C3%B3n-de-operadores-y)
    - [Ejemplo:](#ejemplo-combinado-de-y)
  - [3.6. Operadores de Asignación Lógica (ES2021)](#36-operadores-de-asignaci%C3%B3n-l%C3%B3gica-es2021)
  - [3.7. Tipos resultantes: cómo los ve TypeScript](#37-tipos-resultantes-cómo-los-ve-typescript)

---

# 3. Operadores Lógicos y de Comparación en TypeScript.

Los operadores lógicos y de comparación son fundamentales en JavaScript para realizar evaluaciones y tomar decisiones lógicas en tus programas. ES6 y versiones posteriores han ampliado las capacidades con nuevos operadores. A continuación, se presentan los operadores más comunes, adaptados a TypeScript y con un apartado final sobre los tipos que devuelve/n recibe cada operador.

## 3.1. Operadores de Comparación

Los operadores de comparación se utilizan para comparar valores y devuelven un valor booleano (verdadero o falso) según el resultado de la comparación. En TypeScript, `===`, `>`, `<`, `>=`, `<=` exigen que los operandos sean comparables y devuelven `boolean`.

### i. Igualdad (`==`) y Desigualdad (`!=`)

- `==` compara si dos valores son iguales.
- `!=` compara si dos valores no son iguales.

```typescript
const numero1: number = 5;
const numero2: number = 10;

console.log(numero1 == numero2); // false
console.log(numero1 != numero2); // true
```

> [!WARNING]
> `==` y `!=` aplican **coerción de tipos** automática (`"5" == 5` es `true`). TypeScript y los linters desaconsejan su uso: en un proyecto con `strict` es mucho más seguro usar siempre `===` y `!==`.

### ii. Igualdad Estricta (`===`) y Desigualdad Estricta (`!==`)

- `===` compara si dos valores son iguales y tienen el mismo tipo de datos.
- `!==` compara si dos valores no son iguales o tienen tipos de datos diferentes.

```typescript
const texto1: string = "5";
const numero3: number = 5;

console.log(texto1 === numero3); // false (tipos diferentes)
console.log(texto1 !== numero3); // true
```

> [!NOTE]
> `texto1 === numero3` con tipos `string` y `number`: TypeScript avisa con un error de tipos porque comparar `string` con `number` casi nunca es intencionado. Es una ayuda que no existe en JavaScript puro, donde la comparación simplemente devuelve `false`.

### iii. Mayor que (`>`) y Menor que (`<`)

- `>` compara si un valor es mayor que otro.
- `<` compara si un valor es menor que otro.

```typescript
const edad1: number = 25;
const edad2: number = 30;

console.log(edad1 > edad2); // false
console.log(edad1 < edad2); // true
```

### iv. Mayor o Igual que (`>=`) y Menor o Igual que (`<=`)

- `>=` compara si un valor es mayor o igual que otro.
- `<=` compara si un valor es menor o igual que otro.

```typescript
const cantidad1: number = 50;
const cantidad2: number = 50;

console.log(cantidad1 >= cantidad2); // true
console.log(cantidad1 <= cantidad2); // true
```

## 3.2. Operadores Lógicos

Los operadores lógicos se utilizan para realizar operaciones lógicas en valores booleanos.

### i. AND Lógico (`&&`)

El operador `&&` devuelve `true` si ambos operandos son `true`.

```typescript
const esMayorDeEdad: boolean = true;
const tieneLicencia: boolean = true;

console.log(esMayorDeEdad && tieneLicencia); // true
```

**Cortocircuito (short-circuit):** `&&` evalúa de izquierda a derecha. Si el primer operando es *falsy*, devuelve ese valor inmediatamente sin evaluar el segundo:

```typescript
console.log(false && cualquierCosa); // false (no evalúa cualquierCosa)
console.log(0 && "no llega");        // 0
console.log("Hola" && 42);           // 42 (ambos truthy, devuelve el último)
```

> [!TIP]
> En TypeScript, el tipo de `A && B` cuando `A` puede ser falsy es `false | typeof A | typeof B`... el compilador lo refleja con unión. Por eso, si `nombre` es `string | null`, `nombre && nombre.length > 0` devuelve `boolean | null`; lo normal es usar esa expresión en una condición y dejar que el *narrowing* trabaje.

### ii. OR Lógico (`||`)

El operador `||` devuelve `true` si al menos uno de los operandos es `true`.

```typescript
const esEstudiante: boolean = false;
const trabaja: boolean = true;

console.log(esEstudiante || trabaja); // true
```

**Cortocircuito:** `||` devuelve el primer operando *truthy* sin evaluar el resto:

```typescript
console.log("Hola" || "no llega"); // "Hola" (primer truthy)
console.log(0 || 42);              // 42
console.log(null || "defecto");    // "defecto" (patrón clásico de valor por defecto)
```

> [!WARNING]
> El patrón `valor || "defecto"` tiene una trampa: si `valor` es `""` o `0` (falsy pero no nulos), se reemplaza igualmente. En TypeScript moderno se prefiere `??` cuando solo queremos reemplazar `null`/`undefined`.

### iii. NOT Lógico (`!`)

El operador `!` invierte el valor booleano de su operando.

```typescript
const esDiaLaboral: boolean = true;

console.log(!esDiaLaboral); // false
```

> [!NOTE]
> No confundir este operador con la **aserción de no-nulo** de TypeScript (`valor!`), que en runtime no hace nada y solo le dice al compilador "esto no es null/undefined". Se usa con moderación (ver capítulo de DOM).

### iv. Ejemplo Completo

A continuación, un ejemplo completo que combina operadores de comparación y operadores lógicos:

```typescript
// Datos de entrada
const edad: number = 20; // La edad de la persona
const esEstudiante: boolean = false; // Si la persona es estudiante o no

// Condiciones
if (edad >= 18 && !esEstudiante) {
  console.log("¡Eres elegible para solicitar la tarjeta de descuento!");
} else if (edad < 18) {
  console.log(
    "Lo siento, debes ser mayor de 18 años para solicitar la tarjeta."
  );
} else {
  console.log(
    "Lo siento, los estudiantes no son elegibles para la tarjeta de descuento."
  );
}
```

Gracias a las anotaciones `number` y `boolean`, TypeScript valida que todas las comparaciones son correctas y permite *narrowing* en cada rama.

## 3.3. Operador Ternario (`?`)

El operador ternario, representado por `condición ? expresión1 : expresión2`, es una forma concisa de realizar una evaluación condicional en JavaScript. Si la condición es verdadera, se ejecuta `expresión1`; de lo contrario, se ejecuta `expresión2`. Es útil para asignar valores basados en una condición.

### Ejemplo de operador ternario

```typescript
const edad: number = 18;
const esMayor: string = edad >= 18 ? "Sí" : "No";
console.log(`¿Es mayor de edad? ${esMayor}`); // Imprime "¿Es mayor de edad? Sí"
```

TypeScript infiere que el resultado del ternario es la **unión** de ambos tipos: `string`. Si las ramas devuelven tipos distintos, se deduce la unión.

## 3.4. Operador Nullish Coalescing (`??`)

El operador nullish coalescing (`??`) se utiliza para proporcionar un valor predeterminado en caso de que una expresión sea `null` o `undefined`. Es útil para manejar valores nulos o indefinidos de manera segura. En TypeScript es muy habitual junto a valores de tipo `T | null | undefined`.

### Ejemplo de nullish coalescing

```typescript
const valor: string | null = null;
const valorPredeterminado: string = valor ?? "Valor predeterminado";
console.log(valorPredeterminado); // Imprime "Valor predeterminado"
```

Observa cómo el tipo se elimina: `valor` era `string | null`, y `valor ?? "defecto"` es `string`. TypeScript usa el `??` para *narrowing* de nulos.

## 3.5. Combinación de Operadores (`?`) y (`??`)

Puedes combinar el operador ternario y el operador de nullish coalescing para crear lógica condicional más compleja.

### Ejemplo combinado de `?` y `??`

```typescript
const nombre: string | null = null;
const mensaje: string = nombre ? `Hola, ${nombre}` : "Hola, usuario";
console.log(mensaje); // Imprime "Hola, usuario"

const edad: number | undefined = undefined;
const mensajeEdad: string = edad ?? "Edad no especificada";
console.log(mensajeEdad); // Imprime "Edad no especificada"
```

> En este ejemplo, `nombre` se evalúa como falso (es `null`), por lo que se utiliza el valor predeterminado "Hola, usuario". En el segundo caso, `edad` se evalúa como `undefined`, por lo que se utiliza "Edad no especificada" como valor predeterminado. En TypeScript, ambas asignaciones quedan como `string` tras el *narrowing* del operador.

> Estos operadores son herramientas poderosas para realizar evaluaciones condicionales y manejar valores nulos o indefinidos de manera efectiva en JavaScript (y con seguridad de tipos en TypeScript).

## 3.6. Operadores de Asignación Lógica (ES2021)

Combinan los operadores lógicos con la asignación para escribir código más conciso:

| Operador | Equivalente a | Descripción |
|:--------:|:------------:|-------------|
| `x \|\|= y` | `x \|\| (x = y)` | Asigna `y` solo si `x` es *falsy* |
| `x &&= y` | `x && (x = y)` | Asigna `y` solo si `x` es *truthy* |
| `x ??= y` | `x ?? (x = y)` | Asigna `y` solo si `x` es `null` o `undefined` |

```typescript
// ||= — valor por defecto si la variable es falsy
let nombre: string = "";
nombre ||= "Anónimo";
console.log(nombre); // "Anónimo" ("" es falsy)

// &&= — ejecutar solo si la condición se cumple
interface Usuario {
  nombre: string;
}
let usuario: Usuario | string = { nombre: "Profe" };
usuario &&= usuario.nombre;
console.log(usuario); // "Profe"

// ??= — inicializar solo si es null o undefined (respeta "" y 0)
interface Config {
  volumen: number;
}
let config: Config = { volumen: 0 };
config.volumen ??= 50;
console.log(config.volumen); // 0 (no se reemplaza porque 0 no es null/undefined)

let nombre2: string | null = null;
nombre2 ??= "Profe";
console.log(nombre2); // "Profe"
```

## 3.7. Tipos resultantes: cómo los ve TypeScript

| Operador | Operandos típicos | Tipo que devuelve TypeScript |
|:--------:|:-----------------:|:----------------------------:|
| `===`, `!==`, `>`, `<`, `>=`, `<=` | `number`, `string`... | `boolean` |
| `&&` | `boolean` | `boolean` |
| `&&` con valores no booleanos | `A \| Falsy`, `B` | `false \| typeof A \| typeof B` (unión) |
| `\|\|` | `boolean` | `boolean` |
| `\|\|` / `\|\|=` con valores no booleanos | `A`, `Falsy \| B` | `typeof A \| typeof B` (unión) |
| `??` | `T \| null \| undefined`, `T` | `T` (elimina `null`/`undefined`) |
| `!` | `boolean` | `boolean` |
| Ternario | `cond`, `A`, `B` | `typeof A \| typeof B` |

> [!IMPORTANT]
> La mejor forma de "ver" estos tipos es pasar el ratón por encima del nombre de la variable en tu editor (VS Code usa `tsc` internamente) o usar `let x: typeof expresion`. Los operadores en TypeScript no solo evalúan valores: también **refinan tipos** y permiten *narrowing* en condiciones.

---

[Volver al índice general](../../index.md)