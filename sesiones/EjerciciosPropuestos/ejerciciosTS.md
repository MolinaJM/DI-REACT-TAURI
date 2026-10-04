# Ejercicios de TypeScript — Sesiones 2 y 3

> ⚠️ **Importante.** Es complejo evitar que un ejemplo de código explique un concepto sin tocar otro. Se intenta en la medida de lo posible que se expongan los conceptos uno a uno, pero es posible que se adelante algo que se detalle más adelante.

> 📌 **Ruta React + Tauri.** Todo el catálogo está orientado a TypeScript aplicado a React y a Tauri. Los temas ajenos a ese objetivo (enums, clases y herencia, `.d.ts`, manipulación manual del DOM y Web APIs del navegador) se han **eliminado** del catálogo: React se encarga del DOM y la app es TypeScript *erasable-only*.

> ✅ **Soluciones.** Cada bloque resuelto enlaza a su fichero en [`ejercicios/soluciones/`](../../ejercicios/soluciones/). Hoy están **fuera del repositorio** (`.gitignore`): al publicarlos, los enlaces se activarán automáticamente. Todos los bloques tienen fichero de ejercicio y de solución propios.
> 🧪 **Ejercicio ejecutable** en [`ejercicios/s0X/`](../../ejercicios/) · 📖 **Teoría** en [`apuntes/s0X/`](../apuntes/).

> ⚠️ **`export {}` al principio de cada ejercicio.** Cada fichero debe abrir con un `export {}` (o con cualquier `import`/`export`) para que TypeScript lo trate como **módulo** y no como **script**. Sin esa línea, todas las declaraciones de primer nivel (`const`, `function`, `type`, `interface`…) comparten el **ámbito global** y dos ejercicios que declaren el mismo nombre chocan entre sí al compilarse juntos o al concatenarse.
>
> Colisiones reales en el catálogo actual: `Usuario` (`s02/04-interfaces.ts`, `s03/05-objetos.ts`, `s03/06-utility-types.ts`), `Producto` (`s02/13-reto-s02.ts`, `s03/05-objetos.ts`), `Planeta` (`s03/02-arrays-metodos.ts`), `Pedido`, `Id`, `EstadoPedido`, `numeros`, `texto`, `numero`, `activo`, `usuario` y `coordenada`.
>
> Con `export {}` cada ejercicio se compila, se ejecuta y se evalúa **por separado**, sin depender del orden de carga ni del estado que dejó el anterior.


## 🎯 Prioridad para React y Tauri (P1–P5)

> Escala afinada: dentro de lo imprescindible se distingue el **núcleo (P1)** de lo **necesario pero complementario (P2)**. Mide la importancia cara a *usarlo luego en React y Tauri*; por **decisión pedagógica**, **S2·9 Funciones es P1** (queremos que se trabaje mucho), aunque su peso conceptual en React/Tauri sea menor que el del resto del núcleo.

| Prioridad | Significado |
|---|---|
| **P1 · Núcleo imprescindible** | No se escribe ni un componente típico sin esto. |
| **P2 · Necesario pero complementario** | Imprescindible a medio plazo; completa el núcleo. |
| **P3 · Uso habitual** | Aparece a diario; se interioriza en las sesiones React/Tauri. |
| **P4 · Útil pero dilatable** | Según caso; no bloquea. |
| **P5 · Prescindible** | Se omite sin problema (p. ej. overloads, métodos ES2023/ES2025). |

Resumen sobre los **21 bloques con ejercicio**: **P1 = 9 · P2 = 6 · P3 = 5 · P4 = 1 · P5 reservado**.

### Sesión 2

| Bloque | Ejercicio | Prio | Por qué (React/Tauri) |
|---|---|---|---|
| 1 · Tipos Primitivos | `s02/01` | **P2** | Base de todo el tipado, pero elemental y breve. |
| 2 · Type Inference | `s02/02` | **P2** | El editor deduce tipos (inferencia contextual en `map`, hooks). |
| 3 · Tipos Especiales | `s02/03` | **P2** | `unknown`/`never` esenciales; se aplican de lleno con los guards (P1). |
| 4 · Interfaces · **5 · Type Aliases** | `s02/04` | **P1** | `interface Props` = contrato de cada componente; modelas entidades. |
| 6 · Union Types e Intersección | `s02/06` | **P1** | Props multiforma y estado discriminado: el pan de cada día de un componente. |
| 7 · Conversión de tipos · **8 · Operadores** | `s02/07` | **P3** | JSON en persistencia y `??` para defaults; ternario/short-circuit a diario. |
| 9 · Funciones en Profundidad | `s02/09` | **P1** *(pedagógica)* | Handlers `onClick`, callbacks y la semilla de `useState<T>`; *overloads → P5*. |
| 10 · Estructuras de control de flujo | `s02/10` | **P2** | `switch`+`never` = patrón `useReducer`; llega en React II. |
| 11 · Literal Types y Narrowing | `s02/11` | **P1** | `typeof`/`in` narrowing y discriminated unions. |
| 12 · Type Guards Avanzados | `s02/12` | **P1** | Validar lo que llega de `invoke`/JSON: la regla del curso (nunca `any`). |
| 13 · 🏁 Reto final de S2 | `s02/13` | **P4** | Integración/repaso de S2; sin concepto nuevo. |

### Sesión 3

