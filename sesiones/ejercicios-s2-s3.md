# Ejercicios de TypeScript — Sesiones 2 y 3

> 📌 **Ruta obligatoria vs optativa.** Para el objetivo React + Tauri, los bloques **optativos** (marcados con ⚠️) quedan fuera de la ruta: *S2·5 Enums*; *S3·1 Clases*, *S3·2 Herencia*, *S3·4 Template Literal Types*, *S3·8 Declaraciones .d.ts*, *S3·9 DOM con TS*, *S3·16 Manipulación del DOM* y *S3·17 Web APIs*.

## Sesión 2: Introducción a TypeScript (Parte 1)

### 1. ¿Qué es TypeScript?
1. Escribe una función JavaScript `multiplicar(a, b)` que devuelva `a * b`. Llámala con `(5, "3")` y observa el resultado. Luego tradúcela a TypeScript con tipos y comprueba que el error se detecta en compilación.
2. Explica con tus palabras qué significa que TypeScript sea un "superconjunto de JavaScript".
3. ¿Qué ventaja tiene detectar errores en compilación frente a detectarlos en ejecución?

### 2. Instalación y Configuración Básica
1. Crea un proyecto TypeScript desde cero: `npm init -y`, instala TypeScript, crea `tsconfig.json` con `target: ES2020` y `strict: true`.
2. Crea un archivo `hola.ts` que imprima "Hola Mundo" y compílalo con `tsc`. Ejecuta el JS generado con Node.
3. Añade `noUnusedLocals: true` al `tsconfig.json`. Crea una variable sin usar y comprueba que el compilador lanza un error.

### 3. Tipos Primitivos
1. Declara variables de tipo `string`, `number`, `boolean`, `null`, `undefined`, `symbol` y `bigint`, asígnales valores e imprímelas.
2. Intenta reasignar un `number` a una variable declarada como `string`. ¿Qué error obtienes?
3. Crea una variable `unique symbol` y otra `symbol`. ¿Puedes asignar una a la otra?

### 4. Arrays y Tuplas
1. Crea un array de números, otro de strings y otro mixto `(string | number)[]`.
2. Define una tupla `[string, number, boolean]` con datos de un usuario. Desestructúrala.
3. Crea una tupla etiquetada `[lat: number, lng: number]` y un array `readonly` de números. Intenta modificar ambos y observa los errores.
4. Escribe una función que reciba un `ReadonlyArray<number>` y devuelva su suma.

### 5. Enums ⚠️ optativo

1. Define un enum numérico `Dia` con `Lunes=1, Martes, Miércoles, etc.` Imprime sus valores y el reverse mapping.
2. Crea un string enum `Rol` con `Admin="ADMIN", User="USER", Guest="GUEST"`. Úsalo en una función que devuelva permisos según el rol.
3. Crea un `const enum` `Direccion` con `Norte, Sur, Este, Oeste`. Compila y revisa el JS generado.

### 6. Tipos Especiales: any, unknown, never, void
1. Declara una variable `any` y asígnale distintos tipos. Llama a un método inexistente — ¿qué ocurre en compilación y en runtime?
2. Repite el paso anterior con `unknown`. ¿Qué necesitas hacer para poder llamar a un método sobre `unknown`?
3. Escribe una función que devuelva `void` y otra que devuelva `never` (que lance un error).
4. Implementa un switch exhaustivo con un tipo unión y una variable `never` en el `default`.

### 7. Type Assertions
1. Usa `as` para castear un `document.getElementById()` a `HTMLInputElement` y cambia su `value`.
2. Prueba el non-null assertion `!` en un parámetro opcional de función.
3. Crea un objeto `as const` e intenta modificar una propiedad. ¿Qué error obtienes?
4. Diferencia entre `as` y `<tipo>`. ¿Cuándo no funciona la segunda sintaxis?

### 8. Type Inference
1. Declara variables sin anotación de tipo y observa los tipos inferidos por el editor.
2. Crea un array con números y strings mezclados. ¿Qué tipo infiere TypeScript?
3. Declara una `const` vs `let` con el mismo valor literal. Compara los tipos inferidos.
4. Usa inferencia contextual con `map` — ¿cómo sabe TypeScript el tipo del parámetro?