| Bloque | Ejercicio | Prio | Por qué (React/Tauri) |
|---|---|---|---|
| 14 · Arrays y Tuplas | `s03/01` | **P2** | La tupla `[valor, setter]` de `useState` y las listas básicas. |
| 15 · Arrays: métodos fundamentales | `s03/02` | **P1** | `map`/`filter`/`reduce`/`find` omnipresentes en el JSX de las listas. |
| 16 · Set | `s03/03` | **P3** | Deduplicar listas y cachés; casos concretos. |
| 17 · Map | `s03/04` | **P3** | Caché/persistencia clave-valor; `Record` cubre la mayoría. |
| 18 · Objetos en profundidad | `s03/05` | **P2** | Entidades, formularios, JSON y cloning sin mutar el estado. |
| 19 · Desestructuración/spread/optional chaining | `s03/08` | **P1** | El puente: destructuring de props, spread de `setState`, `?.`/`??` — lo primero de cada componente. Se imparte en Estructuras de Datos (§7.12). |
| 20 · Programación asíncrona | `s03/07` | **P1** | `Promise.all` + `try/catch` = patrón `invoke` y del `useEffect` de carga. |
| 22 · Utility Types *(optativo)* | `s03/06` | **P3** | `Partial`/`Pick`/`Omit`/`Record`: se imparte en Generics (`s03/10`). Bloque final, asociado al apunte optativo. |





## Sesión 2: Introducción a TypeScript (Parte 1)

<a id="1-tipos-primitivos"></a>

### 1. Tipos Primitivos

> 🧪 **Ejercicio:** [`s02/01-tipos-primitivos.ts`](../../ejercicios/s02/01-tipos-primitivos.ts).
> ✅ **Solución:** [`soluciones/s02/01-tipos-primitivos.ts`](../../ejercicios/soluciones/s02/01-tipos-primitivos.ts).
> 🎯 Prioridad **P2** — base de todo el tipado, pero elemental y breve.
1. Imagina que estás construyendo un perfil de usuario. Declara variables de tipo `string`, `number`, `boolean`, `null` y `undefined` para representar datos reales de ese perfil (nombre, edad, activo, etc.), asígnales valores e imprímelas.
2. Imagina que tienes un número 42 guardado en una variable y quieres reasignarle un texto. Intenta reasignar un `number` a una variable declarada como `string`. ¿Qué error obtienes?
3. Estás configurando un producto en una tienda online. Declara `precio: number = 99.99` con tipado explícito y `activo` con `true` dejando que TypeScript infiera el tipo. Compara: ¿qué diferencia hay entre `precio: number = 99.99` y `activo = true`?
4. Estás diseñando la estructura de datos de un perfil. Declara variables con tipo explícito: tu nombre (`string`), tu edad (`number`), un booleano que indique si estás aprendiendo TypeScript y un arreglo de números con tus 3 números favoritos.
5. Estás construyendo un formulario de registro. Crea `nombre` y `apellido` (ambos `string`) y combínalos con una template literal en `nombreCompleto`.
6. Estás trabajando con un sistema que procesa números y necesita saber cuántos dígitos tiene cada uno. Escribe `longitudTexto(numero: number): number` que devuelva cuántos dígitos tiene el número (pista: conviértelo a `string` primero y usa `.length`).







<a id="2-type-inference"></a>

### 2. Type Inference

> 🧪 **Ejercicio:** [`s02/02-type-inference.ts`](../../ejercicios/s02/02-type-inference.ts).
> ✅ **Solución:** [`soluciones/s02/02-type-inference.ts`](../../ejercicios/soluciones/s02/02-type-inference.ts).
> 🎯 Prioridad **P2** — inferencia contextual (`map`, hooks): el editor deduce los tipos por ti.
1. Estás escribiendo código y quieres confiar en que el editor haga el trabajo por ti. Declara variables sin anotación de tipo y observa los tipos inferidos por el editor.
2. Estás procesando datos heterogéneos que llegan de una fuente externa. Crea un array con números y strings mezclados. ¿Qué tipo infiere TypeScript?
3. Estás definiendo constantes y variables en un componente. Declara una `const` vs `let` con el mismo valor literal. Compara los tipos inferidos.
4. Estás renderizando una lista de elementos y usas `map` para transformarlos. Usa inferencia contextual con `map` — ¿cómo sabe TypeScript el tipo del parámetro?







<a id="3-tipos-especiales-any-unknown-never-void"></a>

### 3. Tipos Especiales: any, unknown, never, void

> 🧪 **Ejercicio:** [`s02/03-tipos-especiales.ts`](../../ejercicios/s02/03-tipos-especiales.ts).
> ✅ **Solución:** [`soluciones/s02/03-tipos-especiales.ts`](../../ejercicios/soluciones/s02/03-tipos-especiales.ts).
> 🎯 Prioridad **P2** — `unknown`/`never` son esenciales; se aplican de lleno con los guards (P1).
1. Estás trabajando con datos de origen desconocido y necesitas flexibilidad total. Declara una variable `any` y asígnale distintos tipos. Llama a un método inexistente — ¿qué ocurre en compilación y en runtime (en ejecución)?
2. Estás recibiendo datos de una API externa y quieres seguridad sin sacrificar flexibilidad. Repite el paso anterior con `unknown`. ¿Qué necesitas hacer para poder llamar a un método sobre `unknown`?
3. Estás diseñando el comportamiento de dos funciones: una que realiza una acción sin devolver nada y otra que nunca termina porque siempre lanza un error. Escribe una función que devuelva `void` y otra que devuelva `never` (que lance un error).
4. Estás construyendo un sistema de logging. Escribe `logMensaje(texto: string): void` que imprima el mensaje con `console.log`.
5. Estás implementando un manejador de errores que nunca devuelve control. Escribe `lanzarError(mensaje: string): never` que lance `new Error(mensaje)`. Aún no se han visto a fondo las funciones, pero hay ejemplos que se pueden usar como base.







<a id="4-interfaces"></a>

### 4. Interfaces

> 🧪 **Ejercicio:** [`s02/04-interfaces.ts`](../../ejercicios/s02/04-interfaces.ts).
> ✅ **Solución:** [`soluciones/s02/04-interfaces.ts`](../../ejercicios/soluciones/s02/04-interfaces.ts).
> 🎯 Prioridad **P1** — `interface Props` es el contrato de cada componente.

  

> ✅ ACLARACIÓN IMPORTANTE!! — `Toda la creación de objetos implica también la declaración del constructor y de instancias`. Esto también se aplica a los ejercicios de type.

1. Estás diseñando una base de datos de personajes de ciencia ficción. Define una interface `Personaje` con `nombre`, `planeta` y `nave` (opcional), y un método `presentarse()` que devuelva `void`. Crea un "constructor" de Personaje y crea varios personajes.
2. Estás ampliando la base de datos para incluir personajes que son también pilotos. Extiende `Personaje` con `Piloto` que añada `velocidadMax` y `mision`. Pruébalo (constructor e instancias del objeto.)
3. Estás diseñando un sistema de configuración que permite definir la misma entidad desde múltiples módulos. Crea dos interfaces con el mismo nombre y observa el declaration merging (solo funciona con `interface`, no con `type`).
4. Estás diseñando un sistema de rangos para una academia espacial. Crea una interface `Rango` con `nombre` y `nivel`, y otra interface `RangoOficial` que extienda `Rango` añadiendo una propiedad `autoridad` de tipo `number`.
5. Estás creando un catálogo de naves para una tienda online. Crea una interface `Nave` con `id` y `precio` (obligatorios) y `descuento` (opcional). Declara una variable `corbeta` que la cumpla.
6. Estás configurando una estación espacial y quieres que ciertos valores no se modifiquen después de la inicialización. Crea una interface `ConfiguracionEstacion` con `modulo` y `gravedad` marcadas como `readonly` para que no se puedan modificar tras crear el objeto.







<a id="5-type-aliases"></a>

### 5. Type Aliases

> 🧪 **Ejercicio:** [`s02/05-type-aliases.ts`](../../ejercicios/s02/05-type-aliases.ts).
> ✅ **Solución:** [`soluciones/s02/05-type-aliases.ts`](../../ejercicios/soluciones/s02/05-type-aliases.ts).
> 🎯 Prioridad **P1** — modelar entidades y tipos de datos de la app.
1. Estás trabajando con un sistema de coordenadas para un mapa. Define un type alias `Coordenadas` como `{ x: number, y: number }`. Crea una función que lo acepte.
2. Estás definiendo la estructura de una tarjeta de producto para una tienda. Crea un type alias `TarjetaProducto` como `{ titulo: string; precio: number, descripcion?: string }`. Crea una función que lo acepte y lo resuma en un texto.
3. Estás diseñando la ficha técnica de una cerveza artesana. Crea un type alias `Cerveza` con `id` (readonly), `nombre`, `tipo` (opcional), `precio` y un método `describir(): string` que devuelva un texto con los datos.
4. Estás definiendo los tipos de cerveza que se sirven en el bar. Crea un type alias `TipoCerveza` como unión de literales `"IPA" | "Lager" | "Stout" | "Trigo" | "Rubia"`. Declara una variable `cervezaDelDia` de ese tipo e intenta asignar un valor no válido para ver el error.
5. Estás modelando un ticket de bar. Crea un type alias `Ticket` como tupla `[numero: number, cervezas: string[], total: number]`. Crea un ticket con número, lista de cervezas consumidas y total a pagar.
6. Estás construyendo el sistema de reseñas del bar. Define un type alias `Resena` como firma de función `(cerveza: Cerveza) => string`. Luego crea un type alias `Bar` con propiedades `nombre`, `menu` (array de `Cerveza`) y `resenar` (de tipo `Resena`). Crea un objeto `bar` que cumpla el tipo y llama a `resenar` con una cerveza del menú. Ten en cuenta que la firma de función te permite crear distintos comportamientos y pasárselos al constructor del Bar.







<a id="6-union-types-e-intersección-de-tipos"></a>

### 6. Union Types e Intersección de Tipos

> 🧪 **Ejercicio:** [`s02/06-unions-intersection.ts`](../../ejercicios/s02/06-unions-intersection.ts).
> ✅ **Solución:** [`soluciones/s02/06-unions-intersection.ts`](../../ejercicios/soluciones/s02/06-unions-intersection.ts).
> 🎯 Prioridad **P1** — props multiforma y estado discriminado: el pan de cada día de un componente.
1. Estás diseñando un sistema de identificación que acepta tanto IDs numéricos como alfanuméricos. Define un tipo `ID` que sea `string | number`. Crea una función `mostrarId(id: ID): string` que devuelva el ID formateado con una template literal (`` `ID: ${id}` ``). Pruébala con un número y con un texto.
2. Estás modelando un sistema de recursos humanos donde una persona puede ser también empleada. Crea dos type `Persona` y `Empleado`. Combínalas con intersección `&` y crea un objeto que cumpla ambas (NOTA: se podría haber hecho también con interface ).
3. Estás modelando el estado de envío de un pedido. Define un type alias `EstadoPedido = "pendiente" | "enviado" | "entregado"`. Declara una variable `estado` de ese tipo, asígnale cada uno de los tres valores e imprime el estado. Intenta asignar un valor no válido (p. ej. `"cancelado"`) y observa el error de TypeScript (pero no el de JS en runtime).