### 9. Union Types e Intersección de Tipos
1. Define un tipo `ID` que sea `string | number`. Crea una función que acepte `ID` y devuelva su longitud como string.
2. Crea dos interfaces `Persona` y `Empleado`. Combínalas con intersección `&` y crea un objeto que cumpla ambas.
3. Haz una función que acepte `string | string[]` y devuelva el primer elemento.

### 10. Literal Types y Type Narrowing
1. Define un tipo literal `Direccion` con valores `"N" | "S" | "E" | "O"`. Escribe una función que devuelva el nombre completo.
2. Crea una discriminated union `Triangulo | Cuadrado` con la propiedad discriminante `tipo`. Implementa `calcularArea`.
3. Usa `typeof` narrowing en una función que acepte `string | number | boolean` y aplique una transformación distinta a cada caso.
4. Usa `in` narrowing para distinguir entre dos interfaces.

### 11. Interfaces
1. Define una interface `Cancion` con `titulo`, `artista`, `duracion` (opcional) y `reproducir()` (método).
2. Extiende `Cancion` con `Podcast` que añada `episodio` y `descripcion`.
3. Crea dos interfaces con el mismo nombre y observa el declaration merging.
4. Añade una index signature a una interface `Diccionario` con clave `string` y valor `string`.

### 12. Type Aliases
1. Define un type alias `Coordenadas` como `{ x: number; y: number }`. Crea una función que lo acepte.
2. Crea un type `Resultado<T>` genérico con `exito: boolean`, `datos: T`.
3. Define un type para un callback `(err: Error | null, data?: unknown) => void`.
4. Compara: ¿cuándo usarías `type` vs `interface`?

### 13. Funciones en Profundidad
1. Escribe una función con parámetro obligatorio, otro opcional y otro con valor por defecto.
2. Crea una función con rest parameters que sume todos los números recibidos.
3. Implementa un closure `crearContador` que devuelva `incrementar`, `decrementar` y `valor`.
4. Escribe function overloads para `formatearEntrada` que acepte `string` o `number[]` y devuelva el tipo correspondiente.

### 14. Type Guards Avanzados
1. Crea un custom type guard `esAdmin(usuario)` que compruebe si un usuario tiene rol `"admin"`.
2. Usa un type predicate en un `filter` para obtener solo los elementos de un tipo concreto de una unión.
3. Implementa una assertion function `asegurarNumero(valor: unknown): asserts valor is number`.

### 15. Conversión de tipos
1. Convierte explícitamente: `number → string`, `string → number`, `string → boolean`.
2. Usa `JSON.stringify` y `JSON.parse` con una interface tipada.
3. Escribe una función que use el operador `??` para proporcionar valores por defecto.
4. Diferencia entre `||` y `??` con un ejemplo donde `0` sea un valor válido.

### 16. Operadores
1. Compara `==` vs `===` con `5` y `"5"`. ¿Qué resultados obtienes?
2. Usa el operador ternario para asignar un valor según una condición.
3. Implementa un ejemplo de `||=` y `??=`. Explica la diferencia.
4. Escribe una función que use short-circuit evaluation para evitar una llamada si una condición es falsa.

### 17. Estructuras de control de flujo
1. Escribe un `if/else if/else` que clasifique una nota numérica en Sobresaliente, Notable, Aprobado, Suspenso.
2. Crea un `switch` exhaustivo con un tipo unión de 4 valores literales. Incluye exhaustiveness check con `never`.
3. Recorre un array de strings con `for`, `for...of` y `forEach`. ¿Cuál prefieres y por qué?
4. Escribe un bucle `while` que imprima los números del 10 al 1.

### 18. Ámbito (Scope) y hoisting
1. Declara una variable con `var` dentro de un bloque `if`. ¿Es accesible fuera? Repite con `let`.
2. Demuestra el hoisting con `var` — imprime una variable antes de declararla.
3. Crea un closure que capture una variable de bucle y demuestra el problema clásico con `var`.
4. Explica la Temporal Dead Zone (TDZ) con `let`.