<a id="7-conversión-de-tipos"></a>

### 7. Conversión de tipos

> 🧪 **Ejercicio:** [`s02/07-conversion-tipos.ts`](../../ejercicios/s02/07-conversion-tipos.ts).
> ✅ **Solución:** [`soluciones/s02/07-conversion-tipos.ts`](../../ejercicios/soluciones/s02/07-conversion-tipos.ts).
> 🎯 Prioridad **P3** — JSON en persistencia y `??` para defaults; se interioriza con Tauri/formularios.
1. Estás transformando datos entre formatos: recibes un número como texto y necesitas convertirlo. Convierte explícitamente: `number → string`, `string → number`, `string → boolean`.
2. Imagina que recibes datos de una API y necesitas convertirlos. Convierte un `number` a `string`, `boolean` y `number` de nuevo con `String()`, `Boolean()` y `Number()`.
3. Estás persistiendo datos de un objeto en localStorage o enviándolos a un servidor. Usa `JSON.stringify` y `JSON.parse` con una interface tipada.
4. Estás construyendo un formulario donde algunos campos pueden venir vacíos y necesitas valores por defecto. Escribe una función que use el operador `??` para proporcionar valores por defecto.
5. Estás trabajando con valores que pueden ser `0`, `false` o `""` y necesitas que el operador no los considere falsy. Diferencia entre `||` y `??` con un ejemplo donde `0` sea un valor válido.







<a id="8-operadores"></a>

### 8. Operadores

> 🧪 **Ejercicio:** [`s02/08-operadores.ts`](../../ejercicios/s02/08-operadores.ts).
> ✅ **Solución:** [`soluciones/s02/08-operadores.ts`](../../ejercicios/soluciones/s02/08-operadores.ts).
> 🎯 Prioridad **P3** — ternario/`??`/short-circuit: se usan a diario y se aprenden rápido.
1. Estás comparando valores que pueden ser de tipos diferentes y quieres entender el comportamiento de los operadores de igualdad. Compara `==` vs `===` con `5` y `"5"`. ¿Qué resultados obtienes?
2. Estás construyendo una lógica condicional compacta para mostrar un mensaje u otro según el estado de un usuario. Usa el operador ternario para asignar un valor según una condición.
3. Estás implementando una función que debe evitar ejecutar una operación costosa si una condición no se cumple. Escribe una función que use short-circuit evaluation para evitar una llamada si una condición es falsa.







<a id="9-funciones-en-profundidad"></a>

### 9. Funciones en Profundidad

> 🧪 **Ejercicio:** [`s02/09-funciones.ts`](../../ejercicios/s02/09-funciones.ts).
> ✅ **Solución:** [`soluciones/s02/09-funciones.ts`](../../ejercicios/soluciones/s02/09-funciones.ts).
> 🎯 Prioridad **P1** *(decisión pedagógica)* — handlers `onClick`, callbacks y la semilla de `useState<T>`; *overloads → P5*.
1. Estás creando una función que gestiona la configuración de un producto y necesita parámetros obligatorios, opcionales y con valores por defecto. Escribe una función con parámetro obligatorio, otro opcional y otro con valor por defecto.
2. Estás implementando una función que sume un número variable de precios de productos. Crea una función con rest parameters que sume todos los números recibidos.
3. Estás calculando el precio final de un producto con impuestos. Escribe `calcularTotal(precioBase, impuesto = 0.21)` que devuelva el total con impuestos.
4. Implementa una función `crearAcumulador` que acepte un string inicial opcional y devuelva un objeto con la interfaz AcumuladorTexto (con métodos `anadir`, `ver` y `tama`), manteniendo el estado de la cadena oculto en una variable privada mediante un closure para permitir concatenar nuevos textos, consultar el contenido actual y obtener la longitud total de caracteres.
5. Estás diseñando una función que formatea datos de entrada que pueden ser un texto o una lista de números. Escribe function overloads para `formatearEntrada` que acepte `string` o `number[]` y devuelva el tipo correspondiente.
6. Estás pasando una función como argumento a otro componente o como prop. Asigna una función a una variable (expresión funcional) y úsala. Prueba también una función flecha que no use el parámetro explícito devuelto por el tipo.
7. Estás modelando operaciones matemáticas como datos que puedes almacenar y recorrer. Declara un tipo `Operacion = (a: number, b: number) => number` y crea funciones `sumar`, `restar` y `multiplicar` que la cumplan. Guarda las tres en un array y recórrelas.







<a id="10-estructuras-de-control-de-flujo"></a>

### 10. Estructuras de control de flujo

> 🧪 **Ejercicio:** [`s02/10-control-de-flujo.ts`](../../ejercicios/s02/10-control-de-flujo.ts).
> ✅ **Solución:** [`soluciones/s02/10-control-de-flujo.ts`](../../ejercicios/soluciones/s02/10-control-de-flujo.ts).
> 🎯 Prioridad **P2** — `switch`+`never` = el patrón `useReducer`/estados ok·cargando·error (llega en React II).
1. Estás desarrollando un sistema de calificaciones para una plataforma educativa. Escribe un `if/else if/else` que clasifique una nota numérica en Sobresaliente, Notable, Aprobado, Suspenso.
2. Estás implementando un manejador de estados para una petición HTTP que puede tener múltiples estados. Crea un `switch` exhaustivo con un tipo unión de 4 valores literales. Incluye exhaustiveness check con `never`.
3. Estás procesando una lista de nombres y necesitas calcular el total de caracteres. Recorre un array de strings con `for...of` y suma sus longitudes.
4. Estás generando una secuencia de números para paginar resultados. Genera la secuencia `hasta…1` en un array usando `for...of` sobre un rango (`Array.from`, visto en [`04_Funciones.md`](../apuntes/s02/04_Funciones.md)).







<a id="11-literal-types-y-type-narrowing"></a>

### 11. Literal Types y Type Narrowing

> 🧪 **Ejercicio:** [`s02/11-unions-narrowing.ts`](../../ejercicios/s02/11-unions-narrowing.ts).
> ✅ **Solución:** [`soluciones/s02/11-unions-narrowing.ts`](../../ejercicios/soluciones/s02/11-unions-narrowing.ts).
> 🎯 Prioridad **P1** — `typeof`/`in` y discriminated unions: los estados de una petición o evento.
> ℹ️ Los **tipos literales** (`"N" | "S"`, `EstadoPedido`) se explican en [`01_SintaxisBasica.md`](../apuntes/s02/01_SintaxisBasica.md); aquí se ponen en práctica.
1. Estás construyendo un sistema de navegación que trabaja con puntos cardinales. Define un tipo literal `Direccion` con valores `"N" | "S" | "E" | "O"`. Escribe una función que devuelva el nombre completo.
2. Estás implementando un motor de cálculo de áreas para un programa de diseño gráfico. Crea una discriminated union `Triangulo | Cuadrado` con la propiedad discriminante `tipo`. Implementa `calcularArea`.
3. Estás procesando datos que pueden ser de tres tipos diferentes y necesitas aplicar una lógica distinta a cada uno. Usa `typeof` narrowing en una función que acepte `string | number | boolean` y aplique una transformación distinta a cada caso.
4. Estás trabajando con dos tipos de objetos que comparten propiedades pero tienen diferencias. Usa `in` narrowing para distinguir entre dos interfaces.
5. Estás desarrollando un sistema de seguimiento de pedidos. Define un type alias `EstadoPedido` con las literales `"pendiente" | "enviado" | "entregado"` y crea `actualizarEstado(estado)` que imprima en consola la notificación del cambio.
6. Estás procesando una entrada que puede ser un texto o un número y necesitas transformarla según su tipo. Escribe `procesarEntrada(entrada: string | number)`: si es `string` devuelve el texto en mayúsculas; si es `number`, el doble del número.
7. Estás recibiendo datos de una API externa y necesitas validar su tipo antes de procesarlos. Escribe `procesar(valor: unknown)`: si es `string`, devuelve su longitud en mayúsculas; si es `number`, su doble como string; si no, `"desconocido"`.







<a id="12-type-guards-avanzados"></a>

### 12. Type Guards Avanzados

> 🧪 **Ejercicio:** [`s02/12-type-guards.ts`](../../ejercicios/s02/12-type-guards.ts).
> ✅ **Solución:** [`soluciones/s02/12-type-guards.ts`](../../ejercicios/soluciones/s02/12-type-guards.ts).
> 🎯 Prioridad **P1** — validar lo que llega de `invoke`/JSON: la regla del curso (nunca `any`).
1. Estás implementando un sistema de roles y necesitas verificar si un usuario tiene permisos de administrador. Crea un custom type guard `esAdmin(usuario)` que compruebe si un usuario tiene rol `"admin"`.
2. Estás filtrando una lista de elementos que pueden ser de diferentes tipos y solo quieres los de un tipo concreto. Usa un type predicate en un bucle `for...of` para obtener solo los elementos de un tipo concreto de una unión.
3. Estás escribiendo una función que debe garantizar que un valor cumple un tipo antes de continuar la ejecución. Implementa una assertion function `asegurarNumero(valor: unknown): asserts valor is number`.







<a id="13-reto-final-s2"></a>

### 13. 🏁 Reto final de S2
> 🧪 **Ejercicio:** [`s02/13-reto-s02.ts`](../../ejercicios/s02/13-reto-s02.ts).
> ✅ **Solución:** [`soluciones/s02/13-reto-s02.ts`](../../ejercicios/soluciones/s02/13-reto-s02.ts).
> Integra TODO lo visto en S2 en un único programa: uniones de literales, narrowing, *type guards* con predicados, parámetros por defecto, ternario/`??`, `for...of`, `switch` exhaustivo con `never`, closures y aserciones. La entrada en React: piensa en ello como el esqueleto de un `useReducer`.
> 🎯 Prioridad **P4** — integración/repaso de S2; sin concepto nuevo para React/Tauri.



---

## Sesión 3: Introducción a TypeScript (Parte 2)

<a id="14-arrays-y-tuplas"></a>

### 14. Arrays y Tuplas