---

## Sesión 3: Introducción a TypeScript (Parte 2)

### 1. Clases en TypeScript ⚠️ optativo

1. Crea una clase `Libro` con `titulo`, `autor`, `anio`, `private isbn` y un método `obtenerInfo()`.
2. Usa parameter properties en el constructor para simplificar la declaración.
3. Añade un getter `antiguedad` que calcule los años desde `anio` hasta hoy.
4. Añade un setter que valide que `anio` no sea futuro.
5. Crea un miembro `static` `contador` que se incremente con cada instancia.

### 2. Herencia y Clases Abstractas ⚠️ optativo

1. Crea una clase abstracta `Animal` con `nombre` y método abstracto `hacerSonido(): string`.
2. Extiende con `Perro` y `Gato` que implementen `hacerSonido`.
3. Crea una clase `Vehiculo` y extiéndela con `Coche` y `Bicicleta`. Añade propiedades específicas.
4. Implementa una interface `Serializable` en una clase `Informe`.
5. Usa `instanceof` para distinguir entre dos clases hermanas.

### 3. Generics (Genéricos)
1. Escribe una función genérica `invertir<T>(arr: T[]): T[]` que devuelva el array invertido.
2. Crea una función `obtenerPrimero<T>(arr: T[]): T | undefined`.
3. Implementa una clase genérica `Caja<T>` con `guardar(item: T)` y `sacar(): T | undefined`.
4. Usa `extends` para restringir un genérico a tipos que tengan `.length`.
5. Escribe una función `acceder<T, K extends keyof T>(obj: T, key: K): T[K]`.

### 4. Template Literal Types ⚠️ optativo

1. Define un tipo `Tamanio = "pequenio" | "mediano" | "grande"` y genera el tipo `TamanioCSS` como `"text-pequenio" | "text-mediano" | "text-grande"`.
2. Crea un tipo que combine `"success" | "warning" | "error"` con `"light" | "dark"` usando template literals.
3. Usa `Uppercase`, `Lowercase`, `Capitalize` y `Uncapitalize` sobre tipos literales.

### 5. Utility Types
1. Dada una interface `Producto { id: number; nombre: string; precio: number; descripcion?: string }`:
   - Crea un tipo `ProductoParcial` con todas las propiedades opcionales.
   - Crea un tipo `ProductoSinDescripcion` que omita `descripcion`.
   - Crea un tipo `ResumenProducto` que solo tenga `id` y `nombre`.
2. Usa `Record` para crear un tipo `Semana` con días como claves y `string` como valores.
3. Usa `Parameters` y `ReturnType` con una función existente.
4. Usa `NonNullable` para eliminar `null | undefined` de un tipo unión.

### 6. keyof, typeof y satisfies
1. Dada una interface `Usuario { id: number; nombre: string; email: string }`, usa `keyof` para obtener sus claves como tipo.
2. Crea un objeto `config` con `url`, `port`, `timeout` y usa `typeof` para obtener su tipo.
3. Usa `as const` en un array de colores y obtén el tipo de un elemento con `typeof arr[number]`.
4. Usa `satisfies` para verificar que un objeto cumple un tipo pero manteniendo el tipo inferido.

### 7. Módulos en TypeScript
1. Crea un módulo `utilidades.ts` con funciones `saludar`, `despedir` y una constante `PI`. Impórtalas en `app.ts`.
2. Exporta una interface desde un módulo y usa `import type`.
3. Crea un módulo con un `export default class` y otro con re-exportaciones.
4. ¿Qué diferencia hay entre `export { x }` y `export default x`?

### 8. Declaraciones de Tipos (.d.ts) ⚠️ optativo

1. Crea un archivo `.d.ts` para una librería imaginaria `"mi-libreria"` con una función `saludar(nombre: string): string`.
2. Declara una variable global `MI_CONFIG` de tipo `Record<string, string>`.
3. Crea un módulo de declaración para archivos `.csv` que exporte `string[][]`.

### 9. DOM con TypeScript ⚠️ optativo