> 🧪 **Ejercicio:** [`s03/01-arrays-tuplas.ts`](../../ejercicios/s03/01-arrays-tuplas.ts).
> ✅ **Solución:** [`soluciones/s03/01-arrays-tuplas.ts`](../../ejercicios/soluciones/s03/01-arrays-tuplas.ts).
> 🎯 Prioridad **P2** — la tupla `[valor, setter]` de `useState` y las listas básicas.
1. Estás procesando diferentes tipos de datos en tu app. Crea un array de números, otro de strings y otro mixto `(string | number)[]`.
2. Estás trabajando con datos estructurados de un usuario que tienen un número fijo de campos con tipos distintos. Define una tupla `[string, number, boolean]` con datos de un usuario. Desestructúrala.
3. Estás trabajando con coordenadas geográficas y necesitas que ciertos datos no se modifiquen. Crea una tupla etiquetada `[lat: number, lng: number]` y un array `readonly` de números. Intenta modificar ambos y observa los errores.
4. Estás calculando el puntaje total de una lista de números accediendo a cada elemento. Escribe una función que reciba un `ReadonlyArray<number>` y devuelva su suma accediendo por índice.
5. Estás desarrollando un juego donde un punto se mueve en un plano 2D. Define una tupla `Coordenadas2D` de exactamente dos números `[x, y]` y crea `moverPunto(tupla, dx, dy)` que devuelva una nueva tupla con la posición actualizada.
6. Estás trabajando con una lista de ciudades y prefieres la sintaxis genérica explícita. Declara un array de strings con la sintaxis genérica `Array<string>` e inicialízalo con tres ciudades.
7. Estás diseñando un sistema de respuestas que puede contener tanto números como booleanos. Crea un array `respuestas` que contenga solo `boolean | number` y rellénalo con al menos 4 elementos variados.
8. Estás modelando la respuesta de una llamada HTTP con un código de estado y un posible mensaje de error. Define una tupla `RespuestaHTTP` que contenga un código de estado (`number`, obligatorio) y un mensaje de error (`string`, opcional).
9. Estás trabajando con puntos cartesianos y quieres que no se modifiquen por accidente. Crea una tupla `readonly [number, number]` para un punto cartesiano e intenta modificarla por asignación directa. ¿Qué ocurre?
10. Estás procesando datos de un usuario almacenados en una tupla y necesitas separar cada campo. Dada `const usuario: [number, string, boolean] = [1, "Ana", true]`, desestructúrala en variables individuales tipadas explícitamente.








<a id="15-arrays-métodos-fundamentales"></a>

### 15. Arrays: métodos fundamentales


> 🧪 **Ejercicio:** [`s03/02-arrays-metodos.ts`](../../ejercicios/s03/02-arrays-metodos.ts).
> ✅ **Solución:** [`soluciones/s03/02-arrays-metodos.ts`](../../ejercicios/soluciones/s03/02-arrays-metodos.ts).
> 🎯 Prioridad **P1** — `map`/`filter`/`reduce`/`find` son omnipresentes en el JSX de las listas.
>
> 🌌 **Datos de ejemplo:** los planetas usados en los ejercicios 2 y 5 son reales, extraídos de la API pública [swapi.info/api/planets](https://swapi.info/api/planets). Se han **hardcodeado** en el fichero de ejercicio (no se hace `fetch`): la asincronía (`async/await`, `Promise`) se imparte en la sesión 9 (`s03/08_Asincronismo`), así que aquí trabajamos con datos estáticos para centrarnos en los métodos de array.
>
> **JSON de los planetas** (los 4 campos que se usan en los ejercicios):
>
> ```json
> [
>   { "name": "Tatooine",  "population": 200000,     "climate": "arid",                "films": ["films/1", "films/3", "films/4", "films/5", "films/6"] },
>   { "name": "Alderaan",  "population": 2000000000, "climate": "temperate",           "films": ["films/1", "films/6"] },
>   { "name": "Yavin IV",  "population": 1000,       "climate": "temperate, tropical", "films": ["films/1"] },
>   { "name": "Hoth",      "population": 0,          "climate": "frozen",              "films": ["films/2"] },
>   { "name": "Dagobah",   "population": 0,          "climate": "murky",               "films": ["films/2", "films/3", "films/6"] }
> ]
> ```
>
> *(En la API real, `population` viene como `string` (o `"unknown"`) y `films` como URLs completas; aquí se convierten a `number` y a IDs cortos para simplificar los ejercicios.)*
1. Estás procesando una lista de números para transformarlos, filtrarlos y calcular un total. Dado `[1, 2, 3, 4, 5]`, usa `map` para duplicar, `filter` para pares, `reduce` para sumar.
2. Estás buscando planetas específicos en un catálogo. Usa `find`, `findIndex`, `some` y `every` sobre el array de objetos `Planeta` (datos de swapi).
3. Estás trabajando con datos que no deben mutar y necesitas versiones ordenadas o invertidas del array. Usa `toSorted`, `toReversed` y `with` (ES2023) y comprueba que el original no muta.
4. Estás implementando un buscador eficiente en una lista ordenada. Implementa una búsqueda binaria tipada.
5. Estás gestionando una lista de planetas y necesitas filtrar solo los habitables. Dada la interface `Planeta { name: string; population: number; climate: string }`, escribe `obtenerHabitable(planetas: Planeta[])` que devuelva un nuevo array solo con los de `climate === "temperate"`.
6. Estás implementando una pila de tareas y necesitas modificar el array en su lugar. Usa los métodos que **mutan** el array en su lugar: `push` y `pop` sobre una pila, y `sort` con un comparador numérico `(a, b) => a - b`. Comprueba que `sort` modifica el array original.
7. Estás trabajando con listas de datos y necesitas crear copias que puedas modificar sin afectar la original. Crea una copia de un array con `slice()` y con el spread `[...arr]`, y modifica la copia sin afectar al original (contrasta con `sort` que sí muta).








<a id="16-set-conjunto-de-valores-únicos"></a>

### 16. Set: conjunto de valores únicos


> 🧪 **Ejercicio:** [`s03/03-set.ts`](../../ejercicios/s03/03-set.ts).
> ✅ **Solución:** [`soluciones/s03/03-set.ts`](../../ejercicios/soluciones/s03/03-set.ts).
> 🎯 Prioridad **P3** — deduplicar listas y cachés; casos concretos.
1. Estás gestionando una lista de colores y necesitas que no se repitan. Crea un `Set<string>` con nombres de colores. Añade, elimina y comprueba existencia.
2. Estás procesando una lista de datos que contiene duplicados y necesitas eliminarlos. Dado un array con duplicados, elimínalos usando `Set`.
3. Estás trabajando con dos conjuntos de datos y necesitas calcular operaciones entre ellos. Dados dos conjuntos `A` y `B`, calcula: unión, intersección y diferencia.
4. Estás usando una versión moderna de TypeScript con ES2025 y quieres aprovechar los métodos nativos de Set. Prueba los métodos nativos ES2025: `union`, `intersection`, `difference`, `isSubsetOf`.








<a id="17-map-diccionario-clave-valor"></a>

### 17. Map: diccionario clave-valor


> 🧪 **Ejercicio:** [`s03/04-map.ts`](../../ejercicios/s03/04-map.ts).
> ✅ **Solución:** [`soluciones/s03/04-map.ts`](../../ejercicios/soluciones/s03/04-map.ts).
> 🎯 Prioridad **P3** — caché/persistencia clave-valor; `Record` cubre la mayoría de casos.
1. Estás almacenando datos de personas con sus edades y necesitas acceder a ellos por nombre. Crea un `Map<string, number>` con nombres de personas y sus edades. Itera sobre él.
2. Estás implementando un sistema de caché para evitar llamadas repetidas a una API. Implementa una caché simple con `Map<string, { data: unknown; timestamp: number }>`.








<a id="18-objetos-en-profundidad"></a>

### 18. Estructuras de Datos - Objetos en profundidad


> 🧪 **Ejercicio:** [`s03/05-objetos.ts`](../../ejercicios/s03/05-objetos.ts).
> ✅ **Solución:** [`soluciones/s03/05-objetos.ts`](../../ejercicios/soluciones/s03/05-objetos.ts).
> 🎯 Prioridad **P2** — entidades, formularios, JSON y cloning sin mutar el estado.
1. Estás explorando las propiedades de un objeto para inspeccionar su contenido. Dado un objeto `persona`, usa `Object.keys`, `Object.values` y `Object.entries`.
2. Estás extrayendo datos específicos de un objeto y necesitas hacerlo de forma concisa. Usa destructuring básico: alias y valores por defecto.
3. Estás clonando un objeto complejo y necesitas preservar tipos como `Date` o `Map` que `JSON.parse` no maneja. Clona un objeto con `structuredClone` — ¿qué tipos preserva que `JSON.parse(JSON.stringify(x))` no?
4. Estás agrupando planetas por clima para mostrarlos en secciones. Usa `Object.groupBy` para agrupar el array de `Planeta` (datos de swapi) por `climate` y observa el tipo de retorno.
5. Estás protegiendo un objeto de modificaciones accidentales. Usa `Object.freeze` y comprueba que el objeto es readonly en runtime.














<a id="19-desestructuración-spreadrest-y-optional-chaining-puente-a-react"></a>

### 19. Desestructuración, spread/rest y optional chaining (puente a React)




> 🔑 **Puente a React.** Es lo primero que usarás en **cada** componente: destructuring de `props` en la firma de la función, `const [valor, setValor] = useState(...)`, `setState({ ...prev, ... })` y `?.`/`??` para navegar datos anidados (API, store). **Prioridad máxima antes de S04.**
> 🧪 **Ejercicio:** [`s03/08-desestructuracion-spread-optional.ts`](../../ejercicios/s03/08-desestructuracion-spread-optional.ts).
> ✅ **Solución:** [`soluciones/s03/08-desestructuracion-spread-optional.ts`](../../ejercicios/soluciones/s03/08-desestructuracion-spread-optional.ts).
> 🎯 Prioridad **P1** — destructuring de props, spread de `setState`, `?.`/`??`: lo primero de cada componente.
1. Estás escribiendo un componente de React que recibe sus datos a través de `props`. Crea `Tarjeta({ nombre, edad, activo })` que reciba el objeto como parámetro y lo desestructure en la firma (patrón `props`). Devuelve el nombre, la edad y si está en línea.
2. Estás implementando un mini hook que simula `useState` y devuelve una tupla con el valor y su setter. Desestructura la tupla `[valor, setValor]` que devuelve una factoría `useMiniEstado` (patrón `useState`). Escribe `incrementarContador` que sume 1.
3. Estás procesando la respuesta de una API (swapi) con datos anidados y necesitas extraer campos con valores por defecto. Implementa `resumenPlaneta(resp)` con desestructuración **anidada** de `resp.datos.planeta`, extrayendo `name`, `climate` (default `"desconocido"`) y el primer film de `films` (default `"sin films"`) en una sola línea.
4. Estás pasando todos los campos de un objeto como props a un componente excepto uno. Usa **rest** en destructuring: `separarId(pelicula)` debe separar `id` y devolver el resto (el patrón de `<Componente {...resto} />`).
5. Estás actualizando el estado de un componente mezclando una configuración parcial con los valores por defecto. Usa **spread** de objetos: `mergeConfig(parcial)` mezcla `CONFIG_DEFECTO` con `parcial` en un objeto nuevo sin mutar (patrón `setState({ ...prev, ...parcial })`).
6. Estás añadiendo un elemento a un array sin mutar el original y necesites encontrar el máximo. Usa **spread** de arrays: `anadirPuntuacion(arr, nueva)` añade sin mutar (alternativa inmutable a `push`) y `mejorPuntuacion(...args)` despliega un array en `Math.max`.
7. Estás navegando por datos anidados que pueden no existir y necesitas un valor por defecto. Usa **optional chaining** `?.` + `??`: `direccionEnvio(carrito)` navega `carrito.cliente.envio.direccion` (todo opcional) con default `"Sin dirección"`.
8. Estás definiendo las props de un botón que tiene valores por defecto para la etiqueta y el estado. Desestructura en el parámetro con **valores por defecto**: `Boton({ etiqueta = "Enviar", deshabilitado = false })`.
9. Estás implementando un update funcional como el de React que evita clausuras obsoletas. Implementa el **update funcional**: `acumularConUpdater()` con un setter que reciba `(prev) => prev + …` y encadena tres actualizaciones (`+1`, `+2`, `+3`) — es el `setCuenta((c) => c + 1)` de React, que evita clausuras obsoletas.



<a id="20-programación-asíncrona-promesas-y-asyncawait"></a>

### 20. Programación asíncrona (promesas y async/await)


> 🧪 **Ejercicio:** [`s03/07-async.ts`](../../ejercicios/s03/07-async.ts).
> ✅ **Solución:** [`soluciones/s03/07-async.ts`](../../ejercicios/soluciones/s03/07-async.ts).
> 🎯 Prioridad **P1** — `Promise.all` + `try/catch` = patrón `invoke` y del `useEffect` de carga.
>
> 🌌 **Aquí SÍ se hace `fetch` real:** a diferencia de los bloques 15–19 (donde los datos de swapi estaban hardcodeados porque la asincronía aún no se había impartido), en este bloque ya se enseña `async/await` y `Promise`, así que el ejercicio 2 hace una petición real a [swapi.info/api/planets](https://swapi.info/api/planets).
1. Estás implementando una función que simule un retardo antes de completar una operación. Crea una función `esperar(ms)` que devuelva una promesa que se resuelva tras `ms` milisegundos.
2. Estás construyendo una función que carga datos desde una API real. Escribe una función `async` `cargarPlanetas` que haga `fetch` a `https://swapi.info/api/planets` y devuelva la lista de planetas (tipada como `Planeta[]`).
3. Estás cargando datos de múltiples fuentes simultáneamente para acelerar la carga. Lanza dos promesas a la vez con `Promise.all` en `cargarParalelo`.
4. Estás procesando datos que pueden fallar y necesitas manejar los errores sin que se propaguen. Usa `try/catch` en `procesarSeguro` para nunca propagar errores.
5. Estás implementando un sistema de tareas que ejecuta un callback en medio de su ejecución. Escribe `hacerTarea(callback: () => void)` que imprima "inicio", ejecute el `callback` y luego imprima "fin". Llámala pasando un `callback` que imprima "tarea".
6. Estás transformando una lista de números aplicando una operación personalizada sin usar `map`. Escribe `mapearConCallback(numeros: number[], callback: (n: number) => number): number[]` que devuelva un array nuevo aplicando el `callback` a cada elemento (sin usar `map`).
7. Estás simulando una operación asíncrona con un callback. Usa `setTimeout` para simular una operación asíncrona: `simularEspera(ms, callback)` que llame al `callback` tras `ms` milisegundos. Ordena los `console.log` para comprobar que el callback se ejecuta después.



<a id="22-utility-types"></a>

### 22. Utility Types *(optativo)*


> ⚠️ **Bloque optativo.** Se imparte en [`s03/10_Generics.md`](../apuntes/s03/10_Generics.md) (capítulo 10, optativo). No entra en el temario oficial ni en los exámenes; es refuerzo para quien quiera usar `Partial`/`Pick`/`Omit`/`Record` con soltura en formularios y props.
> 🧪 **Ejercicio:** [`s03/06-utility-types.ts`](../../ejercicios/s03/06-utility-types.ts).
> ✅ **Solución:** [`soluciones/s03/06-utility-types.ts`](../../ejercicios/soluciones/s03/06-utility-types.ts).
> 🎯 Prioridad **P3** — `Partial`/`Pick`/`Omit`/`Record` en formularios de edición y props.
1. Estás diseñando los tipos para un formulario de edición de planetas. Dada una interface `Planeta { name: string; population: number; climate: string; films?: string[] }` (datos de swapi):
    - Estás creando un tipo para un formulario donde todos los campos son opcionales. Crea un tipo `PlanetaParcial` con todas las propiedades opcionales.
    - Estás definiendo un tipo para una respuesta que no necesita las películas. Crea un tipo `PlanetaSinFilms` que omita `films`.
    - Estás creando un tipo para una tarjeta resumen que solo muestre name y population. Crea un tipo `ResumenPlaneta` que solo tenga `name` y `population`.
2. Estás modelando la agenda semanal de una aplicación donde cada día tiene un valor de tipo string. Usa `Record` para crear un tipo `Semana` con días como claves y `string` como valores.
3. Estás trabajando con una función existente y necesitas derivar tipos a partir de su firma. Usa `Parameters` y `ReturnType` con una función existente.
4. Estás limpiando un tipo unión que contiene `null` o `undefined` y solo quieres las partes válidas. Usa `NonNullable` para eliminar `null | undefined` de un tipo unión.