1. Selecciona un botón por ID y añádele un evento click tipado como `MouseEvent`.
2. Selecciona todos los inputs de un formulario con `querySelectorAll<HTMLInputElement>`.
3. Crea una función genérica `$<T extends HTMLElement>(id: string): T` que devuelva un elemento tipado.
4. Añade un event listener a un formulario con tipo `SubmitEvent`.

### 10. Strict Mode y Configuración
1. Activa `strict: true` en un `tsconfig.json` y comprueba qué flags se activan.
2. Declara una propiedad de clase sin inicializar — ¿qué error da `strictPropertyInitialization`?
3. Usa `!` (definite assignment assertion) para solucionar el error anterior.
4. ¿Qué hace `noImplicitAny`? Escribe una función sin tipo en el parámetro y observa el error.

### 11. Arrays: métodos fundamentales
1. Dado `[1, 2, 3, 4, 5]`, usa `map` para duplicar, `filter` para pares, `reduce` para sumar.
2. Usa `find`, `findIndex`, `some` y `every` sobre un array de objetos `Producto`.
3. Prueba `at(-1)` para obtener el último elemento de un array.
4. Usa `toSorted`, `toReversed` y `with` (ES2023) y comprueba que el original no muta.
5. Implementa una búsqueda binaria tipada.

### 12. Set: conjunto de valores únicos
1. Crea un `Set<string>` con nombres de colores. Añade, elimina y comprueba existencia.
2. Dado un array con duplicados, elimínalos usando `Set`.
3. Dados dos conjuntos `A` y `B`, calcula: unión, intersección y diferencia.
4. Prueba los métodos nativos ES2025: `union`, `intersection`, `difference`, `isSubsetOf`.

### 13. Map: diccionario clave-valor
1. Crea un `Map<string, number>` con nombres de personas y sus edades. Itera sobre él.
2. Implementa una caché simple con `Map<string, { data: unknown; timestamp: number }>`.
3. Usa `Map.groupBy` para agrupar un array de objetos por una propiedad.
4. Crea un `WeakMap<object, string>` y demuestra su uso con objetos como claves.

### 14. Objetos en profundidad
1. Dado un objeto `persona`, usa `Object.keys`, `Object.values` y `Object.entries`.
2. Usa destructuring avanzado: alias, anidado y valores por defecto.
3. Clona un objeto con `structuredClone` — ¿qué tipos preserva que `JSON.parse(JSON.stringify(x))` no?
4. Usa `Object.groupBy` para agrupar productos por categoría.
5. Usa `Object.freeze` y comprueba que el objeto es readonly en runtime.

### 15. Programación asíncrona avanzada
1. Crea una función `delay(ms)` que devuelva una promesa que se resuelva tras `ms` milisegundos.
2. Escribe una función `obtenerUsuario(id)` que use `fetch` contra una API pública y devuelva datos tipados.
3. Usa `Promise.all`, `Promise.allSettled`, `Promise.race` y `Promise.any` con múltiples promesas.
4. Recrea el orden del Event Loop: sincrónico → microtareas → macrotareas.
5. Implementa un `AbortController` para cancelar un fetch tras 3 segundos.

### 16. Manipulación del DOM con TypeScript ⚠️ optativo

1. Crea una función que genere una tarjeta HTML (`div > h3 + p`) tipada y la inserte en el DOM.
2. Añade un event listener a una lista `<ul>` con delegación de eventos (type-safe).
3. Usa `dataset` para leer y escribir atributos `data-*` con tipos.
4. Implementa un `MutationObserver` que observe cambios en un contenedor.
5. Usa `ResizeObserver` para mostrar el tamaño actual de un elemento.

### 17. Web APIs del navegador ⚠️ optativo

1. Crea una función que obtenga la posición geográfica del usuario usando `navigator.geolocation` envuelta en una Promise.
2. Dibuja un rectángulo y un círculo en un `<canvas>` con el contexto 2D.
3. Implementa un mini-SPA routing con `history.pushState` y `popstate`.
4. Crea un Web Worker que reciba un array de números y devuelva su media.
5. Escribe un `localStorage` wrapper tipado con get/set genéricos.
